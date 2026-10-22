"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  ChevronRight,
  FileText,
  CheckCircle,
  PlayCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function MemberMateriDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const subjectNames: Record<string, string> = {
    matematika: "Matematika",
    "bahasa-indonesia": "Bahasa Indonesia",
    "bahasa-inggris": "Bahasa Inggris",
  };

  const subjectTitle = subjectNames[slug] || "Materi Pelajaran";

  const chapters = [
    {
      id: "bab-1",
      title: "Konsep Dasar & Rumus Praktis",
      desc: "Ringkasan teori penting yang sering diujikan pada tes TKA.",
      duration: "15 Menit",
      completed: true,
    },
    {
      id: "bab-2",
      title: "Bedah Trik Cepat Penyelesaian Soal",
      desc: "Metode eliminasi dan logika cepat untuk menghemat waktu ujian.",
      duration: "20 Menit",
      completed: false,
    },
    {
      id: "bab-3",
      title: "Pembahasan Pola Soal Menjebak",
      desc: "Identifikasi kata kunci dalam soal agar tidak salah memilih jawaban.",
      duration: "25 Menit",
      completed: false,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* BACK NAVIGATION */}
      <Link
        href="/dashboard/member/materi"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft size={16} />
        <span>Kembali ke Daftar Materi</span>
      </Link>

      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BookOpen size={24} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Modul Pembelajaran
            </span>
            <h1 className="text-2xl font-black md:text-3xl text-white">{subjectTitle}</h1>
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900">Bab Pembelajaran</h2>

        {chapters.map((chap, idx) => (
          <div
            key={chap.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 font-bold text-sm">
                0{idx + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{chap.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{chap.desc}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {chap.duration}
                  </span>
                  {chap.completed && (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle size={12} />
                      Selesai Dibaca
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/dashboard/member/latihan"
              className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-600 transition"
            >
              <span>Pelajari & Latihan</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
