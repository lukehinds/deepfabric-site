'use client';

import { ReactNode, forwardRef } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

const TerminalWindow = forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ children, title = "deepfabric@terminal" }, ref) => {
    return (
      <div className="terminal-window w-full max-w-5xl mx-auto">
        {/* Terminal header with dots */}
        <div className="terminal-header">
          <div className="terminal-dot bg-term-red" />
          <div className="terminal-dot bg-term-yellow" />
          <div className="terminal-dot bg-term-green" />
          <span className="text-terminal-fg text-sm ml-4">{title}</span>
        </div>

        {/* Terminal content with scrolling */}
        <div
          ref={ref}
          className="p-6 max-h-[70vh] overflow-y-auto"
        >
          {children}
        </div>
      </div>
    );
  }
);

TerminalWindow.displayName = 'TerminalWindow';

export default TerminalWindow;
