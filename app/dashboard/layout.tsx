import { ReactNode } from "react";
import { redirect } from "next/navigation";

import DashboardShell from "@/components/dashboard/DashboardShell";

import { getCurrentUser } from "@/lib/auth";

import { UserProvider } from "@/context/UserContext";

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: Props) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/login");
    }

    return (
      <UserProvider user={user}>
        <DashboardShell>
          {children}
        </DashboardShell>
      </UserProvider>
    );
  } catch (error) {
    console.error(error);

    redirect("/login");
  }
}