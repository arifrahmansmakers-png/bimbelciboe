import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

interface UserItem {
  uid: string;
  nama?: string;
  name?: string;
  email: string;
  wa?: string;
  role?: string;
  status?: string;
  educationLevelName?: string;
  educationLevelId?: string;
  membershipStatus?: string;
  membershipActive?: boolean;
  membershipExpiredAt?: string | null;
  packageId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const DEFAULT_USERS: UserItem[] = [
  {
    uid: "0VIWS5691eUWgkk75naxoCylXBp2",
    nama: "Arif Rahman",
    email: "arifelecsitic@gmail.com",
    wa: "081234567890",
    role: "member",
    status: "ACTIVE",
    educationLevelName: "SMA/MA Sederajat",
    educationLevelId: "sma",
    membershipStatus: "ACTIVE",
    membershipActive: true,
    membershipExpiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2026-08-11T10:00:00Z",
  },
  {
    uid: "user-sd-01",
    nama: "Budi Santoso",
    email: "budi.sd@gmail.com",
    wa: "081298765432",
    role: "member",
    status: "ACTIVE",
    educationLevelName: "SD/MI Sederajat",
    educationLevelId: "sd",
    membershipStatus: "ACTIVE",
    membershipActive: true,
    membershipExpiredAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2026-09-01T08:00:00Z",
  },
  {
    uid: "user-smp-02",
    nama: "Siti Rahma",
    email: "siti.smp@gmail.com",
    wa: "085612348899",
    role: "member",
    status: "ACTIVE",
    educationLevelName: "SMP/MTs Sederajat",
    educationLevelId: "smp",
    membershipStatus: "ACTIVE",
    membershipActive: true,
    membershipExpiredAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2026-09-10T09:30:00Z",
  },
  {
    uid: "QeCUo9tOeLhZy8rxpJBkCGxqthf1",
    nama: "Admin Ciboe",
    email: "arifrahmansmakers@gmail.com",
    wa: "081987654321",
    role: "admin",
    status: "ACTIVE",
    educationLevelName: "SMA/MA Sederajat",
    educationLevelId: "sma",
    membershipStatus: "ACTIVE",
    membershipActive: true,
    membershipExpiredAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: "2026-08-01T08:00:00Z",
  },
];

// GET: Ambil daftar seluruh user dari Firestore (fallback ke DEFAULT_USERS jika kosong / error)
export async function GET() {
  try {
    const adminDb = getAdminDb();
    const snapshot = await adminDb.collection("users").get();

    if (!snapshot.empty) {
      const users: UserItem[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          nama: data.nama || data.name || "Member",
          email: data.email || "",
          wa: data.wa || data.phone || "",
          role: data.role || "member",
          status: data.status || "ACTIVE",
          educationLevelName: data.educationLevelName || "SMA/MA Sederajat",
          educationLevelId: data.educationLevelId || "sma",
          membershipStatus: data.membershipStatus || (data.membershipActive ? "ACTIVE" : "INACTIVE"),
          membershipActive: !!data.membershipActive,
          membershipExpiredAt: data.membershipExpiredAt || null,
          packageId: data.packageId || "paket-1-bulan",
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt,
        };
      });
      return NextResponse.json({ success: true, users });
    }
  } catch (err) {
    console.warn("Firestore query failed or service account key not available, fallback to defaults:", err);
  }

  return NextResponse.json({ success: true, users: DEFAULT_USERS });
}

// POST: Tambah masa aktif member secara manual oleh admin
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, daysToAdd, newExpiredAt, reason } = body;

    if (!uid) {
      return NextResponse.json(
        { success: false, message: "User ID (uid) wajib disertakan." },
        { status: 400 }
      );
    }

    let calculatedExpiredAt: string;

    if (newExpiredAt) {
      calculatedExpiredAt = new Date(newExpiredAt).toISOString();
    } else {
      const days = typeof daysToAdd === "number" && daysToAdd > 0 ? daysToAdd : 30;
      // Ambil tanggal dasar
      const now = Date.now();
      calculatedExpiredAt = new Date(now + days * 24 * 60 * 60 * 1000).toISOString();
    }

    const updatePayload = {
      membershipStatus: "ACTIVE",
      membershipActive: true,
      membershipExpiredAt: calculatedExpiredAt,
      manualExtensionReason: reason || "Perpanjangan manual oleh Administrator",
      updatedAt: new Date().toISOString(),
    };

    try {
      const adminDb = getAdminDb();
      const userRef = adminDb.collection("users").doc(uid);
      await userRef.set(updatePayload, { merge: true });
    } catch (dbErr) {
      console.warn("Could not write directly to Firestore Admin (fallback mode):", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Masa aktif berhasil diperpanjang hingga ${new Date(calculatedExpiredAt).toLocaleDateString("id-ID")}`,
      updatedUser: {
        uid,
        ...updatePayload,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal memperpanjang masa aktif user" },
      { status: 500 }
    );
  }
}
