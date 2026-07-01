import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKcj_zHh4Vw6efHD3QELEoPeAKz9UsRQc",
  authDomain: "bimbelciboe2.firebaseapp.com",
  projectId: "bimbelciboe2",
  storageBucket: "bimbelciboe2.firebasestorage.app",
  messagingSenderId: "864431876461",
  appId: "1:864431876461:web:285121aab0e964f3845264"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);