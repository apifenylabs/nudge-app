import { Metadata } from 'next';
import Link from 'next/link';
import destinations from '@/data/destinations.json';

export const metadata: Metadata = {
  title: 'Best Family Destinations for Teens in Asia | Asia Family Travel Directory',
  description: 'Top Asia destinations for traveling with teenagers. Adventure activities, cultural experiences, and tech-friendly spots that teens will actually enjoy.',
  openGraph: {
    title: 'Best for Teens — Asia Family Travel',
    description: 'Asia destinations teens will love — adventure activities, culture, and tech-friendly spots.',
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

export default function BestForTeensPage() {
  const data = destinations as Destination[];
  const teenFriendly = data.filter(d => {
    const high = parseInt(d.ageRange.split('-')[1] || '99');
    return high >= 10 || d.ageRange === 'All Ages' || d.ageRange.includes('+');
  }).slice(0, 20);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-amber-300 font-semibold text-sm uppercase tracking-wider">Best for Teens</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            🧑 Best for Teenagers
          </h1>
          <p className="text-lg text-amber-100 max-w-2xl leading-relaxed">
            Destinations that keep teenagers engaged and entertained. Adventure activities, 
            tech hubs, cultural experiences, and spaces where teens can be themselves.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teenFriendly.map(d => (
            <div key={d.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-gray-900 mb-1">
                <Link href={`/destination/${d.slug || d.id}`} className="hover:text-amber-600 transition-colors">
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
          <Link href="/search?ageRange=10+" className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-amber-700 transition-all shadow-sm">
            Browse All Teen-Friendly Destinations
          </Link>
        </div>
      </section>
    </main>
  );
}
