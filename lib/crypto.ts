import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const IV_LENGTH = 16;

function getKey(): Buffer {
  const secret = process.env.PASSWORD_SECRET;

  if (!secret) {
    throw new Error(
      "PASSWORD_SECRET belum diset. Silakan tambahkan PASSWORD_SECRET di environment variables."
    );
  }

  return crypto.createHash("sha256").update(secret, "utf8").digest();
}

export function encrypt(text: string): string {
  if (typeof text !== "string") {
    throw new TypeError("Data yang akan dienkripsi harus berupa string.");
  }

  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(data: string): string {
  if (!data || typeof data !== "string") {
    throw new TypeError("Data yang akan didekripsi tidak valid.");
  }

  const parts = data.split(":");

  if (parts.length !== 2) {
    throw new Error("Format data terenkripsi tidak valid.");
  }

  const [ivHex, encrypted] = parts;

  if (!ivHex || !encrypted) {
    throw new Error("Data terenkripsi tidak lengkap.");
  }

  const iv = Buffer.from(ivHex, "hex");

  if (iv.length !== IV_LENGTH) {
    throw new Error("IV terenkripsi tidak valid.");
  }

  const key = getKey();

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    iv
  );

  let decrypted = decipher.update(
    encrypted,
    "hex",
    "utf8"
  );

  decrypted += decipher.final("utf8");

  return decrypted;
}