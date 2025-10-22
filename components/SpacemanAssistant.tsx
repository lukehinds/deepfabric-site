'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const tips = [
  "💡 Tip: Type 'help' to see all available commands!",
  "🚀 Try typing 'install' to see how to get started",
  "📝 Type 'ls' to list all available pages",
  "🎯 You can click on links or type commands - your choice!",
  "⌨️ Use Tab for auto-complete (coming soon!)",
  "🌟 Type 'surprise' for something fun...",
  "👋 Hi! I'm here to help you navigate DeepFabric",
];

export default function SpacemanAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    // Show assistant after a delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      setShowTip(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Rotate tips every 10 seconds
    if (showTip && !isMinimized) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % tips.length);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [showTip, isMinimized]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      {!isMinimized && (
        <>
          {/* Speech bubble */}
          {showTip && (
            <div className="speech-bubble mb-4 max-w-xs animate-slide-up">
              <button
                onClick={() => setShowTip(false)}
                className="absolute top-2 right-2 text-term-red hover:text-term-yellow transition-colors"
              >
                ✕
              </button>
              <p>{tips[currentTip]}</p>
            </div>
          )}
        </>
      )}

      {/* Spaceman */}
      <div className="relative">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="relative group"
        >
          <div
            className={`transition-all duration-300 ${
              isMinimized ? 'w-16 h-16' : 'w-24 h-24'
            } ${!isMinimized && 'animate-float'}`}
          >
            <Image
              src="/spaceman/space1.png"
              alt="Assistant"
              width={96}
              height={96}
              className="object-contain drop-shadow-[0_0_15px_rgba(125,207,255,0.5)]"
            />
          </div>

          {/* Minimize/Maximize indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-term-green rounded-full flex items-center justify-center text-terminal-bg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            {isMinimized ? '+' : '−'}
          </div>
        </button>

        {/* Random reactions */}
        {!isMinimized && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce-in">
            👋
          </div>
        )}
      </div>
    </div>
  );
}
