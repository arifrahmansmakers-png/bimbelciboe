"use client";

import { X } from "lucide-react";
import { DashboardMenu } from "@/types/menu";
import MenuItem from "./MenuItem";
import { MenuType } from "./menu";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  menus: DashboardMenu[];
}

export default function MobileDrawer({
  open,
  onClose,
  title,
  menus,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/40
          transition-opacity
          duration-300
          z-40
          ${open ? "opacity-100" : "pointer-events-none opacity-0"}
        `}
      />

      {/* Drawer */}
      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        h-full
        w-72
        bg-white
        shadow-xl
        transition-transform
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
        `}
      >
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="font-bold text-[#1F3A5F]">
              {title}
            </h2>

            <p className="text-xs text-slate-500">
              Platform CBT & Tryout
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        <div className="space-y-2 p-4">
          {menus.map((item) => (
            <MenuItem
              key={item.href}
              item={item}
              onClick={onClose}
            />
          ))}
        </div>
      </aside>
    </>
  );
}