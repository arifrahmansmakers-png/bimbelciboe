"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
  Zap,
  Headset,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
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
  warna?: string;
  icon?: string;
  fitur?: string[];
  features?: string[];
}

interface VoucherData {
  code?: string;
  kode?: string;
  type?: string;

  discountType?: string;
  diskonType?: string;

  discountValue?: number;
  diskonValue?: number;

  minimumPurchase?: number;
  minimalPembelian?: number;

  validFrom?: string | null;
  validUntil?: string | null;

  startAt?: string | null;
  endAt?: string | null;
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

function getPackageName(pkg: PackageData) {
  return (
    pkg.nama ??
    pkg.name ??
    "Paket Ciboe Edu"
  );
}

function getPackageDescription(pkg: PackageData) {
  return (
    pkg.deskripsi ??
    pkg.description ??
    ""
  );
}

function getFeatures(pkg: PackageData) {
  return Array.isArray(pkg.features)
    ? pkg.features
    : Array.isArray(pkg.fitur)
      ? pkg.fitur
      : [];
}

function getVoucherCode(
  voucher: VoucherData | null
) {
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

function getDiscountType(
  voucher: VoucherData | null
) {
  if (!voucher) {
    return "";
  }

  return (
    voucher.discountType ??
    voucher.diskonType ??
    ""
  )
    .trim()
    .toLowerCase();
}

function getDiscountValue(
  voucher: VoucherData | null
) {
  if (!voucher) {
    return 0;
  }

  return Math.max(
    0,
    Number(
      voucher.discountValue ??
        voucher.diskonValue ??
        0
    )
  );
}

function getMinimumPurchase(
  voucher: VoucherData | null
) {
  if (!voucher) {
    return 0;
  }

  return Math.max(
    0,
    Number(
      voucher.minimumPurchase ??
        voucher.minimalPembelian ??
        0
    )
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

  // Tidak memenuhi minimum pembelian
  if (
    minimumPurchase > 0 &&
    price < minimumPurchase
  ) {
    return 0;
  }

  if (
    discountType === "percent" ||
    discountType === "persen"
  ) {
    return Math.min(
      price,
      Math.round(
        (price * discountValue) / 100
      )
    );
  }

  if (
    discountType === "fixed" ||
    discountType === "nominal" ||
    discountType === "amount"
  ) {
    return Math.min(
      price,
      discountValue
    );
  }

  return 0;
}

function getDiscountLabel(
  voucher: VoucherData | null
) {
  if (!voucher) {
    return "";
  }

  const type =
    getDiscountType(voucher);

  const value =
    getDiscountValue(voucher);

  if (type === "percent") {
    return `Diskon ${value}%`;
  }

  if (type === "fixed") {
    return `Potongan ${formatRupiah(value)}`;
  }

  return "";
}

export default function DaftarPage() {
  const [packages, setPackages] =
    useState<PackageData[]>([]);

  const [voucher, setVoucher] =
    useState<VoucherData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [copied, setCopied] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

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

        const packageJson =
          (await packageResponse.json()) as PackagesResponse;

        const voucherJson =
          (await voucherResponse.json()) as VoucherResponse;

        if (!packageResponse.ok) {
          throw new Error(
            packageJson.message ??
              "Gagal mengambil data paket."
          );
        }

        if (!voucherResponse.ok) {
          throw new Error(
            voucherJson.message ??
              "Gagal mengambil voucher aktif."
          );
        }

        if (!mounted) {
          return;
        }

        setPackages(
          Array.isArray(
            packageJson.data
          )
            ? packageJson.data
            : []
        );

        setVoucher(
          voucherJson.success &&
            voucherJson.data
            ? voucherJson.data
            : null
        );
      } catch (error) {
        console.error(
          "Daftar page:",
          error
        );

        if (!mounted) {
          return;
        }

        setPackages([]);
        setVoucher(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const voucherCode = useMemo(
    () => getVoucherCode(voucher),
    [voucher]
  );

  const discountLabel = useMemo(
    () => getDiscountLabel(voucher),
    [voucher]
  );

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
      // Tidak perlu menampilkan error
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Menyiapkan paket Ciboe Edu...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 text-slate-900">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">

        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-cyan-300/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-5 py-2 text-sm font-bold text-white backdrop-blur">
              <Sparkles size={15} />
              Ciboe Edu Membership
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">

              Siapkan Dirimu

              <br />

              <span className="text-cyan-300">
                Meraih Nilai Terbaik
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              Belajar lebih terarah,
              persiapan TKA lebih maksimal
              dengan ribuan soal CBT,
              pembahasan lengkap,
              serta simulasi ujian yang
              dirancang menyerupai kondisi
              sebenarnya.
            </p>

            {/* FEATURE MINI */}

            <div className="mt-9 grid grid-cols-3 gap-3 sm:gap-5">

              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                <BookOpen
                  className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10"
                />

                <h3 className="mt-3 text-sm font-black text-slate-900 sm:mt-5 sm:text-base">
                  Ribuan Soal
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
                  Latihan berkualitas.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                <MonitorSmartphone
                  className="h-8 w-8 text-emerald-600 sm:h-10 sm:w-10"
                />

                <h3 className="mt-3 text-sm font-black text-slate-900 sm:mt-5 sm:text-base">
                  CBT Online
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
                  Seperti ujian asli.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6">
                <BarChart3
                  className="h-8 w-8 text-orange-500 sm:h-10 sm:w-10"
                />

                <h3 className="mt-3 text-sm font-black text-slate-900 sm:mt-5 sm:text-base">
                  Statistik
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm">
                  Pantau perkembangan.
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">

            <div className="rounded-[2rem] bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-10">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Tryout CBT
                  </p>

                  <h2 className="mt-1 text-4xl font-black text-slate-900 sm:text-5xl">
                    92
                  </h2>

                  <p className="mt-1 font-bold text-emerald-600">
                    Sangat Baik
                  </p>

                </div>

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 sm:h-24 sm:w-24">
                  <div className="h-12 w-12 rounded-full bg-white sm:h-14 sm:w-14" />
                </div>

              </div>

              {/* PROGRESS */}

              <div className="mt-8">

                <div className="mb-2 flex justify-between text-sm">

                  <span className="font-semibold">
                    Progress Belajar
                  </span>

                  <span className="font-bold">
                    86%
                  </span>

                </div>

                <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">

                  <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-500 to-blue-600" />

                </div>

              </div>

              {/* STAT */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl border bg-slate-50 p-4 sm:p-5">

                  <div className="text-xs text-slate-500 sm:text-sm">
                    Soal Dikerjakan
                  </div>

                  <div className="mt-1 text-2xl font-black sm:text-3xl">
                    2.148
                  </div>

                </div>

                <div className="rounded-xl border bg-slate-50 p-4 sm:p-5">

                  <div className="text-xs text-slate-500 sm:text-sm">
                    Akurasi
                  </div>

                  <div className="mt-1 text-2xl font-black sm:text-3xl">
                    91%
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* ACTIVE VOUCHER */}
      {/* ================================================= */}

      {voucherCode && (
        <section className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 lg:px-10">

          <div className="overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 p-5 shadow-sm sm:p-6">

            <div className="grid items-center gap-5 md:grid-cols-3">

              <div>

                <p className="text-xs font-black uppercase tracking-wider text-orange-600">
                  Promo Pembukaan
                </p>

                <h3 className="mt-1 text-2xl font-black text-slate-900">
                  Harga spesial untukmu
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Gunakan voucher aktif saat
                  checkout untuk mendapatkan
                  harga promo.
                </p>

              </div>

              <div className="md:col-span-2">

                <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-orange-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                      Voucher aktif
                    </p>

                    <p className="mt-1 text-2xl font-black tracking-wider text-orange-700">
                      {voucherCode}
                    </p>

                    {discountLabel && (
                      <p className="mt-1 text-xs font-bold text-emerald-600">
                        {discountLabel}
                      </p>
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={copyVoucher}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Disalin
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Salin Voucher
                      </>
                    )}
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* ================================================= */}
      {/* MEMBERSHIP */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black text-blue-700">
            MEMBERSHIP
          </span>

          <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
            Pilih Paket Membership
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-blue-600" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Semua paket memiliki akses ke
            seluruh mata pelajaran. Perbedaannya
            hanya pada masa aktif membership.
          </p>

        </div>

        {/* PACKAGE GRID */}

        <div className="grid gap-8 lg:grid-cols-3">

          {packages.map((pkg, index) => {

            const colors = [
              {
                border:
                  "border-emerald-500",
                text:
                  "text-emerald-600",
                button:
                  "bg-emerald-600 hover:bg-emerald-700",
                light:
                  "bg-emerald-50",
              },
              {
                border:
                  "border-orange-500",
                text:
                  "text-orange-600",
                button:
                  "bg-orange-500 hover:bg-orange-600",
                light:
                  "bg-orange-50",
              },
              {
                border:
                  "border-blue-600",
                text:
                  "text-blue-600",
                button:
                  "bg-blue-600 hover:bg-blue-700",
                light:
                  "bg-blue-50",
              },
            ];

            const color =
              colors[
                index % colors.length
              ];

            const populer =
              index === 1;

            const originalPrice =
              getPackagePrice(pkg);

            const discount =
              calculateDiscount(
                originalPrice,
                voucher
              );

            const finalPrice =
              Math.max(
                0,
                originalPrice - discount
              );

            const features =
              getFeatures(pkg);

            return (
              <div
                key={pkg.id}
                className={`
                  relative
                  rounded-3xl
                  border-2
                  ${color.border}
                  bg-white
                  p-7
                  shadow-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                  sm:p-8
                `}
              >

                {/* POPULAR */}

                {populer && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange-500 px-5 py-2 text-xs font-black text-white shadow-lg">
                    PALING POPULER
                  </div>
                )}

                {/* ICON */}

                <div
                  className={`
                    mx-auto mb-6
                    flex h-20 w-20
                    items-center justify-center
                    rounded-2xl
                    ${color.light}
                  `}
                >
                  <span className="text-4xl">
                    {pkg.icon ?? "🎓"}
                  </span>
                </div>

                {/* NAME */}

                <h3
                  className={`
                    text-center
                    text-3xl
                    font-black
                    ${color.text}
                  `}
                >
                  {getPackageName(pkg)}
                </h3>

                {/* DESCRIPTION */}

                <p className="mt-3 text-center text-sm leading-6 text-slate-500">
                  {getPackageDescription(pkg)}
                </p>

                {/* FEATURES */}

                <ul className="mt-7 space-y-3">

                  {features.map(
                    (
                      fitur: string,
                      i: number
                    ) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-700"
                      >

                        <CheckCircle2
                          size={18}
                          className={`mt-0.5 shrink-0 ${color.text}`}
                        />

                        <span>
                          {fitur}
                        </span>

                      </li>
                    )
                  )}

                </ul>

                {/* PRICE */}

                <div className="mt-8 text-center">

                  {/* NORMAL PRICE */}

                  {discount > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">

                      <span
                        className="
                          text-lg
                          font-black
                          text-slate-400
                          line-through
                          decoration-2
                          decoration-red-400
                          sm:text-xl
                        "
                      >
                        {formatRupiah(
                          originalPrice
                        )}
                      </span>

                      <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-black text-rose-600">
                        Hemat{" "}
                        {formatRupiah(
                          discount
                        )}
                      </span>

                    </div>
                  )}

                  {/* FINAL PRICE */}

                  <div
                    className={`
                      mt-1
                      text-4xl
                      font-black
                      ${color.text}
                      sm:text-5xl
                    `}
                  >
                    {formatRupiah(
                      finalPrice
                    )}
                  </div>

                  {/* DISCOUNT */}

                  {discount > 0 && (
                    <p className="mt-2 text-xs font-black text-emerald-600">
                      {discountLabel}
                    </p>
                  )}

                  {/* DURATION */}

                  <div className="mt-2 text-sm text-slate-500">
                    {getDuration(pkg)} Hari
                    Akses Penuh
                  </div>

                  {/* MINIMUM PURCHASE INFO */}

                  {voucher &&
                    getMinimumPurchase(
                      voucher
                    ) > 0 &&
                    originalPrice <
                      getMinimumPurchase(
                        voucher
                      ) && (
                      <p className="mt-2 text-[10px] font-semibold text-slate-400">
                        Belum memenuhi minimum
                        pembelian voucher
                      </p>
                    )}

                </div>

                {/* CTA */}

                <Link
                  href={`/daftar/checkout?paket=${pkg.id}`}
                  className={`
                    mt-8
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    py-4
                    text-center
                    text-sm
                    font-black
                    text-white
                    shadow-lg
                    transition
                    ${color.button}
                  `}
                >
                  Gabung Sekarang
                  <ArrowRight size={17} />
                </Link>

              </div>
            );
          })}

        </div>

      </section>

      {/* ================================================= */}
      {/* BENEFITS */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10">

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
              <ShieldCheck
                className="text-emerald-600"
                size={24}
              />
            </div>

            <h3 className="font-black text-slate-900">
              Akun Aman
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Data akun tersimpan aman dan
              dapat digunakan selama masa
              aktif membership.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Zap
                className="text-yellow-600"
                size={24}
              />
            </div>

            <h3 className="font-black text-slate-900">
              Aktivasi Otomatis
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Setelah pembayaran berhasil,
              akun langsung aktif tanpa
              menunggu verifikasi manual.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Headset
                className="text-blue-600"
                size={24}
              />
            </div>

            <h3 className="font-black text-slate-900">
              Belajar Fleksibel
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Belajar kapan saja dan di
              mana saja melalui komputer
              maupun smartphone.
            </p>

          </div>

        </div>

        {/* FINAL BANNER */}

        <div className="mt-10 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-7 text-center text-white shadow-xl sm:px-8">

          <h3 className="text-xl font-black sm:text-2xl">
            Ribuan siswa telah
            mempersiapkan diri bersama
            CiboeEdu.
          </h3>

          <p className="mt-2 text-sm text-blue-100 sm:text-base">
            Sekarang giliran kamu meraih
            nilai terbaik.
          </p>

        </div>

      </section>

    </main>
  );
}