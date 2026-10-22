"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Search,
  BookOpen,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function AdminSoalPage() {
  const banks = [
    { id: "1", name: "Bank Soal Matematika Wajib SMA (5 Paket)", count: 150, subject: "Matematika", level: "SMA" },
    { id: "2", name: "Bank Soal Bahasa Indonesia SMA", count: 120, subject: "Bahasa Indonesia", level: "SMA" },
    { id: "3", name: "Bank Soal Penalaran Kuantitatif SMP", count: 90, subject: "Matematika", level: "SMP" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
          <FileText size={26} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Bank Soal CBT</h1>
          <p className="text-sm text-slate-500">Kelola koleksi soal ujian, opsi pilihan ganda, dan kunci jawaban.</p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {banks.map((b) => (
          <div key={b.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              {b.subject} • {b.level}
            </span>
            <h3 className="mt-3 font-bold text-slate-900">{b.name}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
              <span>Total Soal:</span>
              <strong className="text-slate-800 text-sm">{b.count} Butir</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
