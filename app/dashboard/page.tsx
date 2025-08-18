'use client';
import { signOut } from 'next-auth/react';

export default function Dashboard(){
  return (
    <div className="min-h-screen bg-[#0b0e14] text-white">
      {/* Navigation Bar */}
      <nav className="bg-[#0f1320] border-b border-[#1b2233] p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-[#003399]">Dragon Force Monterrey</h1>
            <span className="text-sm text-gray-400">Academy Operations</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, Admin</span>
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#0f1320] border-r border-[#1b2233] min-h-screen p-4 shadow-lg">
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-3 bg-[#003399] text-white rounded-lg shadow-md">
              📊 Dashboard
            </a>
            <a href="/players" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              👥 Players
            </a>
            <a href="/teams" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              ⚽ Teams
            </a>
            <a href="/schedule" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              📅 Schedule
            </a>
            <a href="/matches" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              🏆 Matches
            </a>
            <a href="/attendance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              ✅ Attendance
            </a>
            <a href="/finance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              💰 Finance
            </a>
            <a href="/compliance" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              📋 Compliance
            </a>
            <a href="/settings" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors duration-200">
              ⚙️ Settings
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#0b0e14]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
              <p className="text-gray-400 text-lg">Welcome to Dragon Force Monterrey Academy Operations</p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2 font-medium">Active Players</p>
                    <p className="text-4xl font-bold text-white">127</p>
                  </div>
                  <div className="text-3xl">👥</div>
                </div>
                <div className="mt-4 text-sm text-green-400 font-medium">↗ +12 this month</div>
              </div>

              <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2 font-medium">Attendance Rate</p>
                    <p className="text-4xl font-bold text-white">94%</p>
                  </div>
                  <div className="text-3xl">📈</div>
                </div>
                <div className="mt-4 text-sm text-green-400 font-medium">↗ +3% vs last week</div>
              </div>

              <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 hover:border-[#003399] transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-2 font-medium">Matches This Week</p>
                    <p className="text-4xl font-bold text-white">8</p>
                  </div>
                  <div className="text-3xl">⚽</div>
                </div>
                <div className="mt-4 text-sm text-blue-400 font-medium">3 wins, 2 draws, 3 losses</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-[#1b2233] rounded-lg hover:bg-[#2a3441] transition-colors duration-200">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 flex-1">New player registration: Carlos Rodriguez (U-12)</span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-[#1b2233] rounded-lg hover:bg-[#2a3441] transition-colors duration-200">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 flex-1">Match scheduled: U-14 vs Tigres Academy</span>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-[#1b2233] rounded-lg hover:bg-[#2a3441] transition-colors duration-200">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-300 flex-1">Payment received: Monthly fee - $150</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-[#1b2233] rounded-lg hover:bg-[#2a3441] transition-colors duration-200">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300 flex-1">Training session completed: U-13 Technical Skills</span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
