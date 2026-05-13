import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Kids Activities Asia',
  description: 'Parenting tips, activity guides, safety advice, and family travel inspiration across Asia. Expert articles for parents in Hong Kong, Singapore, Bangkok, Tokyo, and beyond.',
  openGraph: {
    title: 'Blog | Kids Activities Asia',
    description: 'Parenting tips, activity guides, safety advice, and family travel inspiration across Asia.',
    type: 'website',
  },
};

const TAG_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'parent-tips': { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  'activities': { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-400' },
  'safety': { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-400' },
  'reviews': { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-400' },
  'travel': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
  'education': { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  'birthday-parties': { bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-400' },
  'classes': { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-400' },
  'comparisons': { bg: 'bg-cyan-100', text: 'text-cyan-700', dot: 'bg-cyan-400' },
  'seasonal': { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-400' },
};

const TAG_LABELS: Record<string, string> = {
  'parent-tips': 'Parent Tips',
  'activities': 'Activities',
  'safety': 'Safety',
  'reviews': 'Reviews',
  'travel': 'Travel',
  'education': 'Education',
  'birthday-parties': 'Birthday Parties',
  'classes': 'Classes',
  'comparisons': 'Comparisons',
  'seasonal': 'Seasonal',
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PostCard({
  post,
  featured = false,
}: {
  post: { slug: string; title: string; excerpt: string; date: string; tags: string[]; readingTime?: number; imageUrl?: string };
  featured?: boolean;
}) {
  const tagColor = TAG_COLORS[post.tags[0]] || TAG_COLORS['activities'];

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="md:flex">
          <div className="md:w-2/5 h-56 md:h-auto bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50 flex items-center justify-center">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-7xl opacity-60">🎪</span>
            )}
          </div>
          <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium ${tagColor.bg} ${tagColor.text} px-2.5 py-1 rounded-full`}>
                {TAG_LABELS[post.tags[0]] || post.tags[0]}
              </span>
              {post.readingTime && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readingTime} min read
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-3">
              {post.title}
            </h2>
            <p className="text-gray-600 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="text-orange-500 font-medium group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
                Read more <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 card-hover"
    >
      <div className="h-44 bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center relative overflow-hidden">
        {post.imageUrl ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-5xl opacity-50">🎪</span>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map(tag => {
            const tc = TAG_COLORS[tag] || TAG_COLORS['activities'];
            return (
              <span key={tag} className={`text-xs font-medium ${tc.bg} ${tc.text} px-2 py-0.5 rounded-full`}>
                {TAG_LABELS[tag] || tag}
              </span>
            );
          })}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.date)}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.length > 0 ? posts[0] : null;
  const remaining = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <section className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span className="inline-block mr-2">📝</span>
          Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Parenting tips, activity guides, safety advice, and family travel inspiration 
          for families across Asia.
        </p>
      </section>

      {posts.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 md:py-24">
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Posts Yet</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            We&apos;re working on some amazing articles for you! Check back soon for 
            parenting tips, activity guides, and family travel inspiration across Asia.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors"
          >
            Browse Activities <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featured && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Featured
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-orange-200 to-transparent" />
              </div>
              <PostCard post={featured} featured />
            </section>
          )}

          {/* Remaining Posts */}
          {remaining.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <h2 className="text-lg font-semibold text-gray-900">Latest Articles</h2>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remaining.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Tags Cloud */}
          <section className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-500" />
              Browse by Topic
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(TAG_LABELS).map(([tag, label]) => {
                const tc = TAG_COLORS[tag] || TAG_COLORS['activities'];
                return (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className={`${tc.bg} ${tc.text} px-3 py-1.5 rounded-full text-sm font-medium hover:opacity-80 transition-opacity`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
