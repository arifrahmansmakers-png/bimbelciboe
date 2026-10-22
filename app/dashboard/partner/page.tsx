"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Wallet,
  Handshake,
  TrendingUp,
  Share2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function PartnerDashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "PARTNER-CIBOE";
  const referralLink = `https://ciboeedu.com/daftar?ref=${referralCode}`;

  const stats = {
    totalReferrals: 28,
    activeMembers: 24,
    totalEarnings: 1680000,
    availableBalance: 420000,
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  function formatRupiah(num: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num || 0);
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#001E38] via-[#0F3D8C] to-[#1E56A0] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur">
              <Handshake size={14} />
              Portal Mitra & Affiliate Ciboe Edu
            </span>
            <h1 className="mt-3 text-2xl font-black md:text-3xl">Dashboard Partner</h1>
            <p className="mt-1 text-sm text-blue-100">
              Pantau performa referral siswa, komisi transaksi, dan pencairan saldo Anda.
            </p>
          </div>
        </div>

        {/* REFERRAL LINK BOX */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white/10 p-4 border border-white/15 backdrop-blur-md">
          <div className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Link Referral Mitra Anda:
            </span>
            <span className="font-mono text-sm font-bold text-white truncate block mt-0.5">
              {referralLink}
            </span>
          </div>
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-black text-slate-950 transition hover:bg-amber-300 shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Tersalin" : "Salin Link"}</span>
          </button>
        </div>
      </section>

      {/* STATS CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Siswa Terdaftar</span>
          <div className="mt-2 text-3xl font-black text-slate-900">{stats.totalReferrals} Orang</div>
          <p className="mt-1 text-xs text-emerald-600 font-bold">{stats.activeMembers} siswa aktif berlangganan</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saldo Komisi Tersedia</span>
          <div className="mt-2 text-3xl font-black text-emerald-600">{formatRupiah(stats.availableBalance)}</div>
          <p className="mt-1 text-xs text-slate-400">Siap ditarik ke rekening bank</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Akumulasi Komisi</span>
          <div className="mt-2 text-3xl font-black text-blue-600">{formatRupiah(stats.totalEarnings)}</div>
          <p className="mt-1 text-xs text-slate-400">Sejak awal bergabung</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Kemitraan</span>
            <div className="mt-2 flex items-center gap-1.5 font-black text-emerald-600">
              <ShieldCheck size={18} />
              <span>Mitra Resmi</span>
            </div>
          </div>
          <Link
            href="/dashboard/partner/pendapatan"
            className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
          >
            <span>Tarik Saldo</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
