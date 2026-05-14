import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Accessibility } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '@/lib/blog-data';
import BlogBookingCTA from '@/components/BlogBookingCTA';

const BASE_URL = 'https://seniorfriendlytravel.asia';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} — Senior-Friendly Travel Asia`,
    description: post.excerpt.slice(0, 158),
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt.slice(0, 158),
      url: `${BASE_URL}/blog/${post.slug}`,
      ...(post.imageUrl ? { images: [{ url: post.imageUrl, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const paragraphs = post.content.split('\n').filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-teal-700 font-semibold text-sm">
            <Accessibility className="w-5 h-5" />
            <span>Senior-Friendly Travel Asia</span>
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-teal-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-teal-50 text-teal-700 capitalize"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>

            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-teal-700 prose-a:font-medium prose-strong:text-gray-900 prose-ul:list-disc prose-li:text-gray-700">
              {paragraphs.map((line, i) => {
                // Headers
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-3">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('#### ')) {
                  return (
                    <h4 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">
                      {line.replace('#### ', '')}
                    </h4>
                  );
                }
                // Bullet points
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*(.*)/);
                  if (match) {
                    return (
                      <p key={i} className="text-gray-700 my-2">
                        <strong className="font-semibold text-gray-900">{match[1]}</strong>
                        {match[2]}
                      </p>
                    );
                  }
                }
                if (line.startsWith('- ')) {
                  return (
                    <li key={i} className="text-gray-700 ml-6 -mt-1">
                      {line.replace('- ', '')}
                    </li>
                  );
                }
                // Numbers
                if (/^\d+\./.test(line)) {
                  return (
                    <p key={i} className="text-gray-700 my-2 ml-4">
                      {line}
                    </p>
                  );
                }
                // Bold labels
                if (line.startsWith('**') && line.includes('** ')) {
                  const match = line.match(/\*\*(.+?)\*\*(.*)/);
                  if (match) {
                    return (
                      <p key={i} className="text-gray-700 my-2">
                        <strong className="font-semibold text-gray-900">{match[1]}</strong>
                        {match[2]}
                      </p>
                    );
                  }
                }
                // Empty line
                if (!line.trim()) {
                  return <div key={i} className="h-4" />;
                }
                // Regular paragraph
                return (
                  <p key={i} className="text-gray-700 my-3 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Affiliate CTA — tag-matched booking partners */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <BlogBookingCTA post={post} />
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 hover:text-teal-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all articles</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
