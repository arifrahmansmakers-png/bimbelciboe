"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, ShieldCheck } from "lucide-react";

export default function MemberKontakPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        href="/dashboard/member/bantuan"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft size={16} />
        <span>Kembali ke Pusat Bantuan</span>
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-bold">
            <Phone size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Hubungi Layanan Pengguna</h1>
            <p className="text-xs text-slate-500">Tim kami siap membantu kendala teknis atau pertanyaan akun Anda.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white">
              <MessageCircle size={20} />
            </div>
            <h3 className="font-black text-slate-900">WhatsApp Customer Care</h3>
            <p className="text-xs text-slate-500">Respon cepat untuk kendala login, pendaftaran, dan verifikasi.</p>
            <div className="font-mono text-sm font-black text-slate-900">+62 812-3456-7890</div>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
            >
              <span>Chat WhatsApp</span>
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white">
              <Mail size={20} />
            </div>
            <h3 className="font-black text-slate-900">Email Bantuan Resmi</h3>
            <p className="text-xs text-slate-500">Kirimkan pertanyaan resmi, kerja sama institusi, atau feedback detail.</p>
            <div className="font-mono text-sm font-black text-slate-900">support@ciboeedu.com</div>
            <a
              href="mailto:support@ciboeedu.com"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              <span>Kirim Email</span>
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-800">
          <Clock size={16} className="text-amber-600 shrink-0" />
          <span>
            Jam Operasional Layanan: <strong>Senin – Sabtu, 08:00 – 21:00 WIB</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
