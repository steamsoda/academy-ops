export default function GridCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-2 border border-[#1b2233] ${className}`}>
      {children}
    </div>
  );
}
