'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DATA_HARGA } from '../../../data/harga';

declare global {
  interface Window {
    snap: { pay: (token: string, options?: any) => void };
  }
}

function CheckoutContent() {
  const VOUCHER_KODE = "CIBOE-TKA";
  const searchParams = useSearchParams();
  
  const paketId = searchParams.get('paket') || 'paket_3bulan';
  const paketData = DATA_HARGA[paketId as keyof typeof DATA_HARGA];

  const [loading, setLoading] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [jenjang, setJenjang] = useState('');
  const [formData, setFormData] = useState({
    nama: '', email: '', wa: '', tglLahir: '', password: ''
  });

  const [hargaAkhir, setHargaAkhir] = useState(paketData ? paketData.hargaAsli : 0);
  const [isVoucherActive, setIsVoucherActive] = useState(false);

  if (!paketData) return <div className="text-white p-10">Paket tidak ditemukan.</div>;

  const handleVoucherCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setVoucher(val);
    if (val === VOUCHER_KODE) {
      setHargaAkhir(paketData.hargaAsli - paketData.potonganVoucher);
      setIsVoucherActive(true);
    } else {
      setHargaAkhir(paketData.hargaAsli);
      setIsVoucherActive(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = { 
      ...formData,
      wa: formData.wa, // memastikan phone/wa terkirim
      paket: paketData.nama, 
      harga: hargaAkhir, 
      orderId: `CIBOE-${Date.now()}`,
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
          onClose: () => setLoading(false),
          onSuccess: () => setLoading(false) 
        });
      }
    } catch (error) {
      console.error("Gagal:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Checkout</h2>
      
      <div className="mb-6">
        <p className="text-blue-200">Paket: <span className="text-white font-bold">{paketData.nama}</span></p>
        <div className="flex items-center gap-3 mt-1">
          {isVoucherActive ? (
            <>
              <span className="text-gray-400 line-through text-lg">Rp {paketData.hargaAsli.toLocaleString('id-ID')}</span>
              <span className="text-2xl font-black text-[#f6cb2c]">Rp {hargaAkhir.toLocaleString('id-ID')}</span>
            </>
          ) : (
            <span className="text-2xl font-black text-[#f6cb2c]">Rp {paketData.hargaAsli.toLocaleString('id-ID')}</span>
          )}
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        {/* Kode Voucher di posisi paling atas */}
        <input type="text" placeholder="Kode Voucher (Opsional)" className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white uppercase" value={voucher} onChange={handleVoucherCheck} />

        <input type="text" placeholder="Nama Lengkap" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" onChange={(e) => setFormData({...formData, nama: e.target.value})} />
        <input type="email" placeholder="Email Aktif" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Buat Password Login" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <input type="date" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" onChange={(e) => setFormData({...formData, tglLahir: e.target.value})} />
        <input type="tel" placeholder="Nomor WhatsApp" required className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white" onChange={(e) => setFormData({...formData, wa: e.target.value})} />
        
        <select className="w-full p-4 rounded-2xl bg-[#001e38] border border-white/10 text-white" value={jenjang} onChange={(e) => setJenjang(e.target.value)} required>
          <option value="">Pilih Jenjang</option>
          <option value="SD/MI">SD/MI</option>
          <option value="SMP/MTs">SMP/MTs</option>
          <option value="SMA/SMK/MA">SMA/SMK/MA</option>
        </select>
        
        <button disabled={loading || !jenjang} className="w-full py-4 mt-4 bg-gradient-to-r from-[#f6cb2c] to-yellow-500 text-[#001e38] font-bold rounded-2xl disabled:opacity-50">
          {loading ? 'Menghubungkan...' : 'Bayar Sekarang'}
        </button>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#001e38] p-6 flex items-center justify-center">
      <Suspense fallback={<p className="text-white">Memuat...</p>}><CheckoutContent /></Suspense>
    </main>
  );
}