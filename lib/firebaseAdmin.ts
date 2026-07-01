import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Pastikan variabel environment ada
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

// Cek apakah aplikasi sudah diinisialisasi
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

// Gunakan fungsi getFirestore() untuk mendapatkan instance database
export const adminDb = getFirestore();