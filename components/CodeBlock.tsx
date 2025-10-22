'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  language?: string;
  showCopy?: boolean;
}

export default function CodeBlock({ children, language, showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {language && (
        <div className="flex items-center justify-between bg-slate-900 px-4 py-2 rounded-t-lg border-b border-slate-800">
          <span className="text-xs text-slate-400 font-mono">{language}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white transition-colors font-mono"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div className={`code-block ${language ? 'rounded-t-none' : ''} relative overflow-x-auto`}>
        {showCopy && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 text-xs text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100 font-mono"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
        <pre className="font-mono text-sm">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
