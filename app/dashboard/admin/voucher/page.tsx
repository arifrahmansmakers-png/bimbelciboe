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
  Power,
  X,
  Filter,
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

const DEFAULT_VOUCHERS: VoucherItem[] = [
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
    used: 8,
  },
  {
    id: "BELAJAR-HEMAT",
    code: "BELAJAR HEMAT",
    name: "Potongan Biaya Semester",
    diskonType: "percent",
    diskonValue: 25,
    minimumPurchase: 100000,
    active: false,
    validFrom: "2026-07-01",
    validUntil: "2026-09-30",
    used: 4,
  },
];

const LOCAL_STORAGE_KEY = "admin_vouchers_cache_v2";

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function AdminVoucherPage() {
  const [vouchers, setVouchers] = useState<VoucherItem[]>(DEFAULT_VOUCHERS);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal Tambah Voucher
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [newName, setNewName] = useState("");
  const [newDiskonType, setNewDiskonType] = useState<"percent" | "fixed">("percent");
  const [newDiskonValue, setNewDiskonValue] = useState<number>(20);
  const [newMinPurchase, setNewMinPurchase] = useState<number>(50000);
  const [newValidUntil, setNewValidUntil] = useState<string>("2026-12-31");

  // Load dari localStorage / API
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        setVouchers(JSON.parse(cached));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveVouchers = (updatedList: VoucherItem[]) => {
    setVouchers(updatedList);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // TOGGLE STATUS AKTIF / NONAKTIF VOUCHER
  const handleToggleVoucher = (voucherId: string) => {
    const updated = vouchers.map((v) => {
      if (v.id === voucherId) {
        const nextState = !v.active;
        showToast(
          `Voucher ${v.code} berhasil ${nextState ? "DI AKTIFKAN" : "DI NONAKTIFKAN"}.`
        );
        return { ...v, active: nextState };
      }
      return v;
    });

    saveVouchers(updated);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleAddVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) {
      showToast("Kode voucher wajib diisi!", "error");
      return;
    }

    const created: VoucherItem = {
      id: `v-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim() || `Voucher ${newCode.trim().toUpperCase()}`,
      diskonType: newDiskonType,
      diskonValue: newDiskonValue,
      minimumPurchase: newMinPurchase,
      active: true,
      validFrom: new Date().toISOString().split("T")[0],
      validUntil: newValidUntil,
      used: 0,
    };

    const updated = [created, ...vouchers];
    saveVouchers(updated);
    showToast(`Voucher ${created.code} berhasil ditambahkan dan langsung aktif!`);
    setShowAddModal(false);
    setNewCode("");
    setNewName("");
  };

  const filtered = vouchers.filter((v) => {
    if (filterStatus === "active") return v.active;
    if (filterStatus === "inactive") return !v.active;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* TOAST NOTIFIKASI */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all ${
            notification.type === "success"
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "bg-red-600 text-white shadow-red-600/30"
          }`}
        >
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)} className="ml-2 hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
            <Ticket size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Voucher Diskon</h1>
            <p className="text-sm text-slate-500">
              Aktifkan atau nonaktifkan kupon diskon untuk pembayaran paket belajar siswa.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 hover:bg-violet-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition"
        >
          <Plus size={16} />
          <span>+ Tambah Voucher Baru</span>
        </button>
      </div>

      {/* FILTER STATUS TABS */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilterStatus("all")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            filterStatus === "all"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Semua Voucher ({vouchers.length})
        </button>
        <button
          onClick={() => setFilterStatus("active")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            filterStatus === "active"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Aktif ({vouchers.filter((v) => v.active).length})
        </button>
        <button
          onClick={() => setFilterStatus("inactive")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
            filterStatus === "inactive"
              ? "bg-slate-700 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Nonaktif ({vouchers.filter((v) => !v.active).length})
        </button>
      </div>

      {/* VOUCHERS GRID */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((v) => (
          <div
            key={v.id}
            className={`overflow-hidden rounded-3xl border transition shadow-sm hover:shadow-md p-6 flex flex-col justify-between ${
              v.active
                ? "border-violet-200 bg-gradient-to-b from-white to-violet-50/40"
                : "border-slate-200 bg-slate-50/70 opacity-75"
            }`}
          >
            <div>
              {/* TOP HEADER */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      v.active ? "bg-violet-100 text-violet-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {v.diskonType === "percent" ? "Diskon Persen" : "Diskon Nominal"}
                  </span>
                  <h3 className="mt-2 text-xl font-mono font-black text-slate-900 tracking-wider">
                    {v.code}
                  </h3>
                  {v.name && <p className="text-xs text-slate-500 mt-0.5 font-medium">{v.name}</p>}
                </div>

                <button
                  onClick={() => handleCopy(v.code)}
                  className="flex items-center gap-1 rounded-xl bg-violet-100 px-3 py-1.5 text-xs font-bold text-violet-700 hover:bg-violet-200 transition shrink-0"
                >
                  {copiedCode === v.code ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode === v.code ? "Tersalin" : "Salin"}</span>
                </button>
              </div>

              {/* CARD INFO POTONGAN */}
              <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-100 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Besar Potongan:</span>
                <div className="text-2xl font-black text-violet-700 mt-0.5">
                  {v.diskonType === "percent" ? `${v.diskonValue}%` : formatRupiah(v.diskonValue)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Min. Belanja: <strong>{formatRupiah(v.minimumPurchase)}</strong>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={13} className="text-slate-400" />
                <span>Berlaku s/d: {v.validUntil || "Selamanya"}</span>
              </div>
            </div>

            {/* TOGGLE SWITCH AKTIF / NONAKTIF */}
            <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full text-[11px] font-bold px-2.5 py-0.5 ${
                    v.active
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {v.active ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  <span>{v.active ? "Aktif" : "Nonaktif"}</span>
                </span>
              </div>

              {/* TOMBOL TOGGLE ON/OFF */}
              <button
                onClick={() => handleToggleVoucher(v.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                  v.active
                    ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
                title={v.active ? "Nonaktifkan voucher ini agar tidak bisa dipakai" : "Aktifkan voucher ini"}
              >
                <Power size={13} />
                <span>{v.active ? "Nonaktifkan" : "Aktifkan"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TAMBAH VOUCHER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleAddVoucher}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">+ Tambah Voucher Diskon Baru</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl p-1 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kode Voucher (*):</label>
                <input
                  type="text"
                  required
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                  placeholder="Contoh: FLASH50"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold uppercase outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama / Keterangan:</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Promo Spesial Ujian Akhir"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipe Diskon:</label>
                  <select
                    value={newDiskonType}
                    onChange={(e: any) => setNewDiskonType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  >
                    <option value="percent">Persen (%)</option>
                    <option value="fixed">Nominal (Rp)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nilai ({newDiskonType === "percent" ? "%" : "Rp"}):
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newDiskonValue}
                    onChange={(e) => setNewDiskonValue(parseInt(e.target.value, 10) || 0)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Min. Belanja (Rp):</label>
                  <input
                    type="number"
                    min="0"
                    value={newMinPurchase}
                    onChange={(e) => setNewMinPurchase(parseInt(e.target.value, 10) || 0)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Berlaku Sampai:</label>
                  <input
                    type="date"
                    value={newValidUntil}
                    onChange={(e) => setNewValidUntil(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-xs font-bold text-white shadow"
              >
                Simpan & Aktifkan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
