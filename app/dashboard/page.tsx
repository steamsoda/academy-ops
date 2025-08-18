export default function Dashboard(){
  return (
    <main className="p-6 grid gap-4">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {['Active Players','Attendance Rate','Matches This Week'].map(k=>(
          <div key={k} className="rounded-2xl p-4 bg-[#0f1320] border border-[#1b2233]">
            <div className="text-xs opacity-70">{k}</div>
            <div className="text-3xl mt-2">—</div>
          </div>
        ))}
      </div>
    </main>
  );
}
