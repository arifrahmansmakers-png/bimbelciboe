import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Auth Logout API",
  });
}

export async function POST() {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "__session",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });

  return response;
}