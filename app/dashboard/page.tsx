import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  switch (user.role) {
    case "admin":
      redirect("/dashboard/admin");

    case "affiliate":
      redirect("/dashboard/affiliate");

    case "member":
    default:
      redirect("/dashboard/member");
  }
}