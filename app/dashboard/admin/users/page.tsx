"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Shield,
  GraduationCap,
  Mail,
  Phone,
  RefreshCw,
  Clock,
} from "lucide-react";

interface UserItem {
  uid: string;
  nama?: string;
  name?: string;
  email: string;
  wa?: string;
  role?: string;
  status?: string;
  educationLevelName?: string;
  membershipStatus?: string;
  membershipExpiredAt?: string | null;
  createdAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const sampleUsers: UserItem[] = [
    {
      uid: "0VIWS5691eUWgkk75naxoCylXBp2",
      nama: "Arif Rahman",
      email: "arifelecsitic@gmail.com",
      wa: "081234567890",
      role: "member",
      status: "ACTIVE",
      educationLevelName: "SMA/MA Sederajat",
      membershipStatus: "ACTIVE",
      createdAt: "2026-08-11T10:00:00Z",
    },
    {
      uid: "QeCUo9tOeLhZy8rxpJBkCGxqthf1",
      nama: "Admin Ciboe",
      email: "arifrahmansmakers@gmail.com",
      wa: "081987654321",
      role: "admin",
      status: "ACTIVE",
      educationLevelName: "SMA/MA Sederajat",
      membershipStatus: "ACTIVE",
      createdAt: "2026-08-01T08:00:00Z",
    },
  ];

  useEffect(() => {
    // Initial fetch / fallback
    setUsers(sampleUsers);
    setLoading(false);
  }, []);

  const filtered = users.filter((u) => {
    const matchSearch =
      (u.nama || "").toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.wa || "").includes(search);
    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Users size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Kelola Pengguna</h1>
            <p className="text-sm text-slate-500">Daftar akun member, mitra/partner, dan administrator.</p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, email, atau WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500"
        >
          <option value="all">Semua Role</option>
          <option value="member">Member</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* USERS TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Nama & Email</th>
                <th className="px-6 py-4">WhatsApp</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Jenjang</th>
                <th className="px-6 py-4 text-center">Status Membership</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.uid} className="hover:bg-slate-50/80 transition">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{user.nama || "Pengguna"}</div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail size={12} />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                    {user.wa || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "partner"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role || "member"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {user.educationLevelName || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                        user.membershipStatus === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.membershipStatus === "ACTIVE" ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                      {user.membershipStatus === "ACTIVE" ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
