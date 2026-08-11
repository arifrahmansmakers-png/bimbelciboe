import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Subject {

  id: string;

  name: string;

  educationLevelId: string;

  order: number;

}

export async function getSubjects(
  educationLevelId: string
) {
  const q = query(
    collection(
      db,
      "subjects"
    ),
    where(
      "educationLevelId",
      "==",
      educationLevelId
    ),
    orderBy("order")
  );

  const snapshot =
    await getDocs(q);

  return snapshot.docs.map(
    (doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<
        Subject,
        "id"
      >),
    })
  );
}