import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, User, Sparkles, BookOpen, Layers } from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getRelatedPostsByCategory } from '@/lib/blog-data';
import type { BlogPost } from '@/lib/blog-data';
import BlogAffiliateCTA from '../../components/BlogAffiliateCTA';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';
const SLUG = 'best-ai-tools-philippines-2026';

export const metadata: Metadata = {
  title: 'Top AI Tools in the Philippines for 2026: Boost Your Business',
  description: 'From Manila to Cebu — the definitive guide to AI tools that work for Filipino entrepreneurs and SMEs in 2026.',
  keywords: ['philippines', 'ai-tools', 'business-automation', 'small-business', 'filipino-entrepreneurs', 'asia', 'productivity'],
  alternates: { canonical: `${BASE_URL}/blog/${SLUG}` },
  openGraph: {
    title: 'Top AI Tools in the Philippines for 2026: Boost Your Business',
    description: 'From Manila to Cebu — the definitive guide to AI tools that work for Filipino entrepreneurs and SMEs in 2026.',
    url: `${BASE_URL}/blog/${SLUG}`,
    type: 'article',
    siteName: 'Apifeny AI',
    images: [{ url: '/og', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top AI Tools in the Philippines for 2026: Boost Your Business',
    description: 'From Manila to Cebu — the definitive guide to AI tools that work for Filipino entrepreneurs and SMEs in 2026.',
    images: ['/og'],
  },
};

export default function PhilippinesAIToolsPage() {
  const post = getPostBySlug(SLUG);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(SLUG, 3);
  const categoryRelated = getRelatedPostsByCategory(SLUG, 4);

  return (
    <div className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-blue-200 text-blue-700 bg-blue-50"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="prose prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        <BlogAffiliateCTA
          postSlug={post.slug}
          postTags={post.tags}
          postTitle={post.title}
        />

        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50"
              >
                {tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </article>

      {categoryRelated.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-2 mb-8">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryRelated.map(({ post: related, category }) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all hover:shadow-md flex flex-col"
                >
                  {category && (
                    <span className="self-start inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 mb-3">
                      <Layers className="w-2.5 h-2.5" />
                      {category.title.length > 28 ? category.title.substring(0, 26) + '…' : category.title}
                    </span>
                  )}
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
                    {related.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-blue-600 group-hover:gap-2 transition-all mt-auto">
                    Read Article
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "articleBody": post.content.substring(0, 5000),
            "datePublished": post.date,
            "dateModified": post.date,
            "author": { "@type": "Person", "name": post.author },
            "publisher": { "@type": "Organization", "name": "Apifeny AI", "url": BASE_URL },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
            "keywords": post.tags.join(", "),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
              { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${post.slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
