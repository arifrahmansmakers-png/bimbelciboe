"use client";

import { useUser } from "@/context/UserContext";
import { APP_CONFIG } from "@/data/app";

export default function DashboardHeader() {
  const { user } = useUser();

  const hour = new Date().getHours();

  const greeting =
    hour < 11
      ? "Selamat pagi"
      : hour < 15
      ? "Selamat siang"
      : hour < 18
      ? "Selamat sore"
      : "Selamat malam";

  return (
    <section
      className="
      rounded-3xl
      bg-gradient-to-r
      from-blue-900
      via-blue-800
      to-yellow-600
      text-white
      p-6
      shadow-lg
      "
    >
      <p className="text-sm opacity-90">
        {greeting}
      </p>

      <h1
        className="
        mt-1
        text-2xl
        font-bold
        "
      >
        {user.name}
      </h1>

      <p
        className="
        mt-3
        text-sm
        opacity-90
        leading-6
        "
        >
        {APP_CONFIG.slogan}
        </p>
    </section>
  );
}