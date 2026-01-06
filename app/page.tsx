import Link from 'next/link';
import Image from 'next/image';

function PipelineNode({ label, sublabel, delay }: { label: string; sublabel: string; delay: string }) {
  return (
    <div className={`flex flex-col items-center animate-fade-in ${delay}`}>
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border border-border bg-card flex items-center justify-center relative group hover:border-primary/50 transition-colors">
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-xs md:text-sm font-mono text-muted-foreground text-center px-2 relative z-10">{label}</span>
      </div>
      <span className="mt-3 text-xs text-muted-foreground">{sublabel}</span>
    </div>
  );
}

function PipelineConnector({ delay }: { delay: string }) {
  return (
    <div className={`hidden md:flex items-center animate-fade-in ${delay}`}>
      <svg width="60" height="20" viewBox="0 0 60 20" className="text-border">
        <line
          x1="0"
          y1="10"
          x2="48"
          y2="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="6 4"
          className="animate-flow-dash"
        />
        <polygon
          points="48,5 58,10 48,15"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="pt-8 pb-16 px-4 blueprint-grid relative overflow-hidden">
        {/* Gradient overlay to fade out grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Logo + Title */}
          <div className="flex items-center justify-center gap-4 mb-4 animate-fade-in">
            <Image
              src="/chem.png"
              alt="DeepFabric"
              width={80}
              height={80}
              priority
              className="md:w-[100px] md:h-[100px]"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              DeepFabric
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-lg md:text-xl font-medium text-center text-muted-foreground mb-2 animate-fade-in-delay-1">
            Build smaller, smarter models that punch above their weight
          </h2>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto animate-fade-in-delay-2">
            High-quality synthetic datasets with <span className="text-foreground font-medium">real tool execution</span>,
            {' '}<span className="text-foreground font-medium">diverse topic graphs</span>, and
            {' '}<span className="text-foreground font-medium">built-in evaluation</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 animate-fade-in-delay-3">
            <Link
              href="https://github.com/always-further/deepfabric"
              className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
            <Link
              href="https://docs.deepfabric.dev"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </div>

          {/* Pipeline Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            <PipelineNode label="Domain Input" sublabel="Topic of Expertise" delay="animate-fade-in-delay-1" />
            <PipelineConnector delay="animate-fade-in-delay-1" />
            <PipelineNode label="Topic Graph" sublabel="Coverage without redundancy" delay="animate-fade-in-delay-2" />
            <PipelineConnector delay="animate-fade-in-delay-2" />
            <PipelineNode label="Training Samples" sublabel="Real tool execution" delay="animate-fade-in-delay-3" />
            <PipelineConnector delay="animate-fade-in-delay-3" />
            <PipelineNode label="Evaluation" sublabel="Prove capabilities" delay="animate-fade-in-delay-4" />
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs font-mono text-muted-foreground tracking-widest mb-2">ARCHITECTURE</p>
            <h2 className="text-2xl md:text-3xl font-bold">
              How DeepFabric Pipeline Works
            </h2>
          </div>
          <div className="glass-panel p-4 md:p-8 blueprint-grid-dense relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-card/80 pointer-events-none" />
            <Image
              src="/pipeline.png"
              alt="DeepFabric Architecture Pipeline"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Why DeepFabric Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-mono text-primary tracking-widest mb-4">WHY DEEPFABRIC</p>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Domain-anchored diversity without redundancy
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Unique topic graph generation ensures comprehensive coverage of your domain
                while avoiding the repetitive samples that cause model overfit.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Export directly to TRL, Unsloth, or Axolotl. Evaluate on unseen tasks
                derived from training splits.
              </p>
              <Link
                href="https://docs.deepfabric.dev"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the documentation
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Comparison Panel */}
            <div className="glass-panel p-6 md:p-8">
              <div className="space-y-6">
                {/* Standard Approach */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Standard Approach</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Repetitive samples, simulated tool outputs, no validation.
                      Models overfit and hallucinate.
                    </p>
                  </div>
                </div>

                {/* Visual connector */}
                <div className="flex items-center gap-2 pl-5">
                  <div className="w-px h-8 bg-border" />
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                {/* DeepFabric Approach */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 animate-node-pulse">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">DeepFabric Approach</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Diverse topic graphs, real tool execution, strict validation.
                      Models are grounded and efficient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-8 md:p-12 text-center relative overflow-hidden">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Open source and community driven
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Built in the open. Contribute, share datasets, and help make small models more capable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="https://github.com/always-further/deepfabric"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Star on GitHub
                </Link>
                <Link
                  href="https://docs.deepfabric.dev"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
