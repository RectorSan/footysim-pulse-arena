
import React from 'react';
import { TeamRecord } from '../types/game';
import { Card } from './ui/card';

interface LeagueTableProps {
  leagueTable: TeamRecord[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueTable }) => {
  return (
    <Card className="glass-card p-6">
      <h2 className="text-xl font-bold text-white mb-4">League Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-2 text-gray-400">Pos</th>
              <th className="text-left py-2 text-gray-400">Team</th>
              <th className="text-center py-2 text-gray-400">P</th>
              <th className="text-center py-2 text-gray-400">W</th>
              <th className="text-center py-2 text-gray-400">D</th>
              <th className="text-center py-2 text-gray-400">L</th>
              <th className="text-center py-2 text-gray-400">GD</th>
              <th className="text-center py-2 text-gray-400">Pts</th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.slice(0, 10).map((team, index) => (
              <tr 
                key={team.team} 
                className={`border-b border-white/10 ${
                  team.team === 'Your Team' ? 'bg-primary/10 text-primary' : 'text-white'
                }`}
              >
                <td className="py-2 font-medium">{index + 1}</td>
                <td className="py-2 font-medium">{team.team}</td>
                <td className="text-center py-2">{team.played}</td>
                <td className="text-center py-2">{team.won}</td>
                <td className="text-center py-2">{team.drawn}</td>
                <td className="text-center py-2">{team.lost}</td>
                <td className="text-center py-2">{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}</td>
                <td className="text-center py-2 font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default LeagueTable;
