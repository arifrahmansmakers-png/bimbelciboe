"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function MemberFAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Bagaimana cara mulai mengerjakan tryout CBT?",
      a: "Buka menu 'Tryout' pada dashboard member Anda, pilih paket tryout yang ingin dikerjakan, lalu klik tombol 'Mulai Ujian Sekarang'. Timer ujian akan otomatis berjalan.",
    },
    {
      q: "Apakah pengerjaan tryout dibatasi waktu?",
      a: "Ya. Setiap sesi tryout memiliki batas durasi pengerjaan menit yang telah ditentukan agar peserta terbiasa dengan tekanan waktu ujian sebenarnya.",
    },
    {
      q: "Bagaimana cara melihat peringkat saya di ranking nasional?",
      a: "Setelah men-submit lembar jawaban tryout, sistem kami akan langsung menghitung total skor dan durasi pengerjaan Anda. Posisi Anda dapat dilihat di menu Ranking Nasional.",
    },
    {
      q: "Bagaimana jika koneksi internet terputus di tengah ujian?",
      a: "Jawaban yang sudah Anda pilih secara berkala tersimpan otomatis di browser lokal Anda. Jika halaman terefresh, Anda dapat langsung melanjutkan pengerjaan selama waktu durasi belum habis.",
    },
  ];

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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-bold">
            <HelpCircle size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Frequently Asked Questions (FAQ)</h1>
            <p className="text-xs text-slate-500">Pertanyaan umum seputar akun, tryout CBT, dan sistem belajar Ciboe Edu.</p>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 hover:bg-slate-100/60"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
