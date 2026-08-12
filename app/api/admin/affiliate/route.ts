import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

/**
 * GET
 * Mengambil seluruh pengajuan affiliate yang masih PENDING
 */
export async function GET(req: NextRequest) {
  try {
    // =====================================================
    // 1. CEK SESSION
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
    // 2. VERIFIKASI SESSION
    // =====================================================

    const decoded =
      await getAdminAuth().verifySessionCookie(
        sessionCookie,
        true
      );

    const uid = decoded.uid;

    // =====================================================
    // 3. CEK USER ADMIN
    // =====================================================

    const adminSnap =
      await getAdminDb()
        .collection("users")
        .doc(uid)
        .get();

    if (!adminSnap.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Data admin tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const adminData =
      adminSnap.data() ?? {};

    if (adminData.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Akses hanya untuk admin.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // 4. AMBIL PENGAJUAN AFFILIATE
    // =====================================================

    const snapshot =
      await getAdminDb()
        .collection("users")
        .where(
          "affiliateStatus",
          "==",
          "PENDING"
        )
        .get();

    // =====================================================
    // 5. FORMAT DATA
    // =====================================================

    const applications =
      snapshot.docs.map((doc) => {
        const data =
          doc.data();

        let createdAt: string | null =
          null;

        const rawCreatedAt =
          data.affiliateAppliedAt;

        if (
          rawCreatedAt &&
          typeof rawCreatedAt.toDate ===
            "function"
        ) {
          createdAt =
            rawCreatedAt
              .toDate()
              .toISOString();
        } else if (
          rawCreatedAt instanceof Date
        ) {
          createdAt =
            rawCreatedAt.toISOString();
        } else if (
          typeof rawCreatedAt ===
          "string"
        ) {
          createdAt =
            rawCreatedAt;
        }

        return {
          uid: doc.id,

          nama:
            data.nama ??
            data.name ??
            "Tanpa Nama",

          email:
            data.email ??
            "",

          affiliateStatus:
            data.affiliateStatus ??
            "PENDING",

          affiliateAppliedAt:
            createdAt,

          membershipStatus:
            data.membershipStatus ??
            null,

          membershipExpiredAt:
            data.membershipExpiredAt ??
            null,
        };
      });

    // =====================================================
    // 6. RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,
      applications,
      total: applications.length,
    });
  } catch (error: any) {
    console.error(
      "ADMIN AFFILIATE GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Gagal mengambil pengajuan affiliate.",
      },
      { status: 500 }
    );
  }
}


/**
 * POST
 *
 * action:
 * - APPROVE
 * - REJECT
 */
export async function POST(
  req: NextRequest
) {
  try {
    // =====================================================
    // 1. CEK SESSION
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
    // 2. VERIFIKASI SESSION
    // =====================================================

    const decoded =
      await getAdminAuth().verifySessionCookie(
        sessionCookie,
        true
      );

    const adminUid =
      decoded.uid;

    // =====================================================
    // 3. CEK ADMIN
    // =====================================================

    const adminRef =
      getAdminDb()
        .collection("users")
        .doc(adminUid);

    const adminSnap =
      await adminRef.get();

    if (!adminSnap.exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data admin tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const adminData =
      adminSnap.data() ?? {};

    if (adminData.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Anda tidak memiliki akses admin.",
        },
        { status: 403 }
      );
    }

    // =====================================================
    // 4. AMBIL DATA REQUEST
    // =====================================================

    const body =
      await req.json();

    const targetUid =
      body?.uid;

    const action =
      body?.action;

    if (
      !targetUid ||
      !["APPROVE", "REJECT"].includes(
        action
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Data permintaan tidak valid.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // 5. AMBIL USER TARGET
    // =====================================================

    const userRef =
      getAdminDb()
        .collection("users")
        .doc(targetUid);

    const userSnap =
      await userRef.get();

    if (!userSnap.exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User tidak ditemukan.",
        },
        { status: 404 }
      );
    }

    const userData =
      userSnap.data() ?? {};

    // =====================================================
    // 6. PASTIKAN MASIH PENDING
    // =====================================================

    if (
      userData.affiliateStatus !==
      "PENDING"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Pengajuan affiliate sudah diproses.",
        },
        { status: 409 }
      );
    }

    // =====================================================
    // 7. APPROVE
    // =====================================================

    if (action === "APPROVE") {
      await userRef.update({
        affiliateStatus:
          "ACTIVE",

        canAccessAffiliate:
          true,

        affiliateApprovedAt:
          new Date(),

        affiliateApprovedBy:
          adminUid,
      });

      return NextResponse.json({
        success: true,

        message:
          "Affiliate berhasil disetujui.",

        status:
          "ACTIVE",
      });
    }

    // =====================================================
    // 8. REJECT
    // =====================================================

    await userRef.update({
      affiliateStatus:
        "REJECTED",

      canAccessAffiliate:
        false,

      affiliateRejectedAt:
        new Date(),

      affiliateRejectedBy:
        adminUid,
    });

    return NextResponse.json({
      success: true,

      message:
        "Pengajuan affiliate ditolak.",

      status:
        "REJECTED",
    });
  } catch (error: any) {
    console.error(
      "ADMIN AFFILIATE POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ??
          "Gagal memproses pengajuan affiliate.",
      },
      { status: 500 }
    );
  }
}