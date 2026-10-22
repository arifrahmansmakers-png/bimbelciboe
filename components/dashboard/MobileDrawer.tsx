"use client";

import { X, GraduationCap, Lock } from "lucide-react";
import { DashboardMenu } from "@/types/menu";
import MenuItem from "./MenuItem";
import { MenuType } from "./menu";
import { useUser } from "@/context/UserContext";
import { normalizeJenjang } from "@/data/tka_member";

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
  const user = useUser();
  const registeredJenjang = user?.role === "member" ? normalizeJenjang(user?.educationLevelId) : null;
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
          {registeredJenjang && (
            <div className="mb-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={15} className="text-blue-600" />
                  <span>Jenjang Siswa</span>
                </span>
                <span className="rounded-lg bg-blue-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                  {registeredJenjang}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                <Lock size={11} className="text-amber-500 shrink-0" />
                <span>Menu tingkat lain dikunci</span>
              </div>
            </div>
          )}

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