'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TerminalNav() {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: 'home' },
    { path: '/docs', label: 'docs' },
    { path: '/blog', label: 'blog' },
    { path: '/about', label: 'about' },
    { path: '/community', label: 'community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg-light border-b border-terminal-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-term-green hover:text-term-cyan transition-colors font-bold">
            ~/deepfabric
          </Link>
          <div className="flex items-center gap-4 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`hover:text-term-cyan transition-colors ${
                  pathname === item.path
                    ? 'text-term-cyan'
                    : 'text-terminal-fg'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
