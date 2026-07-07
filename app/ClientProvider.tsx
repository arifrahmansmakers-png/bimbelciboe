'use client';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setCookie, deleteCookie } from 'cookies-next';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Tambahkan pengecekan ini:
    if (!auth) return; 

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie('__session', token, { maxAge: 60 * 60 * 24, path: '/' });
      } else {
        deleteCookie('__session', { path: '/' });
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}