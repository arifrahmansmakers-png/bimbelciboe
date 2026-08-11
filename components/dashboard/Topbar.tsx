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
  const { user } = useUser();

  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

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

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header
      className="
      sticky
      top-0
      z-40
      border-b
      border-slate-200
      bg-white/90
      backdrop-blur-md
      "
    >
      <div
        className="
        h-16
        px-4
        lg:px-8
        flex
        items-center
        justify-between
        "
      >
        {/* Left */}

        <div className="flex items-center gap-3">

          <button
            onClick={onOpenMenu}
            className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-slate-100
            transition
            "
          >
            <Menu size={22} />
          </button>

          <div>

            <h1
              className="
              text-lg
              font-bold
              text-slate-800
              tracking-tight
              "
            >
              {title}
            </h1>

            <p
              className="
              hidden
              sm:block
              text-xs
              text-slate-500
              "
            >
              Selamat belajar dan semoga sukses.
            </p>

          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          <button
            className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-100
            transition
            "
          >
            <Bell size={20} />

            <span
              className="
              absolute
              top-1
              right-1
              h-2
              w-2
              rounded-full
              bg-red-500
              "
            />
          </button>

          {/* Profile */}

          <div
            ref={profileRef}
            className="relative"
          >
            <button
              onClick={() =>
                setOpenProfile(!openProfile)
              }
              className="
              flex
              items-center
              gap-3
              rounded-xl
              hover:bg-slate-100
              px-2
              py-1.5
              transition
              "
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div
                  className="
                  h-10
                  w-10
                  rounded-full
                  bg-blue-700
                  text-white
                  flex
                  items-center
                  justify-center
                  font-semibold
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="hidden md:block text-left">

                <p
                  className="
                  text-sm
                  font-semibold
                  text-slate-800
                  "
                >
                  {user.name}
                </p>

                <p
                  className="
                  text-xs
                  text-slate-500
                  "
                >
                  {user.email}
                </p>

              </div>

              <ChevronDown
                size={18}
                className="hidden md:block"
              />
            </button>

            {/* Dropdown */}

            {openProfile && (
              <div
                className="
                absolute
                right-0
                mt-3
                w-64
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-xl
                overflow-hidden
                "
              >
                <div className="p-4">

                  <p className="font-semibold">
                    {user.name}
                  </p>

                  <p
                    className="
                    text-sm
                    text-slate-500
                    break-all
                    "
                  >
                    {user.email}
                  </p>

                </div>

                <div className="border-t">

                  <button
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-slate-50
                    transition
                    "
                  >
                    <User size={18} />
                    Profil Saya
                  </button>

                  <button
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    hover:bg-slate-50
                    transition
                    "
                  >
                    <Settings size={18} />
                    Pengaturan
                  </button>

                  <button
                    className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-red-600
                    hover:bg-red-50
                    transition
                    "
                  >
                    <LogOut size={18} />
                    Keluar
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