export default function Toolbar98({ children, meta }: { children: React.ReactNode; meta?: string }) {
  return <div className="toolbar98 hairline">{children}{meta && <div className="meta">{meta}</div>}</div>;
}
