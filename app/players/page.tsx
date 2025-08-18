export default function PlayersPage() {
  const players = [
    { id: 1, name: 'Carlos Rodriguez', age: 12, team: 'U-12', position: 'Forward', status: 'Active' },
    { id: 2, name: 'Miguel Torres', age: 13, team: 'U-13', position: 'Midfielder', status: 'Active' },
    { id: 3, name: 'Diego Silva', age: 14, team: 'U-14', position: 'Defender', status: 'Active' },
    { id: 4, name: 'Luis Garcia', age: 12, team: 'U-12', position: 'Goalkeeper', status: 'Inactive' },
    { id: 5, name: 'Javier Morales', age: 15, team: 'U-15', position: 'Forward', status: 'Active' },
  ];

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
            <a href="/dashboard" className="px-3 py-1 text-sm bg-[#003399] hover:bg-[#002266] rounded-lg transition-colors">
              Back to Dashboard
            </a>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-[#0f1320] border-r border-[#1b2233] min-h-screen p-4">
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-3 text-gray-300 hover:bg-[#1b2233] rounded-lg transition-colors">
              📊 Dashboard
            </a>
            <a href="/players" className="block p-3 bg-[#003399] text-white rounded-lg">
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
            <h1 className="text-3xl font-bold text-white mb-2">Players</h1>
            <p className="text-gray-400">Manage academy players and their information</p>
          </div>

          {/* Players Table */}
          <div className="bg-[#0f1320] border border-[#1b2233] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#1b2233]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Player Roster</h2>
                <button className="px-4 py-2 bg-[#003399] hover:bg-[#002266] text-white rounded-lg transition-colors">
                  + Add Player
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1b2233]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b2233]">
                  {players.map((player) => (
                    <tr key={player.id} className="hover:bg-[#1b2233] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{player.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.team}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{player.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          player.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button className="text-[#003399] hover:text-[#002266] mr-3">Edit</button>
                        <button className="text-red-400 hover:text-red-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
