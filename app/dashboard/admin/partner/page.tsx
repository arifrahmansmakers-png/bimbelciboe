"use client";

import { useEffect, useState } from "react";
import {
  Handshake,
  Plus,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Building,
  Power,
  Search,
  X,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface PartnerItem {
  id: string;
  nama: string;
  email: string;
  wa?: string;
  instansi: string; // Sekolah, Bimbel, Komunitas
  kodePartner: string;
  bagiHasilPersen: number;
  totalSiswa: number;
  active: boolean;
  joinedAt: string;
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  {
    id: "part-01",
    nama: "Drs. Bambang Sudarsono",
    email: "bambang.partner@gmail.com",
    wa: "081233445566",
    instansi: "Bimbel Prestasi Nusantara Bandung",
    kodePartner: "PARTNER-BPN",
    bagiHasilPersen: 20,
    totalSiswa: 45,
    active: true,
    joinedAt: "2026-06-15",
  },
  {
    id: "part-02",
    nama: "Ibu Nurul Aini, M.Pd",
    email: "nurul.aini@sekolahceria.sch.id",
    wa: "081977665544",
    instansi: "SD & SMP Ceria Cendekia Surabaya",
    kodePartner: "MITRA-CERIA",
    bagiHasilPersen: 15,
    totalSiswa: 120,
    active: true,
    joinedAt: "2026-07-01",
  },
  {
    id: "part-03",
    nama: "Rizky Firmansyah",
    email: "rizky.firman@gmail.com",
    wa: "085712349988",
    instansi: "Komunitas Belajar Mandiri Medan",
    kodePartner: "KBM-MEDAN",
    bagiHasilPersen: 15,
    totalSiswa: 18,
    active: false,
    joinedAt: "2026-08-10",
  },
];

const LOCAL_STORAGE_KEY = "admin_partners_cache_v2";

export default function AdminPartnerPage() {
  const [partners, setPartners] = useState<PartnerItem[]>(DEFAULT_PARTNERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal Tambah Partner
  const [showAddModal, setShowAddModal] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [instansi, setInstansi] = useState("");
  const [kodePartner, setKodePartner] = useState("");
  const [bagiHasil, setBagiHasil] = useState<number>(15);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        setPartners(JSON.parse(cached));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const savePartners = (updated: PartnerItem[]) => {
    setPartners(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // TOGGLE STATUS AKTIF / NONAKTIF PARTNER
  const handleTogglePartner = (id: string) => {
    const updated = partners.map((p) => {
      if (p.id === id) {
        const nextState = !p.active;
        showToast(
          `Mitra Partner "${p.instansi} (${p.nama})" berhasil ${
            nextState ? "DIAKTIFKAN" : "DINONAKTIFKAN"
          }!`
        );
        return { ...p, active: nextState };
      }
      return p;
    });

    savePartners(updated);
  };

  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !email.trim()) {
      showToast("Nama dan email mitra wajib diisi!", "error");
      return;
    }

    const created: PartnerItem = {
      id: `part-${Date.now()}`,
      nama: nama.trim(),
      email: email.trim(),
      wa: wa.trim() || "-",
      instansi: instansi.trim() || "Mitra Pendidikan",
      kodePartner: kodePartner.trim().toUpperCase() || `MITRA-${Date.now().toString().slice(-4)}`,
      bagiHasilPersen: bagiHasil,
      totalSiswa: 0,
      active: true,
      joinedAt: new Date().toISOString().split("T")[0],
    };

    const updated = [created, ...partners];
    savePartners(updated);
    showToast(`Mitra "${created.instansi}" berhasil ditambahkan dan langsung aktif!`);
    setShowAddModal(false);
    setNama("");
    setEmail("");
    setWa("");
    setInstansi("");
    setKodePartner("");
  };

  const filtered = partners.filter((p) => {
    const matchSearch =
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.instansi.toLowerCase().includes(search.toLowerCase()) ||
      p.kodePartner.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && p.active) ||
      (filterStatus === "inactive" && !p.active);
    return matchSearch && matchStatus;
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

      {/* HEADER UTAMA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
            <Handshake size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Mitra Partner</h1>
            <p className="text-sm text-slate-500">
              Daftar kerja sama sekolah, bimbel rekanan, dan tombol aktifkan/nonaktifkan status kemitraan.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-700 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-teal-600/20 transition"
        >
          <Plus size={16} />
          <span>+ Tambah Mitra Partner</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, instansi, email, atau kode partner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e: any) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-teal-500"
        >
          <option value="all">Semua Partner ({partners.length})</option>
          <option value="active">Partner Aktif ({partners.filter((p) => p.active).length})</option>
          <option value="inactive">Partner Nonaktif ({partners.filter((p) => !p.active).length})</option>
        </select>
      </div>

      {/* TABEL MITRA PARTNER */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Instansi & Penanggung Jawab</th>
                <th className="px-6 py-4">Kontak (Email / WA)</th>
                <th className="px-6 py-4">Kode Mitra</th>
                <th className="px-6 py-4 text-center">Bagi Hasil</th>
                <th className="px-6 py-4 text-center">Siswa Terafiliasi</th>
                <th className="px-6 py-4 text-center">Status Partner</th>
                <th className="px-6 py-4 text-right">Aksi Admin (Aktif / Nonaktif)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Building size={14} className="text-teal-600" />
                      {p.instansi}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 font-medium">PJ: {p.nama}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Mail size={12} className="text-slate-400" />
                      <span>{p.email}</span>
                    </div>
                    {p.wa && (
                      <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <Phone size={12} className="text-slate-400" />
                        <span>{p.wa}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                      {p.kodePartner}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-teal-700">
                    {p.bagiHasilPersen}%
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-slate-800">
                    {p.totalSiswa} Siswa
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        p.active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.active ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      <span>{p.active ? "Aktif" : "Nonaktif"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleTogglePartner(p.id)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                        p.active
                          ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                      title={p.active ? "Nonaktifkan kemitraan partner ini" : "Aktifkan kembali partner ini"}
                    >
                      <Power size={13} />
                      <span>{p.active ? "Nonaktifkan" : "Aktifkan"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH MITRA PARTNER */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <form
            onSubmit={handleAddPartner}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">+ Tambah Mitra Partner Baru</h3>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Instansi / Sekolah (*):</label>
                <input
                  type="text"
                  required
                  value={instansi}
                  onChange={(e) => setInstansi(e.target.value)}
                  placeholder="Contoh: SMA Negeri 1 Sukamaju / Bimbel Genius"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama PJ / Kontak (*):</label>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama Lengkap PJ"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp:</label>
                  <input
                    type="text"
                    value={wa}
                    onChange={(e) => setWa(e.target.value)}
                    placeholder="081234567890"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email (*):</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@sekolah.sch.id"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kode Partner (Unik):</label>
                  <input
                    type="text"
                    value={kodePartner}
                    onChange={(e) => setKodePartner(e.target.value.toUpperCase())}
                    placeholder="Contoh: SMAN1-SMJ"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold uppercase outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Bagi Hasil (%):</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={bagiHasil}
                    onChange={(e) => setBagiHasil(parseInt(e.target.value, 10) || 15)}
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
                className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white shadow"
              >
                Simpan & Aktifkan Mitra
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
