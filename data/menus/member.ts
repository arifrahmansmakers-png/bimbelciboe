import {
  Home,
  BookOpen,
  FileText,
  ClipboardCheck,
  BarChart3,
  BadgePercent,
  User,
} from "lucide-react";

import { DashboardMenu } from "@/types/menu";

export const memberMenus: DashboardMenu[] = [
  {
    title: "Dashboard",
    href: "/dashboard/member",
    icon: Home,
  },
  {
    title: "Materi",
    href: "/dashboard/member/materi",
    icon: BookOpen,
  },
  {
    title: "Latihan",
    href: "/dashboard/member/latihan",
    icon: FileText,
  },
  {
    title: "Tryout",
    href: "/dashboard/member/tryout",
    icon: ClipboardCheck,
  },
  {
    title: "Hasil",
    href: "/dashboard/member/hasil",
    icon: BarChart3,
  },
  {
    title: "Rekomendasi",
    href: "/dashboard/member/rekomendasi",
    icon: BadgePercent,
  },
  {
    title: "Profil",
    href: "/dashboard/member/profil",
    icon: User,
  },
];