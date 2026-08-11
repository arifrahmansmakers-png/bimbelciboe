import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

import { CurrentUser } from "@/types/auth";

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session =
    (await cookies()).get("__session")?.value;

  if (!session) {
    return null;
  }

  try {
    const decoded =
      await getAuth().verifySessionCookie(
        session,
        true
      );

    return {
      uid: decoded.uid,

      email: decoded.email ?? "",

      name: decoded.name ?? "Member",

      role:
        (decoded.role as CurrentUser["role"]) ??
        "member",

      educationLevelId:
        decoded.educationLevelId,

      packageId:
        decoded.packageId,

      photoURL:
        decoded.picture ?? null,
    };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user =
    await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}