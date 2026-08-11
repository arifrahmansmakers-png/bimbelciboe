interface Props {
  title: string;
  description: string;
}

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div
      className="
      rounded-3xl
      border-2
      border-dashed
      border-slate-300
      bg-white
      p-12
      text-center
      "
    >
      <h2
        className="
        text-xl
        font-bold
        text-slate-700
        "
      >
        {title}
      </h2>

      <p
        className="
        mt-3
        text-slate-500
        "
      >
        {description}
      </p>
    </div>
  );
}