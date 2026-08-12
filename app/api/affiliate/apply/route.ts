import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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
          message: "Anda belum login.",
        },
        { status: 401 }
      );
    }

    // =====================================================
    // 2. VERIFIKASI SESSION
    // =====================================================

    const decodedClaims =
      await getAdminAuth().verifySessionCookie(
        sessionCookie,
        true
      );

    const uid = decodedClaims.uid;

    // =====================================================
    // 3. AMBIL DATA USER
    // =====================================================

    const db = getAdminDb();

    const userRef = db
      .collection("users")
      .doc(uid);

    const userSnap = await userRef.get();

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
    // 4. PASTIKAN USER ADALAH MEMBER
    // =====================================================

    const role =
      typeof userData.role === "string"
        ? userData.role
        : "member";

    if (role !== "member") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Hanya member yang dapat mendaftar sebagai affiliate.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // 5. CEK MEMBERSHIP
    // =====================================================

    const membershipStatus =
      typeof userData.membershipStatus === "string"
        ? userData.membershipStatus
        : "EXPIRED";

    let membershipExpiredAt: Date | null = null;

    const rawExpiredAt =
      userData.membershipExpiredAt;

    if (
      rawExpiredAt &&
      typeof rawExpiredAt.toDate === "function"
    ) {
      membershipExpiredAt =
        rawExpiredAt.toDate();
    } else if (
      rawExpiredAt instanceof Date
    ) {
      membershipExpiredAt =
        rawExpiredAt;
    } else if (
      typeof rawExpiredAt === "string"
    ) {
      const parsed =
        new Date(rawExpiredAt);

      if (
        !Number.isNaN(parsed.getTime())
      ) {
        membershipExpiredAt = parsed;
      }
    }

    const membershipActive =
      membershipStatus === "ACTIVE" &&
      membershipExpiredAt !== null &&
      membershipExpiredAt.getTime() >
        Date.now();

    if (!membershipActive) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Membership Anda tidak aktif. Silakan aktifkan membership terlebih dahulu.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // 6. CEK STATUS AFFILIATE SAAT INI
    // =====================================================

    const affiliateStatus =
      typeof userData.affiliateStatus ===
      "string"
        ? userData.affiliateStatus
        : "INACTIVE";

    // Sudah aktif
    if (affiliateStatus === "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Anda sudah menjadi affiliate.",
        },
        { status: 400 }
      );
    }

    // Sedang menunggu
    if (affiliateStatus === "PENDING") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pengajuan affiliate Anda masih menunggu konfirmasi admin.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 7. SIMPAN PENGAJUAN
    // =====================================================

    await userRef.update({
      affiliateStatus: "PENDING",
      affiliateAppliedAt:
        new Date(),
      affiliateApprovedAt: null,
      affiliateCode: null,
    });

    // =====================================================
    // 8. RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,
      message:
        "Pengajuan affiliate berhasil dikirim. Silakan menunggu konfirmasi admin.",
      affiliateStatus: "PENDING",
    });

  } catch (error: any) {
    console.error(
      "AFFILIATE APPLY ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Gagal mengajukan affiliate.",
      },
      { status: 500 }
    );
  }
}