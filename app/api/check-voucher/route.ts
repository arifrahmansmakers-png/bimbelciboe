import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const kode =
      typeof body.kode === "string"
        ? body.kode.trim().toUpperCase()
        : "";

    const packageId =
      typeof body.packageId === "string"
        ? body.packageId.trim()
        : "";

    if (!kode || !packageId) {
      return NextResponse.json({
        success: false,
        message: "Data tidak lengkap.",
      });
    }

    const db = getAdminDb();

    // =====================================================
    // PAKET
    // =====================================================

    const packageDoc = await db
      .collection("packages")
      .doc(packageId)
      .get();

    if (!packageDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Paket tidak ditemukan.",
      });
    }

    const paket = packageDoc.data();

    if (paket?.isActive !== true) {
      return NextResponse.json({
        success: false,
        message: "Paket tidak tersedia.",
      });
    }

    const harga = Number(paket?.price ?? 0);

    if (!Number.isFinite(harga) || harga <= 0) {
      return NextResponse.json({
        success: false,
        message: "Harga paket tidak valid.",
      });
    }

    // =====================================================
    // VOUCHER
    // =====================================================

    const voucherDoc = await db
      .collection("vouchers")
      .doc(kode)
      .get();

    if (!voucherDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Voucher tidak ditemukan.",
      });
    }

    const voucher = voucherDoc.data();

    // =====================================================
    // STATUS
    // =====================================================

    if (voucher?.active !== true) {
      return NextResponse.json({
        success: false,
        message: "Voucher tidak aktif.",
      });
    }

    // =====================================================
    // TANGGAL
    // FIELD ASLI FIRESTORE:
    // validFrom
    // validUntil
    // =====================================================

    const now = new Date();

    let validFrom: Date | null = null;
    let validUntil: Date | null = null;

    if (voucher?.validFrom) {
      if (
        typeof voucher.validFrom.toDate === "function"
      ) {
        validFrom = voucher.validFrom.toDate();
      } else {
        const date = new Date(
          voucher.validFrom
        );

        if (!Number.isNaN(date.getTime())) {
          validFrom = date;
        }
      }
    }

    if (voucher?.validUntil) {
      if (
        typeof voucher.validUntil.toDate === "function"
      ) {
        validUntil = voucher.validUntil.toDate();
      } else {
        const date = new Date(
          voucher.validUntil
        );

        if (!Number.isNaN(date.getTime())) {
          validUntil = date;
        }
      }
    }

    if (validFrom && validFrom > now) {
      return NextResponse.json({
        success: false,
        message: "Voucher belum berlaku.",
      });
    }

    if (validUntil && validUntil < now) {
      return NextResponse.json({
        success: false,
        message: "Voucher sudah berakhir.",
      });
    }

    // =====================================================
    // KUOTA
    // =====================================================

    const quota = Number(
      voucher?.quota ?? 0
    );

    const used = Number(
      voucher?.used ?? 0
    );

    if (
      quota > 0 &&
      used >= quota
    ) {
      return NextResponse.json({
        success: false,
        message: "Kuota voucher habis.",
      });
    }

    // =====================================================
    // MINIMUM PEMBELIAN
    // =====================================================

    const minimumPurchase = Number(
      voucher?.minimumPurchase ?? 0
    );

    if (
      minimumPurchase > 0 &&
      harga < minimumPurchase
    ) {
      return NextResponse.json({
        success: false,
        message:
          `Minimal transaksi Rp ${minimumPurchase.toLocaleString(
            "id-ID"
          )}.`,
      });
    }

    // =====================================================
    // DISKON
    //
    // FIELD ASLI FIRESTORE:
    // diskonType
    // diskonValue
    // =====================================================

    const diskonType =
      typeof voucher?.diskonType === "string"
        ? voucher.diskonType
            .trim()
            .toLowerCase()
        : "";

    const diskonValue = Number(
      voucher?.diskonValue ?? 0
    );

    // =====================================================
    // NORMALISASI JENIS DISKON
    // =====================================================

    let tipeDiskon:
      | "percent"
      | "fixed";

    if (
      diskonType === "percent" ||
      diskonType === "percentage" ||
      diskonType === "persen"
    ) {
      tipeDiskon = "percent";
    } else if (
      diskonType === "fixed" ||
      diskonType === "nominal" ||
      diskonType === "rupiah"
    ) {
      tipeDiskon = "fixed";
    } else {
      return NextResponse.json({
        success: false,
        message:
          "Jenis diskon voucher tidak valid.",
      });
    }

    // =====================================================
    // VALIDASI NILAI
    // =====================================================

    if (
      !Number.isFinite(diskonValue) ||
      diskonValue <= 0
    ) {
      return NextResponse.json({
        success: false,
        message:
          "Nilai diskon voucher tidak valid.",
      });
    }

    // =====================================================
    // HITUNG DISKON
    // =====================================================

    let potongan = 0;

    if (tipeDiskon === "percent") {
      if (diskonValue > 100) {
        return NextResponse.json({
          success: false,
          message:
            "Persentase diskon tidak valid.",
        });
      }

      potongan = Math.floor(
        (harga * diskonValue) / 100
      );
    } else {
      potongan = diskonValue;
    }

    potongan = Math.min(
      potongan,
      harga
    );

    const hargaAkhir =
      harga - potongan;

    if (hargaAkhir <= 0) {
      return NextResponse.json({
        success: false,
        message:
          "Harga setelah diskon tidak valid.",
      });
    }

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      voucher: {
        kode,

        type:
          typeof voucher?.type === "string"
            ? voucher.type
            : null,

        partnerUid:
          voucher?.partnerUid ??
          null,
      },

      paket: {
        id: packageDoc.id,

        slug:
          typeof paket?.slug === "string"
            ? paket.slug
            : null,

        nama:
          typeof paket?.name === "string"
            ? paket.name
            : "",

        harga,

        durasiHari:
          Number(
            paket?.durationDays ?? 0
          ),
      },

      hargaAwal: harga,

      potongan,

      hargaAkhir,

      diskon: {
        tipe: tipeDiskon,
        nilai: diskonValue,
      },

      minimumPurchase,

      validFrom:
        validFrom
          ? validFrom.toISOString()
          : null,

      validUntil:
        validUntil
          ? validUntil.toISOString()
          : null,
    });
  } catch (error) {
    console.error(
      "POST /api/check-voucher:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Gagal memeriksa voucher.",
      },
      {
        status: 500,
      }
    );
  }
}