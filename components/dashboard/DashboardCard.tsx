import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  color = "bg-slate-100",
}: DashboardCardProps) {
  return (
    <div
      className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
    "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`${color} flex h-12 w-12 items-center justify-center rounded-xl text-white`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}