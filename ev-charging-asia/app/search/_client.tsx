'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, MapPin, Search, ArrowUp, SlidersHorizontal, X, MapIcon, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import StationCard from '@/components/StationCard';
import SiteFooter from '@/components/SiteFooter';
import EvMapContainer from '@/components/EvMapContainer';
import { Station, computeStationScore } from '@/lib/scoring';

interface Meta {
  totalStations: number;
  cities: string[];
  countries: string[];
}

const CHARGER_TYPES = ['All', 'CCS2', 'CHAdeMO', 'Type 2', 'GB/T', 'NACS'];
const SPEED_FILTERS = [
  { label: 'Any', value: 'any' },
  { label: '<50kW', value: 'slow' },
  { label: '50-150kW', value: 'medium' },
  { label: '150kW+', value: 'fast' },
];
const AMENITIES_HIDDEN = [
  { key: 'hasRestroomNearby', label: 'Restroom Nearby', emoji: '🚻' },
  { key: 'hasFoodNearby', label: 'Food Nearby', emoji: '🍽️' },
  { key: 'hasCoveredParking', label: 'Covered Parking', emoji: '🅿️' },
  { key: 'has24by7Access', label: '24/7 Access', emoji: '🕐' },
  { key: 'isMallParking', label: 'Convenience Store/WiFi', emoji: '📶' },
];

export default function SearchPageContent({ meta, stations }: { meta: Meta; stations: Station[] }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCity = searchParams.get('city') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [selectedChargerTypes, setSelectedChargerTypes] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [speedFilter, setSpeedFilter] = useState('any');
  const [amenityFilters, setAmenityFilters] = useState<Record<string, boolean>>({});
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [luxuryOnly, setLuxuryOnly] = useState(false);
  const [wellnessNearby, setWellnessNearby] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);

  const cities = meta.cities || [];
  const countries = meta.countries || [];

  const filteredCities = useMemo(() => {
    if (selectedCountry === 'All') return cities;
    return [...new Set(stations.filter(s => s.country === selectedCountry).map(s => s.city))].sort();
  }, [selectedCountry, stations, cities]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleChargerType = (type: string) => {
    setSelectedChargerTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (key: string) => {
    setAmenityFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filtered = useMemo(() => {
    let f = [...stations];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.chargerTypes.some(t => t.toLowerCase().includes(q))
      );
    }
    // OR logic for charger types
    if (selectedChargerTypes.length > 0) {
      f = f.filter(s => selectedChargerTypes.some(t => s.chargerTypes.includes(t)));
    }
    if (selectedCountry !== 'All') f = f.filter(s => s.country === selectedCountry);
    if (selectedCity !== 'All') f = f.filter(s => s.city === selectedCity);
    // Speed filter
    if (speedFilter === 'slow') f = f.filter(s => s.chargerSpeed < 50);
    else if (speedFilter === 'medium') f = f.filter(s => s.chargerSpeed >= 50 && s.chargerSpeed < 150);
    else if (speedFilter === 'fast') f = f.filter(s => s.chargerSpeed >= 150);
    // Amenity filters (hidden by default)
    Object.entries(amenityFilters).forEach(([key, active]) => {
      if (active) f = f.filter(s => (s as unknown as Record<string, unknown>)[key] === true);
    });
    // Family-friendly filter (2+ family amenities)
    if (familyFriendly) {
      f = f.filter(s => {
        const amenities = [s.hasRestroomNearby, s.hasFoodNearby, s.hasCoveredParking, s.isMallParking];
        return amenities.filter(Boolean).length >= 2;
      });
    }
    // Luxury only filter (high rating + speed + amenities)
    if (luxuryOnly) {
      f = f.filter(s => {
        const amenityCount = [s.hasRestroomNearby, s.hasFoodNearby, s.hasCoveredParking, s.has24by7Access].filter(Boolean).length;
        return s.reliability >= 4.0 && s.chargerSpeed >= 150 && amenityCount >= 3;
      });
    }
    // Wellness recovery stops (near food + restroom + mall parking = convenient stop)
    if (wellnessNearby) {
      f = f.filter(s => s.hasRestroomNearby && s.hasFoodNearby && (s.isMallParking || s.hasCoveredParking));
    }
    // Sort
    f.sort((a, b) => {
      if (sortBy === 'speed') return b.chargerSpeed - a.chargerSpeed;
      if (sortBy === 'reliability') return b.reliability - a.reliability;
      if (sortBy === 'updated') return 0; // No update field yet
      return computeStationScore(b) - computeStationScore(a);
    });
    return f;
  }, [stations, searchQuery, selectedChargerTypes, selectedCountry, selectedCity, speedFilter, amenityFilters, sortBy]);

  const clearAll = () => {
    setSearchQuery(''); setSelectedChargerTypes([]); setSelectedCountry('All');
    setSelectedCity('All'); setSpeedFilter('any'); setAmenityFilters({}); setFamilyFriendly(false); setLuxuryOnly(false); setWellnessNearby(false); setSortBy('score');
  };

  const hasActiveFilters = searchQuery || selectedChargerTypes.length > 0 || selectedCountry !== 'All' ||
    selectedCity !== 'All' || speedFilter !== 'any' || Object.values(amenityFilters).some(Boolean) || familyFriendly || luxuryOnly || wellnessNearby;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
            <Link href="/about" className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>

      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city or region (Tokyo, Singapore, Bangkok...)"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
          </div>

          {/* Charger Type — OR logic buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <SlidersHorizontal size={14} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 mr-1">Connector Type:</span>
            {CHARGER_TYPES.map(t => (
              <button key={t} onClick={() => t === 'All' ? setSelectedChargerTypes([]) : toggleChargerType(t)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  t === 'All' && selectedChargerTypes.length === 0 ? 'bg-sky-600 text-white border-sky-600' :
                  t !== 'All' && selectedChargerTypes.includes(t) ? 'bg-sky-600 text-white border-sky-600' :
                  'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >{t === 'All' ? 'All Types' : t}</button>
            ))}
          </div>

          {/* Speed filter */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm font-medium text-gray-700 mr-1">Speed:</span>
            {SPEED_FILTERS.map(sf => (
              <button key={sf.value} onClick={() => setSpeedFilter(sf.value)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  speedFilter === sf.value ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >{sf.label}</button>
            ))}
          </div>

          {/* Country, City, Sort */}
          <div className="flex flex-wrap items-center gap-2">
            <select value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCity('All'); }}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700">
              <option value="All">All Countries</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700">
              <option value="All">All Cities</option>
              {filteredCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Sort dropdown */}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 ml-auto">
              <option value="score">Sort: Best Score</option>
              <option value="speed">Sort: Fastest First</option>
              <option value="reliability">Sort: Most Reliable</option>
              <option value="updated">Sort: Recently Updated</option>
            </select>
          </div>

          {/* Hidden amenities toggle */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <button onClick={() => setShowAmenities(!showAmenities)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mb-2">
              {showAmenities ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              Amenities (optional)
            </button>
            {showAmenities && (
              <div className="flex flex-wrap gap-2">
                {AMENITIES_HIDDEN.map(a => (
                  <button key={a.key} onClick={() => toggleAmenity(a.key)}
                    className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                      amenityFilters[a.key] ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >{a.emoji} {a.label}</button>
                ))}
              </div>
            )}
            {/* Family-Friendly toggle */}
            <div className="mt-2 flex flex-wrap gap-2">
              <button onClick={() => setFamilyFriendly(!familyFriendly)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  familyFriendly ? 'bg-pink-50 text-pink-700 border-pink-300' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >👶 Family Friendly (restroom, food, parking)</button>
              <button onClick={() => setLuxuryOnly(!luxuryOnly)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  luxuryOnly ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >👑 Luxury Only (150kW+, 4★+, 3 amenities)</button>
              <button onClick={() => setWellnessNearby(!wellnessNearby)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                  wellnessNearby ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >🧘 Wellness Recovery Stops (food, restroom, parking)</button>
            </div>
          </div>

          {/* Results count + view toggle */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-500">{filtered.length} station{filtered.length !== 1 ? 's' : ''} found</span>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button onClick={clearAll} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                  <X size={12} /> Clear filters
                </button>
              )}
              <div className="flex bg-white rounded-lg border border-gray-200 p-0.5">
                <button onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
                  <LayoutGrid size={14} className="inline" /> List
                </button>
                <button onClick={() => setViewMode('map')}
                  className={`px-3 py-1 text-xs font-medium rounded-md ${viewMode === 'map' ? 'bg-gray-900 text-white' : 'text-gray-500'}`}>
                  <MapIcon size={14} className="inline" /> Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'map' && filtered.length > 0 && (
          <div className="mb-6">
            <EvMapContainer stations={filtered.map(s => ({ ...s, latitude: s.latitude, longitude: s.longitude }))} height="550px" />
          </div>
        )}
        {viewMode === 'grid' && filtered.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filtered.map(station => <StationCard key={station.id} station={station} />)}
          </div>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No stations match your filters</h3>
            <p className="text-gray-500 text-sm mb-4">Try different connector types or speed settings</p>
            <button onClick={clearAll} className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">Clear all filters</button>
          </div>
        )}
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all">
          <ArrowUp size={20} />
        </button>
      )}

      <SiteFooter />
    </div>
  );
}
