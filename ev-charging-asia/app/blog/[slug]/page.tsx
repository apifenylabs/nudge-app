import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Zap, Calendar, BookOpen, Tag, ArrowLeft } from 'lucide-react';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog-data';
import EvBookingCTA from './EvBookingCTA';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} — EV Charging Asia Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
            <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
            <span className="flex items-center gap-1"><BookOpen size={12} />{post.readingTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                <Tag size={10} />{tag.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-600 font-medium">{post.excerpt}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
          <div className="prose prose-gray max-w-none text-sm leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Affiliate CTA — EV rentals, hotels, experiences */}
        <EvBookingCTA tags={post.tags} />

        {related.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}
                  className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
                  <div className="text-xs text-gray-400 mb-1">{rp.date}</div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{rp.title}</h4>
                  <p className="text-xs text-gray-500 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

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
