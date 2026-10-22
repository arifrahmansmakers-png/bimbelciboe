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
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Zap,
  Target,
  GraduationCap,
} from "lucide-react";
import {
  tkaMemberSubjects,
  isTKAPaketUnlocked,
  MemberProgressItem,
  TKAPaket,
} from "@/data/tka_member";
import { getCustomPaketsBySubject } from "@/data/tka_member/store";

export default function MemberTryoutPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("matematika");
  const [progressMap, setProgressMap] = useState<Record<string, MemberProgressItem>>({});
  const [activeTab, setActiveTab] = useState<"bertingkat" | "simulasi">("bertingkat");
  const [pakets, setPakets] = useState<TKAPaket[]>([]);

  const loadData = () => {
    try {
      const stored = localStorage.getItem("tka_member_progress_v1");
      if (stored) {
        setProgressMap(JSON.parse(stored));
      }
      setPakets(getCustomPaketsBySubject(selectedSubjectId));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      setPakets(getCustomPaketsBySubject(selectedSubjectId));
    };

    window.addEventListener("tka_bank_soal_updated", handleUpdate);
    return () => window.removeEventListener("tka_bank_soal_updated", handleUpdate);
  }, [selectedSubjectId]);

  const activeSubject = tkaMemberSubjects.find((s) => s.id === selectedSubjectId) || tkaMemberSubjects[0];

  // Hitung jumlah paket yang lulus
  const passedCount = pakets.filter((p) => {
    const item = progressMap[p.id];
    return item && (item.passed || item.score > 50);
  }).length;

  // Simulasi Umum Nasional (Existing Tryouts)
  const generalTryouts = [
    {
      id: "tryout-tka-lengkap-1",
      title: "Simulasi TKA Paket 1 (Prediksi Nasional)",
      description: "Uji kemampuan akademik komprehensif dengan sistem penilaian CBT standar nasional.",
      subjectName: "TKA Campuran",
      totalQuestions: 50,
      durationMinutes: 90,
      passingScore: 70,
      badge: "Paling Populer",
    },
    {
      id: "tryout-matematika-intensif",
      title: "Tryout Matematika Wajib & Penalaran",
      description: "Fokus latihan soal penalaran matematika, logika kuantitatif, dan hitungan cepat.",
      subjectName: "Matematika",
      totalQuestions: 30,
      durationMinutes: 45,
      passingScore: 75,
      badge: "Intensif",
    },
    {
      id: "tryout-bahasa-indonesia",
      title: "Tryout Bahasa Indonesia & Literasi",
      description: "Latihan pemahaman teks panjang, literasi bacaan, ejaan, dan struktur kalimat efektif.",
      subjectName: "Bahasa Indonesia",
      totalQuestions: 30,
      durationMinutes: 40,
      passingScore: 75,
    },
    {
      id: "tryout-bahasa-inggris",
      title: "Tryout Bahasa Inggris (Reading Comprehension)",
      description: "Latihan pemahaman bacaan bahasa Inggris, grammar context, dan kosakata akademik.",
      subjectName: "Bahasa Inggris",
      totalQuestions: 25,
      durationMinutes: 35,
      passingScore: 70,
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-xl md:p-8">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles size={14} className="text-amber-300" />
            <span>Zona Ujian Khusus Member</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight">
            TKA Bertingkat & Tryout CBT
          </h1>
          <p className="mt-2 text-sm md:text-base text-blue-100 leading-relaxed">
            Taklukkan 10 paket soal bertingkat per mata pelajaran. Paket berikutnya akan otomatis terbuka jika Anda berhasil mendapatkan <strong>nilai lebih dari 50</strong> pada paket sebelumnya!
          </p>

          {/* Stats Bar */}
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/10">
              <Zap size={16} className="text-amber-400" />
              <span>Syarat Lanjut: Nilai &gt; 50</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/10">
              <BookOpen size={16} className="text-emerald-400" />
              <span>Dilengkapi Pembahasan Lengkap</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/10">
              <Award size={16} className="text-blue-300" />
              <span>Literasi & Numerasi HOTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS: TKA Bertingkat vs Tryout Terjadwal */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("bertingkat")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition ${
            activeTab === "bertingkat"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Target size={18} />
          <span>TKA 10 Paket Bertingkat (Level Up)</span>
        </button>
        <button
          onClick={() => setActiveTab("simulasi")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition ${
            activeTab === "simulasi"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Trophy size={18} />
          <span>Simulasi CBT Terjadwal</span>
        </button>
      </div>

      {/* CONTENT: TAB BERTINGKAT */}
      {activeTab === "bertingkat" && (
        <div className="space-y-6">
          {/* SUBJECT SELECTOR */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                3 Mata Pelajaran Resmi TKA (10 Paket per Mapel = Total 30 Paket):
              </label>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                3 Mapel Wajib TKA
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tkaMemberSubjects.map((sub) => {
                const isSelected = selectedSubjectId === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubjectId(sub.id)}
                    className={`text-left p-4 rounded-3xl border transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${sub.color.badge}`}>
                        {sub.jenjang}
                      </span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                      )}
                    </div>
                    <h3 className="text-sm font-black text-slate-900 leading-snug">
                      {sub.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {sub.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE SUBJECT HEADER & PROGRESS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeSubject.color.badge}`}>
                  {activeSubject.jenjang}
                </span>
                <span className="text-xs font-bold text-slate-400">• 10 Paket Bertingkat</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {activeSubject.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeSubject.tagline}
              </p>
            </div>

            {/* Progress Meter */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 min-w-[220px]">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-slate-600">Progres Kelulusan</span>
                <span className="text-blue-600">{passedCount} / 10 Paket</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(passedCount / 10) * 100}%` }}
                ></div>
              </div>
              <span className="block text-[10px] text-slate-400 mt-1">
                {passedCount === 10
                  ? "Selamat! Seluruh paket berhasil dituntaskan!"
                  : `Dapatkan nilai > 50 untuk membuka paket berikutnya.`}
              </span>
            </div>
          </div>

          {/* 10 PAKET LIST (GRID 2 KOLOM) */}
          <div className="grid gap-4 md:grid-cols-2">
            {pakets.map((paket) => {
              const isUnlocked = isTKAPaketUnlocked(paket.subjectId, paket.paketNumber, progressMap);
              const progress = progressMap[paket.id];
              const isPassed = progress && (progress.passed || progress.score > 50);

              let difficultyColor = "bg-blue-100 text-blue-800";
              if (paket.paketNumber >= 4 && paket.paketNumber <= 7) {
                difficultyColor = "bg-amber-100 text-amber-800";
              } else if (paket.paketNumber >= 8) {
                difficultyColor = "bg-rose-100 text-rose-800";
              }

              return (
                <div
                  key={paket.id}
                  className={`rounded-3xl border p-5 transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? isPassed
                        ? "border-emerald-300 bg-white hover:shadow-md"
                        : "border-slate-200 bg-white hover:border-blue-400 hover:shadow-md"
                      : "border-slate-200 bg-slate-50/70 opacity-75"
                  }`}
                >
                  <div>
                    {/* Header Card: Nomor Paket & Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                            isUnlocked
                              ? "bg-blue-600 text-white"
                              : "bg-slate-300 text-slate-600"
                          }`}
                        >
                          {paket.paketNumber}
                        </span>
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${difficultyColor}`}>
                          {paket.levelKesukaran}
                        </span>
                      </div>

                      {/* Status Badges */}
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                          <CheckCircle2 size={13} />
                          <span>Lulus ({progress.score}/100)</span>
                        </span>
                      ) : progress ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                          <AlertCircle size={13} />
                          <span>Belum Lulus ({progress.score}/100)</span>
                        </span>
                      ) : isUnlocked ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                          <Unlock size={13} />
                          <span>Terbuka</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 text-slate-600">
                          <Lock size={13} />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>

                    {/* Title & Desc */}
                    <h3 className="mt-3 text-base font-black text-slate-900 leading-snug">
                      {paket.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      {paket.description}
                    </p>

                    {/* Specs Pills */}
                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-1">
                        <FileQuestion size={14} className="text-slate-400" />
                        <span>{paket.totalSoal} Soal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer size={14} className="text-slate-400" />
                        <span>{paket.durasiMenit} Menit</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-emerald-600">
                        <Target size={14} />
                        <span>Syarat: &gt; 50</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100">
                    {isUnlocked ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/dashboard/member/tka/${paket.id}`}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black text-white transition shadow-sm ${
                            isPassed
                              ? "bg-slate-800 hover:bg-slate-900"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          <span>{progress ? "Kerjakan Ulang" : "Mulai Kerjakan"}</span>
                          <ArrowRight size={14} />
                        </Link>

                        {progress && (
                          <Link
                            href={`/dashboard/member/tka/${paket.id}`}
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                            title="Buka Pembahasan Soal"
                          >
                            <BookOpen size={14} />
                            <span>Pembahasan</span>
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 p-2.5 rounded-xl border border-slate-200">
                        <Lock size={14} className="text-slate-400 shrink-0" />
                        <span>
                          Dapatkan nilai <strong>&gt; 50</strong> pada <strong>Paket {paket.paketNumber - 1}</strong> untuk membuka.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTENT: TAB SIMULASI CBT TERJADWAL */}
      {activeTab === "simulasi" && (
        <div className="grid gap-5 md:grid-cols-2">
          {generalTryouts.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    {item.subjectName}
                  </span>
                  {item.badge && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-black text-amber-800">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-black text-slate-900">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.description}</p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center text-xs">
                  <div>
                    <span className="block text-slate-400">Jumlah Soal</span>
                    <span className="font-bold text-slate-800">{item.totalQuestions} Soal</span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="block text-slate-400">Durasi</span>
                    <span className="font-bold text-slate-800">{item.durationMinutes} Menit</span>
                  </div>
                  <div>
                    <span className="block text-slate-400">Passing Grade</span>
                    <span className="font-bold text-emerald-600">{item.passingScore}%</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/dashboard/member/tryout/${item.id}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
              >
                <Trophy size={16} />
                <span>Mulai Ujian Sekarang</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
