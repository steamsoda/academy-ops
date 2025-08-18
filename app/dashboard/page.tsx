'use client';
import { signOut } from 'next-auth/react';
import KPI from '@/components/kpi';

export default function Dashboard() {
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
            <button 
              onClick={() => signOut()}
              className="text-usgc-error hover:underline focus-ring"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar Navigation - Dense and functional */}
        <aside className="w-48 bg-usgc-panel border-r border-usgc-line min-h-screen p-3">
          <nav className="space-y-1">
            <a href="/dashboard" className="block px-3 py-2 bg-usgc-accent text-white text-sm">
              Dashboard
            </a>
            <a href="/players" className="block px-3 py-2 text-usgc-text hover:bg-usgc-line text-sm transition-colors">
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
            <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
            <div className="flex items-center space-x-4 text-xs text-usgc-muted">
              <span>Data as of {currentTime}</span>
              <span>•</span>
              <span>127 active players</span>
              <span>•</span>
              <span>8 matches this week</span>
            </div>
          </div>

          {/* KPI Grid - Dense layout */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <KPI 
              label="Active Players"
              value={127}
              unit="players"
              delta={{ value: 12, isPositive: true }}
              asOf={currentTime}
              trend="up"
            />
            <KPI 
              label="Attendance Rate"
              value={94}
              unit="%"
              delta={{ value: 3, isPositive: true }}
              asOf={currentTime}
              trend="up"
            />
            <KPI 
              label="Matches This Week"
              value={8}
              unit="matches"
              asOf={currentTime}
            />
            <KPI 
              label="Revenue This Month"
              value={45000}
              unit="MXN"
              delta={{ value: 5200, isPositive: true }}
              asOf={currentTime}
              trend="up"
            />
          </div>

          {/* Recent Activity - Dense table format */}
          <div className="bg-usgc-panel border border-usgc-line">
            <div className="bg-usgc-panel border-b border-usgc-line px-4 py-2 flex items-center justify-between">
              <span className="font-medium text-sm">Recent Activity</span>
              <span className="text-xs text-usgc-muted">Last 24 hours</span>
            </div>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-medium">Time</th>
                    <th className="text-left px-4 py-2 text-xs font-medium">Event</th>
                    <th className="text-left px-4 py-2 text-xs font-medium">Details</th>
                    <th className="text-left px-4 py-2 text-xs font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-usgc-line/50">
                    <td className="px-4 py-2 text-xs font-mono">14:32</td>
                    <td className="px-4 py-2 text-sm">Player Registration</td>
                    <td className="px-4 py-2 text-sm">Carlos Rodriguez (U-12)</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-1 py-0.5 text-xs font-mono bg-usgc-success/20 text-usgc-success">
                        COMPLETE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-usgc-line/50">
                    <td className="px-4 py-2 text-xs font-mono">12:15</td>
                    <td className="px-4 py-2 text-sm">Match Scheduled</td>
                    <td className="px-4 py-2 text-sm">U-14 vs Tigres Academy</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-1 py-0.5 text-xs font-mono bg-usgc-info/20 text-usgc-info">
                        PENDING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-usgc-line/50">
                    <td className="px-4 py-2 text-xs font-mono">09:42</td>
                    <td className="px-4 py-2 text-sm">Payment Received</td>
                    <td className="px-4 py-2 text-sm">Monthly fee - $150</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-1 py-0.5 text-xs font-mono bg-usgc-success/20 text-usgc-success">
                        COMPLETE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-usgc-line/50">
                    <td className="px-4 py-2 text-xs font-mono">08:30</td>
                    <td className="px-4 py-2 text-sm">Training Session</td>
                    <td className="px-4 py-2 text-sm">U-13 Technical Skills</td>
                    <td className="px-4 py-2">
                      <span className="inline-block px-1 py-0.5 text-xs font-mono bg-usgc-success/20 text-usgc-success">
                        COMPLETE
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
