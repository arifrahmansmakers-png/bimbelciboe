import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

async function verifyAdmin(req: NextRequest) {
  let token = "";
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  } else {
    token = req.cookies.get("__session")?.value || "";
  }

  if (!token) {
    return null;
  }

  try {
    let uid = "";
    try {
      const decoded = await getAuth().verifyIdToken(token);
      uid = decoded.uid;
    } catch {
      const decodedSession = await getAuth().verifySessionCookie(token, true);
      uid = decodedSession.uid;
    }

    const db = getAdminDb();
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return null;
    }

    const user = userDoc.data();
    if (user?.role !== "admin") {
      return null;
    }

    return {
      uid,
      nama: user.nama ?? "Administrator",
    };
  } catch (error) {
    console.error("VERIFY ADMIN DELETE TRANSACTION ERROR:", error);
    return null;
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Hanya untuk administrator." },
        { status: 403 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID transaksi tidak ditemukan." },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    const docRef = db.collection("transactions").doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan di database." },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json({
      success: true,
      message: `Transaksi ${id} berhasil dihapus dari laporan.`,
    });
  } catch (err: any) {
    console.error("DELETE TRANSACTION ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Gagal menghapus transaksi." },
      { status: 500 }
    );
  }
}
