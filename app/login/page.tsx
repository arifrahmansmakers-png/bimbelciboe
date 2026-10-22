"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

function getDashboardPath(role?: string) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";

    case "partner":
      return "/dashboard/partner";

    case "member":
    default:
      return "/dashboard/member";
  }
}

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
      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const idToken =
        await credential.user.getIdToken();

      const response =
        await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Login gagal."
        );
      }

      /*
       * Redirect berdasarkan role.
       *
       * Jika API login mengembalikan:
       *
       * {
       *   success: true,
       *   user: {
       *     role: "member"
       *   }
       * }
       *
       * maka member diarahkan ke:
       *
       * /dashboard/member
       */

      const role =
        result?.user?.role ??
        result?.role ??
        "member";

      const dashboardPath =
        getDashboardPath(role);

      router.replace(
        dashboardPath
      );

      router.refresh();

    } catch (err: any) {
      switch (err?.code) {
        case "auth/invalid-email":
          setError(
            "Format email tidak valid."
          );
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError(
            "Email atau password salah."
          );
          break;

        case "auth/user-disabled":
          setError(
            "Akun Anda telah dinonaktifkan."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Terlalu banyak percobaan login. Silakan coba lagi beberapa saat."
          );
          break;

        default:
          setError(
            err?.message ||
              "Terjadi kesalahan. Silakan coba lagi."
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
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-lg transition group-hover:scale-105">
              <Image src="/logo.png" alt="Ciboe Edu" fill sizes="48px" className="object-cover" priority />
            </div>
          </Link>

          <h1 className="text-3xl font-black text-white">
            Login Member
          </h1>

          <p className="mt-1 text-sm text-blue-100">
            Masuk untuk melanjutkan belajar di Ciboe Edu.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/30 bg-red-500/15 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-blue-100">
              Email
            </label>

            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="nama@email.com"
              className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-blue-100">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-xs font-bold text-yellow-300 hover:text-yellow-200 transition underline cursor-pointer"
              >
                {showPassword ? "Sembunyikan" : "Lihat Password"}
              </button>
            </div>

            <div className="relative flex items-center">
              {showPassword ? (
                <input
                  key="pwd-visible"
                  type="text"
                  name="pwd_visible"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  style={{ WebkitTextSecurity: "none" } as React.CSSProperties}
                  className="w-full rounded-2xl border-2 border-yellow-400 bg-white/10 px-4 py-4 pr-14 text-white outline-none transition placeholder:text-white/40 font-mono text-base font-bold tracking-wider"
                />
              ) : (
                <input
                  key="pwd-hidden"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 pr-14 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400 text-base"
                />
              )}

              <button
                type="button"
                tabIndex={-1}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword((prev) => !prev);
                }}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 z-30 flex h-11 w-11 items-center justify-center rounded-xl transition cursor-pointer ${
                  showPassword
                    ? "bg-yellow-400 text-slate-950 shadow-md shadow-yellow-400/30 scale-105"
                    : "bg-white/10 text-white/80 hover:text-white hover:bg-white/20"
                }`}
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
                title={showPassword ? "Sembunyikan password" : "Lihat password"}
              >
                {showPassword ? (
                  <EyeOff size={22} className="stroke-[2.5]" />
                ) : (
                  <Eye size={22} className="stroke-[2]" />
                )}
              </button>
            </div>

            {showPassword && password && (
              <div className="mt-2.5 flex items-center justify-between rounded-xl bg-yellow-400/15 border border-yellow-400/40 p-3 text-xs text-yellow-200 animate-in fade-in duration-150">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="text-yellow-300 font-bold shrink-0">Password:</span>
                  <span className="font-mono text-sm font-black text-white bg-black/30 px-2 py-0.5 rounded-md truncate select-all">
                    {password}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(false)}
                  className="text-[11px] font-bold text-yellow-300 hover:text-white underline shrink-0 ml-2"
                >
                  Tutup
                </button>
              </div>
            )}
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
            {loading
              ? "Memproses..."
              : "Masuk"}
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