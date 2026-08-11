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

  const token = authHeader.substring(7);

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

    const user = userDoc.data();

    if (user?.role !== "admin") {
      return null;
    }

    return {
      uid: decoded.uid,
      nama:
        user.nama ?? "Administrator",
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
// GET /api/admin/packages/[id]
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
        "ID paket tidak ditemukan."
      );
    }

    const db = getAdminDb();

    const packageRef = db
      .collection("packages")
      .doc(id);

    const packageDoc =
      await packageRef.get();

    if (!packageDoc.exists) {
      return failed(
        "Paket tidak ditemukan.",
        404
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        id: packageDoc.id,
        ...packageDoc.data(),
      },
    });
  } catch (error: unknown) {
    console.error(
      "GET ADMIN PACKAGE ERROR:",
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
// PATCH /api/admin/packages/[id]
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
        "ID paket tidak ditemukan."
      );
    }

    const body = await req.json();

    const db = getAdminDb();

    const packageRef = db
      .collection("packages")
      .doc(id);

    const packageDoc =
      await packageRef.get();

    if (!packageDoc.exists) {
      return failed(
        "Paket tidak ditemukan.",
        404
      );
    }

    // =================================================
    // VALIDASI FIELD
    // =================================================

    const updateData: Record<
      string,
      unknown
    > = {};

    if (
      body.kode !== undefined
    ) {
      const kode =
        String(body.kode)
          .trim()
          .toUpperCase();

      if (!kode) {
        return failed(
          "Kode paket tidak boleh kosong."
        );
      }

      updateData.kode = kode;
    }

    if (
      body.nama !== undefined
    ) {
      const nama =
        String(body.nama).trim();

      if (!nama) {
        return failed(
          "Nama paket tidak boleh kosong."
        );
      }

      updateData.nama = nama;
    }

    if (
      body.harga !== undefined
    ) {
      const harga =
        Number(body.harga);

      if (
        !Number.isFinite(harga) ||
        harga < 0
      ) {
        return failed(
          "Harga paket tidak valid."
        );
      }

      updateData.harga =
        Math.floor(harga);
    }

    if (
      body.durasiHari !== undefined
    ) {
      const durasiHari =
        Number(
          body.durasiHari
        );

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

      updateData.durasiHari =
        Math.floor(durasiHari);
    }

    if (
      body.deskripsi !== undefined
    ) {
      updateData.deskripsi =
        String(
          body.deskripsi ?? ""
        ).trim();
    }

    if (
      body.warna !== undefined
    ) {
      updateData.warna =
        body.warna
          ? String(body.warna)
          : null;
    }

    if (
      body.icon !== undefined
    ) {
      updateData.icon =
        body.icon
          ? String(body.icon)
          : null;
    }

    if (
      body.fitur !== undefined
    ) {
      if (!Array.isArray(body.fitur)) {
        return failed(
          "Fitur paket harus berupa array."
        );
      }

      updateData.fitur =
        body.fitur
          .map((item: unknown) =>
            String(item).trim()
          )
          .filter(Boolean);
    }

    // =================================================
    // AFFILIATE COMMISSION
    // =================================================

    if (
      body.affiliateCommissionType !==
      undefined
    ) {
      const type =
        body.affiliateCommissionType;

      if (
        type !== null &&
        type !== "percent" &&
        type !== "fixed"
      ) {
        return failed(
          "Tipe komisi affiliate tidak valid."
        );
      }

      updateData.affiliateCommissionType =
        type;
    }

    if (
      body.affiliateCommissionValue !==
      undefined
    ) {
      const value =
        Number(
          body.affiliateCommissionValue
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Nilai komisi affiliate tidak valid."
        );
      }

      updateData.affiliateCommissionValue =
        value;
    }

    // =================================================
    // PARTNER COMMISSION
    // =================================================

    if (
      body.partnerCommissionType !==
      undefined
    ) {
      const type =
        body.partnerCommissionType;

      if (
        type !== null &&
        type !== "percent" &&
        type !== "fixed"
      ) {
        return failed(
          "Tipe komisi partner tidak valid."
        );
      }

      updateData.partnerCommissionType =
        type;
    }

    if (
      body.partnerCommissionValue !==
      undefined
    ) {
      const value =
        Number(
          body.partnerCommissionValue
        );

      if (
        !Number.isFinite(value) ||
        value < 0
      ) {
        return failed(
          "Nilai komisi partner tidak valid."
        );
      }

      updateData.partnerCommissionValue =
        value;
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
    // JIKA TIDAK ADA DATA
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

    await packageRef.update(
      updateData
    );

    // =================================================
    // SYSTEM LOG
    // =================================================

    await db
      .collection("systemLogs")
      .add({
        action:
          "UPDATE_PACKAGE",

        actorUid:
          admin.uid,

        actorName:
          admin.nama,

        targetId:
          id,

        targetCollection:
          "packages",

        changes:
          updateData,

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin memperbarui paket ${id}`,
      });

    return NextResponse.json({
      success: true,

      message:
        "Paket berhasil diperbarui.",
    });
  } catch (error: unknown) {
    console.error(
      "PATCH ADMIN PACKAGE ERROR:",
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
// DELETE /api/admin/packages/[id]
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
        "ID paket tidak ditemukan."
      );
    }

    const db = getAdminDb();

    const packageRef = db
      .collection("packages")
      .doc(id);

    const packageDoc =
      await packageRef.get();

    if (!packageDoc.exists) {
      return failed(
        "Paket tidak ditemukan.",
        404
      );
    }

    // =================================================
    // JANGAN HAPUS FISIK.
    //
    // Lebih aman menonaktifkan paket karena transaksi
    // lama dapat masih mereferensikan packageId.
    // =================================================

    await packageRef.update({
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
          "DISABLE_PACKAGE",

        actorUid:
          admin.uid,

        actorName:
          admin.nama,

        targetId:
          id,

        targetCollection:
          "packages",

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin menonaktifkan paket ${id}`,
      });

    return NextResponse.json({
      success: true,

      message:
        "Paket berhasil dinonaktifkan.",
    });
  } catch (error: unknown) {
    console.error(
      "DELETE ADMIN PACKAGE ERROR:",
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