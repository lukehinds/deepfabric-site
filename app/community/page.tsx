import SectionTitle from '@/components/SectionTitle';
import ArcadeCard from '@/components/ArcadeCard';
import ArcadeButton from '@/components/ArcadeButton';

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionTitle>Community</SectionTitle>
          <p className="text-xl text-gray-300">
            Join our cosmic crew of developers and contributors
          </p>
        </div>

        {/* How to Contribute */}
        <ArcadeCard glowColor="cyan" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-cyan mb-4">
            How to Contribute
          </h3>
          <div className="space-y-6 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">1. Fork the Repository</h4>
              <p className="text-sm mb-2">
                Start by forking the DeepFabric repository on GitHub.
              </p>
              <div className="bg-black/50 p-3 rounded border border-neon-cyan/30">
                <code className="text-neon-cyan text-sm">
                  git clone https://github.com/your-username/deepfabric.git
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">2. Create a Branch</h4>
              <p className="text-sm mb-2">
                Create a new branch for your feature or bug fix.
              </p>
              <div className="bg-black/50 p-3 rounded border border-neon-cyan/30">
                <code className="text-neon-cyan text-sm">
                  git checkout -b feature/amazing-feature
                </code>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">3. Make Your Changes</h4>
              <p className="text-sm">
                Write code, fix bugs, improve documentation - every contribution matters!
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">4. Submit a Pull Request</h4>
              <p className="text-sm">
                Push your changes and open a PR. We'll review it as soon as possible!
              </p>
            </div>
          </div>
        </ArcadeCard>

        {/* Ways to Contribute */}
        <ArcadeCard glowColor="pink" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-pink mb-4">
            Ways to Contribute
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
            <div className="neon-border p-4">
              <h4 className="font-bold text-white mb-2">Code</h4>
              <p>Add features, fix bugs, improve performance</p>
            </div>
            <div className="neon-border p-4">
              <h4 className="font-bold text-white mb-2">Documentation</h4>
              <p>Write guides, improve examples, fix typos</p>
            </div>
            <div className="neon-border p-4">
              <h4 className="font-bold text-white mb-2">Design</h4>
              <p>Create themes, improve UI/UX, add graphics</p>
            </div>
            <div className="neon-border p-4">
              <h4 className="font-bold text-white mb-2">Community</h4>
              <p>Help others, answer questions, share knowledge</p>
            </div>
          </div>
        </ArcadeCard>

        {/* Code of Conduct */}
        <ArcadeCard glowColor="purple" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-purple mb-4">
            Code of Conduct
          </h3>
          <div className="text-gray-300 space-y-4 text-sm">
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
        </ArcadeCard>

        {/* Connect */}
        <div className="text-center mt-12">
          <h3 className="font-arcade text-xl text-neon-cyan mb-6">
            Connect With Us
          </h3>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <ArcadeButton href="https://github.com/always-further/deepfabric" variant="cyan">
              GitHub
            </ArcadeButton>
            <ArcadeButton href="https://discord.com" variant="pink">
              Discord
            </ArcadeButton>
            <ArcadeButton href="https://twitter.com" variant="purple">
              Twitter
            </ArcadeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
