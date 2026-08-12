import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "MIDTRANS TEST ENDPOINT ACTIVE",
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "MIDTRANS TEST POST OK",
  });
}