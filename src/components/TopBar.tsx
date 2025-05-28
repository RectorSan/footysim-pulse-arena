
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from './ui/button';

const TopBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">FS</span>
        </div>
        <span className="font-bold text-white text-lg">FootySIM</span>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/10"
      >
        <Settings size={20} />
      </Button>
    </div>
  );
};

export default TopBar;
