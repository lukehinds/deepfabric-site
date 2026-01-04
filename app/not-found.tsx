import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-md text-center">
        {/* Error Code */}
        <div className="text-8xl font-bold text-primary mb-4">404</div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Suggestions */}
        <div className="space-y-3 mb-8">
          <p className="text-sm text-muted-foreground">Try one of these instead:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Home
            </Link>
            <Link
              href="https://docs.deepfabric.dev"
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Return Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
