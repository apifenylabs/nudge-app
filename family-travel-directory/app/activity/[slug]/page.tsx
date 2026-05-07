import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';
import { MapPin, Star, Calendar, ChevronRight, ExternalLink, Lightbulb, Sparkles, Compass, Zap } from 'lucide-react';
import DestinationCard from '@/components/DestinationCard';

interface LongTailPage {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  intro: string;
  outro: string;
  city: string;
  country: string;
  destination_count: number;
  categories: string[];
  age_tiers: string[];
  primary_age_tier: string;
  slug_phrases: string[];
  destination_ids: string[];
  graph: any;
}

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  ageRange: string;
  safetyRating: number;
  priceRange: string;
  popularity: number;
  description: string;
  imageUrl: string;
  tipsAndTricks: string[];
  amenities?: string[];
  isNew?: boolean;
  parentStory?: any;
  information_gain?: { human_verified_tip?: string | null; };
}

async function getIndex(): Promise<LongTailPage[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'longtail-index.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function getDestinations(): Promise<Destination[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'destinations.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const index = await getIndex();
  return index.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const index = await getIndex();
  const page = index.find(p => p.slug === params.slug);
  if (!page) return { title: 'Page Not Found' };

  return {
    title: page.meta_title,
    description: page.meta_description,
    openGraph: {
      title: page.meta_title,
      description: page.meta_description,
      url: `https://www.familytravelasia.com/activity/${page.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.familytravelasia.com/activity/${page.slug}`,
    },
  };
}

export default async function LongTailPage({ params }: { params: { slug: string } }) {
  const [index, allDestinations] = await Promise.all([getIndex(), getDestinations()]);
  const page = index.find(p => p.slug === params.slug);
  if (!page) notFound();

  const destinations = page.destination_ids
    .map(id => allDestinations.find(d => d.id === id))
    .filter((d): d is Destination => d !== undefined);

  // Age tier label
  const ageLabels: Record<string, string> = {
    'toddlers': 'Toddler-Friendly (Ages 0-3)',
    'preschoolers': 'Preschooler-Friendly (Ages 4-5)',
    'young-kids': 'Great for Young Kids (Ages 6-8)',
    'school-age': 'Perfect for School-Age (Ages 9-12)',
    'teens': 'Teen-Approved (Ages 13+)',
    'all-ages': 'Fun for All Ages',
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page.graph) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-sky-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white font-medium">{page.city} Family Activities</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {page.h1}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-sky-200 mb-6">
            <span className="flex items-center gap-1"><MapPin size={14} /> {page.city}, {page.country}</span>
            <span className="flex items-center gap-1"><Compass size={14} /> {page.destination_count} attractions</span>
            <span className="flex items-center gap-1"><Star size={14} /> {ageLabels[page.primary_age_tier] || 'Family-Friendly'}</span>
          </div>
          <p className="text-base sm:text-lg text-sky-100 max-w-3xl leading-relaxed">
            {page.intro}
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {destinations.map(d => (
            <DestinationCard
              key={d.id}
              id={d.id} name={d.name} city={d.city} country={d.country}
              category={d.category} ageRange={d.ageRange} safetyRating={d.safetyRating}
              priceRange={d.priceRange} popularity={d.popularity} description={d.description}
              imageUrl={d.imageUrl} tipsCount={d.tipsAndTricks?.length || 0}
              parentStory={!!d.parentStory} amenities={d.amenities || []}
              isNew={d.isNew}
              human_verified_tip={d.information_gain?.human_verified_tip}
            />
          ))}
        </div>

        {/* Age-specific navigation */}
        {page.slug_phrases.length > 1 && (
          <div className="mt-10 p-5 bg-white border border-gray-200 rounded-2xl">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">More Ways to Explore {page.city}</h3>
            <div className="flex flex-wrap gap-2">
              {page.slug_phrases.map(phrase => (
                <Link
                  key={phrase}
                  href={`/activity/${phrase}`}
                  className="text-xs bg-gray-100 hover:bg-sky-50 hover:text-sky-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                >
                  {phrase.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Outro */}
        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-sky-600" />
            <h3 className="font-semibold text-gray-900">Planning Your {page.city} Trip?</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{page.outro}</p>
          <Link
            href={`/search?city=${encodeURIComponent(page.city)}`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700 transition-colors"
          >
            Search all {page.city} destinations <ExternalLink size={12} />
          </Link>
        </div>
      </section>
    </main>
  );
}
