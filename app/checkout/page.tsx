'use client'; 

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, CreditCard, Landmark, Store } from 'lucide-react';

declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const paket = searchParams.get('paket') || 'Paket Belajar TKA';
  const harga = searchParams.get('harga') || '25000';
  
  const [selectedMethod, setSelectedMethod] = useState('');

  const paymentMethods = [
    { id: 'qris', name: 'QRIS', icon: <CreditCard size={24} /> },
    { id: 'va', name: 'Transfer Bank (VA)', icon: <Landmark size={24} /> },
    { id: 'minimarket', name: 'Alfamart / Indomaret', icon: <Store size={24} /> },
  ];

  const handleBayar = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paket: paket,
          harga: harga,
          orderId: 'ORDER-' + Date.now(),
          paymentMethod: selectedMethod
        }),
      });
      
      const data = await response.json();

      if (!data.token) {
        alert("Error: Token tidak didapatkan dari server.");
        return;
      }
      
      window.snap.pay(data.token, {
        onSuccess: (result: any) => { alert("Pembayaran Berhasil!"); },
        onPending: (result: any) => { alert("Menunggu Pembayaran!"); },
        onError: (result: any) => { alert("Pembayaran Gagal!"); }
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal memproses pembayaran");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-slate-800">Selesaikan Pembayaran</h1>
          <p className="text-slate-500">Langkah terakhir untuk mulai belajar!</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-blue-100 border border-slate-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-2xl">PROMO AKTIF</div>
          <h2 className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-2">Paket Anda</h2>
          <p className="text-xl font-bold text-slate-800 mb-4">{paket}</p>
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-slate-500">Total Tagihan</span>
            <span className="text-3xl font-black text-blue-600">Rp {harga}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="font-bold text-slate-700 mb-4 ml-1">Pilih Metode Bayar</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedMethod === method.id 
                    ? 'border-blue-600 bg-white shadow-lg shadow-blue-100 scale-[1.02]' 
                    : 'border-slate-200 bg-white/50 hover:border-blue-200'
                }`}
              >
                <div className={`p-2 rounded-lg mr-4 ${selectedMethod === method.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {method.icon}
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-slate-700">{method.name}</span>
                  {method.id === 'va' && (
                    <span className="text-[10px] text-slate-400">Pilih bank di langkah selanjutnya</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleBayar} 
          disabled={!selectedMethod}
          className={`w-full py-5 rounded-2xl font-black text-lg text-white shadow-xl transition-all duration-300 ${
            selectedMethod 
              ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-300 hover:-translate-y-1' 
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          Bayar Sekarang
        </button>

        <div className="flex justify-center items-center gap-2 text-slate-400 mt-8">
          <ShieldCheck size={16} />
          <p className="text-xs font-medium">Pembayaran dijamin aman & terenkripsi</p>
        </div>
      </div>
    </main>
  );
}