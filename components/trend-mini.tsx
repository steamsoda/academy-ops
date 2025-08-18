interface TrendMiniProps {
  data: number[];
  label?: string;
  color?: 'viridis' | 'magma' | 'inferno' | 'accent';
  height?: number;
  width?: number;
  showValue?: boolean;
  className?: string;
}

export default function TrendMini({
  data,
  label,
  color = 'accent',
  height = 32,
  width = 120,
  showValue = true,
  className = ''
}: TrendMiniProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center text-xs text-usgc-muted ${className}`} style={{ height, width }}>
        No data
      </div>
    );
  }

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  // Normalize data to 0-1 range
  const normalizedData = data.map(value => 
    range === 0 ? 0.5 : (value - minValue) / range
  );

  // Generate points for SVG path
  const points = normalizedData.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - 20) + 10;
    const y = (1 - value) * (height - 20) + 10;
    return `${x},${y}`;
  });

  const pathData = points.length > 1 ? `M ${points.join(' L ')}` : '';

  // Color mapping
  const getColor = () => {
    switch (color) {
      case 'viridis':
        return '#440154'; // Viridis start color
      case 'magma':
        return '#000004'; // Magma start color
      case 'inferno':
        return '#000004'; // Inferno start color
      default:
        return '#003399'; // USGC accent
    }
  };

  const currentValue = data[data.length - 1];
  const previousValue = data[data.length - 2];
  const trend: 'up' | 'down' | 'neutral' = previousValue !== undefined 
    ? currentValue > previousValue 
      ? 'up' 
      : currentValue < previousValue 
        ? 'down' 
        : 'neutral'
    : 'neutral';

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height} className="overflow-visible">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1b2233" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />
          
          {/* Trend line */}
          {pathData && (
            <path
              d={pathData}
              fill="none"
              stroke={getColor()}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          
          {/* Data points */}
          {normalizedData.map((value, index) => {
            const x = (index / (data.length - 1)) * (width - 20) + 10;
            const y = (1 - value) * (height - 20) + 10;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={index === data.length - 1 ? 3 : 1.5}
                fill={getColor()}
                stroke="#0b0e14"
                strokeWidth="1"
              />
            );
          })}
          
          {/* Current value annotation */}
          {showValue && data.length > 0 && (
            <text
              x={width - 5}
              y={height - 5}
              fontSize="10"
              fill="#e5e7eb"
              textAnchor="end"
              dominantBaseline="hanging"
              fontFamily="JetBrains Mono"
            >
              {currentValue}
            </text>
          )}
        </svg>
      </div>
      
      {/* Label and trend indicator */}
      {label && (
        <div className="flex flex-col">
          <span className="text-xs text-usgc-muted">{label}</span>
          {trend !== 'neutral' && (
            <span className={`text-xs font-mono ${
              trend === 'up' ? 'text-usgc-success' : 'text-usgc-error'
            }`}>
              {trend === 'up' ? '▲' : '▼'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
