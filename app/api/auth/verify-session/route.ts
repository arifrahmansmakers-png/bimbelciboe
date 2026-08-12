import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // =====================================================
    // 1. AMBIL SESSION COOKIE
    // =====================================================

    const sessionCookie =
      req.cookies.get("__session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        {
          success: false,
          message: "Session tidak ditemukan.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // 2. VERIFIKASI SESSION COOKIE
    // =====================================================

    const decodedClaims =
      await getAdminAuth().verifySessionCookie(
        sessionCookie,
        true
      );

    const uid =
      decodedClaims.uid;

    // =====================================================
    // 3. AMBIL DATA USER FIRESTORE
    // =====================================================

    const userRef =
      getAdminDb()
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
    // 4. ROLE
    // =====================================================

    const allowedRoles = [
      "admin",
      "member",
      "partner",
    ];

    const role =
      typeof userData.role === "string" &&
      allowedRoles.includes(
        userData.role
      )
        ? userData.role
        : "member";

    // =====================================================
    // 5. MEMBERSHIP STATUS
    // =====================================================

    const membershipStatus =
      typeof userData.membershipStatus ===
      "string"
        ? userData.membershipStatus
        : "EXPIRED";

    // =====================================================
    // 6. MEMBERSHIP EXPIRED AT
    // =====================================================

    let membershipExpiredAt:
      string | null = null;

    const rawExpiredAt =
      userData.membershipExpiredAt;

    if (
      rawExpiredAt &&
      typeof rawExpiredAt.toDate ===
        "function"
    ) {
      const date =
        rawExpiredAt.toDate();

      if (
        date instanceof Date &&
        !Number.isNaN(
          date.getTime()
        )
      ) {
        membershipExpiredAt =
          date.toISOString();
      }
    } else if (
      rawExpiredAt instanceof Date
    ) {
      if (
        !Number.isNaN(
          rawExpiredAt.getTime()
        )
      ) {
        membershipExpiredAt =
          rawExpiredAt.toISOString();
      }
    } else if (
      typeof rawExpiredAt ===
      "string"
    ) {
      const date =
        new Date(rawExpiredAt);

      if (
        !Number.isNaN(
          date.getTime()
        )
      ) {
        membershipExpiredAt =
          date.toISOString();
      }
    }

    // =====================================================
    // 7. TENTUKAN MEMBERSHIP AKTIF
    // =====================================================

    const now =
      new Date();

    const expiredDate =
      membershipExpiredAt
        ? new Date(
            membershipExpiredAt
          )
        : null;

    const membershipActive =
      role === "member" &&
      membershipStatus ===
        "ACTIVE" &&
      expiredDate !== null &&
      expiredDate.getTime() >
        now.getTime();

    // =====================================================
    // 8. AFFILIATE
    // =====================================================

    const affiliateStatus =
      typeof userData.affiliateStatus ===
      "string"
        ? userData.affiliateStatus
        : "INACTIVE";

    const canAccessAffiliate =
      role === "member" &&
      membershipActive &&
      affiliateStatus ===
        "ACTIVE";

    // =====================================================
    // 9. PARTNER
    // =====================================================

    const partnerStatus =
      typeof userData.partnerStatus ===
      "string"
        ? userData.partnerStatus
        : "INACTIVE";

    const canAccessPartner =
      role === "partner" &&
      partnerStatus ===
        "ACTIVE";

    // =====================================================
    // 10. RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      user: {
        uid,

        email:
          userData.email ??
          decodedClaims.email ??
          null,

        nama:
          userData.nama ??
          decodedClaims.name ??
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

  } catch (error: any) {
    console.error(
      "VERIFY SESSION ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Session tidak valid atau sudah kedaluwarsa.",
      },
      { status: 401 }
    );
  }
}