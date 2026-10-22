export type TipeSoalTKA = "PG" | "MCMA" | "BS";

export interface TKASoal {
  id: string;
  nomor: number;
  tipe: TipeSoalTKA;
  stimulus?: string;
  pertanyaan: string;
  opsi?: string[];
  kunci: string | string[]; // Single string like "A" or "BENAR", or array of strings for MCMA like ["A", "C"]
  svgGraphic?: string; // Inline SVG markup for charts, diagrams, illustrations
  pembahasan: string; // Penjelasan terperinci langkah demi langkah
  konsepKunci?: string; // Rangkuman esensi teori
}

export interface TKAPaket {
  id: string; // e.g. "sd-mat-p1" or "sd-mat-to1"
  subjectId: string; // e.g. "matematika"
  jenjang: "SD/MI" | "SMP/MTs" | "SMA";
  mapelName: string;
  category?: "latihan" | "tryout"; // default "latihan"
  paketNumber: number; // 1 s/d 10 (latihan) atau 1 s/d 3 (tryout)
  title: string;
  description: string;
  levelKesukaran: "Level 1: Dasar & Pemahaman" | "Level 2: Aplikasi & Terapan" | "Level 3: Analisis & HOTS Mahir";
  durasiMenit: number;
  passingScore: number; // default: 50
  totalSoal: number;
  soalList: TKASoal[];
}

export interface MemberProgressItem {
  paketId: string;
  score: number;
  passed: boolean; // score > 50
  completedAt: string;
  correctAnswers: number;
  totalQuestions: number;
  userAnswers: Record<string, any>;
}

export interface SubjectMeta {
  id: string;
  name: string;
  jenjang: "SD/MI" | "SMP/MTs" | "SMA";
  iconName: string;
  tagline: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
  };
}
