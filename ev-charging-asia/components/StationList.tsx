'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Station } from '@/lib/scoring';
import StationCard from './StationCard';

interface StationListProps {
  stations: Station[];
  countryFilter?: string;
}

export default function StationList({ stations, countryFilter }: StationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let f = [...stations];

    // Apply country filter
    if (countryFilter && countryFilter !== 'All') {
      f = f.filter(s => s.country === countryFilter);
    }

    // Apply search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.operator.toLowerCase().includes(q) ||
        s.chargerTypes.some(t => t.toLowerCase().includes(q))
      );
    }

    return f;
  }, [stations, countryFilter, searchQuery]);

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-3 py-2 border-b border-white/10">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search stations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-xs bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl outline-none focus:border-sky-400 focus:bg-white/80 transition-colors placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="px-3 py-1.5 text-[10px] text-gray-400 border-b border-white/10">
        {filtered.length} station{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filtered.length > 0 ? (
          filtered.map(station => (
            <StationCard key={station.id} station={station} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Search size={28} className="mb-2 opacity-50" />
            <p className="text-sm">No stations match your search</p>
            <p className="text-xs mt-1">Try a different query or country</p>
          </div>
        )}
      </div>
    </div>
  );
}
