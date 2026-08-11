import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { QuestionBank } from "@/types/question";

export async function getQuestionBanks(
  chapterId: string
): Promise<QuestionBank[]> {
  const q = query(
    collection(db, "questionBanks"),
    where("chapterId", "==", chapterId),
    orderBy("order")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as Omit<
      QuestionBank,
      "id"
    >),
  }));
}

export async function getQuestionBankById(
  id: string
): Promise<QuestionBank | null> {
  const snapshot = await getDoc(
    doc(db, "questionBanks", id)
  );

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<
      QuestionBank,
      "id"
    >),
  };
}