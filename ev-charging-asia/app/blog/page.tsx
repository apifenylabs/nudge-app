import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Calendar, BookOpen, Tag, ChevronRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog — EV Charging Asia',
  description: 'Guides, comparisons, and tips about EV charging across Asia. Learn about charging standards, stations, and road trips.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/search" className="hover:text-gray-900">Search</Link>
            <Link href="/about" className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-8">EV charging guides, comparisons, and tips for Asia</p>

        {posts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-400">No articles yet. Check back soon!</p>
          </div>
        )}

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                <span className="flex items-center gap-1"><BookOpen size={12} />{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    <Tag size={10} />{tag.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-sky-600 group-hover:text-sky-700 flex items-center gap-1">
                Read more <ChevronRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Zap size={16} className="text-green-500" />
            <span className="text-sm">EV Charging Asia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
