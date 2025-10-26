'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalPrompt from '@/components/TerminalPrompt';
import TutorialMode from '@/components/TutorialMode';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function Home() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [tutorialMode, setTutorialMode] = useState(false);
  const [whoamiCount, setWhoamiCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
              <div><span className="text-term-green">tutorial</span> - Start interactive DeepFabric tutorial</div>
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

      case 'tutorial':
        setTutorialMode(true);
        return;

      case 'ls':
      case 'ls -la':
        output = (
          <div className="space-y-1">
            <div className="flex gap-4">
              <Link
                href="https://lukehinds.github.io/deepfabric/"
                className="text-term-blue hover:text-term-cyan"
                target="_blank"
                rel="noopener noreferrer"
              >
                📁 docs/
              </Link>
              <span className="text-terminal-fg text-xs">- Documentation and guides</span>
            </div>
            <div className="flex gap-4">
              <Link href="/blog" className="text-term-blue hover:text-term-cyan">📁 blog/</Link>
              <span className="text-terminal-fg text-xs">- Articles and updates</span>
            </div>
            <div className="flex gap-4">
              <Link href="https://github.com/lukehinds/deepfabric" className="text-term-green hover:text-term-cyan">📄 community.md</Link>
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
              <div className="text-term-green">$ pip install deepfabric</div>
              <div className="text-terminal-fg text-sm mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-term-cyan">⠋</span>
                  <span>Installing packages...</span>
                </div>
                <div className="text-term-green">✓ Installation complete!</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'docs':
        setTimeout(() => window.open('https://lukehinds.github.io/deepfabric/', '_blank'), 500);
        output = <div className="text-term-cyan">Opening docs in new tab...</div>;
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
        setTimeout(() => router.push('https://github.com/lukehinds/deepfabric'), 500);
        output = <div className="text-term-cyan">Navigating to community...</div>;
        break;

      case 'clear':
        setHistory([]);
        setCommand('');
        return;

      case 'whoami':
        const currentCount = whoamiCount;
        setWhoamiCount(prev => prev + 1);

        if (currentCount === 0) {
          output = <div className="text-term-green">ronnniepickering</div>;
        } else if (currentCount === 1) {
          output = <div className="text-term-green">ronnniepickering!!!</div>;
        } else {
          output = <div className="text-term-green font-bold">RONNIEPICKERING!!!!</div>;
        }
        break;

      case 'date':
        output = <div className="text-terminal-fg">{new Date().toString()}</div>;
        break;

      case 'surprise':
        output = (
          <div className="text-term-purple">
            <div>🚀 ✨ 🌟 You found the secret command! 🌟 ✨ 🚀</div>
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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="overflow-hidden flex items-center justify-center px-4 md:px-8" style={{ height: 'calc(100vh - 4rem)' }}>
      <TerminalWindow title={tutorialMode ? "deepfabric@tutorial:~" : "deepfabric@terminal:~"} disableScroll={true}>
        {tutorialMode ? (
          <TutorialMode onExit={() => setTutorialMode(false)} />
        ) : (
          <div className="flex flex-col h-full">
            {/* Scrollable content area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4">
              {/* ASCII Art Logo */}
              <div className="ascii-art text-term-cyan mb-8">
                {asciiArt}
              </div>

              {/* Welcome Message */}
              <div className="space-y-2 mb-8">
                <div>
                  <span className="text-term-green">DeepFabric</span>
                  <span className="text-terminal-fg"> - A Micro Agent Training Pipeline</span>
                </div>
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
            </div>

            {/* Fixed command input at bottom */}
            <div className="flex-shrink-0">
              {/* Interactive Command Line */}
              <div className="flex items-center border-t-2 border-terminal-border pt-4">
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
              </div>

              {/* Footer hints */}
              <div className="mt-3 text-xs text-terminal-fg opacity-60">
                <div>💡 Tip: Type 'help' to see all commands</div>
                <div>⌨️  Use ↑/↓ arrows for command history</div>
                <div>🎓 Try: Type 'tutorial' for an interactive guide</div>
              </div>
            </div>
          </div>
        )}
      </TerminalWindow>
    </div>
  );
}
