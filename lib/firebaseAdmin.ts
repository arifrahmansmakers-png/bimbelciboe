// lib/firebaseAdmin.ts
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Menginisialisasi Firebase Admin SDK secara aman.
 * Fungsi ini memastikan inisialisasi hanya terjadi satu kali (singleton).
 */
export const getAdminDb = () => {
  // 1. Cek apakah aplikasi sudah diinisialisasi untuk mencegah error saat hot-reloading
  if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error("Variabel lingkungan FIREBASE_SERVICE_ACCOUNT_KEY tidak ditemukan!");
    }

    try {
      // 2. Parse JSON. Menggunakan tipe ServiceAccount memastikan struktur data sesuai.
      const serviceAccount: ServiceAccount = JSON.parse(serviceAccountKey);

      initializeApp({
        credential: cert(serviceAccount),
      });
    } catch (error) {
      console.error("Gagal menginisialisasi Firebase Admin:", error);
      throw new Error("Format FIREBASE_SERVICE_ACCOUNT_KEY tidak valid.");
    }
  }

  // 3. Kembalikan instance Firestore untuk digunakan di server-side
  return getFirestore();
};