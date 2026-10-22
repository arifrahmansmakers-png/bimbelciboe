"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  Copy,
  GraduationCap,
  Laptop,
  LogIn,
  Pencil,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Gift,
  Medal,
  Zap,
  CheckCircle2,
  Users,
  ChevronRight,
} from "lucide-react";

interface PackageData {
  id: string;
  kode?: string;
  nama?: string;
  name?: string;
  harga?: number;
  price?: number;
  durasiHari?: number;
  durationDays?: number;
  deskripsi?: string;
  description?: string;
  aktif?: boolean;
  isActive?: boolean;
  fitur?: string[];
  features?: string[];
}

interface VoucherData {
  code?: string;
  kode?: string;
  type?: string;
  jenis?: string;
  discountType?: string;
  diskonType?: string;
  diskonTipe?: string;
  discountValue?: number;
  diskonValue?: number;
  diskonNilai?: number;
  minimumPurchase?: number;
  minimalPembelian?: number;
}

interface PackagesResponse {
  success: boolean;
  data?: PackageData[];
  message?: string;
}

interface VoucherResponse {
  success: boolean;
  data?: VoucherData | null;
  message?: string;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getPackagePrice(pkg: PackageData) {
  return Number(pkg.price ?? pkg.harga ?? 0);
}

function getDuration(pkg: PackageData) {
  return Number(pkg.durationDays ?? pkg.durasiHari ?? 0);
}

function getVoucherCode(voucher: VoucherData | null) {
  if (!voucher) return "";
  return (voucher.code ?? voucher.kode ?? "").trim().toUpperCase();
}

function getDiscountType(voucher: VoucherData | null) {
  if (!voucher) return "";
  return (voucher.discountType ?? voucher.diskonType ?? voucher.diskonTipe ?? "").trim().toLowerCase();
}

function getDiscountValue(voucher: VoucherData | null) {
  if (!voucher) return 0;
  return Number(voucher.discountValue ?? voucher.diskonValue ?? voucher.diskonNilai ?? 0);
}

function getMinimumPurchase(voucher: VoucherData | null) {
  if (!voucher) return 0;
  return Number(voucher.minimumPurchase ?? voucher.minimalPembelian ?? 0);
}

function calculateDiscount(price: number, voucher: VoucherData | null) {
  if (!voucher || price <= 0) return 0;

  const discountType = getDiscountType(voucher);
  const discountValue = getDiscountValue(voucher);
  const minimumPurchase = getMinimumPurchase(voucher);

  if (minimumPurchase > 0 && price < minimumPurchase) {
    return 0;
  }

  if (discountValue <= 0) return 0;

  let discount = 0;
  if (
    discountType === "percent" ||
    discountType === "percentage" ||
    discountType === "persen"
  ) {
    discount = Math.round((price * discountValue) / 100);
  } else if (
    discountType === "fixed" ||
    discountType === "nominal" ||
    discountType === "rupiah"
  ) {
    discount = discountValue;
  }

  return Math.min(Math.max(discount, 0), price);
}

export default function Home() {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [voucher, setVoucher] = useState<VoucherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadHomepageData() {
      try {
        setLoading(true);
        setError("");

        const [packageResponse, voucherResponse] = await Promise.all([
          fetch("/api/packages", { cache: "no-store" }),
          fetch("/api/active-voucher", { cache: "no-store" }),
        ]);

        const packageResult = (await packageResponse.json()) as PackagesResponse;
        const voucherResult = (await voucherResponse.json()) as VoucherResponse;

        if (!packageResponse.ok) {
          throw new Error(packageResult.message ?? "Gagal mengambil data paket.");
        }

        if (!voucherResponse.ok) {
          throw new Error(voucherResult.message ?? "Gagal mengambil voucher.");
        }

        const packages = Array.isArray(packageResult.data) ? packageResult.data : [];

        // Paket 1 bulan (28–31 hari)
        const monthlyPackage =
          packages.find((pkg) => {
            const duration = getDuration(pkg);
            return duration >= 28 && duration <= 31;
          }) ?? (packages.length > 0 ? packages[0] : null);

        if (!mounted) return;

        setPackageData(monthlyPackage);
        setVoucher(voucherResult.success && voucherResult.data ? voucherResult.data : null);
      } catch (err) {
        if (!mounted) return;
        console.error("Homepage data:", err);
        setError(err instanceof Error ? err.message : "Gagal memuat data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadHomepageData();

    return () => {
      mounted = false;
    };
  }, []);

  const price = useMemo(() => {
    if (!packageData) return 0;
    return getPackagePrice(packageData);
  }, [packageData]);

  const discount = useMemo(() => {
    return calculateDiscount(price, voucher);
  }, [price, voucher]);

  const finalPrice = Math.max(0, price - discount);
  const voucherCode = getVoucherCode(voucher);
  const discountType = getDiscountType(voucher);
  const discountValue = getDiscountValue(voucher);

  const copyVoucher = async () => {
    if (!voucherCode) return;
    try {
      await navigator.clipboard.writeText(voucherCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const getDiscountLabel = () => {
    if (discount <= 0) return "";
    if (
      discountType === "percent" ||
      discountType === "percentage" ||
      discountType === "persen"
    ) {
      return `Diskon ${discountValue}% • Hemat ${formatRupiah(discount)}`;
    }
    return `Hemat ${formatRupiah(discount)}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 text-slate-800 selection:bg-amber-400 selection:text-slate-900 font-sans">
      {/* =====================================================
          BACKGROUND AMBIENCE (BRIGHT & CONTEMPORARY)
      ===================================================== */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[130px]" />
        <div className="absolute top-48 -right-32 h-[500px] w-[500px] rounded-full bg-amber-100/60 blur-[140px]" />
        <div className="absolute -bottom-32 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-100/50 blur-[130px]" />
      </div>

      {/* =====================================================
          NAVBAR (CLEAN & MODERN WITH NEW LOGO)
      ===================================================== */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Logo Ciboe Edu"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Ciboe<span className="text-blue-600">Edu</span>
              </span>
              <span className="hidden sm:block text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">
                CBT & Bimbel TKA
              </span>
            </div>
          </Link>

          {/* MENU LINKS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/simulasi"
              className="hidden md:inline-flex rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-600 transition hover:text-blue-600 hover:bg-slate-100/60"
            >
              Simulasi Gratis
            </Link>
            <Link
              href="/ranking"
              className="hidden sm:inline-flex rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-600 transition hover:text-blue-600 hover:bg-slate-100/60"
            >
              Ranking Nasional
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
            <Link
              href="/daftar"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-black text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 active:scale-95"
            >
              <span>Daftar</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO SECTION (CERAH, KEKINIAN & MOBILE-FRIENDLY)
      ===================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* LEFT: VALUE PROPOSITION */}
          <div className="flex flex-col">
            {/* FLOATING PILL */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-blue-700 shadow-sm">
              <Sparkles size={14} className="text-amber-500" />
              <span>Simulasi CBT Teruji & Terstruktur</span>
            </div>

            {/* HEADLINE */}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl sm:leading-[1.15]">
              Latihan bukan sekadar benar.{" "}
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 bg-clip-text text-transparent">
                Kamu harus cepat!
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base lg:text-lg max-w-xl">
              Ciboe Edu membantu siswa membangun kebiasaan berpikir taktis dan presisi menghadapi batas waktu tes TKA. Dilengkapi bank soal lengkap, pembahasan trik kilat, dan ranking nasional.
            </p>

            {/* EDUCATION LEVELS */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Pilihan Jenjang:</span>
              {["SD / MI", "SMP / MTs", "SMA / MA / SMK"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700 shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                href="/simulasi"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98]"
              >
                <Zap size={18} className="text-amber-300" />
                <span>Mulai Simulasi Gratis</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/daftar"
                className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <BookOpen size={17} className="text-blue-600" />
                <span>Lihat Pilihan Paket</span>
              </Link>
            </div>

            {/* HIGHLIGHT BADGES */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-slate-200/80 pt-6">
              <div className="flex flex-col">
                <span className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Timer size={16} className="text-blue-600" />
                  Timer CBT
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">Sesuai ujian asli</span>
              </div>
              <div className="flex flex-col border-x border-slate-200/80 px-3">
                <span className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Target size={16} className="text-emerald-600" />
                  Akurasi
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">Evaluasi jawaban</span>
              </div>
              <div className="flex flex-col pl-1">
                <span className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                  <Medal size={16} className="text-amber-500" />
                  Ranking
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">Skor se-Indonesia</span>
              </div>
            </div>
          </div>

          {/* RIGHT: KEKINIAN PROMO CARD */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-blue-500/10">
              {/* TOP ACCENT DECORATION */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-100 to-amber-100/50 blur-2xl" />

              <div className="relative">
                {/* PROMO BADGE */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 font-bold">
                      <Gift size={20} />
                    </span>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-wider text-amber-600">
                        Promo Pilihan Siswa
                      </span>
                      <h3 className="text-lg font-black text-slate-900">
                        {packageData ? packageData.nama || packageData.name || "Paket Akses 1 Bulan" : "Paket Belajar CBT"}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    Aktif
                  </span>
                </div>

                {/* PRICING DISPLAY */}
                <div className="mt-5">
                  {loading ? (
                    <div className="space-y-2 py-3">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                      <div className="h-9 w-44 animate-pulse rounded bg-slate-200" />
                    </div>
                  ) : packageData ? (
                    <div>
                      {discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            {formatRupiah(price)}
                          </span>
                          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-black text-rose-700">
                            {getDiscountLabel()}
                          </span>
                        </div>
                      )}
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-blue-600">
                          {formatRupiah(finalPrice)}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          / {getDuration(packageData)} hari akses
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-sm text-slate-600">
                      Paket belajar lengkap dengan akses ratusan soal dan simulasi CBT.
                    </div>
                  )}

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Akses lengkap tryout, latihan per bab, kunci pembahasan mendalam, dan statistik peringkat.
                  </p>
                </div>

                {/* VOUCHER TICKET BOX */}
                {voucherCode && (
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-3.5">
                    <div className="min-w-0 pr-2">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                        Kupon Diskon Tersedia:
                      </span>
                      <span className="font-mono text-sm font-black tracking-wider text-amber-950">
                        {voucherCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={copyVoucher}
                      className="flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-black text-slate-950 shadow-xs hover:bg-amber-300 transition"
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Salin Kupon</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* FEATURES CHECKLIST */}
                <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={13} />
                    </span>
                    <span>Ratusan bank soal TKA & pembahasan trik cepat</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={13} />
                    </span>
                    <span>Simulasi CBT otomatis dengan sistem penilaian akurat</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={13} />
                    </span>
                    <span>Papan peringkat ranking nasional real-time</span>
                  </div>
                </div>

                {/* CTA BUTTON */}
                <Link
                  href={packageData ? `/daftar/checkout?paket=${packageData.id}` : "/daftar"}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-500 py-4 text-sm font-black text-slate-950 shadow-lg shadow-amber-400/25 transition hover:brightness-105 active:scale-[0.98]"
                >
                  <span>Daftar & Mulai Belajar</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CIBOE EDU SECTION (BRIGHT & STYLISH)
      ===================================================== */}
      <section className="border-t border-slate-200/80 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">
              Metode Belajar Teruji
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-black text-slate-900">
              Kenapa Siswa Memilih Ciboe Edu?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Membangun mental ujian yang tangguh, cepat, dan presisi di bawah tekanan waktu.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Timer size={24} />
              </div>
              <h3 className="mt-4 font-black text-slate-900 text-base">Simulasi CBT Asli</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Tampilan antarmuka dan penghitung waktu dibuat persis seperti sistem ujian sebenarnya.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                <Target size={24} />
              </div>
              <h3 className="mt-4 font-black text-slate-900 text-base">Latih Kecepatan</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Latihan intensif dengan batasan detik per soal untuk memaksimalkan peluang lolos passing grade.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Medal size={24} />
              </div>
              <h3 className="mt-4 font-black text-slate-900 text-base">Ranking Nasional</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Bandingkan hasil tryoutmu dengan ribuan peserta lain dari berbagai provinsi se-Indonesia.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-50/60 p-6 transition hover:border-blue-300 hover:bg-white hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mt-4 font-black text-slate-900 text-base">Biaya Terjangkau</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Kualitas bimbel berstandar tinggi tanpa perlu membayar jutaan rupiah.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RANKING TEASER BANNER (VIBRANT BLUE-TO-AMBER)
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-white shadow-xl shadow-blue-600/20">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                <Trophy size={14} />
                <span>Leaderboard Terkini</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-4xl font-black text-white">
                Buktikan Kemampuanmu di Tingkat Nasional
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100">
                Cek peringkat tertinggi siswa dari berbagai daerah di Indonesia. Ukur posisi kesiapan ujianmu sekarang.
              </p>
            </div>
            <Link
              href="/ranking"
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 active:scale-95"
            >
              <span>Lihat Papan Ranking</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FEATURE SHORTCUTS (CLEAN CARDS)
      ===================================================== */}
      <section className="border-t border-slate-200/80 bg-slate-50/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/simulasi"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-3">
                <Pencil size={20} />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">Simulasi Ujian</h4>
              <p className="mt-1 text-xs text-slate-500">Mulai latihan soal CBT gratis berbagai jenjang.</p>
            </Link>

            <Link
              href="/materi"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-3">
                <Laptop size={20} />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">Bahan Belajar</h4>
              <p className="mt-1 text-xs text-slate-500">Ringkasan konsep materi esensial TKA.</p>
            </Link>

            <Link
              href="/kurikulum"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-3">
                <BookOpen size={20} />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">Kurikulum & Standar</h4>
              <p className="mt-1 text-xs text-slate-500">Panduan kisi-kisi terarah untuk persiapan ujian.</p>
            </Link>

            <Link
              href="/daftar"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-3">
                <GraduationCap size={20} />
              </div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition">Pilihan Paket</h4>
              <p className="mt-1 text-xs text-slate-500">Paket belajar lengkap dengan harga terbaik.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER WITH LOGO
      ===================================================== */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center text-xs text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-slate-200">
              <Image src="/logo.png" alt="Ciboe Edu" fill sizes="32px" className="object-cover" />
            </div>
            <span className="font-bold text-slate-900 text-sm">Ciboe Edu</span>
            <span>—</span>
            <span>Platform Latihan CBT TKA</span>
          </div>
          <p>© {new Date().getFullYear()} Ciboe Edu. Benar saja tidak cukup, kamu harus cepat.</p>
        </div>
      </footer>
    </main>
  );
}