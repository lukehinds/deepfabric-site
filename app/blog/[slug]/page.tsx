import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';
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
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="font-medium text-foreground">{post.author}</span>
              <span>-</span>
              <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 border border-border rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-foreground mt-10 mb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary hover:underline transition-colors"
                  >
                    {children}
                  </a>
                ),
                code: ({ className, children }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : undefined;

                  if (!language) {
                    return (
                      <code className="bg-muted text-primary px-2 py-1 rounded text-sm font-mono">
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
                  <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
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
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full font-medium hover:bg-muted transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
