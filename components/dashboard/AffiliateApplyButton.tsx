"use client";

import { useState } from "react";
import {
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function AffiliateApplyButton() {
  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleApply = async () => {
    const confirmed =
      window.confirm(
        "Apakah Anda yakin ingin mendaftar sebagai Affiliate?"
      );

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response =
        await fetch(
          "/api/affiliate/apply",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Gagal mengajukan affiliate."
        );
      }

      setMessage(
        result.message ||
          "Pengajuan berhasil dikirim."
      );

      // Refresh server component
      window.location.reload();

    } catch (error: any) {
      setError(
        error?.message ||
          "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleApply}
        disabled={loading}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-yellow-400
          px-5
          py-3
          font-semibold
          text-slate-900
          transition
          hover:bg-yellow-300
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />

            Memproses...
          </>
        ) : (
          <>
            Daftar Menjadi Affiliate

            <ArrowRight size={18} />
          </>
        )}
      </button>

      {message && (
        <p className="mt-3 text-sm text-green-600">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}