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
} from "lucide-react";

interface TryoutResultItem {
  id: string;
  tryoutTitle: string;
  score: number;
  passingScore: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
  durationMinutes: number;
  submittedAt: string;
}

export default function MemberHasilPage() {
  const [results, setResults] = useState<TryoutResultItem[]>([
    {
      id: "res-01",
      tryoutTitle: "Simulasi TKA Matematika SMA Paket 01",
      score: 85,
      passingScore: 70,
      passed: true,
      correctAnswers: 34,
      totalQuestions: 40,
      durationMinutes: 72,
      submittedAt: "2026-08-11T14:30:00Z",
    },
    {
      id: "res-02",
      tryoutTitle: "Simulasi TKA Paket 1 (Prediksi Nasional)",
      score: 78,
      passingScore: 70,
      passed: true,
      correctAnswers: 39,
      totalQuestions: 50,
      durationMinutes: 84,
      submittedAt: "2026-08-08T09:15:00Z",
    },
  ]);

  const avgScore = Math.round(
    results.reduce((acc, curr) => acc + curr.score, 0) / (results.length || 1)
  );
  const highestScore = Math.max(...results.map((r) => r.score), 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BarChart3 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black md:text-3xl">Riwayat Hasil & Evaluasi</h1>
            <p className="mt-1 text-sm text-blue-100">
              Pantau kemajuan skor tryout CBT dan catatan pengerjaan ujian Anda.
            </p>
          </div>
        </div>
      </section>

      {/* STATS HIGHLIGHT */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Ujian</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">{results.length} Kali</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata Skor</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-blue-600">{avgScore}</div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skor Tertinggi</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-amber-500">{highestScore}</div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Daftar Pengerjaan Tryout</h2>

        {results.map((res) => (
          <div
            key={res.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    res.passed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {res.passed ? "Lulus KKM" : "Belum Lulus"}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(res.submittedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mt-2 text-lg font-black text-slate-900">{res.tryoutTitle}</h3>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                <span>Jawaban Benar: <strong>{res.correctAnswers}</strong> / {res.totalQuestions}</span>
                <span>•</span>
                <span>Waktu Pengerjaan: <strong>{res.durationMinutes} Menit</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <div className="text-right">
                <span className="block text-xs text-slate-400 font-bold uppercase">Skor CBT</span>
                <span className="text-3xl font-black text-amber-500">{res.score}</span>
              </div>
              <Link
                href={`/dashboard/member/tryout`}
                className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                <span>Ulangi</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
