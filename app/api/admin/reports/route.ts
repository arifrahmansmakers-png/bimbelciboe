import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
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

const success = (data: Record<string, unknown>) =>
  NextResponse.json({
    success: true,
    ...data,
  });

export async function GET(req: Request) {
  try {
    const adminDb = getAdminDb();
    const auth = getAuth();

    // ==========================
    // AUTHENTICATION
    // ==========================

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return failed("Unauthorized.", 401);
    }

    const idToken = authHeader.replace("Bearer ", "").trim();

    if (!idToken) {
      return failed("Token tidak valid.", 401);
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // ==========================
    // ADMIN CHECK
    // ==========================

    const userRef = adminDb.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      return failed("Data pengguna tidak ditemukan.", 404);
    }

    const user = userSnap.data()!;

    if (user.role !== "admin") {
      return failed("Akses hanya untuk administrator.", 403);
    }

    // ==========================
    // DATE FILTER
    // ==========================

    const { searchParams } = new URL(req.url);

    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    let fromDate: Date | null = null;
    let toDate: Date | null = null;

    if (fromParam) {
      fromDate = new Date(`${fromParam}T00:00:00.000Z`);

      if (Number.isNaN(fromDate.getTime())) {
        return failed("Parameter from tidak valid.");
      }
    }

    if (toParam) {
      toDate = new Date(`${toParam}T23:59:59.999Z`);

      if (Number.isNaN(toDate.getTime())) {
        return failed("Parameter to tidak valid.");
      }
    }

    if (fromDate && toDate && fromDate > toDate) {
      return failed(
        "Tanggal awal tidak boleh lebih besar dari tanggal akhir."
      );
    }

    // ==========================
    // TRANSACTIONS
    // ==========================

    const transactionsSnap = await adminDb
      .collection("transactions")
      .get();

    let totalTransactions = 0;
    let paidTransactions = 0;
    let pendingTransactions = 0;
    let failedTransactions = 0;

    let totalRevenue = 0;
    let totalDiscount = 0;

    for (const doc of transactionsSnap.docs) {
      const data = doc.data();

      const createdAt = data.createdAt?.toDate
        ? data.createdAt.toDate()
        : data.createdAt
        ? new Date(data.createdAt)
        : null;

      if (
        fromDate &&
        createdAt &&
        createdAt < fromDate
      ) {
        continue;
      }

      if (
        toDate &&
        createdAt &&
        createdAt > toDate
      ) {
        continue;
      }

      totalTransactions++;

      const paymentStatus = String(
        data.paymentStatus ?? ""
      ).toUpperCase();

      if (paymentStatus === "PAID") {
        paidTransactions++;

        totalRevenue += Number(
          data.grandTotal ?? 0
        );
      } else if (paymentStatus === "PENDING") {
        pendingTransactions++;
      } else if (
        ["FAILED", "CANCEL", "EXPIRED"].includes(
          paymentStatus
        )
      ) {
        failedTransactions++;
      }

      totalDiscount += Number(
        data.discount ?? 0
      );
    }

    // ==========================
    // USERS
    // ==========================

    const usersSnap = await adminDb
      .collection("users")
      .get();

    let totalMembers = 0;
    let totalAffiliates = 0;
    let totalPartners = 0;

    for (const doc of usersSnap.docs) {
      const data = doc.data();

      if (data.role === "member") {
        totalMembers++;
      }

      if (data.role === "affiliate") {
        totalAffiliates++;
      }

      if (data.role === "partner") {
        totalPartners++;
      }
    }

    // ==========================
    // TRYOUT RESULTS
    // ==========================

    const resultsSnap = await adminDb
      .collection("tryoutResults")
      .get();

    let totalTryoutAttempts = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalScore = 0;

    for (const doc of resultsSnap.docs) {
      const data = doc.data();

      const submittedAt = data.submittedAt?.toDate
        ? data.submittedAt.toDate()
        : data.submittedAt
        ? new Date(data.submittedAt)
        : null;

      if (
        fromDate &&
        submittedAt &&
        submittedAt < fromDate
      ) {
        continue;
      }

      if (
        toDate &&
        submittedAt &&
        submittedAt > toDate
      ) {
        continue;
      }

      totalTryoutAttempts++;

      const score = Number(
        data.score ?? 0
      );

      totalScore += score;

      if (data.passed === true) {
        totalPassed++;
      } else {
        totalFailed++;
      }
    }

    const averageTryoutScore =
      totalTryoutAttempts > 0
        ? Math.round(
            (totalScore /
              totalTryoutAttempts) *
              100
          ) / 100
        : 0;

    // ==========================
    // COMMISSIONS
    // ==========================

    const commissionsSnap = await adminDb
      .collection("commissions")
      .get();

    let totalCommission = 0;
    let pendingCommission = 0;
    let paidCommission = 0;

    for (const doc of commissionsSnap.docs) {
      const data = doc.data();

      const createdAt = data.createdAt?.toDate
        ? data.createdAt.toDate()
        : data.createdAt
        ? new Date(data.createdAt)
        : null;

      if (
        fromDate &&
        createdAt &&
        createdAt < fromDate
      ) {
        continue;
      }

      if (
        toDate &&
        createdAt &&
        createdAt > toDate
      ) {
        continue;
      }

      const amount = Number(
        data.amount ?? 0
      );

      totalCommission += amount;

      const status = String(
        data.status ?? ""
      ).toUpperCase();

      if (status === "PENDING") {
        pendingCommission += amount;
      }

      if (
        status === "PAID" ||
        status === "COMPLETED"
      ) {
        paidCommission += amount;
      }
    }

    // ==========================
    // RESPONSE
    // ==========================

    return success({
      period: {
        from: fromParam ?? null,
        to: toParam ?? null,
      },

      transactions: {
        total: totalTransactions,
        paid: paidTransactions,
        pending: pendingTransactions,
        failed: failedTransactions,
        revenue: totalRevenue,
        discount: totalDiscount,
      },

      users: {
        members: totalMembers,
        affiliates: totalAffiliates,
        partners: totalPartners,
      },

      tryouts: {
        totalAttempts: totalTryoutAttempts,
        passed: totalPassed,
        failed: totalFailed,
        averageScore: averageTryoutScore,
      },

      commissions: {
        total: totalCommission,
        pending: pendingCommission,
        paid: paidCommission,
      },
    });
  } catch (err) {
    console.error(
      "ADMIN REPORTS API ERROR:",
      err
    );

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}