'use client';
import { useState } from 'react';
import DenseTable, { TableHeader, TableCell } from '@/components/dense-table';

export default function PlayersPage() {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [filter, setFilter] = useState('');
  
  const players = [
    { id: 1, name: 'Carlos Rodriguez', age: 12, team: 'U-12', position: 'Forward', status: 'Active', registrationDate: '2024-01-15' },
    { id: 2, name: 'Miguel Torres', age: 13, team: 'U-13', position: 'Midfielder', status: 'Active', registrationDate: '2024-01-10' },
    { id: 3, name: 'Diego Silva', age: 14, team: 'U-14', position: 'Defender', status: 'Active', registrationDate: '2024-01-05' },
    { id: 4, name: 'Luis Garcia', age: 12, team: 'U-12', position: 'Goalkeeper', status: 'Inactive', registrationDate: '2023-12-20' },
    { id: 5, name: 'Javier Morales', age: 15, team: 'U-15', position: 'Forward', status: 'Active', registrationDate: '2024-01-20' },
  ];

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(filter.toLowerCase()) ||
    player.team.toLowerCase().includes(filter.toLowerCase()) ||
    player.position.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedPlayers.length === filteredPlayers.length) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(filteredPlayers.map(p => p.id));
    }
  };

  const handleSelectPlayer = (playerId: number) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId) 
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleExport = () => {
    // Export functionality
    console.log('Exporting players:', selectedPlayers.length > 0 ? selectedPlayers : 'all');
  };

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className="min-h-screen bg-usgc-bg text-usgc-text">
      {/* Navigation Bar - Dense and functional */}
      <nav className="bg-usgc-panel border-b border-usgc-line px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-usgc-accent">Dragon Force Monterrey</h1>
            <span className="text-xs text-usgc-muted">Academy Operations</span>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-usgc-muted">Last sync {currentTime}</span>
            <span className="text-usgc-text">Admin</span>
            <a href="/dashboard" className="text-usgc-accent hover:underline focus-ring">
              Back to Dashboard
            </a>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation - Dense and functional */}
        <aside className="w-48 bg-usgc-panel border-r border-usgc-line min-h-screen p-3">
          <nav className="space-y-1">
            <a href="/dashboard" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Dashboard
            </a>
            <a href="/players" className="block px-3 py-2 bg-usgc-accent text-white text-sm">
              Players
            </a>
            <a href="/teams" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Teams
            </a>
            <a href="/schedule" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Schedule
            </a>
            <a href="/matches" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Matches
            </a>
            <a href="/attendance" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Attendance
            </a>
            <a href="/finance" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Finance
            </a>
            <a href="/compliance" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Compliance
            </a>
            <a href="/settings" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-usgc-bg">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold mb-2">Players</h1>
            <div className="flex items-center space-x-4 text-xs text-usgc-muted">
              <span>Data as of {currentTime}</span>
              <span>•</span>
              <span>{players.length} total players</span>
              <span>•</span>
              <span>{players.filter(p => p.status === 'Active').length} active</span>
            </div>
          </div>

          {/* Control Bar */}
          <div className="bg-usgc-panel border border-usgc-line mb-4">
            <div className="px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Filter players..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-usgc-bg border border-usgc-line px-2 py-1 text-sm font-mono focus-ring"
                />
                {filter && (
                  <button 
                    onClick={() => setFilter('')}
                    className="text-xs text-usgc-muted hover:text-usgc-text focus-ring"
                  >
                    Clear
                  </button>
                )}
                {selectedPlayers.length > 0 && (
                  <span className="text-xs text-usgc-muted">
                    {selectedPlayers.length} selected
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-usgc-accent hover:underline focus-ring">
                  Add Player
                </button>
                <button 
                  onClick={handleExport}
                  className="text-xs text-usgc-accent hover:underline focus-ring"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Players Table */}
          <DenseTable
            title="Player Roster"
            rowCount={players.length}
            filteredCount={filteredPlayers.length}
            lastUpdated={currentTime}
            onExport={handleExport}
          >
            <thead>
              <tr>
                <TableHeader className="w-8">
                  <input
                    type="checkbox"
                    checked={selectedPlayers.length === filteredPlayers.length && filteredPlayers.length > 0}
                    onChange={handleSelectAll}
                    className="focus-ring"
                  />
                </TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader numeric>Age</TableHeader>
                <TableHeader>Team</TableHeader>
                <TableHeader>Position</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Registration</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-usgc-line/50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedPlayers.includes(player.id)}
                      onChange={() => handleSelectPlayer(player.id)}
                      className="focus-ring"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell numeric>{player.age}</TableCell>
                  <TableCell>{player.team}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell>
                    <span className={`inline-block px-1 py-0.5 text-xs font-mono ${
                      player.status === 'Active' 
                        ? 'bg-usgc-success/20 text-usgc-success' 
                        : 'bg-usgc-error/20 text-usgc-error'
                    }`}>
                      {player.status.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {new Date(player.registrationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button className="text-xs text-usgc-accent hover:underline focus-ring">
                        Edit
                      </button>
                      <button className="text-xs text-usgc-error hover:underline focus-ring">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </DenseTable>
        </main>
      </div>
    </div>
  );
}
