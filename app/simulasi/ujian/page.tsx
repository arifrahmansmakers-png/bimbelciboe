'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { bankSoal, durasiUjian } from '../../../data/soal';
import MathText from '../../../components/MathText';
import SmartText from '../../../components/SmartText';

const BOBOT = { PG: 2, MCMA: 4, BS: 2, Isian: 5, TabelBS: 2 };

export default function UjianPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mapel = searchParams.get('mapel') || "";
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [jawaban, setJawaban] = useState<Record<string, any>>({});
  const [showModal, setShowModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const daftarSoal = bankSoal[mapel] || [];
  const soal = daftarSoal[currentIdx];
  const durasi = durasiUjian[mapel] || 3600;

  const [timeLeft, setTimeLeft] = useState(0); 

  useEffect(() => {
    const saved = localStorage.getItem(`timer_${mapel}`);
    setTimeLeft(saved ? parseInt(saved) : durasi);
  }, [mapel, durasi]);

  useEffect(() => {
    if (showResult || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        localStorage.setItem(`timer_${mapel}`, next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResult, mapel]);

  const hitungSkor = () => {
    let totalSkor = 0;
    let maxSkor = 0;
    daftarSoal.forEach((s) => {
      const bobot = (BOBOT as any)[s.tipe] || 1;
      maxSkor += (s.tipe === 'TabelBS' ? bobot * s.opsi.length : bobot);
      
      const userAns = jawaban[s.id];
      if (s.tipe === 'TabelBS') {
        (userAns || []).forEach((ans: string, i: number) => {
          if (ans === s.kunci[i]) totalSkor += bobot;
        });
      } else if (Array.isArray(s.kunci)) {
        if (s.kunci.sort().join("") === (userAns || "").split("").sort().join("")) totalSkor += bobot;
      } else if (userAns === s.kunci) {
        totalSkor += bobot;
      }
    });
    return maxSkor > 0 ? ((totalSkor / maxSkor) * 100).toFixed(0) : 0;
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'id-ID';
      recognition.onresult = (e: any) => setJawaban(prev => ({ ...prev, [soal.id]: e.results[0][0].transcript }));
      recognition.start();
    }
  };

  if (daftarSoal.length === 0) return <div className="p-10 text-white">Soal tidak ditemukan.</div>;

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-600 to-teal-500 p-4 md:p-6">
      {showResult ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl text-center max-w-sm w-full">
            <div className="text-7xl font-black text-blue-600 mb-4">{finalScore}</div>
            <button onClick={() => router.push('/')} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold">Kembali ke Beranda</button>
          </div>
        </div>
      ) : (
        <>
          <header className="bg-white/90 p-4 shadow-lg rounded-2xl flex justify-between items-center mb-6 max-w-6xl mx-auto">
            <h1 className="font-bold text-blue-900">Simulasi: {mapel}</h1>
            <div className="font-mono font-bold text-blue-900">Timer: {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
          </header>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-xl min-h-[400px]">
              <h2 className="text-sm font-bold text-slate-400 mb-4">SOAL {currentIdx + 1} ({soal.tipe})</h2>
              <div className="text-lg mb-8"><SmartText text={soal.pertanyaan} /></div>
              
              <div className="space-y-3">
                {/* Tipe PG: Satu kolom ke bawah, teks rata kiri */}
                {soal.tipe === 'PG' && (
            <div className="flex flex-col gap-4">
              {soal.opsi?.map((o: string, i: number) => {
                const char = String.fromCharCode(65 + i);
                return (
                  <button 
                    key={i} 
                    onClick={() => setJawaban(p => ({...p, [soal.id]: char}))} 
                    className="w-full p-4 border rounded-xl text-left transition-colors flex items-start h-auto hover:bg-blue-50 focus:bg-blue-100"
                  >
                    <span className="font-bold mr-2 shrink-0">{char}.</span>
                    
                    {/* Pembungkus utama */}
                    <div className="w-full min-w-0" style={{ overflow: 'hidden' }}>
                      <div className="break-words" style={{ 
                        whiteSpace: 'normal', 
                        wordBreak: 'break-word', 
                        maxWidth: '100%' 
                      }}>
                        <SmartText text={o} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

                {/* Tipe MCMA */}
                {soal.tipe === 'MCMA' && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-500 mb-2 italic">
                      * Pilih satu atau lebih jawaban yang benar
                    </p>
                    {soal.opsi?.map((o: string, i: number) => {
                      const char = String.fromCharCode(65 + i);
                      const isSelected = (jawaban[soal.id] || "").includes(char);
                      return (
                        <label 
                          key={i} 
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-blue-50'}`}
                        >
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => {
                              const prev = (jawaban[soal.id] || "").split("");
                              const next = isSelected 
                                ? prev.filter(c => c !== char) 
                                : [...prev, char].sort();
                              setJawaban(p => ({...p, [soal.id]: next.join("")}));
                            }}
                            className="w-5 h-5 mr-3 accent-blue-600"
                          />
                          <span className="font-bold mr-2">{char}.</span>
                          <SmartText text={o} />
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Tipe BS */}
                {soal.tipe === 'BS' && ["BENAR", "SALAH"].map((o) => (
                  <button key={o} onClick={() => setJawaban(p => ({...p, [soal.id]: o}))} className={`w-full p-4 border rounded-xl text-left transition-colors ${jawaban[soal.id] === o ? 'bg-blue-100 border-blue-500' : 'hover:bg-blue-50'}`}>
                    {o}
                  </button>
                ))}

                {/* Tipe Isian */}
                {soal.tipe === 'Isian' && (
                  <div className="relative">
                    <input className="w-full p-4 border rounded-xl" value={jawaban[soal.id] || ''} onChange={(e) => setJawaban(p => ({...p, [soal.id]: e.target.value}))} placeholder="Ketik jawaban..."/>
                    <button onClick={startListening} className="absolute right-4 top-4 font-bold text-blue-600">🎤 Mic</button>
                  </div>
                )}

                {/* Tipe TabelBS */}
                {soal.tipe === 'TabelBS' && (
                  <table className="w-full border-collapse border border-slate-200">
                    <thead><tr className="bg-slate-100"><th className="p-2 border">Alasan</th><th className="p-2 border">Setuju</th><th className="p-2 border">Tidak Setuju</th></tr></thead>
                    <tbody>
                      {soal.opsi.map((teks: string, i: number) => (
                        <tr key={i}>
                          <td className="p-2 border text-sm">{teks}</td>
                          <td className="p-2 border text-center">
                            <input type="radio" checked={(jawaban[soal.id] || [])[i] === "Setuju"} onChange={() => {
                              const next = [...(jawaban[soal.id] || Array(soal.opsi.length).fill(""))];
                              next[i] = "Setuju";
                              setJawaban(p => ({...p, [soal.id]: next}));
                            }} />
                          </td>
                          <td className="p-2 border text-center">
                            <input type="radio" checked={(jawaban[soal.id] || [])[i] === "Tidak Setuju"} onChange={() => {
                              const next = [...(jawaban[soal.id] || Array(soal.opsi.length).fill(""))];
                              next[i] = "Tidak Setuju";
                              setJawaban(p => ({...p, [soal.id]: next}));
                            }} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="bg-white/90 p-6 rounded-3xl shadow-xl flex flex-col h-[500px]">
              <h3 className="font-bold mb-4 text-slate-700">Navigasi Soal</h3>
              <div className="flex-1 overflow-y-auto pr-2 mb-4 grid grid-cols-3 gap-2">
                {daftarSoal.map((s, i) => {
                  const isAnswered = s.tipe === 'TabelBS' ? (jawaban[s.id] && jawaban[s.id].length === s.opsi.length) : !!jawaban[s.id];
                  const bgColor = currentIdx === i ? 'bg-yellow-500 text-white' : (isAnswered ? 'bg-teal-500 text-white' : 'bg-slate-200');
                  return <button key={i} onClick={() => setCurrentIdx(i)} className={`p-3 rounded-lg font-bold ${bgColor}`}>{i + 1}</button>;
                })}
              </div>
              <button onClick={() => setShowModal(true)} className="w-full py-3 bg-red-500 text-white rounded-xl font-bold">Selesai Ujian</button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-3xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Akhiri Ujian?</h2>
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-gray-200 rounded-xl">Batal</button>
              <button onClick={() => { localStorage.removeItem('timer_'+mapel); setFinalScore(Number(hitungSkor())); setShowModal(false); setShowResult(true); }} className="flex-1 py-3 bg-red-500 text-white rounded-xl">Ya, Selesai</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}