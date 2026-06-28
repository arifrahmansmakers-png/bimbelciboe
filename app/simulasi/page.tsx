'use client';
import { useState } from 'react';
import Link from 'next/link';
import { menuSimulasi } from '../../data/menu';

export default function SimulasiPage() {
  const [jenjang, setJenjang] = useState<string | null>(null);
  const [kategori, setKategori] = useState<string | null>(null);

  // Helper untuk mendapatkan mapel berdasarkan jenjang dan kategori
  const getMapelList = () => {
    if (!jenjang) return [];
    
    const dataJenjang = menuSimulasi[jenjang as keyof typeof menuSimulasi];
    
    // Jika SMA, kita butuh kategori ("Mapel Wajib" atau "Mapel Pilihan")
    if (jenjang === "SMA/MA/SMK") {
      return kategori ? (dataJenjang as any)[kategori] || [] : [];
    }
    
    // Untuk SD/SMP, langsung akses "Mapel Wajib"
    return (dataJenjang as any)["Mapel Wajib"] || [];
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 p-6">
      <div className="max-w-2xl mx-auto bg-white/95 p-8 rounded-3xl shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-blue-900">Simulasi TKA</h1>
          <p className="text-slate-600 mt-2">Pilih jenjang & kategori untuk mulai berlatih!</p>
        </div>

        {/* 1. Pilih Jenjang */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">1. Pilih Jenjang</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {Object.keys(menuSimulasi).map((j) => (
              <button 
                key={j} 
                onClick={() => {setJenjang(j); setKategori(null);}} 
                className={`p-4 rounded-xl font-bold transition-all ${
                  jenjang === j ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border hover:border-blue-400'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Pilih Kategori (Khusus SMA) */}
        {jenjang === "SMA/MA/SMK" && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">2. Pilih Kategori</h2>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(menuSimulasi["SMA/MA/SMK"]).map((kat) => (
                <button key={kat} onClick={() => setKategori(kat)} 
                  className={`px-4 py-3 rounded-lg text-sm font-semibold border ${
                    kategori === kat ? 'bg-blue-600 text-white' : 'bg-white hover:bg-slate-50'
                  }`}>
                  {kat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Daftar Mapel */}
        {(jenjang !== "SMA/MA/SMK" || (jenjang === "SMA/MA/SMK" && kategori)) && (
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Pilih Mata Pelajaran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getMapelList().map((mapel: string) => (
                <Link key={mapel} href={`/simulasi/ujian?jenjang=${jenjang}&mapel=${encodeURIComponent(mapel)}`}
                  className="p-4 bg-white rounded-xl shadow-sm border hover:border-blue-500 transition-all active:scale-[0.98]">
                  <span className="font-semibold text-slate-700">{mapel}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}