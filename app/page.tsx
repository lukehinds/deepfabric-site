import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="pt-12 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo + Title Row */}
          <div className="flex items-center justify-center gap-5 mb-6">
            <Image
              src="/chem.png"
              alt="DeepFabric"
              width={120}
              height={120}
              priority
            />
            <h1 className="text-5xl md:text-7xl font-bold text-foreground">
              DeepFabric
            </h1>
          </div>

          {/* Tagline */}
          <h2 className="text-xl md:text-2xl font-medium text-foreground mb-4 leading-tight">
            <span className="text-primary italic">Focused Training</span> for more <span className="text-primary italic">Grounded</span> and <span className="text-primary italic">Efficient</span> Models
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            DeepFabric is a comprehensive LLM fine-tuning framework designed to help you build smaller, smarter models that punch above their weight.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            Create high-quality training datasets - including complex reasoning chains - with precise tool execution and significantly reduced hallucinations. Whether you are fine-tuning for domain expertise, agentic workflows, or structured outputs, DeepFabric gives you the control to shape model behavior exactly how you need it.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            The result? Fine-tuned models that can match or outperform from frontier labs, while running on a fraction of the hardware. You get the cost efficiency of a smaller model, the performance of a larger one, and all the security and privacy benefits of keeping everything local.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="https://github.com/always-further/deepfabric"
              className="px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Link>
            <Link
              href="https://docs.deepfabric.dev"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground tracking-wide mb-2">ARCHITECTURE</p>
            <h2 className="text-3xl md:text-4xl font-bold">
              How DeepFabric Works
            </h2>
          </div>
          <div className="glass-panel p-4 md:p-8">
            <Image
              src="/pipeline.png"
              alt="DeepFabric Architecture Pipeline"
              width={1200}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Why SLMs Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-primary font-bold tracking-wide mb-5">Why DeepFabric?</p>
              <p className="text-md text-muted-foreground mb-4">
                What sets DeepFabric apart from other tools is its ability to ensure high diversity yet domain-anchored relevance through unique topic graph generation algorithms. This guides sample creation to cover all necessary subtopics while avoiding redundancy, which is where other tools often fall short, resulting in model overfit.
              </p>
              <p className="text-md text-muted-foreground mb-8">
                Once your dataset is generated, directly imported into training frameworks like TRL, Unsloth, and Axolotl. DeepFabric's built-in evaluation engine assesses model performance, whereby models prove their capabilities on unseen tasks derived from training splits—covering evaluation-only questions, answers, and tool traces.
              </p>
              <Link
                href="https://docs.deepfabric.dev"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the docs
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Visual representation */}
            <div className="glass-panel p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Standard Approach</h4>
                    <p className="text-sm text-muted-foreground">
                      Repetitive samples, simulated tool outputs, no validation.
                      Models overfit and hallucinate.
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-border ml-4 h-8" />

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">DeepFabric Approach</h4>
                    <p className="text-sm text-muted-foreground">
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Open source and community driven
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                DeepFabric is built in the open. Join our community to contribute,
                share datasets, and help make small models more capable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://github.com/always-further/deepfabric"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all"
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all"
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
