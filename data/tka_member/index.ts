import { SubjectMeta, TKAPaket, MemberProgressItem } from "./types";
import {
  ALL_JENJANG,
  ALL_SUBJECTS,
  COMPREHENSIVE_BANK_PAKETS,
  getSubjectsByJenjang,
} from "./comprehensive_bank";

export * from "./types";
export * from "./comprehensive_bank";

// Re-export untuk backward-compatibility
export const tkaMemberSubjects: SubjectMeta[] = ALL_SUBJECTS;
export const allTKAPakets: TKAPaket[] = COMPREHENSIVE_BANK_PAKETS;

// Helper mencari paket berdasarkan ID
export function getTKAPaketById(id: string): TKAPaket | undefined {
  return allTKAPakets.find((p) => p.id === id);
}

// Helper mendapatkan seluruh paket per subjek (latihan atau tryout)
export function getTKAPaketsBySubject(
  subjectId: string,
  category?: "latihan" | "tryout"
): TKAPaket[] {
  let list = allTKAPakets.filter(
    (p) => p.subjectId === subjectId || p.subjectId === subjectId.replace("sd-", "")
  );

  if (category) {
    list = list.filter((p) => (p.category || "latihan") === category);
  }

  return list.sort((a, b) => a.paketNumber - b.paketNumber);
}

// Helper memeriksa apakah paket terbuka (Unlocked)
// Syarat: Paket 1 selalu terbuka. Paket N terbuka jika Paket N-1 memiliki skor > 50.
export function isTKAPaketUnlocked(
  subjectId: string,
  paketNumber: number,
  progressMap: Record<string, MemberProgressItem>,
  category?: "latihan" | "tryout"
): boolean {
  if (category === "tryout") return true;
  if (paketNumber <= 1) return true;

  // Cari paket sebelumnya
  const prevPakets = getTKAPaketsBySubject(subjectId, "latihan");
  const prevPaket = prevPakets.find((p) => p.paketNumber === paketNumber - 1);

  if (!prevPaket) return true;

  const prevProgress = progressMap[prevPaket.id];
  // Syarat user: "dengan catatan mendapatkan nilai lebih dari 50"
  if (prevProgress && (prevProgress.passed || prevProgress.score > 50)) {
    return true;
  }

  return false;
}

// Normalisasi jenjang pendidikan dari data user (SD, SMP, atau SMA)
export function normalizeJenjang(raw?: string | null): "SD" | "SMP" | "SMA" {
  if (!raw) return "SD";
  const upper = raw.trim().toUpperCase();
  if (upper.includes("SMA") || upper.includes("SMK") || upper.includes("MA")) return "SMA";
  if (upper.includes("SMP") || upper.includes("MTS")) return "SMP";
  return "SD";
}

export function getJenjangLabel(jenjang: "SD" | "SMP" | "SMA"): string {
  switch (jenjang) {
    case "SD":
      return "SD / MI (Kelas 4-6)";
    case "SMP":
      return "SMP / MTs (Kelas 7-9)";
    case "SMA":
      return "SMA / MA (Kelas 10-12)";
  }
}
