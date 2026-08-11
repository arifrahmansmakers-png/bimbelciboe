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

  provinceId: string;
  provinceName: string;

  regencyId: string;
  regencyName: string;

  password: string;

  educationLevelId: string;
  packageId: string;

  voucherCode?: string;
  referralCode?: string;

  // backward compatibility
  promoCode?: string;

  captchaToken: string;
}

const errorResponse = (
  message: string,
  status = 400
) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
};

const toDate = (value: any): Date | null => {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

const getNumber = (
  ...values: any[]
): number => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      const number = Number(value);

      if (Number.isFinite(number)) {
        return number;
      }
    }
  }

  return 0;
};

export async function POST(req: Request) {
  try {
    const adminDb = getAdminDb();

    const midtransClient =
      await import("midtrans-client");

    const body =
      (await req.json()) as CheckoutRequest;

    // =====================================================
    // AMBIL DATA
    // =====================================================

    const {
      orderId,
      nama,
      email,
      wa,
      tglLahir,

      provinceId,
      provinceName,

      regencyId,
      regencyName,

      password,

      educationLevelId,
      packageId,

      voucherCode,
      referralCode,

      promoCode,

      captchaToken,
    } = body;

    // =====================================================
    // VALIDASI WAJIB
    // =====================================================

    if (!orderId?.trim()) {
      return errorResponse(
        "Order ID tidak valid."
      );
    }

    if (!nama?.trim()) {
      return errorResponse(
        "Nama wajib diisi."
      );
    }

    if (!email?.trim()) {
      return errorResponse(
        "Email wajib diisi."
      );
    }

    if (!wa?.trim()) {
      return errorResponse(
        "Nomor WhatsApp wajib diisi."
      );
    }

    if (!tglLahir?.trim()) {
      return errorResponse(
        "Tanggal lahir wajib diisi."
      );
    }

    if (!provinceId?.trim()) {
      return errorResponse(
        "Provinsi wajib dipilih."
      );
    }

    if (!provinceName?.trim()) {
      return errorResponse(
        "Nama provinsi wajib diisi."
      );
    }

    if (!regencyId?.trim()) {
      return errorResponse(
        "Kabupaten/Kota wajib dipilih."
      );
    }

    if (!regencyName?.trim()) {
      return errorResponse(
        "Nama Kabupaten/Kota wajib diisi."
      );
    }

    if (!password) {
      return errorResponse(
        "Password wajib diisi."
      );
    }

    if (!educationLevelId?.trim()) {
      return errorResponse(
        "Jenjang belum dipilih."
      );
    }

    if (!packageId?.trim()) {
      return errorResponse(
        "Paket belum dipilih."
      );
    }

    if (!captchaToken) {
      return errorResponse(
        "Captcha wajib diisi."
      );
    }

    // =====================================================
    // NORMALISASI
    // =====================================================

    const cleanOrderId =
      orderId.trim();

    const cleanNama =
      nama.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    const cleanWa =
      wa.trim();

    const cleanTglLahir =
      tglLahir.trim();

    const cleanProvinceId =
      provinceId.trim();

    const cleanProvinceName =
      provinceName.trim();

    const cleanRegencyId =
      regencyId.trim();

    const cleanRegencyName =
      regencyName.trim();

    const cleanEducationLevelId =
      educationLevelId.trim();

    const cleanPackageId =
      packageId.trim();

    const cleanVoucherCode =
      voucherCode?.trim().toUpperCase() ?? "";

    const cleanReferralCode =
      referralCode?.trim().toUpperCase() ?? "";

    const cleanLegacyPromoCode =
      promoCode?.trim().toUpperCase() ?? "";

    // =====================================================
    // BACKWARD COMPATIBILITY
    //
    // Jika frontend lama hanya mengirim promoCode,
    // tetap bisa digunakan sebagai voucher.
    // =====================================================

    const finalVoucherCode =
      cleanVoucherCode ||
      (
        !cleanReferralCode
          ? cleanLegacyPromoCode
          : ""
      );

    // =====================================================
    // VALIDASI PASSWORD
    // =====================================================

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_\-])[A-Za-z\d@$!%*?&.#_\-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return errorResponse(
        "Password minimal 8 karakter serta mengandung huruf besar, huruf kecil, angka dan simbol."
      );
    }

    // =====================================================
    // VALIDASI WHATSAPP
    // =====================================================

    if (!/^[0-9]{9,15}$/.test(cleanWa)) {
      return errorResponse(
        "Nomor WhatsApp tidak valid."
      );
    }

    // =====================================================
    // CAPTCHA
    // =====================================================

    if (
      !(await verifyCaptcha(captchaToken))
    ) {
      return errorResponse(
        "Captcha tidak valid."
      );
    }

    // =====================================================
    // CEK EMAIL DI FIREBASE AUTH
    //
    // HANYA CEK.
    // USER BELUM DIBUAT.
    // =====================================================

    const auth =
      await import("firebase-admin/auth");

    try {
      await auth
        .getAuth()
        .getUserByEmail(
          normalizedEmail
        );

      return errorResponse(
        "Email sudah terdaftar. Silakan login."
      );
    } catch (err: any) {
      if (
        err?.code !==
        "auth/user-not-found"
      ) {
        throw err;
      }
    }

    // =====================================================
    // CEK ORDER ID
    // =====================================================

    const trxRef =
      adminDb
        .collection("transactions")
        .doc(cleanOrderId);

    const existingTrx =
      await trxRef.get();

    if (existingTrx.exists) {
      const existingData =
        existingTrx.data()!;

      if (
        existingData.paymentStatus ===
          "PENDING" &&
        existingData.snapToken
      ) {
        return NextResponse.json({
          success: true,

          paymentCreated: true,

          paymentStatus: "PENDING",

          resumed: true,

          orderId:
            cleanOrderId,

          token:
            existingData.snapToken,

          redirectUrl:
            existingData.snapRedirectUrl ??
            null,

          message:
            "Melanjutkan transaksi sebelumnya.",
        });
      }

      return errorResponse(
        "Order ID sudah pernah digunakan."
      );
    }

    // =====================================================
    // CEK TRANSAKSI PENDING BERDASARKAN EMAIL
    // =====================================================

    const existingTransactionSnap =
      await adminDb
        .collection("transactions")
        .where(
          "email",
          "==",
          normalizedEmail
        )
        .where(
          "paymentStatus",
          "==",
          "PENDING"
        )
        .limit(1)
        .get();

    if (
      !existingTransactionSnap.empty
    ) {
      const oldDoc =
        existingTransactionSnap
          .docs[0];

      const oldData =
        oldDoc.data();

      const createdAt =
        toDate(
          oldData.createdAt
        );

      const EXPIRED_MINUTES = 30;

      const isExpired =
        !createdAt ||
        Date.now() -
            createdAt.getTime() >
          EXPIRED_MINUTES *
            60 *
            1000;

      if (isExpired) {
        await oldDoc.ref.update({
          paymentStatus:
            "CANCELLED",

          status:
            "CANCELLED",

          cancelledAt:
            FieldValue.serverTimestamp(),

          cancelReason:
            "CHECKOUT_ABANDONED",

          updatedAt:
            FieldValue.serverTimestamp(),
        });

        console.log(
          "TRANSAKSI PENDING LAMA DIBATALKAN:",
          oldDoc.id
        );
      } else {
        return NextResponse.json({
          success: true,

          paymentCreated: true,

          paymentStatus: "PENDING",

          resumed: true,

          orderId:
            oldDoc.id,

          token:
            oldData.snapToken ??
            null,

          redirectUrl:
            oldData.snapRedirectUrl ??
            null,

          message:
            "Melanjutkan transaksi sebelumnya.",
        });
      }
    }

    // =====================================================
    // EDUCATION LEVEL
    // =====================================================

    const educationLevelSnap =
      await adminDb
        .collection(
          "educationLevels"
        )
        .doc(
          cleanEducationLevelId
        )
        .get();

    if (
      !educationLevelSnap.exists
    ) {
      return errorResponse(
        "Jenjang pendidikan tidak ditemukan."
      );
    }

    const educationLevelData =
      educationLevelSnap.data()!;

    // =====================================================
    // PACKAGE
    // =====================================================

    const packageSnap =
      await adminDb
        .collection("packages")
        .doc(cleanPackageId)
        .get();

    if (!packageSnap.exists) {
      return errorResponse(
        "Paket tidak ditemukan."
      );
    }

    const packageData =
      packageSnap.data()!;

    if (
      packageData.isActive !== true
    ) {
      return errorResponse(
        "Paket sedang tidak aktif."
      );
    }

    const subtotal =
      getNumber(
        packageData.price,
        packageData.harga
      );

    if (
      !Number.isFinite(subtotal) ||
      subtotal <= 0
    ) {
      return errorResponse(
        "Harga paket tidak valid."
      );
    }

    // =====================================================
    // KOMISI PACKAGE
    // =====================================================

    const affiliateCommissionType =
      packageData.affiliateCommissionType ===
      "percent"
        ? "percent"
        : "fixed";

    const affiliateCommissionValue =
      getNumber(
        packageData.affiliateCommissionValue
      );

    const partnerCommissionType =
      packageData.partnerCommissionType ===
      "percent"
        ? "percent"
        : "fixed";

    const partnerCommissionValue =
      getNumber(
        packageData.partnerCommissionValue
      );

    // =====================================================
    // PROMO VARIABLES
    // =====================================================

    let discount = 0;

    let voucherId:
      | string
      | null = null;

    let affiliateId:
      | string
      | null = null;

    let partnerId:
      | string
      | null = null;

    let voucherUsed = false;
    let affiliateUsed = false;
    let partnerVoucherUsed = false;

    // =====================================================
    // VALIDASI VOUCHER
    // =====================================================

    if (finalVoucherCode) {
      let voucherDoc =
        await adminDb
          .collection("vouchers")
          .doc(finalVoucherCode)
          .get();

      if (!voucherDoc.exists) {
        const voucherQuery =
          await adminDb
            .collection("vouchers")
            .where(
              "code",
              "==",
              finalVoucherCode
            )
            .limit(1)
            .get();

        if (
          !voucherQuery.empty
        ) {
          voucherDoc =
            voucherQuery.docs[0];
        }
      }

      if (!voucherDoc.exists) {
        return errorResponse(
          "Voucher tidak ditemukan."
        );
      }

      const voucher =
        voucherDoc.data()!;

      if (
        voucher.active !== true
      ) {
        return errorResponse(
          "Voucher tidak aktif."
        );
      }

      const now =
        new Date();

      const berlakuMulai =
        toDate(
          voucher.startAt ??
            voucher.validFrom
        );

      const berlakuSampai =
        toDate(
          voucher.endAt ??
            voucher.validUntil
        );

      if (
        berlakuMulai &&
        berlakuMulai > now
      ) {
        return errorResponse(
          "Voucher belum mulai berlaku."
        );
      }

      if (
        berlakuSampai &&
        berlakuSampai < now
      ) {
        return errorResponse(
          "Voucher sudah berakhir."
        );
      }

      const minimumPurchase =
        getNumber(
          voucher.minimumPurchase
        );

      if (
        minimumPurchase > subtotal
      ) {
        return errorResponse(
          `Minimal pembelian Rp${minimumPurchase.toLocaleString(
            "id-ID"
          )}.`
        );
      }

      const quota =
        getNumber(
          voucher.quota
        );

      const used =
        getNumber(
          voucher.used
        );

      if (
        quota > 0 &&
        used >= quota
      ) {
        return errorResponse(
          "Kuota voucher telah habis."
        );
      }

      const discountType =
        voucher.discountType ===
          "percent" ||
        voucher.diskonType ===
          "percent"
          ? "percent"
          : "fixed";

      const discountValue =
        getNumber(
          voucher.discountValue,
          voucher.diskonValue
        );

      if (
        discountType ===
        "percent"
      ) {
        if (
          discountValue > 100
        ) {
          return errorResponse(
            "Persentase diskon voucher tidak valid."
          );
        }

        discount =
          Math.floor(
            (subtotal *
              discountValue) /
              100
          );
      } else {
        discount =
          discountValue;
      }

      voucherId =
        voucherDoc.id;

      voucherUsed = true;

      // =================================================
      // PARTNER VOUCHER
      // =================================================

      if (
        voucher.type ===
        "partner"
      ) {
        partnerVoucherUsed = true;

        if (
          voucher.partnerUid
        ) {
          partnerId =
            String(
              voucher.partnerUid
            );
        } else if (
          voucher.partnerId
        ) {
          partnerId =
            String(
              voucher.partnerId
            );
        }
      }
    }

    // =====================================================
    // VALIDASI AFFILIATE
    //
    // BOLEH BERSAMAAN DENGAN VOUCHER
    // =====================================================

    if (cleanReferralCode) {
      const affiliateQuery =
        await adminDb
          .collection(
            "affiliates"
          )
          .where(
            "referralCode",
            "==",
            cleanReferralCode
          )
          .where(
            "active",
            "==",
            true
          )
          .limit(1)
          .get();

      if (
        affiliateQuery.empty
      ) {
        return errorResponse(
          "Kode referral tidak ditemukan."
        );
      }

      const affiliateDoc =
        affiliateQuery
          .docs[0];

      const affiliate =
        affiliateDoc.data();

      affiliateId =
        affiliate.uid ??
        affiliateDoc.id;

      affiliateUsed = true;
    }

    // =====================================================
    // PROMO TYPE
    // =====================================================

    let promoType:
      | "NONE"
      | "VOUCHER"
      | "PARTNER"
      | "AFFILIATE"
      | "VOUCHER_AFFILIATE" =
      "NONE";

    if (
      voucherUsed &&
      affiliateUsed
    ) {
      promoType =
        "VOUCHER_AFFILIATE";
    } else if (
      partnerVoucherUsed
    ) {
      promoType =
        "PARTNER";
    } else if (
      voucherUsed
    ) {
      promoType =
        "VOUCHER";
    } else if (
      affiliateUsed
    ) {
      promoType =
        "AFFILIATE";
    }

    // =====================================================
    // FINAL DISCOUNT
    // =====================================================

    discount =
      Math.max(
        0,
        Math.min(
          discount,
          subtotal
        )
      );

    const grandTotal =
      subtotal - discount;

    if (
      !Number.isFinite(
        grandTotal
      ) ||
      grandTotal <= 0
    ) {
      return errorResponse(
        "Total pembayaran tidak valid."
      );
    }

    // =====================================================
    // MIDTRANS
    // =====================================================

    const serverKey =
      process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      throw new Error(
        "MIDTRANS_SERVER_KEY belum diatur."
      );
    }

    const isProduction =
      process.env
        .MIDTRANS_IS_PRODUCTION ===
      "true";

    const snap =
      new midtransClient.Snap({
        isProduction,
        serverKey,
      });

    // =====================================================
    // BUAT TRANSAKSI MIDTRANS
    //
    // PEMBAYARAN BELUM BERHASIL.
    // STATUS MASIH PENDING.
    // =====================================================

    const transaction =
      await snap.createTransaction({
        transaction_details: {
          order_id:
            cleanOrderId,

          gross_amount:
            grandTotal,
        },

        customer_details: {
          first_name:
            cleanNama,

          email:
            normalizedEmail,

          phone:
            cleanWa,
        },

        item_details: [
          {
            id:
              cleanPackageId,

            name: String(
              packageData.name ??
                packageData.nama ??
                "Paket Membership"
            ),

            quantity: 1,

            price:
              grandTotal,
          },
        ],
      });

    // =====================================================
    // SIMPAN TRANSACTION
    //
    // USER BELUM DIBUAT.
    // =====================================================

    await trxRef.set({
      orderId:
        cleanOrderId,

      uid: null,

      nama:
        cleanNama,

      email:
        normalizedEmail,

      wa:
        cleanWa,

      tglLahir:
        cleanTglLahir,

      provinceId:
        cleanProvinceId,

      provinceName:
        cleanProvinceName,

      regencyId:
        cleanRegencyId,

      regencyName:
        cleanRegencyName,

      educationLevelId:
        cleanEducationLevelId,

      educationLevelName:
        educationLevelData.nama ??
        null,

      packageId:
        cleanPackageId,

      packageNama:
        packageData.name ??
        packageData.nama ??
        null,

      packageSlug:
        packageData.slug ??
        null,

      packageDurasiHari:
        getNumber(
          packageData.durationDays,
          packageData.durasiHari
        ),

      packageHarga:
        subtotal,

      subtotal,

      discount,

      grandTotal,

      currency:
        "IDR",

      // =================================================
      // PROMO
      // =================================================

      voucherCode:
        finalVoucherCode ||
        null,

      referralCode:
        cleanReferralCode ||
        null,

      promoType,

      voucherId,

      affiliateId,

      partnerId,

      affiliateCommissionType,

      affiliateCommissionValue,

      partnerCommissionType,

      partnerCommissionValue,

      // =================================================
      // STATUS
      // =================================================

      paymentStatus:
        "PENDING",

      paymentType:
        null,

      transactionId:
        null,

      transactionStatus:
        "pending",

      fraudStatus:
        null,

      status:
        "WAITING_PAYMENT",

      snapToken:
        transaction.token,

      snapRedirectUrl:
        transaction.redirect_url,

      schemaVersion:
        4,

      createdFrom:
        "WEB",

      createdAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),

      paidAt:
        null,

      // =================================================
      // PASSWORD
      //
      // Hanya untuk proses pembuatan user
      // melalui webhook setelah pembayaran berhasil.
      // =================================================

      encryptedPassword:
        encrypt(password),
    });

    console.log(
      "TRANSACTION CREATED:",
      {
        orderId:
          cleanOrderId,

        paymentStatus:
          "PENDING",

        voucherCode:
          finalVoucherCode ||
          null,

        referralCode:
          cleanReferralCode ||
          null,

        voucherId,

        affiliateId,

        partnerId,

        grandTotal,
      }
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      paymentCreated:
        true,

      paymentStatus:
        "PENDING",

      paid: false,

      userCreated:
        false,

      orderId:
        cleanOrderId,

      token:
        transaction.token,

      redirectUrl:
        transaction.redirect_url,

      subtotal,

      discount,

      grandTotal,
    });
  } catch (err) {
    console.error(
      "CHECKOUT ERROR:",
      err
    );

    return NextResponse.json(
      {
        success: false,

        message:
          err instanceof Error
            ? err.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}