import { Metadata } from 'next';
import Link from 'next/link';
import destinations from '@/data/destinations.json';

export const metadata: Metadata = {
  title: 'Top 10 Family Destinations in Asia | Asia Family Travel Directory',
  description: 'The top 10 family-friendly destinations in Asia, ranked by parent reviews, safety ratings, and kid-friendliness. Plan your next family vacation with confidence.',
  openGraph: {
    title: 'Top 10 Family Destinations in Asia',
    description: 'The top 10 family-friendly destinations in Asia, ranked by parent reviews and safety ratings.',
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

function score(d: Destination): number {
  return (d.safetyRating || 0) * 10 + (d.name ? 5 : 0);
}

export default function Top10Page() {
  const data = destinations as Destination[];
  const top10 = data.sort((a, b) => score(b) - score(a)).slice(0, 10);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
          <span className="text-sky-300 font-semibold text-sm uppercase tracking-wider">Top 10</span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
            Top 10 Family Destinations in Asia
          </h1>
          <p className="text-lg text-sky-100 max-w-2xl leading-relaxed">
            Our editor-picked top 10 destinations for family travel in Asia, ranked by parent reviews,
            safety ratings, and activities for kids of all ages.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          {top10.map((d, i) => (
            <div key={d.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="text-3xl font-bold text-sky-600 w-10 shrink-0">{i + 1}</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  <Link href={`/destination/${d.slug || d.id}`} className="hover:text-sky-600 transition-colors">
                    {d.name}
                  </Link>
                </h2>
                <p className="text-sm text-gray-500 mb-1">{d.city}, {d.country} · Ages {d.ageRange} · Safety {d.safetyRating}/5</p>
                <p className="text-sm text-gray-600 line-clamp-2">{d.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-yellow-500 font-bold text-lg">{d.safetyRating}</span>
                <span className="text-yellow-400 text-sm">★</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/search" className="inline-flex items-center gap-2 bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-700 transition-all shadow-sm">
            Browse All Destinations
          </Link>
        </div>
      </section>
    </main>
  );
}
