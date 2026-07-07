import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 400,
        }
      );
    }

    const expiresIn = 1000 * 60 * 60 * 24 * 5;

    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: "__session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expiresIn / 1000,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}