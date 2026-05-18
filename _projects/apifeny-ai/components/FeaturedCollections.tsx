'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { collections } from '@/lib/collections';

export default function FeaturedCollections() {
  const featured = collections.slice(0, 6);

  if (featured.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Collections</h2>
          <p className="text-xs sm:text-sm text-gray-500">Hand-picked tool sets for every use case</p>
        </div>
        <Link
          href="/collections"
          className="text-sm text-violet-600 hover:text-violet-700 transition flex items-center gap-1"
        >
          All collections
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((col) => (
          <Link
            key={col.slug}
            href={`/collection/${col.slug}`}
            className={`group relative rounded-xl bg-gradient-to-br ${col.gradient} bg-white border border-gray-200 p-5 hover:border-violet-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100/50`}
          >
            <div className="relative">
              <div className="text-2xl mb-2">{col.icon}</div>
              <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-700 transition-colors mb-1">
                {col.title}
              </h3>
              <p className="text-[11px] text-gray-500 line-clamp-2">{col.subtitle}</p>
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400 group-hover:text-violet-600 transition-colors">
                View collection
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
