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

type FirestoreData = Record<string, any>;

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

/**
 * =========================================================
 * GET
 * =========================================================
 *
 * Health check.
 *
 * https://bimbelciboe.com/api/webhook/midtrans
 */
export async function GET() {
  return json({
    success: true,
    status: "ok",
    message: "Midtrans webhook endpoint aktif.",
  });
}

/**
 * =========================================================
 * PAYMENT STATUS
 * =========================================================
 */
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

/**
 * =========================================================
 * DATE HELPER
 * =========================================================
 */
function toDate(value: unknown): Date | null {
  if (!value) {
    return null;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate ===
      "function"
  ) {
    try {
      return (
        value as {
          toDate: () => Date;
        }
      ).toDate();
    } catch {
      return null;
    }
  }

  const date = new Date(
    value as string | number | Date
  );

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

/**
 * =========================================================
 * MEMBERSHIP DURATION
 * =========================================================
 */
function getDuration(data: FirestoreData) {
  const value = Number(
    data.packageDurasiHari ?? 0
  );

  return Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : 0;
}

/**
 * =========================================================
 * MIDTRANS SIGNATURE
 * =========================================================
 *
 * SHA512:
 *
 * order_id + status_code + gross_amount + ServerKey
 */
function createMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string
) {
  return crypto
    .createHash("sha512")
    .update(
      `${orderId}${statusCode}${grossAmount}${serverKey}`
    )
    .digest("hex");
}

/**
 * Membandingkan signature dengan aman.
 */
function isValidSignature(
  receivedSignature: string,
  expectedSignature: string
) {
  if (!receivedSignature) {
    return false;
  }

  const received =
    receivedSignature
      .trim()
      .toLowerCase();

  const expected =
    expectedSignature
      .trim()
      .toLowerCase();

  if (received.length !== expected.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(
      Buffer.from(received, "utf8"),
      Buffer.from(expected, "utf8")
    );
  } catch {
    return false;
  }
}

/**
 * =========================================================
 * POST WEBHOOK
 * =========================================================
 */
export async function POST(req: NextRequest) {
  const receivedAt =
    new Date().toISOString();

  try {
    /**
     * =====================================================
     * 1. BACA BODY
     * =====================================================
     *
     * Kita sengaja membaca JSON terlebih dahulu.
     *
     * Jangan inisialisasi Firebase sebelum body valid karena
     * Test Notification Midtrans hanya membutuhkan endpoint
     * memberikan respons yang benar.
     */
    let body: MidtransNotification;

    try {
      body =
        (await req.json()) as MidtransNotification;
    } catch (error) {
      console.error(
        "MIDTRANS INVALID JSON:",
        error
      );

      return json(
        {
          success: false,
          message:
            "Body request bukan JSON yang valid.",
        },
        400
      );
    }

    console.log(
      "================================================="
    );

    console.log(
      "MIDTRANS WEBHOOK RECEIVED:",
      {
        receivedAt,
        order_id: body.order_id ?? null,
        transaction_status:
          body.transaction_status ?? null,
        payment_type:
          body.payment_type ?? null,
        transaction_id:
          body.transaction_id ?? null,
      }
    );

    /**
     * =====================================================
     * 2. NORMALISASI DATA
     * =====================================================
     */
    const orderId =
      typeof body.order_id === "string"
        ? body.order_id.trim()
        : "";

    const transactionStatus =
      typeof body.transaction_status ===
      "string"
        ? body.transaction_status
            .trim()
            .toLowerCase()
        : "";

    const fraudStatus =
      typeof body.fraud_status === "string"
        ? body.fraud_status
            .trim()
            .toLowerCase()
        : "";

    const statusCode =
      typeof body.status_code === "string"
        ? body.status_code.trim()
        : String(
            body.status_code ?? ""
          ).trim();

    const signatureKey =
      typeof body.signature_key === "string"
        ? body.signature_key.trim()
        : "";

    const grossAmount =
      String(
        body.gross_amount ?? ""
      ).trim();

    /**
     * =====================================================
     * 3. VALIDASI DATA DASAR
     * =====================================================
     */
    if (!orderId) {
      console.error(
        "MIDTRANS WEBHOOK: order_id kosong."
      );

      return json(
        {
          success: false,
          message:
            "order_id tidak ditemukan.",
        },
        400
      );
    }

    if (!transactionStatus) {
      console.error(
        "MIDTRANS WEBHOOK: transaction_status kosong."
      );

      return json(
        {
          success: false,
          message:
            "transaction_status tidak ditemukan.",
        },
        400
      );
    }

    if (!statusCode) {
      console.error(
        "MIDTRANS WEBHOOK: status_code kosong.",
        orderId
      );

      return json(
        {
          success: false,
          message:
            "status_code tidak ditemukan.",
        },
        400
      );
    }

    if (!grossAmount) {
      console.error(
        "MIDTRANS WEBHOOK: gross_amount kosong.",
        orderId
      );

      return json(
        {
          success: false,
          message:
            "gross_amount tidak ditemukan.",
        },
        400
      );
    }

    /**
     * =====================================================
     * 4. SERVER KEY
     * =====================================================
     */
    const serverKey =
      process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      console.error(
        "MIDTRANS_SERVER_KEY belum diatur."
      );

      return json(
        {
          success: false,
          message:
            "MIDTRANS_SERVER_KEY belum diatur di server.",
        },
        500
      );
    }

    /**
     * =====================================================
     * 5. VALIDASI SIGNATURE
     * =====================================================
     */
    const expectedSignature =
      createMidtransSignature(
        orderId,
        statusCode,
        grossAmount,
        serverKey
      );

    const validSignature =
      isValidSignature(
        signatureKey,
        expectedSignature
      );

    if (!validSignature) {
      console.error(
        "================================================="
      );

      console.error(
        "INVALID MIDTRANS SIGNATURE"
      );

      console.error({
        orderId,
        statusCode,
        grossAmount,
      });

      return json(
        {
          success: false,
          message:
            "Signature tidak valid.",
        },
        403
      );
    }

    console.log(
      "MIDTRANS SIGNATURE VALID:",
      orderId
    );

    /**
     * =====================================================
     * 6. FIREBASE ADMIN
     * =====================================================
     */
    const db = getAdminDb();

    const { getAuth } =
      await import(
        "firebase-admin/auth"
      );

    const auth = getAuth();

    /**
     * =====================================================
     * 7. CARI TRANSAKSI
     * =====================================================
     */
    const transactionRef =
      db.collection("transactions")
        .doc(orderId);

    const transactionSnap =
      await transactionRef.get();

    /**
     * =====================================================
     * 8. ORDER TIDAK DITEMUKAN
     * =====================================================
     *
     * INI PERUBAHAN PENTING.
     *
     * Sebelumnya:
     *
     * 404 Transaksi tidak ditemukan
     *
     * Sekarang:
     *
     * 200 Notification diterima
     *
     * Alasannya:
     *
     * Test Notification Midtrans dapat menggunakan
     * order_id yang belum ada di database kita.
     *
     * Selama signature valid, berarti notification berhasil
     * diterima dan diverifikasi.
     *
     * Kita tidak boleh membuat transaksi palsu.
     * Kita juga tidak boleh membuat user/membership.
     */
    if (!transactionSnap.exists) {
      console.warn(
        "MIDTRANS ORDER BELUM ADA DI DATABASE:",
        {
          orderId,
          transactionStatus,
          grossAmount,
        }
      );

      return json({
        success: true,
        received: true,
        processed: false,
        transactionFound: false,
        orderId,
        paymentStatus:
          paymentStatus(
            transactionStatus,
            fraudStatus
          ),
        message:
          "Notification diterima dan signature valid, tetapi transaksi belum ditemukan di database.",
      });
    }

    /**
     * =====================================================
     * 9. DATA TRANSAKSI
     * =====================================================
     */
    const transactionData =
      (transactionSnap.data() ??
        {}) as FirestoreData;

    /**
     * =====================================================
     * 10. VALIDASI NOMINAL
     * =====================================================
     */
    const expectedAmount =
      Number(
        transactionData.grandTotal ?? 0
      );

    const receivedAmount =
      Number(grossAmount);

    if (
      !Number.isFinite(expectedAmount) ||
      expectedAmount <= 0
    ) {
      console.error(
        "GRAND TOTAL TRANSAKSI TIDAK VALID:",
        {
          orderId,
          expectedAmount,
        }
      );

      return json(
        {
          success: false,
          message:
            "Grand total transaksi tidak valid.",
        },
        400
      );
    }

    if (
      !Number.isFinite(receivedAmount) ||
      receivedAmount <= 0
    ) {
      console.error(
        "GROSS AMOUNT MIDTRANS TIDAK VALID:",
        {
          orderId,
          receivedAmount,
        }
      );

      return json(
        {
          success: false,
          message:
            "Gross amount Midtrans tidak valid.",
        },
        400
      );
    }

    if (
      Math.round(expectedAmount) !==
      Math.round(receivedAmount)
    ) {
      console.error(
        "NOMINAL MIDTRANS TIDAK SESUAI:",
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

    /**
     * =====================================================
     * 11. TENTUKAN STATUS
     * =====================================================
     */
    const newStatus =
      paymentStatus(
        transactionStatus,
        fraudStatus
      );

    const oldStatus =
      String(
        transactionData.paymentStatus ??
          "PENDING"
      ).toUpperCase();

    /**
     * =====================================================
     * 12. PAID YANG SUDAH DIPROSES
     * =====================================================
     *
     * Webhook Midtrans bisa dikirim lebih dari satu kali.
     *
     * Jangan:
     * - membuat membership baru
     * - menambah voucher.used
     * - membuat komisi baru
     */
    if (oldStatus === "PAID") {
      console.log(
        "MIDTRANS DUPLICATE WEBHOOK:",
        orderId
      );

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
        received: true,
        duplicate: true,
        orderId,
        paymentStatus: "PAID",
        message:
          "Notification sudah pernah diproses.",
      });
    }

    /**
     * =====================================================
     * 13. PENDING
     * =====================================================
     */
    if (newStatus === "PENDING") {
      await transactionRef.update({
        paymentStatus: "PENDING",

        status: "WAITING_PAYMENT",

        paymentType:
          body.payment_type ?? null,

        transactionId:
          body.transaction_id ?? null,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

        lastWebhookStatus:
          transactionStatus,

        lastWebhookTransactionId:
          body.transaction_id ?? null,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      console.log(
        "MIDTRANS PAYMENT PENDING:",
        orderId
      );

      return json({
        success: true,
        received: true,
        orderId,
        paymentStatus: "PENDING",
      });
    }

    /**
     * =====================================================
     * 14. CANCEL / EXPIRE / DENY / FAILURE
     * =====================================================
     */
    if (
      [
        "CANCELLED",
        "EXPIRED",
        "DENIED",
        "FAILED",
      ].includes(newStatus)
    ) {
      await transactionRef.update({
        paymentStatus: newStatus,

        status: newStatus,

        paymentType:
          body.payment_type ?? null,

        transactionId:
          body.transaction_id ?? null,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

        lastWebhookStatus:
          transactionStatus,

        lastWebhookTransactionId:
          body.transaction_id ?? null,

        lastWebhookAt:
          FieldValue.serverTimestamp(),

        updatedAt:
          FieldValue.serverTimestamp(),
      });

      console.log(
        "MIDTRANS PAYMENT NOT SUCCESS:",
        {
          orderId,
          paymentStatus: newStatus,
        }
      );

      return json({
        success: true,
        received: true,
        orderId,
        paymentStatus: newStatus,
      });
    }

    /**
     * =====================================================
     * 15. STATUS LAIN
     * =====================================================
     */
    if (newStatus !== "PAID") {
      await transactionRef.update({
        paymentStatus: newStatus,

        transactionStatus,

        fraudStatus:
          fraudStatus || null,

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
        received: true,
        orderId,
        paymentStatus: newStatus,
      });
    }

    /**
     * =====================================================
     * 16. PAID
     * =====================================================
     */
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

    /**
     * =====================================================
     * 17. DURASI MEMBERSHIP
     * =====================================================
     */
    const durationDays =
      getDuration(transactionData);

    if (durationDays <= 0) {
      throw new Error(
        "Durasi membership tidak valid."
      );
    }

    /**
     * =====================================================
     * 18. FIREBASE AUTH USER
     * =====================================================
     */
    let userRecord;

    try {
      userRecord =
        await auth.getUserByEmail(
          email
        );

      console.log(
        "FIREBASE USER SUDAH ADA:",
        userRecord.uid
      );
    } catch (error: unknown) {
      const authError =
        error as {
          code?: string;
        };

      if (
        authError.code !==
        "auth/user-not-found"
      ) {
        throw error;
      }

      /**
       * ===================================================
       * 19. PASSWORD TERENKRIPSI
       * ===================================================
       */
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
          "Password transaksi tidak dapat didekripsi."
        );
      }

      /**
       * ===================================================
       * 20. BUAT USER FIREBASE
       * ===================================================
       */
      userRecord =
        await auth.createUser({
          email,

          password,

          displayName:
            nama || undefined,

          emailVerified: false,

          disabled: false,
        });

      console.log(
        "FIREBASE USER BARU DIBUAT:",
        userRecord.uid
      );
    }

    const uid =
      userRecord.uid;

    /**
     * =====================================================
     * 21. USERS/{UID}
     * =====================================================
     */
    const userRef =
      db.collection("users")
        .doc(uid);

    const userSnap =
      await userRef.get();

    const existingUser =
      userSnap.exists
        ? userSnap.data() ?? {}
        : {};

    /**
     * =====================================================
     * 22. HITUNG MEMBERSHIP
     * =====================================================
     */
    const now = new Date();

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

    /**
     * =====================================================
     * 23. UPDATE USERS
     * =====================================================
     */
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

    /**
     * =====================================================
     * 24. HAPUS PASSWORD TERENKRIPSI
     * =====================================================
     */
    await transactionRef.update({
      encryptedPassword:
        FieldValue.delete(),
    });

    /**
     * =====================================================
     * 25. UPDATE TRANSACTION → PAID
     * =====================================================
     */
    await transactionRef.update({
      uid,

      paymentStatus:
        "PAID",

      status:
        "PAID",

      paymentType:
        body.payment_type ?? null,

      transactionId:
        body.transaction_id ?? null,

      transactionStatus,

      fraudStatus:
        fraudStatus || null,

      transactionTime:
        body.transaction_time ?? null,

      settlementTime:
        body.settlement_time ?? null,

      paidAt:
        FieldValue.serverTimestamp(),

      membershipStartAt:
        membershipStart,

      membershipExpiredAt,

      lastWebhookStatus:
        transactionStatus,

      lastWebhookTransactionId:
        body.transaction_id ?? null,

      lastWebhookAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    /**
     * =====================================================
     * 26. VOUCHER
     * =====================================================
     *
     * Voucher dan affiliate boleh digunakan bersamaan.
     */
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
                Number.isFinite(used)
                  ? used + 1
                  : 1,

              updatedAt:
                FieldValue.serverTimestamp(),
            }
          );
        }
      );
    }

    /**
     * =====================================================
     * 27. AFFILIATE / PARTNER
     * =====================================================
     */
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
        transactionData.grandTotal ??
          0
      );

    let affiliateCommission = 0;

    let partnerCommission = 0;

    if (
      affiliateId &&
      affiliateType
    ) {
      affiliateCommission =
        affiliateType === "percent"
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
        partnerType === "percent"
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
        affiliateId || partnerId
          ? "PENDING"
          : "NONE",

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    /**
     * =====================================================
     * 28. LOG
     * =====================================================
     */
    console.log(
      "================================================="
    );

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

        membershipStart,

        membershipExpiredAt,
      }
    );

    console.log(
      "================================================="
    );

    /**
     * =====================================================
     * 29. RESPONSE
     * =====================================================
     */
    return json({
      success: true,

      received: true,

      processed: true,

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

      message:
        "Pembayaran berhasil diproses.",
    });
  } catch (error: unknown) {
    console.error(
      "================================================="
    );

    console.error(
      "MIDTRANS WEBHOOK ERROR:",
      error
    );

    console.error(
      "================================================="
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