"use client";

import { useEffect, useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  DollarSign,
  CheckCircle,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Trash2,
  AlertTriangle,
  X,
  Check,
  Filter,
} from "lucide-react";

interface TransactionItem {
  id: string;
  orderId: string;
  nama: string;
  email: string;
  packageNama: string;
  grandTotal: number;
  status: string;
  paymentType: string;
  createdAt: string;
}

function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);
}

export default function AdminLaporanPage() {
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PAID" | "PENDING">("ALL");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<TransactionItem | null>(null);
  const [alertMsg, setAlertMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function loadTransactions() {
    try {
      setLoading(true);
      setAlertMsg(null);
      const res = await fetch("/api/admin/transactions", { cache: "no-store" });
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setTransactions(json.data);
      } else {
        throw new Error(json.message || "Gagal memuat transaksi.");
      }
    } catch (err: any) {
      console.error(err);
      setAlertMsg({ type: "error", text: err.message || "Terjadi kesalahan saat memuat data." });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  // Compute live stats
  const stats = useMemo(() => {
    let totalRevenue = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let failedCount = 0;

    transactions.forEach((tx) => {
      const st = (tx.status || "").toUpperCase();
      if (st === "PAID" || st === "SETTLEMENT" || st === "SUCCESS") {
        paidCount++;
        totalRevenue += Number(tx.grandTotal || 0);
      } else if (st === "PENDING") {
        pendingCount++;
      } else {
        failedCount++;
      }
    });

    return {
      totalRevenue,
      paidTransactions: paidCount,
      pendingTransactions: pendingCount,
      failedTransactions: failedCount,
      totalCount: transactions.length,
    };
  }, [transactions]);

  // Filtered transactions
  const filteredList = useMemo(() => {
    if (filterStatus === "PAID") {
      return transactions.filter((t) => ["PAID", "SETTLEMENT", "SUCCESS"].includes((t.status || "").toUpperCase()));
    }
    if (filterStatus === "PENDING") {
      return transactions.filter((t) => (t.status || "").toUpperCase() === "PENDING");
    }
    return transactions;
  }, [transactions, filterStatus]);

  // Handle single deletion
  async function confirmDelete() {
    if (!itemToDelete) return;
    const targetId = itemToDelete.id;

    try {
      setDeletingId(targetId);
      const res = await fetch(`/api/admin/transactions/${targetId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Gagal menghapus transaksi.");
      }

      setTransactions((prev) => prev.filter((item) => item.id !== targetId));
      setAlertMsg({
        type: "success",
        text: `Transaksi percobaan ${itemToDelete.orderId} berhasil dihapus dari laporan.`,
      });
      setItemToDelete(null);
    } catch (err: any) {
      setAlertMsg({
        type: "error",
        text: err.message || "Terjadi kesalahan saat menghapus data.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  // Handle bulk delete pending/test transactions
  async function handleBulkDeletePending() {
    const pendingItems = transactions.filter((t) => (t.status || "").toUpperCase() === "PENDING");
    if (pendingItems.length === 0) {
      setAlertMsg({ type: "error", text: "Tidak ada transaksi percobaan berstatus pending untuk dihapus." });
      return;
    }

    if (!window.confirm(`Hapus ${pendingItems.length} transaksi percobaan (pending) sekaligus dari database?`)) {
      return;
    }

    try {
      setLoading(true);
      for (const item of pendingItems) {
        await fetch(`/api/admin/transactions/${item.id}`, { method: "DELETE" });
      }
      setAlertMsg({
        type: "success",
        text: `Sebanyak ${pendingItems.length} transaksi percobaan pending berhasil dibersihkan!`,
      });
      await loadTransactions();
    } catch (err: any) {
      setAlertMsg({ type: "error", text: err.message || "Gagal membersihkan data percobaan." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
            <BarChart3 size={26} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Laporan & Statistik</h1>
            <p className="text-sm text-slate-500">Laporan transaksi pembayaran Midtrans & data pendaftaran member.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadTransactions}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            <span>Muat Ulang</span>
          </button>

          {stats.pendingTransactions > 0 && (
            <button
              onClick={handleBulkDeletePending}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-xs sm:text-sm font-bold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
              title="Hapus semua transaksi uji coba berstatus pending"
            >
              <Trash2 size={15} />
              <span>Bersihkan {stats.pendingTransactions} Pending</span>
            </button>
          )}
        </div>
      </div>

      {/* ALERT NOTIFICATION */}
      {alertMsg && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 text-xs sm:text-sm font-medium ${
            alertMsg.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {alertMsg.type === "success" ? <Check size={18} /> : <AlertTriangle size={18} />}
            <span>{alertMsg.text}</span>
          </div>
          <button onClick={() => setAlertMsg(null)} className="text-slate-400 hover:text-slate-700">
            <X size={16} />
          </button>
        </div>
      )}

      {/* STATS OVERVIEW CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan</span>
          <div className="mt-2 text-2xl font-black text-slate-900">{formatRupiah(stats.totalRevenue)}</div>
          <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <TrendingUp size={12} />
            Dari transaksi lunas
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transaksi Lunas (Paid)</span>
          <div className="mt-2 text-2xl font-black text-emerald-600">{stats.paidTransactions} Order</div>
          <span className="mt-1 text-[11px] text-slate-400">Pembayaran Midtrans sukses</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Percobaan / Pending</span>
          <div className="mt-2 text-2xl font-black text-amber-600">{stats.pendingTransactions} Order</div>
          <span className="mt-1 text-[11px] text-slate-400">Dapat dihapus kapan saja</span>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Data Transaksi</span>
          <div className="mt-2 text-2xl font-black text-blue-600">{stats.totalCount} Record</div>
          <span className="mt-1 text-[11px] text-slate-400">Tersimpan di Firestore</span>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Filter size={13} />
          Filter:
        </span>
        <button
          onClick={() => setFilterStatus("ALL")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
            filterStatus === "ALL"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Semua ({transactions.length})
        </button>
        <button
          onClick={() => setFilterStatus("PAID")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
            filterStatus === "PAID"
              ? "bg-emerald-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Lunas / Sukses ({stats.paidTransactions})
        </button>
        <button
          onClick={() => setFilterStatus("PENDING")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
            filterStatus === "PENDING"
              ? "bg-amber-500 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Percobaan / Pending ({stats.pendingTransactions})
        </button>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 font-black text-slate-800 flex items-center justify-between">
          <span>Daftar Transaksi ({filteredList.length})</span>
          <span className="text-xs font-normal text-slate-400">Klik ikon sampah merah untuk menghapus transaksi percobaan</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID Transaksi / Order</th>
                <th className="px-6 py-4">Pembeli</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Nominal</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Memuat data transaksi dari Firestore...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Tidak ada transaksi dengan filter ini.
                  </td>
                </tr>
              ) : (
                filteredList.map((tx) => {
                  const isPaid = ["PAID", "SETTLEMENT", "SUCCESS"].includes((tx.status || "").toUpperCase());
                  const isPending = (tx.status || "").toUpperCase() === "PENDING";

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold text-slate-800 block">{tx.orderId}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {tx.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{tx.nama}</div>
                        <div className="text-xs text-slate-400">{tx.email}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{tx.packageNama}</td>
                      <td className="px-6 py-4 font-black text-slate-900">{formatRupiah(tx.grandTotal)}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            isPaid
                              ? "bg-emerald-100 text-emerald-800"
                              : isPending
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {tx.createdAt ? new Date(tx.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }) : "-"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => setItemToDelete(tx)}
                          className="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition cursor-pointer"
                          title="Hapus transaksi ini dari laporan"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mx-auto mb-4">
              <Trash2 size={24} />
            </div>

            <h3 className="text-lg font-black text-slate-900 text-center">Hapus Transaksi Percobaan?</h3>
            <p className="mt-2 text-xs text-slate-500 text-center leading-relaxed">
              Transaksi dengan ID <strong className="font-mono text-slate-800">{itemToDelete.orderId}</strong> ({itemToDelete.nama} - {formatRupiah(itemToDelete.grandTotal)}) akan dihapus secara permanen dari database Firestore dan statistik laporan.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deletingId === itemToDelete.id}
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-rose-600 py-3 text-xs font-bold text-white shadow-md hover:bg-rose-700 disabled:opacity-60 cursor-pointer"
              >
                {deletingId === itemToDelete.id ? "Menghapus..." : "Ya, Hapus Transaksi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
