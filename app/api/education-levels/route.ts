import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db.collection("educationLevels").get();

    const educationLevels = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          nama: data.nama ?? "",
          aktif: data.aktif ?? true,
          urutan: data.urutan ?? 999,
        };
      })
      .filter((item) => item.aktif)
      .sort((a, b) => a.urutan - b.urutan)
      .map(({ aktif, urutan, ...item }) => item);

    return NextResponse.json(
      {
        success: true,
        data: educationLevels,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/education-levels error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Gagal mengambil data jenjang.",
      },
      { status: 500 }
    );
  }
}