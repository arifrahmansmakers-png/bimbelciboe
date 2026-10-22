"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";

export default function PublicKurikulumPage() {
  const levels = [
    {
      level: "SMA / MA / SMK",
      desc: "Fokus persiapan seleksi masuk perguruan tinggi dan ujian kelulusan terstandar.",
      items: ["Penalaran Kuantitatif & Logika", "Pemahaman Bacaan & Literasi Indonesia", "Literasi Bahasa Inggris", "Penalaran Analitik & Diagram"],
    },
    {
      level: "SMP / MTs",
      desc: "Pemantapan konsep dasar akademik dan persiapan asesmen kompetensi.",
      items: ["Matematika Aljabar & Geometri Dasar", "Tata Bahasa & Analisis Bacaan", "Kosakata & Teks Bahasa Inggris", "Kemampuan Berpikir Kritis"],
    },
    {
      level: "SD / MI",
      desc: "Fondasi logika berhitung dan literasi dasar sejak dini.",
      items: ["Aritmatika Cepat & Pola Bilangan", "Membaca Pemahaman & Menulis Ringkas", "Pengenalan Bahasa Inggris Dasar", "Pemecahan Masalah Sederhana"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <nav className="border-b border-white/10 bg-slate-900/80 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-black">
              ⚡
            </span>
            <span className="font-black text-white">Ciboe Edu</span>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-r from-blue-900/50 via-slate-800 to-indigo-900/50 p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-md">
              <GraduationCap size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Standar Kompetensi
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Kurikulum & Kisi-Kisi CBT</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            Struktur kurikulum terarah dirancang khusus agar siswa menguasai materi secara bertahap dan terbiasa dengan model soal CBT modern.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {levels.map((lvl) => (
            <div
              key={lvl.level}
              className="rounded-3xl border border-white/10 bg-slate-800/60 p-6 backdrop-blur space-y-4"
            >
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Jenjang</span>
                <h3 className="text-xl font-black text-white mt-0.5">{lvl.level}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{lvl.desc}</p>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Cakupan Materi:</span>
                {lvl.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{it}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/simulasi"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/10 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  <span>Mulai Simulasi {lvl.level.split(" ")[0]}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}