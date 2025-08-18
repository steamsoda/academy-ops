interface KPIProps {
  label: string;
  value: string | number;
  delta?: { value: number; isPositive: boolean };
  unit?: string;
  asOf?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export default function KPI({ 
  label, 
  value, 
  delta, 
  unit, 
  asOf, 
  trend = 'neutral',
  className = '' 
}: KPIProps) {
  return (
    <div className={`bg-usgc-panel border border-usgc-line p-4 ${className}`}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-usgc-muted font-medium">{label}</span>
        {asOf && (
          <span className="text-xs text-usgc-muted">as of {asOf}</span>
        )}
      </div>
      
      {/* Value row */}
      <div className="flex items-baseline justify-between">
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-mono font-semibold">{value}</span>
          {unit && <span className="text-sm text-usgc-muted">{unit}</span>}
        </div>
        
        {/* Delta indicator */}
        {delta && (
          <div className={`flex items-center space-x-1 text-xs ${
            delta.isPositive ? 'text-usgc-success' : 'text-usgc-error'
          }`}>
            <span>{delta.isPositive ? '▲' : '▼'}</span>
            <span className="font-mono">{Math.abs(delta.value)}</span>
          </div>
        )}
      </div>
      
      {/* Trend indicator */}
      {trend !== 'neutral' && (
        <div className="mt-2 h-1 bg-usgc-line">
          <div className={`h-full ${
            trend === 'up' ? 'bg-usgc-success' : 'bg-usgc-error'
          }`} style={{ width: '60%' }}></div>
        </div>
      )}
    </div>
  );
}
