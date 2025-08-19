'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import Panel98 from '@/components/ui98/Panel98';
import Kpi98 from '@/components/ui98/Kpi98';
import Toolbar98 from '@/components/ui98/Toolbar98';
import Button98 from '@/components/ui98/Button98';
import { TextInput98 } from '@/components/ui98/Input98';
import Table98 from '@/components/ui98/Table98';
import ThemeToggle98 from '@/components/ui98/ThemeToggle98';

interface DashboardData {
  kpis: {
    activePlayers: { value: number; delta: number; label: string };
    attendanceRate: { value: string; delta: string; label: string };
    matchesThisPeriod: { value: number; delta: number; label: string };
    revenueThisPeriod: { value: string; delta: string; label: string };
  };
  recentActivity: {
    matches: Array<{
      id: string;
      date: string;
      time: string;
      homeTeam: string;
      awayTeam: string;
      field: string;
      status: string;
      competition: string;
    }>;
    payments: Array<{
      id: string;
      date: string;
      player: string;
      amount: number;
      description: string;
    }>;
  };
  period: string;
  lastUpdated: string;
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const asOf = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/reports/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Network error while fetching dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create recent activity table data
  const getRecentActivityRows = () => {
    if (!dashboardData) return [];

    const activities = [
      ...dashboardData.recentActivity.matches.map(match => [
        new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'Match Scheduled',
        `${match.homeTeam} vs ${match.awayTeam}`,
        <span className={`badge ${match.status === 'CONFIRMED' ? 'ok' : 'warn'}`}>
          {match.status.toUpperCase()}
        </span>
      ]),
      ...dashboardData.recentActivity.payments.map(payment => [
        new Date(payment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'Payment Received',
        `${payment.player} - ${payment.description}`,
        <span className="badge ok">COMPLETE</span>
      ])
    ];

    // Sort by time and take the most recent 4
    return activities
      .sort((a, b) => new Date(b[0] as string).getTime() - new Date(a[0] as string).getTime())
      .slice(0, 4);
  };

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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ThemeToggle98 />
              <Button98 onClick={() => signOut()}>Sign Out</Button98>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
          <div className="nav98" style={{ width: 200 }}>
            <a href="/dashboard" className="active">Dashboard</a>
            <a href="/players">Players</a>
            <a href="/teams">Teams</a>
            <a href="/schedule">Schedule</a>
            <a href="/matches">Matches</a>
            <a href="/attendance">Attendance</a>
            <a href="/finance">Finance</a>
            <a href="/compliance">Compliance</a>
            <a href="/settings">Settings</a>
          </div>
          <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
            <Panel98 title="Dashboard" subtitle="Loading data...">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Loading dashboard data...
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ThemeToggle98 />
              <Button98 onClick={() => signOut()}>Sign Out</Button98>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
          <div className="nav98" style={{ width: 200 }}>
            <a href="/dashboard" className="active">Dashboard</a>
            <a href="/players">Players</a>
            <a href="/teams">Teams</a>
            <a href="/schedule">Schedule</a>
            <a href="/matches">Matches</a>
            <a href="/attendance">Attendance</a>
            <a href="/finance">Finance</a>
            <a href="/compliance">Compliance</a>
            <a href="/settings">Settings</a>
          </div>
          <div style={{ flex: 1, padding: 8, overflow: 'auto' }}>
            <Panel98 title="Dashboard" subtitle="Error loading data">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ color: 'var(--98-danger)', marginBottom: '10px' }}>Error: {error}</div>
                <Button98 onClick={fetchDashboardData}>Retry</Button98>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThemeToggle98 />
            <Button98 onClick={() => signOut()}>Sign Out</Button98>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Sidebar Navigation */}
        <div className="nav98" style={{ width: 200 }}>
          <a href="/dashboard" className="active">Dashboard</a>
          <a href="/players">Players</a>
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
          <Panel98 title="Dashboard" subtitle="Operations overview">
            <Toolbar98 meta={`last updated ${asOf} · filters: none · rows: ${getRecentActivityRows().length}`}>
              <TextInput98 placeholder="Search…" />
              <Button98>Export CSV</Button98>
            </Toolbar98>

            {dashboardData && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, marginBottom: 16 }}>
                  <Kpi98 
                    label={dashboardData.kpis.activePlayers.label} 
                    value={dashboardData.kpis.activePlayers.value} 
                    delta={`+${dashboardData.kpis.activePlayers.delta}`} 
                    asOf={asOf} 
                  />
                  <Kpi98 
                    label={dashboardData.kpis.attendanceRate.label} 
                    value={dashboardData.kpis.attendanceRate.value} 
                    delta={dashboardData.kpis.attendanceRate.delta} 
                    asOf={asOf} 
                  />
                  <Kpi98 
                    label={dashboardData.kpis.matchesThisPeriod.label} 
                    value={dashboardData.kpis.matchesThisPeriod.value} 
                    asOf={asOf} 
                  />
                  <Kpi98 
                    label={dashboardData.kpis.revenueThisPeriod.label} 
                    value={dashboardData.kpis.revenueThisPeriod.value} 
                    delta={dashboardData.kpis.revenueThisPeriod.delta} 
                    asOf={asOf} 
                  />
                </div>

                <div style={{ marginTop: 16 }}>
                  <div style={{ marginBottom: 8, fontSize: '14px', fontWeight: 600 }}>Recent Activity</div>
                  <Table98 
                    head={['Time', 'Event', 'Details', 'Status']}
                    rows={getRecentActivityRows()}
                  />
                </div>
              </>
            )}
          </Panel98>
        </div>
      </div>
    </div>
  );
}
