'use client';

import Link from 'next/link';

export default function Footer() {

  return (
    <footer className="bg-bg-primary border-t border-slate-200 mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Project Info */}
          <div>
            <h3 className="font-bold text-lg text-slate-950 mb-4">DeepFabric</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              A modern open source project with clean design and thoughtful details.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg text-slate-950 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="https://github.com/always-further/deepfabric" className="text-slate-600 hover:text-brand-blue transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-600 hover:text-brand-blue transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
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
