import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Project Info */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-foreground mb-4">DeepFabric</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Generate high-quality synthetic datasets for fine-tuning your AI models.
              Open source and community driven.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-sm text-foreground mb-4 uppercase tracking-wide">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://docs.deepfabric.dev"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-bold text-sm text-foreground mb-4 uppercase tracking-wide">Community</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://github.com/always-further/deepfabric"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/always-further/deepfabric/issues"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} DeepFabric. Always Further, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/always-further/deepfabric"
              className="text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
