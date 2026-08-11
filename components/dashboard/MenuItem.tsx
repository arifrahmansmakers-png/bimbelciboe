"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MenuType } from "./menu";

interface Props {
  item: MenuType;
  onClick?: () => void;
}

export default function MenuItem({
  item,
  onClick,
}: Props) {
  const pathname = usePathname();

  const active = pathname === item.href;

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
        active
          ? "bg-[#1F3A5F] text-white shadow"
          : "text-slate-600 hover:bg-slate-100 hover:text-[#1F3A5F]"
      )}
    >
      <Icon size={20} />

      <span className="font-medium">
        {item.title}
      </span>
    </Link>
  );
}