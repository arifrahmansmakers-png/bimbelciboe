import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provinceId: string }> }
) {
  try {
    const { provinceId } = await params;

    if (!provinceId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Province ID wajib diisi.',
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      throw new Error(`EMSIFA HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Format data kabupaten/kota tidak valid.');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API REGENCIES ERROR:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data kabupaten/kota.',
      },
      { status: 500 }
    );
  }
}