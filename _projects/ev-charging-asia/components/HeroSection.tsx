'use client';

import { Search, Zap, Star } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalStations: number;
  totalCities: number;
  countries: string[];
}

export default function HeroSection({ searchQuery, onSearchChange, totalStations, totalCities, countries }: HeroSectionProps) {
  const router = useRouter();
  const [city, setCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (city) params.set('city', city);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-gray-700 text-sm text-gray-300 mb-6">
            <Zap size={14} className="text-green-400" />
            {totalStations}+ Stations · {countries.length} Countries · 4 Connector Types
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find EV Charging Stations<br />
            <span className="text-green-400">Across Asia</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            CCS2, CHAdeMO, Tesla NACS, GB/T — filter by your car&apos;s connector. Reliability-rated by real drivers.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by city or region (Tokyo, Singapore, Bangkok...)"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3.5 bg-white/10 backdrop-blur-sm border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="" className="text-gray-900">All Cities</option>
                {countries.map((c) => (
                  <optgroup key={c} label={c} className="text-gray-900">
                  </optgroup>
                ))}
              </select>
              <button type="submit" className="px-8 py-3.5 bg-green-500 hover:bg-green-400 text-gray-900 font-semibold rounded-xl transition-all active:scale-[0.98]">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center gap-8 max-w-lg mx-auto mt-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{totalStations}+</div>
            <div className="text-sm text-gray-400">Stations</div>
          </div>
          <div className="w-px h-10 bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{countries.length}</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>
          <div className="w-px h-10 bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">4</div>
            <div className="text-sm text-gray-400">Connector Types</div>
          </div>
        </div>
      </div>
    </section>
  );
}
