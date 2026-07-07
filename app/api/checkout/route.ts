import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { encrypt } from "@/lib/crypto";
import { verifyCaptcha } from "@/lib/captcha";

export const dynamic = "force-dynamic";

interface CheckoutRequest {
  orderId: string;
  nama: string;
  email: string;
  wa: string;
  tglLahir: string;
  password: string;
  educationLevelId: string;
  packageId: string;
  promoCode?: string;
  captchaToken: string;
}

const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(req: Request) {
  try {
    const adminDb = getAdminDb();
    const midtransClient = await import("midtrans-client");
    const body = await req.json() as CheckoutRequest;

    const {
      orderId,
      nama,
      email,
      wa,
      tglLahir,
      password,
      educationLevelId,
      packageId,
      promoCode,
      captchaToken
    } = body;

    if (!orderId) return error("Order ID tidak valid.");
    if (!nama) return error("Nama wajib diisi.");
    const cleanNama = nama.trim();
    if (!email) return error("Email wajib diisi.");

    const normalizedEmail = email.trim().toLowerCase();
    const auth = await import("firebase-admin/auth");

      try {
        await auth.getAuth().getUserByEmail(email);

        return error("Email sudah terdaftar. Silakan login.");
      } catch (err: any) {
        if (err.code !== "auth/user-not-found") {
          throw err;
        }
      }

      const existingTransaction = await adminDb
          .collection("transactions")
          .where("email", "==", email)
          .where("paymentStatus", "==", "PENDING")
          .limit(1)
          .get();

        if (!existingTransaction.empty) {
          return error(
            "Masih ada transaksi yang belum diselesaikan menggunakan email ini."
          );
        }

    if (!password) return error("Password wajib diisi.");
const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/;

if (!passwordRegex.test(password)) {
    return error(
        "Password minimal 8 karakter serta mengandung huruf besar, huruf kecil, angka dan simbol."
    );
}

    if (!wa) return error("Nomor WhatsApp wajib diisi.");
    if (!educationLevelId) return error("Jenjang belum dipilih.");
    if (!packageId) return error("Paket belum dipilih.");

    const trxRef = adminDb.collection("transactions").doc(orderId);

    if ((await trxRef.get()).exists)
      return error("Order sudah pernah dibuat.");

    if (!captchaToken) {
  return error("Captcha wajib diisi.")};

  const captchaValid = await verifyCaptcha(captchaToken);

if (!captchaValid) {
  return error("Captcha tidak valid.");
}

    // ==========================
    // PACKAGE
    // ==========================

    const packageSnap = await adminDb.collection("packages").doc(packageId).get();

    if (!packageSnap.exists)
      return error("Paket tidak ditemukan.");

    const packageData = packageSnap.data()!;

    if (!packageData.aktif)
      return error("Paket sedang tidak aktif.");

    const subtotal = Number(packageData.harga);

    if (Number.isNaN(subtotal) || subtotal <= 0)
      throw new Error("Harga paket tidak valid.");

    // ==========================
    // PROMO DEFAULT
    // ==========================

    const code = promoCode?.trim().toUpperCase() ?? "";

    let discount = 0;
    let voucherId: string | null = null;
    let affiliateId: string | null = null;
    let promoType: "NONE" | "VOUCHER" | "PARTNER" | "AFFILIATE" = "NONE";
        // ==========================
    // VALIDASI PROMO
    // ==========================

    if (code) {

      // PRIORITAS 1 : VOUCHER
      const voucherSnap = await adminDb.collection("vouchers").doc(code).get();

      if (voucherSnap.exists) {

        const voucher = voucherSnap.data()!;
        const now = Date.now();

        if (!voucher.aktif)
          return error("Voucher tidak aktif.");

        if (voucher.berlakuMulai?.toMillis() > now)
          return error("Voucher belum berlaku.");

        if (voucher.berlakuSampai?.toMillis() < now)
          return error("Voucher sudah berakhir.");

        if ((voucher.kuota ?? 0) > 0 && (voucher.digunakan ?? 0) >= voucher.kuota)
          return error("Kuota voucher telah habis.");

        if ((voucher.minimalPembelian ?? 0) > subtotal)
          return error(`Minimal pembelian Rp${voucher.minimalPembelian.toLocaleString("id-ID")}.`);

        voucherId = voucherSnap.id;
        promoType = voucher.jenis === "partner" ? "PARTNER" : "VOUCHER";

        if (voucher.diskonTipe === "persen")
          discount = Math.floor(subtotal * Number(voucher.diskonNilai ?? 0) / 100);
        else
          discount = Number(voucher.diskonNilai ?? 0);

      } else {

            // PRIORITAS 2 : AFFILIATE
        const affiliateQuery = await adminDb
        .collection("affiliates")
        .where("kode", "==", code)
        .limit(1)
        .get();

        if (affiliateQuery.empty)
        return error("Kode affiliate tidak ditemukan.");

        const affiliateDoc = affiliateQuery.docs[0];
        const affiliate = affiliateDoc.data()!;

        if (!affiliate.aktif)
        return error("Kode affiliate tidak aktif.");

        affiliateId = affiliateDoc.id;
        promoType = "AFFILIATE";

      }

    }

    if (discount > subtotal)
      discount = subtotal;

    const grandTotal = subtotal - discount;

    if (grandTotal < 0)
      throw new Error("Grand total tidak valid.");

    // ==========================
    // MIDTRANS
    // ==========================

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey)
      throw new Error("MIDTRANS_SERVER_KEY belum diatur.");

    console.log("SERVER KEY:", process.env.MIDTRANS_SERVER_KEY);
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey
    });

    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: grandTotal
      },
      customer_details: {
        first_name: nama,
        email,
        phone: wa
      },
      item_details: [{
        id: packageId,
        name: packageData.nama,
        quantity: 1,
        price: grandTotal
      }]
    });

    // ==========================
    // SIMPAN TRANSACTION
    // ==========================

    await trxRef.set({
      orderId,
      uid: null,

      nama,
      email,
      wa,
      tglLahir,

      educationLevelId,
      packageId,

      subtotal,
      discount,
      grandTotal,

      promoCode: code || null,
      promoType,
      voucherId,
      affiliateId,

      paymentStatus: "PENDING",
      paymentType: null,
      transactionId: null,

      snapToken: transaction.token,
      snapRedirectUrl: transaction.redirect_url,

      status: "PENDING",

      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      paidAt: null,

      encryptedPassword: encrypt(password)
    });
  console.log("TRANSACTION SAVED:", orderId);

    return NextResponse.json({
      success: true,
      orderId,
      token: transaction.token,
      redirectUrl: transaction.redirect_url
    });

  } catch (error) {

    console.error("CHECKOUT ERROR");
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error"
    }, {
      status: 500
    });

  }
}