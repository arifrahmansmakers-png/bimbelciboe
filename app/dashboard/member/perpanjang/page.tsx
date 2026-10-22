"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  CreditCard,
  TicketPercent,
  Check,
  AlertCircle,
  HelpCircle,
  Zap,
  Award,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useUser } from "@/context/UserContext";

interface PackageItem {
  id: string;
  kode: string;
  nama: string;
  harga: number;
  durasiHari: number;
  deskripsi: string;
  badge?: string;
  fitur: string[];
}

// Fallback paket default jika API kosong
const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: "paket-1-bulan",
    kode: "1_BULAN",
    nama: "Paket 1 Bulan (30 Hari)",
    harga: 49000,
    durasiHari: 30,
    deskripsi: "Akses fleksibel untuk pemantapan materi dan latihan soal harian.",
    badge: "Mulai Cepat",
    fitur: [
      "Akses 30 Paket TKA Bertingkat (3 Mapel)",
      "Sistem Level Up (Unlock Nilai > 50)",
      "Pembahasan Lengkap Setiap Soal",
      "Simulasi CBT Berwaktu",
    ],
  },
  {
    id: "paket-3-bulan",
    kode: "3_BULAN",
    nama: "Paket 3 Bulan (90 Hari)",
    harga: 129000,
    durasiHari: 90,
    deskripsi: "Paling direkomendasikan untuk persiapan tryout dan ujian semester.",
    badge: "Paling Populer",
    fitur: [
      "Akses 30 Paket TKA Bertingkat Lengkap",
      "Semua Pembahasan & Konsep Kunci Teori",
      "Simulasi CBT Tryout Nasional Berjadwal",
      "Rapor Nilai & Analisis Kelemahan Soal",
      "Grup Diskusi Belajar Siswa",
    ],
  },
  {
    id: "paket-6-bulan",
    kode: "6_BULAN",
    nama: "Paket 6 Bulan (180 Hari)",
    harga: 219000,
    durasiHari: 180,
    deskripsi: "Pendampingan intensif satu semester penuh hingga ujian akhir sekolah.",
    badge: "Hemat 25%",
    fitur: [
      "Akses Tanpa Batas Seluruh Bank Soal TKA",
      "Akses Modul Materi & Ringkasan Rumus",
      "Tryout CBT Nasional Tanpa Batas",
      "Sertifikat Hasil Ujian Digital",
      "Konsultasi Belajar via WhatsApp",
    ],
  },
  {
    id: "paket-1-tahun",
    kode: "1_TAHUN",
    nama: "Paket 1 Tahun (365 Hari)",
    harga: 349000,
    durasiHari: 365,
    deskripsi: "Investasi belajar terbaik untuk jaminan prestasi dan kelulusan maksimal.",
    badge: "Paling Hemat",
    fitur: [
      "Akses VIP Lengkap 1 Tahun Penuh",
      "Seluruh Bank Soal SD, SMP, hingga SMA",
      "30 Paket Bertingkat + Paket Pengayaan Baru",
      "Ranking Nasional & Peringkat Real-time",
      "Prioritas Bimbingan Belajar & CS 24/7",
    ],
  },
];

export default function MemberPerpanjangPage() {
  const user = useUser();
  const router = useRouter();

  const [packages, setPackages] = useState<PackageItem[]>(DEFAULT_PACKAGES);
  const [loadingPackages, setLoadingPackages] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("paket-3-bulan");

  // Voucher state
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedVoucherCode, setAppliedVoucherCode] = useState<string>("");

  // Load packages dari /api/packages
  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoadingPackages(true);
        const res = await fetch("/api/packages");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setPackages(data);
            setSelectedPackageId(data[0].id || data[0].kode);
            return;
          }
        }
      } catch (err) {
        console.error("Gagal memuat paket dari API:", err);
      } finally {
        setLoadingPackages(false);
      }

      // Gunakan default packages jika API belum ada isinya
      setPackages(DEFAULT_PACKAGES);
      setSelectedPackageId(DEFAULT_PACKAGES[1].id); // Default pilih paket 3 bulan
    }

    fetchPackages();
  }, []);

  const selectedPackage =
    packages.find((p) => p.id === selectedPackageId || p.kode === selectedPackageId) ||
    packages[0] ||
    DEFAULT_PACKAGES[0];

  // Hitung sisa hari aktif user
  const calculateRemainingDays = () => {
    if (!user.membershipExpiredAt) return null;
    const now = new Date().getTime();
    const expiry = new Date(user.membershipExpiredAt).getTime();
    const diff = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const remainingDays = calculateRemainingDays();

  // Validasi Voucher
  const handleApplyVoucher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    setVoucherLoading(true);
    setVoucherError(null);

    try {
      const res = await fetch(`/api/check-voucher?code=${encodeURIComponent(voucherCode.trim())}`);
      const data = await res.json();

      if (res.ok && data.valid) {
        const discountVal = Number(data.discountAmount || data.discount || 15000);
        setAppliedDiscount(discountVal);
        setAppliedVoucherCode(voucherCode.trim().toUpperCase());
      } else {
        setVoucherError(data.message || "Kode voucher tidak valid atau sudah kadaluarsa.");
        setAppliedDiscount(0);
        setAppliedVoucherCode("");
      }
    } catch (err: any) {
      setVoucherError("Terjadi kesalahan saat memeriksa voucher.");
    } finally {
      setVoucherLoading(false);
    }
  };

  // Kalkulasi Harga
  const basePrice = selectedPackage?.harga || 0;
  const finalPrice = Math.max(0, basePrice - appliedDiscount);

  // Proses Lanjut Checkout
  const handleProceedCheckout = () => {
    const pkgCode = selectedPackage.kode || selectedPackage.id;
    let url = `/daftar/checkout?package=${encodeURIComponent(pkgCode)}`;
    if (appliedVoucherCode) {
      url += `&voucher=${encodeURIComponent(appliedVoucherCode)}`;
    }
    router.push(url);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* HEADER BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f2747] via-[#173b63] to-[#24527d] p-6 text-white shadow-xl md:p-8">
        <div className="max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles size={14} className="text-amber-300" />
            <span>Perpanjangan Masa Aktif Belajar</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Perpanjang Paket Membership Anda
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 leading-relaxed">
            Pastikan masa aktif belajar Anda terus terhubung untuk menaklukkan 30 Paket Soal TKA Bertingkat, simulasi CBT standar nasional, dan bimbingan belajar komprehensif.
          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/10">
              <Zap size={16} className="text-amber-400" />
              <span>Sisa hari lama akan diakumulasikan otomatis!</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3.5 py-2 rounded-2xl border border-white/10">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Aktivasi Instan &amp; Pembayaran Aman</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATUS MASA AKTIF SAAT INI */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Status Akun Member Anda
            </span>
            <div className="flex items-center gap-2.5 mt-1">
              <h2 className="text-xl font-black text-slate-900">
                {user.packageId ? user.packageId.toUpperCase() : "Paket Belajar Aktif"}
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                <CheckCircle2 size={13} />
                <span>Aktif</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Terdaftar dengan akun email: <strong>{user.email}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Clock size={20} />
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 font-bold uppercase">
                Masa Berlaku
              </span>
              <span className="text-sm font-black text-slate-800">
                {user.membershipExpiredAt
                  ? new Date(user.membershipExpiredAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Aktif Belajar"}
              </span>
              {remainingDays !== null && (
                <span className="block text-[11px] font-bold text-blue-600 mt-0.5">
                  ({remainingDays} hari lagi)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PILIHAN PAKET PERPANJANGAN */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Pilih Paket Durasi Perpanjangan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih paket yang paling sesuai dengan kebutuhan persiapan ujian Anda.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => {
            const isSelected = selectedPackage?.id === pkg.id || selectedPackage?.kode === pkg.kode;

            return (
              <div
                key={pkg.id || pkg.kode}
                onClick={() => setSelectedPackageId(pkg.id || pkg.kode)}
                className={`rounded-3xl border p-5 cursor-pointer transition-all flex flex-col justify-between relative ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-sm">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                      {pkg.durasiHari} Hari
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check size={12} strokeWidth={3} />}
                    </div>
                  </div>

                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    {pkg.nama}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {pkg.deskripsi}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400 line-through mr-1">
                      Rp {(pkg.harga * 1.35).toLocaleString("id-ID")}
                    </span>
                    <div className="text-2xl font-black text-slate-900">
                      Rp {pkg.harga.toLocaleString("id-ID")}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold">
                      Akses Penuh {pkg.durasiHari} Hari
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {pkg.fitur.slice(0, 4).map((fit, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{fit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3">
                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {isSelected ? "Paket Dipilih ✓" : "Pilih Paket Ini"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RINGKASAN PEMBAYARAN & KUPON VOUCHER */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Kupon & Fitur Unggulan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Box Kupon Voucher */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-black text-slate-800">
              <TicketPercent className="text-amber-500" size={18} />
              <span>Punya Kode Voucher / Kupon Diskon?</span>
            </div>

            <form onSubmit={handleApplyVoucher} className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan kode kupon (misal: TKAJUARA, PROMO)"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={voucherLoading || !voucherCode.trim()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
              >
                {voucherLoading ? "Mengecek..." : "Gunakan Kupon"}
              </button>
            </form>

            {appliedDiscount > 0 && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} />
                  Kupon <strong>{appliedVoucherCode}</strong> aktif! Diskon Rp {appliedDiscount.toLocaleString("id-ID")}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedDiscount(0);
                    setAppliedVoucherCode("");
                    setVoucherCode("");
                  }}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  Hapus
                </button>
              </div>
            )}

            {voucherError && (
              <p className="text-xs text-rose-600 flex items-center gap-1 font-medium">
                <AlertCircle size={14} />
                {voucherError}
              </p>
            )}
          </div>

          {/* Keuntungan Perpanjang */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
              <Award className="text-blue-600" size={18} />
              <span>Keuntungan Perpanjang Masa Aktif Membership:</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>30 Paket TKA Bertingkat:</strong> Akses penuh semua paket dari dasar hingga HOTS analitik.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Pembahasan Lengkap:</strong> Analisis langkah demi langkah &amp; konsep kunci per nomor.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Akumulasi Otomatis:</strong> Sisa hari lama tidak akan hilang, langsung ditambahkan.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Multi Perangkat:</strong> Belajar leluasa melalui laptop, tablet, maupun smartphone.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rincian Tagihan & Tombol Bayar */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-base border-b pb-3">
              Rincian Pembayaran
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Paket Dipilih:</span>
                <strong className="text-slate-800">{selectedPackage?.nama}</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Durasi Tambahan:</span>
                <span className="font-bold text-blue-600">+{selectedPackage?.durasiHari} Hari</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Harga Paket:</span>
                <span>Rp {basePrice.toLocaleString("id-ID")}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Kupon:</span>
                  <span>-Rp {appliedDiscount.toLocaleString("id-ID")}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-100">
                <span>Biaya Transaksi:</span>
                <span className="text-emerald-600 font-bold">GRATIS</span>
              </div>

              <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-3 border-t border-slate-200">
                <span>Total Pembayaran:</span>
                <span className="text-xl text-blue-600">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition transform active:scale-[0.98]"
            >
              <CreditCard size={18} />
              <span>Perpanjang Sekarang</span>
              <ArrowRight size={16} />
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Mendukung QRIS (GoPay, OVO, Dana), Transfer Bank (BCA, Mandiri, BNI, BRI), dan kartu debit online.
            </p>
          </div>

          {/* Bantuan WhatsApp CS */}
          <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <MessageCircle className="text-emerald-600 shrink-0" size={20} />
              <div>
                <strong className="block text-emerald-950">Butuh Bantuan Perpanjangan?</strong>
                <span className="text-emerald-800 text-[11px]">Hubungi Admin CS via WhatsApp</span>
              </div>
            </div>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20perpanjang%20paket%20membership%20CBT%20TKA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 shadow-sm transition"
            >
              Chat CS
            </a>
          </div>
        </div>
      </div>

      {/* FAQ ACCORDION RINGKAS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <HelpCircle size={20} className="text-blue-500" />
          <span>Pertanyaan Umum Seputar Perpanjangan (FAQ)</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
            <strong className="text-slate-900 block font-bold text-sm">
              Apakah sisa hari aktif saya yang lama akan hangus?
            </strong>
            <p className="leading-relaxed">
              Tidak akan hangus sama sekali. Masa aktif paket baru yang Anda beli akan otomatis diakumulasikan dan ditambahkan ke sisa hari aktif Anda yang sekarang.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 space-y-1">
            <strong className="text-slate-900 block font-bold text-sm">
              Berapa lama proses aktivasi setelah transfer pembayaran?
            </strong>
            <p className="leading-relaxed">
              Aktivasi berlangsung otomatis secara instan (1–3 menit) segera setelah pembayaran QRIS atau Virtual Account Anda terkonfirmasi oleh sistem payment gateway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
