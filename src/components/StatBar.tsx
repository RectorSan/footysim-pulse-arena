
import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
  animated?: boolean;
}

const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  maxValue = 100, 
  color = 'from-primary to-accent',
  showValue = true,
  animated = false
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        {showValue && (
          <span className={`text-sm font-bold ${animated ? 'animate-stat-increase' : ''}`}>
            {Math.round(value)}/{maxValue}
          </span>
        )}
      </div>
      <div className="stat-bar h-3">
        <div 
          className={`stat-fill bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default StatBar;
