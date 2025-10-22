import SectionTitle from '@/components/SectionTitle';
import ArcadeCard from '@/components/ArcadeCard';
import ArcadeButton from '@/components/ArcadeButton';
import SpacemanFloat from '@/components/SpacemanFloat';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 right-0 hidden lg:block">
            <SpacemanFloat spacemanNumber={2} size={120} />
          </div>
          <SectionTitle>Documentation</SectionTitle>
          <p className="text-xl text-gray-300">
            Everything you need to get started with DeepFabric
          </p>
        </div>

        {/* Quick Start */}
        <ArcadeCard glowColor="cyan" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-cyan mb-4">
            Quick Start
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-bold mb-2">1. Installation</h4>
              <div className="bg-black/50 p-4 rounded border border-neon-cyan/30">
                <code className="text-neon-cyan text-sm">
                  npm install deepfabric
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">2. Basic Usage</h4>
              <div className="bg-black/50 p-4 rounded border border-neon-cyan/30">
                <code className="text-neon-cyan text-sm">
                  import &#123; DeepFabric &#125; from 'deepfabric'
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">3. Start Building</h4>
              <p className="text-gray-300 text-sm">
                Check out our examples and guides to start building amazing projects!
              </p>
            </div>
          </div>
        </ArcadeCard>

        {/* Core Concepts */}
        <ArcadeCard glowColor="pink" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-pink mb-4">
            Core Concepts
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">Components</h4>
              <p className="text-sm">
                Reusable building blocks for your arcade-themed applications.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Theming</h4>
              <p className="text-sm">
                Customize colors, fonts, and effects to match your vision.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Animations</h4>
              <p className="text-sm">
                Built-in animations for that retro arcade feel.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Static Export</h4>
              <p className="text-sm">
                Deploy anywhere with full static site generation.
              </p>
            </div>
          </div>
        </ArcadeCard>

        {/* API Reference */}
        <ArcadeCard glowColor="purple" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-purple mb-4">
            API Reference
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">ArcadeButton</h4>
              <p>Interactive button component with neon effects</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">ArcadeCard</h4>
              <p>Container component with glowing borders</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">SpacemanFloat</h4>
              <p>Animated spaceman character component</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">StarField</h4>
              <p>Animated background with floating stars</p>
            </div>
          </div>
        </ArcadeCard>

        {/* Resources */}
        <div className="text-center mt-12">
          <h3 className="font-arcade text-xl text-neon-cyan mb-6">
            Additional Resources
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <ArcadeButton href="/blog" variant="cyan">
              Blog Posts
            </ArcadeButton>
            <ArcadeButton href="/community" variant="pink">
              Community
            </ArcadeButton>
            <ArcadeButton href="https://github.com" variant="purple">
              GitHub
            </ArcadeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
