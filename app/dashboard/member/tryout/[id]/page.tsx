"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useParams, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type QuestionType =
  | "multiple_choice"
  | "multiple_select"
  | "true_false";

interface Option {
  id: string;
  text: string;
  label?: string;
}

interface TrueFalseStatement {
  id: string;
  text: string;
}

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: Option[];
  statements?: TrueFalseStatement[];
  order: number;
}

interface TryoutData {
  id: string;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  attemptNumber: number;
}

interface SessionData {
  id: string;
  startedAt: string;
  expiresAt: string;
  durationMinutes: number;
  totalQuestions: number;
}

interface StartResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
  tryout?: TryoutData;
  session?: SessionData;
  questions?: Question[];
}

interface MultipleChoiceAnswer {
  questionId: string;
  type: "multiple_choice";
  selectedOptionId: string | null;
}

interface MultipleSelectAnswer {
  questionId: string;
  type: "multiple_select";
  selectedOptionIds: string[];
}

interface TrueFalseAnswer {
  questionId: string;
  type: "true_false";
  answers: Record<string, boolean | null>;
}

type Answer =
  | MultipleChoiceAnswer
  | MultipleSelectAnswer
  | TrueFalseAnswer;

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, seconds);

  const hours = Math.floor(
    safeSeconds / 3600
  );

  const minutes = Math.floor(
    (safeSeconds % 3600) / 60
  );

  const secs = safeSeconds % 60;

  if (hours > 0) {
    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(secs).padStart(2, "0")
    ].join(":");
  }

  return [
    String(minutes).padStart(2, "0"),
    String(secs).padStart(2, "0")
  ].join(":");
}

function getInitialTrueFalse(
  question: Question
) {
  const result: Record<
    string,
    boolean | null
  > = {};

  for (const statement of question.statements ?? []) {
    result[statement.id] = null;
  }

  return result;
}

export default function TryoutPage() {
  const params = useParams();
  const router = useRouter();

  const tryoutId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [tryout, setTryout] =
    useState<TryoutData | null>(null);

  const [session, setSession] =
    useState<SessionData | null>(null);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [answers, setAnswers] =
    useState<Record<string, Answer>>({});

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [remainingSeconds, setRemainingSeconds] =
    useState(0);

  const [showSubmitModal, setShowSubmitModal] =
    useState(false);

  const [autoSubmitted, setAutoSubmitted] =
    useState(false);

  const currentQuestion =
    questions[currentIndex];

  const answeredCount = useMemo(() => {
    return questions.filter((question) => {
      const answer = answers[question.id];

      if (!answer) {
        return false;
      }

      if (answer.questionId !== question.id) {
        return false;
      }

      if (
        question.type === "multiple_choice" &&
        answer.type === "multiple_choice"
      ) {
        return Boolean(
          answer.selectedOptionId
        );
      }

      if (
        question.type === "multiple_select" &&
        answer.type === "multiple_select"
      ) {
        return (
          answer.selectedOptionIds.length > 0
        );
      }

      if (
        question.type === "true_false" &&
        answer.type === "true_false"
      ) {
        return Object.values(
          answer.answers
        ).some(
          (value) => value !== null
        );
      }

      return false;
    }).length;
  }, [answers, questions]);

  const getToken = useCallback(
    async () => {
      const user = auth.currentUser;

      if (!user) {
        throw new Error(
          "Sesi login tidak ditemukan."
        );
      }

      return user.getIdToken();
    },
    []
  );

  useEffect(() => {
    let mounted = true;

    async function startTryout() {
      try {
        setLoading(true);
        setError("");

        if (!tryoutId) {
          throw new Error(
            "Tryout ID tidak valid."
          );
        }

        const token = await getToken();

        const response = await fetch(
          `/api/tryouts/${tryoutId}/start`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "application/json"
            }
          }
        );

        const data =
          (await response.json()) as StartResponse;

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ??
              "Gagal memulai tryout."
          );
        }

        if (
          !data.sessionId ||
          !data.tryout ||
          !data.session ||
          !data.questions
        ) {
          throw new Error(
            "Data session tryout tidak lengkap."
          );
        }

        if (!mounted) {
          return;
        }

        setTryout(data.tryout);
        setSession(data.session);
        setQuestions(data.questions);

        const initialAnswers:
          Record<string, Answer> = {};

        for (const question of data.questions) {
          if (
            question.type ===
            "multiple_choice"
          ) {
            initialAnswers[question.id] = {
              questionId: question.id,
              type: "multiple_choice",
              selectedOptionId: null
            };
          }

          if (
            question.type ===
            "multiple_select"
          ) {
            initialAnswers[question.id] = {
              questionId: question.id,
              type: "multiple_select",
              selectedOptionIds: []
            };
          }

          if (
            question.type ===
            "true_false"
          ) {
            initialAnswers[question.id] = {
              questionId: question.id,
              type: "true_false",
              answers:
                getInitialTrueFalse(
                  question
                )
            };
          }
        }

        setAnswers(initialAnswers);

        const expires =
          new Date(
            data.session.expiresAt
          ).getTime();

        setRemainingSeconds(
          Math.max(
            0,
            Math.floor(
              (expires -
                Date.now()) /
                1000
            )
          )
        );
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Gagal memulai tryout."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    startTryout();

    return () => {
      mounted = false;
    };
  }, [tryoutId, getToken]);

  useEffect(() => {
    if (
      !session ||
      submitting ||
      autoSubmitted
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      const expires =
        new Date(
          session.expiresAt
        ).getTime();

      const remaining =
        Math.max(
          0,
          Math.floor(
            (expires -
              Date.now()) /
              1000
          )
        );

      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        window.clearInterval(timer);
        setAutoSubmitted(true);
      }
    }, 1000);

    return () =>
      window.clearInterval(timer);
  }, [
    session,
    submitting,
    autoSubmitted
  ]);

  useEffect(() => {
    if (!autoSubmitted) {
      return;
    }

    submitTryout(true);
  }, [autoSubmitted]);

  function selectSingleOption(
    questionId: string,
    optionId: string
  ) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: {
        questionId,
        type: "multiple_choice",
        selectedOptionId: optionId
      }
    }));
  }

  function toggleMultipleOption(
    questionId: string,
    optionId: string
  ) {
    setAnswers((previous) => {
      const existing =
        previous[questionId];

      const selected =
        existing?.type ===
        "multiple_select"
          ? existing.selectedOptionIds
          : [];

      const exists =
        selected.includes(optionId);

      const next = exists
        ? selected.filter(
            (id) => id !== optionId
          )
        : [...selected, optionId];

      return {
        ...previous,
        [questionId]: {
          questionId,
          type: "multiple_select",
          selectedOptionIds: next
        }
      };
    });
  }

  function setTrueFalse(
    questionId: string,
    statementId: string,
    value: boolean
  ) {
    setAnswers((previous) => {
      const existing =
        previous[questionId];

      const current =
        existing?.type ===
        "true_false"
          ? existing.answers
          : {};

      return {
        ...previous,
        [questionId]: {
          questionId,
          type: "true_false",
          answers: {
            ...current,
            [statementId]: value
          }
        }
      };
    });
  }

  async function submitTryout(
    automatic = false
  ) {
    if (
      submitting ||
      !session
    ) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const token = await getToken();

      const payloadAnswers =
        questions.map((question) => {
          const answer =
            answers[question.id];

          if (
            question.type ===
            "multiple_choice"
          ) {
            return {
              questionId: question.id,
              type: "multiple_choice",
              selectedOptionId:
                answer?.type ===
                "multiple_choice"
                  ? answer.selectedOptionId
                  : null
            };
          }

          if (
            question.type ===
            "multiple_select"
          ) {
            return {
              questionId: question.id,
              type: "multiple_select",
              selectedOptionIds:
                answer?.type ===
                "multiple_select"
                  ? answer.selectedOptionIds
                  : []
            };
          }

          return {
            questionId: question.id,
            type: "true_false",
            answers:
              answer?.type ===
              "true_false"
                ? answer.answers
                : getInitialTrueFalse(
                    question
                  )
          };
        });

      const response = await fetch(
        "/api/tryout-results",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            sessionId: session.id,
            answers: payloadAnswers
          })
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ??
            "Gagal mengirim hasil tryout."
        );
      }

      const resultId =
        data.resultId;

      if (!resultId) {
        throw new Error(
          "Hasil tryout tidak ditemukan."
        );
      }

      router.replace(
        `/dashboard/member/hasil/${resultId}`
      );
    } catch (err) {
      setSubmitting(false);

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim hasil tryout."
      );

      if (automatic) {
        setAutoSubmitted(false);
      }
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-2/3 rounded-lg bg-slate-200" />
            <div className="h-24 rounded-xl bg-white shadow-sm" />
            <div className="h-80 rounded-xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    );
  }

  if (error && !tryout) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Tryout tidak dapat dimulai
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Kembali
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (
    !tryout ||
    !session ||
    !currentQuestion
  ) {
    return null;
  }

  const currentAnswer =
    answers[currentQuestion.id];

  const isLastQuestion =
    currentIndex ===
    questions.length - 1;

  const answeredCurrent =
    currentAnswer?.type ===
      "multiple_choice"
      ? Boolean(
          currentAnswer.selectedOptionId
        )
      : currentAnswer?.type ===
          "multiple_select"
        ? currentAnswer
            .selectedOptionIds
            .length > 0
        : currentAnswer?.type ===
            "true_false"
          ? Object.values(
              currentAnswer.answers
            ).some(
              (value) =>
                value !== null
            )
          : false;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">
              {tryout.title}
            </h1>

            <p className="text-xs text-slate-500">
              Soal {currentIndex + 1} dari{" "}
              {questions.length}
            </p>
          </div>

          <div
            className={`shrink-0 rounded-xl px-3 py-2 text-sm font-bold tabular-nums sm:px-4 ${
              remainingSeconds <= 60
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-800"
            }`}
          >
            ⏱ {formatTime(
              remainingSeconds
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-3 py-4 sm:px-6 lg:grid-cols-[1fr_280px] lg:gap-6 lg:py-6">
        <section className="min-w-0">
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                {currentIndex + 1}
              </span>

              <div className="min-w-0 flex-1">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {currentQuestion.type ===
                  "multiple_choice"
                    ? "Pilihan Ganda"
                    : currentQuestion.type ===
                        "multiple_select"
                      ? "Pilihan Ganda Kompleks"
                      : "Benar / Salah"}
                </div>

                <div className="whitespace-pre-wrap text-base font-medium leading-7 text-slate-900 sm:text-lg">
                  {currentQuestion.question}
                </div>
              </div>
            </div>

            {currentQuestion.type ===
              "multiple_choice" && (
              <div className="space-y-3">
                {(
                  currentQuestion.options ??
                  []
                ).map(
                  (option, index) => {
                    const selected =
                      currentAnswer?.type ===
                        "multiple_choice" &&
                      currentAnswer.selectedOptionId ===
                        option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          selectSingleOption(
                            currentQuestion.id,
                            option.id
                          )
                        }
                        className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${
                          selected
                            ? "border-slate-900 bg-slate-100"
                            : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                            selected
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {option.label ??
                            String.fromCharCode(
                              65 + index
                            )}
                        </span>

                        <span className="pt-1 text-sm leading-6 text-slate-800 sm:text-base">
                          {option.text}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            )}

            {currentQuestion.type ===
              "multiple_select" && (
              <div className="space-y-3">
                <p className="mb-4 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                  Pilih semua jawaban yang menurut Anda benar.
                </p>

                {(
                  currentQuestion.options ??
                  []
                ).map(
                  (option, index) => {
                    const selected =
                      currentAnswer?.type ===
                        "multiple_select" &&
                      currentAnswer.selectedOptionIds.includes(
                        option.id
                      );

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          toggleMultipleOption(
                            currentQuestion.id,
                            option.id
                          )
                        }
                        className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${
                          selected
                            ? "border-slate-900 bg-slate-100"
                            : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                            selected
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selected
                            ? "✓"
                            : ""}
                        </span>

                        <span className="text-sm leading-6 text-slate-800 sm:text-base">
                          <span className="mr-2 font-semibold">
                            {option.label ??
                              String.fromCharCode(
                                65 + index
                              )}
                            .
                          </span>

                          {option.text}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            )}

            {currentQuestion.type ===
              "true_false" && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="w-12 border-b border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-600">
                          #
                        </th>

                        <th className="border-b border-slate-200 px-3 py-3 text-left text-xs font-bold text-slate-600">
                          Pernyataan
                        </th>

                        <th className="w-24 border-b border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-600">
                          Benar
                        </th>

                        <th className="w-24 border-b border-slate-200 px-3 py-3 text-center text-xs font-bold text-slate-600">
                          Salah
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {(
                        currentQuestion.statements ??
                        []
                      ).map(
                        (statement, index) => {
                          const value =
                            currentAnswer?.type ===
                            "true_false"
                              ? currentAnswer
                                  .answers[
                                  statement.id
                                ]
                              : null;

                          return (
                            <tr
                              key={
                                statement.id
                              }
                              className="border-b border-slate-200 last:border-b-0"
                            >
                              <td className="px-3 py-4 text-center text-sm font-semibold text-slate-500">
                                {String.fromCharCode(
                                  65 + index
                                )}
                              </td>

                              <td className="px-3 py-4 text-sm leading-6 text-slate-800">
                                {statement.text}
                              </td>

                              <td className="px-3 py-4 text-center">
                                <input
                                  type="radio"
                                  name={`tf-${currentQuestion.id}-${statement.id}`}
                                  checked={
                                    value ===
                                    true
                                  }
                                  onChange={() =>
                                    setTrueFalse(
                                      currentQuestion.id,
                                      statement.id,
                                      true
                                    )
                                  }
                                  className="h-5 w-5 accent-slate-900"
                                />
                              </td>

                              <td className="px-3 py-4 text-center">
                                <input
                                  type="radio"
                                  name={`tf-${currentQuestion.id}-${statement.id}`}
                                  checked={
                                    value ===
                                    false
                                  }
                                  onChange={() =>
                                    setTrueFalse(
                                      currentQuestion.id,
                                      statement.id,
                                      false
                                    )
                                  }
                                  className="h-5 w-5 accent-slate-900"
                                />
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled={
                  currentIndex === 0 ||
                  submitting
                }
                onClick={() =>
                  setCurrentIndex(
                    (index) =>
                      Math.max(
                        0,
                        index - 1
                      )
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                ← Sebelumnya
              </button>

              {!isLastQuestion ? (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    setCurrentIndex(
                      (index) =>
                        Math.min(
                          questions.length -
                            1,
                          index + 1
                        )
                    )
                  }
                  className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
                >
                  Berikutnya →
                </button>
              ) : (
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() =>
                    setShowSubmitModal(
                      true
                    )
                  }
                  className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white sm:w-auto"
                >
                  Selesaikan Tryout
                </button>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>
        </section>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900">
                Daftar Soal
              </h2>

              <span className="text-xs text-slate-500">
                {answeredCount}/
                {questions.length}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-5">
              {questions.map(
                (question, index) => {
                  const answer =
                    answers[question.id];

                  const answered =
                    answer?.type ===
                      "multiple_choice"
                      ? Boolean(
                          answer.selectedOptionId
                        )
                      : answer?.type ===
                          "multiple_select"
                        ? answer.selectedOptionIds
                            .length > 0
                        : answer?.type ===
                            "true_false"
                          ? Object.values(
                              answer.answers
                            ).some(
                              (value) =>
                                value !==
                                null
                            )
                          : false;

                  const active =
                    index ===
                    currentIndex;

                  return (
                    <button
                      key={question.id}
                      type="button"
                      onClick={() =>
                        setCurrentIndex(
                          index
                        )
                      }
                      className={`h-10 rounded-lg text-xs font-bold transition ${
                        active
                          ? "bg-slate-900 text-white ring-2 ring-slate-300"
                          : answered
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-5 space-y-2 border-t pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-slate-900" />
                Soal aktif
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-emerald-100" />
                Sudah dijawab
              </div>

              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded bg-slate-100" />
                Belum dijawab
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              Selesaikan tryout?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Setelah dikirim, jawaban tidak dapat diubah lagi.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Sudah dijawab
                </span>

                <strong>
                  {answeredCount} /{" "}
                  {questions.length}
                </strong>
              </div>

              <div className="mt-2 flex justify-between">
                <span className="text-slate-500">
                  Belum dijawab
                </span>

                <strong>
                  {questions.length -
                    answeredCount}
                </strong>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  setShowSubmitModal(false)
                }
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Kembali
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setShowSubmitModal(false);
                  submitTryout(false);
                }}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
              >
                {submitting
                  ? "Mengirim..."
                  : "Ya, Kirim Jawaban"}
              </button>
            </div>
          </div>
        </div>
      )}

      {submitting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="rounded-2xl bg-white px-6 py-5 text-center shadow-xl">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

            <p className="mt-4 text-sm font-semibold text-slate-900">
              Menyimpan hasil tryout...
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Jangan tutup halaman.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}