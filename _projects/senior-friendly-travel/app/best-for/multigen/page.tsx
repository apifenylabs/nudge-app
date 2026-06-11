import { Metadata } from 'next';
import Link from 'next/link';
import destinations from '@/data/destinations.json';

export const metadata: Metadata = {
  title: 'Best Multi-Generational Family Destinations in Asia | Asia Family Travel Directory',
  description: 'Plan the perfect multi-generational family trip in Asia. Destinations with activities for grandparents, parents, kids, and teens — everyone together.',
  openGraph: {
    title: 'Multi-Generational Travel — Asia Family Travel',
    description: 'Destinations that work for grandparents, parents, and kids traveling together.',
  },
};

interface Destination {
  id: string;
  name: string;
  city: string;
  country: string;
  category: string;
  safetyRating: number;
  description: string;
  ageRange: string;
  imageUrl?: string;
  slug?: string;
}

export default function BestMultigenPage() {
  const data = destinations as Destination[];
  const multigen = data.filter(d => {
    return d.ageRange === 'All Ages' || d.ageRange === '0-99';
  }).slice(0, 20);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-purple-300 font-semibold text-sm uppercase tracking-wider">Multi-Generational</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            👨‍👩‍👧‍👦 Multi-Generational Travel
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl leading-relaxed">
            Perfect destinations when grandparents, parents, and kids travel together. 
            Activities for every age, accessible spaces, and plenty of downtime options.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {multigen.map(d => (
            <div key={d.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-1">
                <Link href={`/destination/${d.slug || d.id}`} className="hover:text-purple-600 transition-colors">
                  {d.name}
                </Link>
              </h2>
              <p className="text-xs text-gray-500 mb-2">{d.city}, {d.country} · Ages {d.ageRange}</p>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{d.description}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 font-semibold text-sm">{d.safetyRating}</span>
                <span className="text-yellow-400 text-xs">★</span>
                <span className="text-gray-400 text-xs ml-1">Safety</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/search" className="inline-flex items-center gap-2 bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-purple-700 transition-all shadow-sm">
            Browse All Destinations
          </Link>
        </div>
      </section>
    </main>
  );
}
