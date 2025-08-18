export default function DenseTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-auto border border-[#1b2233] rounded-2xl">
      <table className="w-full border-collapse text-sm">
        {children}
      </table>
    </div>
  );
}
