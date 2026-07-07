'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

declare global {
  interface Window {
    snap: {
      pay: (token: string, options?: any) => void;
    };
  }
}

interface PackageData {
  id: string;
  kode: string;
  nama: string;
  harga: number;
  durasiHari: number;
  deskripsi: string;
  warna?: string;
  icon?: string;
  fitur: string[];
}

interface EducationLevel {
  id: string;
  nama: string;
  urutan?: number;
}

function CheckoutContent() {
  const searchParams = useSearchParams();

  const packageId = searchParams.get('paket') ?? '';
  const referralCode = searchParams.get('ref') ?? '';

  const [packages, setPackages] = useState<PackageData[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);

  const [loadingPackage, setLoadingPackage] = useState(true);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [voucher, setVoucher] = useState('');
  const [referral, setReferral] = useState(referralCode);

  // Voucher State
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState('');
  const [voucherValid, setVoucherValid] = useState(false);
  const [checkingVoucher, setCheckingVoucher] = useState(false);

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    wa: '',
    tglLahir: '',
    password: '',
    educationLevelId: '',
  });

  useEffect(() => {
    loadData();
  }, []);
const paket = packages.find(
    (item) => item.id === packageId || item.kode === packageId
  );

  const selectedPackage = paket!;

  useEffect(() => {
    if (selectedPackage) {
      setFinalPrice(selectedPackage.harga);
    }
  }, [selectedPackage]);

  useEffect(() => {
    if (!selectedPackage) return;

    const timer = setTimeout(() => {
      checkVoucher(voucher);
    }, 500);

    return () => clearTimeout(timer);
  }, [voucher, selectedPackage]);
    async function loadData() {
    try {
      const [packageRes, eduRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/education-levels'),
      ]);

      const packageJson = await packageRes.json();
      const eduJson = await eduRes.json();

      if (packageJson.success) {
        setPackages(packageJson.data);
      }

      if (eduJson.success) {
        setEducationLevels(eduJson.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPackage(false);
    }
  }

  
 if (loadingPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memuat...
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Paket tidak ditemukan.
      </div>
    );
  }

  async function checkVoucher(kode: string) {
    if (!kode.trim()) {
      setDiscount(0);
      setFinalPrice(selectedPackage.harga);
      setVoucherMessage('');
      setVoucherValid(false);
      return;
    }

    try {
      setCheckingVoucher(true);

      const res = await fetch('/api/check-voucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kode,
          packageId: selectedPackage.id,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setDiscount(0);
        setFinalPrice(selectedPackage.harga);
        setVoucherMessage(json.message);
        setVoucherValid(false);
        return;
      }

      setDiscount(json.potongan);
      setFinalPrice(json.hargaAkhir);

      setVoucherMessage(
        `Voucher berhasil • Hemat Rp ${json.potongan.toLocaleString(
          'id-ID'
        )}`
      );

      setVoucherValid(true);
    } catch {
      setDiscount(0);
      setFinalPrice(selectedPackage.harga);
      setVoucherMessage('Gagal memeriksa voucher.');
      setVoucherValid(false);
    } finally {
      setCheckingVoucher(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateOrderId = () => {
    const now = new Date();

    return (
      'ORD' +
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, '0')
    );
  };
    async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();

    if (loadingCheckout) return;

    if (!formData.educationLevelId) {
      alert('Silakan pilih jenjang pendidikan.');
      return;
    }

     if (!passwordRegex.test(formData.password)) {
  alert(
    "Password harus minimal 8 karakter dan terdiri dari huruf besar, huruf kecil, angka, serta karakter khusus."
  );
  return;
}

    setLoadingCheckout(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: generateOrderId(),
          nama: formData.nama,
          email: formData.email,
          wa: formData.wa,
          tglLahir: formData.tglLahir,
          password: formData.password,
          educationLevelId: formData.educationLevelId,
          packageId: selectedPackage.id,
          promoCode: voucher || referral || null,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        setLoadingCheckout(false);
        return;
      }

      window.snap.pay(result.token);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
      setLoadingCheckout(false);
    }
  }
  
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

 
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-3">

        <form
          onSubmit={handleCheckout}
          className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-xl p-6 md:p-8"
        >

          <div className="mb-8">

            <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              Pendaftaran Member
            </span>

            <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900">
              Lengkapi Data Pendaftaran
            </h1>

            <p className="mt-2 text-base text-slate-500 leading-7">
              Isi data dengan benar. Akun belajar akan otomatis dibuat setelah
              pembayaran berhasil.
            </p>

          </div>

          <div className="space-y-6">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Nama Lengkap
              </label>

              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
              />

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="nama@email.com"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  WhatsApp
                </label>

                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="tel"
                  value={formData.wa}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      wa: e.target.value.replace(/\D/g, ''),
                    })
                  }
                  required
                  placeholder="081234567890"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Nomor hanya boleh berisi angka.
                </p>

              </div>

            </div>
                        <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Tanggal Lahir
                </label>

                <input
                  type="date"
                  name="tglLahir"
                  value={formData.tglLahir}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                />

              <p className="mt-2 text-xs text-slate-500">
                Gunakan minimal <b>8 karakter</b> yang terdiri dari huruf besar, huruf kecil,
                angka, dan karakter khusus (mis. ! @ # $ %).
              </p>
              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Jenjang Pendidikan
              </label>

              <select
                name="educationLevelId"
                value={formData.educationLevelId}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
              >

                <option value="">
                  Pilih Jenjang Pendidikan
                </option>

                {educationLevels.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.nama}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Voucher Promo <span className="text-slate-400">(Opsional)</span>
              </label>

              <input
                type="text"
                value={voucher}
                onChange={(e) =>
                  setVoucher(e.target.value.toUpperCase())
                }
                placeholder="Masukan kode voucher"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
              />

              <div className="mt-2 min-h-[24px]">

                {checkingVoucher && (
                  <p className="text-sm text-slate-500">
                    Memeriksa voucher...
                  </p>
                )}

                {!checkingVoucher && voucherMessage && (
                  <p
                    className={`text-sm font-medium ${
                      voucherValid
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {voucherMessage}
                  </p>
                )}

              </div>

            </div>
                        <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Kode Referral <span className="text-slate-400">(Opsional)</span>
              </label>

              <input
                type="text"
                value={referral}
                onChange={(e) =>
                  setReferral(e.target.value.toUpperCase())
                }
                placeholder="Masukkan kode referral"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
              />

            </div>

            <button
              type="submit"
              disabled={loadingCheckout}
              className="mt-2 w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loadingCheckout
                ? "Memproses Pembayaran..."
                : "Daftar & Bayar Sekarang"}
            </button>

          </div>

        </form>

        <aside className="lg:sticky lg:top-6 h-fit">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

            <div
              className="h-3 w-full"
              style={{
                backgroundColor:
                  selectedPackage.warna?.replace(/"/g, "") ??
                  "#2563eb",
              }}
            />

            <div className="p-6">

              <div className="flex items-center gap-4">

                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
                  style={{
                    backgroundColor:
                      selectedPackage.warna?.replace(/"/g, "") ??
                      "#2563eb",
                  }}
                >
                  {selectedPackage.icon ?? "🎓"}
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Paket Membership
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedPackage.nama}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedPackage.kode}
                  </p>

                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-80 p-4">
               <p className="text-sm font-medium text-slate-500">
                  Harga Membership
                </p>

                {discount > 0 && (
                  <p className="mt-2 text-xl text-slate-400 line-through">
                    Rp {selectedPackage.harga.toLocaleString("id-ID")}
                  </p>
                )}

                <h3 className="mt-1 text-5xl font-extrabold text-blue-700">
                  Rp {finalPrice.toLocaleString("id-ID")}
                </h3>              
                 <p className="text-sm font-medium text-slate-500">
                  Gunakan voucher untuk dapatkan potongan harga
                </p>
                </div>
                
                <div className="mt-4 rounded-2xl bg-slate-120 p-5">
                 
                {discount > 0 && (
                  <p className="mt-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-xl font-semibold text-green-700">
                    🎉 Hemat Rp {discount.toLocaleString("id-ID")}
                  </p>
                )}
                
                <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">

                  <span className="text-slate-500">
                    Masa Aktif
                  </span>

                  <span className="font-bold text-slate-900">
                    {selectedPackage.durasiHari} Hari
                  </span>

                </div>

              </div>

              <div className="mt-8">

                <h3 className="text-lg font-bold text-slate-900">
                  Tentang Paket
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {selectedPackage.deskripsi}
                </p>

              </div>

              <div className="mt-8">

                <h3 className="mb-4 text-lg font-bold text-slate-900">
                  Yang Anda Dapatkan
                </h3>

                <div className="space-y-3">

                  {selectedPackage.fitur.length > 0 ? (
                    selectedPackage.fitur.map((fitur, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />

                        <span className="text-[15px] leading-7 text-slate-700">
                          {fitur}
                        </span>

                      </div>
                    ))
                  ) : (
                                        <>
                      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-[15px] leading-7 text-slate-700">
                          Akses seluruh materi sesuai jenjang pendidikan.
                        </span>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-[15px] leading-7 text-slate-700">
                          Ribuan latihan soal dan pembahasan lengkap.
                        </span>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-[15px] leading-7 text-slate-700">
                          Tryout online dengan penilaian otomatis.
                        </span>
                      </div>

                      <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="mt-1 h-3 w-3 rounded-full bg-green-500 flex-shrink-0" />
                        <span className="text-[15px] leading-7 text-slate-700">
                          Dapat diakses kapan saja selama masa aktif paket.
                        </span>
                      </div>
                    </>
                  )}

                </div>

              </div>

              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                    ✓
                  </div>

                  <div>

                    <h4 className="text-base font-bold text-blue-900">
                      Akun Dibuat Otomatis
                    </h4>

                    <p className="mt-2 text-[15px] leading-7 text-blue-800">
                      Setelah pembayaran berhasil, sistem akan otomatis
                      membuat akun belajar menggunakan email dan password
                      yang Anda daftarkan. Anda dapat langsung login tanpa
                      menunggu proses manual.
                    </p>

                  </div>

                </div>

              </div>
                          </div>

          </div>
</aside>
</div>
      
  </main>
  );
}


export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">

          <div className="flex flex-col items-center gap-4">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

            <p className="text-slate-600 text-lg font-medium">
              Memuat halaman pendaftaran...
            </p>

          </div>

        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
