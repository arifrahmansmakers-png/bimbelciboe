"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Sparkles,
  FileText,
  Clock,
  CheckCircle2,
  Bookmark,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface MateriModule {
  id: string;
  title: string;
  subject: string;
  jenjang: "SD" | "SMP" | "SMA";
  totalBab: number;
  readMinutes: number;
  color: string;
  topics: string[];
}

const ALL_MATERI: MateriModule[] = [
  // --- SD / MI ---
  {
    id: "materi-sd-mat",
    title: "Matematika & Numerasi SD",
    subject: "Matematika",
    jenjang: "SD",
    totalBab: 8,
    readMinutes: 45,
    color: "bg-blue-600",
    topics: [
      "Operasi Hitung Campuran Bilangan Bulat",
      "Pecahan Biasa, Campuran, dan Desimal",
      "KPK dan FPB dalam Kehidupan Sehari-hari",
      "Geometri Datar: Keliling & Luas Persegi & Segitiga",
      "Membaca Diagram Batang & Lingkaran",
    ],
  },
  {
    id: "materi-sd-bi",
    title: "Bahasa Indonesia & Literasi SD",
    subject: "Bahasa Indonesia",
    jenjang: "SD",
    totalBab: 6,
    readMinutes: 35,
    color: "bg-emerald-600",
    topics: [
      "Menemukan Gagasan Utama & Ide Pokok Paragraf",
      "Struktur Teks Cerita Rakyat & Fabel Nusantara",
      "Kaidah Ejaan Yang Disempurnakan (EYD) & Huruf Kapital",
      "Teks Petunjuk & Prosedur Sederhana",
      "Makna Kata Baku & Sinonim-Antonim",
    ],
  },
  {
    id: "materi-sd-inggris",
    title: "Bahasa Inggris Ceria SD",
    subject: "Bahasa Inggris",
    jenjang: "SD",
    totalBab: 5,
    readMinutes: 30,
    color: "bg-purple-600",
    topics: [
      "Daily Activities & Telling The Time",
      "School Objects & Family Members",
      "Simple Present Tense & Action Verbs",
      "Short Descriptive Stories about Animals",
    ],
  },
  {
    id: "materi-sd-ipas",
    title: "IPAS (Ilmu Pengetahuan Alam & Sosial) SD",
    subject: "IPAS",
    jenjang: "SD",
    totalBab: 6,
    readMinutes: 40,
    color: "bg-amber-600",
    topics: [
      "Siklus Hidup Hewan & Tumbuhan",
      "Perubahan Wujud Zat di Sekitar Kita",
      "Rantai Makanan & Ekosistem Hutan",
      "Peta dan Bentang Alam Kepulauan Indonesia",
    ],
  },

  // --- SMP / MTs ---
  {
    id: "materi-smp-mat",
    title: "Matematika SMP",
    subject: "Matematika",
    jenjang: "SMP",
    totalBab: 9,
    readMinutes: 60,
    color: "bg-indigo-600",
    topics: [
      "Aljabar: Pemfaktoran & Persamaan Linear Satu Variabel",
      "Teorema Pythagoras & Tripel Pythagoras",
      "Sistem Persamaan Linear Dua Variabel (SPLDV)",
      "Statistika: Mean, Median, Modus, dan Jangkauan",
      "Peluang Teoretik & Empirik",
    ],
  },
  {
    id: "materi-smp-bi",
    title: "Bahasa Indonesia SMP",
    subject: "Bahasa Indonesia",
    jenjang: "SMP",
    totalBab: 7,
    readMinutes: 45,
    color: "bg-teal-600",
    topics: [
      "Menelaah Teks Deskripsi & Teks Cerpen",
      "Teks Laporan Hasil Observasi (LHO) yang Objektif",
      "Struktur Teks Diskusi & Kalimat Argumentatif",
      "Penggunaan Konjungsi Antarklausa dan Intraklausa",
    ],
  },
  {
    id: "materi-smp-ipa",
    title: "IPA Terpadu SMP",
    subject: "IPA Terpadu",
    jenjang: "SMP",
    totalBab: 8,
    readMinutes: 55,
    color: "bg-cyan-600",
    topics: [
      "Sistem Gerak pada Manusia & Hukum Newton",
      "Struktur & Fungsi Jaringan Tumbuhan",
      "Kelistrikan Statis & Dinamis",
      "Tata Surya, Rotasi-Revolusi Bumi & Gerhana",
    ],
  },
  {
    id: "materi-smp-inggris",
    title: "Bahasa Inggris SMP",
    subject: "Bahasa Inggris",
    jenjang: "SMP",
    totalBab: 6,
    readMinutes: 40,
    color: "bg-violet-600",
    topics: [
      "Recount Text: Personal Experiences",
      "Narrative Text & Legend Folktales",
      "Past Tense vs Present Continuous",
      "Formal & Informal Communication Dialogues",
    ],
  },

  // --- SMA / MA ---
  {
    id: "materi-sma-mat",
    title: "Matematika & Penalaran SMA",
    subject: "Matematika",
    jenjang: "SMA",
    totalBab: 10,
    readMinutes: 70,
    color: "bg-blue-700",
    topics: [
      "Persamaan & Pertidaksamaan Nilai Mutlak",
      "Fungsi Kuadrat, Polinomial, dan Invers",
      "Trigonometri Dasar & Identitas Trigonometri",
      "Limit Fungsi Aljabar & Turunan Pertama",
      "Barisan & Deret Aritmetika dan Geometri",
    ],
  },
  {
    id: "materi-sma-bi",
    title: "Bahasa Indonesia SMA",
    subject: "Bahasa Indonesia",
    jenjang: "SMA",
    totalBab: 8,
    readMinutes: 50,
    color: "bg-emerald-700",
    topics: [
      "Analisis Teks Editorial / Opini Media",
      "Metodologi Penyusunan Karya Tulis Ilmiah (KTI)",
      "Kritik Sastra dan Esai Analitis",
      "Penalaran Logis & Kohesi Paragraf Akademik",
    ],
  },
  {
    id: "materi-sma-ipa",
    title: "Fisika & Kimia SMA",
    subject: "Sains & Fisika",
    jenjang: "SMA",
    totalBab: 9,
    readMinutes: 65,
    color: "bg-amber-700",
    topics: [
      "Kinematika Gerak Lurus & Gerak Parabola",
      "Dinamika Partikel & Hukum Gravitasi Newton",
      "Stoikiometri & Konsep Mol Kimia",
      "Termodinamika & Hukum Kekekalan Energi",
    ],
  },
  {
    id: "materi-sma-inggris",
    title: "Bahasa Inggris SMA",
    subject: "Bahasa Inggris",
    jenjang: "SMA",
    totalBab: 7,
    readMinutes: 45,
    color: "bg-purple-700",
    topics: [
      "Academic Reading Comprehension & Inference",
      "Analytical Exposition & Argumentative Essay",
      "Conditional Sentences (Type 1, 2, 3)",
      "Vocabulary in Context: Scientific & Social Registers",
    ],
  },
];

export default function MemberMateriPage() {
  const user = useUser();

  // Helper normalisasi jenjang dari profil user
  const getUserDefaultJenjang = (): "SD" | "SMP" | "SMA" => {
    const raw = (user.educationLevelId || "").toUpperCase();
    if (raw.includes("SMA") || raw.includes("SMK") || raw.includes("MA")) return "SMA";
    if (raw.includes("SMP") || raw.includes("MTS")) return "SMP";
    return "SD";
  };

  const registeredJenjang = getUserDefaultJenjang();
  const [selectedJenjang, setSelectedJenjang] = useState<"SD" | "SMP" | "SMA">(registeredJenjang);
  const [search, setSearch] = useState("");

  // Update default jika data user berubah
  useEffect(() => {
    setSelectedJenjang(getUserDefaultJenjang());
  }, [user.educationLevelId]);

  const filteredMateri = ALL_MATERI.filter((m) => {
    const matchJenjang = m.jenjang === selectedJenjang;
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchJenjang && matchSearch;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER UTAMA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b2447] via-[#143d6b] to-[#1d5c8e] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-lg">
              <BookOpen size={32} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-bold text-amber-300 backdrop-blur mb-1">
                <Sparkles size={12} />
                <span>Modul Belajar & Ringkasan Materi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">Bank Materi Pembelajaran</h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-0.5">
                Materi disusun sistematis sesuai jenjang Anda, dan Anda tetap dapat bebas menjelajah materi di semua tingkatan (SD, SMP, SMA).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TINGKATAN (SD, SMP, SMA) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Pilih Tingkatan Pendidikan:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: "SD", name: "SD / MI", badge: "Kelas 4-6" },
              { id: "SMP", name: "SMP / MTs", badge: "Kelas 7-9" },
              { id: "SMA", name: "SMA / MA", badge: "Kelas 10-12" },
            ].map((j) => {
              const isSelected = selectedJenjang === j.id;
              const isUserRegistered = registeredJenjang === j.id;

              return (
                <button
                  key={j.id}
                  onClick={() => setSelectedJenjang(j.id as any)}
                  className={`relative flex flex-col sm:flex-row items-center justify-center gap-2 py-3.5 px-4 rounded-2xl border font-black text-sm transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <GraduationCap size={18} />
                  <span>{j.name}</span>
                  {isUserRegistered && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-amber-400 text-slate-950"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      Tingkat Anda
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative border-t border-slate-100 pt-3">
          <Search size={18} className="absolute left-3.5 top-6 text-slate-400" />
          <input
            type="text"
            placeholder={`Cari topik materi ${selectedJenjang} (contoh: aljabar, ide pokok, pecahan)...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* LIST MATERI MODULES */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredMateri.map((mod) => (
          <div
            key={mod.id}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-50 border border-blue-100 px-3 py-0.5 text-[11px] font-bold text-blue-700">
                  {mod.subject} &bull; {mod.jenjang}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                  <Clock size={13} />
                  <span>~{mod.readMinutes} Menit Baca</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 mt-2">{mod.title}</h3>

              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  Pokok Bahasan Materi:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {mod.topics.map((t, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {mod.totalBab} Bab Ringkasan
              </span>
              <Link
                href={`/dashboard/member/latihan`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 hover:text-white px-4 py-2 text-xs font-bold text-blue-700 transition"
              >
                <span>Latihan Soal Materi Ini</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}