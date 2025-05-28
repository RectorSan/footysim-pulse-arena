
import React, { useState, useEffect } from 'react';

const motivationalMessages = [
  "Train hard, play harder! 💪",
  "Every match is a chance to prove yourself! ⚽",
  "Champions are made in training! 🏆",
  "Believe in yourself and achieve greatness! ⭐",
  "One game at a time, one goal at a time! 🎯",
  "Your journey to glory starts now! 🔥",
  "Hard work beats talent when talent doesn't work hard! ⚡",
  "The pitch is your canvas, paint your masterpiece! 🎨",
  "Rise to the challenge and conquer your fears! 🦁",
  "Success is earned, not given! 💎"
];

const MessageTicker: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % motivationalMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/30 border border-white/10 rounded-lg p-3 overflow-hidden">
      <div className="animate-fade-in">
        <p className="text-center text-primary font-medium">
          {motivationalMessages[currentMessage]}
        </p>
      </div>
    </div>
  );
};

export default MessageTicker;
