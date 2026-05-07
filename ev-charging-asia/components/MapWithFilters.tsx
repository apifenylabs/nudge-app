'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp, BatteryCharging, Gauge, Activity, Shield, Zap, DollarSign } from 'lucide-react';
import { Station, computeStationScore, scoreTier } from '@/lib/scoring';
import MapLegend from './MapLegend';

const MapView = dynamic(() => import('./MapView'), { ssr: false });

interface Meta {
  totalStations: number;
  cities: string[];
  countries: string[];
}

const COUNTRIES = ['Thailand', 'India', 'Japan', 'Indonesia', 'Malaysia', 'Singapore'];

const COUNTRY_CITIES: Record<string, string[]> = {
  'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Khon Kaen', 'Hat Yai'],
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'],
  'Japan': ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Sapporo', 'Kyoto', 'Kobe', 'Hiroshima', 'Naha'],
  'Indonesia': ['Jakarta', 'Surabaya', 'Bandung', 'Bali', 'Medan', 'Makassar'],
  'Malaysia': ['Kuala Lumpur', 'George Town', 'Johor Bahru', 'Ipoh', 'Kota Kinabalu', 'Malacca', 'Kuching'],
  'Singapore': ['Singapore'],
};

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
  const [reliabilityFilter, setReliabilityFilter] = useState(0); // 0 = any, 4 = 4+ only
  const [familyFriendly, setFamilyFriendly] = useState(false);
  const [luxuryOnly, setLuxuryOnly] = useState(false);
  const [wellnessNearby, setWellnessNearby] = useState(false);
  const [memberBenefits, setMemberBenefits] = useState<Record<string, boolean>>({});
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [countryFilterOpen, setCountryFilterOpen] = useState(true);

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
    setFamilyFriendly(false);
    setLuxuryOnly(false);
    setWellnessNearby(false);
    setMemberBenefits({});
    setSelectedCountry(null);
    setSelectedCity(null);
  }, []);

  const handleCountrySelect = (country: string | null) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
      setSelectedCity(null);
    } else {
      setSelectedCountry(country);
      setSelectedCity(null);
    }
  };

  const handleCitySelect = (city: string | null) => {
    if (selectedCity === city) {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

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
    // Country filter
    if (selectedCountry) {
      f = f.filter(s => s.country === selectedCountry);
    }
    // City filter
    if (selectedCity) {
      f = f.filter(s => s.city === selectedCity);
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
    // Wellness recovery stops
    if (wellnessNearby) {
      f = f.filter(s => s.hasRestroomNearby && s.hasFoodNearby && (s.isMallParking || s.hasCoveredParking));
    }
    // Member benefits
    if (memberBenefits.freeParking) {
      f = f.filter(s => s.hasCoveredParking || s.isMallParking);
    }
    if (memberBenefits.membership) {
      f = f.filter(s => s.paymentMethods.includes('Membership'));
    }
    return f;
  }, [stations, searchQuery, selectedCountry, selectedCity, selectedTypes, powerLevel, statusFilter, amenityFilters, reliabilityFilter, memberBenefits]);

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
    (familyFriendly ? 1 : 0) +
    (luxuryOnly ? 1 : 0) +
    (wellnessNearby ? 1 : 0) +
    Object.values(memberBenefits).filter(Boolean).length +
    (selectedCountry ? 1 : 0) +
    (selectedCity ? 1 : 0);

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

                  {/* Family-Friendly */}
                  <div>
                    <div className="text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1">
                      👶 Family-Friendly
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => setFamilyFriendly(!familyFriendly)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          familyFriendly
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        👶 Family Friendly (restroom, food, parking)
                      </button>
                      <button
                        onClick={() => setLuxuryOnly(!luxuryOnly)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          luxuryOnly
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        👑 Luxury Only (150kW+, 4★+, 3 amenities)
                      </button>
                      <button
                        onClick={() => setWellnessNearby(!wellnessNearby)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                          wellnessNearby
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        🧘 Wellness Recovery (food, restroom, parking)
                      </button>
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

      {/* Country Filter Bar */}
      <div className="absolute top-16 left-3 right-3 z-[1000] max-w-lg mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Toggle button */}
          <button
            onClick={() => setCountryFilterOpen(!countryFilterOpen)}
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50/50 transition-colors"
          >
            <span>
              {selectedCountry ? (
                <span>
                  Country: <span className="text-sky-600">{selectedCountry}</span>
                  {selectedCity && <> / City: <span className="text-sky-600">{selectedCity}</span></>}
                </span>
              ) : (
                'Browse by Country'
              )}
            </span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${countryFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {countryFilterOpen && (
            <div className="px-3 pb-3 space-y-2 animate-fade-in">
              {/* Country pills */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setSelectedCountry(null); setSelectedCity(null); }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    !selectedCountry
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                  }`}
                >
                  All Countries
                </button>
                {COUNTRIES.map(country => (
                  <button
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                      selectedCountry === country
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>

              {/* City pills (only when a country is selected) */}
              {selectedCountry && COUNTRY_CITIES[selectedCountry] && (
                <div>
                  <div className="text-[10px] text-gray-400 mb-1.5 font-medium">Cities in {selectedCountry}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {COUNTRY_CITIES[selectedCountry].map(city => (
                      <button
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                          selectedCity === city
                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                            : 'bg-white/70 text-gray-500 border-gray-200 hover:border-sky-300 hover:text-sky-600'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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

      {/* No results - compact banner, not blocking */}
      {filtered.length === 0 && (
        <div className="absolute top-20 left-3 right-3 z-[500] max-w-md mx-auto pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BatteryCharging size={16} className="text-gray-400 shrink-0" />
              <span className="text-xs text-gray-600">No stations match your filters</span>
            </div>
            <button onClick={clearAll} className="px-3 py-1 text-[11px] font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
              Clear filters
            </button>
          </div>
        </div>
      )}

      {/* Quick Stats Badge (small, non-blocking) */}
      <div className="absolute top-28 right-3 z-[1000] hidden md:block">
        <Link
          href="/search"
          className="block bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow border border-gray-200 text-[11px] text-gray-600 hover:bg-white transition-colors"
        >
          {filtered.length} stations · <span className="text-emerald-600 font-medium">Browse all →</span>
        </Link>
      </div>
    </div>
  );
}
