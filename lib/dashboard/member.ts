import { getCurrentUser } from "@/lib/auth";

import {
  getMemberDashboardRepository,
} from "@/lib/repository/dashboardRepository";
    
export async function getMemberDashboard() {

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User belum login.");
  }

  return getMemberDashboardRepository(user.uid);
}