"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Shield,
  GraduationCap,
  Mail,
  Phone,
  RefreshCw,
  Clock,
  CalendarPlus,
  Calendar,
  AlertCircle,
  X,
  Sparkles,
  Check,
} from "lucide-react";

interface UserItem {
  uid: string;
  nama?: string;
  name?: string;
  email: string;
  wa?: string;
  role?: string;
  status?: string;
  educationLevelName?: string;
  educationLevelId?: string;
  membershipStatus?: string;
  membershipActive?: boolean;
  membershipExpiredAt?: string | null;
  packageId?: string;
  createdAt?: string;
}

const LOCAL_STORAGE_USERS_KEY = "admin_custom_users_v2";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [nowTimestamp, setNowTimestamp] = useState<number>(0);

  // State Modal Tambah Masa Aktif
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number>(30);
  const [customDays, setCustomDays] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");
  const [useCustomDate, setUseCustomDate] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load users dari API & localStorage
  const loadUsers = async () => {
    setLoading(true);
    try {
      // 1. Cek local storage cache terlebih dahulu
      const local = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      let localList: UserItem[] = [];
      if (local) {
        try {
          localList = JSON.parse(local);
        } catch (e) {
          console.error(e);
        }
      }

      // 2. Fetch dari API
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          // Merge API users dengan perubahan lokal jika ada
          if (localList.length > 0) {
            const merged = data.users.map((u: UserItem) => {
              const locallyUpdated = localList.find((l) => l.uid === u.uid);
              return locallyUpdated ? { ...u, ...locallyUpdated } : u;
            });
            setUsers(merged);
            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(merged));
          } else {
            setUsers(data.users);
            localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(data.users));
          }
          setLoading(false);
          return;
        }
      }

      // Fallback
      if (localList.length > 0) {
        setUsers(localList);
      }
    } catch (err) {
      console.warn("Gagal fetch users:", err);
      const local = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      if (local) {
        setUsers(JSON.parse(local));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNowTimestamp(Date.now());
    loadUsers();
  }, []);

  // Buka Modal Tambah Masa Aktif
  const handleOpenExtendModal = (user: UserItem) => {
    setSelectedUser(user);
    setSelectedDays(30);
    setCustomDays("");
    setUseCustomDate(false);
    setCustomDate("");
    setModalOpen(true);
  };

  // Hitung perkiraan tanggal expiry baru
  const calculateNewExpiryDate = (): Date => {
    if (useCustomDate && customDate) {
      return new Date(customDate);
    }

    const days = customDays ? parseInt(customDays, 10) || selectedDays : selectedDays;
    let baseTime = nowTimestamp || 0;

    // Jika user sudah memiliki masa aktif di masa depan, tambahkan dari tanggal tersebut
    if (selectedUser?.membershipExpiredAt) {
      const currentExpiry = new Date(selectedUser.membershipExpiredAt).getTime();
      if (currentExpiry > baseTime) {
        baseTime = currentExpiry;
      }
    }

    return new Date(baseTime + days * 24 * 60 * 60 * 1000);
  };

  // Submit Penambahan Masa Aktif
  const handleSaveExtension = async () => {
    if (!selectedUser) return;
    setSubmitting(true);

    try {
      const newExpiry = calculateNewExpiryDate();
      const newExpiryIso = newExpiry.toISOString();
      const days = customDays ? parseInt(customDays, 10) || selectedDays : selectedDays;

      // Panggil API
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: selectedUser.uid,
          daysToAdd: days,
          newExpiredAt: useCustomDate ? newExpiryIso : undefined,
          reason: `Penambahan manual oleh Admin: +${days} hari`,
        }),
      });

      const resData = await res.json();

      // Update state lokal
      const updatedList = users.map((u) => {
        if (u.uid === selectedUser.uid) {
          return {
            ...u,
            membershipStatus: "ACTIVE",
            membershipActive: true,
            membershipExpiredAt: newExpiryIso,
          };
        }
        return u;
      });

      setUsers(updatedList);
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(updatedList));

      setToastMessage({
        type: "success",
        text: `Berhasil menambahkan masa aktif untuk ${selectedUser.nama || selectedUser.email} hingga ${newExpiry.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}!`,
      });

      setModalOpen(false);
    } catch (err: any) {
      setToastMessage({
        type: "error",
        text: "Gagal memperpanjang masa aktif: " + (err.message || "Kesalahan jaringan"),
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  // Filter daftar pengguna
  const filtered = users.filter((u) => {
    const matchSearch =
      (u.nama || "").toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.wa || "").includes(search);
    const matchRole = filterRole === "all" || u.role === filterRole;

    const isMemberActive =
      u.membershipStatus === "ACTIVE" &&
      (!u.membershipExpiredAt || !nowTimestamp || new Date(u.membershipExpiredAt).getTime() > nowTimestamp);

    const matchStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && isMemberActive) ||
      (filterStatus === "inactive" && !isMemberActive);

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* TOAST NOTIFIKASI */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all ${
            toastMessage.type === "success"
              ? "bg-emerald-600 text-white shadow-emerald-600/30"
              : "bg-red-600 text-white shadow-red-600/30"
          }`}
        >
          {toastMessage.type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X size={16} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Users size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Pengguna & Member</h1>
            <p className="text-sm text-slate-500">
              Daftar siswa, atur hak akses, dan tambah masa aktif member secara manual.
            </p>
          </div>
        </div>
        <button
          onClick={loadUsers}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm transition"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-blue-600" : ""} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, email, atau WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
        >
          <option value="all">Semua Role</option>
          <option value="member">Member (Siswa)</option>
          <option value="partner">Partner / Mitra</option>
          <option value="admin">Administrator</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
        >
          <option value="all">Semua Status</option>
          <option value="active">Membership Aktif</option>
          <option value="inactive">Nonaktif / Kadaluarsa</option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Nama & Email</th>
                <th className="px-6 py-4">WhatsApp</th>
                <th className="px-6 py-4">Jenjang</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Masa Aktif / Kadaluarsa</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <RefreshCw size={24} className="mx-auto animate-spin text-blue-500 mb-2" />
                    Memuat data pengguna...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    Tidak ditemukan data pengguna yang cocok.
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const hasExpiry = !!user.membershipExpiredAt;
                  const expiryDate = hasExpiry ? new Date(user.membershipExpiredAt!) : null;
                  const isExpired = expiryDate && nowTimestamp ? expiryDate.getTime() <= nowTimestamp : false;
                  const isActive = user.membershipStatus === "ACTIVE" && !isExpired;

                  return (
                    <tr key={user.uid} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{user.nama || user.name || "Member Ciboe"}</div>
                        <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail size={12} />
                          {user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                        {user.wa || "-"}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                          <GraduationCap size={13} className="text-blue-500" />
                          {user.educationLevelName || "SD / SMP / SMA"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "partner"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role || "member"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {hasExpiry && expiryDate ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                              <Calendar size={13} className="text-slate-400" />
                              {expiryDate.toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                            <span
                              className={`text-[10px] font-semibold ${
                                isExpired ? "text-red-500" : "text-emerald-600"
                              }`}
                            >
                              {isExpired
                                ? "Masa aktif telah berakhir"
                                : `Sisa ${Math.max(
                                    0,
                                    Math.ceil(
                                      (expiryDate.getTime() - (nowTimestamp || 0)) / (1000 * 60 * 60 * 24)
                                    )
                                  )} hari lagi`}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium">Belum diaktifkan</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                            isActive
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {isActive ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                          {isActive ? "Aktif" : "Kadaluarsa"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenExtendModal(user)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition shadow-sm border border-blue-200"
                          title="Tambah atau perpanjang masa aktif secara manual"
                        >
                          <CalendarPlus size={14} />
                          <span>+ Tambah Masa Aktif</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH MASA AKTIF SECARA MANUAL */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-6">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <CalendarPlus size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Tambah Masa Aktif Member</h3>
                  <p className="text-xs text-slate-500">Perpanjangan manual tanpa perlu pembayaran siswa</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* USER INFO SUMMARY */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Nama Siswa / User:</span>
                <span className="font-bold text-slate-900">{selectedUser.nama || selectedUser.email}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Email:</span>
                <span className="font-mono text-slate-700">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Status Saat Ini:</span>
                <span
                  className={`font-bold ${
                    selectedUser.membershipStatus === "ACTIVE" ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {selectedUser.membershipStatus === "ACTIVE" ? "Member Aktif" : "Nonaktif / Kadaluarsa"}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Berlaku Sampai:</span>
                <span className="font-semibold text-slate-800">
                  {selectedUser.membershipExpiredAt
                    ? new Date(selectedUser.membershipExpiredAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Belum pernah aktif"}
                </span>
              </div>
            </div>

            {/* PRESET PILIHAN DURASI */}
            <div className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600">
                Pilih Durasi Penambahan Masa Aktif:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { days: 7, label: "+7 Hari", desc: "1 Minggu" },
                  { days: 30, label: "+30 Hari", desc: "1 Bulan" },
                  { days: 90, label: "+90 Hari", desc: "3 Bulan" },
                  { days: 180, label: "+180 Hari", desc: "6 Bulan" },
                  { days: 365, label: "+365 Hari", desc: "1 Tahun" },
                ].map((preset) => {
                  const isSelected = !useCustomDate && !customDays && selectedDays === preset.days;
                  return (
                    <button
                      key={preset.days}
                      type="button"
                      onClick={() => {
                        setSelectedDays(preset.days);
                        setCustomDays("");
                        setUseCustomDate(false);
                      }}
                      className={`p-3 rounded-2xl border text-left transition ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="font-black text-sm text-slate-900">{preset.label}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{preset.desc}</div>
                    </button>
                  );
                })}

                {/* PILIHAN CUSTOM HARI */}
                <button
                  type="button"
                  onClick={() => {
                    setUseCustomDate(false);
                    if (!customDays) setCustomDays("14");
                  }}
                  className={`p-3 rounded-2xl border text-left transition ${
                    !useCustomDate && customDays
                      ? "border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="font-black text-sm text-slate-900">Custom Hari</div>
                  <div className="text-[11px] text-slate-500 font-medium">Input bebas</div>
                </button>
              </div>

              {/* INPUT CUSTOM HARI JIKA DIPILIH */}
              {!useCustomDate && customDays !== "" && (
                <div className="mt-2">
                  <label className="text-[11px] font-bold text-slate-500 mb-1 block">
                    Masukkan Jumlah Hari:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    placeholder="Contoh: 45"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* TOGGLE PILIH TANGGAL LANGSUNG */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setUseCustomDate(!useCustomDate)}
                  className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <Calendar size={13} />
                  <span>{useCustomDate ? "Kembali ke pilihan durasi hari" : "Atau tentukan tanggal kadaluarsa langsung"}</span>
                </button>

                {useCustomDate && (
                  <div className="mt-2">
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* PREVIEW HASIL EXPIRY */}
            <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 flex items-start gap-3">
              <Sparkles size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="block text-[11px] font-bold uppercase text-emerald-800 tracking-wider">
                  Hasil Perpanjangan:
                </span>
                <p className="text-xs text-emerald-950 mt-0.5">
                  Masa aktif akun akan aktif dan berlaku hingga:{" "}
                  <strong className="font-black text-emerald-900 text-sm block mt-0.5">
                    {calculateNewExpiryDate().toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </strong>
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveExtension}
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    <span>Simpan & Tambah Masa Aktif</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
