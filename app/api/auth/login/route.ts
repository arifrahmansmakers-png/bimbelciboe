import { NextRequest, NextResponse } from "next/server";

import {
  getAdminAuth,
  getAdminDb,
} from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Auth Login API",
  });
}

export async function POST(req: NextRequest) {
  try {
    // =====================================================
    // 1. AMBIL ID TOKEN
    // =====================================================

    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        {
          success: false,
          message: "ID Token tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 2. VERIFIKASI ID TOKEN FIREBASE
    // =====================================================

    const decodedToken =
      await getAdminAuth().verifyIdToken(idToken);

    const uid = decodedToken.uid;

    // =====================================================
    // 3. AMBIL DATA USER DARI FIRESTORE
    // =====================================================

    const userRef = getAdminDb()
      .collection("users")
      .doc(uid);

    const userSnap =
      await userRef.get();

    if (!userSnap.exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data pengguna tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const userData =
      userSnap.data() ?? {};

    // =====================================================
    // 4. ROLE UTAMA
    //
    // affiliate BUKAN role.
    // Affiliate adalah status tambahan member.
    // =====================================================

    const allowedRoles = [
      "admin",
      "member",
      "partner",
    ];

    const role =
      typeof userData.role === "string" &&
      allowedRoles.includes(userData.role)
        ? userData.role
        : "member";

    // =====================================================
    // 5. MEMBERSHIP
    // =====================================================

    const membershipStatus =
      typeof userData.membershipStatus === "string"
        ? userData.membershipStatus
        : "EXPIRED";

    // =====================================================
    // 6. MEMBERSHIP EXPIRED AT
    // =====================================================

    let membershipExpiredAt: string | null =
      null;

    const rawExpiredAt =
      userData.membershipExpiredAt;

    if (
      rawExpiredAt &&
      typeof rawExpiredAt.toDate === "function"
    ) {
      membershipExpiredAt =
        rawExpiredAt
          .toDate()
          .toISOString();
    } else if (
      rawExpiredAt instanceof Date
    ) {
      membershipExpiredAt =
        rawExpiredAt.toISOString();
    } else if (
      typeof rawExpiredAt === "string"
    ) {
      const parsed =
        new Date(rawExpiredAt);

      if (
        !Number.isNaN(
          parsed.getTime()
        )
      ) {
        membershipExpiredAt =
          parsed.toISOString();
      }
    }

    // =====================================================
    // 7. TENTUKAN MEMBERSHIP AKTIF
    // =====================================================

    const now = new Date();

    const expiredDate =
      membershipExpiredAt
        ? new Date(
            membershipExpiredAt
          )
        : null;

    const membershipActive =
      role === "member" &&
      membershipStatus === "ACTIVE" &&
      expiredDate !== null &&
      expiredDate.getTime() >=
        now.getTime();

    // =====================================================
    // 8. AFFILIATE
    //
    // Affiliate tetap MEMBER.
    // =====================================================

    const affiliateStatus =
      typeof userData.affiliateStatus === "string"
        ? userData.affiliateStatus
        : "INACTIVE";

    const canAccessAffiliate =
      role === "member" &&
      membershipActive &&
      affiliateStatus === "ACTIVE";

    // =====================================================
    // 9. PARTNER
    // =====================================================

    const partnerStatus =
      typeof userData.partnerStatus === "string"
        ? userData.partnerStatus
        : "INACTIVE";

    const canAccessPartner =
      role === "partner" &&
      partnerStatus === "ACTIVE";

    // =====================================================
    // 10. BUAT SESSION COOKIE
    // =====================================================

    const expiresIn =
      1000 *
      60 *
      60 *
      24 *
      5;

    const sessionCookie =
      await getAdminAuth().createSessionCookie(
        idToken,
        {
          expiresIn,
        }
      );

    // =====================================================
    // 11. RESPONSE
    // =====================================================

    const response =
      NextResponse.json({
        success: true,

        user: {
          uid,

          email:
            userData.email ??
            decodedToken.email ??
            null,

          nama:
            userData.nama ??
            decodedToken.name ??
            null,

          role,

          membershipStatus,

          membershipExpiredAt,

          membershipActive,

          affiliateStatus,

          canAccessAffiliate,

          partnerStatus,

          canAccessPartner,
        },
      });

    // =====================================================
    // 12. SESSION COOKIE
    // =====================================================

    response.cookies.set({
      name: "__session",

      value: sessionCookie,

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge:
        expiresIn / 1000,
    });

    return response;

  } catch (error: any) {
    console.error(
      "LOGIN API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Login gagal.",
      },
      {
        status: 401,
      }
    );
  }
}