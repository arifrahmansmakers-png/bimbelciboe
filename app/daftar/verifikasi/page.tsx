'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// 1. Komponen ini berisi logika Anda (yang menggunakan useSearchParams)
function VerifikasiContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [status, setStatus] = useState('Memverifikasi pembayaran...');

  useEffect(() => {
    const checkStatus = async () => {
      if (!orderId) return;
      
      try {
        const res = await fetch(`/api/check-status?order_id=${orderId}`);
        const data = await res.json();

        if (data.status === 'PAID') {
          setStatus('Pembayaran Berhasil! Akun Anda sudah aktif. Silakan Login.');
        } else {
          setTimeout(checkStatus, 3000);
        }
      } catch (error) {
        setStatus('Terjadi kesalahan saat memverifikasi.');
      }
    };
    
    checkStatus();
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-2xl font-bold">{status}</h1>
      {status.includes('Berhasil') && (
        <a href="/login" className="mt-4 px-6 py-2 bg-yellow-500 rounded-full text-black font-bold">
          Menuju Login
        </a>
      )}
    </div>
  );
}

// 2. Halaman utama membungkus konten dengan Suspense
export default function VerifikasiPage() {
  return (
    <div className="min-h-screen bg-[#001e38] flex flex-col items-center justify-center">
      <Suspense fallback={<div className="text-white">Memuat verifikasi...</div>}>
        <VerifikasiContent />
      </Suspense>
    </div>
  );
}