import Link from "next/link";
import {
  Search,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import PageHeader from "@/components/dashboard/PageHeader";

const subjects = [
  {
    name: "Matematika",
    slug: "matematika",
    total: 12,
    progress: 60,
    color: "bg-blue-600",
  },
  {
    name: "Bahasa Indonesia",
    slug: "bahasa-indonesia",
    total: 8,
    progress: 35,
    color: "bg-red-500",
  },
  {
    name: "Bahasa Inggris",
    slug: "bahasa-inggris",
    total: 10,
    progress: 80,
    color: "bg-emerald-600",
  },
];

export default function MateriPage() {
  return (
    <div className="space-y-8">

      <PageHeader
        title="Materi"
        description="Pelajari ringkasan materi sebelum mulai latihan soal."
      />

      <div className="relative">
        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Cari materi..."
          className="w-full rounded-xl border bg-white py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-5">

        {subjects.map((item) => (

          <Link
            key={item.slug}
            href={`/dashboard/member/materi/${item.slug}`}
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <div
                  className={`${item.color} flex h-14 w-14 items-center justify-center rounded-xl text-white`}
                >
                  <BookOpen />
                </div>

                <div>

                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {item.total} materi
                  </p>

                </div>

              </div>

              <ChevronRight />

            </div>

            <div className="mt-5">

              <div className="mb-2 flex justify-between text-sm">

                <span>Progress</span>

                <span>{item.progress}%</span>

              </div>

              <div className="h-2 rounded-full bg-slate-200">

                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{
                    width: `${item.progress}%`,
                  }}
                />

              </div>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}