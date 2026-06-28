import Link from 'next/link';
import { BookOpen, Laptop, Pencil, GraduationCap } from 'lucide-react';

export default function Home() {
  const menuItems = [
    { title: "SIMULASI", link: "/simulasi", icon: <Pencil size={32} />, color: "text-blue-400" },
    { title: "KURIKULUM", link: "/kurikulum", icon: <BookOpen size={32} />, color: "text-yellow-400" },
    { title: "MATERI TKA", link: "/materi", icon: <Laptop size={32} />, color: "text-green-400" },
    { title: "DAFTAR", link: "/daftar", icon: <GraduationCap size={32} />, color: "text-red-400" },
  ];

  return (
    <main className="min-h-screen bg-[#0a2540] text-white font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter">Ciboe<span className="text-blue-400">Edu</span></div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16">
        
        {/* Kolom Kiri: Teks & Input */}
        <div className="md:w-1/2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-7xl font-extrabold leading-[0.9] tracking-tighter">
              Bimbel TKA<br/>
              <span className="text-yellow-400">Ciboe Edu</span>
            </h1>
            <p className="text-lg font-medium text-blue-200">SD/MI • SMP/MTs • SMA/MA/SMK</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex items-center shadow-2xl max-w-lg relative z-20">
            <span className="px-5 font-bold text-lg text-blue-200">+62</span>
            <input type="number" placeholder="Masukkan nomor HP" className="w-full bg-transparent outline-none p-3 text-white" />
            <button className="bg-yellow-400 text-[#0a2540] px-6 py-3 rounded-xl font-black hover:bg-yellow-300 transition-all">Diskon!</button>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl inline-block">
            <p className="text-xl font-bold text-yellow-400">DISKON 75% OFF</p>
            <p className="text-sm opacity-70">Harga: <span className="line-through">Rp 100.000</span> → <span className="font-bold text-white">Rp 25.000</span></p>
          </div>
        </div>

        {/* Kolom Kanan: Menu Grid */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4 relative z-20">
          {menuItems.map((item, i) => (
            <Link 
              key={i} 
              href={item.link} // Pastikan path ini sesuai dengan folder di aplikasi Anda
              className="bg-white/5 hover:bg-white/10 border border-white/10 p-8 rounded-3xl transition-all flex flex-col items-center gap-4 text-center group"
            >
              <div className={`${item.color} group-hover:scale-110 transition-transform`}>{item.icon}</div>
              <span className="font-bold text-lg tracking-wide">{item.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}