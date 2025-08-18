export default function SidePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-64 bg-[#0f1320] border-r border-[#1b2233] p-4">
      {children}
    </div>
  );
}
