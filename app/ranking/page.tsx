"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trophy, Medal, MapPin, Search, Timer, CheckCircle, RefreshCw } from "lucide-react";

interface RankingItem {
  rank: number;
  nama: string;
  score: number;
  percentage: number;
  durationSeconds: number;
  correctAnswers: number;
  totalQuestions: number;
  provinceName?: string | null;
  regencyName?: string | null;
}

export default function RankingPage() {
  const [scope, setScope] = useState<"national" | "province">("national");
  const [level, setLevel] = useState<string>("sma");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Mock initial demo leaderboard for presentation when backend has no active submissions
  const sampleRankings: RankingItem[] = [
    { rank: 1, nama: "Ahmad Fauzan", score: 96, percentage: 96, durationSeconds: 1420, correctAnswers: 48, totalQuestions: 50, provinceName: "DKI Jakarta" },
    { rank: 2, nama: "Nadhira Putri", score: 94, percentage: 94, durationSeconds: 1530, correctAnswers: 47, totalQuestions: 50, provinceName: "Jawa Barat" },
    { rank: 3, nama: "Bima Pratama", score: 92, percentage: 92, durationSeconds: 1610, correctAnswers: 46, totalQuestions: 50, provinceName: "Jawa Timur" },
    { rank: 4, nama: "Siti Rahmawati", score: 88, percentage: 88, durationSeconds: 1720, correctAnswers: 44, totalQuestions: 50, provinceName: "D.I. Yogyakarta" },
    { rank: 5, nama: "Kevin Sanjaya", score: 86, percentage: 86, durationSeconds: 1790, correctAnswers: 43, totalQuestions: 50, provinceName: "Sumatera Utara" },
    { rank: 6, nama: "Anisa Wardhani", score: 84, percentage: 84, durationSeconds: 1840, correctAnswers: 42, totalQuestions: 50, provinceName: "Jawa Tengah" },
    { rank: 7, nama: "Rizky Ramadhan", score: 82, percentage: 82, durationSeconds: 1910, correctAnswers: 41, totalQuestions: 50, provinceName: "Banten" },
  ];

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const filteredRankings = sampleRankings.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    (item.provinceName && item.provinceName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-slate-900/90 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-white/20">
              <Image src="/logo.png" alt="Ciboe Edu" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-black text-white">Ciboe<span className="text-amber-400">Edu</span></span>
          </div>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-r from-blue-900/50 via-slate-800 to-indigo-900/50 p-6 sm:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20">
              <Trophy size={26} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Peringkat Peserta
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">
                Ranking Nasional Ciboe Edu
              </h1>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl">
            Pantau perolehan skor tertinggi simulasi TKA se-Indonesia. Penilaian dihitung berdasarkan ketepatan jawaban benar dan waktu pengerjaan tercepat.
          </p>

          {/* FILTER CONTROLS */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Level selection */}
            <div className="inline-flex rounded-xl bg-white/10 p-1">
              <button
                onClick={() => setLevel("sma")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  level === "sma" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                SMA / MA / SMK
              </button>
              <button
                onClick={() => setLevel("smp")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  level === "smp" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                SMP / MTs
              </button>
              <button
                onClick={() => setLevel("sd")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  level === "sd" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                SD / MI
              </button>
            </div>

            {/* Scope selection */}
            <div className="inline-flex rounded-xl bg-white/10 p-1">
              <button
                onClick={() => setScope("national")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  scope === "national" ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                Nasional
              </button>
              <button
                onClick={() => setScope("province")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  scope === "province" ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
                }`}
              >
                Per Provinsi
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH & LEADERBOARD TABLE */}
        <div className="mt-8">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama peserta atau asal daerah..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/80 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-amber-400"
              />
            </div>
            <span className="text-xs text-slate-400">
              Menampilkan {filteredRankings.length} peserta terbaik
            </span>
          </div>

          {/* TABLE CONTAINER */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="border-b border-white/10 bg-white/5 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-center w-16">Peringkat</th>
                    <th className="px-4 py-3">Nama Peserta</th>
                    <th className="px-4 py-3">Asal Provinsi</th>
                    <th className="px-4 py-3 text-center">Benar</th>
                    <th className="px-4 py-3 text-center">Waktu</th>
                    <th className="px-4 py-3 text-right">Skor Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRankings.map((item) => (
                    <tr key={item.rank} className="hover:bg-white/5 transition">
                      <td className="px-4 py-3.5 text-center">
                        {item.rank === 1 && (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20">
                            1
                          </span>
                        )}
                        {item.rank === 2 && (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-slate-950 font-black text-xs">
                            2
                          </span>
                        )}
                        {item.rank === 3 && (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-700 text-white font-black text-xs">
                            3
                          </span>
                        )}
                        {item.rank > 3 && (
                          <span className="font-bold text-slate-400">{item.rank}</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-white">
                        {item.nama}
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">
                        {item.provinceName || "-"}
                      </td>
                      <td className="px-4 py-3.5 text-center text-slate-300">
                        <span className="font-semibold text-emerald-400">{item.correctAnswers}</span> / {item.totalQuestions}
                      </td>
                      <td className="px-4 py-3.5 text-center text-slate-300">
                        {formatDuration(item.durationSeconds)}
                      </td>
                      <td className="px-4 py-3.5 text-right font-black text-amber-400 text-base">
                        {item.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
