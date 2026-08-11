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
    // USER EDUCATION LEVEL
    // ==========================

    const educationLevelId =
      typeof user.educationLevelId === "string"
        ? user.educationLevelId.trim()
        : "";

    if (!educationLevelId) {
      return failed(
        "Jenjang pendidikan pengguna belum ditentukan."
      );
    }

    // ==========================
    // TRYOUT
    // ==========================
    //
    // Sengaja mengambil tryout berdasarkan status saja
    // kemudian difilter di server.
    //
    // Dengan cara ini kita tidak bergantung pada composite
    // index Firestore untuk status + educationLevelId.
    //

    const tryoutSnap = await adminDb
      .collection("tryouts")
      .where("status", "==", "published")
      .get();

    const tryouts: Record<string, unknown>[] = [];

    for (const doc of tryoutSnap.docs) {
      const tryout = doc.data();

      // ==========================
      // EDUCATION LEVEL FILTER
      // ==========================

      let tryoutEducationLevelId = "";

      if (
        typeof tryout.educationLevelId === "string"
      ) {
        tryoutEducationLevelId =
          tryout.educationLevelId;
      }

      // Support apabila data tryout menggunakan
      // educationLevelRef sebagai DocumentReference.
      if (
        !tryoutEducationLevelId &&
        tryout.educationLevelRef
      ) {
        tryoutEducationLevelId =
          tryout.educationLevelRef.id;
      }

      if (
        tryoutEducationLevelId !==
        educationLevelId
      ) {
        continue;
      }

      // ==========================
      // BASIC VALIDATION
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
        continue;
      }

      if (
        !Number.isInteger(durationMinutes) ||
        durationMinutes <= 0
      ) {
        continue;
      }

      // ==========================
      // RESPONSE
      // ==========================
      //
      // PENTING:
      // Jangan pernah mengirim:
      //
      // - questionBankRefs
      // - questionIds
      // - storagePath
      // - correctAnswer
      // - correctOptionId
      //
      // Data tersebut hanya boleh digunakan server.
      //

      tryouts.push({
        id: doc.id,

        title:
          tryout.title ??
          tryout.name ??
          "Tryout",

        description:
          tryout.description ?? null,

        subjectId:
          tryout.subjectId ?? null,

        subjectName:
          tryout.subjectName ?? null,

        educationLevelId,

        educationLevelName:
          tryout.educationLevelName ??
          user.educationLevelName ??
          null,

        totalQuestions,

        durationMinutes,

        passingScore:
          Number(tryout.passingScore ?? 0),

        maxAttempt:
          Number(tryout.maxAttempt ?? 0),

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
      });
    }

    // ==========================
    // SORT
    // ==========================

    tryouts.sort((a, b) => {
      const orderA = Number(a.order ?? 0);
      const orderB = Number(b.order ?? 0);

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return String(a.title ?? "").localeCompare(
        String(b.title ?? ""),
        "id"
      );
    });

    // ==========================
    // RESPONSE
    // ==========================

    return success({
      message: "Daftar tryout berhasil diambil.",

      educationLevel: {
        id: educationLevelId,
        name:
          user.educationLevelName ?? null
      },

      count: tryouts.length,

      tryouts
    });
  } catch (error) {
    console.error(
      "TRYOUT LIST API ERROR:",
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