import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

function json(
  data: Record<string, unknown>,
  status = 200
) {
  return NextResponse.json(data, { status });
}

async function verifyAdmin(req: NextRequest) {
  const authorization =
    req.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.substring(7).trim();

  if (!token) {
    return null;
  }

  try {
    const auth = getAuth();

    const decoded =
      await auth.verifyIdToken(token);

    const db = getAdminDb();

    const userSnap = await db
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userSnap.exists) {
      return null;
    }

    const user = userSnap.data();

    if (user?.role !== "admin") {
      return null;
    }

    return {
      uid: decoded.uid,
      nama: user.nama ?? "Administrator",
    };
  } catch (error) {
    console.error(
      "VERIFY ADMIN VOUCHERS ERROR:",
      error
    );

    return null;
  }
}

/**
 * GET
 *
 * Mengambil daftar voucher.
 */
export async function GET(
  req: NextRequest
) {
  try {
    const admin = await verifyAdmin(req);

    if (!admin) {
      return json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const db = getAdminDb();

    const snapshot = await db
      .collection("vouchers")
      .get();

    const vouchers = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    vouchers.sort((a: any, b: any) => {
      const aTime =
        a.createdAt?.toMillis?.() ?? 0;

      const bTime =
        b.createdAt?.toMillis?.() ?? 0;

      return bTime - aTime;
    });

    return json({
      success: true,
      vouchers,
    });
  } catch (error: any) {
    console.error(
      "GET ADMIN VOUCHERS ERROR:",
      error
    );

    return json(
      {
        success: false,
        message:
          error?.message ??
          "Gagal mengambil data voucher.",
      },
      500
    );
  }
}

/**
 * POST
 *
 * Membuat voucher baru.
 */
export async function POST(
  req: NextRequest
) {
  try {
    const admin = await verifyAdmin(req);

    if (!admin) {
      return json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const body = await req.json();

    const code = String(
      body.code ?? ""
    )
      .trim()
      .toUpperCase();

    const description = String(
      body.description ?? ""
    ).trim();

    const discountType =
      body.discountType === "percent"
        ? "percent"
        : "nominal";

    const discountValue = Number(
      body.discountValue ?? 0
    );

    const minPurchase = Number(
      body.minPurchase ?? 0
    );

    const maxUsage =
      body.maxUsage === null ||
      body.maxUsage === undefined ||
      body.maxUsage === ""
        ? null
        : Number(body.maxUsage);

    const active =
      body.active !== false;

    const expiredAt =
      body.expiredAt
        ? new Date(body.expiredAt)
        : null;

    if (!code) {
      return json(
        {
          success: false,
          message: "Kode voucher wajib diisi.",
        },
        400
      );
    }

    if (!/^[A-Z0-9_-]{3,50}$/.test(code)) {
      return json(
        {
          success: false,
          message:
            "Kode voucher hanya boleh berisi huruf, angka, underscore, atau tanda minus.",
        },
        400
      );
    }

    if (
      !Number.isFinite(discountValue) ||
      discountValue <= 0
    ) {
      return json(
        {
          success: false,
          message:
            "Nilai diskon harus lebih dari 0.",
        },
        400
      );
    }

    if (
      discountType === "percent" &&
      discountValue > 100
    ) {
      return json(
        {
          success: false,
          message:
            "Diskon persentase tidak boleh lebih dari 100%.",
        },
        400
      );
    }

    if (
      !Number.isFinite(minPurchase) ||
      minPurchase < 0
    ) {
      return json(
        {
          success: false,
          message:
            "Minimum pembelian tidak valid.",
        },
        400
      );
    }

    if (
      maxUsage !== null &&
      (!Number.isFinite(maxUsage) ||
        maxUsage < 1)
    ) {
      return json(
        {
          success: false,
          message:
            "Batas penggunaan voucher tidak valid.",
        },
        400
      );
    }

    if (
      expiredAt &&
      Number.isNaN(expiredAt.getTime())
    ) {
      return json(
        {
          success: false,
          message:
            "Tanggal kedaluwarsa tidak valid.",
        },
        400
      );
    }

    const db = getAdminDb();

    const existing = await db
      .collection("vouchers")
      .where("code", "==", code)
      .limit(1)
      .get();

    if (!existing.empty) {
      return json(
        {
          success: false,
          message:
            "Kode voucher sudah digunakan.",
        },
        409
      );
    }

    const voucherRef =
      db.collection("vouchers").doc();

    await voucherRef.set({
      code,

      description:
        description || null,

      discountType,

      discountValue,

      minPurchase,

      maxUsage,

      used: 0,

      active,

      expiredAt,

      createdBy: admin.uid,

      createdByName: admin.nama,

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    return json(
      {
        success: true,
        message:
          "Voucher berhasil dibuat.",
        voucher: {
          id: voucherRef.id,
          code,
          description:
            description || null,
          discountType,
          discountValue,
          minPurchase,
          maxUsage,
          used: 0,
          active,
          expiredAt,
        },
      },
      201
    );
  } catch (error: any) {
    console.error(
      "POST ADMIN VOUCHERS ERROR:",
      error
    );

    return json(
      {
        success: false,
        message:
          error?.message ??
          "Gagal membuat voucher.",
      },
      500
    );
  }
}