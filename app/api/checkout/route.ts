import { NextResponse } from 'next/server';
// @ts-ignore
import midtransClient from 'midtrans-client';
import { adminDb } from '@/lib/firebaseAdmin';

// Mencegah error saat build Vercel dengan memaksa mode runtime
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      paket, harga, orderId, nama, email, wa, tglLahir, password 
    } = data;

    // 1. Simpan data ke Firestore
    await adminDb.collection('transactions').doc(orderId).set({
      nama,
      email,
      wa,
      tglLahir,
      password: Buffer.from(password).toString('base64'),
      paket,
      harga,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });

    // 2. Setup Midtrans dengan proteksi dan log untuk debugging
    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    // Log ini akan muncul di Vercel Logs saat API ini dipanggil
    console.log("DEBUG: Status MIDTRANS_SERVER_KEY ditemukan:", !!serverKey);

    if (!serverKey) {
      console.error("DEBUG ERROR: MIDTRANS_SERVER_KEY tidak ditemukan di environment variables!");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKey
    });

    const cleanHarga = parseInt(harga.toString().replace(/[^0-9]/g, ''));

    let parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cleanHarga,
      },
      customer_details: {
        first_name: nama,
        email: email,
        phone: wa
      },
      item_details: [{
        id: paket,
        price: cleanHarga,
        quantity: 1,
        name: paket
      }]
    };

    // 3. Create Transaction
    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    console.error("DEBUG ERROR MIDTRANS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}