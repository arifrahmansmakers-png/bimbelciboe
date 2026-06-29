import { NextResponse } from 'next/server';
// @ts-ignore
import midtransClient from 'midtrans-client';

export async function POST(req: Request) {
  try {
    // Menambahkan nama, email, dan phone ke dalam destructuring
    const { paket, harga, orderId, paymentMethod, nama, email, phone } = await req.json();

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!
    });

    const cleanHarga = parseInt(harga.toString().replace(/[^0-9]/g, ''));

    let parameter: any = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cleanHarga,
      },
      customer_details: {
        first_name: nama, // Menggunakan data dari form
        email: email,     // Menggunakan data dari form
        phone: phone      // Menggunakan data dari form
      },
      item_details: [{
        id: paket,
        price: cleanHarga,
        quantity: 1,
        name: paket
      }]
    };

    // ... (logika paymentMethod Anda tetap sama)
    if (paymentMethod) {
       // ... logika filter pembayaran Anda
    }

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    console.error("DEBUG ERROR MIDTRANS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}