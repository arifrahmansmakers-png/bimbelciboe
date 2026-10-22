"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { bankSoal, durasiUjian } from "@/data/soal";
import SmartText from "@/components/SmartText";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckSquare,
  HelpCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  FileCheck,
} from "lucide-react";

export default function UjianContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const jenjang = searchParams.get("jenjang") || "";
  const mapel = searchParams.get("mapel") || "";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, any>>({});
  const [raguRagu, setRaguRagu] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Akses data bank soal
  const daftarSoal = (bankSoal as any)?.[jenjang]?.[mapel] || [];
  const soal = daftarSoal[currentIdx];

  useEffect(() => {
    if (!jenjang || !mapel) return;

    const dataDurasi = (durasiUjian as any)?.[jenjang];
    const defaultDurasi = dataDurasi?.[mapel] || 3600;

    const savedTimer = localStorage.getItem(`timer_${jenjang}_${mapel}`);
    setTimeLeft(savedTimer ? parseInt(savedTimer) : defaultDurasi);
    setIsReady(true);
  }, [jenjang, mapel]);

  // Logic Timer
  useEffect(() => {
    if (!isReady || showResult || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        const next = prev - 1;
        localStorage.setItem(`timer_${jenjang}_${mapel}`, next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, jenjang, mapel, isReady]);

  function handleSelectPG(pilihan: string) {
    if (!soal) return;
    setJawaban((prev) => ({
      ...prev,
      [soal.id]: pilihan,
    }));
  }

  function handleToggleMCMA(pilihan: string) {
    if (!soal) return;
    const currentList: string[] = Array.isArray(jawaban[soal.id]) ? [...jawaban[soal.id]] : [];
    const index = currentList.indexOf(pilihan);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(pilihan);
    }
    setJawaban((prev) => ({
      ...prev,
      [soal.id]: currentList.sort(),
    }));
  }

  function handleSelectTabelBS(rowIdx: number, val: string) {
    if (!soal) return;
    const currentTbl: Record<number, string> = { ...(jawaban[soal.id] || {}) };
    currentTbl[rowIdx] = val;
    setJawaban((prev) => ({
      ...prev,
      [soal.id]: currentTbl,
    }));
  }

  function toggleRagu() {
    if (!soal) return;
    setRaguRagu((prev) => ({
      ...prev,
      [soal.id]: !prev[soal.id],
    }));
  }

  function isAnswered(soalItem: any) {
    if (!soalItem) return false;
    const ans = jawaban[soalItem.id];
    if (ans === undefined || ans === null) return false;
    if (Array.isArray(ans)) return ans.length > 0;
    if (typeof ans === "object") {
      const keys = Object.keys(ans);
      return keys.length > 0 && keys.length === (soalItem.opsi?.length || 0);
    }
    return String(ans).trim().length > 0;
  }

  function handleFinishExam() {
    let correct = 0;

    daftarSoal.forEach((s: any) => {
      const userAns = jawaban[s.id];
      if (!userAns) return;

      if (s.tipe === "PG" || s.tipe === "BS") {
        if (String(userAns).trim().toUpperCase() === String(s.kunci).trim().toUpperCase()) {
          correct++;
        }
      } else if (s.tipe === "MCMA") {
        if (Array.isArray(userAns) && Array.isArray(s.kunci)) {
          const sortedUser = [...userAns].sort().join(",");
          const sortedKey = [...s.kunci].sort().join(",");
          if (sortedUser === sortedKey) {
            correct++;
          }
        }
      } else if (s.tipe === "TabelBS") {
        if (typeof userAns === "object" && Array.isArray(s.kunci)) {
          let allMatch = true;
          s.kunci.forEach((k: string, idx: number) => {
            const rowAns = String(userAns[idx] || "").trim().toLowerCase();
            const keyAns = String(k).trim().toLowerCase();
            if (rowAns !== keyAns) {
              allMatch = false;
            }
          });
          if (allMatch) correct++;
        }
      }
    });

    const score = Math.round((correct / (daftarSoal.length || 1)) * 100);
    setCorrectCount(correct);
    setFinalScore(score);
    setShowModal(false);
    setShowResult(true);
    localStorage.removeItem(`timer_${jenjang}_${mapel}`);
  }

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001E3D] text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
          <span className="text-sm font-bold">Memuat Ujian CBT...</span>
        </div>
      </div>
    );
  }

  if (daftarSoal.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#001E3D] text-white p-6 font-sans">
        <div className="max-w-md w-full rounded-3xl bg-white/10 p-8 text-center border border-white/15">
          <AlertCircle size={48} className="text-amber-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Paket Soal Sedang Dipersiapkan</h2>
          <p className="mt-2 text-sm text-blue-200">
            Mata pelajaran {mapel} untuk jenjang {jenjang} belum tersedia.
          </p>
          <button
            onClick={() => router.push("/simulasi")}
            className="mt-6 w-full py-3 bg-amber-400 text-slate-950 rounded-xl font-black text-sm"
          >
            Pilih Mata Pelajaran Lain
          </button>
        </div>
      </div>
    );
  }

  // Question Type Label
  const getBadgeType = (tipe: string) => {
    switch (tipe) {
      case "MCMA":
        return { label: "Pilihan Ganda Kompleks (Bisa Pilih > 1)", color: "bg-purple-100 text-purple-800 border-purple-200" };
      case "BS":
        return { label: "Benar / Salah", color: "bg-amber-100 text-amber-800 border-amber-200" };
      case "TabelBS":
        return { label: "Pilihan Ganda Kompleks Kategori (Tabel)", color: "bg-teal-100 text-teal-800 border-teal-200" };
      case "PG":
      default:
        return { label: "Pilihan Ganda Sederhana", color: "bg-blue-100 text-blue-800 border-blue-200" };
    }
  };

  const badgeInfo = getBadgeType(soal?.tipe || "PG");

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-12">
      {/* RESULT MODAL */}
      {showResult ? (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#001E3D]">
          <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full animate-in zoom-in-95 duration-200">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mx-auto mb-4">
              <Award size={36} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Hasil Simulasi TKA</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{mapel}</h2>
            <p className="text-xs text-slate-500">{jenjang.replace("_", " ")}</p>

            <div className="my-6 rounded-3xl bg-slate-50 border border-slate-200 p-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skor Akhir CBT</span>
              <div className="text-6xl font-black text-blue-600 mt-1">{finalScore}</div>
              <div className="mt-3 flex items-center justify-center gap-4 text-xs font-bold text-slate-600 border-t border-slate-200 pt-3">
                <span className="text-emerald-600">✓ {correctCount} Benar</span>
                <span>•</span>
                <span className="text-rose-600">✕ {daftarSoal.length - correctCount} Salah</span>
                <span>•</span>
                <span>Total: {daftarSoal.length} Soal</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowResult(false);
                  setCurrentIdx(0);
                  setJawaban({});
                  setRaguRagu({});
                }}
                className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition"
              >
                Ulangi Ujian Ini
              </button>
              <button
                onClick={() => router.push("/simulasi")}
                className="w-full py-3.5 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-200 transition"
              >
                Pilih Mapel Lain
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* CBT TOP NAVBAR */}
          <header className="sticky top-0 z-40 bg-[#001E3D] text-white px-4 py-3 shadow-md border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-slate-950 font-black text-base">
                  ⚡
                </span>
                <div>
                  <h1 className="font-black text-sm sm:text-base leading-tight">
                    {mapel}
                  </h1>
                  <span className="text-[11px] text-blue-200">
                    {jenjang.replace("_", " ")} • CBT Kemendikdasmen
                  </span>
                </div>
              </div>

              {/* TIMER */}
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-1.5 border border-white/15">
                <Clock size={16} className="text-amber-400 animate-pulse" />
                <span className="font-mono text-sm sm:text-base font-black text-white">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
          </header>

          {/* CBT MAIN WORKSPACE */}
          <div className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* SOAL COLUMN */}
            <div className="lg:col-span-3 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm min-h-[550px]">
              <div>
                {/* QUESTION HEADER INFO */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-sm">
                      {currentIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Dari {daftarSoal.length} Soal
                    </span>
                  </div>

                  {/* BADGE TIPE SOAL */}
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${badgeInfo.color}`}>
                    <FileCheck size={13} />
                    {badgeInfo.label}
                  </span>
                </div>

                {/* PERTANYAAN */}
                <div className="text-base sm:text-lg text-slate-900 leading-relaxed font-medium mb-8">
                  <SmartText text={soal.pertanyaan} />
                </div>

                {/* FORM JAWABAN SESUAI TIPE */}
                {/* 1. PILIHAN GANDA SEDERHANA (PG) */}
                {soal.tipe === "PG" && (
                  <div className="space-y-3">
                    {soal.opsi?.map((o: string, i: number) => {
                      const optCode = String.fromCharCode(65 + i);
                      const isSelected = jawaban[soal.id] === optCode;

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectPG(optCode)}
                          className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition cursor-pointer ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                              isSelected ? "bg-white text-blue-700" : "bg-white border border-slate-200 text-slate-700"
                            }`}
                          >
                            {optCode}
                          </span>
                          <span className="flex-1 text-sm sm:text-base font-medium">
                            <SmartText text={o} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. PILIHAN GANDA KOMPLEKS (MCMA - BISA PILIH > 1) */}
                {soal.tipe === "MCMA" && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-purple-700 mb-2">
                      * Pilih semua opsi yang Anda anggap benar (klik untuk memilih/membatalkan):
                    </p>
                    {soal.opsi?.map((o: string, i: number) => {
                      const optCode = String.fromCharCode(65 + i);
                      const isChecked = Array.isArray(jawaban[soal.id]) && jawaban[soal.id].includes(optCode);

                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleToggleMCMA(optCode)}
                          className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border text-left transition cursor-pointer ${
                            isChecked
                              ? "bg-purple-700 text-white border-purple-700 shadow-md shadow-purple-700/20"
                              : "border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-sm ${
                              isChecked ? "bg-white text-purple-800" : "bg-white border border-slate-200 text-slate-700"
                            }`}
                          >
                            {isChecked ? "✓" : optCode}
                          </span>
                          <span className="flex-1 text-sm sm:text-base font-medium">
                            <SmartText text={o} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. BENAR / SALAH (BS) */}
                {soal.tipe === "BS" && (
                  <div className="grid grid-cols-2 gap-4">
                    {["BENAR", "SALAH"].map((opt) => {
                      const isSelected = jawaban[soal.id] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectPG(opt)}
                          className={`p-5 rounded-2xl border-2 text-center font-black text-lg transition cursor-pointer ${
                            isSelected
                              ? opt === "BENAR"
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/25"
                                : "bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-600/25"
                              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 4. TABEL BENAR / SALAH (TabelBS) */}
                {soal.tipe === "TabelBS" && (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                        <tr>
                          <th className="p-4">Pernyataan</th>
                          <th className="p-4 text-center w-24">Benar</th>
                          <th className="p-4 text-center w-24">Salah</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {soal.opsi?.map((pernyataan: string, rowIdx: number) => {
                          const currentVal = (jawaban[soal.id] || {})[rowIdx];
                          return (
                            <tr key={rowIdx} className="hover:bg-slate-50/70">
                              <td className="p-4 text-slate-800 font-medium">
                                <SmartText text={pernyataan} />
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleSelectTabelBS(rowIdx, "Benar")}
                                  className={`h-9 w-9 rounded-xl font-bold transition cursor-pointer ${
                                    currentVal === "Benar"
                                      ? "bg-emerald-600 text-white shadow-sm"
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                  }`}
                                >
                                  B
                                </button>
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleSelectTabelBS(rowIdx, "Salah")}
                                  className={`h-9 w-9 rounded-xl font-bold transition cursor-pointer ${
                                    currentVal === "Salah"
                                      ? "bg-rose-600 text-white shadow-sm"
                                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                  }`}
                                >
                                  S
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* NAVIGATION BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-8 border-t border-slate-100 mt-8">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((p) => p - 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs sm:text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={toggleRagu}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition cursor-pointer ${
                    raguRagu[soal.id]
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-sm"
                      : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  {raguRagu[soal.id] ? "✓ Ragu-Ragu" : "Tandai Ragu-Ragu"}
                </button>

                <button
                  type="button"
                  disabled={currentIdx === daftarSoal.length - 1}
                  onClick={() => setCurrentIdx((p) => p + 1)}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md hover:bg-blue-700 disabled:opacity-40 cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* SIDEBAR: NOMOR SOAL & SUBMIT */}
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-fit">
              <div>
                <h3 className="font-black text-slate-900 text-base mb-1">Nomor Soal</h3>
                <p className="text-xs text-slate-400 mb-4">
                  Klik nomor untuk langsung berpindah soal
                </p>

                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {daftarSoal.map((item: any, idx: number) => {
                    const answered = isAnswered(item);
                    const isRagu = raguRagu[item.id];
                    const isCurrent = currentIdx === idx;

                    return (
                      <button
                        key={item.id || idx}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 rounded-xl font-bold text-xs transition cursor-pointer ${
                          isCurrent
                            ? "ring-3 ring-blue-500 font-black " + (answered ? "bg-blue-600 text-white" : "bg-slate-900 text-white")
                            : isRagu
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : answered
                            ? "bg-emerald-600 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* LEGEND */}
                <div className="mt-5 space-y-1.5 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-emerald-600" />
                    <span>Sudah dijawab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-amber-400" />
                    <span>Ragu-ragu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-md bg-slate-100 border border-slate-300" />
                    <span>Belum dijawab</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="mt-6 w-full py-3.5 bg-rose-600 text-white rounded-2xl font-black text-xs sm:text-sm shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition cursor-pointer"
              >
                Selesai Ujian
              </button>
            </div>
          </div>
        </>
      )}

      {/* CONFIRM FINISH MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
            <h2 className="text-xl font-black text-slate-900">Kumpulkan Ujian?</h2>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Pastikan Anda telah memeriksa semua jawaban sebelum mengakhiri sesi simulasi CBT ini.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button
                type="button"
                onClick={handleFinishExam}
                className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold text-xs hover:bg-rose-700 shadow-md cursor-pointer"
              >
                Ya, Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}