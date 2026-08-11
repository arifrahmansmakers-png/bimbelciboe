import { MemberDashboardData } from "@/types/dashboard";

export async function getMemberDashboardRepository(
  uid: string
): Promise<MemberDashboardData> {
  return {
    statistic: {
      materiSelesai: 0,
      latihanSelesai: 0,
      tryoutSelesai: 0,
      rataRata: 0,
    },

    continueLearning: null,
  };
}