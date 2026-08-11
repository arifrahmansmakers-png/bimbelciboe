import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

type RankingScope = "national" | "province" | "regency";

interface RankingRow {
  rank: number;
  userId: string;
  nama: string;
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  durationSeconds: number;
  attemptNumber: number;
  provinceId: string | null;
  provinceName: string | null;
  regencyId: string | null;
  regencyName: string | null;
  submittedAt: string | null;
}

const failed = (message: string, status = 400) =>
  NextResponse.json(
    {
      success: false,
      message
    },
    {
      status
    }
  );

export async function GET(req: Request) {
  try {
    const adminDb = getAdminDb();

    const { searchParams } = new URL(req.url);

    const tryoutId =
      searchParams.get("tryoutId")?.trim() ?? "";

    const educationLevelId =
      searchParams.get("educationLevelId")?.trim() ?? "";

    const scope =
      (searchParams.get("scope")?.trim() ??
        "national") as RankingScope;

    const provinceId =
      searchParams.get("provinceId")?.trim() ?? "";

    const regencyId =
      searchParams.get("regencyId")?.trim() ?? "";

    const requestedLimit = Number(
      searchParams.get("limit") ?? 50
    );

    const limit =
      Number.isInteger(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 50;

    // ==========================
    // VALIDATE REQUEST
    // ==========================

    if (!tryoutId) {
      return failed("Tryout ID wajib diisi.");
    }

    if (
      !["national", "province", "regency"].includes(
        scope
      )
    ) {
      return failed(
        "Scope ranking tidak valid. Gunakan national, province, atau regency."
      );
    }

    if (scope === "province" && !provinceId) {
      return failed(
        "Province ID wajib diisi untuk ranking provinsi."
      );
    }

    if (scope === "regency" && !regencyId) {
      return failed(
        "Regency ID wajib diisi untuk ranking kabupaten/kota."
      );
    }

    // ==========================
    // TRYOUT
    // ==========================

    const tryoutRef = adminDb
      .collection("tryouts")
      .doc(tryoutId);

    const tryoutSnap = await tryoutRef.get();

    if (!tryoutSnap.exists) {
      return failed(
        "Tryout tidak ditemukan.",
        404
      );
    }

    const tryout = tryoutSnap.data()!;

    if (tryout.status !== "published") {
      return failed(
        "Tryout belum tersedia untuk ranking."
      );
    }

    const resolvedEducationLevelId =
      educationLevelId ||
      tryout.educationLevelId ||
      null;

    // ==========================
    // EDUCATION LEVEL VALIDATION
    // ==========================

    if (!resolvedEducationLevelId) {
      return failed(
        "Jenjang pendidikan tryout belum ditentukan."
      );
    }

    // ==========================
    // LOAD RESULTS
    // ==========================

    const resultSnap = await adminDb
      .collection("tryoutResults")
      .where("tryoutRef", "==", tryoutRef)
      .get();

    if (resultSnap.empty) {
      return NextResponse.json({
        success: true,
        data: {
          tryoutId,
          tryoutTitle:
            tryout.title ?? null,
          educationLevelId:
            resolvedEducationLevelId,
          scope,
          provinceId:
            scope === "province" ||
            scope === "regency"
              ? provinceId || null
              : null,
          regencyId:
            scope === "regency"
              ? regencyId
              : null,
          totalParticipants: 0,
          rankings: []
        }
      });
    }

    // ==========================
    // GET BEST RESULT PER USER
    // ==========================

    const bestResultByUser =
      new Map<string, any>();

    for (const doc of resultSnap.docs) {
      const result = doc.data();

      const userId =
        result.userId ??
        result.userRef?.id;

      if (!userId) continue;

      const resultEducationLevelId =
        result.educationLevelId ??
        result.educationLevelRef?.id ??
        null;

      if (
        resultEducationLevelId &&
        String(resultEducationLevelId) !==
          String(resolvedEducationLevelId)
      ) {
        continue;
      }

      const score = Number(
        result.score ?? 0
      );

      const durationSeconds = Number(
        result.durationSeconds ?? 0
      );

      const submittedAt =
        result.submittedAt?.toDate
          ? result.submittedAt.toDate()
          : result.submittedAt
          ? new Date(result.submittedAt)
          : null;

      const existing =
        bestResultByUser.get(userId);

      if (!existing) {
        bestResultByUser.set(userId, {
          ...result,
          _resultId: doc.id,
          _userId: userId,
          _score: score,
          _durationSeconds:
            durationSeconds,
          _submittedAt: submittedAt
        });

        continue;
      }

      const existingScore =
        Number(existing.score ?? 0);

      const existingDuration =
        Number(
          existing.durationSeconds ?? 0
        );

      const existingSubmittedAt =
        existing._submittedAt
          ? existing._submittedAt.getTime()
          : Number.MAX_SAFE_INTEGER;

      const currentSubmittedAt =
        submittedAt
          ? submittedAt.getTime()
          : Number.MAX_SAFE_INTEGER;

      const isBetter =
        score > existingScore ||
        (
          score === existingScore &&
          durationSeconds <
            existingDuration
        ) ||
        (
          score === existingScore &&
          durationSeconds ===
            existingDuration &&
          currentSubmittedAt <
            existingSubmittedAt
        );

      if (isBetter) {
        bestResultByUser.set(userId, {
          ...result,
          _resultId: doc.id,
          _userId: userId,
          _score: score,
          _durationSeconds:
            durationSeconds,
          _submittedAt: submittedAt
        });
      }
    }

    // ==========================
    // LOAD USERS
    // ==========================

    const userIds = Array.from(
      bestResultByUser.keys()
    );

    const userMap =
      new Map<string, any>();

    for (
      let i = 0;
      i < userIds.length;
      i += 30
    ) {
      const batchIds = userIds.slice(
        i,
        i + 30
      );

      const refs = batchIds.map((id) =>
        adminDb
          .collection("users")
          .doc(id)
      );

      const userDocs =
        await adminDb.getAll(...refs);

      for (const userDoc of userDocs) {
        if (!userDoc.exists) continue;

        userMap.set(
          userDoc.id,
          userDoc.data()
        );
      }
    }

    // ==========================
    // FILTER REGION
    // ==========================

    const filteredResults: any[] = [];

    for (const result of bestResultByUser.values()) {
      const user = userMap.get(
        result._userId
      );

      if (!user) continue;

      if (user.status !== "ACTIVE") {
        continue;
      }

      const userEducationLevelId =
        user.educationLevelId ??
        user.educationLevelRef?.id ??
        null;

      if (
        userEducationLevelId &&
        String(userEducationLevelId) !==
          String(resolvedEducationLevelId)
      ) {
        continue;
      }

      if (
        scope === "province" &&
        String(user.provinceId ?? "") !==
          String(provinceId)
      ) {
        continue;
      }

      if (
        scope === "regency" &&
        String(user.regencyId ?? "") !==
          String(regencyId)
      ) {
        continue;
      }

      filteredResults.push({
        result,
        user
      });
    }

    // ==========================
    // SORT RANKING
    // ==========================

    filteredResults.sort(
      (a, b) => {
        const scoreA = Number(
          a.result.score ?? 0
        );

        const scoreB = Number(
          b.result.score ?? 0
        );

        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        const durationA = Number(
          a.result.durationSeconds ?? 0
        );

        const durationB = Number(
          b.result.durationSeconds ?? 0
        );

        if (
          durationA !== durationB
        ) {
          return durationA - durationB;
        }

        const dateA =
          a.result._submittedAt
            ? a.result._submittedAt.getTime()
            : Number.MAX_SAFE_INTEGER;

        const dateB =
          b.result._submittedAt
            ? b.result._submittedAt.getTime()
            : Number.MAX_SAFE_INTEGER;

        return dateA - dateB;
      }
    );

    // ==========================
    // COMPETITION RANK
    // ==========================

    const rankings: RankingRow[] =
      [];

    let previousScore: number | null =
      null;

    let previousDuration: number | null =
      null;

    let currentRank = 0;

    for (
      let index = 0;
      index < filteredResults.length;
      index++
    ) {
      const { result, user } =
        filteredResults[index];

      const score = Number(
        result.score ?? 0
      );

      const durationSeconds =
        Number(
          result.durationSeconds ?? 0
        );

      const samePosition =
        previousScore === score &&
        previousDuration ===
          durationSeconds;

      if (!samePosition) {
        currentRank = index + 1;
      }

      previousScore = score;
      previousDuration =
        durationSeconds;

      const submittedAt =
        result._submittedAt
          ? result._submittedAt.toISOString()
          : null;

      rankings.push({
        rank: currentRank,

        userId: result._userId,

        nama:
          user.nama ??
          "Peserta",

        score,

        percentage: Number(
          result.percentage ??
            score
        ),

        correctAnswers: Number(
          result.correctAnswers ?? 0
        ),

        totalQuestions: Number(
          result.totalQuestions ?? 0
        ),

        durationSeconds,

        attemptNumber: Number(
          result.attemptNumber ?? 1
        ),

        provinceId:
          user.provinceId ?? null,

        provinceName:
          user.provinceName ?? null,

        regencyId:
          user.regencyId ?? null,

        regencyName:
          user.regencyName ?? null,

        submittedAt
      });
    }

    // ==========================
    // LIMIT
    // ==========================

    const limitedRankings =
      rankings.slice(0, limit);

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      success: true,

      data: {
        tryoutId,

        tryoutTitle:
          tryout.title ?? null,

        educationLevelId:
          resolvedEducationLevelId,

        educationLevelName:
          tryout.educationLevelName ??
          null,

        scope,

        provinceId:
          scope === "province" ||
          scope === "regency"
            ? provinceId || null
            : null,

        provinceName:
          scope === "province" ||
          scope === "regency"
            ? limitedRankings[0]
                ?.provinceName ?? null
            : null,

        regencyId:
          scope === "regency"
            ? regencyId
            : null,

        regencyName:
          scope === "regency"
            ? limitedRankings[0]
                ?.regencyName ?? null
            : null,

        totalParticipants:
          rankings.length,

        rankings:
          limitedRankings
      }
    });
  } catch (err) {
    console.error(
      "RANKING API ERROR:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}