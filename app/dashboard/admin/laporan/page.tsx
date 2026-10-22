"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function AdminLaporanPage() {
  const stats = {
    totalRevenue: 3450000,
    paidTransactions: 42,
    pendingTransactions: 3,
    affiliateCommissions: 690000,
  };

  const recentTransactions = [
    { id: "ORD20260811B78161C2F349", user: "Arif Rahman", package: "Paket 1 Bulan", amount: 35000, status: "PAID", date: "2026-08-11" },
    { id: "ORD20260811874950619DF4", user: "Nadhira Putri", package: "Paket 3 Bulan", amount: 180000, status: "PAID", date: "2026-08-10" },
    { id: "ORD20260809C89218209812", user: "Bima Pratama", package: "Paket 1 Bulan", amount: 70000, status: "PAID", date: "2026-08-09" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <BarChart3 size={26} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Laporan & Statistik</h1>
          <p className="text-sm text-slate-500">Laporan transaksi pembayaran dan performa pendaftaran.</p>
        </div>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Total Pendapatan</span>
          <div className="mt-2 text-2xl font-black text-slate-900">{formatRupiah(stats.totalRevenue)}</div>
          <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <TrendingUp size={12} />
            Transaksi berhasil
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Transaksi Selesai</span>
          <div className="mt-2 text-2xl font-black text-emerald-600">{stats.paidTransactions} Order</div>
          <span className="mt-1 text-[11px] text-slate-400">Pembayaran Midtrans sukses</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Menunggu Pembayaran</span>
          <div className="mt-2 text-2xl font-black text-amber-600">{stats.pendingTransactions} Order</div>
          <span className="mt-1 text-[11px] text-slate-400">Belum diselesaikan</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500">Total Komisi Affiliate</span>
          <div className="mt-2 text-2xl font-black text-violet-600">{formatRupiah(stats.affiliateCommissions)}</div>
          <span className="mt-1 text-[11px] text-slate-400">Dialokasikan untuk mitra</span>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 font-black text-slate-800">
          Transaksi Terkini
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">ID Transaksi</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">{tx.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{tx.user}</td>
                  <td className="px-6 py-4 text-slate-600">{tx.package}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{formatRupiah(tx.amount)}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                      <CheckCircle size={12} />
                      {tx.status}
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
