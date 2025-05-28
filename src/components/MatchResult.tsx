
import React from 'react';
import { Match, Player } from '../types/game';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface MatchResultProps {
  match: Match;
  player: Player;
  onContinue: () => void;
}

const MatchResult: React.FC<MatchResultProps> = ({ match, player, onContinue }) => {
  const isPlayerHome = match.homeTeam === 'Your Team';
  const playerScore = isPlayerHome ? match.homeScore : match.awayScore;
  const opponentScore = isPlayerHome ? match.awayScore : match.homeScore;
  
  const result = playerScore > opponentScore ? 'WIN' : 
                 playerScore < opponentScore ? 'LOSS' : 'DRAW';
  
  const resultColor = result === 'WIN' ? 'text-green-400' : 
                      result === 'LOSS' ? 'text-red-400' : 'text-yellow-400';

  return (
    <Card className="glass-card p-8 text-center space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Full Time</h2>
        <div className="text-4xl font-bold text-white mb-2">
          {match.homeScore} - {match.awayScore}
        </div>
        <div className="text-sm text-gray-400">
          {match.homeTeam} vs {match.awayTeam}
        </div>
      </div>
      
      <div className={`text-3xl font-bold ${resultColor} animate-glow-pulse`}>
        {result}
      </div>
      
      <div className="bg-black/30 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-white mb-3">Match Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Stamina Used:</span>
            <span className="text-white">20</span>
          </div>
          {player.position === 'Forward' && playerScore > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Goals Scored:</span>
              <span className="text-green-400">+{playerScore}</span>
            </div>
          )}
          {player.position === 'Midfielder' && playerScore > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Assists:</span>
              <span className="text-blue-400">+{Math.floor(playerScore / 2)}</span>
            </div>
          )}
          {player.position === 'Goalkeeper' && playerScore === 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Clean Sheet:</span>
              <span className="text-purple-400">+1</span>
            </div>
          )}
        </div>
      </div>
      
      <Button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black font-bold py-3 transition-all duration-300 transform hover:scale-105"
      >
        Continue
      </Button>
    </Card>
  );
};

export default MatchResult;
