"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ReportData {
  totalUsers?: number;
  activeUsers?: number;
  totalTransactions?: number;
  paidTransactions?: number;
  totalRevenue?: number;
  pendingTransactions?: number;
  activeVouchers?: number;
  [key: string]: any;
}

interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

const menus: MenuItem[] = [
  {
    title: "Users / Member",
    description: "Kelola akun, status membership, dan data member.",
    href: "/dashboard/admin/users",
    icon: "👥",
  },
  {
    title: "Paket",
    description: "Kelola paket belajar, harga, durasi, dan komisi.",
    href: "/dashboard/admin/paket",
    icon: "📦",
  },
  {
    title: "Voucher",
    description: "Kelola voucher diskon dan penggunaan voucher.",
    href: "/dashboard/admin/voucher",
    icon: "🎟️",
  },
  {
    title: "Affiliate",
    description: "Kelola affiliate, referral, dan komisi.",
    href: "/dashboard/admin/affiliate",
    icon: "🤝",
  },
  {
    title: "Materi",
    description: "Kelola materi pembelajaran.",
    href: "/dashboard/admin/materi",
    icon: "📚",
  },
  {
    title: "Soal",
    description: "Kelola bank soal dan latihan.",
    href: "/dashboard/admin/soal",
    icon: "📝",
  },
  {
    title: "Tryout",
    description: "Kelola tryout, ujian, dan hasil pengerjaan.",
    href: "/dashboard/admin/tryout",
    icon: "🎯",
  },
  {
    title: "Feedback",
    description: "Lihat dan kelola feedback dari pengguna.",
    href: "/dashboard/admin/feedback",
    icon: "💬",
  },
  {
    title: "Laporan",
    description: "Lihat laporan transaksi dan aktivitas sistem.",
    href: "/dashboard/admin/laporan",
    icon: "📊",
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
  icon,
}: {
  title: string;
  value: string | number;
  description?: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-gray-500">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

      /*
       * API report bisa memiliki struktur berbeda.
       * Kita ambil data langsung dari object response
       * maupun dari data.data jika API membungkus response.
       */
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

  const totalUsers =
    Number(
      report?.totalUsers ??
        report?.users ??
        0
    );

  const activeUsers =
    Number(
      report?.activeUsers ??
        report?.activeMembers ??
        0
    );

  const totalTransactions =
    Number(
      report?.totalTransactions ??
        report?.transactions ??
        0
    );

  const paidTransactions =
    Number(
      report?.paidTransactions ??
        report?.paid ??
        0
    );

  const pendingTransactions =
    Number(
      report?.pendingTransactions ??
        report?.pending ??
        0
    );

  const totalRevenue =
    Number(
      report?.totalRevenue ??
        report?.revenue ??
        0
    );

  const activeVouchers =
    Number(
      report?.activeVouchers ??
        report?.vouchers ??
        0
    );

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              ADMINISTRATOR
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              Dashboard Admin
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Pusat pengelolaan sistem Bimbel Ciboe.
            </p>
          </div>

          <button
            type="button"
            onClick={loadReport}
            disabled={loading}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Memuat..."
              : "↻ Refresh"}
          </button>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <strong>Gagal memuat statistik:</strong>{" "}
            {error}
          </div>
        )}

        {/* =====================================================
            STATISTIK
        ===================================================== */}

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Ringkasan
            </h2>

            <p className="text-sm text-gray-500">
              Kondisi sistem dan transaksi saat ini.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

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
              icon="👥"
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
              icon="✅"
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
              icon="💳"
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
              icon="💰"
            />

          </div>
        </section>

        {/* =====================================================
            TRANSAKSI
        ===================================================== */}

        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Status Transaksi
            </h2>

            <p className="text-sm text-gray-500">
              Ringkasan pembayaran dan transaksi.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm font-medium text-green-700">
                Pembayaran Berhasil
              </p>

              <p className="mt-2 text-2xl font-bold text-green-900">
                {loading
                  ? "..."
                  : paidTransactions.toLocaleString(
                      "id-ID"
                    )}
              </p>

              <Link
                href="/dashboard/admin/laporan"
                className="mt-3 inline-block text-sm font-medium text-green-700 hover:underline"
              >
                Lihat laporan →
              </Link>
            </div>

            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <p className="text-sm font-medium text-yellow-700">
                Menunggu Pembayaran
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-900">
                {loading
                  ? "..."
                  : pendingTransactions.toLocaleString(
                      "id-ID"
                    )}
              </p>

              <Link
                href="/dashboard/admin/laporan"
                className="mt-3 inline-block text-sm font-medium text-yellow-700 hover:underline"
              >
                Lihat transaksi →
              </Link>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Voucher Aktif
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-900">
                {loading
                  ? "..."
                  : activeVouchers.toLocaleString(
                      "id-ID"
                    )}
              </p>

              <Link
                href="/dashboard/admin/voucher"
                className="mt-3 inline-block text-sm font-medium text-blue-700 hover:underline"
              >
                Kelola voucher →
              </Link>
            </div>

          </div>
        </section>

        {/* =====================================================
            MENU ADMIN
        ===================================================== */}

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Manajemen Sistem
            </h2>

            <p className="text-sm text-gray-500">
              Pilih modul yang ingin dikelola.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl transition group-hover:bg-blue-50">
                    {menu.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {menu.title}
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      {menu.description}
                    </p>

                    <p className="mt-3 text-sm font-medium text-blue-600">
                      Buka modul →
                    </p>
                  </div>

                </div>
              </Link>
            ))}

          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="mt-10 border-t border-gray-200 pt-5 text-xs text-gray-400">
          Bimbel Ciboe — Administrator Dashboard
        </div>

      </div>
    </main>
  );
}