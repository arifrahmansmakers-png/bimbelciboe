'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Tombol tidak akan muncul jika kita berada di halaman ujian
  if (pathname.includes('/simulasi/ujian')) return null;

  return (
    <nav className="p-4 bg-white border-b flex justify-between items-center">
      <Link href="/" className="font-bold text-blue-900 text-lg">
        Bimbel CIBOE
      </Link>
      
      {/* Tombol Kembali (hanya muncul jika bukan di beranda) */}
      {pathname !== '/' && (
        <Link href="/" className="text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition">
          ← Kembali ke Beranda
        </Link>
      )}
    </nav>
  );
}