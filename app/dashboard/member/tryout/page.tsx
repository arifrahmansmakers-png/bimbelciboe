"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Timer,
  FileQuestion,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Zap,
  Target,
  GraduationCap,
  Clock,
  Dumbbell,
} from "lucide-react";
import {
  ALL_JENJANG,
  ALL_SUBJECTS,
  getSubjectsByJenjang,
  MemberProgressItem,
  TKAPaket,
} from "@/data/tka_member";
import { getCustomPaketsBySubject } from "@/data/tka_member/store";
import { useUser } from "@/context/UserContext";

export default function MemberTryoutPage() {
  const user = useUser();

  const getRegisteredJenjang = (): "SD" | "SMP" | "SMA" => {
    const raw = (user?.educationLevelId || "").toUpperCase();
    if (raw.includes("SMA") || raw.includes("SMK") || raw.includes("MA")) return "SMA";
    if (raw.includes("SMP") || raw.includes("MTS")) return "SMP";
    return "SD";
  };

  const registeredJenjang = getRegisteredJenjang();

  // Jenjang (SD, SMP, SMA) - Default tingkatan user, dan user bebas memilih jenjang lain
  const [selectedJenjang, setSelectedJenjang] = useState<"SD" | "SMP" | "SMA">(registeredJenjang);

  // Mapel (berdasarkan jenjang)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("sd-matematika");

  useEffect(() => {
    setSelectedJenjang(getRegisteredJenjang());
  }, [user.educationLevelId]);

  // Progress member dari localStorage
  const [progressMap, setProgressMap] = useState<Record<string, MemberProgressItem>>({});
  const [tryoutPakets, setTryoutPakets] = useState<TKAPaket[]>([]);

  // Daftar mapel untuk jenjang terpilih
  const subjectsInJenjang = getSubjectsByJenjang(selectedJenjang);

  // Auto-switch mapel jika jenjang berganti
  useEffect(() => {
    if (subjectsInJenjang.length > 0) {
      if (!subjectsInJenjang.some((s) => s.id === selectedSubjectId)) {
        setSelectedSubjectId(subjectsInJenjang[0].id);
      }
    }
  }, [selectedJenjang, subjectsInJenjang, selectedSubjectId]);

  // Load paket & progress
  const loadData = () => {
    try {
      const stored = localStorage.getItem("tka_member_progress_v1");
      if (stored) {
        setProgressMap(JSON.parse(stored));
      }
      // Ambil paket kategori tryout (3 paket x 20 soal x 45 menit)
      const loaded = getCustomPaketsBySubject(selectedSubjectId, "tryout");
      setTryoutPakets(loaded);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      const loaded = getCustomPaketsBySubject(selectedSubjectId, "tryout");
      setTryoutPakets(loaded);
    };

    window.addEventListener("tka_bank_soal_updated", handleUpdate);
    return () => window.removeEventListener("tka_bank_soal_updated", handleUpdate);
  }, [selectedSubjectId]);

  // Subject yang aktif
  const activeSubject = ALL_SUBJECTS.find((s) => s.id === selectedSubjectId) || subjectsInJenjang[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER UTAMA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-lg">
              <Trophy size={32} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-bold text-amber-300 backdrop-blur mb-1">
                <Sparkles size={12} />
                <span>Simulasi CBT Standar Nasional</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">Tryout CBT Resmi (3 Paket &bull; 45 Menit)</h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-0.5">
                Setiap mata pelajaran di jenjang SD, SMP, dan SMA memiliki 3 paket tryout dengan 20 butir soal dan batas waktu pengerjaan 45 menit.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/member/latihan"
            className="shrink-0 flex items-center gap-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-xs font-bold text-white transition backdrop-blur"
          >
            <Dumbbell size={16} />
            <span>Ke Latihan 10 Paket</span>
          </Link>
        </div>
      </section>

      {/* FILTER 1: TAB JENJANG (SD, SMP, SMA) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Pilih Jenjang Sekolah:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ALL_JENJANG.map((j) => {
              const isSelected = selectedJenjang === j.id;
              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJenjang(j.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-black text-sm transition ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <GraduationCap size={18} />
                    <span>{j.name}</span>
                  </div>
                  {registeredJenjang === j.id && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-amber-400 text-slate-950"
                          : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                      }`}
                    >
                      Tingkat Anda
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* FILTER 2: TAB MAPEL */}
        <div className="border-t border-slate-100 pt-4">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Pilih Mata Pelajaran ({selectedJenjang}):
          </label>
          <div className="flex flex-wrap gap-2.5">
            {subjectsInJenjang.map((sub) => {
              const isSelected = selectedSubjectId === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubjectId(sub.id)}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <BookOpen size={14} />
                  <span>{sub.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* BANNER TRYOUT INFO */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
            {selectedJenjang} &bull; {activeSubject?.name}
          </span>
          <h2 className="text-xl font-black mt-0.5">3 Paket Simulasi Ujian Tryout</h2>
          <p className="text-xs text-purple-200 max-w-xl mt-1">
            Simulasi kondisi ujian sebenarnya dengan timer hitung mundur 45 menit, lembar jawaban ragu-ragu, dan perolehan skor langsung.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur border border-white/20 shrink-0">
          <Clock size={20} className="text-amber-400" />
          <div>
            <div className="text-xs font-black">Waktu Ujian: 45 Menit</div>
            <div className="text-[11px] text-purple-200">20 Soal per Paket</div>
          </div>
        </div>
      </div>

      {/* GRID 3 PAKET TRYOUT RESMI */}
      <div className="grid gap-6 sm:grid-cols-3">
        {tryoutPakets.map((to) => {
          const progress = progressMap[to.id];
          const hasAttempted = !!progress;
          const isPassed = hasAttempted && (progress.passed || progress.score > 50);

          return (
            <div
              key={to.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-purple-400 transition"
            >
              <div className="space-y-4">
                {/* TOP BADGE */}
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-100 text-purple-800 font-black text-sm">
                    #{to.paketNumber}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-800">
                    <Clock size={12} />
                    45 Menit
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    {to.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {to.description}
                  </p>
                </div>

                {/* SPECS */}
                <div className="space-y-2 rounded-2xl bg-slate-50 p-3.5 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FileQuestion size={13} className="text-blue-500" />
                      Jumlah Soal:
                    </span>
                    <span>20 Soal (PG, PGK, BS)</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Timer size={13} className="text-amber-500" />
                      Durasi Waktu:
                    </span>
                    <span>45 Menit (CBT)</span>
                  </div>
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Award size={13} className="text-emerald-500" />
                      Nilai Kelulusan:
                    </span>
                    <span>&gt; {to.passingScore} Poin</span>
                  </div>
                </div>

                {/* PROGRESS / RESULT IF ATTEMPTED */}
                {hasAttempted && (
                  <div
                    className={`rounded-2xl p-3 border text-xs flex items-center justify-between ${
                      isPassed
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                  >
                    <span className="font-bold">Skor Ujian Terakhir:</span>
                    <span className="text-sm font-black">{progress.score} / 100</span>
                  </div>
                )}
              </div>

              {/* ACTION BUTTON */}
              <div className="pt-6">
                <Link
                  href={`/dashboard/member/tka/${to.id}`}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-700 py-3 px-4 text-xs font-black text-white shadow-md shadow-purple-600/20 transition"
                >
                  <span>{hasAttempted ? "Coba Lagi (Ulangi Ujian)" : "Mulai Tryout (45 Menit)"}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
