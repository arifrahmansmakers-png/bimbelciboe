import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const success = (data: Record<string, unknown>) =>
  NextResponse.json({ success: true, ...data });

const failed = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    // PARAMETER
    // ==========================

    const { id } = await params;

    const resultId =
      typeof id === "string" ? id.trim() : "";

    if (!resultId) {
      return failed("Result ID tidak valid.");
    }

    // ==========================
    // USER
    // ==========================

    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return failed("Data pengguna tidak ditemukan.", 404);
    }

    const user = userSnap.data()!;

    if (user.status !== "ACTIVE") {
      return failed("Akun pengguna tidak aktif.", 403);
    }

    // ==========================
    // RESULT
    // ==========================

    const resultRef = adminDb
      .collection("tryoutResults")
      .doc(resultId);

    const resultSnap = await resultRef.get();

    if (!resultSnap.exists) {
      return failed("Hasil tryout tidak ditemukan.", 404);
    }

    const result = resultSnap.data()!;

    const ownerId =
      result.userId ?? result.userRef?.id ?? null;

    if (ownerId !== uid) {
      return failed(
        "Anda tidak memiliki akses ke hasil tryout ini.",
        403
      );
    }

    // ==========================
    // FORMAT DATE
    // ==========================

    const startedAt =
      result.startedAt?.toDate
        ? result.startedAt.toDate().toISOString()
        : result.startedAt
        ? new Date(result.startedAt).toISOString()
        : null;

    const submittedAt =
      result.submittedAt?.toDate
        ? result.submittedAt.toDate().toISOString()
        : result.submittedAt
        ? new Date(result.submittedAt).toISOString()
        : null;

    // ==========================
    // RESPONSE
    // ==========================

    return success({
      message: "Hasil tryout berhasil diambil.",

      result: {
        id: resultId,

        tryoutId: result.tryoutId,
        tryoutTitle: result.tryoutTitle ?? null,

        subjectId: result.subjectId ?? null,
        subjectName: result.subjectName ?? null,

        educationLevelId:
          result.educationLevelId ?? null,

        educationLevelName:
          result.educationLevelName ?? null,

        score: Number(result.score ?? 0),
        percentage: Number(result.percentage ?? 0),

        correctAnswers: Number(
          result.correctAnswers ?? 0
        ),

        wrongAnswers: Number(
          result.wrongAnswers ?? 0
        ),

        unanswered: Number(
          result.unanswered ?? 0
        ),

        totalQuestions: Number(
          result.totalQuestions ?? 0
        ),

        passingScore: Number(
          result.passingScore ?? 0
        ),

        passed: Boolean(result.passed),

        durationSeconds: Number(
          result.durationSeconds ?? 0
        ),

        attemptNumber: Number(
          result.attemptNumber ?? 1
        ),

        startedAt,
        submittedAt,

        answers: Array.isArray(result.answers)
          ? result.answers
          : []
      }
    });
  } catch (error) {
    console.error(
      "TRYOUT RESULT DETAIL API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error"
      },
      {
        status: 500
      }
    );
  }
}