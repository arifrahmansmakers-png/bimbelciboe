import Link from "next/link";

export default function BantuanPage() {
  const menus = [
    {
      title: "Feedback",
      desc: "Kirim saran, kritik, atau laporkan bug.",
      href: "/dashboard/member/bantuan/feedback",
      icon: "💬",
    },
    {
      title: "FAQ",
      desc: "Pertanyaan yang sering ditanyakan.",
      href: "/dashboard/member/bantuan/faq",
      icon: "❓",
    },
    {
      title: "Hubungi Admin",
      desc: "Hubungi admin apabila membutuhkan bantuan.",
      href: "/dashboard/member/bantuan/kontak",
      icon: "☎️",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Pusat Bantuan
      </h1>

      <p className="text-slate-500 mb-8">
        Silakan pilih layanan bantuan yang Anda perlukan.
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {menus.map((menu) => (
          <Link
            key={menu.title}
            href={menu.href}
            className="rounded-2xl border bg-white shadow hover:shadow-lg transition p-6"
          >
            <div className="text-5xl mb-4">
              {menu.icon}
            </div>

            <h2 className="font-bold text-xl">
              {menu.title}
            </h2>

            <p className="text-slate-500 mt-2">
              {menu.desc}
            </p>
          </Link>
        ))}

      </div>

    </div>
  );
}