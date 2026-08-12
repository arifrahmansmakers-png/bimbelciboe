"use client";

import { ReactNode, useMemo, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import MobileDrawer from "./MobileDrawer";

import { memberMenus } from "@/data/menus/member";
import { adminMenus } from "@/data/menus/admin";
import { partnerMenus } from "@/data/menus/partner";

import { useUser } from "@/context/UserContext";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const user = useUser();

  const [drawerOpen, setDrawerOpen] = useState(false);

  /*
   * =====================================================
   * MENU BERDASARKAN ROLE
   * =====================================================
   */

  const menus = useMemo(() => {
    switch (user.role) {
      case "admin":
        return adminMenus;

      case "partner":
        return partnerMenus;

      case "member":
      default:
        return memberMenus;
    }
  }, [user.role]);

  /*
   * =====================================================
   * JUDUL DASHBOARD
   * =====================================================
   */

  const dashboardTitle = useMemo(() => {
    switch (user.role) {
      case "admin":
        return "Dashboard Admin";

      case "partner":
        return "Dashboard Partner";

      case "member":
      default:
        return "Dashboard Member";
    }
  }, [user.role]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-50">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          -z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-32
            -top-32
            h-96
            w-96
            rounded-full
            bg-blue-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/3
            h-96
            w-96
            rounded-full
            bg-indigo-200/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-1/3
            h-80
            w-80
            rounded-full
            bg-cyan-100/20
            blur-3xl
          "
        />
      </div>

      {/* =================================================
          SIDEBAR DESKTOP
      ================================================= */}

      <div
        className="
          hidden
          lg:block
          fixed
          inset-y-0
          left-0
          z-40
          w-72
        "
      >
        <Sidebar
          title={dashboardTitle}
          menus={menus}
        />
      </div>

      {/* =================================================
          MOBILE DRAWER
      ================================================= */}

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={dashboardTitle}
        menus={menus}
      />

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="lg:ml-72">

        {/* TOPBAR */}

        <div
          className="
            sticky
            top-0
            z-30
          "
        >
          <Topbar
            title={dashboardTitle}
            onOpenMenu={() =>
              setDrawerOpen(true)
            }
          />
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <main
          className="
            min-h-[calc(100vh-64px)]
            bg-transparent
            px-4
            pb-28
            pt-6
            sm:px-6
            md:pt-8
            lg:px-8
            lg:pb-10
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >

            {/* Content container */}

            <div
              className="
                rounded-3xl
                border
                border-white/70
                bg-white/35
                p-1
                shadow-[0_8px_40px_rgba(15,23,42,0.04)]
                backdrop-blur-sm
              "
            >
              <div
                className="
                  rounded-[1.4rem]
                  bg-white/75
                  p-4
                  sm:p-6
                  lg:p-8
                  backdrop-blur-md
                "
              >
                {children}
              </div>
            </div>

          </div>
        </main>

      </div>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <BottomNav
        menus={menus}
      />

    </div>
  );
}