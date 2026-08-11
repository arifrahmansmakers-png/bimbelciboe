import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Chapter {
  id: string;

  topicId: string;

  name: string;

  order: number;
}

export async function getChapters(
  topicId: string
): Promise<Chapter[]> {
  const q = query(
    collection(db, "chapters"),
    where("topicId", "==", topicId),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Chapter, "id">),
  }));
}

export async function getChapterById(
  chapterId: string
): Promise<Chapter | null> {
  const q = query(
    collection(db, "chapters"),
    where("__name__", "==", chapterId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<Chapter, "id">),
  };
}