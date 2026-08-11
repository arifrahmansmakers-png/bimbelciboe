import {
  Users,
  BookOpen,
  FileQuestion,
  ClipboardList,
  Package,
  TicketPercent,
  HandCoins,
  ChartColumn,
} from "lucide-react";

import { DashboardMenu } from "@/types/menu";

export const adminMenus: DashboardMenu[] = [
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "Materi",
    href: "/dashboard/admin/materi",
    icon: BookOpen,
  },
  {
    title: "Soal",
    href: "/dashboard/admin/soal",
    icon: FileQuestion,
  },
  {
    title: "Tryout",
    href: "/dashboard/admin/tryout",
    icon: ClipboardList,
  },
  {
    title: "Paket",
    href: "/dashboard/admin/paket",
    icon: Package,
  },
  {
    title: "Voucher",
    href: "/dashboard/admin/voucher",
    icon: TicketPercent,
  },
  {
    title: "Affiliate",
    href: "/dashboard/admin/affiliate",
    icon: HandCoins,
  },
  {
    title: "Laporan",
    href: "/dashboard/admin/laporan",
    icon: ChartColumn,
  },
];