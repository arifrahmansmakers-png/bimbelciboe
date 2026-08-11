"use client";

import { ReactNode, useMemo, useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BottomNav from "./BottomNav";
import MobileDrawer from "./MobileDrawer";

import { memberMenus } from "@/data/menus/member";
import { adminMenus } from "@/data/menus/admin";
import { affiliateMenus } from "@/data/menus/affiliate";

import { useUser } from "@/context/UserContext";

interface DashboardShellProps {
  children: ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const { user } = useUser();

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const menus = useMemo(() => {
    switch (user.role) {
      case "admin":
        return adminMenus;

      case "affiliate":
        return affiliateMenus;

      default:
        return memberMenus;
    }
  }, [user.role]);

  const dashboardTitle = useMemo(() => {
    switch (user.role) {
      case "admin":
        return "Dashboard Admin";

      case "affiliate":
        return "Dashboard Affiliate";

      default:
        return "Dashboard Member";
    }
  }, [user.role]);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar Desktop */}

      <Sidebar
        title={dashboardTitle}
        menus={menus}
      />

      {/* Drawer Mobile */}

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={dashboardTitle}
        menus={menus}
      />

      {/* Content */}

      <div className="lg:ml-72">

        <Topbar
          title={dashboardTitle}
          onOpenMenu={() =>
            setDrawerOpen(true)
          }
        />

        <main
          className="
          min-h-[calc(100vh-64px)]
          bg-slate-50
          p-4
          pb-24
          md:p-6
          lg:p-8
          "
        >
          <div
            className="
            mx-auto
            w-full
            max-w-7xl
            "
          >
            {children}
          </div>
        </main>

      </div>

      {/* Bottom Navigation */}

      <BottomNav menus={menus} />

    </div>
  );
}