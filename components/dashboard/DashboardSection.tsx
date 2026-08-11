import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function DashboardSection({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
