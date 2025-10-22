interface TerminalPromptProps {
  user?: string;
  path?: string;
}

export default function TerminalPrompt({ user = 'user', path = '~' }: TerminalPromptProps) {
  return (
    <span className="terminal-prompt">
      {user}@deepfabric<span className="text-terminal-fg">:</span>
      <span className="text-term-blue">{path}</span>
      <span className="text-terminal-fg">$ </span>
    </span>
  );
}
