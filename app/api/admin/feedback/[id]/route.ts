import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const failed = (message: string, status = 400) =>
  NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );

async function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = await getAuth().verifyIdToken(token);

    const adminDb = getAdminDb();

    const userDoc = await adminDb
      .collection("users")
      .doc(decoded.uid)
      .get();

    if (!userDoc.exists) {
      return null;
    }

    const user = userDoc.data();

    if (user?.role !== "admin") {
      return null;
    }

    return {
      uid: decoded.uid,
      nama: user.nama ?? "Administrator",
    };
  } catch {
    return null;
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    // =====================================================
    // VERIFIKASI ADMIN
    // =====================================================

    const admin = await verifyAdmin(req);

    if (!admin) {
      return failed("Unauthorized", 401);
    }

    // =====================================================
    // NEXT.JS 16
    // params adalah Promise
    // =====================================================

    const { id } = await params;

    if (!id) {
      return failed("Feedback tidak ditemukan.");
    }

    // =====================================================
    // BODY REQUEST
    // =====================================================

    const body = await req.json();

    const { status, adminReply } = body;

    // =====================================================
    // VALIDASI STATUS
    // =====================================================

    const allowedStatus = [
      "pending",
      "process",
      "resolved",
      "rejected",
    ];

    if (!allowedStatus.includes(status)) {
      return failed("Status tidak valid.");
    }

    // =====================================================
    // AMBIL FEEDBACK
    // =====================================================

    const adminDb = getAdminDb();

    const feedbackRef = adminDb
      .collection("feedbacks")
      .doc(id);

    const feedbackDoc = await feedbackRef.get();

    if (!feedbackDoc.exists) {
      return failed(
        "Feedback tidak ditemukan.",
        404
      );
    }

    const feedback = feedbackDoc.data();

    // =====================================================
    // UPDATE FEEDBACK
    // =====================================================

    await feedbackRef.update({
      status,

      adminReply:
        typeof adminReply === "string"
          ? adminReply.trim() || null
          : null,

      repliedBy: admin.uid,

      repliedByName: admin.nama,

      repliedAt:
        FieldValue.serverTimestamp(),

      updatedAt:
        FieldValue.serverTimestamp(),
    });

    // =====================================================
    // NOTIFIKASI MEMBER
    // =====================================================

    if (feedback?.uid) {
      await adminDb
        .collection("notifications")
        .add({
          uid: feedback.uid,

          type: "feedback",

          title:
            "Feedback Anda Telah Dibalas",

          message:
            "Admin telah memberikan balasan terhadap feedback yang Anda kirim.",

          feedbackId: id,

          isRead: false,

          createdAt:
            FieldValue.serverTimestamp(),
        });
    }

    // =====================================================
    // SYSTEM LOG
    // =====================================================

    await adminDb
      .collection("systemLogs")
      .add({
        action: "REPLY_FEEDBACK",

        actorUid: admin.uid,

        targetId: id,

        targetCollection: "feedbacks",

        createdAt:
          FieldValue.serverTimestamp(),

        description:
          `Admin membalas feedback ${id}`,
      });

    // =====================================================
    // RESPONSE
    // =====================================================

    return NextResponse.json({
      success: true,

      message:
        "Feedback berhasil diperbarui.",
    });
  } catch (error: unknown) {
    console.error(
      "ADMIN FEEDBACK PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}