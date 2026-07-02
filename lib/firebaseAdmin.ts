import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const getAdminDb = () => {
  if (!getApps().length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY tidak ditemukan!");
    }

    // JSON.parse hanya akan jalan saat API dipanggil (Runtime)
    initializeApp({
      credential: cert(JSON.parse(serviceAccountKey)),
    });
  }
  return getFirestore();
};