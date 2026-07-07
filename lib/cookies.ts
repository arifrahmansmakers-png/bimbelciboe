import { cookies } from "next/headers";

const COOKIE_NAME = "__session";

export async function getSessionCookie() {
  return (await cookies()).get(COOKIE_NAME)?.value ?? null;
}

export async function setSessionCookie(
  value: string,
  maxAge: number
) {
  (await cookies()).set({
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function deleteSessionCookie() {
  (await cookies()).set({
    name: COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });
}