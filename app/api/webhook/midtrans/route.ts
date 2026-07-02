import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

// 1. Fungsi untuk testing di browser
export async function GET() {
  return NextResponse.json({ message: "API endpoint aktif!" });
}

// 2. Fungsi untuk Webhook Midtrans (POST)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("DEBUG: Body diterima:", body);

    const { order_id, transaction_status, fraud_status } = body;

    // 1. Ambil referensi transaksi di Firestore
    const transRef = adminDb.collection('transactions').doc(order_id);
    const transDoc = await transRef.get();

    if (!transDoc.exists) {
      console.log(`DEBUG: Transaksi ${order_id} tidak ditemukan`);
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    // 2. Gunakan switch case untuk menangani status
    switch (transaction_status) {
      case 'settlement':
      case 'capture':
        if (fraud_status === 'accept') {
          await transRef.update({ status: 'PAID' });
        }
        break;
      case 'expire':
      case 'deny':
      case 'cancel':
        await transRef.update({ status: 'FAILED' });
        break;
      case 'pending':
        await transRef.update({ status: 'PENDING' });
        break;
      default:
        console.log(`Unhandled status: ${transaction_status}`);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}