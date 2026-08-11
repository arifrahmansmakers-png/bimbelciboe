import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export interface CreateSystemLogParams {
  action: string;
  category: string;
  source: string;

  userId?: string | null;
  userRef?: FirebaseFirestore.DocumentReference | null;

  transactionId?: string | null;
  transactionRef?: FirebaseFirestore.DocumentReference | null;

  email?: string | null;

  data?: Record<string, unknown>;
}

export async function createSystemLog({
  action,
  category,
  source,
  userId = null,
  userRef = null,
  transactionId = null,
  transactionRef = null,
  email = null,
  data = {},
}: CreateSystemLogParams): Promise<string> {
  if (!action) {
    throw new Error("System log action wajib diisi.");
  }

  if (!category) {
    throw new Error("System log category wajib diisi.");
  }

  if (!source) {
    throw new Error("System log source wajib diisi.");
  }

  const db = getAdminDb();

  const logRef = db.collection("systemLogs").doc();

  await logRef.set({
    action,
    category,
    source,

    userId,
    userRef,

    transactionId,
    transactionRef,

    email,

    ...data,

    createdAt: FieldValue.serverTimestamp(),
  });

  return logRef.id;
}