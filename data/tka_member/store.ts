"use client";

import { TKAPaket, TKASoal } from "./types";
import { COMPREHENSIVE_BANK_PAKETS, ALL_SUBJECTS } from "./comprehensive_bank";

const STORAGE_KEY = "tka_comprehensive_bank_v4";

// Helper mengambil data paket (mengutamakan hasil edit admin dari localStorage)
export function getAllCustomPakets(): TKAPaket[] {
  if (typeof window === "undefined") {
    return COMPREHENSIVE_BANK_PAKETS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Gagal membaca bank soal kustom:", err);
  }

  return COMPREHENSIVE_BANK_PAKETS;
}

// Simpan seluruh data paket ke localStorage
export function saveAllCustomPakets(pakets: TKAPaket[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pakets));
    // Dispatch custom event agar tab/komponen lain langsung terupdate
    window.dispatchEvent(new Event("tka_bank_soal_updated"));
  } catch (err) {
    console.error("Gagal menyimpan bank soal kustom:", err);
  }
}

// Cari paket berdasarkan ID
export function getCustomPaketById(id: string): TKAPaket | undefined {
  const all = getAllCustomPakets();
  return all.find((p) => p.id === id);
}

// Cari seluruh paket berdasarkan Subject ID & Kategori opsional
export function getCustomPaketsBySubject(
  subjectId: string,
  category?: "latihan" | "tryout"
): TKAPaket[] {
  const all = getAllCustomPakets();
  let filtered = all.filter(
    (p) => p.subjectId === subjectId || p.subjectId === subjectId.replace("sd-", "")
  );

  if (category) {
    filtered = filtered.filter((p) => (p.category || "latihan") === category);
  }

  return filtered.sort((a, b) => a.paketNumber - b.paketNumber);
}

// Cari paket berdasarkan Jenjang, Subject ID, dan Kategori
export function getCustomPaketsByJenjangAndSubject(
  jenjangCode: "SD" | "SMP" | "SMA",
  subjectId: string,
  category?: "latihan" | "tryout"
): TKAPaket[] {
  const mapping: Record<string, string> = {
    SD: "SD/MI",
    SMP: "SMP/MTs",
    SMA: "SMA",
  };
  const targetJenjang = mapping[jenjangCode] || "SD/MI";

  const all = getAllCustomPakets();
  let filtered = all.filter(
    (p) =>
      p.jenjang === targetJenjang &&
      (p.subjectId === subjectId || p.subjectId === subjectId.replace("sd-", ""))
  );

  if (category) {
    filtered = filtered.filter((p) => (p.category || "latihan") === category);
  }

  return filtered.sort((a, b) => a.paketNumber - b.paketNumber);
}

// Update 1 butir soal
export function updateCustomSoal(
  paketId: string,
  soalId: string,
  updatedData: Partial<TKASoal>
): boolean {
  const all = getAllCustomPakets();
  const paket = all.find((p) => p.id === paketId);
  if (!paket) return false;

  const soalIdx = paket.soalList.findIndex((s) => s.id === soalId);
  if (soalIdx === -1) return false;

  paket.soalList[soalIdx] = {
    ...paket.soalList[soalIdx],
    ...updatedData,
  };

  saveAllCustomPakets(all);
  return true;
}

// Tambah 1 butir soal baru ke paket
export function addCustomSoal(
  paketId: string,
  soalInput: Omit<TKASoal, "id" | "nomor">
): TKASoal | null {
  const all = getAllCustomPakets();
  const paket = all.find((p) => p.id === paketId);
  if (!paket) return null;

  const nextNomor = paket.soalList.length + 1;
  const newId = `${paket.id}-custom-${Date.now()}`;

  const newSoal: TKASoal = {
    id: newId,
    nomor: nextNomor,
    ...soalInput,
  };

  paket.soalList.push(newSoal);
  paket.totalSoal = paket.soalList.length;

  saveAllCustomPakets(all);
  return newSoal;
}

// Hapus 1 butir soal dari paket
export function deleteCustomSoal(paketId: string, soalId: string): boolean {
  const all = getAllCustomPakets();
  const paket = all.find((p) => p.id === paketId);
  if (!paket) return false;

  const initialLen = paket.soalList.length;
  paket.soalList = paket.soalList.filter((s) => s.id !== soalId);

  if (paket.soalList.length === initialLen) return false;

  // Re-numbering urutan nomor soal
  paket.soalList.forEach((s, idx) => {
    s.nomor = idx + 1;
  });
  paket.totalSoal = paket.soalList.length;

  saveAllCustomPakets(all);
  return true;
}

// Pindah 1 butir soal dari satu paket ke paket lain
export function moveCustomSoal(
  sourcePaketId: string,
  targetPaketId: string,
  soalId: string
): boolean {
  if (sourcePaketId === targetPaketId) return false;

  const all = getAllCustomPakets();
  const sourcePaket = all.find((p) => p.id === sourcePaketId);
  const targetPaket = all.find((p) => p.id === targetPaketId);

  if (!sourcePaket || !targetPaket) return false;

  const soalIdx = sourcePaket.soalList.findIndex((s) => s.id === soalId);
  if (soalIdx === -1) return false;

  // Ambil butir soal
  const [soalToMove] = sourcePaket.soalList.splice(soalIdx, 1);
  sourcePaket.totalSoal = sourcePaket.soalList.length;

  // Re-number source paket
  sourcePaket.soalList.forEach((s, idx) => {
    s.nomor = idx + 1;
  });

  // Pasang nomor baru di target paket
  soalToMove.nomor = targetPaket.soalList.length + 1;
  soalToMove.id = `${targetPaket.id}-moved-${Date.now()}`;
  targetPaket.soalList.push(soalToMove);
  targetPaket.totalSoal = targetPaket.soalList.length;

  saveAllCustomPakets(all);
  return true;
}

// Tambah Paket Soal Baru
export function addCustomPaket(
  paketInput: Omit<TKAPaket, "id" | "totalSoal" | "soalList"> & {
    initialSoalList?: TKASoal[];
  }
): TKAPaket {
  const all = getAllCustomPakets();
  const newId = `${paketInput.subjectId}-custom-${Date.now()}`;

  const newPaket: TKAPaket = {
    ...paketInput,
    id: newId,
    category: paketInput.category || "latihan",
    totalSoal: (paketInput.initialSoalList || []).length,
    soalList: paketInput.initialSoalList || [],
  };

  all.push(newPaket);
  saveAllCustomPakets(all);
  return newPaket;
}

// Hapus Paket Soal
export function deleteCustomPaket(paketId: string): boolean {
  const all = getAllCustomPakets();
  const filtered = all.filter((p) => p.id !== paketId);
  if (filtered.length === all.length) return false;

  saveAllCustomPakets(filtered);
  return true;
}

// Reset kembali ke bank bawaan sistem
export function resetCustomPaketsToDefault(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("tka_bank_soal_updated"));
}
