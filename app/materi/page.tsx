"use client";

import Link from "next/link";
import { BookOpen, ArrowLeft, ArrowRight, Laptop, CheckCircle, Sparkles, Pencil } from "lucide-react";

export default function PublicMateriPage() {
  const subjects = [
    {
      name: "Matematika & Penalaran Kuantitatif",
      slug: "matematika",
      desc: "Aljabar, eksponen, logika angka, geometri dasar, dan trik pengerjaan cepat.",
      topics: 14,
      color: "from-blue-600 to-indigo-700",
    },
    {
      name: "Bahasa Indonesia & Literasi",
      slug: "bahasa-indonesia",
      desc: "Ide pokok, pemahaman teks panjang, simpulan teks, kalimat efektif, dan EYD.",
      topics: 10,
      color: "from-red-600 to-rose-700",
    },
    {
      name: "Bahasa Inggris (Academic Reading)",
      slug: "bahasa-inggris",
      desc: "Reading comprehension, inference questions, main idea, and vocabulary in context.",
      topics: 12,
      color: "from-emerald-600 to-teal-700",
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
              <Laptop size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Silabus & Bahan Belajar
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Materi Pembelajaran TKA</h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            Rangkuman materi esensial yang disusun terstruktur sesuai kisi-kisi standar ujian. Pelajari konsepnya, pahami pola soalnya, dan langsung uji kemampuanmu.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {subjects.map((sub) => (
            <div
              key={sub.slug}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-800/60 p-6 backdrop-blur transition hover:border-amber-400/40"
            >
              <div>
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white mb-4`}>
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-black text-white">{sub.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{sub.desc}</p>
                <div className="mt-4 text-xs font-bold text-amber-400">
                  {sub.topics} Bab Pembelajaran
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/simulasi"
                  className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-amber-400 transition"
                >
                  <Pencil size={14} />
                  <span>Coba Latihan Soal</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}