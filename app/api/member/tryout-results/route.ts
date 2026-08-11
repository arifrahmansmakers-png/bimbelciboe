import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const failed = (message: string, status = 400) =>
  NextResponse.json(
    {
      success: false,
      message
    },
    { status }
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

    const idToken = authHeader.replace("Bearer ", "").trim();

    if (!idToken) {
      return failed("Token tidak valid.", 401);
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // ==========================
    // REQUEST PARAMETER
    // ==========================

    const { searchParams } = new URL(req.url);

    const tryoutId = searchParams.get("tryoutId")?.trim() ?? "";

    // ==========================
    // USER
    // ==========================

    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return failed("Data pengguna tidak ditemukan.", 404);
    }

    const user = userSnap.data()!;

    if (
      user.status &&
      user.status !== "ACTIVE"
    ) {
      return failed("Akun pengguna tidak aktif.", 403);
    }

    // ==========================
    // QUERY RESULT
    // ==========================

    let query = adminDb
      .collection("tryoutResults")
      .where("userRef", "==", userRef);

    if (tryoutId) {
      query = query.where(
        "tryoutId",
        "==",
        tryoutId
      ) as typeof query;
    }

    const resultSnap = await query.get();

    // ==========================
    // FORMAT RESULT
    // ==========================

    const results = resultSnap.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,

        tryoutId: data.tryoutId ?? null,
        tryoutTitle: data.tryoutTitle ?? null,

        educationLevelId:
          data.educationLevelId ?? null,

        subjectId:
          data.subjectId ?? null,

        totalQuestions:
          Number(data.totalQuestions ?? 0),

        correctAnswers:
          Number(data.correctAnswers ?? 0),

        wrongAnswers:
          Number(data.wrongAnswers ?? 0),

        unanswered:
          Number(data.unanswered ?? 0),

        score:
          Number(data.score ?? 0),

        percentage:
          Number(data.percentage ?? 0),

        passingScore:
          Number(data.passingScore ?? 0),

        passed:
          data.passed === true,

        durationSeconds:
          Number(data.durationSeconds ?? 0),

        attemptNumber:
          Number(data.attemptNumber ?? 1),

        startedAt:
          data.startedAt ?? null,

        submittedAt:
          data.submittedAt ?? null,

        createdAt:
          data.createdAt ?? null,

        updatedAt:
          data.updatedAt ?? null
      };
    });

    // ==========================
    // SORT TERBARU
    // ==========================

    results.sort((a, b) => {
      const getTime = (value: any) => {
        if (!value) return 0;

        if (
          typeof value.toMillis === "function"
        ) {
          return value.toMillis();
        }

        if (value instanceof Date) {
          return value.getTime();
        }

        const time = new Date(value).getTime();

        return Number.isNaN(time) ? 0 : time;
      };

      return (
        getTime(b.submittedAt ?? b.createdAt) -
        getTime(a.submittedAt ?? a.createdAt)
      );
    });

    // ==========================
    // RESPONSE
    // ==========================

    return NextResponse.json({
      success: true,

      count: results.length,

      results
    });
  } catch (err) {
    console.error(
      "MEMBER TRYOUT RESULTS API ERROR:",
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