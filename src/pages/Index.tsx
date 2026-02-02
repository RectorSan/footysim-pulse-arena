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
import CareerManagement from '../components/CareerManagement';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Index = () => {
  const { gameState, createPlayer, playMatch, resolveMatchEvent, train, rest, manageCareer } = useGameState();

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
                    <div className="text-lg text-primary font-semibold">
                      Playing for: {gameState.playerTeam}
                    </div>
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
                          Final Position: {gameState.season.leagueTable.findIndex(t => t.team === gameState.playerTeam) + 1}
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
                      currentEventIndex={gameState.currentEventIndex}
                      totalEvents={gameState.lastMatchEvents.length}
                      onChoice={resolveMatchEvent}
                    />
                  ))}
                  
                  {/* Show completed events */}
                  {gameState.lastMatchEvents.filter(e => e.resolved).length > 0 && (
                    <Card className="glass-card p-4">
                      <h4 className="text-white font-semibold mb-2">Previous Decisions:</h4>
                      <div className="space-y-2">
                        {gameState.lastMatchEvents.map((event, index) => 
                          event.resolved ? (
                            <div key={event.id} className="text-sm text-gray-400">
                              Decision {index + 1}: {event.success ? '✅ Success' : '❌ Failed'}
                            </div>
                          ) : null
                        )}
                      </div>
                    </Card>
                  )}
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

              <CareerManagement
                career={gameState.career}
                player={gameState.player}
                onAction={manageCareer}
              />

              <LeagueTable leagueTable={gameState.season.leagueTable} playerTeam={gameState.playerTeam} />
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
