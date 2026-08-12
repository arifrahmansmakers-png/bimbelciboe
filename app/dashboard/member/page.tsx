import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Dumbbell,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";

import { memberMenus } from "@/data/menus/member";

import { getMemberDashboard } from "@/lib/dashboard/member";

export default async function MemberDashboardPage() {
  const dashboard = await getMemberDashboard();

  const statistic = dashboard.statistic;

  return (
    <div className="space-y-8">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-[#0f2747]
        via-[#173b63]
        to-[#24527d]
        px-6
        py-8
        text-white
        shadow-lg
        md:px-8
        md:py-10
        "
      >

        {/* Decorative circles */}

        <div
          className="
          absolute
          -right-16
          -top-16
          h-48
          w-48
          rounded-full
          bg-orange-400/20
          "
        />

        <div
          className="
          absolute
          -bottom-20
          right-20
          h-40
          w-40
          rounded-full
          bg-blue-300/10
          "
        />

        <div className="relative z-10 max-w-3xl">

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
            backdrop-blur-sm
            "
          >
            <Sparkles
              size={16}
              className="text-orange-300"
            />

            Ruang Belajar
          </div>

          <h1
            className="
            text-3xl
            font-bold
            tracking-tight
            md:text-4xl
            "
          >
            Selamat Datang 👋
          </h1>

          <p
            className="
            mt-3
            max-w-2xl
            text-sm
            leading-relaxed
            text-blue-100
            md:text-base
            "
          >
            Yuk lanjutkan perjalanan belajar kamu.
            Sedikit demi sedikit, konsisten setiap hari,
            menuju hasil terbaik untuk menghadapi TKA.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href="/dashboard/member/materi"
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-orange-400
              "
            >
              <BookOpen size={18} />

              Mulai Belajar

              <ArrowRight size={17} />
            </Link>

            <Link
              href="/dashboard/member/tryout"
              className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white/10
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/20
              "
            >
              <Trophy size={18} />

              Coba Tryout
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          STATISTIK
      ===================================================== */}

      <section>

        <div className="mb-5 flex items-end justify-between">

          <div>

            <h2
              className="
              text-xl
              font-bold
              text-slate-800
              "
            >
              Perjalanan Belajar
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Lihat perkembangan belajar kamu.
            </p>

          </div>

          <div
            className="
            hidden
            items-center
            gap-2
            rounded-full
            bg-orange-50
            px-3
            py-1.5
            text-xs
            font-medium
            text-orange-700
            sm:flex
            "
          >
            <Flame size={15} />

            Tetap konsisten!
          </div>

        </div>


        <div
          className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
          "
        >

          {/* Materi */}

          <div
            className="
            group
            rounded-2xl
            border
            border-blue-100
            bg-gradient-to-br
            from-blue-50
            to-white
            p-5
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-md
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Materi
                </p>

                <p className="mt-2 text-3xl font-bold text-[#173b63]">
                  {statistic.materiSelesai}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Materi selesai
                </p>

              </div>

              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                text-blue-700
                "
              >
                <BookOpen size={22} />
              </div>

            </div>

          </div>


          {/* Latihan */}

          <div
            className="
            group
            rounded-2xl
            border
            border-purple-100
            bg-gradient-to-br
            from-purple-50
            to-white
            p-5
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-md
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Latihan
                </p>

                <p className="mt-2 text-3xl font-bold text-purple-800">
                  {statistic.latihanSelesai}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Latihan selesai
                </p>

              </div>

              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-purple-100
                text-purple-700
                "
              >
                <Dumbbell size={22} />
              </div>

            </div>

          </div>


          {/* Tryout */}

          <div
            className="
            group
            rounded-2xl
            border
            border-orange-100
            bg-gradient-to-br
            from-orange-50
            to-white
            p-5
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-md
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Tryout
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-700">
                  {statistic.tryoutSelesai}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Tryout selesai
                </p>

              </div>

              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-orange-100
                text-orange-600
                "
              >
                <Trophy size={22} />
              </div>

            </div>

          </div>


          {/* Nilai */}

          <div
            className="
            group
            rounded-2xl
            border
            border-green-100
            bg-gradient-to-br
            from-green-50
            to-white
            p-5
            shadow-sm
            transition
            hover:-translate-y-1
            hover:shadow-md
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  Rata-rata
                </p>

                <p className="mt-2 text-3xl font-bold text-green-700">
                  {statistic.rataRata}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Nilai rata-rata
                </p>

              </div>

              <div
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-green-700
                "
              >
                <Target size={22} />
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK ACTION
      ===================================================== */}

      <section>

        <div className="mb-5">

          <h2 className="text-xl font-bold text-slate-800">
            Mulai Belajar
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Pilih aktivitas yang ingin kamu lakukan hari ini.
          </p>

        </div>


        <div
          className="
          grid
          gap-4
          sm:grid-cols-2
          xl:grid-cols-3
          "
        >

          {memberMenus.map((menu) => {

            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                duration-200
                hover:-translate-y-1
                hover:border-blue-200
                hover:shadow-lg
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                    flex
                    h-13
                    w-13
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-[#173b63]
                    transition
                    group-hover:bg-[#173b63]
                    group-hover:text-white
                    "
                  >
                    <Icon size={25} />
                  </div>


                  <div className="min-w-0 flex-1">

                    <h3
                      className="
                      font-semibold
                      text-slate-800
                      "
                    >
                      {menu.title}
                    </h3>

                    <p
                      className="
                      mt-1
                      text-xs
                      text-slate-500
                      "
                    >
                      Buka menu {menu.title.toLowerCase()}
                    </p>

                  </div>


                  <ArrowRight
                    size={18}
                    className="
                    text-slate-300
                    transition
                    group-hover:translate-x-1
                    group-hover:text-orange-500
                    "
                  />

                </div>

              </Link>
            );

          })}

        </div>

      </section>


      {/* =====================================================
          LANJUT BELAJAR
      ===================================================== */}

      <section
        className="
        overflow-hidden
        rounded-2xl
        border
        border-orange-100
        bg-gradient-to-r
        from-orange-50
        via-white
        to-blue-50
        p-6
        md:p-7
        "
      >

        <div
          className="
          flex
          flex-col
          gap-6
          md:flex-row
          md:items-center
          md:justify-between
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
              rounded-xl
              bg-orange-100
              text-orange-600
              "
            >
              <GraduationCap size={25} />
            </div>

            <div>

              <h2
                className="
                text-xl
                font-bold
                text-slate-800
                "
              >
                Lanjutkan Belajar
              </h2>

              {dashboard.continueLearning ? (

                <p className="mt-1 text-sm text-slate-500">
                  Yuk lanjutkan materi yang terakhir kamu pelajari.
                </p>

              ) : (

                <p className="mt-1 text-sm text-slate-500">
                  Kamu belum memiliki aktivitas belajar.
                  Yuk mulai belajar sekarang.
                </p>

              )}

            </div>

          </div>


          {dashboard.continueLearning ? (

            <Link
              href={dashboard.continueLearning.href}
              className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#173b63]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#0f2747]
              "
            >
              {dashboard.continueLearning.title}

              <ArrowRight size={17} />
            </Link>

          ) : (

            <Link
              href="/dashboard/member/materi"
              className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-orange-400
              "
            >
              Mulai Belajar

              <ArrowRight size={17} />
            </Link>

          )}

        </div>

      </section>


      {/* =====================================================
          MOTIVATION
      ===================================================== */}

      <section
        className="
        rounded-2xl
        border
        border-blue-100
        bg-blue-50/70
        px-6
        py-5
        "
      >

        <div className="flex items-start gap-3">

          <CheckCircle2
            size={21}
            className="mt-0.5 shrink-0 text-blue-700"
          />

          <div>

            <p className="font-semibold text-[#173b63]">
              Belajar sedikit setiap hari lebih baik daripada
              belajar banyak tetapi tidak konsisten.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tetap semangat. Setiap latihan yang kamu selesaikan
              membawa kamu selangkah lebih dekat menuju targetmu.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}