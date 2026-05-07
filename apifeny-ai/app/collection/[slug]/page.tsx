import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookmarkPlus } from 'lucide-react';
import { collections, getCollectionBySlug, getAllCollectionSlugs } from '@/lib/collections';
import { toolsData } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

interface CollectionPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: 'Collection Not Found' };

  return {
    title: collection.meta_title || collection.title,
    description: collection.meta_description || collection.description,
    openGraph: {
      title: `${collection.title} — Apifeny AI`,
      description: collection.meta_description || collection.description,
    },
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const tools = collection.tool_slugs
    .map((slug) => toolsData.find((t) => t.slug === slug && t.is_published))
    .filter(Boolean) as typeof toolsData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1.5 text-sm text-tech-200 hover:text-white transition mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition" />
        All Tools
      </Link>

      {/* Collection Hero */}
      <div
        className={`rounded-xl bg-gradient-to-r ${collection.gradient} bg-tech-700/90 border border-tech-500/30 p-6 sm:p-8 mb-6 sm:mb-8 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-tech-grid opacity-30" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{collection.icon}</span>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 uppercase tracking-wider">
              Curated Collection
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{collection.title}</h1>
          <p className="text-sm sm:text-base text-tech-100 max-w-2xl mb-4">
            {collection.description}
          </p>
          <div className="flex items-center gap-3 text-xs text-tech-200">
            <span className="flex items-center gap-1">
              <BookmarkPlus className="w-3.5 h-3.5" />
              {tools.length} tools
            </span>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-tech-200">No tools found in this collection yet.</p>
        </div>
      )}
    </div>
  );
}
