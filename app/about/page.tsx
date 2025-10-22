import SectionTitle from '@/components/SectionTitle';
import ArcadeCard from '@/components/ArcadeCard';
import SpacemanFloat from '@/components/SpacemanFloat';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-5 -right-5 hidden md:block">
            <SpacemanFloat spacemanNumber={1} size={100} />
          </div>
          <SectionTitle>About DeepFabric</SectionTitle>
          <p className="text-xl text-gray-300">
            A cosmic journey through open source innovation
          </p>
        </div>

        {/* Mission */}
        <ArcadeCard glowColor="cyan" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-cyan mb-4">
            Our Mission
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            DeepFabric is an open source project dedicated to exploring the intersection
            of modern web technologies and creative, engaging user experiences.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We believe that development tools and documentation can be both functional
            and fun, combining the excitement of retro arcade games with the power of
            modern web technologies.
          </p>
        </ArcadeCard>

        {/* What We Do */}
        <ArcadeCard glowColor="pink" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-pink mb-4">
            What We Do
          </h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-bold text-white mb-2">Open Source Development</h4>
              <p className="text-sm">
                We build tools and libraries that help developers create amazing experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Community Building</h4>
              <p className="text-sm">
                We foster a welcoming community where developers of all skill levels can learn and contribute.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Innovation</h4>
              <p className="text-sm">
                We push boundaries by combining proven technologies with creative design approaches.
              </p>
            </div>
          </div>
        </ArcadeCard>

        {/* Tech Stack */}
        <ArcadeCard glowColor="purple" className="mb-8">
          <h3 className="font-arcade text-lg text-neon-purple mb-4">
            Tech Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="neon-border p-3 text-center">Next.js 15</div>
            <div className="neon-border p-3 text-center">TypeScript</div>
            <div className="neon-border p-3 text-center">Tailwind CSS</div>
            <div className="neon-border p-3 text-center">MDX</div>
            <div className="neon-border p-3 text-center">React 19</div>
            <div className="neon-border p-3 text-center">Shiki</div>
          </div>
        </ArcadeCard>

        {/* The Team */}
        <div className="text-center mt-16">
          <h3 className="font-arcade text-xl text-neon-cyan mb-8">
            The Crew
          </h3>
          <div className="flex justify-center gap-6 flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SpacemanFloat key={i} spacemanNumber={i as 1 | 2 | 3 | 4 | 5 | 6} size={80} />
            ))}
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Our team of space-faring developers exploring the cosmos of code
          </p>
        </div>
      </div>
    </div>
  );
}
