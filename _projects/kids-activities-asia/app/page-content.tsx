'use client';

import dynamic from 'next/dynamic';
import { Station } from '@/lib/scoring';

const MapWithFilters = dynamic(() => import('@/components/MapWithFilters'), { ssr: false });

interface Meta {
  totalStations: number;
  cities: string[];
  countries: string[];
}

export default function HomeContent({ meta, stations }: { meta: Meta; stations: Station[] }) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="hidden sm:block">{meta.totalStations} Stations &middot; {meta.cities.length} Cities</span>
          <a href="/search" className="hover:text-gray-900">Browse</a>
          <a href="/blog" className="hover:text-gray-900">Blog</a>
        </div>
      </header>

      {/* Map + Filters */}
      <div className="flex-1 relative">
        <MapWithFilters stations={stations} meta={meta} />
      </div>
    </div>
  );
}
