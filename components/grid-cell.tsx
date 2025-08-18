interface GridCellProps {
  homeTeam?: string;
  awayTeam?: string;
  competition?: string;
  note?: string;
  status?: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  isConflict?: boolean;
  isNow?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function GridCell({
  homeTeam,
  awayTeam,
  competition,
  note,
  status = 'PENDING',
  isConflict = false,
  isNow = false,
  onClick,
  className = ''
}: GridCellProps) {
  if (!homeTeam && !awayTeam) {
    return (
      <div className={`border border-usgc-line p-2 min-h-[32px] ${className}`}>
        {isNow && (
          <div className="border-l-2 border-dashed border-usgc-accent h-full"></div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`border border-usgc-line p-2 min-h-[32px] cursor-pointer hover:bg-usgc-panel transition-colors ${
        isConflict ? 'bg-red-900/20' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Conflict indicator */}
      {isConflict && (
        <div className="absolute inset-0 bg-red-900/10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(239, 68, 68, 0.1) 2px, rgba(239, 68, 68, 0.1) 4px)'
        }}></div>
      )}
      
      {/* Now line */}
      {isNow && (
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-usgc-accent border-dashed"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {/* Teams */}
        <div className="font-semibold text-sm leading-tight">
          {homeTeam} vs {awayTeam}
        </div>
        
        {/* Competition and note */}
        {(competition || note) && (
          <div className="text-xs text-usgc-muted mt-1 leading-tight">
            {competition}
            {competition && note && ' • '}
            {note}
          </div>
        )}
        
        {/* Status badge */}
        <div className="mt-1">
          <span className={`inline-block px-1 py-0.5 text-xs font-mono ${
            status === 'CONFIRMED' ? 'bg-usgc-success/20 text-usgc-success' :
            status === 'CANCELLED' ? 'bg-usgc-error/20 text-usgc-error' :
            'bg-usgc-warning/20 text-usgc-warning'
          }`}>
            {status}
          </span>
        </div>
        
        {/* Conflict badge */}
        {isConflict && (
          <div className="mt-1">
            <span className="inline-block px-1 py-0.5 text-xs font-mono bg-usgc-error/20 text-usgc-error">
              CONFLICT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
