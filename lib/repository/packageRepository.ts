import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Package {
  id: string;

  name: string;

  description?: string;

  price: number;

  discount?: number;

  duration: number;

  educationLevelId: string;

  isActive: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}

export async function getPackages() {
  const q = query(
    collection(db, "packages"),
    where("isActive", "==", true),
    orderBy("price")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<Package, "id">),
  }));
}

export async function getPackageById(
  packageId: string
) {
  const snapshot = await getDoc(
    doc(db, "packages", packageId)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      Package,
      "id"
    >),
  };
}