export default function Table98({ head, rows }: { head: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <table className="table98 table-sm">
      <thead>
        <tr>
          {head.map((h, i) => <th key={i}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((c, ci) => <td key={ci}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
