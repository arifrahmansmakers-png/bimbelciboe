"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Plus,
  Clock,
  HelpCircle,
  Award,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function AdminTryoutPage() {
  const tryouts = [
    {
      id: "tryout-matematika-sma01",
      title: "Simulasi TKA Matematika SMA Paket 01",
      jenjang: "SMA/MA",
      totalQuestions: 40,
      durationMinutes: 90,
      passingScore: 70,
      status: "published",
    },
    {
      id: "tryout-lengkap-nasional",
      title: "Tryout Akbar TKA Nasional 2026",
      jenjang: "Semua Jenjang",
      totalQuestions: 60,
      durationMinutes: 100,
      passingScore: 75,
      status: "published",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
            <Trophy size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Tryout CBT</h1>
            <p className="text-sm text-slate-500">Jadwal ujian, durasi menit, dan kriteria kelulusan tryout.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tryouts.map((t) => (
          <div key={t.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
                {t.jenjang}
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                Terbit
              </span>
            </div>
            <h3 className="mt-3 text-lg font-black text-slate-900">{t.title}</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center text-xs">
              <div>
                <span className="text-slate-400">Soal</span>
                <span className="block font-bold text-slate-800">{t.totalQuestions} Butir</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-slate-400">Durasi</span>
                <span className="block font-bold text-slate-800">{t.durationMinutes} Menit</span>
              </div>
              <div>
                <span className="text-slate-400">KKM</span>
                <span className="block font-bold text-emerald-600">{t.passingScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
