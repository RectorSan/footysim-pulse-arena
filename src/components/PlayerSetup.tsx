
import React, { useState } from 'react';
import { PlayerPosition } from '../types/game';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface PlayerSetupProps {
  onCreatePlayer: (name: string, position: PlayerPosition) => void;
}

const positions: { value: PlayerPosition; label: string; description: string; color: string }[] = [
  { 
    value: 'Forward', 
    label: 'Forward', 
    description: 'Score goals and create chances',
    color: 'from-red-500 to-orange-500'
  },
  { 
    value: 'Midfielder', 
    label: 'Midfielder', 
    description: 'Control the game and dictate play',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    value: 'Defender', 
    label: 'Defender', 
    description: 'Protect the goal and clear danger',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    value: 'Goalkeeper', 
    label: 'Goalkeeper', 
    description: 'Last line of defense',
    color: 'from-purple-500 to-pink-500'
  }
];

const PlayerSetup: React.FC<PlayerSetupProps> = ({ onCreatePlayer }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<PlayerPosition | null>(null);

  const handleSubmit = () => {
    if (playerName.trim() && selectedPosition) {
      onCreatePlayer(playerName.trim(), selectedPosition);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-dark via-game-darker to-game-dark flex items-center justify-center p-4">
      <Card className="glass-card p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Your Player
          </h1>
          <p className="text-gray-400">Start your football career journey</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Player Name
            </label>
            <Input
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your player name"
              className="bg-black/30 border-white/20 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Choose Your Position
            </label>
            <div className="grid grid-cols-2 gap-3">
              {positions.map((position) => (
                <button
                  key={position.value}
                  onClick={() => setSelectedPosition(position.value)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedPosition === position.value
                      ? 'border-primary shadow-lg shadow-primary/30 animate-glow-pulse'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className={`h-12 w-12 mx-auto mb-2 bg-gradient-to-r ${position.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold">
                      {position.label.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium text-white text-sm">{position.label}</h3>
                  <p className="text-xs text-gray-400 mt-1">{position.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!playerName.trim() || !selectedPosition}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Start Career
        </Button>
      </Card>
    </div>
  );
};

export default PlayerSetup;
