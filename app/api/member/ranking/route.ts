import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

type RankingScope = "national" | "province" | "regency";

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
    const auth = getAuth();

    // ==========================
    // AUTHENTICATION
    // ==========================

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return failed("Unauthorized.", 401);
    }

    const idToken = authHeader
      .replace("Bearer ", "")
      .trim();

    if (!idToken) {
      return failed("Token tidak valid.", 401);
    }

    const decodedToken =
      await auth.verifyIdToken(idToken);

    const uid = decodedToken.uid;

    // ==========================
    // REQUEST
    // ==========================

    const { searchParams } = new URL(req.url);

    const tryoutId =
      searchParams.get("tryoutId")?.trim() ?? "";

    const scope =
      (searchParams.get("scope")?.trim() ??
        "national") as RankingScope;

    const requestedLimit = Number(
      searchParams.get("limit") ?? 50
    );

    const limit =
      Number.isInteger(requestedLimit) &&
      requestedLimit > 0
        ? Math.min(requestedLimit, 100)
        : 50;

    if (!tryoutId) {
      return failed("Tryout ID wajib diisi.");
    }

    if (
      !["national", "province", "regency"].includes(
        scope
      )
    ) {
      return failed(
        "Scope ranking tidak valid."
      );
    }

    // ==========================
    // USER
    // ==========================

    const userRef = adminDb
      .collection("users")
      .doc(uid);

    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return failed(
        "Data pengguna tidak ditemukan.",
        404
      );
    }

    const user = userSnap.data()!;

    if (user.status !== "ACTIVE") {
      return failed(
        "Akun pengguna tidak aktif."
      );
    }

    // ==========================
    // TRYOUT
    // ==========================

    const tryoutRef = adminDb
      .collection("tryouts")
      .doc(tryoutId);

    const tryoutSnap =
      await tryoutRef.get();

    if (!tryoutSnap.exists) {
      return failed(
        "Tryout tidak ditemukan.",
        404
      );
    }

    const tryout = tryoutSnap.data()!;

    if (tryout.status !== "published") {
      return failed(
        "Tryout belum tersedia."
      );
    }

    // ==========================
    // EDUCATION LEVEL
    // ==========================

    const educationLevelId =
      tryout.educationLevelId ??
      user.educationLevelId ??
      null;

    if (!educationLevelId) {
      return failed(
        "Jenjang pendidikan tidak ditemukan."
      );
    }

    // ==========================
    // REGION
    // ==========================

    const provinceId =
      user.provinceId ?? null;

    const provinceName =
      user.provinceName ?? null;

    const regencyId =
      user.regencyId ?? null;

    const regencyName =
      user.regencyName ?? null;

    if (
      scope === "province" &&
      !provinceId
    ) {
      return failed(
        "Data provinsi pada akun Anda belum tersedia."
      );
    }

    if (
      scope === "regency" &&
      !regencyId
    ) {
      return failed(
        "Data kabupaten/kota pada akun Anda belum tersedia."
      );
    }

    // ==========================
    // RESULT DATA
    // ==========================

    const resultSnap = await adminDb
      .collection("tryoutResults")
      .where("tryoutRef", "==", tryoutRef)
      .get();

    const bestResultByUser =
      new Map<string, any>();

    // ==========================
    // BEST RESULT PER USER
    // ==========================

    for (const doc of resultSnap.docs) {
      const result = doc.data();

      const resultUserId =
        result.userId ??
        result.userRef?.id;

      if (!resultUserId) {
        continue;
      }

      const resultEducationLevelId =
        result.educationLevelId ??
        result.educationLevelRef?.id ??
        null;

      if (
        resultEducationLevelId &&
        String(resultEducationLevelId) !==
          String(educationLevelId)
      ) {
        continue;
      }

      const score = Number(
        result.score ?? 0
      );

      const durationSeconds =
        Number(
          result.durationSeconds ?? 0
        );

      const submittedAt =
        result.submittedAt?.toDate
          ? result.submittedAt.toDate()
          : result.submittedAt
          ? new Date(result.submittedAt)
          : null;

      const existing =
        bestResultByUser.get(
          resultUserId
        );

      if (!existing) {
        bestResultByUser.set(
          resultUserId,
          {
            ...result,
            resultId: doc.id,
            _score: score,
            _durationSeconds:
              durationSeconds,
            _submittedAt:
              submittedAt
          }
        );

        continue;
      }

      const existingScore =
        Number(existing.score ?? 0);

      const existingDuration =
        Number(
          existing.durationSeconds ?? 0
        );

      const existingSubmitted =
        existing._submittedAt
          ? existing._submittedAt.getTime()
          : Number.MAX_SAFE_INTEGER;

      const currentSubmitted =
        submittedAt
          ? submittedAt.getTime()
          : Number.MAX_SAFE_INTEGER;

      const better =
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
          currentSubmitted <
            existingSubmitted
        );

      if (better) {
        bestResultByUser.set(
          resultUserId,
          {
            ...result,
            resultId: doc.id,
            _score: score,
            _durationSeconds:
              durationSeconds,
            _submittedAt:
              submittedAt
          }
        );
      }
    }

    // ==========================
    // LOAD USERS
    // ==========================

    const userIds = Array.from(
      bestResultByUser.keys()
    );

    const usersMap =
      new Map<string, any>();

    for (
      let i = 0;
      i < userIds.length;
      i += 30
    ) {
      const batch =
        userIds.slice(i, i + 30);

      const refs = batch.map((id) =>
        adminDb
          .collection("users")
          .doc(id)
      );

      const docs =
        await adminDb.getAll(...refs);

      for (const doc of docs) {
        if (!doc.exists) {
          continue;
        }

        usersMap.set(
          doc.id,
          doc.data()
        );
      }
    }

    // ==========================
    // FILTER
    // ==========================

    const participants: any[] = [];

    for (
      const [resultUserId, result] of
        bestResultByUser.entries()
    ) {
      const participant =
        usersMap.get(resultUserId);

      if (!participant) {
        continue;
      }

      if (
        participant.status !== "ACTIVE"
      ) {
        continue;
      }

      const participantEducationLevelId =
        participant.educationLevelId ??
        participant.educationLevelRef?.id ??
        null;

      if (
        participantEducationLevelId &&
        String(
          participantEducationLevelId
        ) !==
          String(educationLevelId)
      ) {
        continue;
      }

      if (
        scope === "province" &&
        String(
          participant.provinceId ?? ""
        ) !== String(provinceId)
      ) {
        continue;
      }

      if (
        scope === "regency" &&
        String(
          participant.regencyId ?? ""
        ) !== String(regencyId)
      ) {
        continue;
      }

      participants.push({
        userId: resultUserId,
        result,
        user: participant
      });
    }

    // ==========================
    // SORT
    // ==========================

    participants.sort(
      (a, b) => {
        const scoreA =
          Number(a.result.score ?? 0);

        const scoreB =
          Number(b.result.score ?? 0);

        if (scoreA !== scoreB) {
          return scoreB - scoreA;
        }

        const durationA =
          Number(
            a.result.durationSeconds ?? 0
          );

        const durationB =
          Number(
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
    // RANKING
    // ==========================

    const rankings: any[] = [];

    let currentRank = 0;

    let previousScore:
      number | null = null;

    let previousDuration:
      number | null = null;

    for (
      let index = 0;
      index < participants.length;
      index++
    ) {
      const item =
        participants[index];

      const score =
        Number(
          item.result.score ?? 0
        );

      const duration =
        Number(
          item.result.durationSeconds ?? 0
        );

      const sameRank =
        previousScore === score &&
        previousDuration === duration;

      if (!sameRank) {
        currentRank = index + 1;
      }

      previousScore = score;
      previousDuration = duration;

      rankings.push({
        rank: currentRank,

        userId: item.userId,

        nama:
          item.user.nama ??
          "Peserta",

        score,

        percentage:
          Number(
            item.result.percentage ??
              score
          ),

        correctAnswers:
          Number(
            item.result.correctAnswers ??
              0
          ),

        totalQuestions:
          Number(
            item.result.totalQuestions ??
              0
          ),

        durationSeconds:
          duration,

        attemptNumber:
          Number(
            item.result.attemptNumber ??
              1
          ),

        provinceId:
          item.user.provinceId ??
          null,

        provinceName:
          item.user.provinceName ??
          null,

        regencyId:
          item.user.regencyId ??
          null,

        regencyName:
          item.user.regencyName ??
          null,

        isMe:
          item.userId === uid
      });
    }

    // ==========================
    // MY RANK
    // ==========================

    const myRanking =
      rankings.find(
        (item) =>
          item.userId === uid
      ) ?? null;

    // ==========================
    // TOP RANKING
    // ==========================

    const topRankings =
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

        educationLevelId,

        educationLevelName:
          tryout.educationLevelName ??
          user.educationLevelName ??
          null,

        scope,

        provinceId:
          scope === "province" ||
          scope === "regency"
            ? provinceId
            : null,

        provinceName:
          scope === "province" ||
          scope === "regency"
            ? provinceName
            : null,

        regencyId:
          scope === "regency"
            ? regencyId
            : null,

        regencyName:
          scope === "regency"
            ? regencyName
            : null,

        totalParticipants:
          rankings.length,

        myRanking,

        rankings:
          topRankings
      }
    });
  } catch (err) {
    console.error(
      "MEMBER RANKING API ERROR:",
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