export interface DashboardStatistic {
  materiSelesai: number;
  latihanSelesai: number;
  tryoutSelesai: number;
  rataRata: number;
}

export interface ContinueLearning {
  subjectId: string;
  chapterId: string;
  title: string;
  href: string;
}

export interface MemberDashboardData {
  statistic: DashboardStatistic;
  continueLearning: ContinueLearning | null;
}