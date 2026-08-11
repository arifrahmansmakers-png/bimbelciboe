import { LucideIcon } from "lucide-react";

export interface DashboardMenu {
  title: string;
  href: string;
  icon: LucideIcon;

  color?: string;
  description?: string;

  badge?: string | number;

  disabled?: boolean;
}