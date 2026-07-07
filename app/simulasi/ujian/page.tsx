'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Import komponen utama dengan mematikan SSR secara total
const UjianContent = dynamic(() => import('./UjianContent'), { 
  ssr: false,
  loading: () => <div className="text-white">Loading...</div>
});

export default function UjianPage() {
  return (
    <Suspense fallback={<div className="text-white">Memuat...</div>}>
      <UjianContent />
    </Suspense>
  );
}