import {
  Handshake,
  Users,
  Wallet,
  Banknote,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import { getCurrentUser } from "@/lib/auth";
import AffiliateApplyButton from "@/components/dashboard/AffiliateApplyButton";

export default async function AffiliatePage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  /*
   * affiliateStatus sementara kita ambil dari session user.
   *
   * Nilai yang digunakan:
   * INACTIVE
   * PENDING
   * ACTIVE
   */
  const affiliateStatus =
    (user as any).affiliateStatus ?? "INACTIVE";

  const isPending =
    affiliateStatus === "PENDING";

  const isActive =
    affiliateStatus === "ACTIVE";

  const isInactive =
    affiliateStatus !== "PENDING" &&
    affiliateStatus !== "ACTIVE";

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <div className="flex items-center gap-3">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-blue-700
              text-white
            "
          >
            <Handshake size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Affiliate
            </h1>

            <p className="mt-1 text-slate-500">
              Dapatkan komisi dengan mengajak teman belajar bersama.
            </p>
          </div>

        </div>
      </section>


      {/* =====================================================
          STATUS AFFILIATE
      ===================================================== */}

      {isInactive && (
        <section
          className="
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-blue-700
            to-blue-900
            p-6
            text-white
            shadow-lg
            md:p-8
          "
        >
          <div className="max-w-3xl">

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
              "
            >
              <Handshake size={18} />

              Program Affiliate
            </div>

            <h2 className="text-2xl font-bold md:text-3xl">
              Ajak teman belajar dan dapatkan komisi
            </h2>

            <p className="mt-4 leading-relaxed text-blue-100">
              Bagikan link referral Anda kepada teman atau calon
              peserta. Setiap transaksi yang memenuhi ketentuan
              program affiliate akan tercatat sebagai komisi Anda.
            </p>

            <div className="mt-6">
              <AffiliateApplyButton />
            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          PENDING
      ===================================================== */}

      {isPending && (
        <section
          className="
            rounded-3xl
            border
            border-yellow-200
            bg-yellow-50
            p-6
            shadow-sm
            md:p-8
          "
        >
          <div className="flex gap-4">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-yellow-100
                text-yellow-700
              "
            >
              <Clock3 size={26} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-yellow-900">
                Pengajuan Affiliate Sedang Diproses
              </h2>

              <p className="mt-2 leading-relaxed text-yellow-800">
                Pengajuan Anda sudah berhasil dikirim dan sedang
                menunggu konfirmasi dari admin.
              </p>

              <p className="mt-3 text-sm text-yellow-700">
                Setelah disetujui, Anda akan mendapatkan akses
                ke fitur referral, komisi, dan penarikan.
              </p>
            </div>

          </div>
        </section>
      )}


      {/* =====================================================
          ACTIVE
      ===================================================== */}

      {isActive && (
        <section
          className="
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-green-600
            to-green-800
            p-6
            text-white
            shadow-lg
            md:p-8
          "
        >
          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-white/15
              "
            >
              <ShieldCheck size={28} />
            </div>

            <div>
              <div
                className="
                  mb-2
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                "
              >
                <CheckCircle2 size={17} />

                Affiliate Aktif
              </div>

              <h2 className="text-2xl font-bold md:text-3xl">
                Selamat, Anda sudah menjadi Affiliate!
              </h2>

              <p className="mt-3 max-w-2xl leading-relaxed text-green-100">
                Sekarang Anda dapat membagikan link referral,
                memantau komisi, dan mengajukan penarikan sesuai
                ketentuan program affiliate.
              </p>
            </div>

          </div>

          {/* MENU AFFILIATE */}

          <div
            className="
              mt-8
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            <a
              href="/dashboard/member/affiliate/referral"
              className="
                rounded-2xl
                bg-white
                p-5
                text-slate-800
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Users
                size={24}
                className="text-blue-700"
              />

              <h3 className="mt-3 font-semibold">
                Referral
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Lihat dan bagikan link referral Anda.
              </p>
            </a>


            <a
              href="/dashboard/member/affiliate/komisi"
              className="
                rounded-2xl
                bg-white
                p-5
                text-slate-800
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Wallet
                size={24}
                className="text-green-700"
              />

              <h3 className="mt-3 font-semibold">
                Komisi
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Pantau komisi yang Anda peroleh.
              </p>
            </a>


            <a
              href="/dashboard/member/affiliate/penarikan"
              className="
                rounded-2xl
                bg-white
                p-5
                text-slate-800
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
              "
            >
              <Banknote
                size={24}
                className="text-yellow-600"
              />

              <h3 className="mt-3 font-semibold">
                Penarikan
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Ajukan dan pantau penarikan komisi.
              </p>
            </a>

          </div>
        </section>
      )}


      {/* =====================================================
          KEUNTUNGAN
      ===================================================== */}

      <section>

        <h2 className="mb-5 text-xl font-semibold text-slate-800">
          Keuntungan Affiliate
        </h2>

        <div className="grid gap-5 md:grid-cols-3">

          {/* Referral */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-700
              "
            >
              <Users size={24} />
            </div>

            <h3 className="font-semibold text-slate-800">
              Link Referral
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Dapatkan link referral pribadi yang dapat dibagikan
              kepada teman.
            </p>

          </div>


          {/* Komisi */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-green-700
              "
            >
              <Wallet size={24} />
            </div>

            <h3 className="font-semibold text-slate-800">
              Komisi
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Pantau transaksi dan komisi yang Anda peroleh dari
              referral.
            </p>

          </div>


          {/* Penarikan */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-yellow-100
                text-yellow-700
              "
            >
              <Banknote size={24} />
            </div>

            <h3 className="font-semibold text-slate-800">
              Penarikan
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Komisi yang memenuhi ketentuan dapat diajukan untuk
              penarikan.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CARA KERJA
      ===================================================== */}

      <section
        className="
          rounded-2xl
          border
          bg-white
          p-6
          shadow-sm
          md:p-8
        "
      >

        <h2 className="text-xl font-semibold text-slate-800">
          Cara Kerja Affiliate
        </h2>

        <div className="mt-6 space-y-5">

          {/* 1 */}

          <div className="flex gap-4">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-700
                text-sm
                font-bold
                text-white
              "
            >
              1
            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Daftar sebagai Affiliate
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Ajukan diri Anda untuk mengikuti program affiliate.
              </p>

            </div>

          </div>


          {/* 2 */}

          <div className="flex gap-4">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-700
                text-sm
                font-bold
                text-white
              "
            >
              2
            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Menunggu Konfirmasi
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Admin akan memeriksa dan mengonfirmasi pengajuan
                affiliate Anda.
              </p>

            </div>

          </div>


          {/* 3 */}

          <div className="flex gap-4">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-700
                text-sm
                font-bold
                text-white
              "
            >
              3
            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Dapatkan Link Referral
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Setelah disetujui, Anda mendapatkan link referral
                pribadi.
              </p>

            </div>

          </div>


          {/* 4 */}

          <div className="flex gap-4">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-700
                text-sm
                font-bold
                text-white
              "
            >
              4
            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Dapatkan Komisi
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Transaksi referral yang memenuhi ketentuan akan
                menghasilkan komisi.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INFORMASI STATUS
      ===================================================== */}

      {isInactive && (
        <section
          className="
            rounded-2xl
            border
            border-blue-200
            bg-blue-50
            p-6
          "
        >
          <div className="flex gap-4">

            <Handshake
              className="
                mt-0.5
                shrink-0
                text-blue-600
              "
              size={24}
            />

            <div>

              <h2 className="font-semibold text-blue-800">
                Pendaftaran Affiliate
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-blue-700">
                Setelah Anda mengajukan pendaftaran, status akan
                berubah menjadi menunggu konfirmasi. Admin akan
                melakukan pemeriksaan sebelum mengaktifkan akun
                affiliate Anda.
              </p>

            </div>

          </div>
        </section>
      )}


      {isPending && (
        <section
          className="
            rounded-2xl
            border
            border-yellow-200
            bg-yellow-50
            p-6
          "
        >
          <div className="flex gap-4">

            <Clock3
              className="
                mt-0.5
                shrink-0
                text-yellow-600
              "
              size={24}
            />

            <div>

              <h2 className="font-semibold text-yellow-800">
                Pengajuan Sedang Menunggu
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-yellow-700">
                Anda tidak perlu mengajukan kembali. Silakan
                menunggu konfirmasi dari admin.
              </p>

            </div>

          </div>
        </section>
      )}


      {isActive && (
        <section
          className="
            rounded-2xl
            border
            border-green-200
            bg-green-50
            p-6
          "
        >
          <div className="flex gap-4">

            <CheckCircle2
              className="
                mt-0.5
                shrink-0
                text-green-600
              "
              size={24}
            />

            <div>

              <h2 className="font-semibold text-green-800">
                Affiliate Aktif
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-green-700">
                Akun affiliate Anda sudah aktif. Silakan gunakan
                menu Referral, Komisi, dan Penarikan untuk mengelola
                aktivitas affiliate Anda.
              </p>

            </div>

          </div>
        </section>
      )}

    </div>
  );
}