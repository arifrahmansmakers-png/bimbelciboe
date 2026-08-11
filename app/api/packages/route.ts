import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db
      .collection("packages")
      .get();

    const packages = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,

          // Identitas paket
          slug:
            typeof data.slug === "string"
              ? data.slug
              : doc.id,

          kode:
            typeof data.kode === "string"
              ? data.kode
              : doc.id,

          nama:
            typeof data.name === "string"
              ? data.name
              : "",

          // Harga & durasi
          harga: Number(
            data.price ?? 0
          ),

          durasiHari: Number(
            data.durationDays ?? 0
          ),

          // Informasi paket
          deskripsi:
            typeof data.description === "string"
              ? data.description
              : "",

          fitur: Array.isArray(
            data.features
          )
            ? data.features
            : [],

          // Tampilan
          warna:
            typeof data.color === "string"
              ? data.color
              : "#2563eb",

          icon:
            typeof data.icon === "string"
              ? data.icon
              : "",

          // Status & urutan
          aktif:
            data.isActive === true,

          urutan: Number(
            data.order ?? 999
          )
        };
      })

      // Hanya paket yang aktif
      .filter(
        (pkg) => pkg.aktif
      )

      // Urut berdasarkan order
      .sort(
        (a, b) =>
          a.urutan - b.urutan
      )

      // Field internal tidak perlu dikirim
      .map(
        ({
          aktif,
          urutan,
          ...pkg
        }) => pkg
      );

    return NextResponse.json(
      {
        success: true,
        data: packages
      },
      {
        status: 200
      }
    );
  } catch (error) {
    console.error(
      "GET /api/packages:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data paket."
      },
      {
        status: 500
      }
    );
  }
}