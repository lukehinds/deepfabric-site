'use client';

import { useState, useRef, useEffect } from 'react';
import { tutorialSteps } from '@/lib/tutorialSteps';
import TutorialStep from './TutorialStep';

interface TutorialModeProps {
  onExit: () => void;
}

export default function TutorialMode({ onExit }: TutorialModeProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [command, setCommand] = useState('');
  const [stepCompleted, setStepCompleted] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentStep = tutorialSteps[currentStepIndex];
  const isLastStep = currentStepIndex === tutorialSteps.length - 1;
  const progress = ((currentStepIndex + 1) / tutorialSteps.length) * 100;

  useEffect(() => {
    // Focus input when step changes
    inputRef.current?.focus();
    setCommand('');
    setStepCompleted(false);
    setShowOutput(true);

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('deepfabric-tutorial-progress');
    if (savedProgress && currentStepIndex === 0) {
      const progress = parseInt(savedProgress);
      if (progress > 0 && progress < tutorialSteps.length) {
        // Ask user if they want to resume
        if (confirm(`Resume tutorial from step ${progress + 1}?`)) {
          setCurrentStepIndex(progress);
        }
      }
    }
  }, [currentStepIndex]);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem('deepfabric-tutorial-progress', currentStepIndex.toString());
  }, [currentStepIndex]);

  useEffect(() => {
    // Auto-scroll to bottom when content changes
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [showOutput, stepCompleted]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();

    if (trimmedCmd === '') return;

    // Add to history
    setCommandHistory(prev => [...prev, trimmedCmd]);

    // Special case: exit command on last step
    if (isLastStep && trimmedCmd.toLowerCase() === 'exit') {
      localStorage.removeItem('deepfabric-tutorial-progress');
      onExit();
      return;
    }

    // Check if command matches expected
    if (currentStep.expectedCommand) {
      // Allow both exact match and simplified match
      const expected = currentStep.expectedCommand.toLowerCase().replace(/\s+/g, ' ');
      const actual = trimmedCmd.toLowerCase().replace(/\s+/g, ' ');

      if (actual === expected || actual === 'continue' || actual === 'next') {
        setStepCompleted(true);
        setCommand('');
      } else {
        // Show hint
        alert(`Hint: Try typing "${currentStep.expectedCommand}"\n\nOr click the "Next Step" button to continue.`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(command);
    } else if (e.key === 'Tab' && currentStep.commandPlaceholder) {
      e.preventDefault();
      setCommand(currentStep.expectedCommand || '');
    }
  };

  const nextStep = () => {
    if (currentStepIndex < tutorialSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      localStorage.removeItem('deepfabric-tutorial-progress');
      onExit();
    }
  };

  const handleAnimationComplete = () => {
    setStepCompleted(true);
  };

  const skipTutorial = () => {
    if (confirm('Are you sure you want to exit the tutorial?')) {
      localStorage.removeItem('deepfabric-tutorial-progress');
      onExit();
    }
  };

  const copyCommand = () => {
    if (currentStep.expectedCommand) {
      navigator.clipboard.writeText(currentStep.expectedCommand);
      // Show brief toast or feedback
      alert('Command copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tutorial Header */}
      <div className="border-b-2 border-terminal-border pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-term-cyan text-xl font-bold">
              Step {currentStep.id}/{tutorialSteps.length}: {currentStep.title}
            </h2>
            <p className="text-terminal-fg text-sm mt-1">{currentStep.description}</p>
          </div>
          <button
            onClick={skipTutorial}
            className="text-term-red hover:text-term-yellow transition-colors text-sm"
          >
            Exit Tutorial
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-terminal-bg-light rounded-full h-2 mt-3">
          <div
            className="bg-term-green h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2 mt-3 justify-center">
          {tutorialSteps.map((step, idx) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full transition-all ${
                idx < currentStepIndex
                  ? 'bg-term-green'
                  : idx === currentStepIndex
                  ? 'bg-term-cyan animate-pulse'
                  : 'bg-terminal-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tutorial Content */}
      <div ref={contentRef} className="flex-grow overflow-y-auto mb-4">
        {/* Show command history */}
        {commandHistory.map((cmd, idx) => (
          <div key={idx} className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-term-green">$</span>
              <span className="text-term-cyan">{cmd}</span>
            </div>
          </div>
        ))}

        {/* Current Step Output */}
        {showOutput && (
          <TutorialStep
            step={currentStep}
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </div>

      {/* Action Buttons */}
      {stepCompleted && (
        <div className="flex gap-3 mb-4">
          <button
            onClick={nextStep}
            className="flex-1 bg-term-green text-terminal-bg px-4 py-2 rounded hover:bg-term-cyan transition-colors font-bold"
          >
            {isLastStep ? 'Finish Tutorial' : 'Next Step →'}
          </button>
          {currentStep.expectedCommand && (
            <button
              onClick={copyCommand}
              className="px-4 py-2 border border-terminal-border rounded hover:border-term-cyan transition-colors text-term-cyan text-sm"
              title="Copy command"
            >
              📋 Copy
            </button>
          )}
        </div>
      )}

      {/* Command Input */}
      {!stepCompleted && currentStep.expectedCommand && (
        <div className="border-t-2 border-terminal-border pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-term-green">$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-transparent outline-none text-term-cyan caret-term-green"
              placeholder={currentStep.commandPlaceholder || 'Type command...'}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleCommand(currentStep.expectedCommand || '')}
              className="px-4 py-1 bg-term-cyan text-terminal-bg rounded hover:bg-term-green transition-colors text-sm"
            >
              Auto-Complete
            </button>
            <span className="text-terminal-fg text-xs flex items-center">
              Press Tab to auto-fill, Enter to run
            </span>
          </div>
        </div>
      )}

      {/* Auto-advance for steps without commands */}
      {!currentStep.expectedCommand && !stepCompleted && (
        <div className="border-t-2 border-terminal-border pt-4">
          <button
            onClick={() => setStepCompleted(true)}
            className="w-full bg-term-green text-terminal-bg px-4 py-2 rounded hover:bg-term-cyan transition-colors font-bold"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
