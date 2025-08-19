'use client';
import { useState, useEffect } from 'react';
import Panel98 from '@/components/ui98/Panel98';
import Toolbar98 from '@/components/ui98/Toolbar98';
import Button98 from '@/components/ui98/Button98';
import { TextInput98 } from '@/components/ui98/Input98';
import Table98 from '@/components/ui98/Table98';

interface Player {
  id: string;
  name: string;
  age: number;
  position: string | null;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'GRADUATED';
  registrationDate: string;
  Team?: {
    id: string;
    name: string;
    ageGroup: string;
    color: string;
  } | null;
  Parent?: {
    id: string;
    User: {
      name: string;
      email: string;
    };
  } | null;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const asOf = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Fetch players from API
  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/players');
      const result = await response.json();
      
      if (result.success) {
        setPlayers(result.data);
        setFilteredPlayers(result.data);
      } else {
        setError(result.error || 'Failed to fetch players');
      }
    } catch (err) {
      setError('Network error while fetching players');
      console.error('Error fetching players:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter players
  useEffect(() => {
    if (!filter.trim()) {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player =>
        player.name.toLowerCase().includes(filter.toLowerCase()) ||
        player.position?.toLowerCase().includes(filter.toLowerCase()) ||
        player.Team?.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  }, [filter, players]);

  const handleSelectPlayer = (playerId: string) => {
    setSelectedPlayers(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPlayers.length === filteredPlayers.length) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers(filteredPlayers.map(p => p.id));
    }
  };

  const handleDeletePlayer = async (playerId: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      
      if (result.success) {
        setPlayers(prev => prev.filter(p => p.id !== playerId));
        setSelectedPlayers(prev => prev.filter(id => id !== playerId));
      } else {
        alert(result.error || 'Failed to delete player');
      }
    } catch (err) {
      alert('Network error while deleting player');
      console.error('Error deleting player:', err);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Age', 'Position', 'Team', 'Status', 'Registration Date'],
      ...filteredPlayers.map(player => [
        player.name,
        player.age.toString(),
        player.position || '',
        player.Team?.name || '',
        player.status,
        new Date(player.registrationDate).toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `players-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tableRows = filteredPlayers.map(player => [
    <input
      key={`checkbox-${player.id}`}
      type="checkbox"
      checked={selectedPlayers.includes(player.id)}
      onChange={() => handleSelectPlayer(player.id)}
    />,
    player.name,
    player.age.toString(),
    player.Team?.name || '—',
    player.position || '—',
    <span className={player.status === 'ACTIVE' ? 'status-confirmed' : 'status-cancelled'}>
      {player.status.toUpperCase()}
    </span>,
    new Date(player.registrationDate).toLocaleDateString(),
    <div style={{ display: 'flex', gap: 4 }}>
      <Button98 style={{ padding: '2px 6px', fontSize: '10px' }}>Edit</Button98>
      <Button98 
        style={{ padding: '2px 6px', fontSize: '10px' }}
        onClick={() => handleDeletePlayer(player.id)}
      >
        Delete
      </Button98>
    </div>
  ]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--98-bg)' }}>
        <div className="bevel-raise" style={{ margin: 8, marginBottom: 0 }}>
          <div className="titlebar">
            Dragon Force Monterrey — Academy Operations
          </div>
          <div style={{ padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '11px', color: 'var(--98-text-muted)' }}>Loading...</span>
            </div>
            <a href="/dashboard" style={{ color: 'var(--98-link)' }}>Back to Dashboard</a>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
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
          <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
            <Panel98 title="Players" subtitle="Loading player data...">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Loading players...
              </div>
            </Panel98>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--98-bg)' }}>
        <div className="bevel-raise" style={{ margin: 8, marginBottom: 0 }}>
          <div className="titlebar">
            Dragon Force Monterrey — Academy Operations
          </div>
          <div style={{ padding: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '11px', color: 'var(--98-text-muted)' }}>Error</span>
            </div>
            <a href="/dashboard" style={{ color: 'var(--98-link)' }}>Back to Dashboard</a>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
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
          <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
            <Panel98 title="Players" subtitle="Error loading data">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ color: 'var(--98-danger)', marginBottom: '10px' }}>Error: {error}</div>
                <Button98 onClick={fetchPlayers}>Retry</Button98>
              </div>
            </Panel98>
          </div>
        </div>
      </div>
    );
  }

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
