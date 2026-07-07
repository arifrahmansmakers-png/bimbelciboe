'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess('');
    setError('');

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess(
        'Link reset password telah dikirim ke email Anda. Silakan cek Inbox atau folder Spam.'
      );
    } catch (err: any) {
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Email belum terdaftar.');
          break;

        case 'auth/invalid-email':
          setError('Format email tidak valid.');
          break;

        case 'auth/too-many-requests':
          setError('Terlalu banyak percobaan. Coba beberapa saat lagi.');
          break;

        default:
          setError('Gagal mengirim email reset password.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#001e38] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Lupa Password
        </h1>

        <p className="text-center text-blue-100 text-sm mb-8">
          Masukkan email yang digunakan saat mendaftar.
        </p>

        {success && (
          <div className="mb-5 rounded-xl bg-green-500/20 border border-green-500/30 p-3 text-sm text-green-300">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl bg-red-500/20 border border-red-500/30 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="email"
              required
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-gray-400 outline-none focus:border-yellow-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#f6cb2c] to-yellow-500 py-4 font-bold text-[#001e38] transition hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? 'Mengirim...' : 'Kirim Link Reset Password'}
            </button>

          </form>
        )}

        <div className="mt-8 text-center">

          <a
            href="/login"
            className="text-sm text-blue-200 hover:text-white underline"
          >
            ← Kembali ke Login
          </a>

        </div>

      </div>
    </main>
  );
}