
import React from 'react';
import { Player, PlayerPosition, PlayerStats } from '../types/game';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TrainingOptionsProps {
  player: Player;
  onTrain: (stat: keyof PlayerStats) => void;
  onRest: () => void;
}

const getTrainableStats = (position: PlayerPosition): { key: keyof PlayerStats; label: string }[] => {
  switch (position) {
    case 'Forward':
      return [
        { key: 'finishing', label: 'Finishing' },
        { key: 'speed', label: 'Speed' },
        { key: 'dribbling', label: 'Dribbling' },
      ];
    case 'Midfielder':
      return [
        { key: 'vision', label: 'Vision' },
        { key: 'passing', label: 'Passing' },
        { key: 'interception', label: 'Interception' },
      ];
    case 'Defender':
      return [
        { key: 'tackling', label: 'Tackling' },
        { key: 'clearance', label: 'Clearance' },
        { key: 'longPasses', label: 'Long Passes' },
      ];
    case 'Goalkeeper':
      return [
        { key: 'jumping', label: 'Jumping' },
        { key: 'reflex', label: 'Reflex' },
        { key: 'parrying', label: 'Parrying' },
      ];
    default:
      return [];
  }
};

const TrainingOptions: React.FC<TrainingOptionsProps> = ({ player, onTrain, onRest }) => {
  const trainableStats = getTrainableStats(player.position);

  return (
    <Card className="glass-card p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Post-Match Recovery</h2>
        <p className="text-gray-400">Choose your next action to improve your player</p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Training (+5 stat, -10 stamina)</h3>
          <div className="grid grid-cols-1 gap-3">
            {trainableStats.map((stat) => (
              <Button
                key={stat.key}
                onClick={() => onTrain(stat.key)}
                disabled={player.stats[stat.key] >= 100}
                className="w-full bg-blue-600/20 border border-blue-400/30 hover:bg-blue-600/40 text-white transition-all duration-300"
                variant="outline"
              >
                Train {stat.label} ({player.stats[stat.key]}/100)
              </Button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h3 className="text-lg font-semibold text-white mb-3">Recovery</h3>
          <Button
            onClick={onRest}
            className="w-full bg-green-600/20 border border-green-400/30 hover:bg-green-600/40 text-white transition-all duration-300"
            variant="outline"
          >
            Rest & Recover (+30 stamina)
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TrainingOptions;
