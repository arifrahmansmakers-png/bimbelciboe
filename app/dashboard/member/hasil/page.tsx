"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Trophy,
  CheckCircle2,
  XCircle,
  Timer,
  Calendar,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Sparkles,
  BookOpen,
  Lock,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getAllCustomPakets } from "@/data/tka_member/store";
import { normalizeJenjang, getJenjangLabel } from "@/data/tka_member";

interface EvaluationItem {
  id: string;
  paketId: string;
  title: string;
  subjectName: string;
  jenjang: "SD" | "SMP" | "SMA";
  category: "latihan" | "tryout";
  score: number;
  passingScore: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: string;
}

export default function MemberHasilPage() {
  const user = useUser();

  const registeredJenjang = normalizeJenjang(user?.educationLevelId);
  const [filterCategory, setFilterCategory] = useState<"ALL" | "latihan" | "tryout">("ALL");
  const [lockedModal, setLockedModal] = useState<{ open: boolean; targetName: string } | null>(null);
  const [records, setRecords] = useState<EvaluationItem[]>([]);

  // Load progress dari localStorage & fallback seed
  useEffect(() => {
    const allPakets = getAllCustomPakets();
    let dynamicList: EvaluationItem[] = [];

    try {
      const stored = localStorage.getItem("tka_member_progress_v1");
      if (stored) {
        const progressMap = JSON.parse(stored);
        for (const [pId, pData] of Object.entries<any>(progressMap)) {
          const matchPaket = allPakets.find((p) => p.id === pId);
          if (matchPaket) {
            const j: "SD" | "SMP" | "SMA" =
              matchPaket.jenjang === "SD/MI"
                ? "SD"
                : matchPaket.jenjang === "SMP/MTs"
                ? "SMP"
                : "SMA";

            dynamicList.push({
              id: `eval-${pId}`,
              paketId: pId,
              title: matchPaket.title,
              subjectName: matchPaket.mapelName,
              jenjang: j,
              category: matchPaket.category || "latihan",
              score: pData.score || 0,
              passingScore: matchPaket.passingScore || 50,
              passed: pData.passed || pData.score > 50,
              correctAnswers: pData.correctAnswers || Math.round((pData.score / 100) * 20),
              totalQuestions: pData.totalQuestions || 20,
              submittedAt: pData.completedAt || new Date().toISOString(),
            });
          }
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Jika belum ada data dynamic pengerjaan, sediakan sampel berbasis jenjang
    if (dynamicList.length === 0) {
      dynamicList = [
        {
          id: "seed-01",
          paketId: "sd-mat-latihan-p1",
          title: "Paket 1: Latihan Matematika & Numerasi SD",
          subjectName: "Matematika SD",
          jenjang: "SD",
          category: "latihan",
          score: 85,
          passingScore: 50,
          passed: true,
          correctAnswers: 17,
          totalQuestions: 20,
          submittedAt: "2026-10-20T10:30:00Z",
        },
        {
          id: "seed-02",
          paketId: "sd-mat-tryout-to1",
          title: "Tryout Paket 1: Matematika SD (45 Menit)",
          subjectName: "Matematika SD",
          jenjang: "SD",
          category: "tryout",
          score: 75,
          passingScore: 50,
          passed: true,
          correctAnswers: 15,
          totalQuestions: 20,
          submittedAt: "2026-10-18T14:15:00Z",
        },
        {
          id: "seed-03",
          paketId: "smp-mat-latihan-p1",
          title: "Paket 1: Latihan Matematika SMP",
          subjectName: "Matematika SMP",
          jenjang: "SMP",
          category: "latihan",
          score: 90,
          passingScore: 50,
          passed: true,
          correctAnswers: 18,
          totalQuestions: 20,
          submittedAt: "2026-10-15T09:00:00Z",
        },
        {
          id: "seed-04",
          paketId: "sma-mat-latihan-p1",
          title: "Paket 1: Latihan Matematika SMA",
          subjectName: "Matematika SMA",
          jenjang: "SMA",
          category: "latihan",
          score: 80,
          passingScore: 50,
          passed: true,
          correctAnswers: 16,
          totalQuestions: 20,
          submittedAt: "2026-10-10T11:45:00Z",
        },
      ];
    }

    setRecords(dynamicList);
  }, []);

  // Hanya tampilkan hasil sesuai jenjang terdaftar siswa
  const filtered = records
    .filter((r) => r.jenjang === registeredJenjang)
    .filter((r) => {
      if (filterCategory === "ALL") return true;
      return r.category === filterCategory;
    });

  const avgScore = Math.round(
    filtered.reduce((acc, curr) => acc + curr.score, 0) / (filtered.length || 1)
  );
  const highestScore = Math.max(...filtered.map((r) => r.score), 0);
  const totalPassed = filtered.filter((r) => r.passed).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black md:text-3xl">Riwayat Hasil & Evaluasi Ujian</h1>
            <p className="mt-1 text-sm text-blue-100">
              Evaluasi performa pengerjaan khusus jenjang <span className="font-bold text-amber-300">{getJenjangLabel(registeredJenjang)}</span>. Menu jenjang lain dikunci.
            </p>
          </div>
        </div>
      </section>

      {/* TINGKATAN TABS (TERKUNCI SESUAI TINGKATAN MEMBER) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
              Tingkatan Sekolah:
            </label>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              <Lock size={12} className="text-amber-600" />
              <span>Akses hasil terkunci untuk tingkatan {registeredJenjang}</span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "SD", label: "SD / MI" },
              { id: "SMP", label: "SMP / MTs" },
              { id: "SMA", label: "SMA / MA" },
            ].map((tab) => {
              const isRegistered = registeredJenjang === tab.id;

              if (isRegistered) {
                return (
                  <div
                    key={tab.id}
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20 font-black text-xs sm:text-sm"
                  >
                    <GraduationCap size={16} />
                    <span>{tab.label}</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      Tingkat Anda (Aktif)
                    </span>
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLockedModal({ open: true, targetName: tab.label })}
                  className="group relative flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 text-slate-400 hover:bg-slate-100 hover:text-slate-600 font-bold text-xs sm:text-sm transition"
                  title={`Hasil ujian ${tab.label} terkunci`}
                >
                  <Lock size={14} className="text-amber-500" />
                  <span>{tab.label}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 group-hover:bg-amber-100 group-hover:text-amber-800 transition">
                    <Lock size={10} />
                    Terkunci
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FILTER KATEGORI: SEMUA / LATIHAN / TRYOUT */}
        <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-slate-500 mr-2">Kategori Soal:</span>
          {[
            { id: "ALL", label: `Semua Hasil ${registeredJenjang}` },
            { id: "latihan", label: "Latihan Saja (10 Paket)" },
            { id: "tryout", label: "Tryout CBT Saja (45 Menit)" },
          ].map((cat) => {
            const isSelected = filterCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCategory(cat.id as any)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* STATS HIGHLIGHT */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Dikerjakan</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{filtered.length} Sesi</div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skor Tertinggi</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-600">
            {highestScore || 0}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tingkat Kelulusan</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-600">
            {totalPassed} / {filtered.length || 0}
          </div>
        </div>
      </div>

      {/* HASIL LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Daftar Hasil Pengerjaan</h2>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-400">
            <Trophy size={40} className="mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">Belum ada riwayat hasil di tingkatan ini</p>
            <p className="text-xs text-slate-400 mt-1">
              Mulai latihan 20 butir soal atau ikuti simulasi tryout 45 menit untuk melihat hasil Anda.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 text-blue-800 text-[10px] font-black px-2.5 py-0.5">
                    {item.jenjang}
                  </span>
                  <span
                    className={`rounded-full text-[10px] font-black px-2.5 py-0.5 uppercase ${
                      item.category === "tryout"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {item.category === "tryout" ? "Tryout CBT (45 Menit)" : "Latihan Soal Bertingkat"}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(item.submittedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>
                    Benar: <strong>{item.correctAnswers}</strong> dari {item.totalQuestions} soal
                  </span>
                  <span>&bull;</span>
                  <span>
                    KKM: <strong>&gt; {item.passingScore}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Nilai Akhir</span>
                  <div
                    className={`text-2xl font-black ${
                      item.passed ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.score}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      item.passed ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {item.passed ? "Lulus" : "Belum Lulus"}
                  </span>
                </div>

                <Link
                  href={`/dashboard/member/tka/${item.paketId}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white px-4 py-2.5 text-xs font-bold text-slate-700 transition"
                >
                  <span>Pembahasan</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL PENJELASAN JENJANG TERKUNCI */}
      {lockedModal?.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Hasil {lockedModal.targetName} Terkunci
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Akun Anda terdaftar khusus pada jenjang{" "}
                <span className="font-bold text-blue-700">{getJenjangLabel(registeredJenjang)}</span>.
                Riwayat evaluasi hasil ujian jenjang {lockedModal.targetName} tidak dapat diakses untuk menjaga akurasi laporan pembelajaran Anda.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setLockedModal(null)}
                className="w-full rounded-2xl bg-blue-600 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
              >
                Kembali ke Hasil {registeredJenjang}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
