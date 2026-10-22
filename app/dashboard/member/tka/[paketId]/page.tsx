"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  TKAPaket,
  TKASoal,
  MemberProgressItem,
  isTKAPaketUnlocked,
} from "@/data/tka_member";
import {
  getCustomPaketById,
  getCustomPaketsBySubject,
} from "@/data/tka_member/store";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Trophy,
  RotateCcw,
  BookOpen,
  Sparkles,
  Award,
  ChevronLeft,
  ChevronRight,
  FileCheck,
  Lock,
  Eye,
} from "lucide-react";

export default function TKAPaketUjianPage() {
  const params = useParams();
  const router = useRouter();
  const paketId = typeof params.paketId === "string" ? params.paketId : "";

  const [paket, setPaket] = useState<TKAPaket | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [jawaban, setJawaban] = useState<Record<string, any>>({});
  const [raguRagu, setRaguRagu] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreResult, setScoreResult] = useState<MemberProgressItem | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Load paket data & progress
  useEffect(() => {
    if (!paketId) return;

    const data = getCustomPaketById(paketId);
    if (!data) {
      router.push("/dashboard/member/tryout");
      return;
    }

    setPaket(data);

    // Cek status unlock dari localStorage
    let progressMap: Record<string, MemberProgressItem> = {};
    try {
      const stored = localStorage.getItem("tka_member_progress_v1");
      if (stored) {
        progressMap = JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }

    const unlocked = isTKAPaketUnlocked(data.subjectId, data.paketNumber, progressMap);
    if (!unlocked) {
      setIsLocked(true);
      return;
    }

    // Jika sudah pernah dikerjakan, muat data sebelumnya
    const prevResult = progressMap[data.id];
    if (prevResult) {
      setScoreResult(prevResult);
      if (prevResult.userAnswers) {
        setJawaban(prevResult.userAnswers);
      }
    }

    // Inisialisasi timer (detik)
    const totalDetik = data.durasiMenit * 60;
    setTimeLeft(totalDetik);
    setIsReady(true);
  }, [paketId, router]);

  // Timer logic
  useEffect(() => {
    if (!isReady || isSubmitted || isLocked || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isReady, isSubmitted, isLocked, timeLeft]);

  if (isLocked && paket) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Lock size={40} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 mb-3">
          Paket Ini Masih Terkunci 🔒
        </h1>
        <p className="text-slate-600 mb-6 leading-relaxed">
          Untuk membuka <strong>{paket.title}</strong>, Anda harus menyelesaikan{" "}
          <strong>Paket {paket.paketNumber - 1}</strong> terlebih dahulu dengan{" "}
          <span className="text-emerald-600 font-bold">nilai lebih dari 50</span>.
        </p>
        <Link
          href="/dashboard/member/tryout"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          <ArrowLeft size={18} />
          Kembali ke Daftar Paket
        </Link>
      </div>
    );
  }

  if (!paket || !isReady) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const soalList = paket.soalList;
  const currentSoal = soalList[currentIdx];

  // Helper seleksi jawaban
  const handleSelectPG = (opsiKey: string) => {
    if (isSubmitted) return;
    setJawaban((prev) => ({
      ...prev,
      [currentSoal.id]: opsiKey,
    }));
  };

  const handleToggleMCMA = (opsiKey: string) => {
    if (isSubmitted) return;
    const current = (jawaban[currentSoal.id] as string[]) || [];
    let updated: string[];
    if (current.includes(opsiKey)) {
      updated = current.filter((k) => k !== opsiKey);
    } else {
      updated = [...current, opsiKey];
    }
    setJawaban((prev) => ({
      ...prev,
      [currentSoal.id]: updated,
    }));
  };

  const handleSelectBS = (val: string) => {
    if (isSubmitted) return;
    setJawaban((prev) => ({
      ...prev,
      [currentSoal.id]: val,
    }));
  };

  const toggleRagu = (soalId: string) => {
    setRaguRagu((prev) => ({
      ...prev,
      [soalId]: !prev[soalId],
    }));
  };

  // Submit & hitung nilai
  const handleSubmitExam = () => {
    setShowSubmitModal(false);

    let correct = 0;

    soalList.forEach((s) => {
      const userAns = jawaban[s.id];
      if (s.tipe === "PG") {
        if (typeof userAns === "string" && typeof s.kunci === "string") {
          if (userAns.trim().toUpperCase() === s.kunci.trim().toUpperCase()) {
            correct += 1;
          }
        }
      } else if (s.tipe === "BS") {
        if (typeof userAns === "string" && typeof s.kunci === "string") {
          if (userAns.trim().toUpperCase() === s.kunci.trim().toUpperCase()) {
            correct += 1;
          }
        }
      } else if (s.tipe === "MCMA") {
        const correctKeys = Array.isArray(s.kunci) ? s.kunci : [s.kunci];
        const userKeys = Array.isArray(userAns) ? userAns : [];
        if (
          userKeys.length === correctKeys.length &&
          userKeys.every((k) => correctKeys.includes(k))
        ) {
          correct += 1;
        }
      }
    });

    const calculatedScore = Math.round((correct / soalList.length) * 100);
    const passed = calculatedScore > 50;

    const result: MemberProgressItem = {
      paketId: paket.id,
      score: calculatedScore,
      passed,
      completedAt: new Date().toISOString(),
      correctAnswers: correct,
      totalQuestions: soalList.length,
      userAnswers: jawaban,
    };

    setScoreResult(result);
    setIsSubmitted(true);

    // Simpan ke localStorage
    try {
      const stored = localStorage.getItem("tka_member_progress_v1");
      const progressMap = stored ? JSON.parse(stored) : {};
      progressMap[paket.id] = result;
      localStorage.setItem("tka_member_progress_v1", JSON.stringify(progressMap));
    } catch (e) {
      console.error(e);
    }
  };

  // Format timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Cek apakah ada paket berikutnya
  const nextPakets = getCustomPaketsBySubject(paket.subjectId);
  const nextPaket = nextPakets.find((p) => p.paketNumber === paket.paketNumber + 1);

  // TAMPILAN JIKA SUDAH SELESAI (HASIL & PEMBAHASAN)
  if (isSubmitted && scoreResult) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 space-y-8 animate-in fade-in duration-300">
        {/* Banner Hasil */}
        <div
          className={`rounded-3xl p-8 text-white shadow-xl text-center relative overflow-hidden ${
            scoreResult.passed
              ? "bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900"
              : "bg-gradient-to-br from-amber-600 via-orange-700 to-rose-900"
          }`}
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mb-4 shadow-inner">
              {scoreResult.passed ? (
                <Trophy size={36} className="text-yellow-300" />
              ) : (
                <AlertCircle size={36} className="text-white" />
              )}
            </div>

            <h1 className="text-3xl font-black mb-2">
              {scoreResult.passed ? "Luar Biasa! Anda Lulus 🎉" : "Terus Berlatih, Semangat! 💪"}
            </h1>
            <p className="text-white/90 text-sm mb-6">
              {scoreResult.passed
                ? `Selamat! Nilai Anda memenuhi syarat (> 50). Paket berikutnya telah berhasil dibuka.`
                : `Nilai Anda belum mencapai syarat kelulusan (> 50). Pelajari pembahasan terperinci di bawah, lalu coba lagi.`}
            </p>

            {/* Kotak Statistik Skor */}
            <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
              <div>
                <span className="block text-xs text-white/70">Nilai Akhir</span>
                <span className="text-3xl font-black text-yellow-300">
                  {scoreResult.score}
                </span>
                <span className="text-xs text-white/60"> / 100</span>
              </div>
              <div className="border-x border-white/20">
                <span className="block text-xs text-white/70">Benar</span>
                <span className="text-2xl font-black text-emerald-300">
                  {scoreResult.correctAnswers}
                </span>
                <span className="text-xs text-white/60"> dari {scoreResult.totalQuestions}</span>
              </div>
              <div>
                <span className="block text-xs text-white/70">Status Paket</span>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-black ${
                    scoreResult.passed
                      ? "bg-emerald-400 text-emerald-950"
                      : "bg-amber-400 text-amber-950"
                  }`}
                >
                  {scoreResult.passed ? "LULUS" : "BELUM LULUS"}
                </span>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-800 font-bold rounded-xl shadow hover:bg-slate-100 transition"
              >
                <BookOpen size={16} />
                <span>{showExplanation ? "Tutup Pembahasan" : "Lihat Pembahasan Lengkap"}</span>
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setShowExplanation(false);
                  setJawaban({});
                  setRaguRagu({});
                  setTimeLeft(paket.durasiMenit * 60);
                  setCurrentIdx(0);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl border border-white/30 transition"
              >
                <RotateCcw size={16} />
                <span>Kerjakan Ulang</span>
              </button>

              {scoreResult.passed && nextPaket && (
                <Link
                  href={`/dashboard/member/tka/${nextPaket.id}`}
                  className="flex items-center gap-2 px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl shadow-md transition"
                >
                  <span>Lanjut Paket {nextPaket.paketNumber}</span>
                  <ArrowRight size={16} />
                </Link>
              )}

              <Link
                href="/dashboard/member/tryout"
                className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-white/90 hover:text-white underline text-sm transition"
              >
                Daftar Paket Soal
              </Link>
            </div>
          </div>
        </div>

        {/* REVIEW PEMBAHASAN STEP-BY-STEP */}
        {showExplanation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                <span>Pembahasan & Kunci Jawaban Lengkap</span>
              </h2>
              <span className="text-xs text-slate-500">
                {soalList.length} Butir Soal Terbahas
              </span>
            </div>

            {soalList.map((s, idx) => {
              const userAns = jawaban[s.id];
              let isCorrect = false;

              if (s.tipe === "PG" || s.tipe === "BS") {
                isCorrect =
                  typeof userAns === "string" &&
                  typeof s.kunci === "string" &&
                  userAns.trim().toUpperCase() === s.kunci.trim().toUpperCase();
              } else if (s.tipe === "MCMA") {
                const correctKeys = Array.isArray(s.kunci) ? s.kunci : [s.kunci];
                const userKeys = Array.isArray(userAns) ? userAns : [];
                isCorrect =
                  userKeys.length === correctKeys.length &&
                  userKeys.every((k) => correctKeys.includes(k));
              }

              return (
                <div
                  key={s.id}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                        {idx + 1}
                      </span>
                      <span>Tipe: {s.tipe === "PG" ? "Pilihan Ganda" : s.tipe === "MCMA" ? "Pilihan Ganda Kompleks" : "Benar / Salah"}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${
                        isCorrect
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 size={14} /> Jawaban Anda Tepat
                        </>
                      ) : (
                        <>
                          <XCircle size={14} /> Jawaban Anda Belum Tepat
                        </>
                      )}
                    </span>
                  </div>

                  {/* Stimulus jika ada */}
                  {s.stimulus && (
                    <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-2xl text-slate-700 text-sm leading-relaxed">
                      {s.stimulus}
                    </div>
                  )}

                  {/* Render SVG jika ada */}
                  {s.svgGraphic && (
                    <div
                      className="my-3 flex justify-center"
                      dangerouslySetInnerHTML={{ __html: s.svgGraphic }}
                    />
                  )}

                  <p className="font-semibold text-slate-900 text-base">{s.pertanyaan}</p>

                  {/* Opsi / Pilihan */}
                  {s.opsi && (
                    <div className="space-y-2 mt-2">
                      {s.opsi.map((op, opIdx) => {
                        const letter = String.fromCharCode(65 + opIdx);
                        const isChosen =
                          s.tipe === "MCMA"
                            ? Array.isArray(userAns) && userAns.includes(letter)
                            : userAns === letter;
                        const isKey =
                          s.tipe === "MCMA"
                            ? Array.isArray(s.kunci) && s.kunci.includes(letter)
                            : s.kunci === letter;

                        let style = "border-slate-200 bg-white text-slate-700";
                        if (isKey) {
                          style = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                        } else if (isChosen && !isKey) {
                          style = "border-rose-300 bg-rose-50 text-rose-800 line-through";
                        }

                        return (
                          <div
                            key={opIdx}
                            className={`p-3 rounded-2xl border text-sm flex items-center justify-between ${style}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-black/5 flex items-center justify-center font-bold text-xs">
                                {letter}
                              </span>
                              <span>{op}</span>
                            </div>
                            {isKey && (
                              <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">
                                Kunci Benar ✓
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Kunci Jawaban Ringkas */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold pt-2 border-t border-slate-100">
                    <span className="text-slate-500">
                      Jawaban Anda:{" "}
                      <strong className="text-slate-800">
                        {Array.isArray(userAns) ? userAns.join(", ") : userAns || "(Tidak Dijawab)"}
                      </strong>
                    </span>
                    <span className="text-emerald-700">
                      Kunci Resmi:{" "}
                      <strong>
                        {Array.isArray(s.kunci) ? s.kunci.join(", ") : s.kunci}
                      </strong>
                    </span>
                  </div>

                  {/* Box Pembahasan Komprehensif */}
                  <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-blue-900 font-black text-xs uppercase tracking-wider">
                      <Sparkles size={14} className="text-amber-500" />
                      <span>Pembahasan Terperinci:</span>
                    </div>
                    <p className="text-slate-800 text-sm leading-relaxed">
                      {s.pembahasan}
                    </p>
                    {s.konsepKunci && (
                      <div className="mt-2 text-xs bg-white px-3 py-1.5 rounded-xl border border-blue-100 text-blue-800 font-medium inline-block">
                        <strong>Konsep Kunci:</strong> {s.konsepKunci}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // TAMPILAN LEMBAR UJIAN CBT
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/member/tryout"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
            title="Keluar ke Daftar Paket"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {paket.mapelName}
            </span>
            <h1 className="text-base font-black text-slate-900 line-clamp-1">
              {paket.title}
            </h1>
          </div>
        </div>

        {/* Timer Box */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono font-bold text-sm shadow-sm ${
              timeLeft < 300
                ? "bg-rose-50 border border-rose-300 text-rose-600 animate-pulse"
                : "bg-blue-50 border border-blue-200 text-blue-800"
            }`}
          >
            <Clock size={16} />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-sm transition"
          >
            Selesai Ujian
          </button>
        </div>
      </div>

      {/* Main Grid: Lembar Soal + Navigasi Nomor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kolom Soal (3 Span) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-5">
            {/* Header Soal */}
            <div className="flex items-center justify-between border-b pb-4">
              <span className="flex items-center gap-2">
                <span className="text-lg font-black text-blue-600">
                  Soal No. {currentIdx + 1}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold">
                  {currentSoal.tipe === "PG"
                    ? "Pilihan Ganda"
                    : currentSoal.tipe === "MCMA"
                    ? "Pilihan Ganda Kompleks"
                    : "Benar / Salah"}
                </span>
              </span>

              <button
                onClick={() => toggleRagu(currentSoal.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  raguRagu[currentSoal.id]
                    ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{raguRagu[currentSoal.id] ? "★ Ragu-ragu" : "Tandai Ragu"}</span>
              </button>
            </div>

            {/* Stimulus jika ada */}
            {currentSoal.stimulus && (
              <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded-r-2xl text-slate-700 text-sm leading-relaxed">
                {currentSoal.stimulus}
              </div>
            )}

            {/* Render Grafik / Diagram SVG jika ada */}
            {currentSoal.svgGraphic && (
              <div
                className="my-3 flex justify-center"
                dangerouslySetInnerHTML={{ __html: currentSoal.svgGraphic }}
              />
            )}

            {/* Pertanyaan */}
            <p className="text-base md:text-lg font-semibold text-slate-900 leading-relaxed">
              {currentSoal.pertanyaan}
            </p>

            {/* Pilihan Jawaban Berdasarkan Tipe */}
            <div className="space-y-3 pt-2">
              {/* TIPE PG: 1 Jawaban Benar */}
              {currentSoal.tipe === "PG" &&
                currentSoal.opsi?.map((op, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const isSelected = jawaban[currentSoal.id] === letter;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectPG(letter)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/80 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm md:text-base text-slate-800">
                          {op}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={18} className="text-blue-600" />
                      )}
                    </button>
                  );
                })}

              {/* TIPE MCMA: Multi-Select Checkboxes */}
              {currentSoal.tipe === "MCMA" &&
                currentSoal.opsi?.map((op, oIdx) => {
                  const letter = String.fromCharCode(65 + oIdx);
                  const selectedList = (jawaban[currentSoal.id] as string[]) || [];
                  const isChecked = selectedList.includes(letter);

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleToggleMCMA(letter)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isChecked
                          ? "border-emerald-600 bg-emerald-50/80 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm md:text-base text-slate-800">
                          {op}
                        </span>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {isChecked && <CheckCircle2 size={14} />}
                      </div>
                    </button>
                  );
                })}

              {/* TIPE BS: Benar / Salah */}
              {currentSoal.tipe === "BS" && (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {["BENAR", "SALAH"].map((val) => {
                    const isSelected = jawaban[currentSoal.id] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleSelectBS(val)}
                        className={`p-4 rounded-2xl font-black text-center transition border-2 ${
                          isSelected
                            ? val === "BENAR"
                              ? "border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm"
                              : "border-rose-500 bg-rose-50 text-rose-800 shadow-sm"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Navigasi Soal */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
                <span>Sebelumnya</span>
              </button>

              <button
                disabled={currentIdx === soalList.length - 1}
                onClick={() =>
                  setCurrentIdx((prev) => Math.min(soalList.length - 1, prev + 1))
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              >
                <span>Selanjutnya</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Navigasi Nomor Soal */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-sm font-black text-slate-800 mb-4 flex items-center justify-between">
              <span>Nomor Soal</span>
              <span className="text-xs text-slate-400 font-normal">
                {Object.keys(jawaban).length}/{soalList.length} Terjawab
              </span>
            </h2>

            <div className="grid grid-cols-5 gap-2.5">
              {soalList.map((s, idx) => {
                const isAnswered =
                  jawaban[s.id] !== undefined &&
                  jawaban[s.id] !== "" &&
                  (!Array.isArray(jawaban[s.id]) || jawaban[s.id].length > 0);
                const isRagu = raguRagu[s.id];
                const isCurrent = currentIdx === idx;

                let btnStyle = "bg-slate-100 text-slate-700 border-slate-200";
                if (isCurrent) {
                  btnStyle = "ring-2 ring-blue-500 font-black border-blue-500";
                }

                if (isRagu) {
                  btnStyle += " bg-amber-400 text-slate-950 font-black";
                } else if (isAnswered) {
                  btnStyle += " bg-emerald-600 text-white font-bold";
                }

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-10 rounded-xl text-xs font-bold border transition flex items-center justify-center ${btnStyle}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span>
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-400"></span>
                <span>Ragu-ragu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300"></span>
                <span>Belum Dijawab</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Selesai Ujian */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <FileCheck size={28} />
            </div>

            <h3 className="text-xl font-black text-slate-900 text-center mb-2">
              Kumpulkan Lembar Ujian?
            </h3>
            <p className="text-sm text-slate-600 text-center mb-6 leading-relaxed">
              Anda telah menjawab{" "}
              <strong>
                {Object.keys(jawaban).length} dari {soalList.length}
              </strong>{" "}
              soal. Pastikan semua soal telah terisi sebelum mengonfirmasi hasil ujian.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-3 px-4 rounded-xl font-bold text-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
              >
                Lanjutkan Ujian
              </button>
              <button
                onClick={handleSubmitExam}
                className="py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-md"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
