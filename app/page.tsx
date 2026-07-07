"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Laptop, Pencil, GraduationCap, Copy, Check, LogIn } from 'lucide-react';

export default function Home() {
  const VOUCHER_KODE = 'CIBOE-TKA';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(VOUCHER_KODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0a2540] text-white font-sans overflow-x-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[400px] h-[400px] bg-yellow-600/10 rounded-full blur-[100px]" />
      </div>

      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="text-2xl font-black tracking-tighter">Ciboe<span className="text-blue-400">Edu</span></div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Kolom Kiri */}
        <div className="md:w-1/2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-tighter">
              Bimbel TKA<br/>
              <span className="text-yellow-400">Ciboe Edu</span>
            </h1>
            <p className="text-lg font-medium text-blue-200">SD/MI • SMP/MTs • SMA/MA/SMK</p>
          </div>

          {/* Kotak Salin Voucher */}
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex justify-between items-center shadow-2xl max-w-lg min-h-[70px]">
            <span className="font-bold text-yellow-400 text-xl tracking-widest px-4">{VOUCHER_KODE}</span>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl transition-all"
            >
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              <span className="text-sm font-bold">{copied ? "Disalin!" : "Salin Voucher"}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl inline-block">
              <p className="text-lg font-bold text-yellow-400">DISKON 60% KHUSUS HARI INI</p>
              <p className="text-sm opacity-300">Harga: <span className="line-through">Rp 50.000</span> → <span className="font-bold text-white">Rp 20.000</span></p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4">
          <Link href="/simulasi" className="col-span-2 bg-blue-600/20 border-2 border-blue-400 p-8 rounded-[2rem] flex items-center gap-6 group hover:bg-blue-600/30 transition-all">
            <Pencil size={48} className="text-blue-400" />
            <div>
              <h3 className="font-black text-2xl">Latihan Soal Gratis</h3>
              <p className="text-blue-200">Coba 3 soal pertama sekarang!</p>
            </div>
          </Link>
          <Link href="/kurikulum" className="bg-white/5 p-8 rounded-[2rem] flex flex-col items-center gap-4 text-center hover:bg-white/10 transition-all">
            <BookOpen size={32} className="text-yellow-400" />
            <span className="font-bold">JADWAL BELAJAR</span>
          </Link>
          <Link href="/materi" className="bg-white/5 p-8 rounded-[2rem] flex flex-col items-center gap-4 text-center hover:bg-white/10 transition-all">
            <Laptop size={32} className="text-green-400" />
            <span className="font-bold">BAHAN BELAJAR</span>
          </Link>
          
          <div className="col-span-2 flex flex-col gap-3">
            <Link href="/daftar" className="w-full bg-red-600/20 border border-red-500/30 p-6 rounded-[2rem] flex justify-center items-center gap-4 hover:bg-red-600/30 transition-all">
              <GraduationCap size={32} className="text-red-400" />
              <span className="font-bold text-lg">DAFTAR SEKARANG</span>
            </Link>
            {/* Link Login */}
            <Link href="/login" className="flex justify-center items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors py-2">
              <LogIn size={16} />
              <span>Sudah punya akun? Login di sini</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}