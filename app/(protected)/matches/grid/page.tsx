'use client';
import { useState, useEffect } from 'react';
import GridCell from '@/components/grid-cell';

interface ScheduleData {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  note?: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
}

export default function Grid() {
  const fields = ['11v11', '7v7-1', '7v7-2', '5v5-1', '5v5-2', '3v3-A', '3v3-B'];
  const times = Array.from({ length: 12 }, (_, i) => `${String(9 + i).padStart(2, '0')}:00`);
  
  const [currentTime, setCurrentTime] = useState('');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  
  // Sample data for demonstration
  const scheduleData: Record<string, ScheduleData> = {
    '11v11-10:00': {
      homeTeam: 'U-16 Azul',
      awayTeam: 'Tigres Academy',
      competition: 'League Match',
      note: 'Home field',
      status: 'CONFIRMED'
    },
    '7v7-1-14:00': {
      homeTeam: 'U-12 Rojo',
      awayTeam: 'U-12 Verde',
      competition: 'Internal Scrimmage',
      status: 'PENDING'
    },
    '5v5-1-16:00': {
      homeTeam: 'U-14 Azul',
      awayTeam: 'U-14 Rojo',
      competition: 'Training Match',
      status: 'CONFIRMED'
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  const getCurrentTimeColumn = () => {
    const now = new Date();
    const hour = now.getHours();
    return Math.max(0, Math.min(11, hour - 9)); // 9 AM to 8 PM
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        setSelectedCell({ row, col: Math.max(0, col - 1) });
        break;
      case 'ArrowRight':
        e.preventDefault();
        setSelectedCell({ row, col: Math.min(11, col + 1) });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedCell({ row: Math.max(0, row - 1), col });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedCell({ row: Math.min(6, row + 1), col });
        break;
      case 'Enter':
        e.preventDefault();
        // Open side panel or edit dialog
        console.log('Edit cell:', fields[row], times[col]);
        break;
    }
  };

  return (
    <main className="p-4 bg-usgc-bg">
      {/* Header with metadata */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-2">Schedule Grid</h1>
        <div className="flex items-center space-x-4 text-xs text-usgc-muted">
          <span>Current time: {currentTime}</span>
          <span>•</span>
          <span>7 fields, 12 time slots</span>
          <span>•</span>
          <span>3 scheduled events</span>
          <span>•</span>
          <span>Use arrow keys to navigate, Enter to edit</span>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        className="border border-usgc-line bg-usgc-panel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Time header */}
        <div className="grid grid-cols-13 border-b border-usgc-line">
          <div className="p-2 bg-usgc-panel font-medium text-xs border-r border-usgc-line">
            Field
          </div>
          {times.map((time, index) => (
            <div 
              key={time} 
              className={`p-2 text-center font-mono text-xs border-r border-usgc-line ${
                index === getCurrentTimeColumn() ? 'bg-usgc-accent/20' : 'bg-usgc-panel'
              }`}
            >
              {time}
            </div>
          ))}
        </div>

        {/* Grid rows */}
        {fields.map((field, rowIndex) => (
          <div key={field} className="grid grid-cols-13 border-b border-usgc-line">
            {/* Field name */}
            <div className="p-2 bg-usgc-panel font-medium text-xs border-r border-usgc-line sticky left-0">
              {field}
            </div>
            
            {/* Time slots */}
            {times.map((time, colIndex) => {
              const cellKey = `${field}-${time}`;
              const data = scheduleData[cellKey];
              const isNow = colIndex === getCurrentTimeColumn();
              const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
              
              return (
                <div 
                  key={time}
                  className={`border-r border-usgc-line ${
                    isSelected ? 'ring-1 ring-usgc-accent' : ''
                  }`}
                >
                  <GridCell
                    homeTeam={data?.homeTeam}
                    awayTeam={data?.awayTeam}
                    competition={data?.competition}
                    note={data?.note}
                    status={data?.status}
                    isNow={isNow}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center space-x-6 text-xs text-usgc-muted">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-usgc-success/20 border border-usgc-success"></div>
          <span>CONFIRMED</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-usgc-warning/20 border border-usgc-warning"></div>
          <span>PENDING</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-usgc-error/20 border border-usgc-error"></div>
          <span>CANCELLED</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-l-2 border-dashed border-usgc-accent"></div>
          <span>Current time</span>
        </div>
      </div>
    </main>
  );
}
