"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  ShieldCheck,
  KeyRound,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function MemberProfilePage() {
  const user = useUser();
  const [resetSent, setResetSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSendReset = async () => {
    if (!user.email) return;
    try {
      setSendingReset(true);
      setMessage(null);
      await sendPasswordResetEmail(auth, user.email);
      setResetSent(true);
      setMessage("Link instruksi reset password telah dikirim ke email Anda.");
    } catch (err: any) {
      setMessage("Gagal mengirim email reset: " + (err.message || "Terjadi kesalahan"));
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black text-2xl shadow-md">
              {user.name?.charAt(0).toUpperCase() || "M"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{user.name || "Member Ciboe"}</h1>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                  {user.membershipActive ? "Member Aktif" : "Siswa"}
                </span>
              </div>
              <p className="text-sm text-blue-200 mt-0.5">{user.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP STATUS CARD */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-500" />
            Status Membership
          </h2>
          <Link
            href="/dashboard/member/perpanjang"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition"
          >
            <CreditCard size={15} />
            Perpanjang Masa Aktif
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-400 font-medium">Paket Langganan</span>
            <span className="block mt-1 font-black text-slate-800">
              {user.packageId ? user.packageId.toUpperCase() : "Paket Akses Aktif"}
            </span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-400 font-medium">Status Akun</span>
            <span className="block mt-1 font-black text-emerald-600">
              {user.membershipStatus === "ACTIVE" ? "AKTIF" : "TERDAFTAR"}
            </span>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <span className="text-xs text-slate-400 font-medium">Berlaku Sampai</span>
            <span className="block mt-1 font-bold text-slate-800">
              {user.membershipExpiredAt
                ? new Date(user.membershipExpiredAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Akses Belajar Aktif"}
            </span>
          </div>
        </div>
      </div>

      {/* USER DETAILS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <User size={20} className="text-blue-500" />
          Data Profil Pribadi
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Nama Lengkap
            </label>
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
              {user.name || "-"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Alamat Email
            </label>
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
              {user.email || "-"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Jenjang Pendidikan
            </label>
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
              {user.educationLevelId ? user.educationLevelId.toUpperCase() : "SMA/MA"}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Role Akun
            </label>
            <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 capitalize">
              {user.role}
            </div>
          </div>
        </div>
      </div>

      {/* SECURITY / PASSWORD */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
          <KeyRound size={20} className="text-amber-500" />
          Keamanan & Password
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Ingin mengganti password akun Anda? Klik tombol di bawah untuk menerima link reset kata sandi ke email Anda.
        </p>

        {message && (
          <div className="mb-4 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs font-semibold text-blue-800">
            {message}
          </div>
        )}

        <button
          onClick={handleSendReset}
          disabled={sendingReset || resetSent}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-60 transition"
        >
          {sendingReset
            ? "Mengirim Link..."
            : resetSent
            ? "Link Berhasil Dikirim"
            : "Kirim Link Ganti Password"}
        </button>
      </div>
    </div>
  );
}
