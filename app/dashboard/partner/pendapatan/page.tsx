"use client";

import { useState } from "react";
import { Wallet, ArrowDownToLine, CheckCircle2, Clock, AlertCircle } from "lucide-react";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function PartnerPendapatanPage() {
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const availableBalance = 420000;

  const history = [
    { id: "COMM-102", from: "Pendaftaran Paket 1 Bulan (Dimas)", amount: 14000, date: "2026-08-11", status: "Selesai" },
    { id: "COMM-101", from: "Pendaftaran Paket 3 Bulan (Siti)", amount: 36000, date: "2026-08-10", status: "Selesai" },
    { id: "COMM-099", from: "Pencairan Saldo ke BCA 8721xxxxxx", amount: -500000, date: "2026-08-01", status: "Berhasil Ditransfer" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg">
          <Wallet size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Komisi & Pendapatan</h1>
          <p className="text-sm text-slate-500">Riwayat komisi referral dan penarikan saldo.</p>
        </div>
      </div>

      {/* WITHDRAWAL CARD */}
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-emerald-500/10 via-slate-50 to-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saldo Komisi Tersedia</span>
          <div className="text-3xl font-black text-slate-900 mt-1">{formatRupiah(availableBalance)}</div>
          <p className="text-xs text-slate-500 mt-1">Minimal pencairan dana adalah Rp 100.000</p>
        </div>
        <button
          onClick={() => setWithdrawSuccess(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition"
        >
          <ArrowDownToLine size={16} />
          <span>Ajukan Penarikan Dana</span>
        </button>
      </div>

      {withdrawSuccess && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Pengajuan penarikan dana sebesar {formatRupiah(availableBalance)} berhasil dikirimkan ke admin untuk diproses transfer.</span>
        </div>
      )}

      {/* HISTORY TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 font-black text-slate-800">Riwayat Mutasi Saldo</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Keterangan</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Jumlah</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.from}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className={`px-6 py-4 font-black ${item.amount > 0 ? "text-emerald-600" : "text-slate-900"}`}>
                    {item.amount > 0 ? `+${formatRupiah(item.amount)}` : formatRupiah(item.amount)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                      {item.status}
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
