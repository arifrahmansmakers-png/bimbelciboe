"use client";

import { useEffect, useState } from "react";
import {
  Ticket,
  Plus,
  Percent,
  Coins,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Calendar,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface VoucherItem {
  id: string;
  code: string;
  name?: string;
  diskonType: "percent" | "fixed";
  diskonValue: number;
  minimumPurchase: number;
  active: boolean;
  validFrom?: string;
  validUntil?: string;
  used?: number;
}

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function AdminVoucherPage() {
  const [vouchers, setVouchers] = useState<VoucherItem[]>([
    {
      id: "PROMO-MERDEKA",
      code: "PROMO MERDEKA",
      name: "Promo Merdeka Pelajar",
      diskonType: "percent",
      diskonValue: 50,
      minimumPurchase: 30000,
      active: true,
      validFrom: "2026-08-01",
      validUntil: "2026-12-31",
      used: 12,
    },
    {
      id: "GOCIBOE",
      code: "GOCIBOE",
      name: "Voucher Diskon Pelajar Baru",
      diskonType: "fixed",
      diskonValue: 20000,
      minimumPurchase: 50000,
      active: true,
      validFrom: "2026-08-01",
      validUntil: "2026-12-31",
      used: 5,
    },
  ]);

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Ticket size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Voucher Diskon</h1>
            <p className="text-sm text-slate-500">Kode kupon diskon untuk pendaftaran dan paket belajar siswa.</p>
          </div>
        </div>
      </div>

      {/* VOUCHERS GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vouchers.map((v) => (
          <div
            key={v.id}
            className="overflow-hidden rounded-3xl border border-dashed border-violet-300 bg-gradient-to-b from-white to-violet-50/40 p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-violet-600 bg-violet-100 px-2.5 py-0.5 rounded-full">
                  {v.diskonType === "percent" ? "Diskon Persen" : "Diskon Nominal"}
                </span>
                <h3 className="mt-2 text-xl font-mono font-black text-slate-900 tracking-wider">
                  {v.code}
                </h3>
              </div>
              <button
                onClick={() => handleCopy(v.code)}
                className="flex items-center gap-1 rounded-xl bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-200 transition"
              >
                {copiedCode === v.code ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedCode === v.code ? "Tersalin" : "Salin"}</span>
              </button>
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 border border-violet-100 shadow-sm">
              <span className="text-xs text-slate-500">Besar Potongan:</span>
              <div className="text-2xl font-black text-violet-700 mt-0.5">
                {v.diskonType === "percent" ? `${v.diskonValue}%` : formatRupiah(v.diskonValue)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Min. Belanja: <strong>{formatRupiah(v.minimumPurchase)}</strong>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-violet-100">
              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-slate-400" />
                <span>Sampai: {v.validUntil || "-"}</span>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5">
                Aktif
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
