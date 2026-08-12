import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  switch (user.role) {
    case "admin":
      redirect("/dashboard/admin");

    case "partner":
      redirect("/dashboard/partner");

    case "member":
    default:
      redirect("/dashboard/member");
  }

  // Fallback
  return (
    <main className="min-h-screen bg-[#FFF8F1] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-xl shadow-slate-200/40">

          {/* Logo / Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#001E38] shadow-lg">
            <div className="h-7 w-7 rounded-lg bg-orange-400" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#001E38]">
            Menyiapkan Dashboard
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Mohon tunggu sebentar, kami sedang menyiapkan
            dashboard Anda.
          </p>

          {/* Loading */}
          <div className="mt-7 flex justify-center">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.3s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-orange-300 [animation-delay:-0.15s]" />
              <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#001E38]" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}