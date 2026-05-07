'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { collections } from '@/lib/collections';

export default function FeaturedCollections() {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Curated Collections</h2>
          <p className="text-xs sm:text-sm text-tech-200">Hand-picked tool sets for every use case</p>
        </div>
        <Link
          href="/tools"
          className="text-sm text-neon-light hover:text-neon transition flex items-center gap-1"
        >
          Browse all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collection/${col.slug}`}
            className={`group relative rounded-xl bg-gradient-to-br ${col.gradient} bg-tech-700 border border-tech-500/30 p-5 hover:border-neon/40 transition-all hover:-translate-y-1`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-tech-grid opacity-20 rounded-xl" />
            <div className="relative">
              <span className="text-2xl block mb-2">{col.icon}</span>
              <h3 className="text-sm font-semibold text-white group-hover:text-neon-light transition-colors mb-1">
                {col.title}
              </h3>
              <p className="text-[11px] text-tech-200 line-clamp-2">{col.subtitle}</p>
              <div className="flex items-center gap-1.5 mt-3 text-[10px] text-tech-300 group-hover:text-neon-light transition-colors">
                Browse collection
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
