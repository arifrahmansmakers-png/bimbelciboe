import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
];

const authRoutes = [
  "/login",
  "/daftar",
  "/lupa-password",
];

function getDashboardPath(role?: string) {
  switch (role) {
    case "admin":
      return "/dashboard/admin";

    case "affiliate":
      return "/dashboard/affiliate";

    case "member":
    default:
      return "/dashboard/member";
  }
}

export async function middleware(
  req: NextRequest
) {
  const { pathname } = req.nextUrl;

  const session =
    req.cookies.get("__session")?.value;

  const isProtected =
    protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

  const isAuthPage =
    authRoutes.some((route) =>
      pathname.startsWith(route)
    );

  // =====================================================
  // HALAMAN PUBLIK
  // =====================================================

  if (
    !isProtected &&
    !isAuthPage
  ) {
    return NextResponse.next();
  }

  // =====================================================
  // BELUM LOGIN
  // =====================================================

  if (!session) {
    if (isProtected) {
      return NextResponse.redirect(
        new URL(
          "/login",
          req.url
        )
      );
    }

    return NextResponse.next();
  }

  // =====================================================
  // VERIFIKASI SESSION
  // =====================================================

  try {
    const response =
      await fetch(
        `${req.nextUrl.origin}/api/auth/verify-session`,
        {
          headers: {
            Cookie:
              `__session=${session}`,
          },
          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        "Session tidak valid."
      );
    }

    const result =
      await response.json();

    /*
     * Ambil role dari response
     *
     * Kita dukung beberapa kemungkinan
     * bentuk response supaya tidak rapuh.
     */

    const role =
      result?.user?.role ??
      result?.role ??
      "member";

    // ===================================================
    // SUDAH LOGIN → JANGAN KEMBALI KE HALAMAN AUTH
    // ===================================================

    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(
          getDashboardPath(role),
          req.url
        )
      );
    }

    return NextResponse.next();

  } catch {
    const res =
      isProtected
        ? NextResponse.redirect(
            new URL(
              "/login",
              req.url
            )
          )
        : NextResponse.next();

    res.cookies.delete(
      "__session"
    );

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