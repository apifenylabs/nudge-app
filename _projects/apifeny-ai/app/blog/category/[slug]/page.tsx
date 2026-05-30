import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';
import { getAllPosts } from '@/lib/blog-data';
import { getAllCategories, getCategoryBySlug } from '@/lib/blog-categories';
import type { BlogCategory } from '@/lib/blog-categories';
import type { BlogPost } from '@/lib/blog-data';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

const BASE_URL = 'https://apifeny-ai.vercel.app';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllCategories().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    keywords: cat.keywords,
    alternates: { canonical: `${BASE_URL}/blog/category/${cat.slug}` },
    openGraph: {
      title: cat.seoTitle,
      description: cat.seoDescription,
      url: `${BASE_URL}/blog/category/${cat.slug}`,
      siteName: 'Apifeny AI',
      type: 'website',
      images: [{ url: '/og', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cat.seoTitle,
      description: cat.seoDescription,
      images: ['/og'],
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const allPosts = getAllPosts();
  const matchingPosts = allPosts
    .filter(post =>
      post.tags.some(t => cat.tags.map(t => t.toLowerCase()).includes(t.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (matchingPosts.length === 0) notFound();

  // Collect all unique tags from matching posts for "refine by tag"
  const relatedTags = [...new Set(matchingPosts.flatMap(p => p.tags))]
    .filter(t => !cat.tags.some(ct => ct.toLowerCase() === t.toLowerCase()))
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: cat.title, item: `/blog/category/${cat.slug}` },
        ]}
      />

      {/* Category Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-700 transition">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-700 transition">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 capitalize">{cat.slug.replace(/-/g, ' ')}</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 uppercase tracking-wider">
              Topic Cluster
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 max-w-3xl">
            {cat.title}
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-4">
            {cat.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <strong className="text-gray-900 font-semibold">{matchingPosts.length}</strong> guides
            </span>
            {relatedTags.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Tag className="w-4 h-4" />
                <span>{relatedTags.length} subtopics</span>
              </span>
            )}
          </div>

          {/* Refine by tag chips */}
          {relatedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="text-xs text-gray-400 font-medium mt-0.5 mr-1">Refine:</span>
              {relatedTags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200 text-gray-600 bg-gray-50 cursor-default"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Post Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {matchingPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No guides in this category yet. Check back soon.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 mt-4 text-blue-600 hover:underline"
            >
              Browse all guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {matchingPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all hover:shadow-lg hover:shadow-blue-100/50"
                >
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-blue-200 text-blue-600 bg-blue-50"
                        >
                          {tag.replace(/-/g, ' ')}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-[10px] text-gray-400">+{post.tags.length - 3}</span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Explore More Topics */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Explore More Topics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {getAllCategories()
                  .filter(c => c.slug !== params.slug)
                  .slice(0, 8)
                  .map(otherCat => {
                    const count = allPosts.filter(p =>
                      p.tags.some(t => otherCat.tags.map(ct => ct.toLowerCase()).includes(t.toLowerCase()))
                    ).length;
                    return (
                      <Link
                        key={otherCat.slug}
                        href={`/blog/category/${otherCat.slug}`}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
                      >
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition">
                          {otherCat.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">{count} guides</p>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Schema structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${BASE_URL}/blog` },
              { "@type": "ListItem", "position": 3, "name": cat.title, "item": `${BASE_URL}/blog/category/${cat.slug}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": cat.seoTitle,
            "description": cat.seoDescription,
            "url": `${BASE_URL}/blog/category/${cat.slug}`,
            "about": cat.keywords.join(", "),
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": matchingPosts.slice(0, 20).map((post, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "url": `${BASE_URL}/blog/${post.slug}`,
              })),
            },
          }),
        }}
      />
    </main>
  );
}
