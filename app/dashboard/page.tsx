'use client';
import { auth, db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth! || !db) return;
    // Lakukan aksi data di sini...
    setLoading(false);
  }, []);

  if (!auth! || !db) return <div>Memuat...</div>;
  return <h1>Selamat Datang di Dashboard</h1>;
}