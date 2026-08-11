import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
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

interface PublicOption {
  id: string;
  text: string;
  label?: string;
}

interface PublicStatement {
  id: string;
  text: string;
}

interface PublicStatement {
  id: string;
  text: string;
}

interface PublicQuestion {
  id: string;
  type:
    | "multiple_choice"
    | "multiple_select"
    | "true_false";
  question: string;
  options: PublicOption[];
  statements?: PublicStatement[];
  order: number;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [
      result[j],
      result[i]
    ];
  }

  return result;
}

function normalizeQuestion(
  question: any,
  order: number
): PublicQuestion | null {
  if (!question?.id) {
    return null;
  }

  const type = String(
    question.type ??
      question.questionType ??
      ""
  );

  const allowedTypes = [
    "multiple_choice",
    "multiple_select",
    "true_false"
  ];

  if (!allowedTypes.includes(type)) {
    return null;
  }

  const questionText =
    typeof question.question === "string"
      ? question.question
      : typeof question.text === "string"
        ? question.text
        : typeof question.questionText === "string"
          ? question.questionText
          : "";

  if (!questionText.trim()) {
    return null;
  }

  // =====================================================
  // TRUE / FALSE
  // =====================================================

  if (type === "true_false") {
    const rawStatements =
      Array.isArray(question.statements)
        ? question.statements
        : [];

    const statements: PublicStatement[] = [];

    for (const statement of rawStatements) {
      if (!statement?.id) {
        continue;
      }

      const text =
        typeof statement.text === "string"
          ? statement.text
          : typeof statement.statement === "string"
            ? statement.statement
            : typeof statement.label === "string"
              ? statement.label
              : "";

      if (!text.trim()) {
        continue;
      }

      statements.push({
        id: String(statement.id),
        text: text.trim()
      });
    }

    if (statements.length === 0) {
      return null;
    }

    return {
      id: String(question.id),
      type: "true_false",
      question: questionText.trim(),
      options: [],
      statements,
      order
    };
  }

  // =====================================================
  // MULTIPLE CHOICE / MULTIPLE SELECT
  // =====================================================

  let rawOptions: any[] = [];

  if (Array.isArray(question.options)) {
    rawOptions = question.options;
  } else if (Array.isArray(question.choices)) {
    rawOptions = question.choices;
  }

  const options: PublicOption[] = [];

  for (const option of rawOptions) {
    if (typeof option === "string") {
      options.push({
        id: option,
        text: option
      });

      continue;
    }

    if (!option?.id) {
      continue;
    }

    const text =
      typeof option.text === "string"
        ? option.text
        : typeof option.label === "string"
          ? option.label
          : "";

    if (!text.trim()) {
      continue;
    }

    options.push({
      id: String(option.id),
      text: text.trim(),
      ...(typeof option.label === "string"
        ? {
            label: option.label
          }
        : {})
    });
  }

  if (options.length === 0) {
    return null;
  }

  return {
    id: String(question.id),
    type: type as
      | "multiple_choice"
      | "multiple_select",
    question: questionText.trim(),
    options: shuffle(options),
    order
  };
}

export async function POST(
  req: Request,
  {
    params
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const adminDb = getAdminDb();
    const auth = getAuth();

    // =====================================================
    // AUTHENTICATION
    // =====================================================

    const authHeader =
      req.headers.get("Authorization");

    if (
      !authHeader?.startsWith(
        "Bearer "
      )
    ) {
      return failed(
        "Unauthorized.",
        401
      );
    }

    const idToken = authHeader
      .replace("Bearer ", "")
      .trim();

    if (!idToken) {
      return failed(
        "Token tidak valid.",
        401
      );
    }

    const decodedToken =
      await auth.verifyIdToken(
        idToken
      );

    const uid =
      decodedToken.uid;

    // =====================================================
    // PARAMETER
    // =====================================================

    const { id } = await params;

    const tryoutId =
      typeof id === "string"
        ? id.trim()
        : "";

    if (!tryoutId) {
      return failed(
        "Tryout ID tidak valid."
      );
    }

    // =====================================================
    // USER
    // =====================================================

    const userRef = adminDb
      .collection("users")
      .doc(uid);

    const userSnap =
      await userRef.get();

    if (!userSnap.exists) {
      return failed(
        "Data pengguna tidak ditemukan.",
        404
      );
    }

    const user =
      userSnap.data()!;

    if (
      user.status !== "ACTIVE"
    ) {
      return failed(
        "Akun pengguna tidak aktif.",
        403
      );
    }

    const userEducationLevelId =
      typeof user.educationLevelId ===
      "string"
        ? user.educationLevelId.trim()
        : "";

    if (!userEducationLevelId) {
      return failed(
        "Jenjang pendidikan pengguna belum ditentukan."
      );
    }

    // =====================================================
    // TRYOUT
    // =====================================================

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

    const tryout =
      tryoutSnap.data()!;

    if (
      tryout.status !==
      "published"
    ) {
      return failed(
        "Tryout belum tersedia.",
        404
      );
    }

    // =====================================================
    // EDUCATION LEVEL
    // =====================================================

    let tryoutEducationLevelId =
      typeof tryout.educationLevelId ===
      "string"
        ? tryout.educationLevelId.trim()
        : "";

    if (
      !tryoutEducationLevelId &&
      tryout.educationLevelRef
    ) {
      tryoutEducationLevelId =
        tryout.educationLevelRef.id;
    }

    if (
      !tryoutEducationLevelId ||
      tryoutEducationLevelId !==
        userEducationLevelId
    ) {
      return failed(
        "Tryout ini tidak tersedia untuk jenjang pendidikan Anda.",
        403
      );
    }

    // =====================================================
    // TRYOUT CONFIGURATION
    // =====================================================

    const totalQuestions =
      Number(
        tryout.totalQuestions ??
          0
      );

    const durationMinutes =
      Number(
        tryout.durationMinutes ??
          0
      );

    const maxAttempt =
      Number(
        tryout.maxAttempt ?? 0
      );

    if (
      !Number.isInteger(
        totalQuestions
      ) ||
      totalQuestions <= 0
    ) {
      return failed(
        "Konfigurasi jumlah soal tryout tidak valid."
      );
    }

    if (
      !Number.isInteger(
        durationMinutes
      ) ||
      durationMinutes <= 0
    ) {
      return failed(
        "Konfigurasi durasi tryout tidak valid."
      );
    }

    // =====================================================
    // QUESTION BANK REFERENCES
    // =====================================================

    const questionBankRefs =
      Array.isArray(
        tryout.questionBankRefs
      )
        ? tryout.questionBankRefs
        : [];

    if (
      questionBankRefs.length === 0
    ) {
      return failed(
        "Tryout belum memiliki bank soal."
      );
    }

    // =====================================================
    // CHECK ATTEMPTS
    // =====================================================

    const previousResultsSnap =
      await adminDb
        .collection(
          "tryoutResults"
        )
        .where(
          "userRef",
          "==",
          userRef
        )
        .where(
          "tryoutRef",
          "==",
          tryoutRef
        )
        .get();

    const previousSessionsSnap =
      await adminDb
        .collection(
          "tryoutSessions"
        )
        .where(
          "userRef",
          "==",
          userRef
        )
        .where(
          "tryoutRef",
          "==",
          tryoutRef
        )
        .get();

    const previousAttempts =
      Math.max(
        previousResultsSnap.size,
        previousSessionsSnap.size
      );

    if (
      maxAttempt > 0 &&
      previousAttempts >=
        maxAttempt
    ) {
      return failed(
        "Jumlah percobaan tryout Anda sudah mencapai batas maksimal."
      );
    }

    const attemptNumber =
      previousAttempts + 1;

    // =====================================================
    // LOAD ALL QUESTIONS
    // =====================================================

    const allQuestions: any[] =
      [];

    const bucket =
      getStorage().bucket();

    for (
      const bankRef of
        questionBankRefs
    ) {
      if (!bankRef) {
        continue;
      }

      const bankSnap =
        await bankRef.get();

      if (!bankSnap.exists) {
        continue;
      }

      const bank =
        bankSnap.data()!;

      if (
        bank.isActive !== true
      ) {
        continue;
      }

      if (!bank.storagePath) {
        continue;
      }

      const storagePath =
        String(
          bank.storagePath
        );

      const file =
        bucket.file(
          storagePath
        );

      const [
        fileExists
      ] = await file.exists();

      if (!fileExists) {
        throw new Error(
          `File bank soal tidak ditemukan: ${storagePath}`
        );
      }

      const [
        buffer
      ] = await file.download();

      const jsonText =
        buffer.toString(
          "utf-8"
        );

      let bankData: any;

      try {
        bankData =
          JSON.parse(
            jsonText
          );
      } catch {
        throw new Error(
          `Format JSON bank soal tidak valid: ${storagePath}`
        );
      }

      if (
        Array.isArray(
          bankData
        )
      ) {
        allQuestions.push(
          ...bankData
        );
      } else if (
        Array.isArray(
          bankData.questions
        )
      ) {
        allQuestions.push(
          ...bankData.questions
        );
      }
    }

    if (
      allQuestions.length === 0
    ) {
      return failed(
        "Soal pada bank soal tidak ditemukan."
      );
    }

    // =====================================================
    // UNIQUE QUESTIONS
    // =====================================================

    const questionMap =
      new Map<
        string,
        any
      >();

    for (
      const question of
        allQuestions
    ) {
      if (!question?.id) {
        continue;
      }

      const questionId =
        String(
          question.id
        );

      if (
        !questionMap.has(
          questionId
        )
      ) {
        questionMap.set(
          questionId,
          question
        );
      }
    }

    const uniqueQuestions =
      Array.from(
        questionMap.values()
      );

    if (
      uniqueQuestions.length <
      totalQuestions
    ) {
      return failed(
        `Jumlah soal tersedia hanya ${uniqueQuestions.length}, sedangkan tryout membutuhkan ${totalQuestions} soal.`
      );
    }

    // =====================================================
    // SELECT QUESTIONS
    // =====================================================

    const shuffledQuestions =
      shuffle(
        uniqueQuestions
      );

    const selectedRawQuestions =
      shuffledQuestions.slice(
        0,
        totalQuestions
      );

    // =====================================================
    // SANITIZE QUESTIONS
    // =====================================================

    const selectedQuestions:
      PublicQuestion[] = [];

    for (
      let index = 0;
      index <
      selectedRawQuestions.length;
      index++
    ) {
      const publicQuestion =
        normalizeQuestion(
          selectedRawQuestions[
            index
          ],
          index + 1
        );

      if (!publicQuestion) {
        continue;
      }

      selectedQuestions.push(
        publicQuestion
      );
    }

    if (
      selectedQuestions.length !==
      totalQuestions
    ) {
      return failed(
        "Sebagian soal tidak memiliki format yang valid."
      );
    }

    // =====================================================
    // SESSION
    // =====================================================

    const sessionRef =
      adminDb
        .collection(
          "tryoutSessions"
        )
        .doc();

    const sessionId =
      sessionRef.id;

    const startedAt =
      new Date();

    const expiresAt =
      new Date(
        startedAt.getTime() +
          durationMinutes *
            60 *
            1000
      );

    const questionIds =
      selectedQuestions.map(
        (question) =>
          question.id
      );

    // =====================================================
    // SESSION DOCUMENT
    // =====================================================

    await sessionRef.set({
      userRef,
      userId: uid,

      tryoutRef,
      tryoutId,

      tryoutTitle:
        tryout.title ??
        tryout.name ??
        null,

      educationLevelId:
        tryoutEducationLevelId,

      educationLevelName:
        tryout.educationLevelName ??
        user.educationLevelName ??
        null,

      subjectId:
        tryout.subjectId ??
        null,

      subjectName:
        tryout.subjectName ??
        null,

      questionIds,

      totalQuestions,

      durationMinutes,

      passingScore:
        Number(
          tryout.passingScore ??
            0
        ),

      attemptNumber,

      status:
        "IN_PROGRESS",

      startedAt,

      expiresAt,

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp()
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return success({
      message:
        "Tryout berhasil dimulai.",

      sessionId,

      tryout: {
        id: tryoutId,

        title:
          tryout.title ??
          tryout.name ??
          "Tryout",

        totalQuestions,

        durationMinutes,

        passingScore:
          Number(
            tryout.passingScore ??
              0
          ),

        attemptNumber
      },

      session: {
        id: sessionId,

        startedAt:
          startedAt.toISOString(),

        expiresAt:
          expiresAt.toISOString(),

        durationMinutes,

        totalQuestions
      },

      questions:
        selectedQuestions
    });
  } catch (error) {
    console.error(
      "TRYOUT START API ERROR:",
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