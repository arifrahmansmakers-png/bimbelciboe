import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export interface Topic {
  id: string;

  name: string;

  subjectId: string;

  order: number;
}

export async function getTopics(
  subjectId: string
): Promise<Topic[]> {
  const q = query(
    collection(db, "topics"),
    where("subjectId", "==", subjectId),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Topic, "id">),
  }));
}

export async function getTopicById(
  topicId: string
): Promise<Topic | null> {
  const q = query(
    collection(db, "topics"),
    where("__name__", "==", topicId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...(doc.data() as Omit<Topic, "id">),
  };
}