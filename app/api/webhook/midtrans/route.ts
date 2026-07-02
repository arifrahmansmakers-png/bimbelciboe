import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin'; // 1. Impor fungsinya

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ message: "API endpoint aktif!" });
}

export async function POST(req: NextRequest) {
  try {
    // 2. Inisialisasi adminDb di dalam fungsi (Runtime)
    const adminDb = getAdminDb(); 
    
    const body = await req.json();
    console.log("DEBUG: Body diterima:", body);

    const { order_id, transaction_status, fraud_status } = body;

    // 3. Ambil referensi transaksi di Firestore
    const transRef = adminDb.collection('transactions').doc(order_id);
    const transDoc = await transRef.get();

    if (!transDoc.exists) {
      console.log(`DEBUG: Transaksi ${order_id} tidak ditemukan`);
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    // 4. Update status berdasarkan status Midtrans
    let newStatus = 'PENDING';
    
    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      if (fraud_status === 'accept') {
        newStatus = 'PAID';
      } else {
        newStatus = 'FAILED';
      }
    } else if (['expire', 'deny', 'cancel'].includes(transaction_status)) {
      newStatus = 'FAILED';
    } else if (transaction_status === 'pending') {
      newStatus = 'PENDING';
    }

    await transRef.update({ status: newStatus });

    return NextResponse.json({ status: 'ok' });
  } catch (error: any) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}