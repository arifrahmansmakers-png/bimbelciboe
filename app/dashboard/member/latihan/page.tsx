"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function MemberLatihanPage() {
  const [selectedSubject, setSelectedSubject] = useState("matematika");

  const topics = [
    { id: "1", title: "Persamaan & Pertidaksamaan Linear", count: 20, subject: "matematika" },
    { id: "2", title: "Eksponen & Bentuk Akar", count: 15, subject: "matematika" },
    { id: "3", title: "Fungsi Kuadrat & Polinomial", count: 25, subject: "matematika" },
    { id: "4", title: "Pemahaman Teks Panjang & Gagasan Utama", count: 20, subject: "bahasa-indonesia" },
    { id: "5", title: "Konjungsi & Ejaan Yang Disempurnakan (EYD)", count: 18, subject: "bahasa-indonesia" },
    { id: "6", title: "Main Idea & Topic Sentence in Academic Text", count: 20, subject: "bahasa-inggris" },
    { id: "7", title: "Vocabulary in Context & Inferences", count: 15, subject: "bahasa-inggris" },
  ];

  const filteredTopics = topics.filter((t) => t.subject === selectedSubject);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
            <Dumbbell size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black md:text-3xl">Latihan Soal Mandiri</h1>
            <p className="mt-1 text-sm text-blue-100">
              Perdalam pemahaman konsep per topik dan uji kemampuan lewat paket bertingkat.
            </p>
          </div>
        </div>
      </section>

      {/* PROMO TKA 10 PAKET BERTINGKAT */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur">
              <Sparkles size={13} className="text-amber-300" />
              <span>Program Level Up Baru</span>
            </div>
            <h2 className="text-xl font-black">TKA 10 Paket Bertingkat (SD, SMP, SMA)</h2>
            <p className="text-xs text-blue-100 max-w-xl">
              Tantangan 10 paket bertingkat dengan syarat kelulusan nilai &gt; 50 untuk membuka paket berikutnya. Dilengkapi grafik visual & pembahasan lengkap.
            </p>
          </div>
          <Link
            href="/dashboard/member/tryout"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow transition"
          >
            <span>Buka 10 Paket TKA</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* SUBJECT FILTER */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setSelectedSubject("matematika")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition whitespace-nowrap ${
            selectedSubject === "matematika"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Matematika
        </button>
        <button
          onClick={() => setSelectedSubject("bahasa-indonesia")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition whitespace-nowrap ${
            selectedSubject === "bahasa-indonesia"
              ? "bg-red-500 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Bahasa Indonesia
        </button>
        <button
          onClick={() => setSelectedSubject("bahasa-inggris")}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition whitespace-nowrap ${
            selectedSubject === "bahasa-inggris"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Bahasa Inggris
        </button>
      </div>

      {/* TOPICS LIST */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredTopics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-400"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {topic.count} Soal Latihan
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">{topic.title}</h3>
            </div>
            <Link
              href="/simulasi"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition"
              title="Mulai Latihan"
            >
              <ChevronRight size={18} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
