import { cookies } from "next/headers";

import {
  getAdminAuth,
  getAdminDb,
} from "@/lib/firebaseAdmin";

import {
  CurrentUser,
  AffiliateStatus,
  PartnerStatus,
} from "@/types/auth";

/**
 * =====================================================
 * GET CURRENT USER
 * =====================================================
 *
 * 1. Ambil session cookie
 * 2. Verifikasi session Firebase
 * 3. Ambil data user dari Firestore
 * 4. Gabungkan data authentication + Firestore
 */

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();

  const session =
    cookieStore.get("__session")?.value;

  if (!session) {
    return null;
  }

  try {
    /*
     * =================================================
     * 1. VERIFIKASI SESSION COOKIE
     * =================================================
     */

    const decoded =
      await getAdminAuth().verifySessionCookie(
        session,
        true
      );

    const uid = decoded.uid;

    /*
     * =================================================
     * 2. AMBIL USER DARI FIRESTORE
     * =================================================
     */

    const userRef =
      getAdminDb()
        .collection("users")
        .doc(uid);

    const userSnap =
      await userRef.get();

    if (!userSnap.exists) {
      return null;
    }

    const userData =
      userSnap.data() ?? {};

    /*
     * =================================================
     * 3. ROLE
     * =================================================
     */

    const role =
      userData.role === "admin" ||
      userData.role === "partner" ||
      userData.role === "member"
        ? userData.role
        : "member";

    /*
     * =================================================
     * 4. AFFILIATE STATUS
     * =================================================
     */

    const affiliateStatus: AffiliateStatus =
      userData.affiliateStatus === "PENDING" ||
      userData.affiliateStatus === "ACTIVE" ||
      userData.affiliateStatus === "REJECTED"
        ? userData.affiliateStatus
        : "INACTIVE";

    /*
     * =================================================
     * 5. PARTNER STATUS
     * =================================================
     */

    const partnerStatus: PartnerStatus =
      userData.partnerStatus === "PENDING" ||
      userData.partnerStatus === "ACTIVE" ||
      userData.partnerStatus === "REJECTED"
        ? userData.partnerStatus
        : "INACTIVE";

    /*
     * =================================================
     * 6. MEMBERSHIP
     * =================================================
     */

    const membershipStatus =
      typeof userData.membershipStatus === "string"
        ? userData.membershipStatus
        : null;

    /*
     * =================================================
     * 7. MEMBERSHIP EXPIRED AT
     * =================================================
     */

    let membershipExpiredAt:
      string | null = null;

    const rawExpiredAt =
      userData.membershipExpiredAt;

    if (
      rawExpiredAt &&
      typeof rawExpiredAt.toDate === "function"
    ) {
      const date =
        rawExpiredAt.toDate();

      if (
        date instanceof Date &&
        !Number.isNaN(date.getTime())
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
      typeof rawExpiredAt === "string"
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

    /*
     * =================================================
     * 8. MEMBERSHIP ACTIVE
     * =================================================
     */

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
      membershipStatus === "ACTIVE" &&
      expiredDate !== null &&
      expiredDate.getTime() >
        now.getTime();

    /*
     * =================================================
     * 9. ACCESS AFFILIATE
     * =================================================
     *
     * Affiliate adalah fitur MEMBER.
     *
     * Bukan role.
     */

    const canAccessAffiliate =
      role === "member" &&
      membershipActive &&
      affiliateStatus === "ACTIVE";

    /*
     * =================================================
     * 10. ACCESS PARTNER
     * =================================================
     */

    const canAccessPartner =
      role === "partner" &&
      partnerStatus === "ACTIVE";

    /*
     * =================================================
     * 11. RETURN CURRENT USER
     * =================================================
     */

    return {
      uid,

      email:
        userData.email ??
        decoded.email ??
        "",

      name:
        userData.nama ??
        userData.name ??
        decoded.name ??
        "Member",

      role,

      educationLevelId:
        userData.educationLevelId ??
        null,

      packageId:
        userData.packageId ??
        null,

      packageExpiredAt:
        userData.packageExpiredAt ??
        null,

      photoURL:
        userData.photoURL ??
        decoded.picture ??
        null,

      isActive:
        typeof userData.isActive === "boolean"
          ? userData.isActive
          : true,

      membershipStatus,

      membershipExpiredAt,

      membershipActive,

      affiliateStatus,

      canAccessAffiliate,

      partnerStatus,

      canAccessPartner,
    };
  } catch (error) {
    console.error(
      "GET CURRENT USER ERROR:",
      error
    );

    return null;
  }
}

/**
 * =====================================================
 * REQUIRE AUTH
 * =====================================================
 */

export async function requireAuth() {
  const user =
    await getCurrentUser();

  if (!user) {
    throw new Error(
      "Unauthorized"
    );
  }

  return user;
}