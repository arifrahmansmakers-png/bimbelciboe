import { NextRequest, NextResponse } from "next/server";

const authRoutes = [
  "/login",
  "/daftar",
  "/lupa-password",
];

function getDashboardPath(
  role?: string,
  membershipActive?: boolean,
  canAccessAffiliate?: boolean,
  canAccessPartner?: boolean
) {
  // ==========================================
  // ADMIN
  // ==========================================

  if (role === "admin") {
    return "/dashboard/admin";
  }

  // ==========================================
  // PARTNER
  // ==========================================

  if (
    role === "partner" &&
    canAccessPartner
  ) {
    return "/dashboard/partner";
  }

  // ==========================================
  // MEMBER
  // ==========================================

  if (role === "member") {
    if (!membershipActive) {
      return "/dashboard/member/perpanjang";
    }

    return "/dashboard/member";
  }

  // ==========================================
  // DEFAULT
  // ==========================================

  return "/login";
}

export async function middleware(
  req: NextRequest
) {
  const { pathname } = req.nextUrl;

  const session =
    req.cookies.get("__session")?.value;

  // =====================================================
  // 1. CEK HALAMAN AUTH
  // =====================================================

  const isAuthPage =
    authRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(`${route}/`)
    );

  // =====================================================
  // 2. CEK HALAMAN DASHBOARD
  // =====================================================

  const isDashboard =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  // =====================================================
  // 3. HALAMAN PUBLIK
  // =====================================================

  if (
    !isDashboard &&
    !isAuthPage
  ) {
    return NextResponse.next();
  }

  // =====================================================
  // 4. BELUM LOGIN
  // =====================================================

  if (!session) {
    if (isDashboard) {
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
  // 5. VERIFIKASI SESSION
  // =====================================================

  try {
    const response =
      await fetch(
        `${req.nextUrl.origin}/api/auth/verify-session`,
        {
          method: "GET",

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

    if (
      !result?.success ||
      !result?.user
    ) {
      throw new Error(
        "Data session tidak valid."
      );
    }

    // ===================================================
    // 6. DATA USER
    // ===================================================

    const user =
      result.user;

    const role =
      user.role ?? "member";

    const membershipActive =
      user.membershipActive === true;

    const canAccessAffiliate =
      user.canAccessAffiliate === true;

    const canAccessPartner =
      user.canAccessPartner === true;

    // ===================================================
    // 7. SUDAH LOGIN → TIDAK BOLEH KE HALAMAN AUTH
    // ===================================================

    if (isAuthPage) {
      return NextResponse.redirect(
        new URL(
          getDashboardPath(
            role,
            membershipActive,
            canAccessAffiliate,
            canAccessPartner
          ),
          req.url
        )
      );
    }

    // ===================================================
    // 8. /dashboard
    // ===================================================

    if (
      pathname === "/dashboard"
    ) {
      return NextResponse.redirect(
        new URL(
          getDashboardPath(
            role,
            membershipActive,
            canAccessAffiliate,
            canAccessPartner
          ),
          req.url
        )
      );
    }

    // ===================================================
    // 9. ADMIN
    // ===================================================

    if (
      pathname ===
        "/dashboard/admin" ||
      pathname.startsWith(
        "/dashboard/admin/"
      )
    ) {
      if (role !== "admin") {
        return NextResponse.redirect(
          new URL(
            getDashboardPath(
              role,
              membershipActive,
              canAccessAffiliate,
              canAccessPartner
            ),
            req.url
          )
        );
      }

      return NextResponse.next();
    }

    // ===================================================
    // 10. PARTNER
    // ===================================================

    if (
      pathname ===
        "/dashboard/partner" ||
      pathname.startsWith(
        "/dashboard/partner/"
      )
    ) {
      if (
        role !== "partner" ||
        !canAccessPartner
      ) {
        return NextResponse.redirect(
          new URL(
            getDashboardPath(
              role,
              membershipActive,
              canAccessAffiliate,
              canAccessPartner
            ),
            req.url
          )
        );
      }

      return NextResponse.next();
    }

    // ===================================================
    // 11. MEMBER
    // ===================================================

    if (
      pathname ===
        "/dashboard/member" ||
      pathname.startsWith(
        "/dashboard/member/"
      )
    ) {
      // -----------------------------------------------
      // MEMBER HARUS BENAR-BENAR MEMBER
      // -----------------------------------------------

      if (
        role !== "member"
      ) {
        return NextResponse.redirect(
          new URL(
            getDashboardPath(
              role,
              membershipActive,
              canAccessAffiliate,
              canAccessPartner
            ),
            req.url
          )
        );
      }

      // -----------------------------------------------
      // MEMBER EXPIRED
      // -----------------------------------------------

      const isRenewalPage =
        pathname ===
        "/dashboard/member/perpanjang";

      if (
        !membershipActive &&
        !isRenewalPage
      ) {
        return NextResponse.redirect(
          new URL(
            "/dashboard/member/perpanjang",
            req.url
          )
        );
      }

      // -----------------------------------------------
      // MEMBER AKTIF
      // -----------------------------------------------

      return NextResponse.next();
    }

    // ===================================================
    // 12. DASHBOARD TIDAK DIKENAL
    // ===================================================

    return NextResponse.redirect(
      new URL(
        getDashboardPath(
          role,
          membershipActive,
          canAccessAffiliate,
          canAccessPartner
        ),
        req.url
      )
    );

  } catch (error) {
    console.error(
      "MIDDLEWARE AUTH ERROR:",
      error
    );

    const response =
      isDashboard
        ? NextResponse.redirect(
            new URL(
              "/login",
              req.url
            )
          )
        : NextResponse.next();

    response.cookies.delete(
      "__session"
    );

    return response;
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