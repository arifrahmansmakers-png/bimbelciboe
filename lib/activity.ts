import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export interface CreateUserActivityParams {
  userId: string;
  type: string;
  action: string;
  description: string;

  userRef?: FirebaseFirestore.DocumentReference | null;

  transactionId?: string | null;
  transactionRef?: FirebaseFirestore.DocumentReference | null;

  tryoutId?: string | null;
  tryoutRef?: FirebaseFirestore.DocumentReference | null;

  data?: Record<string, unknown>;
}

export async function createUserActivity({
  userId,
  type,
  action,
  description,
  userRef = null,
  transactionId = null,
  transactionRef = null,
  tryoutId = null,
  tryoutRef = null,
  data = {},
}: CreateUserActivityParams): Promise<string> {
  if (!userId) {
    throw new Error("userId wajib diisi.");
  }

  if (!type) {
    throw new Error("Activity type wajib diisi.");
  }

  if (!action) {
    throw new Error("Activity action wajib diisi.");
  }

  if (!description) {
    throw new Error("Activity description wajib diisi.");
  }

  const db = getAdminDb();

  const activityRef = db.collection("userActivities").doc();

  await activityRef.set({
    userId,
    userRef: userRef ?? db.collection("users").doc(userId),

    type,
    action,
    description,

    transactionId,
    transactionRef,

    tryoutId,
    tryoutRef,

    ...data,

    createdAt: FieldValue.serverTimestamp(),
  });

  return activityRef.id;
}