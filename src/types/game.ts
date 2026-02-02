
export type PlayerPosition = 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';

export interface PlayerStats {
  // Forward stats
  finishing: number;
  speed: number;
  dribbling: number;
  
  // Midfielder stats
  vision: number;
  passing: number;
  interception: number;
  
  // Defender stats
  tackling: number;
  clearance: number;
  longPasses: number;
  
  // Goalkeeper stats
  jumping: number;
  reflex: number;
  parrying: number;
  
  // Universal stats
  stamina: number;
  reputation: number;
}

export interface Player {
  name: string;
  position: PlayerPosition;
  stats: PlayerStats;
  matchesPlayed: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  age: number;
  nationality: string;
}

export interface OpponentPlayer {
  name: string;
  position: PlayerPosition;
  stats: PlayerStats;
}

export interface OpponentTeam {
  name: string;
  players: OpponentPlayer[];
}

export interface GameEvent {
  id: string;
  description: string;
  choices: string[];
  successRate: (stat1: number, stat2?: number) => number;
  impact: {
    positive: number;
    negative: number;
  };
  resolved?: boolean;
  success?: boolean;
  choiceIndex?: number;
  impactValue?: number;
}

export interface Match {
  id: number;
  opponent: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isPlayerMatch: boolean;
  completed: boolean;
  opponentTeam?: OpponentTeam;
}

export interface Season {
  currentMatch: number;
  matches: Match[];
  leagueTable: TeamRecord[];
}

export interface TeamRecord {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface GameState {
  player: Player | null;
  playerTeam: string;
  season: Season;
  canTrain: boolean;
  gamePhase: 'setup' | 'season' | 'match' | 'training' | 'results';
  lastMatchEvents: GameEvent[];
  currentEventIndex: number;
  opponentTeams: OpponentTeam[];
  career: CareerState;
}

export interface CareerObjective {
  label: string;
  current: number;
  target: number;
  reward: number;
  completed: boolean;
}

export interface ContractDetails {
  weeklyWage: number;
  yearsRemaining: number;
  role: 'Prospect' | 'Rotation' | 'Starter' | 'Star';
  releaseClause: number;
}

export interface FinanceOverview {
  balance: number;
  endorsements: number;
  bonuses: number;
  expenses: number;
}

export interface CareerState {
  contract: ContractDetails;
  finances: FinanceOverview;
  marketValue: number;
  fanSupport: number;
  morale: number;
  objectives: CareerObjective[];
  transferInterest: 'Low' | 'Moderate' | 'High';
}

export type CareerAction = 'agentMeeting' | 'mediaDay' | 'sponsorship' | 'communityEvent';
