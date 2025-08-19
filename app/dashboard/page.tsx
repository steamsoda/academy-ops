'use client';
import { signOut } from 'next-auth/react';
import Panel98 from '@/components/ui98/Panel98';
import Kpi98 from '@/components/ui98/Kpi98';
import Toolbar98 from '@/components/ui98/Toolbar98';
import Button98 from '@/components/ui98/Button98';
import { TextInput98 } from '@/components/ui98/Input98';
import Table98 from '@/components/ui98/Table98';
import ThemeToggle98 from '@/components/ui98/ThemeToggle98';

export default function Dashboard() {
  const asOf = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const recentActivity = [
    ['14:32', 'Player Registration', 'Carlos Rodriguez (U-12)', <span className="badge ok">COMPLETE</span>],
    ['12:15', 'Match Scheduled', 'U-14 vs Tigres Academy', <span className="badge warn">PENDING</span>],
    ['09:42', 'Payment Received', 'Monthly fee - $150', <span className="badge ok">COMPLETE</span>],
    ['08:30', 'Training Session', 'U-13 Technical Skills', <span className="badge ok">COMPLETE</span>],
  ];

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
            <Toolbar98 meta={`last updated ${asOf} · filters: none · rows: 4`}>
              <TextInput98 placeholder="Search…" />
              <Button98>Export CSV</Button98>
            </Toolbar98>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 8, marginBottom: 16 }}>
              <Kpi98 label="Active players" value="127" delta="+12" asOf={asOf} />
              <Kpi98 label="Attendance rate" value="94%" delta="+3%" asOf={asOf} />
              <Kpi98 label="Matches this week" value="8" asOf={asOf} />
              <Kpi98 label="Revenue this month" value="45,000 MXN" delta="+5,200" asOf={asOf} />
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ marginBottom: 8, fontSize: '14px', fontWeight: 600 }}>Recent Activity</div>
              <Table98 
                head={['Time', 'Event', 'Details', 'Status']}
                rows={recentActivity}
              />
            </div>
          </Panel98>
        </div>
      </div>
    </div>
  );
}
