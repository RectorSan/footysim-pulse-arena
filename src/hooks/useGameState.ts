
import { useState, useCallback } from 'react';
import { GameState, Player, PlayerPosition, PlayerStats, Season, Match, TeamRecord, GameEvent, OpponentTeam, OpponentPlayer } from '../types/game';
import { getEventsForPosition } from '../data/gameEvents';

const TEAM_NAMES = [
  'Arsenal', 'Chelsea', 'Liverpool', 'Manchester City', 'Manchester United',
  'Tottenham', 'Brighton', 'Newcastle', 'Aston Villa', 'West Ham',
  'Crystal Palace', 'Fulham', 'Brentford', 'Wolves', 'Everton',
  'Nottingham Forest', 'Bournemouth', 'Sheffield United', 'Burnley', 'Luton Town'
];

const PLAYER_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson'
];

const createRandomStats = (position: PlayerPosition): PlayerStats => {
  const baseStats = {
    finishing: 40 + Math.random() * 40,
    speed: 40 + Math.random() * 40,
    dribbling: 40 + Math.random() * 40,
    vision: 40 + Math.random() * 40,
    passing: 40 + Math.random() * 40,
    interception: 40 + Math.random() * 40,
    tackling: 40 + Math.random() * 40,
    clearance: 40 + Math.random() * 40,
    longPasses: 40 + Math.random() * 40,
    jumping: 40 + Math.random() * 40,
    reflex: 40 + Math.random() * 40,
    parrying: 40 + Math.random() * 40,
    stamina: 100,
    reputation: 40 + Math.random() * 40
  };

  // Boost position-specific stats
  switch (position) {
    case 'Forward':
      baseStats.finishing += 20;
      baseStats.speed += 15;
      baseStats.dribbling += 15;
      break;
    case 'Midfielder':
      baseStats.vision += 20;
      baseStats.passing += 20;
      baseStats.interception += 15;
      break;
    case 'Defender':
      baseStats.tackling += 20;
      baseStats.clearance += 20;
      baseStats.longPasses += 15;
      break;
    case 'Goalkeeper':
      baseStats.jumping += 20;
      baseStats.reflex += 20;
      baseStats.parrying += 20;
      break;
  }

  return baseStats;
};

const createOpponentPlayer = (position: PlayerPosition): OpponentPlayer => {
  const randomName = PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)];
  return {
    name: randomName,
    position,
    stats: createRandomStats(position)
  };
};

const createOpponentTeam = (teamName: string): OpponentTeam => {
  return {
    name: teamName,
    players: [
      createOpponentPlayer('Forward'),
      createOpponentPlayer('Midfielder'),
      createOpponentPlayer('Defender'),
      createOpponentPlayer('Goalkeeper')
    ]
  };
};

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

const createSeason = (playerTeam: string, opponentTeams: OpponentTeam[]): Season => {
  const matches: Match[] = [];
  
  // Create 20 matches for the season
  for (let i = 0; i < 20; i++) {
    const opponentTeam = opponentTeams[Math.floor(Math.random() * opponentTeams.length)];
    const isHome = Math.random() > 0.5;
    
    matches.push({
      id: i + 1,
      opponent: opponentTeam.name,
      homeTeam: isHome ? playerTeam : opponentTeam.name,
      awayTeam: isHome ? opponentTeam.name : playerTeam,
      homeScore: 0,
      awayScore: 0,
      isPlayerMatch: true,
      completed: false,
      opponentTeam
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
    playerTeam: '',
    season: { currentMatch: 0, matches: [], leagueTable: [] },
    canTrain: false,
    gamePhase: 'setup',
    lastMatchEvents: [],
    currentEventIndex: 0,
    opponentTeams: []
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

    // Select a random team for the player
    const playerTeam = TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)];
    
    // Create opponent teams (exclude player's team)
    const availableTeams = TEAM_NAMES.filter(team => team !== playerTeam);
    const opponentTeams = availableTeams.map(teamName => createOpponentTeam(teamName));

    const season = createSeason(playerTeam, opponentTeams);

    setGameState(prev => ({
      ...prev,
      player,
      playerTeam,
      season,
      opponentTeams,
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
        matchEvents.push({ ...randomEvent, resolved: false });
        usedEvents.add(randomEvent.id);
      }
    }

    setGameState(prev => ({
      ...prev,
      gamePhase: 'match',
      lastMatchEvents: matchEvents,
      currentEventIndex: 0
    }));
  }, [gameState.player, gameState.season.currentMatch]);

  const resolveMatchEvent = useCallback((eventIndex: number, choiceIndex: number) => {
    if (!gameState.player || !gameState.lastMatchEvents[eventIndex]) return;

    const event = gameState.lastMatchEvents[eventIndex];
    const player = gameState.player;
    const currentMatch = gameState.season.matches[gameState.season.currentMatch];
    const opponentTeam = currentMatch.opponentTeam;
    
    if (!opponentTeam) return;

    // Get relevant stats based on position
    let playerStat1 = 50, playerStat2 = 50;
    let opponentStat1 = 50, opponentStat2 = 50;
    
    const opponentPlayer = opponentTeam.players.find(p => p.position === player.position) || opponentTeam.players[0];
    
    switch (player.position) {
      case 'Forward':
        playerStat1 = player.stats.finishing;
        playerStat2 = player.stats.speed;
        opponentStat1 = opponentPlayer.stats.tackling;
        opponentStat2 = opponentPlayer.stats.clearance;
        break;
      case 'Midfielder':
        playerStat1 = player.stats.vision;
        playerStat2 = player.stats.passing;
        opponentStat1 = opponentPlayer.stats.interception;
        opponentStat2 = opponentPlayer.stats.tackling;
        break;
      case 'Defender':
        playerStat1 = player.stats.tackling;
        playerStat2 = player.stats.clearance;
        opponentStat1 = opponentPlayer.stats.finishing;
        opponentStat2 = opponentPlayer.stats.speed;
        break;
      case 'Goalkeeper':
        playerStat1 = player.stats.reflex;
        playerStat2 = player.stats.jumping;
        opponentStat1 = opponentPlayer.stats.finishing;
        opponentStat2 = opponentPlayer.stats.speed;
        break;
    }

    // Calculate success rate based on player vs opponent stats
    const playerStrength = (playerStat1 + playerStat2) / 2;
    const opponentStrength = (opponentStat1 + opponentStat2) / 2;
    const successRate = Math.max(10, Math.min(90, 50 + (playerStrength - opponentStrength) * 0.5));
    
    const isSuccess = Math.random() * 100 < successRate;
    
    // Update the specific event
    setGameState(prev => ({
      ...prev,
      lastMatchEvents: prev.lastMatchEvents.map((e, i) => 
        i === eventIndex ? { ...e, resolved: true, success: isSuccess } : e
      ),
      currentEventIndex: prev.currentEventIndex + 1
    }));

    // Check if all events are resolved
    if (gameState.currentEventIndex + 1 >= gameState.lastMatchEvents.length) {
      setTimeout(() => completeMatch(), 1000);
    }
  }, [gameState.player, gameState.lastMatchEvents, gameState.season, gameState.currentEventIndex]);

  const completeMatch = useCallback(() => {
    if (!gameState.player) return;

    const currentMatch = gameState.season.matches[gameState.season.currentMatch];
    
    // Calculate match result based on events and random factors
    const eventSuccesses = gameState.lastMatchEvents.filter((e: any) => e.success).length;
    const playerImpact = eventSuccesses * 0.5 + Math.random() * 0.5;
    
    // Generate scores
    let playerScore = Math.floor(Math.random() * 3 + playerImpact);
    let opponentScore = Math.floor(Math.random() * 3 + (1 - playerImpact));
    
    const isPlayerHome = currentMatch.homeTeam === gameState.playerTeam;
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
      if (record.team === gameState.playerTeam) {
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
      gamePhase: 'results',
      currentEventIndex: 0
    }));
  }, [gameState.player, gameState.season, gameState.lastMatchEvents, gameState.playerTeam]);

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
