'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
            );

            const idToken = await credential.user.getIdToken();

            const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idToken,
            }),
            });

            const result = await response.json();

            if (!response.ok) {
            throw new Error(result.message);
            }

            router.push("/dashboard");
            router.refresh();
                
    } catch (err: any) {
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email atau password salah.');
          break;

        case 'auth/invalid-email':
          setError('Format email tidak valid.');
          break;

        case 'auth/user-disabled':
          setError('Akun Anda telah dinonaktifkan.');
          break;

        case 'auth/too-many-requests':
          setError('Terlalu banyak percobaan login. Silakan coba lagi beberapa saat.');
          break;

        default:
          setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white">
          Login Member
        </h1>

        <p className="mt-2 text-sm text-blue-100">
          Masuk untuk melanjutkan belajar.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm text-blue-100">
            Email
          </label>

          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-blue-100">
            Password
          </label>

          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-yellow-400"
          />
        </div>

        <div className="flex justify-end">
          <Link
            href="/lupa-password"
            className="text-sm text-yellow-300 hover:text-yellow-200"
          >
            Lupa Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 py-4 font-bold text-[#001e38] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>

      </form>

      <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-blue-100">
        Belum punya akun?{' '}
        <Link
          href="/daftar"
          className="font-semibold text-yellow-300 hover:text-yellow-200"
        >
          Daftar Sekarang
        </Link>
      </div>

    </div>
  );
}