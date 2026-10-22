"use client";

import { TKAPaket, TKASoal } from "./types";
import { allTKAPakets } from "./index";

const STORAGE_KEY = "tka_custom_bank_v2";

// Helper mengambil data paket (mengutamakan hasil edit admin dari localStorage)
export function getAllCustomPakets(): TKAPaket[] {
  if (typeof window === "undefined") {
    return allTKAPakets;
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

  return allTKAPakets;
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

// Cari seluruh paket berdasarkan Subject ID
export function getCustomPaketsBySubject(subjectId: string): TKAPaket[] {
  const all = getAllCustomPakets();
  return all
    .filter((p) => p.subjectId === subjectId)
    .sort((a, b) => a.paketNumber - b.paketNumber);
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

  paket.soalList = paket.soalList.filter((s) => s.id !== soalId);
  // Re-number soal
  paket.soalList.forEach((s, idx) => {
    s.nomor = idx + 1;
  });
  paket.totalSoal = paket.soalList.length;

  saveAllCustomPakets(all);
  return true;
}

// Pindah soal dari satu paket ke paket lain
export function moveCustomSoal(
  fromPaketId: string,
  toPaketId: string,
  soalId: string
): boolean {
  if (fromPaketId === toPaketId) return false;

  const all = getAllCustomPakets();
  const fromPaket = all.find((p) => p.id === fromPaketId);
  const toPaket = all.find((p) => p.id === toPaketId);

  if (!fromPaket || !toPaket) return false;

  const targetSoal = fromPaket.soalList.find((s) => s.id === soalId);
  if (!targetSoal) return false;

  // Hapus dari paket asal
  fromPaket.soalList = fromPaket.soalList.filter((s) => s.id !== soalId);
  fromPaket.soalList.forEach((s, idx) => {
    s.nomor = idx + 1;
  });
  fromPaket.totalSoal = fromPaket.soalList.length;

  // Masukkan ke paket tujuan
  targetSoal.nomor = toPaket.soalList.length + 1;
  toPaket.soalList.push(targetSoal);
  toPaket.totalSoal = toPaket.soalList.length;

  saveAllCustomPakets(all);
  return true;
}

// Tambah paket soal baru
export function addCustomPaket(
  newPaketData: {
    subjectId: string;
    mapelName: string;
    jenjang: "SD/MI" | "SMP/MTs" | "SMA";
    title: string;
    description: string;
    levelKesukaran: "Level 1: Dasar & Pemahaman" | "Level 2: Aplikasi & Terapan" | "Level 3: Analisis & HOTS Mahir";
    durasiMenit: number;
    passingScore?: number;
  }
): TKAPaket {
  const all = getAllCustomPakets();
  const existingInSubject = all.filter((p) => p.subjectId === newPaketData.subjectId);
  const nextPaketNumber = existingInSubject.length + 1;
  const newId = `${newPaketData.subjectId}-p${nextPaketNumber}-${Date.now().toString(36)}`;

  const createdPaket: TKAPaket = {
    id: newId,
    subjectId: newPaketData.subjectId,
    jenjang: newPaketData.jenjang,
    mapelName: newPaketData.mapelName,
    paketNumber: nextPaketNumber,
    title: newPaketData.title,
    description: newPaketData.description,
    levelKesukaran: newPaketData.levelKesukaran,
    durasiMenit: newPaketData.durasiMenit || 25,
    passingScore: newPaketData.passingScore || 50,
    totalSoal: 0,
    soalList: [],
  };

  all.push(createdPaket);
  saveAllCustomPakets(all);
  return createdPaket;
}

// Hapus paket soal
export function deleteCustomPaket(paketId: string): boolean {
  const all = getAllCustomPakets();
  const remaining = all.filter((p) => p.id !== paketId);
  if (remaining.length === all.length) return false;

  saveAllCustomPakets(remaining);
  return true;
}

// Reset bank soal ke default
export function resetCustomPaketsToDefault(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("tka_bank_soal_updated"));
  } catch (err) {
    console.error(err);
  }
}
