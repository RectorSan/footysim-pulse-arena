
import React from 'react';
import { useGameState } from '../hooks/useGameState';
import PlayerSetup from '../components/PlayerSetup';
import PlayerStats from '../components/PlayerStats';
import MatchEvent from '../components/MatchEvent';
import MatchResult from '../components/MatchResult';
import TrainingOptions from '../components/TrainingOptions';
import LeagueTable from '../components/LeagueTable';
import MessageTicker from '../components/MessageTicker';
import TopBar from '../components/TopBar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Index = () => {
  const { gameState, createPlayer, playMatch, resolveMatchEvent, train, rest } = useGameState();

  const handlePlayMatch = () => {
    if (gameState.player && gameState.player.stats.stamina < 20) {
      alert('Not enough stamina to play! You need at least 20 stamina.');
      return;
    }
    playMatch();
  };

  if (gameState.gamePhase === 'setup') {
    return <PlayerSetup onCreatePlayer={createPlayer} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-dark via-game-darker to-game-dark">
      <TopBar />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <MessageTicker />
        
        {gameState.player && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {gameState.gamePhase === 'season' && (
                <Card className="glass-card p-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white">
                      Season Progress: {gameState.season.currentMatch}/20
                    </h2>
                    {gameState.season.currentMatch < 20 ? (
                      <div className="space-y-4">
                        <p className="text-gray-400">
                          Next Match: vs {gameState.season.matches[gameState.season.currentMatch]?.opponent}
                        </p>
                        <Button
                          onClick={handlePlayMatch}
                          disabled={gameState.player.stats.stamina < 20}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black font-bold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 animate-glow-pulse"
                        >
                          {gameState.player.stats.stamina < 20 ? 'Not Enough Stamina' : 'Play Match'}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold text-primary">Season Complete! 🏆</h3>
                        <p className="text-gray-400">
                          Final Position: {gameState.season.leagueTable.findIndex(t => t.team === 'Your Team') + 1}
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {gameState.gamePhase === 'match' && (
                <div className="space-y-6">
                  {gameState.lastMatchEvents.map((event, index) => (
                    <MatchEvent
                      key={event.id}
                      event={event}
                      eventIndex={index}
                      onChoice={resolveMatchEvent}
                      resolved={(event as any).resolved}
                    />
                  ))}
                </div>
              )}

              {gameState.gamePhase === 'results' && gameState.season.currentMatch > 0 && (
                <MatchResult
                  match={gameState.season.matches[gameState.season.currentMatch - 1]}
                  player={gameState.player}
                  onContinue={() => {}}
                />
              )}

              {gameState.gamePhase === 'results' && gameState.canTrain && (
                <TrainingOptions
                  player={gameState.player}
                  onTrain={train}
                  onRest={rest}
                />
              )}

              <LeagueTable leagueTable={gameState.season.leagueTable} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PlayerStats player={gameState.player} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
