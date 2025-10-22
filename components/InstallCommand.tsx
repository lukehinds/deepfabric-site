'use client';

import { useState } from 'react';

interface InstallCommandProps {
  command: string;
  className?: string;
}

export default function InstallCommand({ command, className = '' }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-lg px-6 py-4 hover:border-brand-blue transition-colors">
        <span className="text-brand-green font-mono text-sm">$</span>
        <code className="text-white font-mono text-sm flex-grow">{command}</code>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
