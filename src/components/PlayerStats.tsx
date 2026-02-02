
import React from 'react';
import { Player, PlayerPosition } from '../types/game';
import StatBar from './StatBar';
import { Card } from './ui/card';

interface PlayerStatsProps {
  player: Player;
}

const getPositionStats = (player: Player) => {
  switch (player.position) {
    case 'Forward':
      return [
        { key: 'finishing', label: 'Finishing', value: player.stats.finishing },
        { key: 'speed', label: 'Speed', value: player.stats.speed },
        { key: 'dribbling', label: 'Dribbling', value: player.stats.dribbling },
      ];
    case 'Midfielder':
      return [
        { key: 'vision', label: 'Vision', value: player.stats.vision },
        { key: 'passing', label: 'Passing', value: player.stats.passing },
        { key: 'interception', label: 'Interception', value: player.stats.interception },
      ];
    case 'Defender':
      return [
        { key: 'tackling', label: 'Tackling', value: player.stats.tackling },
        { key: 'clearance', label: 'Clearance', value: player.stats.clearance },
        { key: 'longPasses', label: 'Long Passes', value: player.stats.longPasses },
      ];
    case 'Goalkeeper':
      return [
        { key: 'jumping', label: 'Jumping', value: player.stats.jumping },
        { key: 'reflex', label: 'Reflex', value: player.stats.reflex },
        { key: 'parrying', label: 'Parrying', value: player.stats.parrying },
      ];
    default:
      return [];
  }
};

const getPositionColor = (position: PlayerPosition): string => {
  switch (position) {
    case 'Forward': return 'from-red-500 to-orange-500';
    case 'Midfielder': return 'from-blue-500 to-cyan-500';
    case 'Defender': return 'from-green-500 to-emerald-500';
    case 'Goalkeeper': return 'from-purple-500 to-pink-500';
    default: return 'from-primary to-accent';
  }
};

const PlayerStats: React.FC<PlayerStatsProps> = ({ player }) => {
  const positionStats = getPositionStats(player);
  const positionColor = getPositionColor(player.position);

  return (
    <div className="space-y-4">
      {/* Player Header */}
      <Card className="glass-card p-6">
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 bg-gradient-to-r ${positionColor} rounded-full flex items-center justify-center`}>
            <span className="text-2xl font-bold text-white">
              {player.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{player.name}</h2>
            <p className="text-gray-400">{player.position}</p>
            <div className="flex space-x-4 text-sm text-gray-300 mt-1">
              <span>Matches: {player.matchesPlayed}</span>
              {player.position === 'Forward' && <span>Goals: {player.goals}</span>}
              {player.position === 'Midfielder' && <span>Assists: {player.assists}</span>}
              {(player.position === 'Goalkeeper' || player.position === 'Defender') && (
                <span>Clean Sheets: {player.cleanSheets}</span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Position Stats */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Position Stats</h3>
        <div className="space-y-4">
          {positionStats.map((stat) => (
            <StatBar
              key={stat.key}
              label={stat.label}
              value={stat.value}
              color={positionColor}
            />
          ))}
        </div>
      </Card>

      {/* Universal Stats */}
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Condition</h3>
        <div className="space-y-4">
          <StatBar
            label="Stamina"
            value={player.stats.stamina}
            color="from-yellow-400 to-orange-500"
          />
          <StatBar
            label="Reputation"
            value={player.stats.reputation}
            color="from-purple-400 to-pink-500"
          />
        </div>
      </Card>
    </div>
  );
};

export default PlayerStats;
