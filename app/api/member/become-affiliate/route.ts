import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { generateReferralCode } from "@/lib/utils/generateReferralCode";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const adminDb = getAdminDb();
    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const idToken = authHeader.substring(7).trim();

    if (!idToken) {
      return NextResponse.json({ success: false, message: "Token tidak valid." }, { status: 401 });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userRef = adminDb.collection("users").doc(uid);
    const affiliateRef = adminDb.collection("affiliates").doc(uid);

    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ success: false, message: "User tidak ditemukan." }, { status: 404 });
    }

    const user = userDoc.data()!;

    if (user.status && user.status !== "ACTIVE") {
      return NextResponse.json({ success: false, message: "Akun Anda belum aktif." }, { status: 403 });
    }

    if (user.isAffiliate === true) {
      return NextResponse.json({ success: false, message: "Anda sudah terdaftar sebagai affiliate.", affiliateCode: user.referralCode ?? null });
    }

    const existingAffiliate = await affiliateRef.get();

    if (existingAffiliate.exists) {
      const affiliate = existingAffiliate.data()!;

      await userRef.set({
        role: "member",
        isAffiliate: affiliate.active === true,
        affiliateRef,
        referralCode: affiliate.referralCode ?? null,
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });

      return NextResponse.json({
        success: affiliate.active === true,
        message: affiliate.active === true ? "Anda sudah terdaftar sebagai affiliate." : "Data affiliate ditemukan tetapi belum aktif.",
        affiliateCode: affiliate.referralCode ?? null,
        active: affiliate.active === true
      });
    }

    const referralCode = await generateReferralCode();

    const existingCode = await adminDb
      .collection("affiliates")
      .where("referralCode", "==", referralCode)
      .limit(1)
      .get();

    if (!existingCode.empty) {
      return NextResponse.json({ success: false, message: "Kode affiliate sudah digunakan. Silakan coba lagi." }, { status: 409 });
    }

    const now = FieldValue.serverTimestamp();

    await adminDb.runTransaction(async (transaction) => {
      transaction.set(affiliateRef, {
        uid,
        userRef,
        referralCode,
        active: true,
        saldo: 0,
        pending: 0,
        withdraw: 0,
        totalKomisi: 0,
        totalReferral: 0,
        bank: "",
        nomorRekening: "",
        namaRekening: "",
        joinedAt: now,
        createdAt: now,
        updatedAt: now
      });

      transaction.set(userRef, {
        role: "member",
        isAffiliate: true,
        affiliateRef,
        referralCode,
        updatedAt: now
      }, { merge: true });
    });

    return NextResponse.json({
      success: true,
      message: "Affiliate berhasil diaktifkan.",
      affiliateId: uid,
      affiliateCode: referralCode,
      active: true
    }, { status: 201 });
  } catch (error) {
    console.error("BECOME AFFILIATE ERROR:", error);

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error"
    }, { status: 500 });
  }
}