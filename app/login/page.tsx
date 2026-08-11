"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login gagal.");
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err: any) {
      switch (err?.code) {
        case "auth/invalid-email":
          setError("Format email tidak valid.");
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Email atau password salah.");
          break;

        case "auth/user-disabled":
          setError("Akun Anda telah dinonaktifkan.");
          break;

        case "auth/too-many-requests":
          setError(
            "Terlalu banyak percobaan login. Silakan coba lagi beberapa saat."
          );
          break;

        default:
          setError(
            err?.message || "Terjadi kesalahan. Silakan coba lagi."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#001E38] px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur">

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

        <form onSubmit={handleLogin} className="space-y-5">

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
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-blue-100">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 pr-12 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 transition hover:text-white"
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.584 10.587A2 2 0 0013.414 13.4M9.88 4.24A10.45 10.45 0 0112 4c5 0 8.5 4 9.5 6-.37.75-.98 1.68-1.82 2.59M6.23 6.23C4.53 7.39 3.35 8.8 2.5 10c1 2 4.5 6 9.5 6 1.1 0 2.12-.2 3.03-.55"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                    />
                  </svg>
                )}
              </button>
            </div>
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
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-blue-100">
          Belum punya akun?{" "}
          <Link
            href="/daftar"
            className="font-semibold text-yellow-300 hover:text-yellow-200"
          >
            Daftar Sekarang
          </Link>
        </div>

      </div>
    </main>
  );
}