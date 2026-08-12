"use client";

import { useEffect, useState } from "react";
import {
  Handshake,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock3,
  Mail,
  User,
  CalendarDays,
  Loader2,
} from "lucide-react";

interface AffiliateApplication {
  uid: string;
  nama: string;
  email: string;
  affiliateStatus: string;
  affiliateAppliedAt: string | null;
  membershipStatus: string | null;
  membershipExpiredAt: string | null;
}

interface ApiResponse {
  success: boolean;
  applications?: AffiliateApplication[];
  total?: number;
  message?: string;
}

export default function AdminAffiliatePage() {
  const [applications, setApplications] = useState<
    AffiliateApplication[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [processingUid, setProcessingUid] =
    useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // AMBIL DATA PENGAJUAN
  // =====================================================

  async function loadApplications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/admin/affiliate",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data: ApiResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Gagal mengambil pengajuan affiliate."
        );
      }

      setApplications(
        data.applications ?? []
      );
    } catch (err) {
      console.error(
        "LOAD AFFILIATE APPLICATION ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengambil data pengajuan."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // LOAD AWAL
  // =====================================================

  useEffect(() => {
    loadApplications();
  }, []);

  // =====================================================
  // PROSES APPROVE / REJECT
  // =====================================================

  async function processApplication(
    uid: string,
    action: "APPROVE" | "REJECT"
  ) {
    const application =
      applications.find(
        (item) => item.uid === uid
      );

    if (!application) {
      return;
    }

    const confirmMessage =
      action === "APPROVE"
        ? `Setujui ${application.nama} sebagai affiliate?`
        : `Tolak pengajuan affiliate ${application.nama}?`;

    const confirmed =
      window.confirm(confirmMessage);

    if (!confirmed) {
      return;
    }

    try {
      setProcessingUid(uid);
      setError("");
      setSuccess("");

      const response = await fetch(
        "/api/admin/affiliate",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            uid,
            action,
          }),
        }
      );

      const data: ApiResponse =
        await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Gagal memproses pengajuan."
        );
      }

      setSuccess(
        data.message ||
          (action === "APPROVE"
            ? "Affiliate berhasil disetujui."
            : "Pengajuan affiliate ditolak.")
      );

      // Hapus dari daftar PENDING
      setApplications((current) =>
        current.filter(
          (item) => item.uid !== uid
        )
      );
    } catch (err) {
      console.error(
        "PROCESS AFFILIATE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal memproses pengajuan."
      );
    } finally {
      setProcessingUid(null);
    }
  }

  // =====================================================
  // FORMAT TANGGAL
  // =====================================================

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return "-";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "-";
    }

    return new Intl.DateTimeFormat(
      "id-ID",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    ).format(date);
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-blue-100
                  text-blue-700
                "
              >
                <Handshake size={28} />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                  Administrator
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Pengajuan Affiliate
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Kelola pengajuan member yang ingin
                  menjadi affiliate.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={loadApplications}
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-700
                shadow-sm
                transition
                hover:bg-slate-50
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
                : "Refresh"}
            </button>

          </div>
        </section>

        {/* =================================================
            NOTIFICATION
        ================================================= */}

        {success && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-green-200
              bg-green-50
              p-4
              text-green-800
            "
          >
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0"
            />

            <p className="text-sm font-medium">
              {success}
            </p>
          </div>
        )}

        {error && (
          <div
            className="
              mb-6
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              text-red-800
            "
          >
            <XCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="text-sm font-semibold">
                Terjadi kesalahan
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div
            className="
              rounded-2xl
              border
              border-orange-100
              bg-orange-50
              p-5
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-orange-700">
                  Menunggu Konfirmasi
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-900">
                  {loading
                    ? "..."
                    : applications.length}
                </p>

                <p className="mt-1 text-xs text-orange-700">
                  Pengajuan affiliate
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-orange-600
                  shadow-sm
                "
              >
                <Clock3 size={24} />
              </div>

            </div>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-blue-100
              bg-blue-50
              p-5
            "
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-blue-700">
                  Status Proses
                </p>

                <p className="mt-2 text-lg font-bold text-blue-900">
                  Review Admin
                </p>

                <p className="mt-1 text-xs text-blue-700">
                  Periksa sebelum menyetujui
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-blue-600
                  shadow-sm
                "
              >
                <Handshake size={24} />
              </div>

            </div>
          </div>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          <div
            className="
              border-b
              border-slate-200
              px-5
              py-5
              sm:px-6
            "
          >
            <h2 className="text-lg font-bold text-slate-900">
              Daftar Pengajuan
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Pengajuan dengan status PENDING akan
              muncul di sini.
            </p>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (
            <div className="flex min-h-64 items-center justify-center">

              <div className="flex items-center gap-3 text-slate-500">

                <Loader2
                  size={22}
                  className="animate-spin"
                />

                <span className="text-sm">
                  Memuat pengajuan affiliate...
                </span>

              </div>

            </div>
          ) : applications.length === 0 ? (

            /* ===============================================
               EMPTY
            =============================================== */

            <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center">

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-100
                  text-slate-400
                "
              >
                <Handshake size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-800">
                Tidak ada pengajuan
              </h3>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Saat ini belum ada member yang
                mengajukan diri sebagai affiliate.
              </p>

            </div>
          ) : (

            /* ===============================================
               DESKTOP TABLE
            =============================================== */

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="bg-slate-50">

                  <tr className="border-b border-slate-200">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Pengguna
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Membership
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tanggal Pengajuan
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Aksi
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {applications.map(
                    (application) => {

                      const processing =
                        processingUid ===
                        application.uid;

                      return (
                        <tr
                          key={
                            application.uid
                          }
                          className="transition hover:bg-slate-50"
                        >

                          {/* USER */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  flex
                                  h-11
                                  w-11
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-blue-100
                                  font-semibold
                                  text-blue-700
                                "
                              >
                                {(
                                  application.nama ||
                                  "?"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">

                                <div className="flex items-center gap-2">

                                  <User
                                    size={14}
                                    className="text-slate-400"
                                  />

                                  <p className="truncate font-semibold text-slate-800">
                                    {
                                      application.nama
                                    }
                                  </p>

                                </div>

                                <div className="mt-1 flex items-center gap-2">

                                  <Mail
                                    size={14}
                                    className="text-slate-400"
                                  />

                                  <p className="truncate text-sm text-slate-500">
                                    {
                                      application.email
                                    }
                                  </p>

                                </div>

                              </div>

                            </div>

                          </td>

                          {/* MEMBERSHIP */}

                          <td className="px-6 py-5">

                            <span
                              className={`
                                inline-flex
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                ${
                                  application.membershipStatus ===
                                  "ACTIVE"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-slate-100 text-slate-600"
                                }
                              `}
                            >
                              {
                                application.membershipStatus ??
                                "-"
                              }
                            </span>

                          </td>

                          {/* TANGGAL */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-sm text-slate-600">

                              <CalendarDays
                                size={16}
                                className="text-slate-400"
                              />

                              {formatDate(
                                application.affiliateAppliedAt
                              )}

                            </div>

                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-5">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-orange-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-orange-700
                              "
                            >

                              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />

                              MENUNGGU

                            </span>

                          </td>

                          {/* ACTION */}

                          <td className="px-6 py-5">

                            <div className="flex justify-end gap-2">

                              <button
                                type="button"
                                disabled={
                                  processing
                                }
                                onClick={() =>
                                  processApplication(
                                    application.uid,
                                    "REJECT"
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  border
                                  border-red-200
                                  bg-white
                                  px-3
                                  py-2
                                  text-sm
                                  font-medium
                                  text-red-600
                                  transition
                                  hover:bg-red-50
                                  disabled:cursor-not-allowed
                                  disabled:opacity-50
                                "
                              >

                                {processing ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <XCircle
                                    size={16}
                                  />
                                )}

                                Tolak

                              </button>

                              <button
                                type="button"
                                disabled={
                                  processing
                                }
                                onClick={() =>
                                  processApplication(
                                    application.uid,
                                    "APPROVE"
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  gap-2
                                  rounded-xl
                                  bg-blue-700
                                  px-3
                                  py-2
                                  text-sm
                                  font-semibold
                                  text-white
                                  shadow-sm
                                  transition
                                  hover:bg-blue-800
                                  disabled:cursor-not-allowed
                                  disabled:opacity-50
                                "
                              >

                                {processing ? (
                                  <Loader2
                                    size={16}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <CheckCircle2
                                    size={16}
                                  />
                                )}

                                Setujui

                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* =================================================
            INFO
        ================================================= */}

        <section
          className="
            mt-6
            rounded-2xl
            border
            border-blue-100
            bg-blue-50
            p-5
          "
        >

          <div className="flex gap-3">

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white
                text-blue-600
              "
            >
              <Handshake size={18} />
            </div>

            <div>

              <h3 className="font-semibold text-blue-900">
                Informasi
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-blue-800">
                Setelah pengajuan disetujui, user tetap
                memiliki role <strong>member</strong>.
                Sistem hanya mengubah status affiliate
                menjadi <strong>ACTIVE</strong> sehingga
                fitur affiliate dapat digunakan dari
                dashboard member.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}