import { NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebaseAdmin'; // Impor fungsinya

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Dynamic Import Midtrans agar tidak membebani build time
    const midtransClient = await import('midtrans-client');
    
    // 2. Inisialisasi Firebase Admin (Runtime)
    const adminDb = getAdminDb();
    
    const data = await req.json();
    const { paket, harga, orderId, nama, email, wa, tglLahir, password } = data;

    // 3. Simpan ke Firestore
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

    // 4. Setup Midtrans
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    if (!serverKey) {
      throw new Error("MIDTRANS_SERVER_KEY tidak ditemukan di environment variables");
    }

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: serverKey
    });

    const cleanHarga = parseInt(harga.toString().replace(/[^0-9]/g, ''));

    const parameter = {
      transaction_details: { 
        order_id: orderId, 
        gross_amount: cleanHarga 
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

    // 5. Create Transaction
    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    console.error("API Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}