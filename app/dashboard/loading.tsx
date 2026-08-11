export default function DashboardLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-5xl animate-pulse space-y-6">
        <div className="h-10 w-64 rounded-xl bg-slate-200" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 rounded-2xl bg-slate-200"
            />
          ))}
        </div>

        <div className="h-80 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}