'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalPrompt from '@/components/TerminalPrompt';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function Home() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const asciiArt = `
 ____                   _____     _          _
|  _ \\  ___  ___ _ __  |  ___|_ _| |__  _ __(_) ___
| | | |/ _ \\/ _ \\ '_ \\ | |_ / _\` | '_ \\| '__| |/ __|
| |_| |  __/  __/ |_) ||  _| (_| | |_) | |  | | (__
|____/ \\___|\\___| .__/ |_|  \\__,_|_.__/|_|  |_|\\___|
                |_|
`;

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (trimmedCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-sm">
            <div className="text-term-yellow mb-2">Available commands:</div>
            <div className="ml-4 space-y-1">
              <div><span className="text-term-green">help</span> - Show this help message</div>
              <div><span className="text-term-green">ls</span> - List all pages</div>
              <div><span className="text-term-green">install</span> - Show installation guide</div>
              <div><span className="text-term-green">docs</span> - Navigate to documentation</div>
              <div><span className="text-term-green">blog</span> - Navigate to blog</div>
              <div><span className="text-term-green">about</span> - Navigate to about page</div>
              <div><span className="text-term-green">community</span> - Navigate to community</div>
              <div><span className="text-term-green">clear</span> - Clear the terminal</div>
              <div><span className="text-term-green">whoami</span> - Display current user</div>
              <div><span className="text-term-green">date</span> - Show current date</div>
            </div>
          </div>
        );
        break;

      case 'ls':
      case 'ls -la':
        output = (
          <div className="space-y-1">
            <div className="flex gap-4">
              <Link href="/docs" className="text-term-blue hover:text-term-cyan">📁 docs/</Link>
              <span className="text-terminal-fg text-xs">- Documentation and guides</span>
            </div>
            <div className="flex gap-4">
              <Link href="/blog" className="text-term-blue hover:text-term-cyan">📁 blog/</Link>
              <span className="text-terminal-fg text-xs">- Articles and updates</span>
            </div>
            <div className="flex gap-4">
              <Link href="/about" className="text-term-green hover:text-term-cyan">📄 about.md</Link>
              <span className="text-terminal-fg text-xs">- About the project</span>
            </div>
            <div className="flex gap-4">
              <Link href="/community" className="text-term-green hover:text-term-cyan">📄 community.md</Link>
              <span className="text-terminal-fg text-xs">- Join our community</span>
            </div>
          </div>
        );
        break;

      case 'install':
        output = (
          <div className="space-y-2">
            <div className="text-term-yellow">Installation Guide:</div>
            <div className="bg-terminal-bg-light border border-terminal-border rounded p-4 mt-2">
              <div className="text-term-green">$ npm install deepfabric</div>
              <div className="text-terminal-fg text-sm mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-term-cyan">⠋</span>
                  <span>Installing packages...</span>
                </div>
                <div className="text-term-green">✓ Installation complete!</div>
              </div>
            </div>
            <div className="text-terminal-fg text-sm mt-2">
              Then import in your code:
            </div>
            <div className="bg-terminal-bg-light border border-terminal-border rounded p-3 mt-1 font-mono text-sm">
              <div className="text-term-purple">import</div> <div className="text-term-cyan inline">&#123; DeepFabric &#125;</div> <div className="text-term-purple inline">from</div> <div className="text-term-yellow inline">'deepfabric'</div>;
            </div>
          </div>
        );
        break;

      case 'docs':
        setTimeout(() => router.push('/docs'), 500);
        output = <div className="text-term-cyan">Navigating to docs...</div>;
        break;

      case 'blog':
        setTimeout(() => router.push('/blog'), 500);
        output = <div className="text-term-cyan">Navigating to blog...</div>;
        break;

      case 'about':
        setTimeout(() => router.push('/about'), 500);
        output = <div className="text-term-cyan">Navigating to about...</div>;
        break;

      case 'community':
        setTimeout(() => router.push('/community'), 500);
        output = <div className="text-term-cyan">Navigating to community...</div>;
        break;

      case 'clear':
        setHistory([]);
        setCommand('');
        return;

      case 'whoami':
        output = <div className="text-term-green">user@deepfabric</div>;
        break;

      case 'date':
        output = <div className="text-terminal-fg">{new Date().toString()}</div>;
        break;

      case 'surprise':
        output = (
          <div className="text-term-purple">
            <div>🚀 ✨ 🌟 You found the secret command! 🌟 ✨ 🚀</div>
            <div className="mt-2 text-term-cyan">The spaceman waves at you! 👋</div>
          </div>
        );
        break;

      case '':
        setCommand('');
        return;

      default:
        output = (
          <div className="text-term-red">
            bash: {trimmedCmd}: command not found
            <div className="text-terminal-fg text-sm mt-1">Type 'help' for available commands</div>
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when history updates
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <TerminalWindow ref={terminalOutputRef} title="deepfabric@terminal:~">
        {/* ASCII Art Logo */}
        <div className="ascii-art text-term-cyan mb-8">
          {asciiArt}
        </div>

        {/* Welcome Message */}
        <div className="space-y-2 mb-8">
          <div>
            <span className="text-term-green">DeepFabric</span>
            <span className="text-terminal-fg"> - A micro agent training pipeline</span>
          </div>
          <div className="text-term-yellow">Version 1.0.0-beta</div>
          <div className="text-terminal-fg">Type <span className="text-term-cyan">'help'</span> for available commands</div>
        </div>

        {/* Command History Output */}
        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <TerminalPrompt />
              <span className="terminal-command">{item.command}</span>
            </div>
            <div className="ml-4">{item.output}</div>
          </div>
        ))}

        {/* Interactive Command Line */}
        <div className="flex items-center border-t-2 border-terminal-border pt-4 mt-6">
          <TerminalPrompt />
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent outline-none text-term-cyan caret-term-green ml-2"
            placeholder="Type a command..."
          />
          <span className="cursor"></span>
        </div>

        {/* Footer hints */}
        <div className="mt-6 text-xs text-terminal-fg opacity-60">
          <div>💡 Tip: Type 'help' to see all commands</div>
          <div>⌨️  Use ↑/↓ arrows for command history</div>
        </div>
      </TerminalWindow>
    </div>
  );
}
