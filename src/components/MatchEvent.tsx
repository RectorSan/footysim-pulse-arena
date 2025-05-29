
import React from 'react';
import { GameEvent } from '../types/game';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface MatchEventProps {
  event: GameEvent;
  eventIndex: number;
  currentEventIndex: number;
  totalEvents: number;
  onChoice: (eventIndex: number, choiceIndex: number) => void;
}

const MatchEvent: React.FC<MatchEventProps> = ({ 
  event, 
  eventIndex, 
  currentEventIndex, 
  totalEvents, 
  onChoice 
}) => {
  // Only show if this is the current event and it's not resolved
  if (eventIndex !== currentEventIndex || event.resolved) return null;

  return (
    <Card className="glass-card p-6 animate-fade-in">
      <div className="space-y-4">
        <div className="text-center">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Match Event</span>
            <span className="text-sm text-primary font-medium">
              {eventIndex + 1} / {totalEvents}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Decision Time!
          </h3>
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
