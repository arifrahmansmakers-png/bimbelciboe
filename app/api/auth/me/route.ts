import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";

export async function POST() {
  try {
    const session = (await cookies()).get("__session")?.value;

    if (!session) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    const decoded = await getAuth().verifySessionCookie(session, true);

    return NextResponse.json({
      authenticated: true,
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      }
    );
  }
}