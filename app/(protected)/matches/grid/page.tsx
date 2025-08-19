'use client';
import { useState, useEffect } from 'react';
import Panel98 from '@/components/ui98/Panel98';
import Toolbar98 from '@/components/ui98/Toolbar98';
import Button98 from '@/components/ui98/Button98';

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
        console.log('Edit cell:', fields[row], times[col]);
        break;
    }
  };

  const asOf = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--98-bg)' }}>
      {/* Navigation Bar */}
      <div className="bevel-raise" style={{ margin: 8, marginBottom: 0 }}>
        <div className="titlebar">
          Dragon Force Monterrey — Academy Operations
        </div>
        <div style={{ padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '11px', color: 'var(--98-text-muted)' }}>Last sync {asOf}</span>
            <span>Admin</span>
          </div>
          <a href="/dashboard" style={{ color: 'var(--98-link)' }}>Back to Dashboard</a>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Sidebar Navigation */}
        <div className="nav98" style={{ width: 200 }}>
          <a href="/dashboard">Dashboard</a>
          <a href="/players">Players</a>
          <a href="/teams">Teams</a>
          <a href="/schedule">Schedule</a>
          <a href="/matches" className="active">Matches</a>
          <a href="/attendance">Attendance</a>
          <a href="/finance">Finance</a>
          <a href="/compliance">Compliance</a>
          <a href="/settings">Settings</a>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
          <Panel98 title="Schedule Grid" subtitle="Field and time management">
            <Toolbar98 meta={`current time: ${currentTime} · 7 fields, 12 time slots · 3 scheduled events`}>
              <Button98>Add Event</Button98>
              <Button98>Export CSV</Button98>
            </Toolbar98>

            {/* Grid Container */}
            <div 
              className="bevel-sunken"
              style={{ marginTop: 8 }}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              {/* Time header */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', borderBottom: '1px solid var(--98-edge-dark)' }}>
                <div style={{ padding: 4, background: 'var(--98-panel)', fontWeight: 600, fontSize: '11px', borderRight: '1px solid var(--98-edge-dark)' }}>
                  Field
                </div>
                {times.map((time, index) => (
                  <div 
                    key={time} 
                    style={{ 
                      padding: 4, 
                      textAlign: 'center', 
                      fontSize: '11px', 
                      borderRight: '1px solid var(--98-edge-dark)',
                      background: index === getCurrentTimeColumn() ? 'var(--98-accent)' : 'var(--98-panel)',
                      color: index === getCurrentTimeColumn() ? 'white' : 'var(--98-text)'
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Grid rows */}
              {fields.map((field, rowIndex) => (
                <div key={field} style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 1fr)', borderBottom: '1px solid var(--98-edge-dark)' }}>
                  {/* Field name */}
                  <div style={{ 
                    padding: 4, 
                    background: 'var(--98-panel)', 
                    fontWeight: 600, 
                    fontSize: '11px', 
                    borderRight: '1px solid var(--98-edge-dark)',
                    position: 'sticky',
                    left: 0,
                    zIndex: 10
                  }}>
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
                        className={`grid-cell98 ${isNow ? 'now' : ''} ${isSelected ? 'bevel-raise' : ''}`}
                        style={{ 
                          borderRight: '1px solid var(--98-edge-dark)',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                      >
                        {data ? (
                          <>
                            <div style={{ fontWeight: 600, fontSize: '10px', lineHeight: 1.2 }}>
                              {data.homeTeam} vs {data.awayTeam}
                            </div>
                            {(data.competition || data.note) && (
                              <div style={{ fontSize: '9px', color: 'var(--98-text-muted)', marginTop: 1 }}>
                                {data.competition}
                                {data.competition && data.note && ' • '}
                                {data.note}
                              </div>
                            )}
                            <div style={{ marginTop: 2 }}>
                              <span className={`badge ${data.status === 'CONFIRMED' ? 'ok' : data.status === 'PENDING' ? 'warn' : 'danger'}`}>
                                {data.status}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div style={{ fontSize: '9px', color: 'var(--98-text-muted)' }}>—</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 8, display: 'flex', gap: 16, fontSize: '10px', color: 'var(--98-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="badge ok">CONFIRMED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="badge warn">PENDING</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="badge danger">CANCELLED</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 12, height: 12, borderLeft: '2px dashed var(--98-accent)' }}></div>
                <span>Current time</span>
              </div>
            </div>
          </Panel98>
        </div>
      </div>
    </div>
  );
}
