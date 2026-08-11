import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export async function POST() {
  try {
    const session = (await cookies())
      .get("__session")
      ?.value;

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

    const decoded =
      await getAuth().verifySessionCookie(
        session,
        true
      );

    const db = getFirestore();

    const userDoc = await db
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userDoc.exists) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 404,
        }
      );
    }

    const user = userDoc.data();

    return NextResponse.json({
      authenticated: true,

      user: {
        uid: decoded.uid,

        email: decoded.email,

        name: user?.name ?? "",

        role: user?.role ?? "member",

        educationLevelId:
          user?.educationLevelId ?? null,

        packageId:
          user?.packageId ?? null,

        packageExpiredAt:
          user?.packageExpiredAt ?? null,

        photoURL:
          user?.photoURL ?? null,

        isActive:
          user?.isActive ?? true,
      },
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