export default function TrendMini({ trend, value }: { trend: 'up' | 'down' | 'neutral'; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}>
        {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
      </span>
      <span>{value}</span>
    </div>
  );
}
