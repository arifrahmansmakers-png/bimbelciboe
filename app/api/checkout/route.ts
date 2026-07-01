import { NextResponse } from 'next/server';
// @ts-ignore
import midtransClient from 'midtrans-client';
import { adminDb } from '@/lib/firebaseAdmin'; // Pastikan path ini benar

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { 
      paket, harga, orderId, nama, email, wa, tglLahir, password 
    } = data;

    // 1. Simpan data user dan status order ke Firestore
    // Ini langkah penting agar data tetap ada walaupun user menutup tab sebelum bayar
    await adminDb.collection('transactions').doc(orderId).set({
      nama,
      email,
      wa,
      tglLahir,
      password: Buffer.from(password).toString('base64'), // Sederhana: simpan sebagai base64
      paket,
      harga,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });

    // 2. Setup Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!
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