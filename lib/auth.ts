import { cookies } from "next/headers";
import { getAuth } from "firebase-admin/auth";

export async function getCurrentUser() {
  const session = (await cookies()).get("__session")?.value;

  if (!session) return null;

  try {
    return await getAuth().verifySessionCookie(session, true);
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}