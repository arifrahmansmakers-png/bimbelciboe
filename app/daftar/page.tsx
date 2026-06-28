'use client'; // Pastikan ini ada jika Anda menggunakan fitur client-side di Next.js App Router
import React from 'react';
import Link from 'next/link'; // Import Link dari next/link

export default function DaftarPage() {
  const plans = [
    {
      duration: "6 Bulan",
      price: "25.000",
      description: "Cocok untuk mencoba layanan kami.",
      buttonText: "Pilih Paket",
      isPopular: false,
    },
    {
      duration: "1 Tahun",
      price: "40.000",
      description: "Pilihan terbaik untuk penghematan maksimal.",
      buttonText: "Pilih Paket",
      isPopular: true,
    },
    {
      duration: "2 Tahun",
      price: "75.000",
      description: "Akses jangka panjang tanpa gangguan.",
      buttonText: "Pilih Paket",
      isPopular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Pilih Paket Member Anda
          </h1>
          <p className="text-lg text-gray-600">
            Mulai investasi Anda sekarang. Pilih durasi yang paling sesuai dengan kebutuhan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl shadow-xl border-2 p-8 transition-all hover:scale-105 duration-300 ${
                plan.isPopular ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Paling Diminati
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">{plan.duration}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">Rp {plan.price}</span>
                </div>
                <p className="mt-4 text-gray-500 text-sm">{plan.description}</p>
              </div>

              {/* Tombol berubah menjadi Link untuk navigasi */}
              <Link 
                href={`/checkout?paket=${plan.duration}&harga=${plan.price}`}
                className={`block text-center w-full py-4 rounded-xl font-bold text-white transition-colors ${
                  plan.isPopular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}