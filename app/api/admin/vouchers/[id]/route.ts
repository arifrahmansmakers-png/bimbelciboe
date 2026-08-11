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
// /api/admin/vouchers/[id]
// =====================================================

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    if (!id) {
      return failed(
        "ID voucher tidak ditemukan."
      );
    }

    const db = getAdminDb();

    const voucherRef = db
      .collection("vouchers")
      .doc(id);

    const voucherDoc =
      await voucherRef.get();

    if (!voucherDoc.exists) {
      return failed(
        "Voucher tidak ditemukan.",
        404
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        id: voucherDoc.id,
        ...voucherDoc.data(),
      },
    });
  } catch (error: unknown) {
    console.error(
      "GET ADMIN VOUCHER ERROR:",
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
// PATCH
// /api/admin/vouchers/[id]
// =====================================================

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    if (!id) {
      return failed(
        "ID voucher tidak ditemukan."
      );
    }

    const db = getAdminDb();

    const voucherRef = db
      .collection("vouchers")
      .doc(id);

    const voucherDoc =
      await voucherRef.get();

    if (!voucherDoc.exists) {
      return failed(
        "Voucher tidak ditemukan.",
        404
      );
    }

    const body =
      await req.json();

    const updateData: Record<
      string,
      unknown
    > = {};

    // =================================================
    // KODE
    // =================================================

    if (
      body.kode !== undefined
    ) {
      const kode =
        String(body.kode)
          .trim()
          .toUpperCase();

      if (!kode) {
        return failed(
          "Kode voucher tidak boleh kosong."
        );
      }

      // Cek kode digunakan voucher lain
      const duplicate =
        await db
          .collection("vouchers")
          .where(
            "kode",
            "==",
            kode
          )
          .limit(10)
          .get();

      const duplicateDoc =
        duplicate.docs.find(
          (doc) =>
            doc.id !== id
        );

      if (duplicateDoc) {
        return failed(
          `Kode voucher "${kode}" sudah digunakan.`
        );
      }

      updateData.kode =
        kode;
    }

    // =================================================
    // NAMA / DESKRIPSI
    // =================================================

    if (
      body.nama !== undefined
    ) {
      updateData.nama =
        String(
          body.nama ?? ""
        ).trim();
    }

    if (
      body.deskripsi !== undefined
    ) {
      updateData.deskripsi =
        String(
          body.deskripsi ?? ""
        ).trim();
    }

    // =================================================
    // TIPE DISKON
    // =================================================

    if (
      body.discountType !== undefined
    ) {
      const type =
        body.discountType;

      if (
        type !== "percent" &&
        type !== "fixed"
      ) {
        return failed(
          "Tipe diskon tidak valid."
        );
      }

      updateData.discountType =
        type;
    }

    // =================================================
    // NILAI DISKON
    // =================================================

    if (
      body.discountValue !== undefined
    ) {
      const value =
        Number(
          body.discountValue
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Nilai diskon tidak valid."
        );
      }

      updateData.discountValue =
        value;
    }

    // =================================================
    // MINIMUM PEMBELIAN
    // =================================================

    if (
      body.minPurchase !== undefined
    ) {
      const value =
        Number(
          body.minPurchase
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Minimum pembelian tidak valid."
        );
      }

      updateData.minPurchase =
        Math.floor(value);
    }

    // =================================================
    // MAKSIMUM DISKON
    // =================================================

    if (
      body.maxDiscount !== undefined
    ) {
      const value =
        Number(
          body.maxDiscount
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Maksimum diskon tidak valid."
        );
      }

      updateData.maxDiscount =
        Math.floor(value);
    }

    // =================================================
    // BATAS PENGGUNAAN
    // =================================================

    if (
      body.maxUsage !== undefined
    ) {
      const value =
        Number(
          body.maxUsage
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Batas penggunaan tidak valid."
        );
      }

      updateData.maxUsage =
        Math.floor(value);
    }

    // =================================================
    // STATUS
    // =================================================

    if (
      body.active !== undefined
    ) {
      updateData.active =
        Boolean(body.active);
    }

    // =================================================
    // TANGGAL MULAI
    // =================================================

    if (
      body.startAt !== undefined
    ) {
      if (
        body.startAt === null ||
        body.startAt === ""
      ) {
        updateData.startAt =
          null;
      } else {
        const date =
          new Date(
            body.startAt
          );

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return failed(
            "Tanggal mulai voucher tidak valid."
          );
        }

        updateData.startAt =
          date;
      }
    }

    // =================================================
    // TANGGAL BERAKHIR
    // =================================================

    if (
      body.expiredAt !== undefined
    ) {
      if (
        body.expiredAt === null ||
        body.expiredAt === ""
      ) {
        updateData.expiredAt =
          null;
      } else {
        const date =
          new Date(
            body.expiredAt
          );

        if (
          Number.isNaN(
            date.getTime()
          )
        ) {
          return failed(
            "Tanggal berakhir voucher tidak valid."
          );
        }

        updateData.expiredAt =
          date;
      }
    }

    // =================================================
    // PAKET YANG BERLAKU
    // =================================================

    if (
      body.packageIds !== undefined
    ) {
      if (
        !Array.isArray(
          body.packageIds
        )
      ) {
        return failed(
          "packageIds harus berupa array."
        );
      }

      updateData.packageIds =
        body.packageIds
          .map(
            (item: unknown) =>
              String(item).trim()
          )
          .filter(Boolean);
    }

    // =================================================
    // JIKA TIDAK ADA PERUBAHAN
    // =================================================

    if (
      Object.keys(updateData)
        .length === 0
    ) {
      return failed(
        "Tidak ada data yang diperbarui."
      );
    }

    // =================================================
    // UPDATE
    // =================================================

    updateData.updatedAt =
      FieldValue.serverTimestamp();

    updateData.updatedBy =
      admin.uid;

    await voucherRef.update(
      updateData
    );

    // =================================================
    // SYSTEM LOG
    // =================================================

    await db
      .collection("systemLogs")
      .add({
        action:
          "UPDATE_VOUCHER",

        actorUid:
          admin.uid,

        actorName:
          admin.nama,

        targetId:
          id,

        targetCollection:
          "vouchers",

        changes:
          updateData,

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin memperbarui voucher ${id}`,
      });

    return NextResponse.json({
      success: true,

      message:
        "Voucher berhasil diperbarui.",
    });
  } catch (error: unknown) {
    console.error(
      "PATCH ADMIN VOUCHER ERROR:",
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
// DELETE
// /api/admin/vouchers/[id]
// =====================================================

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
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

    const { id } = await params;

    if (!id) {
      return failed(
        "ID voucher tidak ditemukan."
      );
    }

    const db = getAdminDb();

    const voucherRef = db
      .collection("vouchers")
      .doc(id);

    const voucherDoc =
      await voucherRef.get();

    if (!voucherDoc.exists) {
      return failed(
        "Voucher tidak ditemukan.",
        404
      );
    }

    // =================================================
    // JANGAN HAPUS FISIK
    // =================================================

    await voucherRef.update({
      active: false,

      updatedAt:
        FieldValue.serverTimestamp(),

      updatedBy:
        admin.uid,
    });

    // =================================================
    // SYSTEM LOG
    // =================================================

    await db
      .collection("systemLogs")
      .add({
        action:
          "DISABLE_VOUCHER",

        actorUid:
          admin.uid,

        actorName:
          admin.nama,

        targetId:
          id,

        targetCollection:
          "vouchers",

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin menonaktifkan voucher ${id}`,
      });

    return NextResponse.json({
      success: true,

      message:
        "Voucher berhasil dinonaktifkan.",
    });
  } catch (error: unknown) {
    console.error(
      "DELETE ADMIN VOUCHER ERROR:",
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