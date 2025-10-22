'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  return (
    <footer className="bg-bg-primary border-t border-slate-200 mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Project Info */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection(0)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 className="font-bold text-lg text-slate-950 mb-4">DeepFabric</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              A modern open source project with clean design and thoughtful details.
            </p>
            {/* Easter egg */}
            {hoveredSection === 0 && (
              <div className="absolute -top-8 -right-8 opacity-60 animate-float">
                <Image src="/spaceman/space1.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection(1)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 className="font-bold text-lg text-slate-950 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
            {/* Easter egg */}
            {hoveredSection === 1 && (
              <div className="absolute -top-8 -right-8 opacity-60 animate-float">
                <Image src="/spaceman/space2.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            )}
          </div>

          {/* Connect */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredSection(2)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <h3 className="font-bold text-lg text-slate-950 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" className="text-slate-600 hover:text-brand-blue transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Discord
                </a>
              </li>
            </ul>
            {/* Easter egg */}
            {hoveredSection === 2 && (
              <div className="absolute -top-8 -right-8 opacity-60 animate-float">
                <Image src="/spaceman/space3.png" alt="" width={40} height={40} className="object-contain" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} DeepFabric. Open Source Project.
          </p>
        </div>
      </div>
    </footer>
  );
}
