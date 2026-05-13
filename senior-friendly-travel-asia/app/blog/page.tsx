import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, ArrowLeft, Accessibility } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Senior Travel Blog — Accessible Travel Tips for Asia',
  description: 'Practical advice for senior travelers exploring Asia. Guides on accessible transport, healthcare, senior discounts, packing, and destination reviews for the 60+ traveler.',
  openGraph: {
    title: 'Senior-Friendly Travel Asia — Blog',
    description: 'Practical travel guides and tips for seniors exploring Asia.',
  },
};

const TAG_COLORS: Record<string, string> = {
  'city-guides': 'bg-blue-100 text-blue-700',
  'top-10': 'bg-amber-100 text-amber-700',
  'planning': 'bg-emerald-100 text-emerald-700',
  'accommodation': 'bg-violet-100 text-violet-700',
  'transport': 'bg-cyan-100 text-cyan-700',
  'accessibility': 'bg-teal-100 text-teal-700',
  'healthcare': 'bg-rose-100 text-rose-700',
  'safety': 'bg-orange-100 text-orange-700',
  'insurance': 'bg-indigo-100 text-indigo-700',
  'budget': 'bg-lime-100 text-lime-700',
  'discounts': 'bg-yellow-100 text-yellow-700',
  'packing': 'bg-purple-100 text-purple-700',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
            <Accessibility className="w-5 h-5" />
            <span>Senior-Friendly Travel Asia</span>
          </Link>
          <Link href="/destinations" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-4 h-4" /> Destinations
          </Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Blog</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-3">
            Senior Travel Guides & Tips
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            Practical advice for the 60+ traveler exploring Asia. From accessible transport 
            guides to packing lists and senior discount hacks.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 rounded-full text-xs ${TAG_COLORS[tag] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">Blog posts coming soon</h3>
            <p className="text-gray-400 mt-1">We&apos;re writing practical guides for senior travelers.</p>
          </div>
        )}
      </section>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-500">
          <p>&copy; 2026 Senior-Friendly Travel Asia</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-teal-600">About</Link>
            <Link href="/privacy" className="hover:text-teal-600">Privacy</Link>
            <Link href="/contact" className="hover:text-teal-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
