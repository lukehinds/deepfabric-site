'use client';

import { ReactNode, forwardRef } from 'react';

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  disableScroll?: boolean;
}

const TerminalWindow = forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ children, title = "deepfabric@terminal", disableScroll = false }, ref) => {
    return (
      <div className="terminal-window w-full max-w-6xl mx-auto">
        {/* Terminal header with dots */}
        <div className="terminal-header">
          <div className="terminal-dot bg-term-red" />
          <div className="terminal-dot bg-term-yellow" />
          <div className="terminal-dot bg-term-green" />
          <span className="text-terminal-fg text-sm ml-4">{title}</span>
        </div>

        {/* Terminal content */}
        <div
          ref={ref}
          className={`p-6 ${disableScroll ? 'overflow-hidden' : 'overflow-y-auto'}`}
          style={{ height: 'calc(100vh - 12rem)' }}
        >
          {children}
        </div>
      </div>
    );
  }
);

TerminalWindow.displayName = 'TerminalWindow';

export default TerminalWindow;
