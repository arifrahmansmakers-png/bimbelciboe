'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
BookOpen,
MonitorSmartphone,
BarChart3,
ShieldCheck,
Zap,
Headset,
CheckCircle2
} from 'lucide-react';

interface PackageData{
id:string;
kode:string;
nama:string;
harga:number;
durasiHari:number;
deskripsi:string;
warna:string;
icon:string;
fitur:string[];
}

export default function DaftarPage(){
  const VOUCHER_KODE = "CIBOE-TKA";

const [packages,setPackages]=useState<PackageData[]>([]);
const [loading,setLoading]=useState(true);

useEffect(()=>{
const loadPackages=async()=>{
try{
const res=await fetch('/api/packages');
const json=await res.json();
if(!res.ok) throw new Error(json.message);
setPackages(json.data);
}catch(err){
console.error(err);
}finally{
setLoading(false);
}
};
loadPackages();
},[]);

if(loading){
return(
<div className="min-h-screen flex items-center justify-center bg-slate-50">
<div className="w-14 h-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
</div>
);
}

return(
<main className="bg-slate-50">

<section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">

<div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
<div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-300/10 blur-3xl"></div>

<div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

<div>

<div className="inline-flex items-center rounded-full bg-white/15 border border-white/20 backdrop-blur px-5 py-2 text-white text-sm font-semibold">
Ciboe Edu
</div>

<h1 className="mt-8 text-5xl md:text-6xl font-black text-white leading-tight">
Siapkan Dirimu<br/>
<span className="text-cyan-300">Meraih Nilai Terbaik</span>
</h1>

<p className="mt-8 text-xl leading-9 text-blue-100">
Belajar lebih terarah, persiapan TKA lebih maksimal dengan menggunakan ribuan soal CBT, pembahasan lengkap, serta simulasi ujian yang dirancang menyerupai kondisi sebenarnya.
</p>

<div className="mt-12 grid grid-cols-3 gap-5">

<div className="bg-white rounded-2xl p-6 shadow-xl">
<BookOpen className="w-10 h-10 text-blue-600"/>
<h3 className="mt-5 font-bold text-slate-900">Ribuan Soal</h3>
<p className="mt-2 text-sm text-slate-500">Latihan berkualitas.</p>
</div>

<div className="bg-white rounded-2xl p-6 shadow-xl">
<MonitorSmartphone className="w-10 h-10 text-emerald-600"/>
<h3 className="mt-5 font-bold text-slate-900">CBT Online</h3>
<p className="mt-2 text-sm text-slate-500">Seperti ujian asli.</p>
</div>

<div className="bg-white rounded-2xl p-6 shadow-xl">
<BarChart3 className="w-10 h-10 text-orange-500"/>
<h3 className="mt-5 font-bold text-slate-900">Statistik</h3>
<p className="mt-2 text-sm text-slate-500">Pantau perkembangan.</p>
</div>

</div>

</div>

<div className="relative">

<div className="rounded-[40px] bg-white shadow-2xl p-10">

<div className="flex justify-between items-center">
<div>
<p className="text-slate-500 text-sm">Tryout CBT</p>
<h2 className="text-4xl font-black text-slate-900 mt-2">92</h2>
<p className="text-emerald-600 font-semibold mt-2">Sangat Baik</p>
</div>

<div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center">
<div className="w-14 h-14 rounded-full bg-white"></div>
</div>

</div>

<div className="mt-10">
<div className="flex justify-between text-sm mb-2">
<span>Progress Belajar</span>
<span>86%</span>
</div>

<div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden">
<div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 w-[86%]"></div>
</div>

</div>

<div className="mt-10 grid grid-cols-2 gap-4">

<div className="rounded-xl bg-slate-50 border p-5">
<div className="text-sm text-slate-500">Soal Dikerjakan</div>
<div className="mt-2 text-3xl font-black">2.148</div>
</div>

<div className="rounded-xl bg-slate-50 border p-5">
<div className="text-sm text-slate-500">Akurasi</div>
<div className="mt-2 text-3xl font-black">91%</div>
</div>

</div>

</div>

</div>

</div>

</section>



<div className="grid lg:grid-cols-3 gap-8 mt-16"></div>
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-3xl p-6 shadow-sm">
          <div className="grid md:grid-cols-3 gap-5 items-center">
            <div>
              <p className="text-orange-600 font-bold text-sm uppercase tracking-wide">Promo Hari Ini</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{VOUCHER_KODE}</h3>
              <p className="text-slate-600 mt-2">Gunakan voucher saat checkout untuk mendapatkan harga spesial.</p>
            </div>
            <div className="md:col-span-2 bg-white rounded-2xl border border-orange-100 p-5 text-center">
              <div className="text-sm text-slate-500">Voucher</div>
              <div className="text-4xl font-black tracking-wider text-orange-600">{VOUCHER_KODE}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">MEMBERSHIP</span>
          <h2 className="mt-4 text-4xl font-black text-slate-900">Pilih Paket Membership</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-4"></div>
          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">Semua paket memiliki akses ke seluruh mata pelajaran. Perbedaannya hanya pada masa aktif membership.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const colors = [
              { border: "border-green-500", text: "text-green-600", button: "bg-green-600 hover:bg-green-700" },
              { border: "border-orange-500", text: "text-orange-600", button: "bg-orange-600 hover:bg-orange-700" },
              { border: "border-blue-600", text: "text-blue-600", button: "bg-blue-600 hover:bg-blue-700" }
            ];

            const color = colors[index % colors.length];
            const populer = index === 1;

            return (
              <div key={pkg.id} className={`relative rounded-3xl border-2 ${color.border} bg-white shadow-xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}>
                {populer && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold">
                    PALING POPULER
                  </div>
                )}

                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
                  <span className={`text-3xl font-black ${color.text}`}>{pkg.durasiHari}</span>
                </div>

                <h3 className={`text-4xl font-black text-center ${color.text}`}>{pkg.nama}</h3>

                <p className="text-center text-slate-500 mt-3">{pkg.deskripsi}</p>

                <ul className="mt-8 space-y-3">
                  {pkg.fitur.map((fitur: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <span className={`w-2.5 h-2.5 rounded-full ${color.button.split(" ")[0]}`}></span>
                      <span>{fitur}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 text-center">
                  <div className={`text-5xl font-black ${color.text}`}>
                    Rp {Number(pkg.harga).toLocaleString("id-ID")}
                  </div>
                  <div className="text-slate-500 mt-2">{pkg.durasiHari} Hari Akses Penuh</div>
                </div>

                <Link href={`/daftar/checkout?paket=${pkg.id}`} className={`mt-8 block w-full rounded-2xl py-4 text-center font-bold text-white ${color.button}`}>
                  Gabung Sekarang
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 mb-4"></div>
            <h3 className="font-bold text-slate-900">Akun Aman</h3>
            <p className="text-slate-600 mt-2">Data akun tersimpan aman dan dapat digunakan selama masa aktif membership.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 mb-4"></div>
            <h3 className="font-bold text-slate-900">Aktivasi Otomatis</h3>
            <p className="text-slate-600 mt-2">Setelah pembayaran berhasil, akun langsung aktif tanpa menunggu verifikasi manual.</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 mb-4"></div>
            <h3 className="font-bold text-slate-900">Belajar Fleksibel</h3>
            <p className="text-slate-600 mt-2">Belajar kapan saja dan di mana saja melalui komputer maupun smartphone.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 py-5 px-8 text-center text-white shadow-xl">
          <h3 className="text-2xl font-black">Ribuan siswa telah mempersiapkan diri bersama CiboeEdu.</h3>
          <p className="mt-2 text-blue-100">Sekarang giliran kamu meraih nilai terbaik.</p>
        </div>
      </section>
    </main>
  );
}