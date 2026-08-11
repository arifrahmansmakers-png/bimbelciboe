import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <Icon
        size={48}
        className="mx-auto text-slate-400"
      />

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
}