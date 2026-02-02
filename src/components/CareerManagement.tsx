import React from 'react';
import { CareerAction, CareerState, Player } from '../types/game';
import { Button } from './ui/button';
import { Card } from './ui/card';
import StatBar from './StatBar';

interface CareerManagementProps {
  career: CareerState;
  player: Player;
  onAction: (action: CareerAction) => void;
}

const currency = (value: number) =>
  `£${value.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;

const actionOptions: { action: CareerAction; title: string; description: string }[] = [
  {
    action: 'agentMeeting',
    title: 'Agent Meeting',
    description: 'Review club interest and polish your market value.'
  },
  {
    action: 'mediaDay',
    title: 'Media Day',
    description: 'Boost your profile with a press conference.'
  },
  {
    action: 'sponsorship',
    title: 'Sponsorship Deal',
    description: 'Secure a quick payout with a brand appearance.'
  },
  {
    action: 'communityEvent',
    title: 'Community Event',
    description: 'Earn fan goodwill with local outreach.'
  }
];

const CareerManagement: React.FC<CareerManagementProps> = ({ career, player, onAction }) => {
  return (
    <div className="space-y-6">
      <Card className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Career Hub</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="space-y-2">
            <p>
              <span className="text-gray-500">Age:</span> {player.age} • {player.nationality}
            </p>
            <p>
              <span className="text-gray-500">Role:</span> {career.contract.role}
            </p>
            <p>
              <span className="text-gray-500">Years left:</span> {career.contract.yearsRemaining}
            </p>
            <p>
              <span className="text-gray-500">Weekly wage:</span> {currency(career.contract.weeklyWage)}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="text-gray-500">Market value:</span> {currency(career.marketValue)}
            </p>
            <p>
              <span className="text-gray-500">Release clause:</span> {currency(career.contract.releaseClause)}
            </p>
            <p>
              <span className="text-gray-500">Transfer interest:</span> {career.transferInterest}
            </p>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Finances</h4>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
          <div className="space-y-2">
            <p>
              <span className="text-gray-500">Balance:</span> {currency(career.finances.balance)}
            </p>
            <p>
              <span className="text-gray-500">Endorsements:</span> {currency(career.finances.endorsements)}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="text-gray-500">Bonuses:</span> {currency(career.finances.bonuses)}
            </p>
            <p>
              <span className="text-gray-500">Expenses:</span> {currency(career.finances.expenses)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Influence & Wellness</h4>
        <div className="space-y-4">
          <StatBar label="Fan Support" value={career.fanSupport} color="from-sky-400 to-blue-500" />
          <StatBar label="Morale" value={career.morale} color="from-emerald-400 to-green-500" />
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Season Objectives</h4>
        <div className="space-y-4 text-sm text-gray-300">
          {career.objectives.map((objective) => {
            const progress = Math.min(100, (objective.current / objective.target) * 100);
            return (
              <div key={objective.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className={objective.completed ? 'text-primary' : ''}>{objective.label}</span>
                  <span>
                    {objective.current}/{objective.target}
                  </span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${objective.completed ? 'bg-primary' : 'bg-white/40'}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Reward: {currency(objective.reward)}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="glass-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Career Actions</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          {actionOptions.map((option) => (
            <div key={option.action} className="space-y-2">
              <div>
                <p className="text-white font-medium">{option.title}</p>
                <p className="text-xs text-gray-400">{option.description}</p>
              </div>
              <Button
                onClick={() => onAction(option.action)}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-black font-semibold"
              >
                {option.title}
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CareerManagement;
