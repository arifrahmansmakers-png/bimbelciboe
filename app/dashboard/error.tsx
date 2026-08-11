"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function DashboardError({
  error,
  reset,
}: Props) {
  console.error(error);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-3xl border bg-white p-10 text-center shadow-lg">

        <div className="mb-6 text-6xl">
          😥
        </div>

        <h1 className="mb-3 text-3xl font-bold text-slate-800">
          Terjadi Kesalahan
        </h1>

        <p className="mb-8 text-slate-600">
          Dashboard tidak dapat dimuat.
          Silakan coba beberapa saat lagi.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">

          <button
            onClick={reset}
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Coba Lagi
          </button>

          <a
            href="/dashboard"
            className="rounded-xl border px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Dashboard
          </a>

        </div>
      </div>
    </div>
  );
}