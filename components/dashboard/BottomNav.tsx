"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MenuType } from "./menu";

interface Props {
  menus: MenuType[];
}

export default function BottomNav({
  menus,
}: Props) {
  const pathname = usePathname();

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      z-40
      border-t
      bg-white/95
      backdrop-blur
      shadow-[0_-4px_12px_rgba(0,0,0,0.08)]
      lg:hidden
      "
    >
      <div className="grid grid-cols-5">
        {menus.slice(0, 5).map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center py-2 text-xs transition",
                active
                  ? "text-[#1F3A5F]"
                  : "text-slate-500 hover:text-[#1F3A5F]"
              )}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.6 : 2}
              />

              <span className="mt-1">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}