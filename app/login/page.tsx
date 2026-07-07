'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const uid = credential.user.uid;

      const userDoc = await getDoc(doc(db, 'users', uid));

      if (!userDoc.exists()) {
        throw new Error('DATA_MEMBER_NOT_FOUND');
      }

      const user = userDoc.data();

      if (user.status !== 'ACTIVE') {
        throw new Error('ACCOUNT_DISABLED');
      }

      router.replace('/dashboard');
      router.refresh();
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Format email tidak valid.');
          break;

        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email atau password salah.');
          break;

        case 'auth/too-many-requests':
          setError('Terlalu banyak percobaan login. Silakan coba beberapa saat lagi.');
          break;

        default:
          if (err.message === 'DATA_MEMBER_NOT_FOUND') {
            setError('Data member tidak ditemukan.');
          } else if (err.message === 'ACCOUNT_DISABLED') {
            setError('Akun Anda tidak aktif.');
          } else {
            setError('Terjadi kesalahan. Silakan coba lagi.');
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#001E38] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-[#001E38]">
          Login Member
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Masuk untuk melanjutkan belajar
        </p>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Password
            </label>

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Password"
            />
          </div>

          <div className="flex justify-end">
            <Link
              href="/lupa-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Lupa Password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-[#F7C52B] py-3 font-bold text-[#001E38] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="mt-8 border-t pt-6 text-center text-sm">

          Belum punya akun?

          <Link
            href="/daftar"
            className="ml-1 font-bold text-blue-600 hover:underline"
          >
            Daftar Sekarang
          </Link>

        </div>

      </div>

    </main>
  );
}