import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const error = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);

    const orderId = searchParams.get("order_id");

    if (!orderId)
      return error("Order ID tidak ditemukan.");

    const adminDb = getAdminDb();

    const trxDoc = await adminDb
      .collection("transactions")
      .doc(orderId)
      .get();

    if (!trxDoc.exists)
      return error("Transaksi tidak ditemukan.", 404);

    const trx = trxDoc.data()!;

    const paid = trx.paymentStatus === "PAID";

    return NextResponse.json({

      success: true,

      paid,

      paymentStatus: trx.paymentStatus,

      uid: trx.uid ?? null,

      paymentType: trx.paymentType ?? null,

      transactionId: trx.transactionId ?? null,

      paidAt: trx.paidAt ?? null

    });

  } catch (error) {

    console.error("CHECK STATUS ERROR");
    console.error(error);

    return NextResponse.json({

      success: false,

      message:
        error instanceof Error
          ? error.message
          : "Internal Server Error"

    }, {

      status: 500

    });

  }

}