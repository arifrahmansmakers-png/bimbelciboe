import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

interface MultipleChoiceAnswer {
  questionId: string;
  selectedOptionIds: string[];
}

interface TrueFalseAnswer {
  questionId: string;
  answers: Record<string, boolean | null>;
}

type AnswerInput =
  | MultipleChoiceAnswer
  | TrueFalseAnswer;

const success = (data: Record<string, unknown>) =>
  NextResponse.json({
    success: true,
    ...data
  });

const failed = (
  message: string,
  status = 400
) =>
  NextResponse.json(
    {
      success: false,
      message
    },
    {
      status
    }
  );

function normalizeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter(
          (item): item is string =>
            typeof item === "string"
        )
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function arraysEqual(
  a: string[],
  b: string[]
): boolean {
  if (a.length !== b.length) {
    return false;
  }

  const aSorted = [...a].sort();
  const bSorted = [...b].sort();

  return aSorted.every(
    (value, index) =>
      value === bSorted[index]
  );
}

function normalizeBoolean(
  value: unknown
): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

export async function POST(req: Request) {
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
    // REQUEST
    // =====================================================

    const body = await req.json();

    const sessionId =
      typeof body.sessionId ===
      "string"
        ? body.sessionId.trim()
        : "";

    if (!sessionId) {
      return failed(
        "Session ID wajib diisi."
      );
    }

    if (
      !Array.isArray(body.answers)
    ) {
      return failed(
        "Format jawaban tidak valid."
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

    // =====================================================
    // SESSION
    // =====================================================

    const sessionRef =
      adminDb
        .collection(
          "tryoutSessions"
        )
        .doc(sessionId);

    const sessionSnap =
      await sessionRef.get();

    if (!sessionSnap.exists) {
      return failed(
        "Session tryout tidak ditemukan.",
        404
      );
    }

    const session =
      sessionSnap.data()!;

    // =====================================================
    // SESSION OWNERSHIP
    // =====================================================

    const sessionUserId =
      typeof session.userId ===
      "string"
        ? session.userId
        : "";

    if (
      sessionUserId !== uid
    ) {
      return failed(
        "Anda tidak memiliki akses ke session ini.",
        403
      );
    }

    // =====================================================
    // SESSION STATUS
    // =====================================================

    if (
      session.status ===
      "COMPLETED"
    ) {
      return failed(
        "Tryout ini sudah pernah dikumpulkan."
      );
    }

    if (
      session.status !==
      "IN_PROGRESS"
    ) {
      return failed(
        "Session tryout tidak dapat dikumpulkan."
      );
    }

    // =====================================================
    // SESSION CONFIGURATION
    // =====================================================

    const tryoutId =
      typeof session.tryoutId ===
      "string"
        ? session.tryoutId.trim()
        : "";

    if (!tryoutId) {
      return failed(
        "Tryout pada session tidak valid."
      );
    }

    const totalQuestions =
      Number(
        session.totalQuestions ??
          0
      );

    if (
      !Number.isInteger(
        totalQuestions
      ) ||
      totalQuestions <= 0
    ) {
      return failed(
        "Jumlah soal pada session tidak valid."
      );
    }

    const questionIds =
      Array.isArray(
        session.questionIds
      )
        ? Array.from(
            new Set(
              session.questionIds
                .map(String)
                .map((id) =>
                  id.trim()
                )
                .filter(Boolean)
            )
          )
        : [];

    if (
      questionIds.length !==
      totalQuestions
    ) {
      return failed(
        "Data soal pada session tidak valid."
      );
    }

    // =====================================================
    // TIME VALIDATION
    // =====================================================

    const startedAt =
      session.startedAt?.toDate
        ? session.startedAt.toDate()
        : new Date(
            session.startedAt
          );

    const expiresAt =
      session.expiresAt?.toDate
        ? session.expiresAt.toDate()
        : new Date(
            session.expiresAt
          );

    if (
      Number.isNaN(
        startedAt.getTime()
      ) ||
      Number.isNaN(
        expiresAt.getTime()
      )
    ) {
      return failed(
        "Waktu session tidak valid."
      );
    }

    const submittedAt =
      new Date();

    if (
      submittedAt.getTime() <
      startedAt.getTime()
    ) {
      return failed(
        "Waktu pengiriman tidak valid."
      );
    }

    const durationSeconds =
      Math.max(
        0,
        Math.floor(
          (
            submittedAt.getTime() -
            startedAt.getTime()
          ) / 1000
        )
      );

    const expired =
      submittedAt.getTime() >
      expiresAt.getTime();

    // =====================================================
    // TRYOUT
    // =====================================================

    const tryoutRef =
      adminDb
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

    // =====================================================
    // QUESTION BANK
    // =====================================================

    const questionBankRefs =
      Array.isArray(
        tryout.questionBankRefs
      )
        ? tryout.questionBankRefs
        : [];

    if (
      questionBankRefs.length ===
      0
    ) {
      return failed(
        "Tryout belum memiliki bank soal."
      );
    }

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
      allQuestions.length ===
      0
    ) {
      return failed(
        "Soal pada bank soal tidak ditemukan."
      );
    }

    // =====================================================
    // QUESTION MAP
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

    // =====================================================
    // VERIFY SESSION QUESTIONS
    // =====================================================

    const selectedQuestions =
      questionIds.map(
        (questionId) =>
          questionMap.get(
            questionId
          )
      );

    if (
      selectedQuestions.some(
        (question) =>
          !question
      )
    ) {
      return failed(
        "Sebagian soal pada session tidak ditemukan."
      );
    }

    // =====================================================
    // NORMALIZE SUBMITTED ANSWERS
    // =====================================================

    const submittedAnswerMap =
      new Map<
        string,
        any
      >();

    for (
      const rawAnswer of
        body.answers
    ) {
      if (
        !rawAnswer ||
        typeof rawAnswer !==
          "object"
      ) {
        continue;
      }

      if (
        typeof rawAnswer.questionId !==
        "string"
      ) {
        continue;
      }

      const questionId =
        rawAnswer.questionId.trim();

      if (!questionId) {
        continue;
      }

      if (
        !questionIds.includes(
          questionId
        )
      ) {
        return failed(
          `Soal ${questionId} bukan bagian dari session tryout.`
        );
      }

      submittedAnswerMap.set(
        questionId,
        rawAnswer
      );
    }

    // =====================================================
    // CALCULATE RESULT
    // =====================================================

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unanswered = 0;

    const resultAnswers:
      Record<
        string,
        unknown
      >[] = [];

    for (
      const question of
        selectedQuestions
    ) {
      const questionId =
        String(
          question.id
        );

      const type =
        String(
          question.type ??
            question.questionType ??
            ""
        );

      const submitted =
        submittedAnswerMap.get(
          questionId
        );

      // ===================================================
      // MULTIPLE CHOICE / MULTIPLE SELECT
      // ===================================================

      if (
        type ===
          "multiple_choice" ||
        type ===
          "multiple_select"
      ) {
        const selectedOptionIds =
          normalizeStringArray(
            submitted?.selectedOptionIds
          );

        if (
          selectedOptionIds.length ===
          0
        ) {
          unanswered++;

          resultAnswers.push({
            questionId,
            type,
            selectedOptionIds: [],
            isCorrect: false
          });

          continue;
        }

        const correctOptionIds =
          type ===
          "multiple_choice"
            ? normalizeStringArray([
                question.correctOptionId ??
                  question.answer ??
                  question.correctAnswer
              ])
            : normalizeStringArray(
                question.correctOptionIds ??
                  question.correctAnswers ??
                  question.answer
              );

        if (
          correctOptionIds.length ===
          0
        ) {
          throw new Error(
            `Kunci jawaban soal ${questionId} tidak ditemukan.`
          );
        }

        // Multiple choice harus tepat satu.
        if (
          type ===
            "multiple_choice" &&
          selectedOptionIds.length !==
            1
        ) {
          wrongAnswers++;

          resultAnswers.push({
            questionId,
            type,
            selectedOptionIds,
            isCorrect: false
          });

          continue;
        }

        // Multiple select harus sama persis.
        const isCorrect =
          arraysEqual(
            selectedOptionIds,
            correctOptionIds
          );

        if (isCorrect) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }

        resultAnswers.push({
          questionId,
          type,
          selectedOptionIds,
          isCorrect
        });

        continue;
      }

      // ===================================================
      // TRUE / FALSE
      // ===================================================

      if (
        type ===
        "true_false"
      ) {
        const rawSubmittedAnswers =
          submitted?.answers;

        const submittedAnswers:
          Record<
            string,
            boolean | null
          > = {};

        if (
          rawSubmittedAnswers &&
          typeof rawSubmittedAnswers ===
            "object" &&
          !Array.isArray(
            rawSubmittedAnswers
          )
        ) {
          for (
            const [
              statementId,
              value
            ] of Object.entries(
              rawSubmittedAnswers
            )
          ) {
            submittedAnswers[
              String(
                statementId
              )
            ] =
              normalizeBoolean(
                value
              );
          }
        }

        const statements =
          Array.isArray(
            question.statements
          )
            ? question.statements
            : [];

        if (
          statements.length ===
          0
        ) {
          throw new Error(
            `Pernyataan true/false pada soal ${questionId} tidak ditemukan.`
          );
        }

        let hasUnanswered =
          false;

        let isCorrect = true;

        const evaluatedStatements:
          Record<
            string,
            unknown
          >[] = [];

        for (
          const statement of
            statements
        ) {
          const statementId =
            String(
              statement.id
            );

          const submittedValue =
            submittedAnswers[
              statementId
            ];

          const correctValue =
            normalizeBoolean(
              statement.answer ??
                statement.correctAnswer
            );

          if (
            submittedValue ===
            null ||
            submittedValue ===
              undefined
          ) {
            hasUnanswered =
              true;

            evaluatedStatements.push(
              {
                id: statementId,
                selected: null,
                isCorrect: false
              }
            );

            continue;
          }

          if (
            correctValue ===
            null
          ) {
            throw new Error(
              `Kunci jawaban pernyataan ${questionId}-${statementId} tidak ditemukan.`
            );
          }

          const statementCorrect =
            submittedValue ===
            correctValue;

          if (
            !statementCorrect
          ) {
            isCorrect = false;
          }

          evaluatedStatements.push(
            {
              id: statementId,
              selected:
                submittedValue,
              isCorrect:
                statementCorrect
            }
          );
        }

        if (hasUnanswered) {
          unanswered++;

          resultAnswers.push({
            questionId,
            type,
            answers:
              evaluatedStatements,
            isCorrect: false
          });

          continue;
        }

        if (isCorrect) {
          correctAnswers++;
        } else {
          wrongAnswers++;
        }

        resultAnswers.push({
          questionId,
          type,
          answers:
            evaluatedStatements,
          isCorrect
        });

        continue;
      }

      throw new Error(
        `Tipe soal ${type} pada soal ${questionId} tidak didukung.`
      );
    }

    // =====================================================
    // SCORE
    // =====================================================

    const percentage =
      totalQuestions > 0
        ? (
            correctAnswers /
            totalQuestions
          ) * 100
        : 0;

    const score =
      Math.round(
        percentage * 100
      ) / 100;

    const passingScore =
      Number(
        session.passingScore ??
          tryout.passingScore ??
          0
      );

    const passed =
      score >= passingScore;

    // =====================================================
    // RESULT REFERENCES
    // =====================================================

    const resultRef =
      adminDb
        .collection(
          "tryoutResults"
        )
        .doc();

    const resultId =
      resultRef.id;

    const educationLevelRef =
      session.educationLevelId
        ? adminDb
            .collection(
              "educationLevels"
            )
            .doc(
              String(
                session.educationLevelId
              )
            )
        : null;

    const subjectRef =
      session.subjectId
        ? adminDb
            .collection(
              "subjects"
            )
            .doc(
              String(
                session.subjectId
              )
            )
        : null;

    // =====================================================
    // ATOMIC SUBMIT
    // =====================================================

    await adminDb.runTransaction(
      async (transaction) => {
        const currentSessionSnap =
          await transaction.get(
            sessionRef
          );

        if (
          !currentSessionSnap.exists
        ) {
          throw new Error(
            "Session tryout tidak ditemukan."
          );
        }

        const currentSession =
          currentSessionSnap.data()!;

        if (
          currentSession.userId !==
          uid
        ) {
          throw new Error(
            "Anda tidak memiliki akses ke session ini."
          );
        }

        if (
          currentSession.status ===
          "COMPLETED"
        ) {
          throw new Error(
            "Tryout ini sudah pernah dikumpulkan."
          );
        }

        if (
          currentSession.status !==
          "IN_PROGRESS"
        ) {
          throw new Error(
            "Session tryout tidak dapat dikumpulkan."
          );
        }

        // =================================================
        // RESULT
        // =================================================

        transaction.set(
          resultRef,
          {
            userRef,
            userId: uid,

            sessionRef,
            sessionId,

            tryoutRef,
            tryoutId,

            tryoutTitle:
              session.tryoutTitle ??
              tryout.title ??
              tryout.name ??
              null,

            educationLevelRef:
              educationLevelRef ??
              null,

            educationLevelId:
              session.educationLevelId ??
              null,

            educationLevelName:
              session.educationLevelName ??
              null,

            subjectRef:
              subjectRef ??
              null,

            subjectId:
              session.subjectId ??
              null,

            subjectName:
              session.subjectName ??
              null,

            totalQuestions,

            correctAnswers,

            wrongAnswers,

            unanswered,

            score,

            percentage,

            passingScore,

            passed,

            durationSeconds,

            attemptNumber:
              Number(
                session.attemptNumber ??
                  1
              ),

            expired,

            answers:
              resultAnswers,

            startedAt,

            expiresAt,

            submittedAt,

            createdAt:
              FieldValue.serverTimestamp(),

            updatedAt:
              FieldValue.serverTimestamp(),

            schemaVersion: 3
          }
        );

        // =================================================
        // SESSION
        // =================================================

        transaction.update(
          sessionRef,
          {
            status:
              "COMPLETED",

            resultRef,

            resultId,

            submittedAt,

            expired,

            updatedAt:
              FieldValue.serverTimestamp()
          }
        );
      }
    );

    // =====================================================
    // USER ACTIVITY
    // =====================================================

    const activityRef =
      adminDb
        .collection(
          "userActivities"
        )
        .doc(
          `${uid}_${resultId}`
        );

    await activityRef.set({
      userRef,
      userId: uid,

      type:
        "TRYOUT_COMPLETED",

      action:
        "TRYOUT_COMPLETED",

      description:
        `Menyelesaikan tryout ${
          session.tryoutTitle ??
          ""
        } dengan nilai ${score}.`,

      tryoutRef,
      tryoutId,

      sessionRef,
      sessionId,

      tryoutResultRef:
        resultRef,

      tryoutResultId:
        resultId,

      score,
      passed,

      createdAt:
        FieldValue.serverTimestamp()
    });

    // =====================================================
    // NOTIFICATION
    // =====================================================

    const notificationRef =
      adminDb
        .collection(
          "notifications"
        )
        .doc(
          `${uid}_${resultId}`
        );

    await notificationRef.set({
      userRef,
      userId: uid,

      type:
        "TRYOUT_RESULT",

      title:
        "Tryout selesai",

      message:
        `Tryout ${
          session.tryoutTitle ??
          ""
        } selesai. Nilai Anda ${score}.`,

      read: false,

      tryoutRef,
      tryoutId,

      sessionRef,
      sessionId,

      tryoutResultRef:
        resultRef,

      tryoutResultId:
        resultId,

      createdAt:
        FieldValue.serverTimestamp()
    });

    // =====================================================
    // RESPONSE
    // =====================================================

    return success({
      message:
        "Hasil tryout berhasil disimpan.",

      resultId,

      sessionId,

      result: {
        tryoutId,

        totalQuestions,

        correctAnswers,

        wrongAnswers,

        unanswered,

        score,

        percentage,

        passingScore,

        passed,

        durationSeconds,

        attemptNumber:
          Number(
            session.attemptNumber ??
              1
          ),

        expired
      }
    });
  } catch (error) {
    console.error(
      "TRYOUT RESULT API ERROR:",
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