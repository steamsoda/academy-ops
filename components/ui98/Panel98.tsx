export default function Panel98({ title, subtitle, children }: { title?: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bevel-raise">
      {title && <div className="titlebar">{title} {subtitle && <small>— {subtitle}</small>}</div>}
      <div style={{ padding: 8 }}>{children}</div>
    </div>
  );
}
