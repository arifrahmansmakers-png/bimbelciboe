import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { kode, packageId } = await req.json();

    if (!kode || !packageId) {
      return NextResponse.json({
        success: false,
        message: "Data tidak lengkap.",
      });
    }

    const db = getAdminDb();

    // ambil paket
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

    const harga = paket?.harga ?? 0;

    // ambil voucher
    const voucherDoc = await db
      .collection("vouchers")
      .doc(kode.toUpperCase())
      .get();

    if (!voucherDoc.exists) {
      return NextResponse.json({
        success: false,
        message: "Voucher tidak ditemukan.",
      });
    }

    const voucher = voucherDoc.data();

    if (!voucher?.aktif) {
      return NextResponse.json({
        success: false,
        message: "Voucher tidak aktif.",
      });
    }

    const sekarang = new Date();

    if (voucher.mulai?.toDate() > sekarang) {
      return NextResponse.json({
        success: false,
        message: "Voucher belum berlaku.",
      });
    }

    if (voucher.selesai?.toDate() < sekarang) {
      return NextResponse.json({
        success: false,
        message: "Voucher sudah berakhir.",
      });
    }

    if (
      voucher.kuota &&
      voucher.digunakan >= voucher.kuota
    ) {
      return NextResponse.json({
        success: false,
        message: "Kuota voucher habis.",
      });
    }

    if (
      voucher.minimalPembelian &&
      harga < voucher.minimalPembelian
    ) {
      return NextResponse.json({
        success: false,
        message: `Minimal transaksi Rp ${voucher.minimalPembelian.toLocaleString("id-ID")}`,
      });
    }

    let potongan = 0;

    if (voucher.diskonTipe === "persen") {
      potongan = Math.round(
        harga * voucher.diskonNilai / 100
      );
    } else {
      potongan = voucher.diskonNilai;
    }

    if (potongan > harga) {
      potongan = harga;
    }

    return NextResponse.json({
      success: true,

      voucher: {
        kode: kode.toUpperCase(),
        jenis: voucher.jenis,
        partnerUid: voucher.partnerUid ?? null,
      },

      potongan,

      hargaAwal: harga,

      hargaAkhir: harga - potongan,

      komisi: voucher.komisiAktif
        ? {
            tipe: voucher.komisiTipe,
            nilai: voucher.komisiNilai,
          }
        : null,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Gagal memeriksa voucher.",
    });

  }
}