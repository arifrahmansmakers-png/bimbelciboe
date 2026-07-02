import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Jangan jalankan JSON.parse di level atas (global scope)
// Bungkus dalam sebuah fungsi atau lakukan pengecekan
const getFirebaseAdmin = () => {
  if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      console.error("FIREBASE_SERVICE_ACCOUNT_KEY tidak ditemukan!");
      return null;
    }

    initializeApp({
      credential: cert(JSON.parse(serviceAccountKey)),
    });
  }
  return getFirestore();
};

// Ekspor sebagai fungsi, bukan instance langsung
export const adminDb = getFirebaseAdmin();