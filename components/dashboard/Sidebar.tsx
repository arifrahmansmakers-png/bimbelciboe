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
      h-screen
      w-72
      flex-col
      border-r
      bg-white
      "
    >
      <div className="border-b p-6">
        <h1 className="text-xl font-bold text-[#1F3A5F]">
          {title}
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Platform CBT & Tryout TKA
        </p>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {menus.map((item) => (
          <MenuItem
            key={item.href}
            item={item}
          />
        ))}
      </nav>

      <div className="border-t p-4">
        <p className="text-center text-xs text-slate-400">
          © 2026 Bimbel CBT
        </p>
      </div>
    </aside>
  );
}