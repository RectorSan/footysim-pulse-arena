
import { useState, useCallback } from 'react';
import { GameState, Player, PlayerPosition, PlayerStats, Season, Match, TeamRecord, GameEvent } from '../types/game';
import { getEventsForPosition } from '../data/gameEvents';

const TEAM_NAMES = [
  'Arsenal', 'Chelsea', 'Liverpool', 'Manchester City', 'Manchester United',
  'Tottenham', 'Brighton', 'Newcastle', 'Aston Villa', 'West Ham',
  'Crystal Palace', 'Fulham', 'Brentford', 'Wolves', 'Everton',
  'Nottingham Forest', 'Bournemouth', 'Sheffield United', 'Burnley', 'Luton Town'
];

const createInitialStats = (position: PlayerPosition): PlayerStats => {
  const baseStats = {
    finishing: 50, speed: 50, dribbling: 50,
    vision: 50, passing: 50, interception: 50,
    tackling: 50, clearance: 50, longPasses: 50,
    jumping: 50, reflex: 50, parrying: 50,
    stamina: 100, reputation: 50
  };

  // Boost position-specific stats
  switch (position) {
    case 'Forward':
      return { ...baseStats, finishing: 65, speed: 60, dribbling: 60 };
    case 'Midfielder':
      return { ...baseStats, vision: 65, passing: 65, interception: 60 };
    case 'Defender':
      return { ...baseStats, tackling: 65, clearance: 65, longPasses: 60 };
    case 'Goalkeeper':
      return { ...baseStats, jumping: 65, reflex: 65, parrying: 65 };
    default:
      return baseStats;
  }
};

const createSeason = (): Season => {
  const matches: Match[] = [];
  const playerTeam = 'Your Team';
  
  // Create 20 matches for the season
  for (let i = 0; i < 20; i++) {
    const opponent = TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)];
    const isHome = Math.random() > 0.5;
    
    matches.push({
      id: i + 1,
      opponent,
      homeTeam: isHome ? playerTeam : opponent,
      awayTeam: isHome ? opponent : playerTeam,
      homeScore: 0,
      awayScore: 0,
      isPlayerMatch: true,
      completed: false
    });
  }

  // Create league table
  const leagueTable: TeamRecord[] = [playerTeam, ...TEAM_NAMES].map(team => ({
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0
  }));

  return {
    currentMatch: 0,
    matches,
    leagueTable
  };
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: null,
    season: createSeason(),
    canTrain: false,
    gamePhase: 'setup',
    lastMatchEvents: []
  });

  const createPlayer = useCallback((name: string, position: PlayerPosition) => {
    const player: Player = {
      name,
      position,
      stats: createInitialStats(position),
      matchesPlayed: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0
    };

    setGameState(prev => ({
      ...prev,
      player,
      gamePhase: 'season'
    }));
  }, []);

  const playMatch = useCallback(() => {
    if (!gameState.player || gameState.season.currentMatch >= 20) return;

    const currentMatch = gameState.season.matches[gameState.season.currentMatch];
    const positionEvents = getEventsForPosition(gameState.player.position);
    
    // Select 2 random events for this match
    const matchEvents = [];
    const usedEvents = new Set();
    
    while (matchEvents.length < 2) {
      const randomEvent = positionEvents[Math.floor(Math.random() * positionEvents.length)];
      if (!usedEvents.has(randomEvent.id)) {
        matchEvents.push(randomEvent);
        usedEvents.add(randomEvent.id);
      }
    }

    setGameState(prev => ({
      ...prev,
      gamePhase: 'match',
      lastMatchEvents: matchEvents
    }));
  }, [gameState.player, gameState.season.currentMatch]);

  const resolveMatchEvent = useCallback((eventIndex: number, choiceIndex: number) => {
    if (!gameState.player || !gameState.lastMatchEvents[eventIndex]) return;

    const event = gameState.lastMatchEvents[eventIndex];
    const player = gameState.player;
    
    // Get relevant stats based on position
    let stat1 = 50, stat2 = 50;
    switch (player.position) {
      case 'Forward':
        stat1 = player.stats.finishing;
        stat2 = player.stats.speed;
        break;
      case 'Midfielder':
        stat1 = player.stats.vision;
        stat2 = player.stats.passing;
        break;
      case 'Defender':
        stat1 = player.stats.tackling;
        stat2 = player.stats.clearance;
        break;
      case 'Goalkeeper':
        stat1 = player.stats.reflex;
        stat2 = player.stats.jumping;
        break;
    }

    const successRate = event.successRate(stat1, stat2);
    const isSuccess = Math.random() * 100 < successRate;
    
    // Store event result for match completion
    setGameState(prev => ({
      ...prev,
      lastMatchEvents: prev.lastMatchEvents.map((e, i) => 
        i === eventIndex ? { ...e, resolved: true, success: isSuccess } : e
      )
    }));

    // Check if all events are resolved
    const allEventsResolved = gameState.lastMatchEvents.every((e, i) => 
      i === eventIndex || (e as any).resolved
    );

    if (allEventsResolved) {
      completeMatch();
    }
  }, [gameState.player, gameState.lastMatchEvents]);

  const completeMatch = useCallback(() => {
    if (!gameState.player) return;

    const currentMatch = gameState.season.matches[gameState.season.currentMatch];
    
    // Calculate match result based on events and random factors
    const eventSuccesses = gameState.lastMatchEvents.filter((e: any) => e.success).length;
    const playerImpact = eventSuccesses * 0.5 + Math.random() * 0.5;
    
    // Generate scores
    let playerScore = Math.floor(Math.random() * 3 + playerImpact);
    let opponentScore = Math.floor(Math.random() * 3 + (1 - playerImpact));
    
    const isPlayerHome = currentMatch.homeTeam === 'Your Team';
    const finalHomeScore = isPlayerHome ? playerScore : opponentScore;
    const finalAwayScore = isPlayerHome ? opponentScore : playerScore;

    // Update match
    const updatedMatch = {
      ...currentMatch,
      homeScore: finalHomeScore,
      awayScore: finalAwayScore,
      completed: true
    };

    // Update player stats
    const updatedPlayer = {
      ...gameState.player,
      matchesPlayed: gameState.player.matchesPlayed + 1,
      stats: {
        ...gameState.player.stats,
        stamina: Math.max(0, gameState.player.stats.stamina - 20)
      }
    };

    // Add goals/assists/clean sheets based on events and position
    if (gameState.player.position === 'Forward' && eventSuccesses > 0) {
      updatedPlayer.goals += eventSuccesses;
    } else if (gameState.player.position === 'Midfielder' && eventSuccesses > 0) {
      updatedPlayer.assists += Math.floor(eventSuccesses / 2);
    } else if (gameState.player.position === 'Goalkeeper' && playerScore === 0) {
      updatedPlayer.cleanSheets += 1;
    }

    // Update league table
    const updatedTable = gameState.season.leagueTable.map(record => {
      if (record.team === 'Your Team') {
        const result = playerScore > opponentScore ? 'win' : 
                      playerScore < opponentScore ? 'loss' : 'draw';
        
        return {
          ...record,
          played: record.played + 1,
          won: record.won + (result === 'win' ? 1 : 0),
          drawn: record.drawn + (result === 'draw' ? 1 : 0),
          lost: record.lost + (result === 'loss' ? 1 : 0),
          goalsFor: record.goalsFor + playerScore,
          goalsAgainst: record.goalsAgainst + opponentScore,
          goalDifference: record.goalDifference + (playerScore - opponentScore),
          points: record.points + (result === 'win' ? 3 : result === 'draw' ? 1 : 0)
        };
      }
      return record;
    }).sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);

    setGameState(prev => ({
      ...prev,
      player: updatedPlayer,
      season: {
        ...prev.season,
        currentMatch: prev.season.currentMatch + 1,
        matches: prev.season.matches.map((m, i) => 
          i === prev.season.currentMatch ? updatedMatch : m
        ),
        leagueTable: updatedTable
      },
      canTrain: true,
      gamePhase: 'results'
    }));
  }, [gameState.player, gameState.season, gameState.lastMatchEvents]);

  const train = useCallback((statToImprove: keyof PlayerStats) => {
    if (!gameState.player || !gameState.canTrain) return;

    const updatedPlayer = {
      ...gameState.player,
      stats: {
        ...gameState.player.stats,
        [statToImprove]: Math.min(100, gameState.player.stats[statToImprove] + 5),
        stamina: Math.max(0, gameState.player.stats.stamina - 10)
      }
    };

    setGameState(prev => ({
      ...prev,
      player: updatedPlayer,
      canTrain: false,
      gamePhase: 'season'
    }));
  }, [gameState.player, gameState.canTrain]);

  const rest = useCallback(() => {
    if (!gameState.player || !gameState.canTrain) return;

    const updatedPlayer = {
      ...gameState.player,
      stats: {
        ...gameState.player.stats,
        stamina: Math.min(100, gameState.player.stats.stamina + 30)
      }
    };

    setGameState(prev => ({
      ...prev,
      player: updatedPlayer,
      canTrain: false,
      gamePhase: 'season'
    }));
  }, [gameState.player, gameState.canTrain]);

  return {
    gameState,
    createPlayer,
    playMatch,
    resolveMatchEvent,
    train,
    rest
  };
};
