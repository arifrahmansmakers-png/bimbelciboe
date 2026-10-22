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
  Award,
  BarChart2,
  FileCheck,
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
  const [activeLevel, setActiveLevel] = useState("sma");

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
      return `Hemat ${discountValue}% (${formatRupiah(discount)})`;
    }
    return `Hemat ${formatRupiah(discount)}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-slate-900 font-sans">
      {/* =====================================================
          NAVBAR (RUANGGURU STYLE: DEEP NAVY & CRISP ACCENTS)
      ===================================================== */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#001E3D]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white shadow-md transition group-hover:scale-105 shrink-0">
              <Image
                src="/logo.png"
                alt="Logo Ciboe Edu"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white block leading-tight">
                Ciboe<span className="text-amber-400">Edu</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-blue-200 tracking-wider">
                Bimbel & Simulasi CBT TKA
              </span>
            </div>
          </Link>

          {/* MENU LINKS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/simulasi"
              className="hidden md:inline-flex rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-100 hover:text-white transition hover:bg-white/10"
            >
              Simulasi Gratis
            </Link>
            <Link
              href="/ranking"
              className="hidden sm:inline-flex rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold text-blue-100 hover:text-white transition hover:bg-white/10"
            >
              Ranking Nasional
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs sm:text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              <LogIn size={15} />
              <span>Login</span>
            </Link>
            <Link
              href="/daftar"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 px-4 py-2 text-xs sm:text-sm font-black text-slate-950 shadow-md shadow-amber-400/20 transition hover:from-amber-300 hover:to-yellow-300 active:scale-95 shrink-0"
            >
              <span>Daftar</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* =====================================================
          HERO BANNER (RUANGGURU ELEGANT OCEANIC GRADIENT)
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#001E3D] via-[#093566] to-[#0D4B8F] text-white pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
        {/* Soft Background Accents */}
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
          <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
          <div className="absolute top-1/2 left-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            {/* LEFT COLUMN: HERO CONTENT */}
            <div className="flex flex-col">
              {/* TOP BADGE */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-3.5 py-1.5 text-xs font-bold text-amber-300 backdrop-blur">
                <Trophy size={14} className="text-amber-400" />
                <span>Bimbel & Ujian CBT Terstandar Nasional</span>
              </div>

              {/* HEADLINE */}
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl sm:leading-[1.15]">
                Latihan bukan sekadar benar.{" "}
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-200">
                  Kamu harus cepat!
                </span>
              </h1>

              {/* SUBTITLE */}
              <p className="mt-4 text-sm leading-relaxed text-blue-100 sm:text-base lg:text-lg max-w-xl">
                Bimbingan belajar online dan simulasi ujian Tes Kemampuan Akademik (TKA) dengan sistem timer real-time. Kuasai materi esensial, latih ketepatan detik per soal, dan pantau posisi ranking nasionalmu.
              </p>

              {/* RUANGGURU STYLE JENJANG TABS */}
              <div className="mt-6 flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Pilih Jenjang Sekolah:
                </span>
                <div className="inline-flex flex-wrap gap-2">
                  {[
                    { id: "sd", label: "SD / MI" },
                    { id: "smp", label: "SMP / MTs" },
                    { id: "sma", label: "SMA / MA / SMK" },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setActiveLevel(lvl.id)}
                      className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                        activeLevel === lvl.id
                          ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-102"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA ACTION BUTTONS (NO OVERLAP, MIN 44PX TOUCH TARGET) */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  href="/simulasi"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400 px-7 py-4 text-sm font-black text-slate-950 shadow-lg shadow-amber-400/25 transition hover:brightness-105 active:scale-[0.98]"
                >
                  <Zap size={18} />
                  <span>Mulai Simulasi Gratis</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/daftar"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 active:scale-[0.98]"
                >
                  <BookOpen size={17} className="text-amber-300" />
                  <span>Lihat Pilihan Paket</span>
                </Link>
              </div>

              {/* TRUST HIGHLIGHTS */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-black text-white">
                    <Timer size={16} className="text-amber-400" />
                    <span>Timer CBT</span>
                  </div>
                  <p className="text-[11px] text-blue-200 mt-0.5">Sesuai ujian asli</p>
                </div>
                <div className="border-x border-white/15 px-2">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-black text-white">
                    <Target size={16} className="text-cyan-300" />
                    <span>Akurasi Soal</span>
                  </div>
                  <p className="text-[11px] text-blue-200 mt-0.5">Evaluasi jawaban</p>
                </div>
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs sm:text-sm font-black text-white">
                    <Medal size={16} className="text-amber-300" />
                    <span>Ranking</span>
                  </div>
                  <p className="text-[11px] text-blue-200 mt-0.5">Seluruh Indonesia</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ELEGANT FLOATING PACKAGE CARD (CLEAN & NON-OVERLAPPING) */}
            <div className="flex flex-col">
              <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl shadow-[#001E3D]/30">
                {/* PROMO HEADER */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                      <Gift size={22} />
                    </div>
                    <div>
                      <span className="block text-[11px] font-black uppercase tracking-wider text-amber-600">
                        Pilihan Terfavorit Siswa
                      </span>
                      <h3 className="text-xl font-black text-slate-900 leading-tight">
                        {packageData ? packageData.nama || packageData.name || "Paket Akses 1 Bulan" : "Paket Belajar CBT"}
                      </h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 shrink-0">
                    Aktif
                  </span>
                </div>

                {/* PRICE SECTION */}
                <div className="mt-5">
                  {loading ? (
                    <div className="space-y-2 py-3">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                      <div className="h-10 w-44 animate-pulse rounded bg-slate-200" />
                    </div>
                  ) : packageData ? (
                    <div>
                      {discount > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-400 line-through">
                            {formatRupiah(price)}
                          </span>
                          <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                            {getDiscountLabel()}
                          </span>
                        </div>
                      )}
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-blue-700">
                          {formatRupiah(finalPrice)}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          / {getDuration(packageData)} hari akses penuh
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2 text-sm text-slate-600">
                      Paket belajar lengkap dengan akses ratusan soal dan simulasi CBT.
                    </div>
                  )}

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    Akses lengkap tryout terstandar, bank soal terstruktur, dan analisis skor.
                  </p>
                </div>

                {/* VOUCHER CODE BOX */}
                {voucherCode && (
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-dashed border-amber-300 bg-amber-50/80 p-3.5">
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
                      className="flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-black text-slate-950 shadow-xs hover:bg-amber-300 transition cursor-pointer"
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
          FLOATING STATS BAR (RUANGGURU STYLE SOCIAL PROOF)
      ===================================================== */}
      <section className="relative z-20 mx-auto max-w-7xl px-4 -mt-8 sm:-mt-12 lg:-mt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 rounded-3xl bg-white p-5 sm:p-7 shadow-xl shadow-slate-300/40 border border-slate-200/80">
          <div className="flex items-center gap-3.5 p-2">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FileCheck size={24} />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-slate-900">500+</div>
              <p className="text-xs text-slate-500 font-medium">Bank Soal TKA Terstandar</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-l border-slate-100">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Timer size={24} />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-slate-900">100%</div>
              <p className="text-xs text-slate-500 font-medium">Sistem CBT Real-Time</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t md:border-t-0 md:border-l border-slate-100">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Trophy size={24} />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-slate-900">34 Prov.</div>
              <p className="text-xs text-slate-500 font-medium">Jangkauan Ranking Nasional</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t md:border-t-0 md:border-l border-slate-100">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <Users size={24} />
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-slate-900">98%</div>
              <p className="text-xs text-slate-500 font-medium">Siswa Terbantu Lolos</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CIBOE EDU (MODERN CARDS WITH BALANCED SPACING)
      ===================================================== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full bg-blue-100/70 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-700">
              Metode Belajar Terdepan
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-900">
              Kenapa Siswa Memilih Ciboe Edu?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Membangun strategi dan mental ujian agar siswa tidak hanya benar, tapi juga tangkas dan cepat.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-blue-400 hover:-translate-y-1">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
                  <Timer size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">Simulasi CBT Asli</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Antarmuka dan timer persis standar ujian resmi agar siswa terbiasa dengan tekanan waktu riil.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-amber-400 hover:-translate-y-1">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
                  <Target size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">Latih Kecepatan</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Latihan intensif dengan batasan detik per soal untuk meningkatkan akurasi dan kecepatan berpikir.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                  <Medal size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">Ranking Nasional</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Bandingkan skor hasil tryoutmu secara transparan dengan ribuan peserta dari seluruh Indonesia.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="mt-4 text-lg font-black text-slate-900">Biaya Sangat Terjangkau</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Kualitas bimbingan belajar terbaik tanpa harus mengeluarkan biaya jutaan rupiah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RANKING LEADERBOARD TEASER (RUANGGURU STYLE BANNER)
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#001E3D] via-[#0A3D78] to-[#0066CC] p-8 sm:p-12 text-white shadow-xl">
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
              className="flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 px-6 py-4 text-sm font-black text-slate-950 shadow-lg shadow-amber-400/25 transition hover:brightness-105 active:scale-95"
            >
              <span>Lihat Papan Ranking</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROGRAM SHORTCUTS (SD, SMP, SMA CURRICULUM)
      ===================================================== */}
      <section className="border-t border-slate-200/80 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600">
              Pilihan Program Belajar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Mulai Langkah Sukses Ujianmu
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/simulasi"
              className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:border-blue-400 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mb-4">
                <Pencil size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-lg group-hover:text-blue-600 transition">
                Simulasi Ujian
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Uji kemampuan dengan simulasi soal CBT gratis berbagai jenjang.
              </p>
            </Link>

            <Link
              href="/materi"
              className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:border-amber-400 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-4">
                <Laptop size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-lg group-hover:text-amber-700 transition">
                Bahan Belajar
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Ringkasan konsep materi esensial TKA dan trik rumus praktis.
              </p>
            </Link>

            <Link
              href="/kurikulum"
              className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:border-purple-400 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 mb-4">
                <BookOpen size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-lg group-hover:text-purple-600 transition">
                Kurikulum & Kisi-Kisi
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Panduan materi terstruktur untuk persiapan ujian sekolah & perguruan tinggi.
              </p>
            </Link>

            <Link
              href="/daftar"
              className="group rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 transition hover:border-emerald-400 hover:bg-white hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4">
                <GraduationCap size={22} />
              </div>
              <h4 className="font-black text-slate-900 text-lg group-hover:text-emerald-600 transition">
                Pilihan Paket
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                Paket belajar lengkap dengan akses penuh dan harga terjangkau.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER (ELEGANT RUANGGURU NAVY FOOTER)
      ===================================================== */}
      <footer className="border-t border-slate-200 bg-[#001428] text-slate-400 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/20 bg-white">
                <Image src="/logo.png" alt="Ciboe Edu" fill sizes="40px" className="object-cover" />
              </div>
              <div>
                <span className="font-black text-white text-lg block">Ciboe Edu</span>
                <span className="text-xs text-blue-200">Platform Simulasi & Bimbingan CBT Terdepan</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
              <Link href="/simulasi" className="hover:text-white transition">Simulasi Ujian</Link>
              <Link href="/ranking" className="hover:text-white transition">Ranking Nasional</Link>
              <Link href="/materi" className="hover:text-white transition">Bahan Belajar</Link>
              <Link href="/kurikulum" className="hover:text-white transition">Kurikulum</Link>
              <Link href="/login" className="hover:text-white transition">Login Member</Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Ciboe Edu. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="font-bold text-amber-400/90">Benar saja tidak cukup, kamu harus cepat.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}