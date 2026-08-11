"use client";

interface Props {
  name: string;
  email?: string;
}

export default function UserAvatar({
  name,
  email,
}: Props) {
  const initial =
    name.length > 0
      ? name.charAt(0).toUpperCase()
      : "?";

  return (
    <div className="flex items-center gap-3">
      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-[#1F3A5F]
        to-[#345C8A]
        text-white
        font-semibold
        shadow-md
        "
      >
        {initial}
      </div>

      <div className="hidden sm:block">
        <p className="font-semibold text-slate-800">
          {name}
        </p>

        {email && (
          <p className="text-sm text-slate-500">
            {email}
          </p>
        )}
      </div>
    </div>
  );
}