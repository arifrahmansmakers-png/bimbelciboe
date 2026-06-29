'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Pindahkan deklarasi global ke luar komponen
declare global {
  interface Window {
    snap: { pay: (token: string, options?: any) => void };
  }
}

// Komponen utama konten checkout
function CheckoutContent() {
  const searchParams = useSearchParams();
  const paket = searchParams.get('paket') || 'Paket Premium';
  const harga = searchParams.get('harga') || '0';
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      paket: paket,
      harga: parseInt(harga.replace(/[^0-9]/g, '')), // Bersihkan format Rupiah
      orderId: `CIBOE-${Date.now()}`,
      paymentMethod: 'qris'
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onClose: () => setLoading(false)
        });
      }
    } catch (error) {
      console.error("Gagal transaksi:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">Checkout</h2>
      <p className="text-blue-200 mb-8">Anda memilih <span className="text-[#f6cb2c] font-bold">{paket}</span></p>

      <form onSubmit={handleCheckout} className="space-y-5">
        <input type="text" placeholder="Nama Lengkap" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" required />
        <input type="email" placeholder="Email Aktif" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" required />
        <input type="tel" placeholder="Nomor WhatsApp" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" required />
        
        <button 
          disabled={loading}
          className="w-full py-4 mt-4 bg-gradient-to-r from-[#f6cb2c] to-yellow-500 text-[#001e38] font-bold rounded-2xl"
        >
          {loading ? 'Menghubungkan...' : 'Bayar Sekarang'}
        </button>
      </form>
    </div>
  );
}

// Komponen pembungkus (wajib agar useSearchParams tidak error)
export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#001e38] p-6 flex items-center justify-center">
      <Suspense fallback={<p className="text-white">Memuat halaman...</p>}>
        <CheckoutContent />
      </Suspense>
    </main>
  );
}