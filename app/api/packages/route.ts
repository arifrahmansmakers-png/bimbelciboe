import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db.collection("packages").get();

    const packages = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          kode: data.kode ?? "",
          nama: data.nama ?? "",
          harga: Number(data.harga ?? 0),
          durasiHari: Number(data.durasiHari ?? 0),
          deskripsi: data.deskripsi ?? "",
          warna: data.warna ?? "#2563eb",
          icon: data.icon ?? "",
          fitur: Array.isArray(data.fitur) ? data.fitur : [],
          aktif: data.aktif ?? false,
          urutan: Number(data.urutan ?? 999),
        };
      })
      .filter((pkg) => pkg.aktif)
      .sort((a, b) => a.urutan - b.urutan)
      .map(({ aktif, urutan, ...pkg }) => pkg);

    return NextResponse.json(
      {
        success: true,
        data: packages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/packages:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data paket.",
      },
      { status: 500 }
    );
  }
}