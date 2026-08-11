import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAdminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { decrypt } from "@/lib/crypto";

export const dynamic = "force-dynamic";

interface MidtransNotification {
  order_id?: string;
  transaction_status?: string;
  fraud_status?: string;
  payment_type?: string;
  transaction_id?: string;
  transaction_time?: string;
  settlement_time?: string;
  status_code?: string;
  gross_amount?: string | number;
  signature_key?: string;
}

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

function paymentStatus(
  transactionStatus: string,
  fraudStatus?: string
) {
  switch (transactionStatus) {
    case "settlement":
      return "PAID";

    case "capture":
      return fraudStatus === "challenge"
        ? "CHALLENGE"
        : "PAID";

    case "pending":
      return "PENDING";

    case "deny":
      return "DENIED";

    case "cancel":
      return "CANCELLED";

    case "expire":
      return "EXPIRED";

    case "failure":
      return "FAILED";

    default:
      return "UNKNOWN";
  }
}

function toDate(value: unknown): Date | null {
  if (!value) return null;

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate();
  }

  const date = new Date(value as string | number | Date);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

function getDuration(data: Record<string, any>) {
  const value = Number(
    data.packageDurasiHari ?? 0
  );

  return Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;
}

/**
 * Membaca body webhook secara aman.
 *
 * Kita sengaja tidak menggunakan req.json()
 * karena sebelumnya webhook menghasilkan:
 *
 * "Expected property name or '}' ..."
 *
 * Dengan req.text() kita bisa melihat body mentah
 * dan menangani beberapa kemungkinan format.
 */
async function readWebhookBody(
  req: NextRequest
): Promise<MidtransNotification> {
  const rawBody = await req.text();

  if (!rawBody || !rawBody.trim()) {
    throw new Error("Body webhook kosong.");
  }

  // Hilangkan BOM jika ada
  let cleanedBody = rawBody
    .replace(/^\uFEFF/, "")
    .trim();

  console.log(
    "MIDTRANS RAW BODY:",
    cleanedBody.substring(0, 2000)
  );

  let parsed: unknown;

  try {
    parsed = JSON.parse(cleanedBody);
  } catch (firstError) {
    /**
     * Beberapa sistem/proxy dapat mengirim JSON
     * sebagai string JSON yang masih ter-encode.
     *
     * Contoh:
     * "{\"order_id\":\"123\"}"
     *
     * Kita coba parse sekali lagi.
     */
    try {
      const unwrapped = JSON.parse(
        cleanedBody
      );

      if (typeof unwrapped === "string") {
        parsed = JSON.parse(
          unwrapped
        );
      } else {
        throw firstError;
      }
    } catch {
      console.error(
        "MIDTRANS INVALID JSON BODY:",
        cleanedBody.substring(0, 2000)
      );

      throw new Error(
        "Body webhook Midtrans bukan JSON yang valid."
      );
    }
  }

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed)
  ) {
    throw new Error(
      "Format body webhook Midtrans tidak valid."
    );
  }

  return parsed as MidtransNotification;
}

export async function POST(req: NextRequest) {
  try {
    // =====================================================
    // BACA BODY TERLEBIH DAHULU
    // =====================================================

    const body =
      await readWebhookBody(req);

    console.log(
      "MIDTRANS WEBHOOK PARSED:",
      {
        order_id: body.order_id,
        transaction_status:
          body.transaction_status,
        payment_type:
          body.payment_type,
        transaction_id:
          body.transaction_id,
      }
    );

    // =====================================================
    // DATA MIDTRANS
    // =====================================================

    const orderId =
      body.order_id?.trim() ?? "";

    const transactionStatus =
      body.transaction_status
        ?.trim()
        .toLowerCase() ?? "";

    const fraudStatus =
      body.fraud_status
        ?.trim()
        .toLowerCase() ?? "";

    const statusCode =
      body.status_code?.trim() ?? "";

    const signatureKey =
      body.signature_key?.trim() ?? "";

    const grossAmount =
      String(
        body.gross_amount ?? ""
      ).trim();

    if (
      !orderId ||
      !transactionStatus
    ) {
      return json(
        {
          success: false,
          message:
            "Data Midtrans tidak lengkap.",
        },
        400
      );
    }

    // =====================================================
    // AMBIL DATABASE
    // =====================================================

    const db = getAdminDb();

    // =====================================================
    // VALIDASI SERVER KEY
    // =====================================================

    const serverKey =
      process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      console.error(
        "MIDTRANS_SERVER_KEY belum diatur."
      );

      throw new Error(
        "MIDTRANS_SERVER_KEY belum diatur."
      );
    }

    // =====================================================
    // VALIDASI SIGNATURE MIDTRANS
    //
    // SHA512:
    //
    // order_id + status_code +
    // gross_amount + ServerKey
    // =====================================================

    const signatureString =
      `${orderId}${statusCode}${grossAmount}${serverKey}`;

    const expectedSignature =
      crypto
        .createHash("sha512")
        .update(signatureString)
        .digest("hex");

    if (
      !signatureKey ||
      signatureKey.length !==
        expectedSignature.length
    ) {
      console.error(
        "INVALID MIDTRANS SIGNATURE LENGTH:",
        {
          orderId,
          receivedLength:
            signatureKey.length,
          expectedLength:
            expectedSignature.length,
        }
      );

      return json(
        {
          success: false,
          message:
            "Signature tidak valid.",
        },
        403
      );
    }

    const receivedBuffer =
      Buffer.from(
        signatureKey.toLowerCase(),
        "utf8"
      );

    const expectedBuffer =
      Buffer.from(
        expectedSignature.toLowerCase(),
        "utf8"
      );

    if (
      !crypto.timingSafeEqual(
        receivedBuffer,
        expectedBuffer
      )
    ) {
      console.error(
        "INVALID MIDTRANS SIGNATURE:",
        orderId
      );

      return json(
        {
          success: false,
          message:
            "Signature tidak valid.",
        },
        403
      );
    }

    // =====================================================
    // AMBIL TRANSAKSI
    // =====================================================

    const transactionRef =
      db.collection("transactions")
        .doc(orderId);

    const transactionSnap =
      await transactionRef.get();

    if (!transactionSnap.exists) {
      console.error(
        "TRANSAKSI TIDAK DITEMUKAN:",
        orderId
      );

      return json(
        {
          success: false,
          message:
            "Transaksi tidak ditemukan.",
          orderId,
        },
        404
      );
    }

    const transactionData =
      transactionSnap.data() ?? {};

    // =====================================================
    // VALIDASI NOMINAL
    // =====================================================

    const expectedAmount =
      Number(
        transactionData.grandTotal ?? 0
      );

    const receivedAmount =
      Number(grossAmount);

    if (
      !Number.isFinite(
        expectedAmount
      ) ||
      expectedAmount <= 0 ||
      !Number.isFinite(
        receivedAmount
      ) ||
      Math.round(expectedAmount) !==
        Math.round(receivedAmount)
    ) {
      console.error(
        "NOMINAL TIDAK SESUAI:",
        {
          orderId,
          expectedAmount,
          receivedAmount,
        }
      );

      return json(
        {
          success: false,
          message:
            "Nominal transaksi tidak sesuai.",
        },
        400
      );
    }

    // =====================================================
    // STATUS PEMBAYARAN
    // =====================================================

    const newStatus =
      paymentStatus(
        transactionStatus,
        fraudStatus
      );

    const oldStatus =
      transactionData.paymentStatus ??
      "PENDING";

    // =====================================================
    // WEBHOOK DUPLICATE
    //
    // Kalau transaksi sudah PAID,
    // jangan membuat membership / komisi /
    // voucher baru.
    // =====================================================

    if (
      oldStatus === "PAID"
    ) {
      await transactionRef.update({
        lastWebhookStatus:
          transactionStatus,

        lastWebhookTransactionId:
          body.transaction_id ?? null,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return json({
        success: true,
        duplicate: true,
        orderId,
        paymentStatus: "PAID",
      });
    }

    // =====================================================
    // PENDING
    // =====================================================

    if (
      newStatus === "PENDING"
    ) {
      await transactionRef.update({
        paymentStatus:
          "PENDING",

        status:
          "WAITING_PAYMENT",

        paymentType:
          body.payment_type ?? null,

        transactionId:
          body.transaction_id ?? null,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

        lastWebhookStatus:
          transactionStatus,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return json({
        success: true,
        orderId,
        paymentStatus:
          "PENDING",
      });
    }

    // =====================================================
    // GAGAL / BATAL / EXPIRED
    // =====================================================

    if (
      [
        "CANCELLED",
        "EXPIRED",
        "DENIED",
        "FAILED",
      ].includes(newStatus)
    ) {
      await transactionRef.update({
        paymentStatus:
          newStatus,

        status:
          newStatus,

        paymentType:
          body.payment_type ?? null,

        transactionId:
          body.transaction_id ?? null,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

        lastWebhookStatus:
          transactionStatus,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return json({
        success: true,
        orderId,
        paymentStatus:
          newStatus,
      });
    }

    // =====================================================
    // STATUS LAIN
    // =====================================================

    if (
      newStatus !== "PAID"
    ) {
      await transactionRef.update({
        paymentStatus:
          newStatus,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

        lastWebhookStatus:
          transactionStatus,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      return json({
        success: true,
        orderId,
        paymentStatus:
          newStatus,
      });
    }

    // =====================================================
    // PAID
    // =====================================================

    const email =
      String(
        transactionData.email ?? ""
      )
        .trim()
        .toLowerCase();

    const nama =
      String(
        transactionData.nama ?? ""
      ).trim();

    if (!email) {
      throw new Error(
        "Email transaksi tidak ditemukan."
      );
    }

    // =====================================================
    // DURASI MEMBERSHIP
    // =====================================================

    const durationDays =
      getDuration(
        transactionData
      );

    if (
      durationDays <= 0
    ) {
      throw new Error(
        "Durasi membership tidak valid."
      );
    }

    // =====================================================
    // FIREBASE AUTH
    // =====================================================

    const {
      getAuth,
    } =
      await import(
        "firebase-admin/auth"
      );

    const auth =
      getAuth();

    let userRecord;

    try {
      userRecord =
        await auth.getUserByEmail(
          email
        );

      console.log(
        "USER FIREBASE SUDAH ADA:",
        userRecord.uid
      );
    } catch (error: any) {
      if (
        error?.code !==
        "auth/user-not-found"
      ) {
        throw error;
      }

      // ===================================================
      // PASSWORD TRANSAKSI
      // ===================================================

      const encryptedPassword =
        transactionData.encryptedPassword;

      if (
        typeof encryptedPassword !==
          "string" ||
        !encryptedPassword
      ) {
        throw new Error(
          "Password transaksi tidak ditemukan."
        );
      }

      const password =
        decrypt(
          encryptedPassword
        );

      if (!password) {
        throw new Error(
          "Password transaksi gagal didekripsi."
        );
      }

      // ===================================================
      // BUAT USER FIREBASE
      // ===================================================

      userRecord =
        await auth.createUser({
          email,
          password,

          displayName:
            nama || undefined,

          emailVerified:
            false,

          disabled:
            false,
        });

      console.log(
        "USER BARU DIBUAT:",
        userRecord.uid
      );
    }

    const uid =
      userRecord.uid;

    // =====================================================
    // USERS/{UID}
    // =====================================================

    const userRef =
      db.collection("users")
        .doc(uid);

    const userSnap =
      await userRef.get();

    const existingUser =
      userSnap.exists
        ? userSnap.data() ?? {}
        : {};

    // =====================================================
    // HITUNG MASA MEMBERSHIP
    // =====================================================

    const now =
      new Date();

    let membershipStart =
      new Date(now);

    const previousExpired =
      toDate(
        existingUser.membershipExpiredAt
      );

    if (
      previousExpired &&
      previousExpired > now
    ) {
      membershipStart =
        previousExpired;
    }

    const membershipExpiredAt =
      new Date(
        membershipStart
      );

    membershipExpiredAt.setDate(
      membershipExpiredAt.getDate() +
        durationDays
    );

    // =====================================================
    // UPDATE / CREATE USERS
    // =====================================================

    await userRef.set(
      {
        uid,

        nama:
          transactionData.nama ??
          existingUser.nama ??
          null,

        email,

        wa:
          transactionData.wa ??
          existingUser.wa ??
          null,

        tglLahir:
          transactionData.tglLahir ??
          existingUser.tglLahir ??
          null,

        provinceId:
          transactionData.provinceId ??
          existingUser.provinceId ??
          null,

        provinceName:
          transactionData.provinceName ??
          existingUser.provinceName ??
          null,

        regencyId:
          transactionData.regencyId ??
          existingUser.regencyId ??
          null,

        regencyName:
          transactionData.regencyName ??
          existingUser.regencyName ??
          null,

        educationLevelId:
          transactionData.educationLevelId ??
          existingUser.educationLevelId ??
          null,

        educationLevelName:
          transactionData.educationLevelName ??
          existingUser.educationLevelName ??
          null,

        packageId:
          transactionData.packageId ??
          existingUser.packageId ??
          null,

        packageNama:
          transactionData.packageNama ??
          existingUser.packageNama ??
          null,

        packageDurasiHari:
          durationDays,

        membershipStatus:
          "ACTIVE",

        membershipStartAt:
          membershipStart,

        membershipExpiredAt,

        lastOrderId:
          orderId,

        lastPaymentStatus:
          "PAID",

        createdAt:
          existingUser.createdAt ??
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    // =====================================================
    // HAPUS PASSWORD TERENKRIPSI
    // =====================================================

    await transactionRef.update({
      encryptedPassword:
        FieldValue.delete(),
    });

    // =====================================================
    // UPDATE TRANSACTION → PAID
    // =====================================================

    await transactionRef.update({
      uid,

      paymentStatus:
        "PAID",

      status:
        "PAID",

      paymentType:
        body.payment_type ??
        null,

      transactionId:
        body.transaction_id ??
        null,

      transactionStatus,

      fraudStatus:
        fraudStatus || null,

      transactionTime:
        body.transaction_time ??
        null,

      settlementTime:
        body.settlement_time ??
        null,

      paidAt:
        FieldValue.serverTimestamp(),

      membershipStartAt:
        membershipStart,

      membershipExpiredAt,

      lastWebhookStatus:
        transactionStatus,

      lastWebhookAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    // =====================================================
    // VOUCHER
    // =====================================================

    const voucherId =
      typeof transactionData.voucherId ===
      "string"
        ? transactionData.voucherId
        : null;

    if (voucherId) {
      const voucherRef =
        db.collection("vouchers")
          .doc(voucherId);

      await db.runTransaction(
        async (tx) => {
          const snap =
            await tx.get(
              voucherRef
            );

          if (!snap.exists) {
            console.warn(
              "VOUCHER TIDAK DITEMUKAN:",
              voucherId
            );

            return;
          }

          const data =
            snap.data() ?? {};

          const used =
            Number(
              data.used ?? 0
            );

          tx.update(
            voucherRef,
            {
              used:
                Number.isFinite(
                  used
                )
                  ? used + 1
                  : 1,

              updatedAt:
                FieldValue.serverTimestamp(),
            }
          );
        }
      );
    }

    // =====================================================
    // AFFILIATE / PARTNER
    // =====================================================

    const affiliateId =
      typeof transactionData.affiliateId ===
      "string"
        ? transactionData.affiliateId
        : null;

    const partnerId =
      typeof transactionData.partnerId ===
      "string"
        ? transactionData.partnerId
        : null;

    const affiliateType =
      transactionData
        .affiliateCommissionType ??
      null;

    const partnerType =
      transactionData
        .partnerCommissionType ??
      null;

    const affiliateValue =
      Number(
        transactionData
          .affiliateCommissionValue ??
          0
      );

    const partnerValue =
      Number(
        transactionData
          .partnerCommissionValue ??
          0
      );

    const grandTotal =
      Number(
        transactionData
          .grandTotal ??
          0
      );

    let affiliateCommission =
      0;

    let partnerCommission =
      0;

    if (
      affiliateId &&
      affiliateType
    ) {
      affiliateCommission =
        affiliateType ===
        "percent"
          ? Math.floor(
              (grandTotal *
                affiliateValue) /
                100
            )
          : Math.floor(
              affiliateValue
            );
    }

    if (
      partnerId &&
      partnerType
    ) {
      partnerCommission =
        partnerType ===
        "percent"
          ? Math.floor(
              (grandTotal *
                partnerValue) /
                100
            )
          : Math.floor(
              partnerValue
            );
    }

    await transactionRef.update({
      affiliateCommission,

      partnerCommission,

      commissionStatus:
        affiliateId ||
        partnerId
          ? "PENDING"
          : "NONE",

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    // =====================================================
    // LOG
    // =====================================================

    console.log(
      "MIDTRANS PAYMENT SUCCESS:",
      {
        orderId,
        uid,
        email,
        grandTotal,
        voucherId,
        affiliateId,
        partnerId,
        affiliateCommission,
        partnerCommission,
        durationDays,
        membershipExpiredAt,
      }
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    return json({
      success: true,

      orderId,

      uid,

      paymentStatus:
        "PAID",

      membershipStatus:
        "ACTIVE",

      membershipExpiredAt:
        membershipExpiredAt.toISOString(),

      voucherUsed:
        Boolean(voucherId),

      affiliateUsed:
        Boolean(affiliateId),

      partnerUsed:
        Boolean(partnerId),

      affiliateCommission,

      partnerCommission,
    });
  } catch (error) {
    console.error(
      "MIDTRANS WEBHOOK ERROR:",
      error
    );

    return json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      500
    );
  }
}