"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  CreditCard,
  Wallet,
  CheckCircle2,
  Clock3,
  Ticket,
  RefreshCw,
  ArrowRight,
  Package,
  Handshake,
  BookOpen,
  FileText,
  Trophy,
  MessageSquare,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

interface ReportData {
  totalUsers?: number;
  activeUsers?: number;
  totalTransactions?: number;
  paidTransactions?: number;
  totalRevenue?: number;
  pendingTransactions?: number;
  activeVouchers?: number;

  transactions?: {
    total?: number;
    paid?: number;
    pending?: number;
    revenue?: number;
  };

  users?: {
    members?: number;
    affiliates?: number;
    partners?: number;
  };

  [key: string]: any;
}

interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  bg: string;
  iconBg: string;
  iconColor: string;
}

const menus: MenuItem[] = [
  {
    title: "Users / Member",
    description:
      "Kelola akun, status membership, dan data member.",
    href: "/dashboard/admin/users",
    icon: Users,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Paket",
    description:
      "Kelola paket belajar, harga, durasi, dan komisi.",
    href: "/dashboard/admin/paket",
    icon: Package,
    bg: "bg-orange-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    title: "Voucher",
    description:
      "Kelola voucher diskon dan penggunaan voucher.",
    href: "/dashboard/admin/voucher",
    icon: Ticket,
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  {
    title: "Affiliate",
    description:
      "Kelola affiliate, referral, dan komisi.",
    href: "/dashboard/admin/affiliate",
    icon: Handshake,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    title: "Materi",
    description:
      "Kelola materi pembelajaran untuk member.",
    href: "/dashboard/admin/materi",
    icon: BookOpen,
    bg: "bg-sky-50",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    title: "Soal",
    description:
      "Kelola bank soal dan latihan pembelajaran.",
    href: "/dashboard/admin/soal",
    icon: FileText,
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    title: "Tryout",
    description:
      "Kelola tryout, ujian, dan hasil pengerjaan.",
    href: "/dashboard/admin/tryout",
    icon: Trophy,
    bg: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700",
  },
  {
    title: "Feedback",
    description:
      "Lihat dan kelola feedback dari pengguna.",
    href: "/dashboard/admin/feedback",
    icon: MessageSquare,
    bg: "bg-indigo-50",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
  },
  {
    title: "Laporan",
    description:
      "Lihat laporan transaksi dan aktivitas sistem.",
    href: "/dashboard/admin/laporan",
    icon: BarChart3,
    bg: "bg-slate-100",
    iconBg: "bg-slate-200",
    iconColor: "text-slate-700",
  },
];

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-slate-50
          transition-transform
          duration-300
          group-hover:scale-125
        "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${iconBg}
            ${iconColor}
          `}
        >
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [report, setReport] =
    useState<ReportData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadReport() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/reports",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Gagal mengambil laporan."
        );
      }

      const result =
        data?.data &&
        typeof data.data === "object"
          ? data.data
          : data;

      setReport(result);
    } catch (err) {
      console.error(
        "ADMIN REPORT ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReport();
  }, []);

  const totalUsers = Number(
    report?.totalUsers ??
      report?.users?.members ??
      report?.users ??
      0
  );

  const activeUsers = Number(
    report?.activeUsers ??
      report?.activeMembers ??
      0
  );

  const totalTransactions = Number(
    report?.totalTransactions ??
      report?.transactions?.total ??
      report?.transactions ??
      0
  );

  const paidTransactions = Number(
    report?.paidTransactions ??
      report?.transactions?.paid ??
      report?.paid ??
      0
  );

  const pendingTransactions = Number(
    report?.pendingTransactions ??
      report?.transactions?.pending ??
      report?.pending ??
      0
  );

  const totalRevenue = Number(
    report?.totalRevenue ??
      report?.transactions?.revenue ??
      report?.revenue ??
      0
  );

  const activeVouchers = Number(
    report?.activeVouchers ??
      report?.vouchers ??
      0
  );

  return (
    <main className="min-h-full bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-[#102a43]
            via-[#163b5c]
            to-[#1e4d73]
            p-6
            text-white
            shadow-xl
            sm:p-8
            lg:p-10
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-24
              h-72
              w-72
              rounded-full
              bg-orange-400/20
              blur-2xl
            "
          />

          <div
            className="
              absolute
              -bottom-28
              right-24
              h-64
              w-64
              rounded-full
              bg-blue-300/10
              blur-2xl
            "
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-blue-100
                  backdrop-blur
                "
              >
                <ShieldCheck size={17} />

                ADMINISTRATOR
              </div>

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                "
              >
                Dashboard Admin
              </h1>

              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  leading-6
                  text-blue-100
                  sm:text-base
                "
              >
                Pusat pengelolaan sistem
                Bimbel Ciboe. Pantau pengguna,
                transaksi, pembelajaran, dan
                aktivitas sistem dari satu tempat.
              </p>

            </div>

            <button
              type="button"
              onClick={loadReport}
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-orange-400
                px-5
                py-3
                text-sm
                font-semibold
                text-slate-950
                shadow-lg
                transition
                hover:bg-orange-300
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              {loading
                ? "Memuat..."
                : "Refresh Data"}
            </button>

          </div>
        </section>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-700
            "
          >
            <strong>
              Gagal memuat statistik:
            </strong>{" "}
            {error}
          </div>
        )}

        {/* =====================================================
            RINGKASAN
        ===================================================== */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Ringkasan Sistem
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Gambaran singkat kondisi sistem
              dan transaksi saat ini.
            </p>
          </div>

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >

            <StatCard
              title="Total Member"
              value={
                loading
                  ? "..."
                  : totalUsers.toLocaleString(
                      "id-ID"
                    )
              }
              description="Seluruh akun pengguna"
              icon={Users}
              iconBg="bg-blue-100"
              iconColor="text-blue-700"
            />

            <StatCard
              title="Member Aktif"
              value={
                loading
                  ? "..."
                  : activeUsers.toLocaleString(
                      "id-ID"
                    )
              }
              description="Membership aktif"
              icon={UserCheck}
              iconBg="bg-emerald-100"
              iconColor="text-emerald-700"
            />

            <StatCard
              title="Transaksi"
              value={
                loading
                  ? "..."
                  : totalTransactions.toLocaleString(
                      "id-ID"
                    )
              }
              description={`${paidTransactions.toLocaleString(
                "id-ID"
              )} pembayaran berhasil`}
              icon={CreditCard}
              iconBg="bg-orange-100"
              iconColor="text-orange-700"
            />

            <StatCard
              title="Pendapatan"
              value={
                loading
                  ? "..."
                  : formatRupiah(
                      totalRevenue
                    )
              }
              description="Total pembayaran berhasil"
              icon={Wallet}
              iconBg="bg-violet-100"
              iconColor="text-violet-700"
            />

          </div>
        </section>

        {/* =====================================================
            STATUS TRANSAKSI
        ===================================================== */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Status Transaksi
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pantau pembayaran dan aktivitas
              transaksi pengguna.
            </p>
          </div>

          <div
            className="
              grid
              gap-5
              md:grid-cols-3
            "
          >

            {/* PAID */}

            <div
              className="
                group
                rounded-3xl
                border
                border-emerald-200
                bg-emerald-50
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Pembayaran Berhasil
                  </p>

                  <p className="mt-3 text-3xl font-bold text-emerald-900">
                    {loading
                      ? "..."
                      : paidTransactions.toLocaleString(
                          "id-ID"
                        )}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                  <CheckCircle2 size={24} />
                </div>

              </div>

              <Link
                href="/dashboard/admin/laporan"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-emerald-700
                  hover:text-emerald-900
                "
              >
                Lihat laporan
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* PENDING */}

            <div
              className="
                group
                rounded-3xl
                border
                border-amber-200
                bg-amber-50
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-amber-700">
                    Menunggu Pembayaran
                  </p>

                  <p className="mt-3 text-3xl font-bold text-amber-900">
                    {loading
                      ? "..."
                      : pendingTransactions.toLocaleString(
                          "id-ID"
                        )}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
                  <Clock3 size={24} />
                </div>

              </div>

              <Link
                href="/dashboard/admin/laporan"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-amber-700
                  hover:text-amber-900
                "
              >
                Lihat transaksi
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* VOUCHER */}

            <div
              className="
                group
                rounded-3xl
                border
                border-blue-200
                bg-blue-50
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Voucher Aktif
                  </p>

                  <p className="mt-3 text-3xl font-bold text-blue-900">
                    {loading
                      ? "..."
                      : activeVouchers.toLocaleString(
                          "id-ID"
                        )}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                  <Ticket size={24} />
                </div>

              </div>

              <Link
                href="/dashboard/admin/voucher"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-blue-700
                  hover:text-blue-900
                "
              >
                Kelola voucher
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* =====================================================
            MENU ADMIN
        ===================================================== */}

        <section>

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Manajemen Sistem
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pilih modul yang ingin Anda kelola.
            </p>
          </div>

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >

            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className={`
                    group
                    rounded-3xl
                    border
                    border-slate-200/80
                    ${menu.bg}
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  `}
                >

                  <div className="flex items-start justify-between">

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${menu.iconBg}
                        ${menu.iconColor}
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      `}
                    >
                      <Icon size={27} />
                    </div>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white/70
                        text-slate-400
                        transition
                        group-hover:bg-white
                        group-hover:text-slate-700
                      "
                    >
                      <ArrowRight
                        size={17}
                      />
                    </div>

                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                      text-slate-800
                    "
                  >
                    {menu.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      min-h-[40px]
                      text-sm
                      leading-5
                      text-slate-500
                    "
                  >
                    {menu.description}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-[#163b5c]
                    "
                  >
                    Buka modul
                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </div>

                </Link>
              );
            })}

          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer
          className="
            flex
            flex-col
            gap-2
            border-t
            border-slate-200
            pt-6
            text-xs
            text-slate-400
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span>
            Bimbel Ciboe — Administrator Dashboard
          </span>

          <span>
            Sistem Manajemen Pembelajaran
          </span>
        </footer>

      </div>
    </main>
  );
}