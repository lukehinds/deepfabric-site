import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { format } from 'date-fns';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            DeepFabric updates, tutorials, and insights from the community.
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="glass-panel p-12 text-center">
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon for updates!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="glass-panel p-6 md:p-8 hover:border-primary/50 transition-colors cursor-pointer">
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>{post.author}</span>
                    <span>-</span>
                    <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
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
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
