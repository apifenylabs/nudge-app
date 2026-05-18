import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';

const BASE_URL = 'https://apifeny.ai';

export const metadata: Metadata = {
  title: 'AI Tools Blog & Guides | Apifeny AI',
  description: 'Expert guides, comparisons, and practical tips for AI tools and agents. Discover the best AI for your workflow in Asia.',
  keywords: ['AI tools blog', 'AI guides', 'AI comparison', 'Asia AI tools', 'AI productivity', 'solopreneur AI'],
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'AI Tools Blog & Guides | Apifeny AI',
    description: 'Expert guides, comparisons, and practical tips for AI tools and agents.',
    url: `${BASE_URL}/blog`,
    siteName: 'Apifeny AI',
    type: 'website',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Apifeny AI Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Blog & Guides',
    description: 'Expert guides, comparisons, and practical tips for AI tools and agents.',
    images: ['/og'],
  },
};

function getTagVariant(tag: string): string {
  const variants: Record<string, string> = {
    'ai-tools': 'border-neon/30 text-neon-light bg-neon/10',
    'comparison': 'border-aqua/30 text-aqua bg-aqua/10',
    'solopreneur': 'border-purple-400/30 text-purple-300 bg-purple-400/10',
    'productivity': 'border-yellow-400/30 text-yellow-300 bg-yellow-400/10',
    'coding': 'border-green-400/30 text-green-300 bg-green-400/10',
    'translation': 'border-blue-400/30 text-blue-300 bg-blue-400/10',
    'automation': 'border-orange-400/30 text-orange-300 bg-orange-400/10',
    'marketing-automation': 'border-pink-400/30 text-pink-300 bg-pink-400/10',
    'development': 'border-cyan-400/30 text-cyan-300 bg-cyan-400/10',
    'programming': 'border-indigo-400/30 text-indigo-300 bg-indigo-400/10',
  };
  return variants[tag] || 'border-tech-400/30 text-tech-200 bg-tech-700/50';
}

export default function BlogListPage() {
  const posts = getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-tech-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-neon" />
            <span className="text-sm font-medium text-neon-light uppercase tracking-wider">Blog & Guides</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl">
            AI Tools{' '}
            <span className="bg-gradient-to-r from-neon to-aqua bg-clip-text text-transparent">
              Guides & Insights
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-tech-200 max-w-2xl leading-relaxed">
            Expert reviews, comparisons, and practical guides to help you find and use the best AI tools for your workflow in Asia.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative bg-tech-800/40 border border-tech-500/20 rounded-xl overflow-hidden hover:border-neon/30 transition-all hover:shadow-lg hover:shadow-neon/5"
            >
              <div className="p-6 sm:p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getTagVariant(tag)}`}
                    >
                      {tag.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-neon-light transition mb-3 line-clamp-2">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-tech-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-tech-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime}
                  </span>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-1 text-sm font-medium text-neon-light group-hover:gap-2 transition-all">
                  Read Guide
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 text-tech-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-tech-200 mb-2">No posts yet</h2>
            <p className="text-tech-400">Blog posts are being generated. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="border-t border-tech-500/20 bg-tech-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Stay Ahead with AI Insights
            </h2>
            <p className="text-tech-300 mb-6">
              Get the latest AI tool reviews, guides, and Asia-focused tips delivered to your inbox.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neon hover:bg-neon-dark text-white font-medium transition"
            >
              Browse All Guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
            ],
          }),
        }}
      />
      {/* Schema.org BlogPosting collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "AI Tools Blog & Guides",
            "description": "Expert guides, comparisons, and practical tips for AI tools and agents.",
            "url": `${BASE_URL}/blog`,
            "isPartOf": { "@type": "WebSite", "name": "Apifeny AI", "url": BASE_URL },
          }),
        }}
      />
    </div>
  );
}
