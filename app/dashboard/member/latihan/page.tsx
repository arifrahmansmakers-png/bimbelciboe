"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  BookOpen,
  CheckCircle2,
  Lock,
  Unlock,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Target,
  FileQuestion,
  GraduationCap,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  ALL_JENJANG,
  ALL_SUBJECTS,
  getSubjectsByJenjang,
  isTKAPaketUnlocked,
  MemberProgressItem,
  TKAPaket,
} from "@/data/tka_member";
import { getCustomPaketsBySubject } from "@/data/tka_member/store";

export default function MemberLatihanPage() {
  // Jenjang (SD, SMP, SMA)
  const [selectedJenjang, setSelectedJenjang] = useState<"SD" | "SMP" | "SMA">("SD");

  // Mapel (berdasarkan jenjang)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("sd-matematika");

  // Progress member dari localStorage
  const [progressMap, setProgressMap] = useState<Record<string, MemberProgressItem>>({});
  const [pakets, setPakets] = useState<TKAPaket[]>([]);

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
      // Ambil paket kategori latihan untuk subject ini
      const loaded = getCustomPaketsBySubject(selectedSubjectId, "latihan");
      setPakets(loaded);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      const loaded = getCustomPaketsBySubject(selectedSubjectId, "latihan");
      setPakets(loaded);
    };

    window.addEventListener("tka_bank_soal_updated", handleUpdate);
    return () => window.removeEventListener("tka_bank_soal_updated", handleUpdate);
  }, [selectedSubjectId]);

  // Subject yang aktif
  const activeSubject = ALL_SUBJECTS.find((s) => s.id === selectedSubjectId) || subjectsInJenjang[0];

  // Hitung jumlah paket yang lulus
  const passedCount = pakets.filter((p) => {
    const item = progressMap[p.id];
    return item && (item.passed || item.score > 50);
  }).length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER UTAMA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2447] via-[#143d6b] to-[#1d5c8e] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-lg">
              <Dumbbell size={32} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-bold text-amber-300 backdrop-blur mb-1">
                <Sparkles size={12} />
                <span>Program Latihan Soal Mandiri</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">10 Paket Latihan Bertingkat</h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-0.5">
                Masing-masing paket berisi 20 butir soal (Pilihan Ganda, PG Kompleks, Benar/Salah) dengan sistem unlock level-up (syarat skor &gt; 50).
              </p>
            </div>
          </div>

          {/* PROGRESS BADGE */}
          <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 p-4 text-center shrink-0 min-w-[140px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              Progres Lulus
            </span>
            <div className="text-2xl font-black text-amber-300 mt-0.5">
              {passedCount} / {pakets.length || 10}
            </div>
            <span className="text-[10px] text-blue-100 font-medium">Paket Terbuka</span>
          </div>
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
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl border font-black text-sm transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <GraduationCap size={18} />
                  <span>{j.name}</span>
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
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
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

      {/* BANNER INFORMASI MAPEL AKTIF */}
      {activeSubject && (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5">
                {activeSubject.jenjang}
              </span>
              <h2 className="text-lg font-black text-slate-900">{activeSubject.name}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">{activeSubject.tagline}</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 shrink-0">
            <Target size={14} className="text-blue-600" />
            <span>Syarat Lanjut: Skor &gt; 50</span>
          </div>
        </div>
      )}

      {/* GRID 10 PAKET LATIHAN */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {pakets.map((paket) => {
          const unlocked = isTKAPaketUnlocked(
            selectedSubjectId,
            paket.paketNumber,
            progressMap,
            "latihan"
          );
          const progress = progressMap[paket.id];
          const hasAttempted = !!progress;
          const isPassed = hasAttempted && (progress.passed || progress.score > 50);

          return (
            <div
              key={paket.id}
              className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-200 ${
                unlocked
                  ? "border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-blue-400"
                  : "border-slate-200 bg-slate-50/70 opacity-80"
              }`}
            >
              {/* TOP HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl font-black text-sm ${
                      unlocked
                        ? isPassed
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                          : "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    #{paket.paketNumber}
                  </span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      {paket.levelKesukaran}
                    </span>
                    <h3 className="text-base font-black text-slate-900 leading-snug">
                      {paket.title}
                    </h3>
                  </div>
                </div>

                {/* LOCK / UNLOCK BADGE */}
                {unlocked ? (
                  isPassed ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800">
                      <CheckCircle2 size={13} />
                      Lulus ({progress.score} Poin)
                    </span>
                  ) : hasAttempted ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                      Skor: {progress.score} (Coba Lagi)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-bold text-blue-800">
                      <Unlock size={12} />
                      Siap Latihan
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    <Lock size={12} />
                    Terkunci
                  </span>
                )}
              </div>

              {/* DESKRIPSI PAKET */}
              <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                {paket.description}
              </p>

              {/* SPEC BADGES */}
              <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-slate-100 py-3 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-1.5">
                  <FileQuestion size={14} className="text-blue-500" />
                  <span>{paket.soalList.length || 20} Soal (PG, PGK, BS)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-500" />
                  <span>{paket.durasiMenit} Menit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award size={14} className="text-emerald-500" />
                  <span>KKM: &gt; {paket.passingScore} Poin</span>
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-4 flex items-center justify-between">
                {!unlocked ? (
                  <div className="text-[11px] text-slate-400 font-medium">
                    Raih nilai &gt; 50 di Paket #{paket.paketNumber - 1} untuk membuka paket ini.
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-600 font-bold">
                    {hasAttempted ? "Bisa diulang kapan saja" : "Belum pernah dikerjakan"}
                  </div>
                )}

                {unlocked ? (
                  <Link
                    href={`/dashboard/member/tka/${paket.id}`}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-black shadow-sm transition ${
                      isPassed
                        ? "bg-slate-900 text-white hover:bg-slate-800"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20"
                    }`}
                  >
                    <span>{hasAttempted ? "Latihan Ulang / Review" : "Mulai Latihan"}</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-400 cursor-not-allowed"
                  >
                    <Lock size={13} />
                    <span>Terkunci</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
