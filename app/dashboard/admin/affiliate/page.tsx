"use client";

import { useEffect, useState } from "react";
import {
  Handshake,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock3,
  Mail,
  User,
  CalendarDays,
  ShieldCheck,
  Power,
  Search,
  Filter,
  Sparkles,
  Users,
  Clock,
  X,
  AlertCircle,
} from "lucide-react";

interface AffiliateAccount {
  uid: string;
  nama: string;
  email: string;
  wa?: string;
  affiliateStatus: "ACTIVE" | "INACTIVE" | "PENDING" | "REJECTED";
  referralCode?: string;
  totalReferrals: number;
  bonusDaysEarned: number; // Reward: +5 Hari per member baru
  appliedAt: string;
  updatedAt?: string;
}

const DEFAULT_AFFILIATES: AffiliateAccount[] = [
  {
    uid: "aff-01",
    nama: "Arif Rahman",
    email: "arifelecsitic@gmail.com",
    wa: "081234567890",
    affiliateStatus: "ACTIVE",
    referralCode: "ARIF5",
    totalReferrals: 6,
    bonusDaysEarned: 30, // 6 x 5 hari = 30 hari
    appliedAt: "2026-08-11T10:00:00Z",
  },
  {
    uid: "aff-02",
    nama: "Budi Santoso",
    email: "budi.sd@gmail.com",
    wa: "081298765432",
    affiliateStatus: "ACTIVE",
    referralCode: "BUDISD",
    totalReferrals: 3,
    bonusDaysEarned: 15,
    appliedAt: "2026-09-01T08:00:00Z",
  },
  {
    uid: "aff-03",
    nama: "Dewi Lestari",
    email: "dewi.lestari@gmail.com",
    wa: "081377889900",
    affiliateStatus: "PENDING",
    referralCode: "DEWI26",
    totalReferrals: 0,
    bonusDaysEarned: 0,
    appliedAt: "2026-10-15T09:15:00Z",
  },
  {
    uid: "aff-04",
    nama: "Hendro Wibowo",
    email: "hendro.w@gmail.com",
    wa: "085611223344",
    affiliateStatus: "INACTIVE",
    referralCode: "HENDRO",
    totalReferrals: 1,
    bonusDaysEarned: 5,
    appliedAt: "2026-07-20T11:00:00Z",
  },
];

const LOCAL_STORAGE_KEY = "admin_affiliates_cache_v2";

export default function AdminAffiliatePage() {
  const [affiliates, setAffiliates] = useState<AffiliateAccount[]>(DEFAULT_AFFILIATES);
  const [globalAffiliateActive, setGlobalAffiliateActive] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "ACTIVE" | "INACTIVE" | "PENDING">("all");
  const [notification, setNotification] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load dari localStorage / cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        setAffiliates(JSON.parse(cached));
      }
      const globalSetting = localStorage.getItem("admin_global_affiliate_active");
      if (globalSetting !== null) {
        setGlobalAffiliateActive(globalSetting === "true");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveAffiliates = (updated: AffiliateAccount[]) => {
    setAffiliates(updated);
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

  // TOGGLE STATUS INDIVIDUAL AFFILIATE (AKTIFKAN / NONAKTIFKAN)
  const handleToggleAffiliateStatus = (uid: string) => {
    const updated = affiliates.map((a) => {
      if (a.uid === uid) {
        const nextStatus = a.affiliateStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        showToast(
          `Status affiliate ${a.nama} berhasil diubah menjadi: ${
            nextStatus === "ACTIVE" ? "AKTIF" : "NONAKTIF"
          }!`
        );
        return { ...a, affiliateStatus: nextStatus as any, updatedAt: new Date().toISOString() };
      }
      return a;
    });

    saveAffiliates(updated);
  };

  // APPROVE PENDING APPLICATION
  const handleApproveApplication = (uid: string) => {
    const updated = affiliates.map((a) => {
      if (a.uid === uid) {
        showToast(`Pengajuan affiliate untuk ${a.nama} berhasil disetujui (AKTIF)!`);
        return { ...a, affiliateStatus: "ACTIVE" as any, updatedAt: new Date().toISOString() };
      }
      return a;
    });

    saveAffiliates(updated);
  };

  // TOGGLE GLOBAL AFFILIATE SETTING
  const handleToggleGlobalAffiliate = () => {
    const nextState = !globalAffiliateActive;
    setGlobalAffiliateActive(nextState);
    try {
      localStorage.setItem("admin_global_affiliate_active", String(nextState));
    } catch (e) {
      console.error(e);
    }
    showToast(
      `Sistem Program Affiliate berhasil ${nextState ? "DIAKTIFKAN secara global" : "DINONAKTIFKAN secara global"}.`
    );
  };

  const filtered = affiliates.filter((a) => {
    const matchSearch =
      a.nama.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      (a.referralCode || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || a.affiliateStatus === filterStatus;
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
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <Handshake size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Program Affiliate</h1>
            <p className="text-sm text-slate-500">
              Aktifkan/nonaktifkan program dan akun mitra affiliate dengan reward +5 hari masa aktif per member.
            </p>
          </div>
        </div>

        {/* GLOBAL SWITCH AKTIF / NONAKTIF PROGRAM AFFILIATE */}
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 border border-slate-200 shadow-sm shrink-0">
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">Status Program Affiliate:</span>
            <span className={`font-black ${globalAffiliateActive ? "text-emerald-600" : "text-slate-400"}`}>
              {globalAffiliateActive ? "AKTIF BERJALAN" : "DINONAKTIFKAN"}
            </span>
          </div>
          <button
            onClick={handleToggleGlobalAffiliate}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              globalAffiliateActive
                ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            <Power size={13} />
            <span>{globalAffiliateActive ? "Nonaktifkan Global" : "Aktifkan Global"}</span>
          </button>
        </div>
      </div>

      {/* REWARD SUMMARY BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold backdrop-blur">
            <Sparkles size={13} className="text-amber-300" />
            <span>Skema Reward Baru</span>
          </div>
          <h2 className="text-xl font-black">Reward Affiliate: +5 Hari Masa Aktif per Member Baru</h2>
          <p className="text-xs text-emerald-100 max-w-xl">
            Setiap member baru yang berhasil diajak dan mendaftar dengan kode referral akan otomatis memberikan tambahan 5 hari masa aktif membership bagi affiliate.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 shrink-0">
          <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur border border-white/20 text-center">
            <span className="text-[11px] font-bold text-emerald-100 block">Total Member Terdaftar</span>
            <span className="text-2xl font-black text-amber-300">
              {affiliates.reduce((acc, a) => acc + a.totalReferrals, 0)} Siswa
            </span>
          </div>
          <div className="rounded-2xl bg-white/10 p-3.5 backdrop-blur border border-white/20 text-center">
            <span className="text-[11px] font-bold text-emerald-100 block">Total Hari Bonus Diberikan</span>
            <span className="text-2xl font-black text-white">
              +{affiliates.reduce((acc, a) => acc + a.bonusDaysEarned, 0)} Hari
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, email, atau kode referral..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e: any) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-emerald-500"
        >
          <option value="all">Semua Status Affiliate ({affiliates.length})</option>
          <option value="ACTIVE">Aktif ({affiliates.filter((a) => a.affiliateStatus === "ACTIVE").length})</option>
          <option value="INACTIVE">Nonaktif ({affiliates.filter((a) => a.affiliateStatus === "INACTIVE").length})</option>
          <option value="PENDING">Menunggu Persetujuan ({affiliates.filter((a) => a.affiliateStatus === "PENDING").length})</option>
        </select>
      </div>

      {/* TABEL AFFILIATE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Mitra Affiliate</th>
                <th className="px-6 py-4">Kode Referral</th>
                <th className="px-6 py-4 text-center">Member Diajak</th>
                <th className="px-6 py-4 text-center">Reward Masa Aktif</th>
                <th className="px-6 py-4 text-center">Status Affiliate</th>
                <th className="px-6 py-4 text-right">Aksi Admin (Aktif / Nonaktif)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((aff) => {
                const isActive = aff.affiliateStatus === "ACTIVE";
                const isPending = aff.affiliateStatus === "PENDING";

                return (
                  <tr key={aff.uid} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{aff.nama}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <Mail size={12} />
                        {aff.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg">
                        {aff.referralCode || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-slate-800">
                      {aff.totalReferrals} Siswa
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 font-black text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <Clock size={12} />
                        +{aff.bonusDaysEarned} Hari
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                          isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : isPending
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isActive ? (
                          <CheckCircle2 size={13} />
                        ) : isPending ? (
                          <Clock3 size={13} />
                        ) : (
                          <XCircle size={13} />
                        )}
                        <span>{isActive ? "Aktif" : isPending ? "Menunggu" : "Nonaktif"}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isPending ? (
                        <button
                          onClick={() => handleApproveApplication(aff.uid)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow transition"
                        >
                          <CheckCircle2 size={13} />
                          <span>Setujui (Aktifkan)</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleAffiliateStatus(aff.uid)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-sm ${
                            isActive
                              ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                          title={isActive ? "Nonaktifkan akun affiliate ini" : "Aktifkan akun affiliate ini"}
                        >
                          <Power size={13} />
                          <span>{isActive ? "Nonaktifkan" : "Aktifkan"}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}