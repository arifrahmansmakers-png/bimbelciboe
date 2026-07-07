'use client';
import dynamic from 'next/dynamic';

// Ini adalah "pembungkus" agar komponen UjianContent hanya jalan di browser
const UjianContent = dynamic(() => import('./UjianContent'), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center text-white">Memuat...</div>
});

export default function UjianContentWrapper() {
  return <UjianContent />;
}