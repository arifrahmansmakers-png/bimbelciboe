"use client";

import { useState } from "react";
import { Users, Mail, Calendar, CheckCircle2 } from "lucide-react";

export default function PartnerPenggunaPage() {
  const referrals = [
    { id: "1", nama: "Dimas Anggara", email: "dimas@gmail.com", package: "Paket 1 Bulan", registeredAt: "2026-08-11", status: "Aktif" },
    { id: "2", nama: "Siti Nurhaliza", email: "siti.nur@gmail.com", package: "Paket 3 Bulan", registeredAt: "2026-08-10", status: "Aktif" },
    { id: "3", nama: "Fajar Maulana", email: "fajar@gmail.com", package: "Paket 1 Bulan", registeredAt: "2026-08-08", status: "Aktif" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
          <Users size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Daftar Siswa Referral</h1>
          <p className="text-sm text-slate-500">Siswa yang mendaftar menggunakan link referral Anda.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Nama Siswa</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Paket Dipilih</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {referrals.map((ref) => (
                <tr key={ref.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{ref.nama}</td>
                  <td className="px-6 py-4 text-slate-500">{ref.email}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{ref.package}</td>
                  <td className="px-6 py-4 text-slate-500">{ref.registeredAt}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                      <CheckCircle2 size={12} />
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
