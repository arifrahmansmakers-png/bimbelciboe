import { getAdminDb } from "@/lib/firebaseAdmin";

const PREFIX = "CBE";
const LENGTH = 6;

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomString(length: number): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return result;
}

export async function generateReferralCode(): Promise<string> {
  const adminDb = getAdminDb();

  while (true) {
    const code = PREFIX + randomString(LENGTH);

    const exists = await adminDb
      .collection("affiliates")
      .where("referralCode", "==", code)
      .limit(1)
      .get();

    if (exists.empty) {
      return code;
    }
  }
}