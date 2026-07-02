import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Dynamic Import untuk mencegah error saat build
    const midtransClient = await import('midtrans-client');
    
    const data = await req.json();
    const { paket, harga, orderId, nama, email, wa, tglLahir, password } = data;

import { adminDb } from '@/lib/firebaseAdmin';

    // Di dalam fungsi POST:
    if (!adminDb) {
      return NextResponse.json({ error: "Firebase not initialized" }, { status: 500 });
    }

    // 2. Simpan ke Firestore
    await adminDb.collection('transactions').doc(orderId).set({
      nama, email, wa, tglLahir,
      password: Buffer.from(password).toString('base64'),
      paket, harga,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });

    // 3. Setup Midtrans
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      throw new Error("MIDTRANS_SERVER_KEY tidak ditemukan");
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKey
    });

    const cleanHarga = parseInt(harga.toString().replace(/[^0-9]/g, ''));

    const parameter = {
      transaction_details: { order_id: orderId, gross_amount: cleanHarga },
      customer_details: { first_name: nama, email: email, phone: wa },
      item_details: [{ id: paket, price: cleanHarga, quantity: 1, name: paket }]
    };

    // 4. Create Transaction
    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    console.error("API Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}