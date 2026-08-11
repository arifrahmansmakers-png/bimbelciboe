import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { CurrentUser } from "@/types/auth";

export async function getUserByUid(
  uid: string
): Promise<CurrentUser | null> {
  const snapshot = await getDoc(
    doc(db, "users", uid)
  );

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    uid,

    email: data.email ?? "",

    name: data.name ?? "",

    role: data.role ?? "member",

    educationLevelId:
      data.educationLevelId ?? null,

    packageId:
      data.packageId ?? null,

    packageExpiredAt:
      data.packageExpiredAt ?? null,

    photoURL:
      data.photoURL ?? null,

    isActive:
      data.isActive ?? true,
  };
}

export async function updateUser(
  uid: string,
  data: Partial<CurrentUser>
) {
  await updateDoc(
    doc(db, "users", uid),
    data
  );
}