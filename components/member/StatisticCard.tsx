interface Props {
  title: string;
  value: string | number;
}

export default function StatisticCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
      rounded-2xl
      bg-white
      border
      border-slate-200
      p-5
      shadow-sm
      "
    >
      <p
        className="
        text-sm
        text-slate-500
        "
      >
        {title}
      </p>

      <h3
        className="
        mt-2
        text-3xl
        font-bold
        text-blue-900
        "
      >
        {value}
      </h3>
    </div>
  );
}