"use client";

import { useState } from "react";
import { Settings, CreditCard, Building2, Check, User } from "lucide-react";

export default function PartnerPengaturanPage() {
  const [bank, setBank] = useState("BCA");
  const [accountNumber, setAccountNumber] = useState("8721982712");
  const [accountName, setAccountName] = useState("Arif Rahman");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <Settings size={26} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Pengaturan Rekening Mitra</h1>
          <p className="text-sm text-slate-500">Rekening tujuan pencairan komisi hasil referral siswa.</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        {saved && (
          <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <Check size={16} />
            <span>Pengaturan rekening pencairan berhasil disimpan!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Bank / E-Wallet
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
            >
              <option value="BCA">Bank BCA</option>
              <option value="Mandiri">Bank Mandiri</option>
              <option value="BNI">Bank BNI</option>
              <option value="BRI">Bank BRI</option>
              <option value="BSI">Bank Syariah Indonesia (BSI)</option>
              <option value="Gopay">GoPay / OVO / DANA</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nomor Rekening / Akun
            </label>
            <input
              type="text"
              required
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-mono font-bold outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Atas Nama Rekening
            </label>
            <input
              type="text"
              required
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 transition"
            >
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
