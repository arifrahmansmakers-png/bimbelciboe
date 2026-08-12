import {
  BookOpen,
  Dumbbell,
  Trophy,
  BarChart3,
  User,
  Handshake,
} from "lucide-react";

import { DashboardMenu } from "@/types/menu";

export const memberMenus: DashboardMenu[] = [
  {
    title: "Materi",
    href: "/dashboard/member/materi",
    icon: BookOpen,
  },
  {
    title: "Latihan",
    href: "/dashboard/member/latihan",
    icon: Dumbbell,
  },
  {
    title: "Tryout",
    href: "/dashboard/member/tryout",
    icon: Trophy,
  },
  {
    title: "Hasil",
    href: "/dashboard/member/hasil",
    icon: BarChart3,
  },
  {
    title: "Profil",
    href: "/dashboard/member/profil",
    icon: User,
  },
  {
    title: "Affiliate",
    href: "/dashboard/member/affiliate",
    icon: Handshake,
  },
];