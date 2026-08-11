interface Props {
  value: number;
}

export default function ProgressCard({
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
        text-slate-600
        "
      >
        Progress Belajar
      </p>

      <div
        className="
        mt-4
        h-3
        rounded-full
        bg-slate-200
        "
      >
        <div
          style={{
            width: `${value}%`,
          }}
          className="
          h-3
          rounded-full
          bg-blue-700
          "
        />
      </div>

      <p
        className="
        mt-3
        text-lg
        font-bold
        text-blue-900
        "
      >
        {value}%
      </p>
    </div>
  );
}