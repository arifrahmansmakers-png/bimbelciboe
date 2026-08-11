import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`EMSIFA HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Format data provinsi tidak valid.');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API PROVINCES ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data provinsi.',
      },
      { status: 500 }
    );
  }
}