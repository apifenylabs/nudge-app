'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp, Star, BatteryCharging, Gauge, Activity, Shield, Zap, DollarSign } from 'lucide-react';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';
import MapLegend from './MapLegend';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Meta {
  totalStations: number;
  cities: string[];
  countries: string[];
}

export default function MapWithFilters({ stations, meta }: { stations: Station[]; meta: Meta }) {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [powerLevel, setPowerLevel] = useState('any');
  const [statusFilter, setStatusFilter] = useState<'all' | 'working'>('all');
  const [amenityFilters, setAmenityFilters] = useState<Record<string, boolean>>({});
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [showFeatured, setShowFeatured] = useState(true);
  const [reliabilityFilter, setReliabilityFilter] = useState(0); // 0 = any, 4 = 4+ only
  const [memberBenefits, setMemberBenefits] = useState<Record<string, boolean>>({});

  useEffect(() => { setMounted(true); }, []);

  const allTypes = ['CCS2', 'CHAdeMO', 'Type 2', 'GB/T', 'NACS'];
  const powerOptions = [
    { value: 'any', label: 'Any' },
    { value: 'low', label: '<50kW' },
    { value: 'mid', label: '50-150kW' },
    { value: 'high', label: '150kW+' },
  ];
  const amenities = [
    { key: 'hasRestroomNearby', label: 'Restroom' },
    { key: 'hasFoodNearby', label: 'Food' },
    { key: 'has24by7Access', label: '24/7' },
    { key: 'hasCoveredParking', label: 'Covered' },
  ];
  const benefits = [
    { key: 'has24by7Access', label: 'Free Parking', filterKey: 'freeParking' },
    { key: 'isMallParking', label: 'Membership Discount', filterKey: 'membership' },
  ];

  const toggleType = (t: string) => {
    setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const toggleAmenity = (key: string) => {
    setAmenityFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBenefit = (key: string) => {
    setMemberBenefits(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearAll = useCallback(() => {
    setSelectedTypes([]);
    setPowerLevel('any');
    setStatusFilter('all');
    setAmenityFilters({});
    setSearchQuery('');
    setReliabilityFilter(0);
    setMemberBenefits({});
  }, []);

  const filtered = useMemo(() => {
    let f = [...stations];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.operator.toLowerCase().includes(q) ||
        s.chargerTypes.some(t => t.toLowerCase().includes(q))
      );
    }
    // Connector types (OR logic)
    if (selectedTypes.length > 0) {
      f = f.filter(s => s.chargerTypes.some(t => selectedTypes.includes(t)));
    }
    // Power level
    if (powerLevel === 'low') f = f.filter(s => s.chargerSpeed < 50);
    else if (powerLevel === 'mid') f = f.filter(s => s.chargerSpeed >= 50 && s.chargerSpeed < 150);
    else if (powerLevel === 'high') f = f.filter(s => s.chargerSpeed >= 150);
    // Status
    if (statusFilter === 'working') f = f.filter(s => s.isOperational);
    // Reliability
    if (reliabilityFilter > 0) f = f.filter(s => s.reliability >= reliabilityFilter);
    // Amenities
    Object.entries(amenityFilters).forEach(([key, active]) => {
      if (active) f = f.filter(s => (s as any)[key] === true);
    });
    // Member benefits
    // freeParking → stations with covered parking or mall parking
    if (memberBenefits.freeParking) {
      f = f.filter(s => s.hasCoveredParking || s.isMallParking);
    }
    // membership → stations that accept membership payment
    if (memberBenefits.membership) {
      f = f.filter(s => s.paymentMethods.includes('Membership'));
    }
    return f;
  }, [stations, searchQuery, selectedTypes, powerLevel, statusFilter, amenityFilters, reliabilityFilter, memberBenefits]);

  const featured = useMemo(() => {
    return [...stations].sort((a, b) => computeStationScore(b) - computeStationScore(a)).slice(0, 8);
  }, [stations]);

  const connectorCount = useMemo(() => {
    const types = new Set<string>();
    stations.forEach(s => s.chargerTypes.forEach(t => types.add(t)));
    return types.size;
  }, [stations]);

  const stats = useMemo(() => {
    const cities = new Set(stations.map(s => s.city));
    const countries = new Set(stations.map(s => s.country));
    return { totalStations: stations.length, cities: cities.size, countries: countries.size, connectorTypes: connectorCount };
  }, [stations, connectorCount]);

  const filterCount = (selectedTypes.length > 0 ? 1 : 0) +
    (powerLevel !== 'any' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0) +
    (reliabilityFilter > 0 ? 1 : 0) +
    Object.values(memberBenefits).filter(Boolean).length;

  if (!mounted) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
        Loading map...
      </div>
    );
  }

  return (
    <div className="h-full relative">
      {/* Map */}
      <div className="absolute inset-0">
        <MapView stations={filtered} selectedStation={selectedStation} onSelectStation={setSelectedStation} />
      </div>

      {/* Map Legend */}
      <MapLegend />

      {/* Floating Search Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center px-3 gap-2">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search stations, cities, operators..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 py-2.5 text-sm outline-none bg-transparent"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            )}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filtersOpen || filterCount > 0
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {filterCount > 0 && (
                <span className="bg-white text-gray-900 rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                  {filterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {filtersOpen && (
            <div className="border-t border-gray-100 p-3 space-y-3 animate-fade-in max-h-[60vh] overflow-y-auto">
              {/* Connector Type */}
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Zap size={12} /> Connector Type
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => toggleType(t)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        selectedTypes.includes(t)
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Level */}
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Gauge size={12} /> Power Level
                </div>
                <div className="flex gap-1.5">
                  {powerOptions.map(o => (
                    <button
                      key={o.value}
                      onClick={() => setPowerLevel(o.value)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        powerLevel === o.value
                          ? 'bg-gray-900 text-white border-gray-900'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Status */}
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Activity size={12} /> Live Status
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setStatusFilter('working')}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      statusFilter === 'working'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Working Only
                  </button>
                </div>
              </div>

              {/* Reliability Score */}
              <div>
                <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                  <Shield size={12} /> Reliability
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setReliabilityFilter(0)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      reliabilityFilter === 0
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    Any
                  </button>
                  <button
                    onClick={() => setReliabilityFilter(4)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      reliabilityFilter === 4
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    4+ Only
                  </button>
                </div>
              </div>

              {/* More Filters toggle */}
              <button
                onClick={() => setMoreFiltersOpen(!moreFiltersOpen)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
              >
                {moreFiltersOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                More filters
              </button>

              {moreFiltersOpen && (
                <div className="space-y-3">
                  {/* Amenities */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-1.5">Amenities</div>
                    <div className="flex flex-wrap gap-1.5">
                      {amenities.map(a => (
                        <button
                          key={a.key}
                          onClick={() => toggleAmenity(a.key)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            amenityFilters[a.key]
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Member Benefits */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                      <DollarSign size={12} /> Member Benefits
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => toggleBenefit('freeParking')}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          memberBenefits.freeParking
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Free Parking
                      </button>
                      <button
                        onClick={() => toggleBenefit('membership')}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          memberBenefits.membership
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Membership Discount
                      </button>
                      <button
                        onClick={() => {
                          // 24/7 access toggle is already in amenities
                          setAmenityFilters(prev => ({ ...prev, has24by7Access: !prev.has24by7Access }));
                        }}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          amenityFilters.has24by7Access
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        24/7 Access
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Results count + clear */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-100">
                <span className="text-xs text-gray-500">{filtered.length} station{filtered.length !== 1 ? 's' : ''} found</span>
                {filterCount > 0 && (
                  <button onClick={clearAll} className="text-xs text-sky-600 hover:text-sky-700 font-medium">Clear all</button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Badge */}
      <div className="absolute top-3 right-3 z-[1000] hidden md:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-gray-200 text-xs text-gray-600">
          <div className="font-semibold text-gray-900">{stats.totalStations}+ Stations</div>
          <div>{stats.countries} Countries &middot; {stats.connectorTypes} Connector Types</div>
        </div>
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[500] pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 text-center max-w-xs pointer-events-auto">
            <BatteryCharging size={36} className="mx-auto text-gray-300 mb-2" />
            <h3 className="font-semibold text-gray-900 text-sm mb-1">No stations match your filters</h3>
            <p className="text-gray-500 text-xs mb-3">Try adjusting your search or filters.</p>
            <button onClick={clearAll} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors pointer-events-auto">
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Featured sidebar (desktop) */}
      <div className={`absolute top-16 right-3 z-[1000] w-72 transition-all duration-300 hidden lg:block ${showFeatured ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-[60vh] flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" /> Featured</span>
            <button onClick={() => setShowFeatured(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
            {featured.map(station => {
              const score = computeStationScore(station);
              return (
                <Link
                  key={station.id}
                  href={`/station/${station.id}`}
                  className="block px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-xs font-semibold text-gray-900 truncate">{station.name}</div>
                  <div className="text-[11px] text-gray-500 truncate">{station.city}, {station.country}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${scoreTier(score).color}`}>{score}</span>
                    <span className="text-[11px] text-gray-400">{station.chargerSpeed}kW</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured bottom sheet (mobile) - FIXED: below map, not overlapping */}
      <div className={`absolute bottom-0 left-0 right-0 z-[1000] lg:hidden transition-all duration-300 ${showFeatured ? '' : 'translate-y-full'}`}>
        <div className="bg-white rounded-t-xl shadow-lg border border-gray-200 max-h-[180px] flex flex-col pb-safe">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 shrink-0 min-h-[44px]">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" /> Featured Stations
            </span>
            <button onClick={() => setShowFeatured(false)} className="text-gray-400 hover:text-gray-600 p-1.5 min-w-[44px] min-h-[44px] flex items-center justify-center"><ChevronDown size={18} /></button>
          </div>
          <div className="overflow-x-auto flex gap-3 px-4 py-2.5">
            {featured.slice(0, 5).map(station => (
              <Link
                key={station.id}
                href={`/station/${station.id}`}
                className="shrink-0 w-40 p-2.5 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors min-h-[44px]"
              >
                <div className="text-xs font-semibold text-gray-900 truncate">{station.name}</div>
                <div className="text-[10px] text-gray-500">{station.city}</div>
                <div className="text-[10px] text-green-600 font-medium">{station.chargerSpeed}kW</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle featured button */}
      {!showFeatured && (
        <button
          onClick={() => setShowFeatured(true)}
          className="absolute bottom-3 right-3 z-[1000] bg-white rounded-full shadow-lg border border-gray-200 p-2.5 hover:bg-gray-50 transition-colors"
        >
          <Star size={16} className="text-amber-400" />
        </button>
      )}
    </div>
  );
}
