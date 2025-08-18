import React from 'react';

interface DenseTableProps {
  children: React.ReactNode;
  title?: string;
  rowCount?: number;
  filteredCount?: number;
  lastUpdated?: string;
  onExport?: () => void;
  className?: string;
}

export default function DenseTable({ 
  children, 
  title,
  rowCount,
  filteredCount,
  lastUpdated,
  onExport,
  className = '' 
}: DenseTableProps) {
  return (
    <div className={`border border-usgc-line ${className}`}>
      {/* Control bar */}
      {(title || rowCount !== undefined || lastUpdated || onExport) && (
        <div className="bg-usgc-panel border-b border-usgc-line px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            {title && <span className="font-medium">{title}</span>}
            {rowCount !== undefined && (
              <span className="text-usgc-muted">
                {filteredCount !== undefined && filteredCount !== rowCount 
                  ? `${filteredCount} of ${rowCount} rows`
                  : `${rowCount} rows`
                }
              </span>
            )}
            {lastUpdated && (
              <span className="text-usgc-muted">Last updated {lastUpdated}</span>
            )}
          </div>
          
          {onExport && (
            <button 
              onClick={onExport}
              className="text-usgc-accent hover:underline focus-ring px-2 py-1"
            >
              Export CSV
            </button>
          )}
        </div>
      )}
      
      {/* Table container */}
      <div className="overflow-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    </div>
  );
}

// Helper component for table headers
export function TableHeader({ children, className = '', numeric = false, ...props }: React.ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th 
      className={`bg-usgc-panel font-medium border-b border-usgc-line sticky top-0 z-10 ${
        numeric ? 'text-right' : 'text-left'
      } ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

// Helper component for table cells
export function TableCell({ children, className = '', numeric = false, ...props }: React.TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td 
      className={`border-b border-usgc-line ${numeric ? 'text-right font-mono' : 'text-left'} ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
