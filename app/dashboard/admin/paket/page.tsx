"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Plus,
  Edit3,
  Check,
  X,
  AlertCircle,
  Clock,
  Coins,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface PackageItem {
  id: string;
  kode?: string;
  slug?: string;
  nama?: string;
  name?: string;
  harga?: number;
  price?: number;
  durasiHari?: number;
  durationDays?: number;
  deskripsi?: string;
  description?: string;
  aktif?: boolean;
  isActive?: boolean;
  warna?: string;
  fitur?: string[];
  features?: string[];
  affiliateCommissionType?: string;
  affiliateCommissionValue?: number;
  partnerCommissionType?: string;
  partnerCommissionValue?: number;
}

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function AdminPaketPage() {
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPkg, setEditingPkg] = useState<PackageItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Edit form state
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formDuration, setFormDuration] = useState<number>(30);
  const [formDesc, setFormDesc] = useState("");
  const [formActive, setFormActive] = useState(true);

  async function loadPackages() {
    try {
      setLoading(true);
      setMsg(null);
      const res = await fetch("/api/packages", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setPackages(json.data);
      }
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Gagal mengambil daftar paket." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPackages();
  }, []);

  function handleOpenEdit(pkg: PackageItem) {
    setEditingPkg(pkg);
    setFormName(pkg.nama || pkg.name || "");
    setFormPrice(Number(pkg.harga ?? pkg.price ?? 0));
    setFormDuration(Number(pkg.durasiHari ?? pkg.durationDays ?? 30));
    setFormDesc(pkg.deskripsi || pkg.description || "");
    setFormActive(pkg.aktif !== false && pkg.isActive !== false);
  }

  async function handleSavePackage(e: React.FormEvent) {
    e.preventDefault();
    if (!editingPkg) return;

    try {
      setSaving(true);
      setMsg(null);

      const res = await fetch(`/api/admin/packages/${editingPkg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          price: Number(formPrice),
          durationDays: Number(formDuration),
          description: formDesc,
          isActive: formActive,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Gagal mengubah harga paket.");
      }

      setMsg({ type: "success", text: `Harga & data ${formName} berhasil diperbarui!` });
      setEditingPkg(null);
      await loadPackages();
    } catch (err: any) {
      setMsg({ type: "error", text: err.message || "Terjadi kesalahan saat menyimpan." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
              <Package size={26} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Paket Belajar</h1>
              <p className="text-sm text-slate-500">Atur harga paket, durasi langganan, dan status aktif.</p>
            </div>
          </div>
        </div>

        <button
          onClick={loadPackages}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* ALERT MESSAGE */}
      {msg && (
        <div
          className={`flex items-center gap-3 rounded-2xl p-4 text-sm font-medium ${
            msg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {msg.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* PACKAGES LIST */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => {
          const currentPrice = Number(pkg.harga ?? pkg.price ?? 0);
          const currentDuration = Number(pkg.durasiHari ?? pkg.durationDays ?? 0);
          const currentName = pkg.nama || pkg.name || pkg.id;

          return (
            <div
              key={pkg.id}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
                    <Sparkles size={12} />
                    {pkg.id}
                  </span>
                  <h3 className="mt-2 text-xl font-black text-slate-900">{currentName}</h3>
                </div>
                <button
                  onClick={() => handleOpenEdit(pkg)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  title="Ubah Harga & Detail"
                >
                  <Edit3 size={18} />
                </button>
              </div>

              {/* CURRENT PRICE HIGHLIGHT */}
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Harga Sekarang</span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-black text-orange-600">
                    {formatRupiah(currentPrice)}
                  </span>
                  <span className="text-xs text-slate-400">/ {currentDuration} hari</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 line-clamp-2">
                {pkg.deskripsi || pkg.description || "Tidak ada deskripsi paket."}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-slate-400" />
                  <span>Durasi: <strong>{currentDuration} Hari</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${pkg.aktif !== false ? "bg-emerald-500" : "bg-slate-300"}`} />
                  <span>{pkg.aktif !== false ? "Aktif" : "Non-aktif"}</span>
                </div>
              </div>

              <button
                onClick={() => handleOpenEdit(pkg)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition hover:bg-orange-600"
              >
                <Edit3 size={14} />
                <span>Ubah Harga Paket Ini</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* EDIT MODAL */}
      {editingPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Coins size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Ubah Harga Paket</h2>
                  <p className="text-xs text-slate-500">ID: {editingPkg.id}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingPkg(null)}
                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nama Paket
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Harga Paket (IDR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-slate-400">Rp</span>
                  <input
                    type="number"
                    required
                    min={0}
                    step={1000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 pl-12 pr-4 py-3 text-base font-black text-slate-900 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Pratinjau: <strong>{formatRupiah(formPrice)}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Durasi (Hari)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Status Aktif
                  </label>
                  <select
                    value={formActive ? "true" : "false"}
                    onChange={(e) => setFormActive(e.target.value === "true")}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="true">Aktif (Dijual)</option>
                    <option value="false">Nonaktif (Disembunyikan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Deskripsi Paket
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 resize-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPkg(null)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-orange-700 disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
