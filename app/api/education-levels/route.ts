import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db
      .collection("educationLevels")
      .get();

    const educationLevels = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        const nama =
          typeof data.nama === "string"
            ? data.nama.trim()
            : typeof data.name === "string"
              ? data.name.trim()
              : "";

        const aktif =
          data.aktif !== undefined
            ? data.aktif === true
            : data.isActive !== undefined
              ? data.isActive === true
              : true;

        const urutan = Number(
          data.urutan ??
            data.order ??
            999
        );

        return {
          id: doc.id,
          nama,
          aktif,
          urutan: Number.isFinite(urutan)
            ? urutan
            : 999,
        };
      })
      .filter(
        (item) =>
          item.aktif &&
          item.nama.length > 0
      )
      .sort(
        (a, b) =>
          a.urutan - b.urutan
      )
      .map((item) => ({
        id: item.id,
        nama: item.nama,
      }));

    console.log(
      "EDUCATION LEVELS:",
      educationLevels
    );

    return NextResponse.json(
      {
        success: true,
        data: educationLevels,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET /api/education-levels error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: [],
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data jenjang.",
      },
      { status: 500 }
    );
  }
}