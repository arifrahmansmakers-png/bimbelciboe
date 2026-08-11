import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

// =====================================================
// RESPONSE HELPER
// =====================================================

const failed = (
  message: string,
  status = 400
) =>
  NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );

// =====================================================
// VERIFY ADMIN
// =====================================================

async function verifyAdmin(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token =
    authHeader.substring(7);

  try {
    const decoded =
      await getAuth().verifyIdToken(token);

    const db = getAdminDb();

    const userDoc = await db
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userDoc.exists) {
      return null;
    }

    const user =
      userDoc.data();

    if (user?.role !== "admin") {
      return null;
    }

    return {
      uid: decoded.uid,
      nama:
        user.nama ??
        "Administrator",
    };
  } catch (error) {
    console.error(
      "VERIFY ADMIN ERROR:",
      error
    );

    return null;
  }
}

// =====================================================
// GET
// /api/admin/packages
//
// Mengambil semua paket.
// =====================================================

export async function GET(
  req: NextRequest
) {
  try {
    const admin =
      await verifyAdmin(req);

    if (!admin) {
      return failed(
        "Unauthorized",
        401
      );
    }

    const db = getAdminDb();

    const snapshot =
      await db
        .collection("packages")
        .get();

    const packages =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );

    // Urutkan berdasarkan nama
    packages.sort(
      (a: any, b: any) =>
        String(a.nama ?? "")
          .localeCompare(
            String(b.nama ?? "")
          )
    );

    return NextResponse.json({
      success: true,
      data: packages,
      total: packages.length,
    });
  } catch (error: unknown) {
    console.error(
      "GET ADMIN PACKAGES ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST
// /api/admin/packages
//
// Membuat paket baru.
// =====================================================

export async function POST(
  req: NextRequest
) {
  try {
    const admin =
      await verifyAdmin(req);

    if (!admin) {
      return failed(
        "Unauthorized",
        401
      );
    }

    const body =
      await req.json();

    // =================================================
    // DATA DASAR
    // =================================================

    const kode =
      String(
        body.kode ?? ""
      )
        .trim()
        .toUpperCase();

    const nama =
      String(
        body.nama ?? ""
      ).trim();

    const harga =
      Number(
        body.harga ?? 0
      );

    const durasiHari =
      Number(
        body.durasiHari ?? 0
      );

    if (!kode) {
      return failed(
        "Kode paket wajib diisi."
      );
    }

    if (!nama) {
      return failed(
        "Nama paket wajib diisi."
      );
    }

    if (
      !Number.isFinite(harga) ||
      harga < 0
    ) {
      return failed(
        "Harga paket tidak valid."
      );
    }

    if (
      !Number.isFinite(
        durasiHari
      ) ||
      durasiHari <= 0
    ) {
      return failed(
        "Durasi paket tidak valid."
      );
    }

    // =================================================
    // CEK KODE DUPLIKAT
    // =================================================

    const db = getAdminDb();

    const existing =
      await db
        .collection("packages")
        .where(
          "kode",
          "==",
          kode
        )
        .limit(1)
        .get();

    if (!existing.empty) {
      return failed(
        `Kode paket "${kode}" sudah digunakan.`
      );
    }

    // =================================================
    // FITUR
    // =================================================

    let fitur: string[] = [];

    if (
      Array.isArray(body.fitur)
    ) {
      fitur =
        body.fitur
          .map(
            (item: unknown) =>
              String(item).trim()
          )
          .filter(Boolean);
    }

    // =================================================
    // AFFILIATE
    // =================================================

    let affiliateCommissionType =
      body.affiliateCommissionType ??
      null;

    let affiliateCommissionValue =
      Number(
        body.affiliateCommissionValue ??
          0
      );

    if (
      affiliateCommissionType !==
        null &&
      affiliateCommissionType !==
        "percent" &&
      affiliateCommissionType !==
        "fixed"
    ) {
      return failed(
        "Tipe komisi affiliate tidak valid."
      );
    }

    if (
      !Number.isFinite(
        affiliateCommissionValue
      ) ||
      affiliateCommissionValue < 0
    ) {
      return failed(
        "Nilai komisi affiliate tidak valid."
      );
    }

    // =================================================
    // PARTNER
    // =================================================

    let partnerCommissionType =
      body.partnerCommissionType ??
      null;

    let partnerCommissionValue =
      Number(
        body.partnerCommissionValue ??
          0
      );

    if (
      partnerCommissionType !==
        null &&
      partnerCommissionType !==
        "percent" &&
      partnerCommissionType !==
        "fixed"
    ) {
      return failed(
        "Tipe komisi partner tidak valid."
      );
    }

    if (
      !Number.isFinite(
        partnerCommissionValue
      ) ||
      partnerCommissionValue < 0
    ) {
      return failed(
        "Nilai komisi partner tidak valid."
      );
    }

    // =================================================
    // BUAT DOKUMEN
    // =================================================

    const packageRef =
      db
        .collection("packages")
        .doc();

    const packageData = {
      // Identitas
      kode,
      nama,

      // Harga
      harga: Math.floor(harga),

      // Membership
      durasiHari:
        Math.floor(durasiHari),

      // Informasi
      deskripsi:
        String(
          body.deskripsi ?? ""
        ).trim(),

      warna:
        body.warna
          ? String(body.warna)
          : null,

      icon:
        body.icon
          ? String(body.icon)
          : null,

      fitur,

      // Status
      active:
        body.active === undefined
          ? true
          : Boolean(body.active),

      // Affiliate
      affiliateCommissionType,
      affiliateCommissionValue,

      // Partner
      partnerCommissionType,
      partnerCommissionValue,

      // Audit
      createdBy:
        admin.uid,

      createdByName:
        admin.nama,

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    };

    await packageRef.set(
      packageData
    );

    // =================================================
    // SYSTEM LOG
    // =================================================

    await db
      .collection("systemLogs")
      .add({
        action:
          "CREATE_PACKAGE",

        actorUid:
          admin.uid,

        actorName:
          admin.nama,

        targetId:
          packageRef.id,

        targetCollection:
          "packages",

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin membuat paket ${nama} (${kode})`,
      });

    return NextResponse.json(
      {
        success: true,

        message:
          "Paket berhasil dibuat.",

        data: {
          id: packageRef.id,
          ...packageData,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(
      "POST ADMIN PACKAGE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}