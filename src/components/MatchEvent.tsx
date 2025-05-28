
import React from 'react';
import { GameEvent } from '../types/game';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface MatchEventProps {
  event: GameEvent;
  eventIndex: number;
  onChoice: (eventIndex: number, choiceIndex: number) => void;
  resolved?: boolean;
}

const MatchEvent: React.FC<MatchEventProps> = ({ event, eventIndex, onChoice, resolved }) => {
  if (resolved) return null;

  return (
    <Card className="glass-card p-6 animate-fade-in">
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">Match Event {eventIndex + 1}</h3>
          <p className="text-gray-300">{event.description}</p>
        </div>
        
        <div className="space-y-3">
          {event.choices.map((choice, choiceIndex) => (
            <Button
              key={choiceIndex}
              onClick={() => onChoice(eventIndex, choiceIndex)}
              className="w-full p-4 bg-black/30 border border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white transition-all duration-300 transform hover:scale-105"
              variant="outline"
            >
              {choice}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MatchEvent;
