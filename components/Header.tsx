'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', external: false },
    { href: 'https://docs.deepfabric.dev', label: 'Docs', external: true },
    { href: '/blog', label: 'Blog', external: false },
    { href: 'https://github.com/always-further/deepfabric', label: 'GitHub', external: true },
  ];

  return (
    <header className="border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/90">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="text-xl font-bold text-foreground">
              DeepFabric
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group"
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-border pt-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-muted-foreground hover:text-foreground font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
