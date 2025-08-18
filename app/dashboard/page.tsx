'use client';
import { signOut } from 'next-auth/react';

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-[#0b0e14]">
      {/* Navigation Bar */}
      <nav className="bg-[#0f1320] border-b border-[#1b2233] p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-[#003399]">Dragon Force Monterrey</h1>
            <span className="text-sm text-gray-400">Academy Operations</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, Admin</span>
            <button 
              onClick={() => signOut()}
              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-[#0f1320] border-r border-[#1b2233] min-h-screen p-4">
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-3 bg-[#003399] text-white rounded-lg">
              📊 Dashboard
            </a>
            <a href="/players" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              👥 Players
            </a>
            <a href="/teams" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              ⚽ Teams
            </a>
            <a href="/schedule" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              📅 Schedule
            </a>
            <a href="/matches" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              🏆 Matches
            </a>
            <a href="/attendance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              ✅ Attendance
            </a>
            <a href="/finance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              💰 Finance
            </a>
            <a href="/compliance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              📋 Compliance
            </a>
            <a href="/settings" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              ⚙️ Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Welcome to Dragon Force Monterrey Academy Operations</p>
          </div>

          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Active Players</p>
                  <p className="text-3xl font-bold text-white">127</p>
                </div>
                <div className="text-2xl">👥</div>
              </div>
              <div className="mt-4 text-sm text-green-400">↗ +12 this month</div>
            </div>

            <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Attendance Rate</p>
                  <p className="text-3xl font-bold text-white">94%</p>
                </div>
                <div className="text-2xl">📈</div>
              </div>
              <div className="mt-4 text-sm text-green-400">↗ +3% vs last week</div>
            </div>

            <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Matches This Week</p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <div className="text-2xl">⚽</div>
              </div>
              <div className="mt-4 text-sm text-blue-400">3 wins, 2 draws, 3 losses</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-[#1b2233] rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">New player registration: Carlos Rodriguez (U-12)</span>
                <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-[#1b2233] rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Match scheduled: U-14 vs Tigres Academy</span>
                <span className="text-sm text-gray-500 ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-[#1b2233] rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Payment received: Monthly fee - $150</span>
                <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
