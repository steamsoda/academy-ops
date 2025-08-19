'use client';
import { useState } from 'react';
import Panel98 from '@/components/ui98/Panel98';
import Toolbar98 from '@/components/ui98/Toolbar98';
import Button98 from '@/components/ui98/Button98';
import { TextInput98 } from '@/components/ui98/Input98';
import Table98 from '@/components/ui98/Table98';

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
    console.log('Exporting players:', selectedPlayers.length > 0 ? selectedPlayers : 'all');
  };

  const asOf = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const tableRows = filteredPlayers.map(player => [
    <input
      key={`checkbox-${player.id}`}
      type="checkbox"
      checked={selectedPlayers.includes(player.id)}
      onChange={() => handleSelectPlayer(player.id)}
    />,
    player.name,
    player.age.toString(),
    player.team,
    player.position,
    <span className={player.status === 'Active' ? 'status-confirmed' : 'status-cancelled'}>
      {player.status.toUpperCase()}
    </span>,
    new Date(player.registrationDate).toLocaleDateString(),
    <div style={{ display: 'flex', gap: 4 }}>
      <Button98 style={{ padding: '2px 6px', fontSize: '10px' }}>Edit</Button98>
      <Button98 style={{ padding: '2px 6px', fontSize: '10px' }}>Delete</Button98>
    </div>
  ]);

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
          <a href="/players" className="active">Players</a>
          <a href="/teams">Teams</a>
          <a href="/schedule">Schedule</a>
          <a href="/matches">Matches</a>
          <a href="/attendance">Attendance</a>
          <a href="/finance">Finance</a>
          <a href="/compliance">Compliance</a>
          <a href="/settings">Settings</a>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
          <Panel98 title="Players" subtitle="Manage academy players">
            <Toolbar98 meta={`last updated ${asOf} · ${filteredPlayers.length} of ${players.length} players`}>
              <TextInput98 
                placeholder="Filter players..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              {filter && (
                <Button98 onClick={() => setFilter('')}>Clear</Button98>
              )}
              {selectedPlayers.length > 0 && (
                <span style={{ fontSize: '11px', color: 'var(--98-text-muted)' }}>
                  {selectedPlayers.length} selected
                </span>
              )}
              <Button98>Add Player</Button98>
              <Button98 onClick={handleExport}>Export CSV</Button98>
            </Toolbar98>

            <Table98 
              head={['', 'Name', 'Age', 'Team', 'Position', 'Status', 'Registration', 'Actions']}
              rows={tableRows}
            />
          </Panel98>
        </div>
      </div>
    </div>
  );
}
