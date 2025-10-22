'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSpaceman, setShowSpaceman] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/docs', label: 'Docs' },
    { href: '/blog', label: 'Blog' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <header className="bg-bg-primary border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
      <div className="container-custom">
        <nav className="flex items-center justify-between py-4">
          {/* Logo with easter egg */}
          <Link
            href="/"
            className="relative flex items-center gap-3 group"
            onMouseEnter={() => setShowSpaceman(true)}
            onMouseLeave={() => setShowSpaceman(false)}
          >
            <div className={`text-2xl font-bold text-slate-950 transition-all duration-200 ${showSpaceman ? 'transform -translate-x-2' : ''}`}>
              DeepFabric
            </div>
            {/* Easter egg spaceman */}
            <div className={`absolute -right-12 top-1/2 -translate-y-1/2 transition-all duration-300 ${showSpaceman ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
              <Image
                src="/spaceman/space1.png"
                alt=""
                width={32}
                height={32}
                className="object-contain animate-float"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-slate-950 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-blue group-hover:w-full transition-all duration-200" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden px-4 py-2 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-slate-100 pt-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-slate-600 hover:text-slate-950 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
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
