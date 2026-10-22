// lib/firebaseAdmin.ts

import {
  cert,
  getApps,
  getApp,
  initializeApp,
  App,
} from "firebase-admin/app";

import {
  getAuth,
  Auth,
} from "firebase-admin/auth";

import {
  getFirestore,
  Firestore,
} from "firebase-admin/firestore";

// =====================================================
// FIREBASE ADMIN APP
// =====================================================

let adminApp: App;

function getAdminApp(): App {
  // Jika Firebase Admin sudah pernah diinisialisasi,
  // gunakan instance yang sudah ada.
  if (getApps().length > 0) {
    return getApp();
  }

  const serviceAccountKey =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error(
      "Variabel lingkungan FIREBASE_SERVICE_ACCOUNT_KEY tidak ditemukan."
    );
  }

  try {
    const rawKey = serviceAccountKey.trim();
    const cleanedKey =
      (rawKey.startsWith("'") && rawKey.endsWith("'")) ||
      (rawKey.startsWith('"') && rawKey.endsWith('"'))
        ? rawKey.slice(1, -1)
        : rawKey;

    const serviceAccount = JSON.parse(cleanedKey);

    if (
      serviceAccount.private_key &&
      typeof serviceAccount.private_key === "string"
    ) {
      serviceAccount.private_key =
        serviceAccount.private_key.replace(/\\n/g, "\n");
    }

    adminApp = initializeApp({
      credential: cert(serviceAccount),
    });

    return adminApp;
  } catch (error) {
    console.error(
      "Gagal menginisialisasi Firebase Admin:",
      error
    );

    throw new Error(
      "Format FIREBASE_SERVICE_ACCOUNT_KEY tidak valid."
    );
  }
}

// =====================================================
// FIREBASE ADMIN AUTH
// =====================================================

export function getAdminAuth(): Auth {
  return getAuth(getAdminApp());
}

// =====================================================
// FIREBASE ADMIN FIRESTORE
// =====================================================

export function getAdminDb(): Firestore {
  return getFirestore(getAdminApp());
}