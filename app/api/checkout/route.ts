import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';

export async function POST(req: Request) {
  try {
    const { paket, harga, orderId, paymentMethod } = await req.json();

    // Inisialisasi Midtrans Snap
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY!
    });

    // Membersihkan harga (pastikan berupa number)
    const cleanHarga = parseInt(harga.toString().replace(/[^0-9]/g, ''));

    // Parameter dasar
    let parameter: any = {
      transaction_details: {
        order_id: orderId,
        gross_amount: cleanHarga,
      },
      customer_details: {
        first_name: "Pembeli",
        email: "pembeli@example.com"
      },
      item_details: [{
        id: paket,
        price: cleanHarga,
        quantity: 1,
        name: paket
      }]
    };

    // Logika pemilihan metode pembayaran
    // Jika paymentMethod dikirim dari frontend, kita filter. 
    // Jika tidak dikirim, Midtrans akan menampilkan semua metode yang aktif di dashboard.
    if (paymentMethod) {
      if (paymentMethod === 'va') {
        // Menggunakan 'other_va' atau daftar lengkap VA agar user bisa memilih bank di dalam popup
        parameter.enabled_payments = ['bca_va', 'bni_va', 'bri_va', 'permata_va', 'other_va'];
      } else if (paymentMethod === 'minimarket') {
        // Memunculkan opsi Alfamart dan Indomaret
        parameter.enabled_payments = ['alfamart', 'indomaret'];
      } else {
        // Untuk qris atau metode spesifik lainnya
        parameter.enabled_payments = [paymentMethod];
      }
    }

    const transaction = await snap.createTransaction(parameter);
    
    return NextResponse.json({ token: transaction.token });
    
  } catch (error: any) {
    console.error("DEBUG ERROR MIDTRANS:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}