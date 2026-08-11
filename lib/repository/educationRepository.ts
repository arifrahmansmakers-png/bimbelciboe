import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface EducationLevel {

  id: string;

  name: string;

  order: number;

}

export async function getEducationLevels() {

  const q = query(
    collection(
      db,
      "educationLevels"
    ),
    orderBy("order")
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        EducationLevel,
        "id"
      >),
    })
  );
}