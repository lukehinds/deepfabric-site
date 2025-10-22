'use client';

import { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  children: string;
  language?: string;
  showCopy?: boolean;
}

export default function CodeBlock({ children, language = 'text', showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(children, {
          lang: language,
          theme: 'github-dark',
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Syntax highlighting error:', error);
        // Fallback to plain code
        setHighlightedCode(`<pre class="font-mono text-sm"><code>${children}</code></pre>`);
      }
    };

    highlightCode();
  }, [children, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {language && (
        <div className="flex items-center justify-between bg-[#0d1117] px-4 py-2 rounded-t-lg border-b border-gray-800">
          <span className="text-xs text-gray-400 font-mono">{language}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="text-xs text-gray-400 hover:text-white transition-colors font-mono"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div
        className={`code-block ${language ? 'rounded-t-none' : 'rounded-lg'} relative overflow-x-auto bg-[#0d1117]`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
