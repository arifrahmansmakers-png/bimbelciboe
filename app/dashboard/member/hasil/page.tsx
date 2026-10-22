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
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getAllCustomPakets } from "@/data/tka_member/store";

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

  const getRegisteredJenjang = (): "SD" | "SMP" | "SMA" => {
    const raw = (user?.educationLevelId || "").toUpperCase();
    if (raw.includes("SMA") || raw.includes("SMK") || raw.includes("MA")) return "SMA";
    if (raw.includes("SMP") || raw.includes("MTS")) return "SMP";
    return "SD";
  };

  const registeredJenjang = getRegisteredJenjang();
  const [filterJenjang, setFilterJenjang] = useState<"ALL" | "SD" | "SMP" | "SMA">("ALL");
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

  const filtered = records.filter((r) => {
    if (filterJenjang === "ALL") return true;
    return r.jenjang === filterJenjang;
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
              Pantau kemajuan skor latihan bertingkat dan tryout CBT berdurasi 45 menit di semua tingkatan.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TINGKATAN (SEMUA / SD / SMP / SMA) */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-200 pb-2">
        {[
          { id: "ALL", label: "Semua Tingkatan" },
          { id: "SD", label: "SD / MI" },
          { id: "SMP", label: "SMP / MTs" },
          { id: "SMA", label: "SMA / MA" },
        ].map((tab) => {
          const isSelected = filterJenjang === tab.id;
          const isRegistered = registeredJenjang === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setFilterJenjang(tab.id as any)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>{tab.label}</span>
              {isRegistered && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-amber-400 text-slate-950" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Tingkat Anda
                </span>
              )}
            </button>
          );
        })}
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
    </div>
  );
}
