'use client';
export default function Grid(){
  const fields=['11v11','7v7-1','7v7-2','5v5-1','5v5-2','3v3-A','3v3-B'];
  const times=Array.from({length:12},(_,i)=>`${String(9+i).padStart(2,'0')}:00`);
  return (
    <main className="p-6">
      <h1 className="text-2xl mb-4">Schedule Grid</h1>
      <div className="overflow-auto border border-[#1b2233] rounded-2xl">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-[#0f1320]">
            <tr>
              <th className="p-2 text-left border-b border-[#1b2233]">Field</th>
              {times.map(t=><th key={t} className="p-2 text-left border-b border-l border-[#1b2233]">{t}</th>)}
            </tr>
          </thead>
          <tbody>
            {fields.map(f=>(
              <tr key={f}>
                <td className="p-2 border-t border-[#1b2233] sticky left-0 bg-[#0b0e14]">{f}</td>
                {times.map(t=><td key={t} className="p-2 border-t border-l border-[#1b2233]">—</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
