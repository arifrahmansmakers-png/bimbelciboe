'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  // Tombol tidak akan muncul jika kita berada di halaman ujian
  if (pathname.includes('/simulasi/ujian')) return null;

  return (
    <nav className="p-4 bg-white border-b flex justify-between items-center shadow-xs">
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200">
          <Image src="/logo.png" alt="Ciboe Edu" fill sizes="36px" className="object-cover" />
        </div>
        <span className="font-black text-slate-900 text-lg">
          Ciboe<span className="text-blue-600">Edu</span>
        </span>
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