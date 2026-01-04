import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community</h1>
          <p className="text-xl text-muted-foreground">
            Join our community of developers and contributors
          </p>
        </div>

        {/* How to Contribute */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How to Contribute</h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Fork the Repository</h3>
              <p className="text-sm mb-3">
                Start by forking the DeepFabric repository on GitHub.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg">
                <code className="text-primary text-sm font-mono">
                  git clone https://github.com/your-username/deepfabric.git
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Create a Branch</h3>
              <p className="text-sm mb-3">
                Create a new branch for your feature or bug fix.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg">
                <code className="text-primary text-sm font-mono">
                  git checkout -b feature/amazing-feature
                </code>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3. Make Your Changes</h3>
              <p className="text-sm">
                Write code, fix bugs, improve documentation - every contribution matters!
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">4. Submit a Pull Request</h3>
              <p className="text-sm">
                Push your changes and open a PR. We will review it as soon as possible!
              </p>
            </div>
          </div>
        </div>

        {/* Ways to Contribute */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Ways to Contribute</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Code</h3>
              <p className="text-sm text-muted-foreground">Add features, fix bugs, improve performance</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground">Write guides, improve examples, fix typos</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Design</h3>
              <p className="text-sm text-muted-foreground">Create themes, improve UI/UX, add graphics</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Help others, answer questions, share knowledge</p>
            </div>
          </div>
        </div>

        {/* Code of Conduct */}
        <div className="glass-panel p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Code of Conduct</h2>
          <div className="text-muted-foreground space-y-4 text-sm">
            <p>
              We are committed to providing a welcoming and inspiring community for all.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Be respectful and inclusive</li>
              <li>Welcome newcomers and help them learn</li>
              <li>Focus on what is best for the community</li>
              <li>Show empathy towards other community members</li>
              <li>Provide and accept constructive feedback gracefully</li>
            </ul>
          </div>
        </div>

        {/* Connect */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://github.com/always-further/deepfabric"
              className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <Link
              href="https://github.com/always-further/deepfabric/discussions"
              className="px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discussions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
