import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export default function FeatureCard({
  title,
  description,
  href,
  icon,
}: Props) {
  return (
    <Link
      href={href}
      className="
      block
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      transition
      hover:-translate-y-1
      hover:shadow-lg
      "
    >
      <div className="mb-4 text-blue-700">
        {icon}
      </div>

      <h3
        className="
        text-lg
        font-semibold
        text-slate-800
        "
      >
        {title}
      </h3>

      <p
        className="
        mt-2
        text-sm
        leading-6
        text-slate-500
        "
      >
        {description}
      </p>
    </Link>
  );
}