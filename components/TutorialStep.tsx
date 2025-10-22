'use client';

import { useState, useEffect } from 'react';
import { TutorialStep as TutorialStepType } from '@/lib/tutorialSteps';

interface TutorialStepProps {
  step: TutorialStepType;
  onAnimationComplete: () => void;
}

interface AnimatedOutput {
  type: 'animated';
  steps: Array<{
    delay: number;
    content: string;
    callback?: () => void;
  }>;
}

export default function TutorialStep({ step, onAnimationComplete }: TutorialStepProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset when step changes
    setDisplayedLines([]);
    setIsAnimating(false);

    // Check if output is animated
    if (typeof step.mockOutput === 'function') {
      const output = step.mockOutput(onAnimationComplete);
      if (typeof output === 'object' && output.type === 'animated') {
        playAnimation(output as AnimatedOutput);
      }
    } else if (typeof step.mockOutput === 'string') {
      // Static output - show immediately
      setDisplayedLines([step.mockOutput]);
      // Auto-complete after showing static content
      setTimeout(onAnimationComplete, 500);
    } else if (typeof step.mockOutput === 'object' && (step.mockOutput as AnimatedOutput).type === 'animated') {
      playAnimation(step.mockOutput as AnimatedOutput);
    }
  }, [step.id]);

  const playAnimation = async (output: AnimatedOutput) => {
    setIsAnimating(true);

    for (const animStep of output.steps) {
      await new Promise(resolve => setTimeout(resolve, animStep.delay));
      setDisplayedLines(prev => [...prev, animStep.content]);

      // Call callback if provided
      if (animStep.callback) {
        animStep.callback();
      }
    }

    setIsAnimating(false);
  };

  return (
    <div className="space-y-2">
      {displayedLines.map((line, idx) => (
        <div key={idx} className="whitespace-pre-wrap">
          <TerminalOutput content={line} />
        </div>
      ))}
      {isAnimating && (
        <div className="flex items-center gap-2 text-term-cyan">
          <span className="animate-pulse">▊</span>
          <span className="text-xs opacity-60">Processing...</span>
        </div>
      )}
    </div>
  );
}

// Helper component to render terminal output with color coding
function TerminalOutput({ content }: { content: string }) {
  // Parse content for special formatting
  const lines = content.split('\n');

  return (
    <>
      {lines.map((line, idx) => {
        // Color coding based on line content
        let className = 'text-terminal-fg';

        if (line.startsWith('✓') || line.startsWith('🎉') || line.startsWith('✅')) {
          className = 'text-term-green';
        } else if (line.startsWith('🔧') || line.startsWith('📝') || line.startsWith('⬆️') || line.startsWith('📦') || line.startsWith('📄')) {
          className = 'text-term-cyan';
        } else if (line.startsWith('💡') || line.startsWith('⚠️')) {
          className = 'text-term-yellow';
        } else if (line.startsWith('❌') || line.startsWith('Error')) {
          className = 'text-term-red';
        } else if (line.includes('█')) {
          // Progress bar
          className = 'text-term-green font-bold';
        } else if (line.startsWith('  ') && (line.includes('├─') || line.includes('└─') || line.includes('│'))) {
          // Tree structure
          className = 'text-term-cyan';
        } else if (line.startsWith('{') || line.startsWith('}') || line.includes('"role":') || line.includes('"content":')) {
          // JSON
          className = 'text-term-purple';
        } else if (line.startsWith('#') || line.trim().endsWith(':')) {
          // Headers or labels
          className = 'text-term-yellow';
        } else if (line.includes('$') && !line.startsWith(' ')) {
          // Command prompt
          className = 'text-term-green';
        }

        // Parse URLs and make them clickable
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        if (urlRegex.test(line)) {
          const parts = line.split(urlRegex);
          return (
            <div key={idx} className={className}>
              {parts.map((part, partIdx) => {
                if (part.match(urlRegex)) {
                  return (
                    <a
                      key={partIdx}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-term-blue hover:text-term-cyan underline"
                    >
                      {part}
                    </a>
                  );
                }
                return <span key={partIdx}>{part}</span>;
              })}
            </div>
          );
        }

        return (
          <div key={idx} className={className}>
            {line}
          </div>
        );
      })}
    </>
  );
}
