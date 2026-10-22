import { SubjectMeta, TKAPaket, MemberProgressItem } from "./types";
import { paketSDNumerasi } from "./sd_numerasi";
import { paketSDLiterasi } from "./sd_literasi";
import { paketBahasaInggris } from "./bahasa_inggris";
import { paketSMPNumerasi } from "./smp_tka";
import { paketSMANumerasi } from "./sma_tka";

export * from "./types";
export * from "./sd_numerasi";
export * from "./sd_literasi";
export * from "./bahasa_inggris";
export * from "./smp_tka";
export * from "./sma_tka";

// 3 MATA PELAJARAN UTAMA RESMI TKA (Total 30 Paket: 10 Paket per Mapel)
export const tkaMemberSubjects: SubjectMeta[] = [
  {
    id: "bahasa-indonesia",
    name: "Bahasa Indonesia (Literasi)",
    jenjang: "SD/MI",
    iconName: "BookOpen",
    tagline: "10 Paket: Teks cerita ramah anak kelas 6, fabel, candi nusantara, hingga literasi sains.",
    color: {
      bg: "bg-emerald-500",
      border: "border-emerald-400",
      text: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-800",
    },
  },
  {
    id: "matematika",
    name: "Matematika (Numerasi)",
    jenjang: "SD/MI",
    iconName: "Calculator",
    tagline: "10 Paket: Operasi hitung ceria, grafik batang/lingkaran kantin sekolah, hingga HOTS analitik.",
    color: {
      bg: "bg-blue-500",
      border: "border-blue-400",
      text: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
    },
  },
  {
    id: "bahasa-inggris",
    name: "Bahasa Inggris (English Literacy)",
    jenjang: "SD/MI",
    iconName: "Globe",
    tagline: "10 Paket: Reading comprehension, daily routines, culinary, satwa endemik, hingga global texts.",
    color: {
      bg: "bg-purple-600",
      border: "border-purple-400",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-800",
    },
  },
];

// Gabungan seluruh paket soal (30 Paket Utama TKA + SMP/SMA)
export const allTKAPakets: TKAPaket[] = [
  ...paketSDLiterasi, // 10 paket Bahasa Indonesia
  ...paketSDNumerasi, // 10 paket Matematika Numerasi
  ...paketBahasaInggris, // 10 paket Bahasa Inggris
  ...paketSMPNumerasi,
  ...paketSMANumerasi,
];

// Helper mencari paket berdasarkan ID
export function getTKAPaketById(id: string): TKAPaket | undefined {
  return allTKAPakets.find((p) => p.id === id);
}

// Helper mendapatkan seluruh 10 paket per subjek
export function getTKAPaketsBySubject(subjectId: string): TKAPaket[] {
  if (subjectId === "bahasa-indonesia") {
    return paketSDLiterasi.sort((a, b) => a.paketNumber - b.paketNumber);
  }
  if (subjectId === "matematika") {
    return paketSDNumerasi.sort((a, b) => a.paketNumber - b.paketNumber);
  }
  if (subjectId === "bahasa-inggris") {
    return paketBahasaInggris.sort((a, b) => a.paketNumber - b.paketNumber);
  }

  return allTKAPakets
    .filter((p) => p.subjectId === subjectId)
    .sort((a, b) => a.paketNumber - b.paketNumber);
}

// Helper memeriksa apakah paket terbuka (Unlocked)
// Syarat: Paket 1 selalu terbuka. Paket N terbuka jika Paket N-1 memiliki skor > 50.
export function isTKAPaketUnlocked(
  subjectId: string,
  paketNumber: number,
  progressMap: Record<string, MemberProgressItem>
): boolean {
  if (paketNumber <= 1) return true;

  // Cari paket sebelumnya
  const prevPakets = getTKAPaketsBySubject(subjectId);
  const prevPaket = prevPakets.find((p) => p.paketNumber === paketNumber - 1);

  if (!prevPaket) return true;

  const prevProgress = progressMap[prevPaket.id];
  // Syarat user: "dengan catatan mendapatkan nilai lebih dari 50"
  if (prevProgress && (prevProgress.passed || prevProgress.score > 50)) {
    return true;
  }

  return false;
}
