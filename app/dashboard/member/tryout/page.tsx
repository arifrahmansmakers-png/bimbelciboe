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
} from "lucide-react";

interface TryoutItem {
  id: string;
  title: string;
  description: string;
  subjectName: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  badge?: string;
}

export default function MemberTryoutPage() {
  const tryouts: TryoutItem[] = [
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
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium backdrop-blur">
            <Sparkles size={14} className="text-amber-300" />
            <span>Simulasi CBT Terjadwal</span>
          </div>
          <h1 className="text-2xl font-black md:text-3xl">Pilih Paket Tryout CBT</h1>
          <p className="mt-2 text-sm text-blue-100">
            Kerjakan simulasi tryout berbatas waktu. Nilai dan waktu pengerjaanmu akan otomatis menentukan posisi di ranking nasional.
          </p>
        </div>
      </section>

      {/* TRYOUT LIST */}
      <div className="grid gap-5 md:grid-cols-2">
        {tryouts.map((item) => (
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
    </div>
  );
}
