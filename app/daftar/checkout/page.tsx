'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  MapPin,
  ShieldCheck,
  TicketPercent,
} from 'lucide-react';
import Script from 'next/script';

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: any) => void;
    };
    grecaptcha?: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      ready: (callback: () => void) => void;
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

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  name: string;
}

interface ActiveVoucher {
  code: string;
  type?: string | null;
  diskonType: 'percent' | 'fixed';
  diskonValue: number;
  minimumPurchase: number;
  validFrom?: string | null;
  validUntil?: string | null;
}

interface FormData {
  nama: string;
  email: string;
  wa: string;
  tglLahir: string;
  password: string;
  confirmPassword: string;
  educationLevelId: string;
  provinceId: string;
  provinceName: string;
  regencyId: string;
  regencyName: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();

  const packageId = searchParams.get('paket') ?? '';
  const initialReferralCode = searchParams.get('ref') ?? '';

  const [packages, setPackages] = useState<PackageData[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [activeVoucher, setActiveVoucher] =
    useState<ActiveVoucher | null>(null);

  const [loadingPackage, setLoadingPackage] = useState(true);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [voucher, setVoucher] = useState('');
  const [referral, setReferral] = useState(initialReferralCode);

  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [voucherMessage, setVoucherMessage] = useState('');
  const [voucherValid, setVoucherValid] = useState(false);
  const [checkingVoucher, setCheckingVoucher] = useState(false);

  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [regencyError, setRegencyError] = useState('');

  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    wa: '',
    tglLahir: '',
    password: '',
    confirmPassword: '',
    educationLevelId: '',
    provinceId: '',
    provinceName: '',
    regencyId: '',
    regencyName: '',
  });

  const voucherRequestId = useRef(0);

  const regencyAbortController = useRef<AbortController | null>(null);

  const captchaSiteKey =
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [
        packageRes,
        educationRes,
        provinceRes,
        voucherRes,
      ] = await Promise.all([
        fetch('/api/packages', {
          cache: 'no-store',
        }),

        fetch('/api/education-levels', {
          cache: 'no-store',
        }),

        fetch('/api/wilayah/provinces', {
          cache: 'no-store',
        }),

        fetch('/api/active-voucher', {
          cache: 'no-store',
        }),
      ]);

      // =========================
      // PACKAGES
      // =========================
      if (packageRes.ok) {
        const json = await packageRes.json();

        setPackages(
          json?.success && Array.isArray(json.data)
            ? json.data
            : []
        );
      }

      // =========================
      // EDUCATION LEVELS
      // =========================
      if (educationRes.ok) {
        const json = await educationRes.json();

        const data = Array.isArray(json?.data)
          ? json.data
          : [];

        setEducationLevels(
          data.filter(
            (item: any) =>
              item &&
              typeof item.id === 'string' &&
              typeof item.nama === 'string' &&
              item.nama.trim() !== ''
          )
        );
      }

      // =========================
      // PROVINCES
      // =========================
      if (provinceRes.ok) {
        const json = await provinceRes.json();

        const data = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];

        const cleanedProvinces = data.filter(
          (item: any) =>
            item &&
            item.id &&
            item.name
        );

        setProvinces(cleanedProvinces);
      } else {
        console.error(
          'Gagal mengambil data provinsi.',
          provinceRes.status
        );

        setProvinces([]);
      }

      // =========================
      // ACTIVE VOUCHER
      // =========================
      if (voucherRes.ok) {
        const json = await voucherRes.json();

        setActiveVoucher(
          json?.success && json?.data
            ? json.data
            : null
        );
      }
    } catch (error) {
      console.error(
        'LOAD CHECKOUT DATA:',
        error
      );
    } finally {
      setLoadingPackage(false);
    }
  }

  const selectedPackage = packages.find(
    item =>
      item.id === packageId ||
      item.kode === packageId
  );

  // =========================
  // RESET VOUCHER SAAT PAKET BERUBAH
  // =========================
  useEffect(() => {
    if (!selectedPackage) return;

    const harga =
      Number(selectedPackage.harga) || 0;

    setDiscount(0);
    setFinalPrice(harga);
    setVoucher('');
    setVoucherMessage('');
    setVoucherValid(false);
    setCheckingVoucher(false);
  }, [selectedPackage?.id]);

  // =========================
  // LOAD REGENCIES
  // =========================
  useEffect(() => {
    if (!formData.provinceId) {
      regencyAbortController.current?.abort();

      setRegencies([]);
      setLoadingRegencies(false);
      setRegencyError('');

      return;
    }

    const controller =
      new AbortController();

    regencyAbortController.current?.abort();

    regencyAbortController.current =
      controller;

    async function loadRegencies() {
      try {
        setLoadingRegencies(true);
        setRegencyError('');

        const res = await fetch(
          `/api/wilayah/regencies/${formData.provinceId}`,
          {
            cache: 'no-store',
            signal: controller.signal,
          }
        );

        const json =
          await res.json().catch(() => null);

        if (!res.ok) {
          throw new Error(
            json?.message ||
              'Gagal mengambil kabupaten/kota.'
          );
        }

        const data = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json)
          ? json
          : [];

        const cleanedRegencies =
          data.filter(
            (item: any) =>
              item &&
              item.id &&
              item.name
          );

        if (!controller.signal.aborted) {
          setRegencies(cleanedRegencies);

          if (
            cleanedRegencies.length === 0
          ) {
            setRegencyError(
              'Kabupaten/kota tidak ditemukan untuk provinsi ini.'
            );
          }
        }
      } catch (error: any) {
        if (
          error?.name === 'AbortError'
        ) {
          return;
        }

        console.error(
          'LOAD REGENCIES:',
          error
        );

        if (!controller.signal.aborted) {
          setRegencies([]);

          setRegencyError(
            'Kabupaten/kota gagal dimuat. Silakan coba pilih provinsi lagi.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingRegencies(false);
        }
      }
    }

    loadRegencies();

    return () => {
      controller.abort();
    };
  }, [formData.provinceId]);

  // =========================
  // CHECK VOUCHER
  // =========================
  useEffect(() => {
    if (!selectedPackage) return;

    const kode = voucher.trim();

    if (!kode) {
      setDiscount(0);

      setFinalPrice(
        Number(selectedPackage.harga) || 0
      );

      setVoucherMessage('');
      setVoucherValid(false);
      setCheckingVoucher(false);

      return;
    }

    const timer = window.setTimeout(() => {
      checkVoucher(kode);
    }, 500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [voucher, selectedPackage?.id]);

  async function checkVoucher(
    kode: string
  ) {
    if (!selectedPackage) return;

    const requestId =
      ++voucherRequestId.current;

    try {
      setCheckingVoucher(true);

      const res = await fetch(
        '/api/check-voucher',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            kode,
            packageId:
              selectedPackage.id,
          }),
        }
      );

      const json =
        await res.json();

      if (
        requestId !==
        voucherRequestId.current
      ) {
        return;
      }

      if (!json?.success) {
        setDiscount(0);

        setFinalPrice(
          Number(
            selectedPackage.harga
          ) || 0
        );

        setVoucherMessage(
          json?.message ||
            'Voucher tidak valid.'
        );

        setVoucherValid(false);

        return;
      }

      const potongan = Math.max(
        0,
        Number(
          json?.potongan ?? 0
        )
      );

      const hargaAkhir = Math.max(
        0,
        Number(
          json?.hargaAkhir ??
            selectedPackage.harga
        )
      );

      setDiscount(potongan);
      setFinalPrice(hargaAkhir);

      setVoucherMessage(
        `Voucher berhasil • Hemat Rp ${potongan.toLocaleString(
          'id-ID'
        )}`
      );

      setVoucherValid(true);
    } catch (error) {
      if (
        requestId !==
        voucherRequestId.current
      ) {
        return;
      }

      console.error(
        'CHECK VOUCHER:',
        error
      );

      setDiscount(0);

      setFinalPrice(
        Number(
          selectedPackage.harga
        ) || 0
      );

      setVoucherMessage(
        'Gagal memeriksa voucher.'
      );

      setVoucherValid(false);
    } finally {
      if (
        requestId ===
        voucherRequestId.current
      ) {
        setCheckingVoucher(false);
      }
    }
  }

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // PROVINCE
  // =========================
  const handleProvinceChange = (
    e: React.ChangeEvent<
      HTMLSelectElement
    >
  ) => {
    const id =
      e.target.value;

    const province =
      provinces.find(
        item => item.id === id
      );

    regencyAbortController.current?.abort();

    setFormData(prev => ({
      ...prev,

      provinceId: id,

      provinceName:
        province?.name ?? '',

      regencyId: '',

      regencyName: '',
    }));

    setRegencies([]);
    setRegencyError('');
  };

  // =========================
  // REGENCY
  // =========================
  const handleRegencyChange = (
    e: React.ChangeEvent<
      HTMLSelectElement
    >
  ) => {
    const id =
      e.target.value;

    const regency =
      regencies.find(
        item => item.id === id
      );

    setFormData(prev => ({
      ...prev,

      regencyId: id,

      regencyName:
        regency?.name ?? '',
    }));
  };

  // =========================
  // ORDER ID
  // =========================
  const generateOrderId = () => {
    const now =
      new Date();

    const date =
      now
        .getFullYear()
        .toString() +
      String(
        now.getMonth() + 1
      ).padStart(2, '0') +
      String(
        now.getDate()
      ).padStart(2, '0');

    const random =
      typeof crypto !==
        'undefined' &&
      'randomUUID' in crypto
        ? crypto
            .randomUUID()
            .replace(/-/g, '')
            .slice(0, 12)
        : Math.random()
            .toString(36)
            .substring(
              2,
              14
            );

    return `ORD${date}${random.toUpperCase()}`;
  };

  // =========================
  // PASSWORD
  // =========================
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\\-])[A-Za-z\d@$!%*?&.#_\\-]{8,}$/;

  // ==========================================================
  // CAPTCHA
  // ==========================================================

  async function waitForRecaptcha(
    timeoutMs = 10000
  ): Promise<boolean> {
    if (
      !captchaSiteKey
    ) {
      return false;
    }

    const start =
      Date.now();

    while (
      Date.now() - start <
      timeoutMs
    ) {
      if (
        window.grecaptcha &&
        typeof window.grecaptcha.ready ===
          'function' &&
        typeof window.grecaptcha.execute ===
          'function'
      ) {
        return true;
      }

      await new Promise(
        resolve =>
          setTimeout(
            resolve,
            250
          )
      );
    }

    return false;
  }

  async function getCaptchaToken(): Promise<
    string | null
  > {
    if (
      !captchaSiteKey
    ) {
      console.error(
        'NEXT_PUBLIC_RECAPTCHA_SITE_KEY belum tersedia.'
      );

      return null;
    }

    try {
      const ready =
        await waitForRecaptcha(
          10000
        );

      if (!ready) {
        console.error(
          'reCAPTCHA tidak tersedia setelah menunggu 10 detik.'
        );

        return null;
      }

      return await new Promise(
        resolve => {
          let finished =
            false;

          const finish = (
            token: string | null
          ) => {
            if (finished) return;

            finished = true;

            resolve(
              token || null
            );
          };

          const timeout =
            window.setTimeout(
              () => {
                console.error(
                  'Timeout saat menjalankan reCAPTCHA.'
                );

                finish(null);
              },
              15000
            );

          window.grecaptcha!.ready(
            async () => {
              try {
                const token =
                  await window.grecaptcha!.execute(
                    captchaSiteKey,
                    {
                      action:
                        'checkout',
                    }
                  );

                window.clearTimeout(
                  timeout
                );

                finish(
                  token ||
                    null
                );
              } catch (error) {
                window.clearTimeout(
                  timeout
                );

                console.error(
                  'CAPTCHA EXECUTE ERROR:',
                  error
                );

                finish(null);
              }
            }
          );
        }
      );
    } catch (error) {
      console.error(
        'CAPTCHA ERROR:',
        error
      );

      return null;
    }
  }

  // ==========================================================
  // CHECKOUT
  // ==========================================================

  async function handleCheckout(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (
      loadingCheckout
    ) {
      return;
    }

    if (!selectedPackage) {
      alert(
        'Paket tidak ditemukan.'
      );

      return;
    }

    const nama =
      formData.nama.trim();

    const email =
      formData.email
        .trim()
        .toLowerCase();

    const wa =
      formData.wa.trim();

    const voucherCode =
      voucher
        .trim()
        .toUpperCase();

    const referralCode =
      referral
        .trim()
        .toUpperCase();

    // =========================
    // VALIDASI
    // =========================

    if (!nama) {
      alert(
        'Silakan masukkan nama lengkap.'
      );
      return;
    }

    if (!email) {
      alert(
        'Silakan masukkan email.'
      );
      return;
    }

    if (!wa) {
      alert(
        'Silakan masukkan nomor WhatsApp.'
      );
      return;
    }

    if (
      !/^08\d{8,13}$/.test(
        wa
      )
    ) {
      alert(
        'Nomor WhatsApp harus diawali 08 dan berisi 10–15 digit.'
      );

      return;
    }

    if (
      !formData.tglLahir
    ) {
      alert(
        'Silakan masukkan tanggal lahir.'
      );

      return;
    }

    if (
      !formData.educationLevelId
    ) {
      alert(
        'Silakan pilih jenjang pendidikan.'
      );

      return;
    }

    if (
      !formData.provinceId ||
      !formData.provinceName
    ) {
      alert(
        'Silakan pilih provinsi.'
      );

      return;
    }

    if (
      !formData.regencyId ||
      !formData.regencyName
    ) {
      alert(
        'Silakan pilih kabupaten/kota.'
      );

      return;
    }

    if (
      !passwordRegex.test(
        formData.password
      )
    ) {
      alert(
        'Password harus minimal 8 karakter dan terdiri dari huruf besar, huruf kecil, angka, serta karakter khusus.'
      );

      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert(
        'Konfirmasi password tidak sama.'
      );

      return;
    }

    if (!captchaSiteKey) {
      alert(
        'Konfigurasi CAPTCHA belum tersedia. Pastikan NEXT_PUBLIC_RECAPTCHA_SITE_KEY sudah diatur di .env.local.'
      );

      return;
    }

    setLoadingCheckout(true);

    try {
      // ======================================================
      // AMBIL TOKEN CAPTCHA
      // ======================================================

      const captchaToken =
        await getCaptchaToken();

      if (!captchaToken) {
        alert(
          'Perlindungan keamanan belum siap. Silakan tunggu beberapa detik lalu coba lagi.'
        );

        setLoadingCheckout(
          false
        );

        return;
      }

      // ======================================================
      // KIRIM KE API CHECKOUT
      // ======================================================

      const response =
        await fetch(
          '/api/checkout',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              orderId:
                generateOrderId(),

              nama,

              email,

              wa,

              tglLahir:
                formData.tglLahir,

              provinceId:
                formData.provinceId,

              provinceName:
                formData.provinceName,

              regencyId:
                formData.regencyId,

              regencyName:
                formData.regencyName,

              password:
                formData.password,

              educationLevelId:
                formData.educationLevelId,

              packageId:
                selectedPackage.id,

              voucherCode:
                voucherCode ||
                null,

              referralCode:
                referralCode ||
                null,

              promoCode:
                voucherCode ||
                referralCode ||
                null,

              captchaToken,
            }),
          }
        );

      let result: any;

      try {
        result =
          await response.json();
      } catch {
        throw new Error(
          'Response server tidak valid.'
        );
      }

      // ======================================================
      // RESPONSE ERROR
      // ======================================================

      if (
        !response.ok ||
        !result?.success
      ) {
        alert(
          result?.message ||
            'Gagal membuat transaksi.'
        );

        setLoadingCheckout(
          false
        );

        return;
      }

      // ======================================================
      // MIDTRANS SNAP
      // ======================================================

      if (
        !window.snap ||
        !result?.token
      ) {
        alert(
          'Sistem pembayaran belum siap. Silakan coba lagi.'
        );

        setLoadingCheckout(
          false
        );

        return;
      }

      window.snap.pay(
        result.token,
        {
          onSuccess: () => {
            setLoadingCheckout(
              false
            );

            window.location.href =
              '/login';
          },

          onPending: () => {
            setLoadingCheckout(
              false
            );
          },

          onError: () => {
            setLoadingCheckout(
              false
            );

            alert(
              'Pembayaran mengalami kendala. Silakan coba lagi.'
            );
          },

          onClose: () => {
            setLoadingCheckout(
              false
            );
          },
        }
      );
    } catch (error) {
      console.error(
        'CHECKOUT:',
        error
      );

      alert(
        'Terjadi kesalahan saat memproses pendaftaran.'
      );

      setLoadingCheckout(
        false
      );
    }
  }

  // ==========================================================
  // LOADING
  // ==========================================================

  if (
    loadingPackage
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#d2f3fa] px-4">
        <p className="font-bold text-slate-700">
          Memuat halaman
          pendaftaran...
        </p>
      </main>
    );
  }

  // ==========================================================
  // PACKAGE NOT FOUND
  // ==========================================================

  if (!selectedPackage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#d2f3fa] px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-black text-slate-900">
            Paket tidak
            ditemukan
          </h1>

          <p className="mt-3 leading-6 text-slate-600">
            Silakan kembali ke
            halaman paket dan
            pilih paket yang
            tersedia.
          </p>
        </div>
      </main>
    );
  }

  const packageColor =
    selectedPackage.warna
      ?.replace(/"/g, '')
      .trim() ||
    '#2563eb';

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <>
      {captchaSiteKey && (
        <Script
          id="google-recaptcha-v3"
          src={`https://www.google.com/recaptcha/api.js?render=${captchaSiteKey}`}
          strategy="afterInteractive"
          onLoad={() => {
            setCaptchaLoaded(true);

            console.log(
              'reCAPTCHA script berhasil dimuat.'
            );
          }}
          onReady={() => {
            setCaptchaLoaded(true);
          }}
          onError={() => {
            setCaptchaLoaded(false);

            console.error(
              'Gagal memuat script reCAPTCHA.'
            );
          }}
        />
      )}

      <main className="min-h-screen bg-[#d2f3fa] px-3 py-5 sm:px-4 sm:py-8 md:py-12">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}

          <div className="mb-6 px-2 text-center sm:mb-8">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-wide text-blue-700 shadow-sm sm:text-xs">
              Pendaftaran
              Member
            </span>

            <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              Lengkapi Data
              Pendaftaran
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Isi data dengan
              benar. Setelah
              pembayaran
              berhasil, akun
              belajar akan
              dibuat secara
              otomatis.
            </p>
          </div>

          {/* MAIN GRID */}

          <div className="grid gap-5 lg:grid-cols-3 lg:gap-8">

            {/* FORM */}

            <form
              onSubmit={
                handleCheckout
              }
              className="min-w-0 rounded-3xl border border-white/70 bg-white p-4 shadow-xl sm:p-6 md:p-8 lg:col-span-2"
            >
              <div className="space-y-5 sm:space-y-6">

                {/* NAMA */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Nama Lengkap
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={
                      formData.nama
                    }
                    onChange={
                      handleChange
                    }
                    required
                    autoComplete="name"
                    placeholder="Masukkan nama lengkap"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* EMAIL + WA */}

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                      autoComplete="email"
                      placeholder="nama@email.com"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      WhatsApp
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={
                        formData.wa
                      }
                      onChange={e =>
                        setFormData(
                          prev => ({
                            ...prev,
                            wa: e.target.value.replace(
                              /\D/g,
                              ''
                            ),
                          })
                        )
                      }
                      required
                      placeholder="081234567890"
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      Nomor hanya
                      boleh berisi
                      angka.
                    </p>
                  </div>
                </div>

                {/* TANGGAL LAHIR */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Tanggal Lahir
                  </label>

                  <input
                    type="date"
                    name="tglLahir"
                    value={
                      formData.tglLahir
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* PASSWORD */}

                <div className="grid gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        name="password"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        required
                        minLength={
                          8
                        }
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 pr-12 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            prev =>
                              !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      >
                        {showPassword ? (
                          <EyeOff
                            size={
                              19
                            }
                          />
                        ) : (
                          <Eye
                            size={
                              19
                            }
                          />
                        )}
                      </button>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Minimal 8
                      karakter,
                      terdiri dari
                      huruf besar,
                      huruf kecil,
                      angka, dan
                      karakter
                      khusus.
                    </p>
                  </div>

                  {/* KONFIRMASI PASSWORD */}

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Konfirmasi
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        name="confirmPassword"
                        value={
                          formData.confirmPassword
                        }
                        onChange={
                          handleChange
                        }
                        required
                        minLength={
                          8
                        }
                        autoComplete="new-password"
                        placeholder="Ulangi password"
                        className={`w-full rounded-2xl border bg-white px-4 py-3.5 pr-12 text-base outline-none transition focus:ring-4 ${
                          formData.confirmPassword &&
                          formData.password !==
                            formData.confirmPassword
                            ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                            : formData.confirmPassword &&
                              formData.password ===
                                formData.confirmPassword
                            ? 'border-green-400 focus:border-green-500 focus:ring-green-100'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-100'
                        }`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            prev =>
                              !prev
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      >
                        {showConfirmPassword ? (
                          <EyeOff
                            size={
                              19
                            }
                          />
                        ) : (
                          <Eye
                            size={
                              19
                            }
                          />
                        )}
                      </button>
                    </div>

                    {formData.confirmPassword &&
                      formData.password !==
                        formData.confirmPassword && (
                        <p className="mt-2 text-xs font-medium text-red-600">
                          Password
                          tidak
                          sama.
                        </p>
                      )}

                    {formData.confirmPassword &&
                      formData.password ===
                        formData.confirmPassword && (
                        <p className="mt-2 text-xs font-medium text-green-600">
                          Password
                          cocok.
                        </p>
                      )}
                  </div>
                </div>

                {/* EDUCATION */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Jenjang
                    Pendidikan
                  </label>

                  <select
                    name="educationLevelId"
                    value={
                      formData.educationLevelId
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">
                      Pilih Jenjang
                      Pendidikan
                    </option>

                    {educationLevels.map(
                      item => (
                        <option
                          key={
                            item.id
                          }
                          value={
                            item.id
                          }
                        >
                          {
                            item.nama
                          }
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* WILAYAH */}

                <div className="rounded-3xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">

                  <div className="mb-4 flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <MapPin
                        size={
                          18
                        }
                      />
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900">
                        Asal Daerah
                      </h3>

                      <p className="text-xs text-slate-500">
                        Digunakan
                        untuk
                        statistik
                        dan
                        perangkingan
                        daerah.
                      </p>
                    </div>

                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    {/* PROVINCE */}

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Provinsi
                      </label>

                      <select
                        value={
                          formData.provinceId
                        }
                        onChange={
                          handleProvinceChange
                        }
                        required
                        disabled={
                          provinces.length ===
                          0
                        }
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                      >
                        <option value="">
                          {provinces.length ===
                          0
                            ? 'Memuat Provinsi...'
                            : 'Pilih Provinsi'}
                        </option>

                        {provinces.map(
                          item => (
                            <option
                              key={
                                item.id
                              }
                              value={
                                item.id
                              }
                            >
                              {
                                item.name
                              }
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* REGENCY */}

                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Kabupaten/Kota
                      </label>

                      <select
                        value={
                          formData.regencyId
                        }
                        onChange={
                          handleRegencyChange
                        }
                        required
                        disabled={
                          !formData.provinceId ||
                          loadingRegencies ||
                          regencies.length ===
                            0
                        }
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                      >
                        <option value="">
                          {loadingRegencies
                            ? 'Memuat Kabupaten/Kota...'
                            : regencies.length ===
                              0
                            ? 'Kabupaten/Kota tidak tersedia'
                            : 'Pilih Kabupaten/Kota'}
                        </option>

                        {regencies.map(
                          item => (
                            <option
                              key={
                                item.id
                              }
                              value={
                                item.id
                              }
                            >
                              {
                                item.name
                              }
                            </option>
                          )
                        )}
                      </select>

                      {regencyError && (
                        <p className="mt-2 text-xs font-medium text-red-600">
                          {
                            regencyError
                          }
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* VOUCHER */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Voucher Promo{' '}
                    <span className="font-normal text-slate-400">
                      (Opsional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={
                      voucher
                    }
                    onChange={e =>
                      setVoucher(
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="Masukkan kode voucher"
                    autoComplete="off"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base uppercase outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  {activeVoucher && (
                    <div className="mt-4 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-4">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-slate-950">
                          <TicketPercent
                            size={
                              19
                            }
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                            Voucher
                            Aktif
                          </p>

                          <p className="mt-1 text-lg font-black tracking-wide text-amber-950">
                            {
                              activeVoucher.code
                            }
                          </p>
                        </div>

                        <div className="shrink-0 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase text-slate-950">
                          {activeVoucher.diskonType ===
                          'percent'
                            ? `${activeVoucher.diskonValue}%`
                            : `Rp ${Number(
                                activeVoucher.diskonValue
                              ).toLocaleString(
                                'id-ID'
                              )}`}
                        </div>

                      </div>
                    </div>
                  )}

                  <div className="mt-2 min-h-[24px]">

                    {checkingVoucher && (
                      <p className="text-sm font-medium text-slate-500">
                        Memeriksa
                        voucher...
                      </p>
                    )}

                    {!checkingVoucher &&
                      voucherMessage && (
                        <p
                          className={`text-sm font-bold ${
                            voucherValid
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {
                            voucherMessage
                          }
                        </p>
                      )}

                  </div>
                </div>

                {/* REFERRAL */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Kode Referral{' '}
                    <span className="font-normal text-slate-400">
                      (Opsional)
                    </span>
                  </label>

                  <input
                    type="text"
                    value={
                      referral
                    }
                    onChange={e =>
                      setReferral(
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="Masukkan kode referral"
                    autoComplete="off"
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3.5 text-base uppercase outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* CAPTCHA STATUS */}

                <div className="flex items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">

                  <ShieldCheck
                    size={
                      15
                    }
                    className={
                      captchaLoaded
                        ? 'text-green-600'
                        : 'text-slate-400'
                    }
                  />

                  {captchaLoaded
                    ? 'Perlindungan keamanan aktif.'
                    : 'Menyiapkan perlindungan keamanan...'}
                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={
                    loadingCheckout
                  }
                  className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-4 text-base font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400 sm:text-lg"
                >
                  {loadingCheckout ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Memproses
                      Pembayaran...
                    </>
                  ) : (
                    <>
                      Daftar &
                      Bayar
                      Sekarang
                      <span>
                        →
                      </span>
                    </>
                  )}
                </button>

                {/* SECURITY */}

                <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                  <ShieldCheck
                    size={
                      15
                    }
                    className="shrink-0 text-green-600"
                  />

                  Data Anda
                  diproses
                  secara aman.
                </div>

              </div>
            </form>

            {/* =================================================
                ASIDE PACKAGE
            ================================================= */}

            <aside className="h-fit lg:sticky lg:top-6">

              <div className="overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl">

                <div
                  className="h-2.5 w-full"
                  style={{
                    backgroundColor:
                      packageColor,
                  }}
                />

                <div className="p-5 sm:p-6">

                  {/* PACKAGE HEADER */}

                  <div className="flex items-center gap-4">

                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl sm:h-16 sm:w-16"
                      style={{
                        backgroundColor:
                          packageColor,
                      }}
                    >
                      {
                        selectedPackage.icon ??
                        '🎓'
                      }
                    </div>

                    <div className="min-w-0">

                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        Paket
                        Membership
                      </p>

                      <h2 className="mt-1 break-words text-xl font-black text-slate-900 sm:text-2xl">
                        {
                          selectedPackage.nama
                        }
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {
                          selectedPackage.kode
                        }
                      </p>

                    </div>

                  </div>

                  {/* PRICE */}

                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 sm:mt-6 sm:p-5">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Harga
                      Membership
                    </p>

                    {discount >
                      0 && (
                      <div className="mt-2">

                        <span className="text-lg font-black text-slate-400 line-through decoration-red-400 decoration-2 sm:text-xl">
                          Rp{' '}
                          {Number(
                            selectedPackage.harga
                          ).toLocaleString(
                            'id-ID'
                          )}
                        </span>

                        <span className="ml-2 inline-flex rounded-full bg-rose-100 px-2 py-1 text-[10px] font-black text-rose-600">
                          Hemat
                          Rp{' '}
                          {discount.toLocaleString(
                            'id-ID'
                          )}
                        </span>

                      </div>
                    )}

                    <h3 className="mt-1 text-3xl font-black tracking-tight text-blue-700 sm:text-4xl">
                      Rp{' '}
                      {finalPrice.toLocaleString(
                        'id-ID'
                      )}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-slate-500">
                      untuk{' '}
                      {
                        selectedPackage.durasiHari
                      }{' '}
                      hari
                      akses
                      penuh
                    </p>

                    {discount >
                      0 && (
                      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600">
                        <CheckCircle2
                          size={
                            15
                          }
                        />

                        Voucher
                        berhasil
                        diterapkan
                      </div>
                    )}

                  </div>

                  {/* ACTIVE PERIOD */}

                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">

                    <span className="text-sm text-slate-500">
                      Masa Aktif
                    </span>

                    <span className="font-black text-slate-900">
                      {
                        selectedPackage.durasiHari
                      }{' '}
                      Hari
                    </span>

                  </div>

                  {/* ABOUT */}

                  <div className="mt-6">

                    <h3 className="text-lg font-black text-slate-900">
                      Tentang
                      Paket
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {
                        selectedPackage.deskripsi
                      }
                    </p>

                  </div>

                  {/* FEATURES */}

                  <div className="mt-6">

                    <h3 className="mb-4 text-lg font-black text-slate-900">
                      Yang Anda
                      Dapatkan
                    </h3>

                    <div className="space-y-3">

                      {(selectedPackage.fitur ??
                        []).length >
                        0 &&
                        selectedPackage.fitur.map(
                          (
                            fitur,
                            index
                          ) => (
                            <div
                              key={
                                index
                              }
                              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5"
                            >

                              <CheckCircle2
                                size={
                                  18
                                }
                                className="mt-0.5 shrink-0 text-emerald-500"
                              />

                              <span className="text-sm leading-6 text-slate-700">
                                {
                                  fitur
                                }
                              </span>

                            </div>
                          )
                        )}

                    </div>
                  </div>

                  {/* AUTO ACCOUNT */}

                  <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                        ✓
                      </div>

                      <div>

                        <h4 className="text-sm font-black text-blue-900">
                          Akun
                          Dibuat
                          Otomatis
                        </h4>

                        <p className="mt-2 text-xs leading-5 text-blue-800">
                          Setelah
                          pembayaran
                          berhasil,
                          sistem
                          akan
                          otomatis
                          membuat
                          akun
                          belajar
                          menggunakan
                          email
                          dan
                          password
                          yang Anda
                          daftarkan.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}

// ==========================================================
// PAGE
// ==========================================================

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#d2f3fa] px-4">
          <p className="font-bold text-slate-700">
            Memuat halaman
            pendaftaran...
          </p>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}