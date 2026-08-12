"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import { useUser } from "@/context/UserContext";

interface TopbarProps {
  title: string;
  onOpenMenu: () => void;
}

export default function Topbar({
  title,
  onOpenMenu,
}: TopbarProps) {
  const user = useUser();

  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // =====================================================
  // CLOSE DROPDOWN KETIKA KLIK DI LUAR
  // =====================================================

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      window.location.href = "/login";
    }
  }

  // =====================================================
  // PROFIL
  // =====================================================

  function handleProfile() {
    setOpenProfile(false);

    window.location.href =
      "/dashboard/member/profil";
  }

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <header
      className="
        sticky
        top-0
        z-40
        border-b
        border-slate-200/80
        bg-white/85
        backdrop-blur-xl
        shadow-[0_1px_10px_rgba(15,23,42,0.04)]
      "
    >
      <div
        className="
          flex
          h-16
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* =================================================
            LEFT
        ================================================= */}

        <div className="flex items-center gap-3">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Buka menu"
            className="
              group
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              transition-all
              duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-700
              active:scale-95
              lg:hidden
            "
          >
            <Menu
              size={21}
              strokeWidth={2}
            />
          </button>

          {/* Title */}

          <div>
            <div className="flex items-center gap-2">

              <h1
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  text-slate-800
                  sm:text-xl
                "
              >
                {title}
              </h1>

            </div>

            <p
              className="
                mt-0.5
                hidden
                text-xs
                font-medium
                text-slate-400
                sm:block
              "
            >
              Selamat belajar dan semoga sukses.
            </p>
          </div>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <button
            type="button"
            aria-label="Notifikasi"
            className="
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-200
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-700
              active:scale-95
            "
          >
            <Bell
              size={19}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:rotate-6"
            />

            {/* Notification Badge */}

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
              "
            />
          </button>

          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              type="button"
              onClick={() =>
                setOpenProfile(
                  (previous) => !previous
                )
              }
              aria-expanded={openProfile}
              className={`
                group
                flex
                items-center
                gap-2.5
                rounded-2xl
                border
                px-2
                py-1.5
                transition-all
                duration-200
                ${
                  openProfile
                    ? "border-blue-200 bg-blue-50 shadow-sm"
                    : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                }
              `}
            >

              {/* Avatar */}

              <div className="relative">

                {user.photoURL ? (

                  <Image
                    src={user.photoURL}
                    alt={
                      user.name ||
                      "Profil"
                    }
                    width={40}
                    height={40}
                    className="
                      h-10
                      w-10
                      rounded-xl
                      object-cover
                      ring-2
                      ring-white
                      shadow-sm
                    "
                  />

                ) : (

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      from-blue-600
                      to-indigo-700
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      ring-2
                      ring-white
                    "
                  >
                    {(
                      user.name?.charAt(0) ||
                      "M"
                    ).toUpperCase()}
                  </div>

                )}

                {/* Online Indicator */}

                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    h-2.5
                    w-2.5
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-500
                  "
                />

              </div>

              {/* User Information */}

              <div
                className="
                  hidden
                  min-w-0
                  text-left
                  md:block
                "
              >

                <p
                  className="
                    max-w-40
                    truncate
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  {user.name || "Member"}
                </p>

                <p
                  className="
                    max-w-48
                    truncate
                    text-[11px]
                    text-slate-400
                  "
                >
                  {user.email}
                </p>

              </div>

              <ChevronDown
                size={17}
                strokeWidth={2}
                className={`
                  hidden
                  text-slate-400
                  transition-transform
                  duration-200
                  md:block
                  ${
                    openProfile
                      ? "rotate-180 text-blue-600"
                      : ""
                  }
                `}
              />

            </button>

            {/* =================================================
                DROPDOWN
            ================================================= */}

            {openProfile && (

              <div
                className="
                  absolute
                  right-0
                  mt-3
                  w-72
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-[0_20px_50px_rgba(15,23,42,0.15)]
                  ring-1
                  ring-black/5
                "
              >

                {/* User Header */}

                <div
                  className="
                    bg-gradient-to-br
                    from-blue-50
                    via-white
                    to-indigo-50
                    p-4
                  "
                >

                  <div className="flex items-center gap-3">

                    {user.photoURL ? (

                      <Image
                        src={user.photoURL}
                        alt={
                          user.name ||
                          "Profil"
                        }
                        width={44}
                        height={44}
                        className="
                          h-11
                          w-11
                          rounded-xl
                          object-cover
                          shadow-sm
                          ring-2
                          ring-white
                        "
                      />

                    ) : (

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-blue-600
                          to-indigo-700
                          text-sm
                          font-bold
                          text-white
                          shadow-sm
                        "
                      >
                        {(
                          user.name?.charAt(0) ||
                          "M"
                        ).toUpperCase()}
                      </div>

                    )}

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-bold
                          text-slate-800
                        "
                      >
                        {user.name || "Member"}
                      </p>

                      <p
                        className="
                          mt-0.5
                          truncate
                          text-xs
                          text-slate-500
                        "
                      >
                        {user.email}
                      </p>

                      <div
                        className="
                          mt-1.5
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          bg-emerald-50
                          px-2
                          py-0.5
                          text-[10px]
                          font-semibold
                          text-emerald-600
                        "
                      >
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-500
                          "
                        />

                        Online
                      </div>

                    </div>

                  </div>

                </div>

                {/* Menu */}

                <div
                  className="
                    border-t
                    border-slate-100
                    p-2
                  "
                >

                  {/* Profil */}

                  <button
                    type="button"
                    onClick={handleProfile}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      transition-all
                      duration-150
                      hover:bg-blue-50
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                      "
                    >
                      <User
                        size={17}
                      />
                    </span>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-700
                        "
                      >
                        Profil Saya
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-400
                        "
                      >
                        Kelola informasi profil
                      </p>
                    </div>

                  </button>

                  {/* Pengaturan */}

                  <button
                    type="button"
                    onClick={() =>
                      setOpenProfile(false)
                    }
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      transition-all
                      duration-150
                      hover:bg-slate-50
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-slate-100
                        text-slate-600
                      "
                    >
                      <Settings
                        size={17}
                      />
                    </span>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-700
                        "
                      >
                        Pengaturan
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-400
                        "
                      >
                        Pengaturan akun
                      </p>
                    </div>

                  </button>

                  {/* Divider */}

                  <div className="my-1 border-t border-slate-100" />

                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-red-600
                      transition-all
                      duration-150
                      hover:bg-red-50
                    "
                  >

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-red-50
                        text-red-500
                      "
                    >
                      <LogOut
                        size={17}
                      />
                    </span>

                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                        "
                      >
                        Keluar
                      </p>

                      <p
                        className="
                          text-[11px]
                          text-red-400
                        "
                      >
                        Keluar dari akun
                      </p>
                    </div>

                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </header>
  );
}