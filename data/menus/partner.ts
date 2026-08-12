import {
  Home,
  Users,
  Wallet,
  Settings,
} from "lucide-react";

import { DashboardMenu } from "@/types/menu";

export const partnerMenus: DashboardMenu[] = [
  {
    title: "Dashboard",
    href: "/dashboard/partner",
    icon: Home,
  },
  {
    title: "Pengguna",
    href: "/dashboard/partner/pengguna",
    icon: Users,
  },
  {
    title: "Pendapatan",
    href: "/dashboard/partner/pendapatan",
    icon: Wallet,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/partner/pengaturan",
    icon: Settings,
  },
];