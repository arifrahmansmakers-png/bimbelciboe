import {
  Home,
  Users,
  HandCoins,
  Banknote,
} from "lucide-react";

import { DashboardMenu } from "@/types/menu";

export const affiliateMenus: DashboardMenu[] = [
  {
    title: "Dashboard",
    href: "/dashboard/affiliate",
    icon: Home,
  },
  {
    title: "Referral",
    href: "/dashboard/affiliate/referral",
    icon: Users,
  },
  {
    title: "Komisi",
    href: "/dashboard/affiliate/komisi",
    icon: HandCoins,
  },
  {
    title: "Penarikan",
    href: "/dashboard/affiliate/penarikan",
    icon: Banknote,
  },
];