export default function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl p-4 bg-[#0f1320] border border-[#1b2233] ${className}`}>
      {children}
    </div>
  );
}
