"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
  return Number(
    pkg.durationDays ??
      pkg.durasiHari ??
      0
  );
}

function getVoucherCode(voucher: VoucherData | null) {
  if (!voucher) {
    return "";
  }

  return (
    voucher.code ??
    voucher.kode ??
    ""
  )
    .trim()
    .toUpperCase();
}

function getDiscountType(voucher: VoucherData | null) {
  if (!voucher) {
    return "";
  }

  return (
    voucher.discountType ??
    voucher.diskonType ??
    voucher.diskonTipe ??
    ""
  )
    .trim()
    .toLowerCase();
}

function getDiscountValue(voucher: VoucherData | null) {
  if (!voucher) {
    return 0;
  }

  return Number(
    voucher.discountValue ??
      voucher.diskonValue ??
      voucher.diskonNilai ??
      0
  );
}

function getMinimumPurchase(voucher: VoucherData | null) {
  if (!voucher) {
    return 0;
  }

  return Number(
    voucher.minimumPurchase ??
      voucher.minimalPembelian ??
      0
  );
}

function calculateDiscount(
  price: number,
  voucher: VoucherData | null
) {
  if (!voucher || price <= 0) {
    return 0;
  }

  const discountType =
    getDiscountType(voucher);

  const discountValue =
    getDiscountValue(voucher);

  const minimumPurchase =
    getMinimumPurchase(voucher);

  if (
    minimumPurchase > 0 &&
    price < minimumPurchase
  ) {
    return 0;
  }

  if (discountValue <= 0) {
    return 0;
  }

  let discount = 0;

  if (
    discountType === "percent" ||
    discountType === "percentage" ||
    discountType === "persen"
  ) {
    discount =
      Math.round(
        (price * discountValue) / 100
      );
  } else if (
    discountType === "fixed" ||
    discountType === "nominal" ||
    discountType === "rupiah"
  ) {
    discount = discountValue;
  }

  return Math.min(
    Math.max(discount, 0),
    price
  );
}

export default function Home() {
  const [packageData, setPackageData] =
    useState<PackageData | null>(null);

  const [voucher, setVoucher] =
    useState<VoucherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadHomepageData() {
      try {
        setLoading(true);
        setError("");

        const [
          packageResponse,
          voucherResponse,
        ] = await Promise.all([
          fetch("/api/packages", {
            cache: "no-store",
          }),

          fetch("/api/active-voucher", {
            cache: "no-store",
          }),
        ]);

        const packageResult =
          (await packageResponse.json()) as PackagesResponse;

        const voucherResult =
          (await voucherResponse.json()) as VoucherResponse;

        if (!packageResponse.ok) {
          throw new Error(
            packageResult.message ??
              "Gagal mengambil data paket."
          );
        }

        if (!voucherResponse.ok) {
          throw new Error(
            voucherResult.message ??
              "Gagal mengambil voucher."
          );
        }

        const packages =
          Array.isArray(
            packageResult.data
          )
            ? packageResult.data
            : [];

        /*
         * Paket 1 bulan:
         * 28–31 hari dianggap sebagai paket bulanan.
         */
        const monthlyPackage =
          packages.find((pkg) => {
            const duration =
              getDuration(pkg);

            return (
              duration >= 28 &&
              duration <= 31
            );
          }) ?? null;

        if (!mounted) {
          return;
        }

        setPackageData(
          monthlyPackage
        );

        setVoucher(
          voucherResult.success &&
            voucherResult.data
            ? voucherResult.data
            : null
        );
      } catch (err) {
        if (!mounted) {
          return;
        }

        console.error(
          "Homepage data:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat data."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadHomepageData();

    return () => {
      mounted = false;
    };
  }, []);

  const price = useMemo(() => {
    if (!packageData) {
      return 0;
    }

    return getPackagePrice(
      packageData
    );
  }, [packageData]);

  const discount = useMemo(() => {
    return calculateDiscount(
      price,
      voucher
    );
  }, [price, voucher]);

  const finalPrice = Math.max(
    0,
    price - discount
  );

  const voucherCode =
    getVoucherCode(voucher);

  const discountType =
    getDiscountType(voucher);

  const discountValue =
    getDiscountValue(voucher);

  const copyVoucher = async () => {
    if (!voucherCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        voucherCode
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard gagal tidak perlu
      // mengganggu halaman.
    }
  };

  const getDiscountLabel = () => {
    if (discount <= 0) {
      return "";
    }

    if (
      discountType === "percent" ||
      discountType === "percentage" ||
      discountType === "persen"
    ) {
      return `Diskon ${discountValue}% • Hemat ${formatRupiah(
        discount
      )}`;
    }

    return `Hemat ${formatRupiah(
      discount
    )}`;
  };

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#d2f3fa]
        text-slate-950
      "
    >

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-[-120px] top-[100px] h-[360px] w-[360px] rounded-full bg-white/70 blur-3xl" />

        <div className="absolute right-[-120px] top-[160px] h-[420px] w-[420px] rounded-full bg-blue-300/30 blur-3xl" />

        <div className="absolute bottom-[-180px] left-[35%] h-[420px] w-[420px] rounded-full bg-cyan-300/30 blur-3xl" />

      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">

        <Link
          href="/"
          className="
            text-2xl
            font-black
            tracking-tight
            text-slate-950
          "
        >
          Ciboe
          <span className="text-blue-600">
            Edu
          </span>
          <span className="ml-1 text-amber-500">
            ⚡
          </span>
        </Link>

        <Link
          href="/login"
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            bg-white/80
            px-4
            py-2
            text-sm
            font-bold
            text-slate-700
            shadow-sm
            backdrop-blur
            transition
            hover:bg-white
          "
        >
          <LogIn size={16} />
          Login
        </Link>

      </nav>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-7xl
          px-5
          pb-10
          pt-4
          sm:px-8
          lg:px-10
          lg:pb-16
          lg:pt-8
        "
      >

        <div
          className="
            grid
            items-start
            gap-8
            lg:grid-cols-[1.02fr_.98fr]
            lg:gap-12
          "
        >

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="flex min-w-0 flex-col justify-start pt-2 lg:pt-6">

            {/* BADGE */}

            <div
              className="
                mb-5
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-amber-300
                bg-white/80
                px-4
                py-2
                text-[11px]
                font-black
                uppercase
                tracking-wide
                text-amber-700
                shadow-sm
                backdrop-blur
              "
            >
              <Trophy size={14} />
              Bimbel TKA Online Termurah
            </div>

            {/* HEADLINE */}

            <h1
              className="
                max-w-2xl
                text-5xl
                font-black
                leading-[0.96]
                tracking-[-0.04em]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Latihan bukan
              <br />

              <span className="text-blue-600">
                sekadar benar.
              </span>

              <br />

              <span className="text-amber-500">
                Harus cepat.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-6
                text-slate-700
                sm:text-base
              "
            >
              <strong className="text-slate-950">
                Benar saja tidak cukup,
                kamu harus cepat.
              </strong>{" "}
              Ciboe Edu membantu siswa
              membangun kebiasaan menjawab
              soal secara cepat, tepat,
              dan terukur.
            </p>

            {/* LEVEL */}

            <div className="mt-5 flex flex-wrap gap-2">

              {[
                "SD/MI",
                "SMP/MTs",
                "SMA/MA/SMK",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-full
                    border
                    border-blue-200
                    bg-white/80
                    px-4
                    py-2
                    text-[10px]
                    font-black
                    text-blue-700
                    shadow-sm
                  "
                >
                  {item}
                </span>
              ))}

            </div>

            {/* QUOTE */}

            <div
              className="
                mt-6
                max-w-xl
                rounded-2xl
                border
                border-slate-200
                border-l-4
                border-l-amber-400
                bg-white/70
                p-4
                shadow-sm
                backdrop-blur
              "
            >
              <p className="text-sm font-black italic text-slate-800">
                “Benar saja tidak cukup,
                kamu harus cepat.”
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Latih akurasi. Latih kecepatan.
                Siapkan diri menghadapi TKA.
              </p>
            </div>

            {/* BUTTONS */}

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                href="/simulasi"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-blue-600
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition
                  hover:-translate-y-0.5
                  hover:bg-blue-700
                "
              >
                <Zap size={17} />
                Mulai Latihan Gratis
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/daftar"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white/80
                  px-6
                  py-4
                  text-sm
                  font-black
                  text-slate-800
                  shadow-sm
                  transition
                  hover:bg-white
                "
              >
                <BookOpen size={17} />
                Lihat Paket
              </Link>

            </div>

            {/* =================================================
                FREE PRACTICE CARD
            ================================================= */}

            <div
              className="
                mt-6
                max-w-xl
                overflow-hidden
                rounded-[1.7rem]
                border
                border-blue-200
                bg-gradient-to-br
                from-blue-600
                via-blue-600
                to-indigo-600
                p-5
                text-white
                shadow-xl
                shadow-blue-600/20
              "
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-white/15
                      px-3
                      py-1
                      text-[10px]
                      font-black
                      uppercase
                    "
                  >
                    <Sparkles size={12} />
                    Gratis
                  </div>

                  <h2 className="mt-3 text-xl font-black">
                    Coba latihan sekarang.
                  </h2>

                  <p className="mt-1 max-w-md text-xs leading-5 text-blue-100">
                    Rasakan cara Ciboe Edu melatih
                    kamu menjawab soal dengan
                    batas waktu.
                  </p>

                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <Clock3
                    size={24}
                    className="text-cyan-300"
                  />
                </div>

              </div>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-black/10
                  p-3
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-400/15
                      text-cyan-300
                    "
                  >
                    <Timer size={18} />
                  </div>

                  <div>
                    <p className="text-[9px] text-blue-100">
                      Mode latihan
                    </p>

                    <p className="text-xs font-black text-cyan-300">
                      Timer aktif
                    </p>
                  </div>

                </div>

                <span
                  className="
                    rounded-lg
                    bg-blue-500
                    px-3
                    py-2
                    text-[10px]
                    font-black
                  "
                >
                  3 soal gratis
                </span>

              </div>

              <Link
                href="/simulasi"
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-4
                  py-3
                  text-xs
                  font-black
                  text-blue-700
                  transition
                  hover:bg-blue-50
                "
              >
                <Pencil size={14} />
                Coba 3 Soal Gratis
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="flex min-w-0 flex-col">

            {/* =================================================
                NEW PROMO CARD
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[2rem]
                border
                border-amber-300
                bg-gradient-to-br
                from-white
                via-white
                to-amber-50
                p-6
                shadow-xl
                shadow-slate-300/30
              "
            >

              <div
                className="
                  absolute
                  right-[-50px]
                  top-[-60px]
                  h-40
                  w-40
                  rounded-full
                  bg-amber-300/30
                  blur-3xl
                "
              />

              <div className="relative">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-amber-100
                        px-3
                        py-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        text-amber-700
                      "
                    >
                      <Gift size={12} />
                      Promo Pembukaan
                    </span>

                    <h2 className="mt-3 text-2xl font-black leading-tight text-slate-950">
                      Paket 1 Bulan
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-amber-100
                      text-amber-600
                    "
                  >
                    <Gift size={23} />
                  </div>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  <strong className="text-slate-900">
                    Yakin mau langsung
                    berkomitmen panjang?
                  </strong>{" "}
                  Coba dulu Ciboe Edu selama
                  satu bulan dan rasakan
                  pengalaman latihan dengan
                  batas waktu.
                </p>

                <div className="mt-5 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">

                  <div className="rounded-xl bg-amber-50 p-3">
                    <Check
                      size={16}
                      className="text-emerald-500"
                    />
                    <p className="mt-1 text-[10px] font-black text-slate-800">
                      30 hari akses
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50 p-3">
                    <Check
                      size={16}
                      className="text-emerald-500"
                    />
                    <p className="mt-1 text-[10px] font-black text-slate-800">
                      Semua fitur
                    </p>
                  </div>

                  <div className="rounded-xl bg-amber-50 p-3">
                    <Check
                      size={16}
                      className="text-emerald-500"
                    />
                    <p className="mt-1 text-[10px] font-black text-slate-800">
                      Tanpa komitmen panjang
                    </p>
                  </div>

                </div>

                <p className="mt-4 text-xs font-bold text-amber-700">
                  Kesempatan mengenal Ciboe Edu
                  sebelum memilih paket berikutnya.
                </p>

              </div>

            </div>

            {/* =================================================
                PACKAGE CARD
            ================================================= */}

            <div
              className="
                relative
                mt-5
                overflow-hidden
                rounded-[2rem]
                border
                border-slate-200
                bg-white
                p-6
                shadow-2xl
                shadow-slate-300/30
                sm:p-7
              "
            >

              <div
                className="
                  absolute
                  right-[-50px]
                  top-[-50px]
                  h-40
                  w-40
                  rounded-full
                  bg-blue-400/10
                  blur-3xl
                "
              />

              <div className="relative">

                {/* PACKAGE HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-amber-100
                        px-3
                        py-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-wide
                        text-amber-700
                      "
                    >
                      Akses Member
                    </span>

                    <h2 className="mt-3 text-xl font-black sm:text-2xl">
                      Akses Ciboe Edu
                      <br />
                      selama 1 bulan
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-amber-50
                      text-amber-500
                    "
                  >
                    <GraduationCap size={24} />
                  </div>

                </div>

                {/* LOADING */}

                {loading && (
                  <div className="mt-7 space-y-3">

                    <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />

                    <div className="h-10 w-56 animate-pulse rounded bg-slate-200" />

                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />

                  </div>
                )}

                {/* PACKAGE */}

                {!loading &&
                  packageData && (
                    <>

                      {/* PRICE */}

                      <div className="mt-7">

                        {discount > 0 && (
                          <div className="flex flex-wrap items-center gap-2">

                            <span
                              className="
                                text-xl
                                font-black
                                text-slate-400
                                line-through
                                decoration-2
                                decoration-red-400
                              "
                            >
                              {formatRupiah(price)}
                            </span>

                            <span
                              className="
                                rounded-full
                                bg-rose-100
                                px-3
                                py-1
                                text-[11px]
                                font-black
                                text-rose-600
                              "
                            >
                              Hemat{" "}
                              {formatRupiah(discount)}
                            </span>

                          </div>
                        )}

                        <div className="mt-1 flex items-end gap-2">

                          <span
                            className="
                              text-4xl
                              font-black
                              tracking-tight
                              text-blue-600
                              sm:text-5xl
                            "
                          >
                            {formatRupiah(finalPrice)}
                          </span>

                          <span className="pb-1 text-xs font-semibold text-slate-500">
                            / bulan
                          </span>

                        </div>

                        {discount > 0 && (
                          <p className="mt-1 text-xs font-black text-emerald-600">
                            {getDiscountLabel()}
                          </p>
                        )}

                      </div>

                      {/* VOUCHER */}

                      {voucherCode && (
                        <div
                          className="
                            mt-5
                            rounded-2xl
                            border
                            border-dashed
                            border-amber-300
                            bg-amber-50
                            p-3
                          "
                        >

                          <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                              <p className="text-[9px] font-black uppercase tracking-wider text-amber-700">
                                Voucher aktif
                              </p>

                              <p className="mt-1 text-base font-black tracking-wide text-amber-900">
                                {voucherCode}
                              </p>

                            </div>

                            <button
                              type="button"
                              onClick={
                                copyVoucher
                              }
                              className="
                                flex
                                shrink-0
                                items-center
                                gap-2
                                rounded-xl
                                bg-amber-400
                                px-3
                                py-2
                                text-xs
                                font-black
                                text-slate-950
                                transition
                                hover:bg-amber-300
                              "
                            >

                              {copied ? (
                                <>
                                  <Check size={14} />
                                  Disalin
                                </>
                              ) : (
                                <>
                                  <Copy size={14} />
                                  Salin
                                </>
                              )}

                            </button>

                          </div>

                          {discount > 0 && (
                            <p className="mt-2 text-[10px] text-amber-800">
                              Voucher memberikan potongan{" "}
                              {formatRupiah(discount)}.
                            </p>
                          )}

                        </div>
                      )}

                      {/* CTA */}

                      <Link
                        href="/daftar"
                        className="
                          mt-5
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          bg-amber-400
                          px-5
                          py-4
                          text-sm
                          font-black
                          text-slate-950
                          shadow-lg
                          shadow-amber-400/20
                          transition
                          hover:-translate-y-0.5
                          hover:bg-amber-300
                        "
                      >
                        Daftar Sekarang
                        <ArrowRight size={18} />
                      </Link>

                      {/* INFO */}

                      <div className="mt-5 grid grid-cols-2 gap-3">

                        <div className="rounded-xl bg-slate-50 p-3">

                          <p className="text-xs text-slate-500">
                            Durasi
                          </p>

                          <p className="mt-1 text-sm font-black">
                            {getDuration(packageData)} hari
                          </p>

                        </div>

                        <div className="rounded-xl bg-slate-50 p-3">

                          <p className="text-xs text-slate-500">
                            Akses
                          </p>

                          <p className="mt-1 text-sm font-black">
                            Semua fitur
                          </p>

                        </div>

                      </div>

                    </>
                  )}

                {/* NO PACKAGE */}

                {!loading &&
                  !packageData && (
                    <div className="mt-7 rounded-2xl bg-red-50 p-4">

                      <p className="text-sm font-bold text-red-700">
                        Paket 1 bulan sedang
                        tidak tersedia.
                      </p>

                      <p className="mt-1 text-xs text-red-600/80">
                        Silakan coba lagi
                        beberapa saat lagi.
                      </p>

                    </div>
                  )}

                {error && (
                  <p className="mt-4 text-xs text-red-500">
                    {error}
                  </p>
                )}

              </div>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8 lg:px-10">

        <div
          className="
            grid
            overflow-hidden
            rounded-[1.8rem]
            border
            border-blue-200
            bg-white/75
            shadow-lg
            backdrop-blur
            sm:grid-cols-3
          "
        >

          <div className="flex items-center gap-4 p-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Timer size={23} />
            </div>

            <div>
              <p className="text-sm font-black">
                Timer Aktif
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Biasakan menjawab dengan batas waktu.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 border-t border-slate-200 p-5 sm:border-l sm:border-t-0">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
              <Target size={23} />
            </div>

            <div>
              <p className="text-sm font-black">
                Akurasi Tinggi
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Tingkatkan ketepatan setiap latihan.
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 border-t border-slate-200 p-5 sm:border-l sm:border-t-0">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <Trophy size={23} />
            </div>

            <div>
              <p className="text-sm font-black">
                Evaluasi Lengkap
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Lihat hasil dan pelajari kelemahanmu.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RANKING INDONESIA
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">

        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-blue-200
            bg-gradient-to-r
            from-blue-700
            via-indigo-600
            to-violet-600
            p-6
            text-white
            shadow-xl
            shadow-blue-600/20
            sm:p-8
          "
        >

          <div
            className="
              absolute
              right-[-70px]
              top-[-80px]
              h-56
              w-56
              rounded-full
              bg-cyan-400/20
              blur-3xl
            "
          />

          <div className="relative grid items-center gap-7 lg:grid-cols-[1fr_auto]">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-3
                  py-1
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                "
              >
                <Medal size={13} />
                Tantangan Nasional
              </div>

              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Buktikan kemampuanmu
                <br />
                di seluruh Indonesia.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100">
                Setelah latihan, jangan hanya
                melihat nilai sendiri. Ikuti
                ranking Ciboe Edu dan lihat
                seberapa cepat dan tepat
                kemampuanmu dibandingkan siswa
                dari berbagai daerah di Indonesia.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
                  🏆 Ranking Nasional
                </span>

                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
                  ⚡ Kecepatan
                </span>

                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
                  🎯 Akurasi
                </span>

              </div>

            </div>

            <Link
              href="/ranking"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-amber-400
                px-6
                py-4
                text-sm
                font-black
                text-slate-950
                shadow-lg
                transition
                hover:bg-amber-300
              "
            >
              Lihat Ranking
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          CHEAPEST BANNER
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">

        <div
          className="
            flex
            flex-col
            gap-5
            rounded-[2rem]
            border
            border-blue-200
            bg-white/80
            p-6
            shadow-lg
            backdrop-blur
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-8
          "
        >

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <ShieldCheck size={28} />
            </div>

            <div>

              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Kenapa Ciboe Edu?
              </p>

              <h2 className="mt-1 text-xl font-black sm:text-2xl">
                Bimbel TKA Online Termurah
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Harga terjangkau. Latihan tetap maksimal.
              </p>

            </div>

          </div>

          <Link
            href="/daftar"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-amber-400
              bg-amber-50
              px-5
              py-3
              text-xs
              font-black
              text-amber-700
              transition
              hover:bg-amber-100
            "
          >
            Coba Paket 1 Bulan
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        className="
          border-y
          border-slate-200
          bg-white/50
          py-12
        "
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Cara belajar
            </p>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              Belajar dengan tekanan waktu
              yang terukur.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Karena dalam ujian, mengetahui
              jawaban saja belum tentu cukup.
            </p>

          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/simulasi"
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Pencil
                className="text-blue-500"
                size={28}
              />

              <h3 className="mt-4 font-black">
                Latihan Soal
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Biasakan menjawab dengan
                cepat dan tepat.
              </p>
            </Link>

            <Link
              href="/materi"
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Laptop
                className="text-emerald-500"
                size={28}
              />

              <h3 className="mt-4 font-black">
                Bahan Belajar
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Materi untuk memperkuat
                konsep sebelum latihan.
              </p>
            </Link>

            <Link
              href="/kurikulum"
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <BookOpen
                className="text-amber-500"
                size={28}
              />

              <h3 className="mt-4 font-black">
                Jadwal Belajar
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Belajar lebih terarah dan
                konsisten.
              </p>
            </Link>

            <Link
              href="/daftar"
              className="
                group
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <GraduationCap
                className="text-violet-500"
                size={28}
              />

              <h3 className="mt-4 font-black">
                Persiapan TKA
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Bangun kecepatan sebelum
                menghadapi ujian sebenarnya.
              </p>
            </Link>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8">

        <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
          Saatnya naik level
        </p>

        <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">

          Sudah tahu jawabannya?

          <br />

          <span className="text-blue-600">
            Sekarang buktikan
          </span>{" "}
          seberapa cepat kamu bisa menjawab.

        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500">
          Latihan terus. Tingkatkan akurasi.
          Kejar ranking nasional.
        </p>

        <Link
          href="/simulasi"
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-7
            py-4
            text-sm
            font-black
            text-white
            shadow-xl
            shadow-blue-600/20
            transition
            hover:-translate-y-0.5
            hover:bg-blue-700
          "
        >
          <Zap size={18} />
          Mulai Latihan Gratis Sekarang
          <ArrowRight size={18} />
        </Link>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-slate-200 bg-white/40 py-6">

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-2
            px-5
            text-center
            text-xs
            text-slate-500
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-8
            lg:px-10
          "
        >

          <span>
            © {new Date().getFullYear()} Ciboe Edu
          </span>

          <span>
            Benar saja tidak cukup,
            kamu harus cepat.
          </span>

        </div>

      </footer>

    </main>
  );
}