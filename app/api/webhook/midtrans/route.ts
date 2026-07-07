import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { decrypt } from "@/lib/crypto";
import crypto from "crypto";


export const dynamic = "force-dynamic";

const success = (message: string) =>
  NextResponse.json({ success: true, message });

const failed = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function GET() {
  return success("Webhook Midtrans aktif.");
}

export async function POST(req: Request) {
  try {

    const adminDb = getAdminDb();
    const auth = getAuth();

    const body = await req.json();

    console.log("========== MIDTRANS WEBHOOK ==========");
    console.log(body);

    // Test Notification Midtrans
    if (!body.order_id)
      return success("Webhook aktif.");

    const {
      order_id,
      transaction_status,
      status_code,
      gross_amount,
      signature_key,
      payment_type,
      transaction_id
    } = body;

    // ==========================
    // VALIDASI SIGNATURE
    // ==========================

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey)
      throw new Error("MIDTRANS_SERVER_KEY belum diatur.");

    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (expectedSignature !== signature_key)
      return failed("Invalid Signature", 403);

    console.log("Signature VALID");

    // ==========================
    // STATUS PEMBAYARAN
    // ==========================

    const paidStatus = ["settlement", "capture"];

    if (!paidStatus.includes(transaction_status)) {

      console.log("Status :", transaction_status);

      return success("Tidak perlu diproses.");

    }

    // ==========================
    // AMBIL TRANSACTION
    // ==========================

    const trxRef = adminDb.collection("transactions").doc(order_id);
    const trxDoc = await trxRef.get();

if (!trxDoc.exists) {
  console.log("Dummy notification dari Midtrans:", order_id);

  return success("Dummy notification diterima.");
}

    const trx = trxDoc.data()!;

    // ==========================
    // CEK SUDAH DIPROSES
    // ==========================

    if (trx.paymentStatus === "PAID") {
  console.log("Transaction sudah diproses.");
  return success("Sudah diproses.");
}
        // ==========================
    // FIREBASE AUTH
    // ==========================

    let userRecord;

    try {

      userRecord = await auth.getUserByEmail(trx.email);

      console.log("User sudah ada.");

    } catch (error: any) {

  if (error.code !== "auth/user-not-found")
    throw error;

  console.log("Membuat Firebase Auth...");

// Pastikan password terenkripsi tersedia
if (!trx.encryptedPassword) {
  throw new Error("Encrypted password tidak ditemukan.");
}

// Dekripsi password
const password = decrypt(trx.encryptedPassword);
console.log("Password berhasil didekripsi");

userRecord = await auth.createUser({
  email: trx.email,
  password,
  displayName: trx.nama
});

console.log("Firebase Auth berhasil.");

    }

    // ==========================
    // AMBIL PACKAGE
    // ==========================

    const packageRef = adminDb.collection("packages").doc(trx.packageId);
    const packageDoc = await packageRef.get();

    if (!packageDoc.exists)
      throw new Error("Package tidak ditemukan.");

    const packageData = packageDoc.data()!;

    if (!packageData.aktif)
      throw new Error("Package tidak aktif.");

    // ==========================
    // HITUNG MASA AKTIF
    // ==========================

    const activatedAt = new Date();
    const expiredAt = new Date(activatedAt);

    expiredAt.setDate(
      expiredAt.getDate() + Number(packageData.durasiHari ?? 30)
    );

    // ==========================
    // USERS
    // ==========================

    const now = new Date().toISOString();

    // ==========================
    // SETTINGS MEMBER
    // ==========================

    const memberSettingDoc = await adminDb
      .collection("settings")
      .doc("member")
      .get();

    const memberSetting = memberSettingDoc.data() ?? {};

    await adminDb.collection("users").doc(userRecord.uid).set({

      uid: userRecord.uid,

      nama: trx.nama,
      email: trx.email,
      wa: trx.wa,
      tglLahir: trx.tglLahir,

      role: "member",
      status: "ACTIVE",

      educationLevelId: trx.educationLevelId,
      packageId: trx.packageId,

      activatedAt: activatedAt.toISOString(),
      expiredAt: expiredAt.toISOString(),

      createdAt: trx.createdAt ?? now,
      updatedAt: now,

      photoURL: null,

      lastLoginAt: null,

      loginCount: 0,

      maxDevice: Number(memberSetting.maxDevice ?? 1),

      currentDevice: [],

      referralCode: null,

      referredBy: trx.affiliateId ?? null

    }, { merge: true });

    
    // ==========================
    // REFERRAL
    // ==========================

    if (trx.affiliateId) {

      const referralRef = adminDb.collection("referrals").doc(order_id);
      await referralRef.set({

        affiliateId: trx.affiliateId,

        userId: userRecord.uid,

        transactionId: trx.orderId,

        createdAt: now,

        status: "PAID"

      });

      await adminDb.collection("affiliates").doc(trx.affiliateId).update({

        totalReferral: FieldValue.increment(1),

        updatedAt: now

      });

    }

    // ==========================
    // USER LOG
    // ==========================

    await adminDb.collection("logs").doc(order_id).set({
      action: "PAYMENT_SUCCESS",

      createdAt: now,

      source: "MIDTRANS",

      transactionId: trx.orderId,

      uid: userRecord.uid

    });
    
    // ==========================
    // COMMISSION
    // ==========================

    if (trx.voucherId) {

      const voucherDoc = await adminDb
        .collection("vouchers")
        .doc(trx.voucherId)
        .get();

      if (voucherDoc.exists) {

        const voucher = voucherDoc.data()!;

        if (voucher.komisiAktif === true) {

          let commission = 0;

          if (voucher.komisiTipe === "persen") {

            commission = Math.floor(
              trx.grandTotal * Number(voucher.komisiNilai ?? 0) / 100
            );

          } else {

            commission = Number(voucher.komisiNilai ?? 0);

          }

          if (commission > 0 && voucher.partnerUid) {

            const commissionRef = adminDb.collection("commissions").doc(order_id + "_partner");
            await commissionRef.set({

              amount: commission,

              createdAt: now,

              partnerUid: voucher.partnerUid,

              source: "voucher",

              status: "PENDING",

              transactionId: trx.orderId,

              updatedAt: now,

              userId: userRecord.uid,

              voucherId: trx.voucherId

            });

          }

        }

      }

    }

    // ==========================
    // AFFILIATE COMMISSION
    // ==========================

    if (trx.affiliateId) {

      const affiliateSetting = await adminDb
        .collection("settings")
        .doc("affiliate")
        .get();

      const setting = affiliateSetting.data() ?? {};

      let commission = 0;

      if (setting.commissionType === "persen") {

        commission = Math.floor(
          trx.grandTotal * Number(setting.commissionValue ?? 0) / 100
        );

      } else {

        commission = Number(setting.commissionValue ?? 0);

      }

      if (commission > 0) {

        await adminDb.collection("commissions").doc(order_id + "_affiliate").set({

          affiliateId: trx.affiliateId,

          amount: commission,

          createdAt: now,

          source: "affiliate",

          status: "PENDING",

          transactionId: trx.orderId,

          updatedAt: now,

          userId: userRecord.uid

        });

        await adminDb.collection("affiliates")
          .doc(trx.affiliateId)
          .update({

            pending: FieldValue.increment(commission),

            totalKomisi: FieldValue.increment(commission),

            updatedAt: now

          });

      }

    }
        // ==========================
    // UPDATE TRANSACTION
    // ==========================

    await trxRef.update({

      uid: userRecord.uid,

      paymentStatus: "PAID",

      paymentType: payment_type ?? null,

      transactionId: transaction_id ?? null,

      paidAt: now,

      updatedAt: now,

      encryptedPassword: FieldValue.delete()

    });

    console.log("=================================");
    console.log("MIDTRANS WEBHOOK BERHASIL");
    console.log("Order :", trx.orderId);
    console.log("User  :", trx.email);
    console.log("=================================");

    return NextResponse.json({

      success: true,

      message: "Webhook berhasil diproses."

    });

  } catch (error: any) {

  console.error("========== WEBHOOK ERROR ==========");
  console.error(error);
  console.error(error?.stack);

  return NextResponse.json({
    success: false,
    message: error?.message,
    stack: error?.stack
  }, {
    status: 500
  });

}
}