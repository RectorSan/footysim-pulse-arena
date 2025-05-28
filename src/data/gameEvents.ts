
import { GameEvent, PlayerPosition } from '../types/game';

export const forwardEvents: GameEvent[] = [
  {
    id: 'forward_1',
    description: "You're one-on-one with the goalkeeper. What do you do?",
    choices: ['Finesse shot to far corner', 'Power shot near post', 'Chip the keeper'],
    successRate: (finishing, speed) => Math.min(95, finishing * 0.8 + speed * 0.2),
    impact: { positive: 2, negative: -1 }
  },
  {
    id: 'forward_2',
    description: "A through ball reaches you in the box. Defender closing in fast!",
    choices: ['Quick shot', 'Dribble around defender', 'Pass to teammate'],
    successRate: (finishing, dribbling) => Math.min(90, finishing * 0.6 + dribbling * 0.4),
    impact: { positive: 2, negative: -1 }
  },
  {
    id: 'forward_3',
    description: "Cross coming in from the wing. Perfect heading opportunity!",
    choices: ['Power header', 'Glancing header', 'Chest down and volley'],
    successRate: (finishing) => Math.min(85, finishing * 0.9),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'forward_4',
    description: "Free kick just outside the box. The wall is set up.",
    choices: ['Curl it over the wall', 'Power shot through gap', 'Pass to teammate'],
    successRate: (finishing, speed) => Math.min(75, finishing * 0.7 + speed * 0.3),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'forward_5',
    description: "Rebound in the six-yard box! Quick reaction needed!",
    successRate: (finishing, speed) => Math.min(95, finishing * 0.5 + speed * 0.5),
    choices: ['First-time shot', 'Control then shoot', 'Tap in'],
    impact: { positive: 2, negative: -1 }
  },
  {
    id: 'forward_6',
    description: "Counter attack! You have space to run at the defense.",
    choices: ['Sprint with ball', 'Pass early to winger', 'Hold up play'],
    successRate: (speed, dribbling) => Math.min(85, speed * 0.6 + dribbling * 0.4),
    impact: { positive: 1, negative: 0 }
  },
  {
    id: 'forward_7',
    description: "Penalty awarded! All eyes on you.",
    choices: ['Bottom corner', 'Top corner', 'Down the middle'],
    successRate: (finishing) => Math.min(90, finishing * 0.85),
    impact: { positive: 2, negative: -2 }
  },
  {
    id: 'forward_8',
    description: "Tight angle shot opportunity near the byline.",
    choices: ['Near post shot', 'Cut back pass', 'Cross to far post'],
    successRate: (finishing, dribbling) => Math.min(70, finishing * 0.6 + dribbling * 0.4),
    impact: { positive: 1, negative: 0 }
  },
  {
    id: 'forward_9',
    description: "Last minute corner kick. Your team needs a goal!",
    choices: ['Attack near post', 'Challenge at far post', 'Stay back for clearance'],
    successRate: (finishing, speed) => Math.min(80, finishing * 0.7 + speed * 0.3),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'forward_10',
    description: "Defender slips! Clear path to goal from 25 yards out.",
    choices: ['Long range shot', 'Dribble closer', 'Look for pass'],
    successRate: (finishing, speed) => Math.min(85, finishing * 0.4 + speed * 0.6),
    impact: { positive: 2, negative: 0 }
  }
];

export const midfielderEvents: GameEvent[] = [
  {
    id: 'midfielder_1',
    description: "You have the ball in midfield. Two defenders pressing you.",
    choices: ['Quick pass to winger', 'Dribble through', 'Back pass to defense'],
    successRate: (vision, passing) => Math.min(90, vision * 0.4 + passing * 0.6),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'midfielder_2',
    description: "Perfect through ball opportunity to the striker!",
    choices: ['Weighted through ball', 'Lofted pass', 'Simple pass to feet'],
    successRate: (vision, passing) => Math.min(85, vision * 0.6 + passing * 0.4),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'midfielder_3',
    description: "Opposition building attack down your flank. Time to intercept!",
    choices: ['Slide tackle', 'Jockey and wait', 'Close down quickly'],
    successRate: (interception, vision) => Math.min(80, interception * 0.7 + vision * 0.3),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'midfielder_4',
    description: "Free kick in dangerous position. You're on set piece duty.",
    choices: ['Direct shot', 'Cross to near post', 'Cross to far post'],
    successRate: (passing, vision) => Math.min(75, passing * 0.6 + vision * 0.4),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'midfielder_5',
    description: "Counter attack chance! Quick decision needed in transition.",
    choices: ['Long ball to striker', 'Carry ball forward', 'Short pass to build up'],
    successRate: (vision, passing) => Math.min(85, vision * 0.5 + passing * 0.5),
    impact: { positive: 1, negative: 0 }
  },
  {
    id: 'midfielder_6',
    description: "Opposition corner kick. You need to mark your man closely.",
    choices: ['Stay tight to marker', 'Zone defend near post', 'Attack the ball'],
    successRate: (interception, vision) => Math.min(80, interception * 0.6 + vision * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'midfielder_7',
    description: "Box-to-box run! You've won the ball in your half.",
    choices: ['Drive forward with ball', 'Switch play wide', 'Quick one-two'],
    successRate: (passing, vision) => Math.min(85, passing * 0.5 + vision * 0.5),
    impact: { positive: 1, negative: 0 }
  },
  {
    id: 'midfielder_8',
    description: "Crowded midfield battle. Need to keep possession under pressure.",
    choices: ['Shield ball and turn', 'First-time pass', 'Back to goalkeeper'],
    successRate: (passing, interception) => Math.min(90, passing * 0.7 + interception * 0.3),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'midfielder_9',
    description: "Late run into the box as cross comes in!",
    choices: ['Volley on target', 'Head back across goal', 'Control and shoot'],
    successRate: (vision, passing) => Math.min(70, vision * 0.4 + passing * 0.6),
    impact: { positive: 2, negative: 0 }
  },
  {
    id: 'midfielder_10',
    description: "Deep lying playmaker role. Team looking for your creativity.",
    choices: ['Switch play to other flank', 'Through ball attempt', 'Hold possession'],
    successRate: (vision, passing) => Math.min(90, vision * 0.5 + passing * 0.5),
    impact: { positive: 1, negative: 0 }
  }
];

export const defenderEvents: GameEvent[] = [
  {
    id: 'defender_1',
    description: "Striker bearing down on goal! One-on-one defensive situation.",
    choices: ['Stand up and jockey', 'Slide tackle', 'Shepherd to side'],
    successRate: (tackling, clearance) => Math.min(85, tackling * 0.8 + clearance * 0.2),
    impact: { positive: 1, negative: -2 }
  },
  {
    id: 'defender_2',
    description: "Dangerous cross coming in from the wing. Clear it!",
    choices: ['Header clear', 'Chest and clear', 'Defensive header to teammate'],
    successRate: (clearance, tackling) => Math.min(90, clearance * 0.7 + tackling * 0.3),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'defender_3',
    description: "Your goalkeeper is out of position. You're the last man!",
    choices: ['Block the shot', 'Slide block', 'Close down angle'],
    successRate: (tackling, clearance) => Math.min(80, tackling * 0.6 + clearance * 0.4),
    impact: { positive: 2, negative: -2 }
  },
  {
    id: 'defender_4',
    description: "Corner kick defense. Opposition has big strikers in the box.",
    choices: ['Mark tightly', 'Zone defend', 'Attack the ball'],
    successRate: (clearance, tackling) => Math.min(85, clearance * 0.6 + tackling * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'defender_5',
    description: "Quick counter attack starting. Long ball opportunity!",
    choices: ['Long ball to striker', 'Pass to midfielder', 'Carry ball forward'],
    successRate: (longPasses, clearance) => Math.min(80, longPasses * 0.7 + clearance * 0.3),
    impact: { positive: 1, negative: 0 }
  },
  {
    id: 'defender_6',
    description: "Two-on-one situation developing against you!",
    choices: ['Delay and wait for help', 'Commit to ball carrier', 'Drop off and cover'],
    successRate: (tackling, clearance) => Math.min(75, tackling * 0.5 + clearance * 0.5),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'defender_7',
    description: "Free kick on the edge of your box. Form the wall!",
    choices: ['Stand in wall', 'Mark runner', 'Prepare for rebound'],
    successRate: (clearance, tackling) => Math.min(85, clearance * 0.6 + tackling * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'defender_8',
    description: "Through ball played behind you! Recovery run needed.",
    choices: ['Sprint back to cover', 'Tactical foul', 'Let goalkeeper handle'],
    successRate: (tackling, clearance) => Math.min(80, tackling * 0.4 + clearance * 0.6),
    impact: { positive: 1, negative: -2 }
  },
  {
    id: 'defender_9',
    description: "Penalty area scramble! Ball bouncing around dangerously.",
    choices: ['Boot it clear', 'Controlled clearance', 'Pass back to keeper'],
    successRate: (clearance, tackling) => Math.min(85, clearance * 0.8 + tackling * 0.2),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'defender_10',
    description: "Offside trap attempt! Timing needs to be perfect.",
    choices: ['Step up aggressively', 'Hold the line', 'Track the runner'],
    successRate: (tackling, longPasses) => Math.min(75, tackling * 0.6 + longPasses * 0.4),
    impact: { positive: 1, negative: -2 }
  }
];

export const goalkeeperEvents: GameEvent[] = [
  {
    id: 'goalkeeper_1',
    description: "One-on-one with the striker! Make yourself big!",
    choices: ['Rush out and narrow angle', 'Stay on line and wait', 'Dive at feet'],
    successRate: (reflex, jumping) => Math.min(85, reflex * 0.7 + jumping * 0.3),
    impact: { positive: 2, negative: -2 }
  },
  {
    id: 'goalkeeper_2',
    description: "Low shot to your near post! Quick reflexes needed.",
    choices: ['Dive and parry', 'Dive and catch', 'Block with feet'],
    successRate: (reflex, parrying) => Math.min(90, reflex * 0.6 + parrying * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'goalkeeper_3',
    description: "High cross into the box with strikers attacking!",
    choices: ['Come out and punch', 'Catch with confidence', 'Stay on line'],
    successRate: (jumping, parrying) => Math.min(85, jumping * 0.6 + parrying * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'goalkeeper_4',
    description: "Penalty kick! Read the striker's body language.",
    choices: ['Dive left', 'Dive right', 'Stay central'],
    successRate: (reflex) => Math.min(50, reflex * 0.6),
    impact: { positive: 2, negative: -2 }
  },
  {
    id: 'goalkeeper_5',
    description: "Free kick from 25 yards! Wall is set up perfectly.",
    choices: ['Cover near post', 'Position for far post', 'Stay central'],
    successRate: (reflex, jumping) => Math.min(80, reflex * 0.5 + jumping * 0.5),
    impact: { positive: 1, negative: -2 }
  },
  {
    id: 'goalkeeper_6',
    description: "Back pass under pressure! Quick distribution needed.",
    choices: ['Long kick upfield', 'Short pass to defender', 'Dribble around striker'],
    successRate: (parrying, reflex) => Math.min(85, parrying * 0.4 + reflex * 0.6),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'goalkeeper_7',
    description: "Corner kick coming in! Crowded penalty area.",
    choices: ['Come for the cross', 'Stay on line and react', 'Punch clear'],
    successRate: (jumping, parrying) => Math.min(80, jumping * 0.7 + parrying * 0.3),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'goalkeeper_8',
    description: "Deflected shot heading for top corner!",
    choices: ['Acrobatic save attempt', 'Positioning save', 'Tip over the bar'],
    successRate: (reflex, jumping) => Math.min(75, reflex * 0.8 + jumping * 0.2),
    impact: { positive: 2, negative: -2 }
  },
  {
    id: 'goalkeeper_9',
    description: "Opposition counter attack! Come out or stay back?",
    choices: ['Rush out as sweeper', 'Hold position', 'Communicate with defense'],
    successRate: (reflex, parrying) => Math.min(80, reflex * 0.6 + parrying * 0.4),
    impact: { positive: 1, negative: -1 }
  },
  {
    id: 'goalkeeper_10',
    description: "Last minute corner! Your team needs you to be decisive.",
    choices: ['Dominate the box', 'Quick distribution', 'Safe hands approach'],
    successRate: (jumping, parrying) => Math.min(85, jumping * 0.5 + parrying * 0.5),
    impact: { positive: 1, negative: -2 }
  }
];

export const getEventsForPosition = (position: PlayerPosition): GameEvent[] => {
  switch (position) {
    case 'Forward': return forwardEvents;
    case 'Midfielder': return midfielderEvents;
    case 'Defender': return defenderEvents;
    case 'Goalkeeper': return goalkeeperEvents;
    default: return forwardEvents;
  }
};
