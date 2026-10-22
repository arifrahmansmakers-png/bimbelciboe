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
    console.error("VERIFY ADMIN TRANSACTIONS ERROR:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const admin = await verifyAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Hanya untuk administrator." },
        { status: 403 }
      );
    }

    const db = getAdminDb();
    const snap = await db.collection("transactions").get();

    const transactions = snap.docs.map((doc) => {
      const data = doc.data();
      const rawCreated = data.createdAt;
      let createdAtStr = "";
      if (rawCreated?.toDate) {
        createdAtStr = rawCreated.toDate().toISOString();
      } else if (typeof rawCreated === "string") {
        createdAtStr = rawCreated;
      } else if (rawCreated instanceof Date) {
        createdAtStr = rawCreated.toISOString();
      }

      return {
        id: doc.id,
        orderId: data.orderId || doc.id,
        nama: data.nama || data.user || "Tanpa Nama",
        email: data.email || "-",
        packageNama: data.packageNama || data.package || "Paket Bimbel",
        grandTotal: Number(data.grandTotal ?? data.grossAmount ?? data.packageHarga ?? 0),
        status: (data.paymentStatus || data.transactionStatus || data.status || "PENDING").toUpperCase(),
        paymentType: data.paymentType || "-",
        createdAt: createdAtStr || new Date().toISOString(),
      };
    });

    // Sort by createdAt desc
    transactions.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return timeB - timeA;
    });

    return NextResponse.json({
      success: true,
      data: transactions,
    });
  } catch (err: any) {
    console.error("GET TRANSACTIONS ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Gagal mengambil data transaksi." },
      { status: 500 }
    );
  }
}
