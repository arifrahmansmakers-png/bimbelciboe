'use client';
import React from 'react';
import Link from 'next/link';
import { DATA_HARGA } from '../../data/harga';

export default function DaftarPage() {
  const VOUCHER_KODE = "CIBOE-TKA";
  const plans = Object.values(DATA_HARGA);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Pilih Paket Member Anda
          </h1>
          <p className="text-lg text-gray-600">
            Gunakan voucher <span className="font-bold text-orange-600">{VOUCHER_KODE}</span> untuk mendapatkan harga spesial hari ini!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan) => {
            // Menentukan paket populer (bisa disesuaikan di data/harga.ts jika ingin dinamis)
            const isPopular = plan.id === "paket_6bulan";
            
            return (
              <div 
                key={plan.id} 
                className={`relative bg-white rounded-2xl shadow-xl border-2 p-8 transition-all hover:scale-105 duration-300 ${
                  isPopular ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100'
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Paling Diminati
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">{plan.nama}</h3>
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-sm text-gray-400 line-through">
                      Rp {plan.hargaAsli.toLocaleString()}
                    </span>
                    <span className="text-4xl font-extrabold text-gray-900">
                      Rp {(plan.hargaAsli - plan.potonganVoucher).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-500 text-sm">
                    {plan.id === "paket_3bulan" && "Paket singkat untuk persiapan cepat."}
                    {plan.id === "paket_6bulan" && "Pilihan paling pas untuk hasil maksimal."}
                    {plan.id === "paket_1tahun" && "Akses jangka panjang paling hemat."}
                  </p>
                </div>

                <Link 
                  href={`daftar/checkout?paket=${plan.id}`}
                  className={`block text-center w-full py-4 rounded-xl font-bold text-white transition-colors ${
                    isPopular ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Pilih Paket
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}