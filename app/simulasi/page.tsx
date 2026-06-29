'use client';
import { useState } from 'react';
import Link from 'next/link';
// Data menu diasumsikan memiliki key: SD/MI, SMP/MTs, SMA_Wajib, SMA_Pilihan
import { menuSimulasi } from '../../data/menu';

export default function SimulasiPage() {
  const [jenjang, setJenjang] = useState<string | null>(null);
  const jenjangList = Object.keys(menuSimulasi);

  const getMapelList = (): string[] => {
    if (!jenjang) return [];
    return (menuSimulasi as any)[jenjang] || [];
  };

  const daftarMapel = getMapelList();

  // Daftar warna pastel untuk tombol jenjang
  const pastelColors = [
    { bg: 'bg-[#ffc8cc]', border: 'border-[#ff9da5]', hover: 'hover:border-[#ff9da5]' }, // Pastel Pink (SD/MI)
    { bg: 'bg-[#d8f9d0]', border: 'border-[#b5f3a6]', hover: 'hover:border-[#b5f3a6]' }, // Pastel Mint (SMP/MTs)
    { bg: 'bg-[#fff5cc]', border: 'border-[#ffe48c]', hover: 'hover:border-[#ffe48c]' }, // Pastel Yellow (SMA Wajib)
    { bg: 'bg-[#cce5ff]', border: 'border-[#a6d1ff]', hover: 'hover:border-[#a6d1ff]' }, // Pastel Blue (SMA Pilihan)
  ];

  return (
    // Latar belakang biru tua pekat yang senada dengan halaman awal
    <main className="min-h-screen bg-[#001e38] text-white p-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header - Senada dengan Judul Utama di Halaman Awal */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-[#f6cb2c] leading-tight mb-2">
            Pilih Simulasi
          </h1>
          <p className="text-xl text-gray-200">
            Pilih jenjang pendidikan Anda untuk mulai latihan ujian.
          </p>
        </div>

        {/* Button Group (Pilih Jenjang) - Gaya Glossy Bubble Ceria */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-12">
          {jenjangList.map((j, index) => {
            const colors = pastelColors[index % pastelColors.length];
            const isSelected = jenjang === j;
            return (
              <button 
                key={j} 
                onClick={() => setJenjang(j)}
                // Gaya: Rounded-full, Padding besar, Bayangan dalam untuk efek glossy, dan Transisi
                className={`px-8 py-3.5 rounded-full font-bold text-lg text-gray-800 transition-all duration-300 transform shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1)] ${
                  isSelected 
                    ? `${colors.bg} scale-105 border-4 ${colors.border} shadow-[0_6px_12px_rgba(255,255,255,0.15),inset_0_4px_8px_rgba(255,255,255,0.3)]` // Gaya Terpilih: Glow
                    : `bg-white/80 ${colors.border} hover:${colors.hover} hover:scale-102` // Gaya Normal: Sedikit transparan
                }`}
              >
                {j.replace('_', ' ')}
              </button>
            );
          })}
        </div>

        {/* Daftar Mata Pelajaran */}
        {jenjang && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl font-semibold text-gray-100 mb-6 pb-2 border-b border-gray-600/50">
              Mata Pelajaran Ujian: <span className="text-gray-300 font-medium capitalize">{jenjang.replace('_', ' ')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {daftarMapel.map((mapel) => (
                <Link 
                  key={mapel} 
                  href={`/simulasi/ujian?jenjang=${jenjang}&mapel=${mapel}`}
                  // Kartu semi-transparan dengan hover effect cerah
                  className="group block p-6 bg-white/5 border border-white/10 rounded-3xl transition-all duration-300 hover:bg-white/10 hover:border-blue-400 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-100 group-hover:text-blue-300">
                      {mapel}
                    </span>
                    <span className="text-xl text-gray-500 group-hover:text-blue-300 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                  <p className="block text-sm text-gray-400 mt-2">
                    Latihan Soal {mapel}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}