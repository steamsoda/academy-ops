export default function KPI({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl p-4 bg-[#0f1320] border border-[#1b2233]">
      <div className="text-xs opacity-70">{title}</div>
      <div className="text-3xl mt-2">{value}</div>
    </div>
  );
}
