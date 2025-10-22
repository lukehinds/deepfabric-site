import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
import ArcadeButton from '@/components/ArcadeButton';
import SpacemanFloat from '@/components/SpacemanFloat';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/CodeBlock';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <ArcadeButton href="/blog" variant="cyan">
            ← Back to Blog
          </ArcadeButton>
        </div>

        {/* Article Header */}
        <article className="neon-border bg-space-dark/60 backdrop-blur-sm p-8 md:p-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-grow">
              <h1 className="font-arcade text-2xl md:text-4xl text-neon-cyan mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <span className="text-white">{post.author}</span>
                <span>•</span>
                <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 border border-neon-pink text-neon-pink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden md:block ml-4">
              <SpacemanFloat spacemanNumber={1} size={100} />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-cyan max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="font-arcade text-3xl text-neon-cyan mt-8 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-arcade text-2xl text-neon-pink mt-6 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-arcade text-xl text-neon-purple mt-4 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-neon-cyan hover:text-neon-pink transition-colors underline"
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : undefined;

                  if (!language) {
                    return (
                      <code className="bg-black/50 text-neon-cyan px-2 py-1 rounded text-sm">
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock language={language}>
                      {String(children).replace(/\n$/, '')}
                    </CodeBlock>
                  );
                },
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-neon-purple pl-4 italic text-gray-400 my-4">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-8 text-center">
          <ArcadeButton href="/blog" variant="pink">
            ← Back to All Posts
          </ArcadeButton>
        </div>
      </div>
    </div>
  );
}
