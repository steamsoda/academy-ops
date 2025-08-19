export default function Kpi98({ label, value, delta, asOf }: { label: string; value: string | number; delta?: string; asOf?: string }) {
  return (
    <div className="kpi98 bevel-raise" style={{ padding: 8 }}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        {delta && <span className="delta">{delta}</span>}
        {asOf && <span className="label">as of {asOf}</span>}
      </div>
    </div>
  );
}
