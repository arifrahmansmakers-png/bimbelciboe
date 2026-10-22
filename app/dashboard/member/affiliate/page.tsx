"use client";

import { useState } from "react";
import {
  Handshake,
  Users,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Share2,
  Calendar,
  Gift,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface ReferralMember {
  id: string;
  name: string;
  joinedAt: string;
  bonusDays: number;
}

export default function MemberAffiliatePage() {
  const user = useUser();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Kode referral unik user (fallback ke nama/id)
  const referralCode =
    (user.name ? user.name.replace(/\s+/g, "").toUpperCase().slice(0, 8) : "CIBOE") +
    (user.uid ? user.uid.slice(-4).toUpperCase() : "2026");

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/daftar?ref=${referralCode}`
    : `https://bimbelciboe.com/daftar?ref=${referralCode}`;

  // Data riwayat referral member baru
  const [referredMembers] = useState<ReferralMember[]>([
    {
      id: "ref-1",
      name: "Rian Pratama",
      joinedAt: "2026-10-18T14:20:00Z",
      bonusDays: 5,
    },
    {
      id: "ref-2",
      name: "Siti Rahayu",
      joinedAt: "2026-10-12T09:45:00Z",
      bonusDays: 5,
    },
    {
      id: "ref-3",
      name: "Dimas Anggara",
      joinedAt: "2026-10-05T16:10:00Z",
      bonusDays: 5,
    },
  ]);

  const totalMembers = referredMembers.length;
  const totalBonusDays = referredMembers.reduce((acc, curr) => acc + curr.bonusDays, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER UTAMA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2b4c] via-[#154673] to-[#206096] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black shadow-lg">
              <Gift size={32} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-xs font-bold text-amber-300 backdrop-blur mb-1">
                <Sparkles size={12} />
                <span>Program Reward Referral</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black">Program Affiliate Siswa</h1>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-0.5">
                Dapatkan reward <strong>penambahan 5 hari masa aktif membership</strong> untuk setiap teman baru yang mendaftar menggunakan kode referral Anda.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur border border-white/20 text-center shrink-0 min-w-[150px]">
            <span className="text-[11px] font-bold text-blue-200 block uppercase tracking-wider">
              Bonus Masa Aktif
            </span>
            <div className="text-3xl font-black text-amber-300 mt-0.5">
              +{totalBonusDays} Hari
            </div>
            <span className="text-[10px] text-blue-100 font-medium">Dari {totalMembers} Teman</span>
          </div>
        </div>
      </section>

      {/* KARTU KODE & LINK REFERRAL */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Share2 size={20} />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Bagikan Kode & Link Referral Anda</h2>
            <p className="text-xs text-slate-500">
              Teman yang mendaftar akan mendapatkan diskon, dan Anda otomatis mendapat +5 hari aktif!
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* KODE REFERRAL */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Kode Referral Anda:
            </span>
            <div className="flex items-center justify-between gap-2 bg-white rounded-xl p-3 border border-blue-200 shadow-sm">
              <span className="font-mono text-lg font-black text-blue-700 tracking-wider">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
              >
                {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedCode ? "Tersalin" : "Salin Kode"}</span>
              </button>
            </div>
          </div>

          {/* LINK REFERRAL */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Link Pendaftaran Langsung:
            </span>
            <div className="flex items-center justify-between gap-2 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-600 truncate font-mono">
                {referralLink}
              </span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg shadow-sm transition shrink-0"
              >
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedLink ? "Tersalin" : "Salin Link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 LANGKAH CARA KERJA REWARD */}
        <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
            Cara Kerja Reward Tambahan Masa Aktif:
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-xs shrink-0">
                1
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-900">Bagikan Link / Kode</strong>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Kirimkan kode referral ke teman sekelas, sahabat, atau grup belajar Anda.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-indigo-600 text-white font-black text-xs shrink-0">
                2
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-900">Teman Mendaftar</strong>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Teman membuat akun member Bimbel Ciboe dan memasukkan kode Anda saat registrasi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-600 text-white font-black text-xs shrink-0">
                3
              </div>
              <div>
                <strong className="block text-xs font-bold text-slate-900">+5 Hari Masa Aktif</strong>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Akun Anda secara otomatis diperpanjang +5 hari untuk setiap teman yang bergabung!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIWAYAT MEMBER YANG BERGABUNG */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Users size={18} className="text-blue-600" />
            Riwayat Teman yang Bergabung Lewat Anda
          </h2>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Total {totalMembers} Teman Terdaftar
          </span>
        </div>

        {referredMembers.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <Gift size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700 text-sm">Belum ada teman yang bergabung</p>
            <p className="text-xs text-slate-400 mt-1">
              Bagikan kode referral Anda sekarang dan nikmati perpanjangan masa aktif gratis!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {referredMembers.map((member) => (
              <div
                key={member.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 rounded-xl px-2 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 font-black text-sm">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900">{member.name}</div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <Calendar size={12} />
                      <span>
                        {new Date(member.joinedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-black text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <CheckCircle2 size={13} className="text-emerald-600" />
                    +{member.bonusDays} Hari Masa Aktif
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Otomatis ditambahkan ke akun Anda
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}