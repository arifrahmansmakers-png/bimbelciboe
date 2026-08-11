import Link from "next/link";

import DashboardCard from "@/components/dashboard/DashboardCard";

import { memberMenus } from "@/data/menus/member";

import { getMemberDashboard } from "@/lib/dashboard/member";

export default async function MemberDashboardPage() {

  const dashboard =
    await getMemberDashboard();

  return (

    <div className="space-y-8">

      <section>

        <h1
          className="
          text-3xl
          font-bold
          text-slate-800
          "
        >
          Selamat Datang 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Yuk lanjut belajar untuk menghadapi TKA.
        </p>

      </section>

      <section
        className="
        grid
        gap-5
        md:grid-cols-2
        xl:grid-cols-4
        "
      >

        <DashboardCard
          title="Materi"
          value={dashboard.statistic.materiSelesai.toString()}
          description="Materi selesai"
        />

        <DashboardCard
          title="Latihan"
          value={dashboard.statistic.latihanSelesai.toString()}
          description="Latihan selesai"
        />

        <DashboardCard
          title="Tryout"
          value={dashboard.statistic.tryoutSelesai.toString()}
          description="Tryout selesai"
        />

        <DashboardCard
          title="Rata-rata"
          value={dashboard.statistic.rataRata.toString()}
          description="Nilai"
        />

      </section>

      <section>

        <h2
          className="
          mb-4
          text-xl
          font-semibold
          "
        >
          Menu Belajar
        </h2>

        <div
          className="
          grid
          gap-5
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
                rounded-2xl
                border
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
                "
              >

                <div
                  className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-700
                  text-white
                  "
                >
                  <Icon size={28} />
                </div>

                <h3
                  className="
                  text-lg
                  font-semibold
                  "
                >
                  {menu.title}
                </h3>

              </Link>

            );

          })}

        </div>

      </section>

      <section
        className="
        rounded-2xl
        border
        bg-white
        p-6
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          "
        >
          Lanjut Belajar
        </h2>

        {dashboard.continueLearning ? (

          <Link
            href={
              dashboard.continueLearning.href
            }
            className="
            mt-5
            inline-flex
            rounded-xl
            bg-blue-700
            px-5
            py-3
            text-white
            "
          >
            {dashboard.continueLearning.title}
          </Link>

        ) : (

          <p
            className="
            mt-4
            text-slate-500
            "
          >
            Belum ada materi yang pernah dipelajari.
          </p>

        )}

      </section>

    </div>

  );
}