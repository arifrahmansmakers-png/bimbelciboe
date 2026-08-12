"use client";

import MenuItem from "./MenuItem";
import { DashboardMenu } from "@/types/menu";

interface Props {
  title: string;
  menus: DashboardMenu[];
}

export default function Sidebar({
  title,
  menus,
}: Props) {
  return (
    <aside
      className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        z-40
        h-screen
        w-72
        flex-col
        overflow-hidden
        border-r
        border-slate-200/80
        bg-white
        shadow-[4px_0_24px_rgba(15,23,42,0.04)]
      "
    >

      {/* =================================================
          BRAND / HEADER
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
          bg-gradient-to-br
          from-blue-700
          via-blue-600
          to-indigo-700
          px-6
          py-6
          text-white
        "
      >

        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -right-8
            -top-8
            h-28
            w-28
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            -left-8
            h-32
            w-32
            rounded-full
            bg-white/5
          "
        />

        <div className="relative">

          {/* Logo */}

          <div
            className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-white
              text-xl
              font-black
              text-blue-700
              shadow-lg
              shadow-blue-900/20
            "
          >
            BC
          </div>

          {/* Title */}

          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-1.5
              text-xs
              leading-5
              text-blue-100
            "
          >
            Platform CBT & Tryout TKA
          </p>

        </div>
      </div>

      {/* =================================================
          MENU
      ================================================= */}

      <div className="flex min-h-0 flex-1 flex-col">

        <div className="px-5 pb-2 pt-5">

          <p
            className="
              px-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-slate-400
            "
          >
            Menu Utama
          </p>

        </div>

        <nav
          className="
            flex-1
            space-y-1.5
            overflow-y-auto
            px-4
            pb-5
            scrollbar-thin
            scrollbar-thumb-slate-200
            scrollbar-track-transparent
          "
        >
          {menus.map((item) => (
            <MenuItem
              key={item.href}
              item={item}
            />
          ))}
        </nav>

      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div
        className="
          border-t
          border-slate-100
          bg-slate-50/70
          px-5
          py-4
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200/80
            bg-white
            px-3
            py-3
            shadow-sm
          "
        >

          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              text-sm
              font-bold
              text-blue-700
            "
          >
            B
          </div>

          <div className="min-w-0">

            <p
              className="
                truncate
                text-xs
                font-semibold
                text-slate-700
              "
            >
              Bimbel Ciboe
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                text-slate-400
              "
            >
              © 2026
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}