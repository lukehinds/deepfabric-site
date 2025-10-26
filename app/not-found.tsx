import Link from 'next/link';
import TerminalWindow from '@/components/TerminalWindow';
import TerminalPrompt from '@/components/TerminalPrompt';

export default function NotFound() {
  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <TerminalWindow title="deepfabric@terminal:~ [ERROR]">
        <div className="space-y-6">
          {/* Error Message */}
          <div>
            <TerminalPrompt />
            <span className="terminal-command">cat /404</span>
          </div>

          <div className="ml-4 space-y-4">
            <div className="text-term-red text-lg font-bold">
              bash: /404: No such file or directory
            </div>

            <div className="text-term-yellow">
              Error 404: The page you're looking for doesn't exist
            </div>

            <div className="text-terminal-fg">
              This path is not part of the DeepFabric file system.
            </div>
          </div>

          {/* Suggestions */}
          <div className="mt-8">
            <div className="text-term-green mb-2">Did you mean one of these?</div>
            <div className="ml-4 space-y-1">
              <Link href="/" className="file-item">
                <span className="text-term-blue">📁</span>
                <span className="directory">home/</span>
              </Link>
              <Link
                href="https://lukehinds.github.io/deepfabric/"
                className="file-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-term-blue">📁</span>
                <span className="directory">docs/</span>
              </Link>
              <Link href="/blog" className="file-item">
                <span className="text-term-blue">📁</span>
                <span className="directory">blog/</span>
              </Link>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="mt-8 border-t border-terminal-border pt-4">
            <div className="text-terminal-fg text-sm">
              Type <span className="text-term-cyan">cd /</span> to return home
            </div>
            <div className="mt-4">
              <Link href="/" className="btn-terminal">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
