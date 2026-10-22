"use client";

import { useEffect, useState } from "react";
import { BookOpen, Search, Folder, Check } from "lucide-react";

export default function AdminMateriPage() {
  const materials = [
    { id: "1", subject: "Matematika", chapter: "Aljabar & Persamaan Linear", lessons: 4, level: "SMA" },
    { id: "2", subject: "Matematika", chapter: "Eksponen & Logaritma", lessons: 3, level: "SMA" },
    { id: "3", subject: "Bahasa Indonesia", chapter: "Pemahaman Teks Inferensial", lessons: 5, level: "SMA" },
    { id: "4", subject: "Bahasa Inggris", chapter: "Reading Comprehension & Vocabulary", lessons: 4, level: "SMA" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/20">
          <BookOpen size={26} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Materi Pembelajaran</h1>
          <p className="text-sm text-slate-500">Silabus, rangkuman konsep, dan bahan bacaan siswa.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {materials.map((m) => (
          <div key={m.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                {m.subject} • {m.level}
              </span>
              <span className="text-xs font-bold text-slate-400">{m.lessons} Modul</span>
            </div>
            <h3 className="mt-3 text-lg font-black text-slate-900">{m.chapter}</h3>
            <p className="mt-1 text-xs text-slate-500">Tersedia untuk bahan bacaan persiapan sebelum ujian.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
