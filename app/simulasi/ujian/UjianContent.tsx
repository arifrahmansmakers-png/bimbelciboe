'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bankSoal, durasiUjian } from '@/data/soal';
import SmartText from '@/components/SmartText';

export default function UjianContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const jenjang = searchParams.get('jenjang') || "";
  const mapel = searchParams.get('mapel') || "";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [jawaban, setJawaban] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  // Akses data (Pastikan struktur bankSoal Anda sudah flat/datar)
  const daftarSoal = (bankSoal as any)?.[jenjang]?.[mapel] || [];
  const soal = daftarSoal[currentIdx];

  useEffect(() => {
    // Karena useSearchParams butuh waktu untuk 'ready', kita gunakan useEffect
    if (!jenjang || !mapel) return;
    
    const dataDurasi = (durasiUjian as any)?.[jenjang];
    const defaultDurasi = dataDurasi?.[mapel] || 3600;
    
    // Aman diakses karena berada di dalam useEffect (hanya jalan di client)
    const savedTimer = localStorage.getItem(`timer_${jenjang}_${mapel}`);
    setTimeLeft(savedTimer ? parseInt(savedTimer) : defaultDurasi);
    setIsReady(true);
  }, [jenjang, mapel]);

  // Logic Timer
  useEffect(() => {
    if (!isReady || showResult || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;
        localStorage.setItem(`timer_${jenjang}_${mapel}`, next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, jenjang, mapel, isReady]);

  if (!isReady) return <div className="min-h-screen flex items-center justify-center text-white">Memuat Ujian...</div>;
  if (daftarSoal.length === 0) return <div className="p-10 text-white">Soal tidak ditemukan.</div>;

   return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 p-4 md:p-6">
      {showResult ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-2">Ujian Selesai!</h2>
            <div className="text-7xl font-black text-blue-600 my-6">{finalScore}</div>
            <button onClick={() => router.push('/')} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold">Kembali ke Beranda</button>
          </div>
        </div>
      ) : (
        <>
          <header className="bg-white/90 p-4 shadow-lg rounded-2xl flex justify-between items-center mb-6 max-w-6xl mx-auto">
            <h1 className="font-bold text-blue-900">Mapel: {mapel}</h1>
            <div className="font-mono font-bold text-blue-900">
              Timer: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          </header>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-xl">
              <h2 className="text-sm font-bold text-slate-400 mb-4">SOAL {currentIdx + 1}</h2>
              <div className="text-lg mb-8"><SmartText text={soal.pertanyaan} /></div>

              <div className="flex flex-col gap-3">
                {soal.opsi?.map((o: string, i: number) => (
                  <button key={i} onClick={() => setJawaban(p => ({ ...p, [soal.id]: String.fromCharCode(65 + i) }))}
                    className={`p-4 border rounded-xl text-left ${jawaban[soal.id] === String.fromCharCode(65 + i) ? 'bg-blue-600 text-white' : 'hover:bg-blue-50'}`}>
                    {String.fromCharCode(65 + i)}. <SmartText text={o} />
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button disabled={currentIdx === 0} onClick={() => setCurrentIdx(p => p - 1)} className="px-6 py-2 bg-slate-200 rounded-xl">Sebelumnya</button>
                <button disabled={currentIdx === daftarSoal.length - 1} onClick={() => setCurrentIdx(p => p + 1)} className="px-6 py-2 bg-blue-600 text-white rounded-xl">Selanjutnya</button>
              </div>
            </div>

            <div className="bg-white/90 p-6 rounded-3xl shadow-xl h-[400px] flex flex-col">
              <h3 className="font-bold mb-4">Navigasi</h3>
              <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-2 pr-2">
                {daftarSoal.map((item: any, i: number) => (
                  <button key={i} onClick={() => setCurrentIdx(i)}
                    className={`p-3 rounded-lg ${currentIdx === i ? 'bg-yellow-500' : (jawaban[item.id] ? 'bg-teal-500' : 'bg-slate-200')}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowModal(true)} className="w-full mt-4 py-3 bg-red-500 text-white rounded-xl font-bold">Selesai Ujian</button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl text-center">
            <h2 className="text-xl font-bold mb-4">Akhiri Ujian?</h2>
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-gray-200 rounded-xl">Batal</button>
              <button onClick={() => { 
                const total = daftarSoal.reduce((acc: number, s: any) => jawaban[s.id] === s.kunci ? acc + 1 : acc, 0);
                setFinalScore(Math.round((total / daftarSoal.length) * 100));
                setShowModal(false); setShowResult(true); 
              }} className="px-6 py-2 bg-red-500 text-white rounded-xl">Ya, Selesai</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}