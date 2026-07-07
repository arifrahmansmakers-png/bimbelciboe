import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
];

const authRoutes = [
  "/login",
  "/daftar",
  "/lupa-password",
];

export async function middleware(req: NextRequest) {

  const { pathname } = req.nextUrl;

  const session = req.cookies.get("__session")?.value;

  const isProtected = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  const isAuthPage = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  // Halaman publik
  if (!isProtected && !isAuthPage) {
    return NextResponse.next();
  }

  // Belum login
  if (!session) {

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();

  }

  try {

    const response = await fetch(
      `${req.nextUrl.origin}/api/auth/verify-session`,
      {
        headers: {
          Cookie: `__session=${session}`,
        },
      }
    );

    if (!response.ok)
      throw new Error();

    // Sudah login jangan balik ke login
    if (isAuthPage) {
      return NextResponse.redirect(
        new URL("/dashboard", req.url)
      );
    }

    return NextResponse.next();

  } catch {

    const res = isProtected
      ? NextResponse.redirect(new URL("/login", req.url))
      : NextResponse.next();

    res.cookies.delete("__session");

    return res;

  }

}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/daftar",
    "/lupa-password",
  ],
};