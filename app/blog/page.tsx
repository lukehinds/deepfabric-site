import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import SectionTitle from '@/components/SectionTitle';
import ArcadeCard from '@/components/ArcadeCard';
import { format } from 'date-fns';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionTitle>Blog</SectionTitle>
          <p className="text-xl text-gray-300">
            DeepFabric updates, tutorials, and insights from the community.
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <ArcadeCard glowColor="cyan">
            <div className="text-center py-12">
              <p className="text-gray-300 text-lg">
                No blog posts yet. Check back soon for cosmic updates!
              </p>
            </div>
          </ArcadeCard>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <ArcadeCard
                  glowColor={
                    index % 3 === 0 ? 'cyan' : index % 3 === 1 ? 'pink' : 'purple'
                  }
                  className="cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-grow">
                      <h2 className="font-arcade text-lg md:text-xl text-neon-cyan mb-3 hover:text-neon-pink transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{post.description}</p>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-3 py-1 border border-neon-cyan/50 text-neon-cyan"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </ArcadeCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
