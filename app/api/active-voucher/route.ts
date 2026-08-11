import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getAdminDb();

    const snapshot = await db
      .collection("vouchers")
      .get();

    const now = new Date();

    const vouchers = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        // ============================================
        // VALID FROM
        // ============================================

        let validFrom: Date | null = null;

        const rawValidFrom = data.validFrom ?? null;

        if (
          rawValidFrom &&
          typeof rawValidFrom.toDate === "function"
        ) {
          validFrom = rawValidFrom.toDate();
        } else if (rawValidFrom instanceof Date) {
          validFrom = rawValidFrom;
        }

        // ============================================
        // VALID UNTIL
        // ============================================

        let validUntil: Date | null = null;

        const rawValidUntil = data.validUntil ?? null;

        if (
          rawValidUntil &&
          typeof rawValidUntil.toDate === "function"
        ) {
          validUntil = rawValidUntil.toDate();
        } else if (rawValidUntil instanceof Date) {
          validUntil = rawValidUntil;
        }

        // ============================================
        // CODE
        // ============================================

        const code =
          typeof data.code === "string"
            ? data.code.trim().toUpperCase()
            : doc.id.toUpperCase();

        // ============================================
        // ACTIVE
        // ============================================

        const active =
          data.active === true;

        // ============================================
        // DISCOUNT TYPE
        //
        // Firestore:
        // diskonType: "percent"
        // ============================================

        const diskonType =
          typeof data.diskonType === "string"
            ? data.diskonType
                .trim()
                .toLowerCase()
            : "";

        // ============================================
        // DISCOUNT VALUE
        //
        // Firestore:
        // diskonValue: 50
        // ============================================

        const diskonValue = Math.max(
          0,
          Number(
            data.diskonValue ?? 0
          )
        );

        // ============================================
        // MINIMUM PURCHASE
        // ============================================

        const minimumPurchase =
          Math.max(
            0,
            Number(
              data.minimumPurchase ?? 0
            )
          );

        // ============================================
        // QUOTA
        // ============================================

        const quota = Math.max(
          0,
          Number(
            data.quota ?? 0
          )
        );

        // ============================================
        // USED
        // ============================================

        const used = Math.max(
          0,
          Number(
            data.used ?? 0
          )
        );

        // ============================================
        // ORDER
        // ============================================

        const order = Number(
          data.order ?? 999
        );

        return {
          id: doc.id,

          code,

          active,

          diskonType,

          diskonValue,

          minimumPurchase,

          quota,

          used,

          validFrom,

          validUntil,

          order,

          type:
            typeof data.type === "string"
              ? data.type
              : null,
        };
      })

      // ============================================
      // FILTER VOUCHER AKTIF
      // ============================================

      .filter((voucher) => {
        // Harus active = true
        if (!voucher.active) {
          return false;
        }

        // Belum masuk masa berlaku
        if (
          voucher.validFrom &&
          voucher.validFrom > now
        ) {
          return false;
        }

        // Sudah melewati masa berlaku
        if (
          voucher.validUntil &&
          voucher.validUntil < now
        ) {
          return false;
        }

        // Kuota habis
        if (
          voucher.quota > 0 &&
          voucher.used >= voucher.quota
        ) {
          return false;
        }

        // Diskon harus lebih dari 0
        if (
          voucher.diskonValue <= 0
        ) {
          return false;
        }

        // Jenis diskon harus valid
        if (
          voucher.diskonType !== "percent" &&
          voucher.diskonType !== "fixed"
        ) {
          return false;
        }

        return true;
      })

      // ============================================
      // SORT PRIORITY
      // ============================================

      .sort((a, b) => {
        if (
          a.order !== b.order
        ) {
          return (
            a.order -
            b.order
          );
        }

        return a.code.localeCompare(
          b.code
        );
      });

    // ============================================
    // NO ACTIVE VOUCHER
    // ============================================

    if (vouchers.length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: null,
        },
        {
          status: 200,
        }
      );
    }

    // ============================================
    // SELECT FIRST VOUCHER
    // ============================================

    const voucher =
      vouchers[0];

    // ============================================
    // PUBLIC RESPONSE
    // ============================================

    return NextResponse.json(
      {
        success: true,

        data: {
          code: voucher.code,

          type: voucher.type,

          diskonType:
            voucher.diskonType,

          diskonValue:
            voucher.diskonValue,

          minimumPurchase:
            voucher.minimumPurchase,

          validFrom:
            voucher.validFrom
              ? voucher.validFrom.toISOString()
              : null,

          validUntil:
            voucher.validUntil
              ? voucher.validUntil.toISOString()
              : null,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/active-voucher:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message:
          "Failed to get active voucher.",
      },
      {
        status: 500,
      }
    );
  }
}