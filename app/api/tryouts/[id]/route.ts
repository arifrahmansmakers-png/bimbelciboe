import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const success = (data: Record<string, unknown>) =>
  NextResponse.json({
    success: true,
    ...data
  });

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

    const tryoutId =
      typeof id === "string"
        ? id.trim()
        : "";

    if (!tryoutId) {
      return failed("Tryout ID tidak valid.");
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
        "Akun pengguna tidak aktif.",
        403
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

    // ==========================
    // STATUS
    // ==========================

    if (tryout.status !== "published") {
      return failed(
        "Tryout belum tersedia.",
        404
      );
    }

    // ==========================
    // EDUCATION LEVEL
    // ==========================

    const userEducationLevelId =
      typeof user.educationLevelId === "string"
        ? user.educationLevelId.trim()
        : "";

    let tryoutEducationLevelId = "";

    if (
      typeof tryout.educationLevelId ===
      "string"
    ) {
      tryoutEducationLevelId =
        tryout.educationLevelId.trim();
    }

    if (
      !tryoutEducationLevelId &&
      tryout.educationLevelRef
    ) {
      tryoutEducationLevelId =
        tryout.educationLevelRef.id;
    }

    if (
      !userEducationLevelId ||
      !tryoutEducationLevelId
    ) {
      return failed(
        "Data jenjang pendidikan tidak lengkap."
      );
    }

    if (
      userEducationLevelId !==
      tryoutEducationLevelId
    ) {
      return failed(
        "Tryout ini tidak tersedia untuk jenjang pendidikan Anda.",
        403
      );
    }

    // ==========================
    // BASIC DATA
    // ==========================

    const totalQuestions = Number(
      tryout.totalQuestions ?? 0
    );

    const durationMinutes = Number(
      tryout.durationMinutes ?? 0
    );

    if (
      !Number.isInteger(totalQuestions) ||
      totalQuestions <= 0
    ) {
      return failed(
        "Konfigurasi jumlah soal tryout tidak valid."
      );
    }

    if (
      !Number.isInteger(durationMinutes) ||
      durationMinutes <= 0
    ) {
      return failed(
        "Konfigurasi durasi tryout tidak valid."
      );
    }

    const passingScore = Number(
      tryout.passingScore ?? 0
    );

    const maxAttempt = Number(
      tryout.maxAttempt ?? 0
    );

    // ==========================
    // PREVIOUS ATTEMPTS
    // ==========================

    const previousResultsSnap =
      await adminDb
        .collection("tryoutResults")
        .where("userRef", "==", userRef)
        .where("tryoutRef", "==", tryoutRef)
        .get();

    const previousAttempts =
      previousResultsSnap.size;

    const remainingAttempts =
      maxAttempt > 0
        ? Math.max(
            0,
            maxAttempt - previousAttempts
          )
        : null;

    const canStart =
      maxAttempt <= 0 ||
      previousAttempts < maxAttempt;

    // ==========================
    // SUBJECT
    // ==========================

    let subjectId =
      typeof tryout.subjectId === "string"
        ? tryout.subjectId
        : null;

    let subjectName =
      tryout.subjectName ?? null;

    if (
      !subjectName &&
      tryout.subjectRef
    ) {
      try {
        const subjectSnap =
          await tryout.subjectRef.get();

        if (subjectSnap.exists) {
          const subject =
            subjectSnap.data()!;

          subjectId =
            subjectId ??
            subjectSnap.id;

          subjectName =
            subject.name ??
            subject.title ??
            null;
        }
      } catch {
        // Tidak menggagalkan detail tryout
        // jika data subject tidak tersedia.
      }
    }

    // ==========================
    // EDUCATION LEVEL NAME
    // ==========================

    let educationLevelName =
      tryout.educationLevelName ??
      user.educationLevelName ??
      null;

    if (
      !educationLevelName &&
      tryout.educationLevelRef
    ) {
      try {
        const educationSnap =
          await tryout.educationLevelRef.get();

        if (educationSnap.exists) {
          const education =
            educationSnap.data()!;

          educationLevelName =
            education.name ??
            education.title ??
            null;
        }
      } catch {
        // Tidak menggagalkan response.
      }
    }

    // ==========================
    // RESPONSE
    // ==========================
    //
    // PENTING:
    // Tidak mengirim:
    //
    // - questionBankRefs
    // - questionIds
    // - storagePath
    // - kunci jawaban
    // - isi soal
    //
    // Semua itu hanya digunakan oleh server
    // ketika siswa benar-benar memulai tryout.
    //

    return success({
      message: "Detail tryout berhasil diambil.",

      tryout: {
        id: tryoutId,

        title:
          tryout.title ??
          tryout.name ??
          "Tryout",

        description:
          tryout.description ?? null,

        subjectId,

        subjectName,

        educationLevelId:
          tryoutEducationLevelId,

        educationLevelName,

        totalQuestions,

        durationMinutes,

        passingScore,

        maxAttempt,

        previousAttempts,

        remainingAttempts,

        canStart,

        status: "published",

        thumbnailURL:
          tryout.thumbnailURL ??
          tryout.thumbnailUrl ??
          null,

        order:
          Number(tryout.order ?? 0),

        createdAt:
          tryout.createdAt ?? null,

        updatedAt:
          tryout.updatedAt ?? null
      }
    });
  } catch (error) {
    console.error(
      "TRYOUT DETAIL API ERROR:",
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