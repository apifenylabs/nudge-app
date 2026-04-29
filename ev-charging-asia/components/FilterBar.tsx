'use client';

import { SlidersHorizontal, X, ChevronDown, ChevronUp, Gauge, Activity, Shield, Zap, DollarSign } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  selectedChargerType: string;
  onChargerTypeChange: (v: string) => void;
  selectedCountry: string;
  onCountryChange: (v: string) => void;
  selectedCity: string;
  onCityChange: (v: string) => void;
  amenityFilters: Record<string, boolean>;
  onAmenityToggle: (key: string) => void;
  sortBy: string;
  onSortChange: (v: string) => void;
  countries: string[];
  cities: string[];
  resultsCount: number;
  onClearAll: () => void;
}

const CHARGER_TYPES = ['All', 'CCS2', 'CHAdeMO', 'Type 2', 'GB/T', 'NACS'];
const AMENITIES_HIDDEN = [
  { key: 'hasRestroomNearby', label: 'Restroom Nearby', emoji: '🚻' },
  { key: 'hasFoodNearby', label: 'Food Nearby', emoji: '🍽️' },
  { key: 'hasCoveredParking', label: 'Covered Parking', emoji: '🅿️' },
  { key: 'has24by7Access', label: '24/7 Access', emoji: '🕐' },
  { key: 'isMallParking', label: 'Convenience/WiFi', emoji: '📶' },
];

export default function FilterBar({
  selectedChargerType, onChargerTypeChange,
  selectedCountry, onCountryChange,
  selectedCity, onCityChange,
  amenityFilters, onAmenityToggle,
  sortBy, onSortChange,
  countries, cities,
  resultsCount, onClearAll,
}: FilterBarProps) {
  const [showAmenities, setShowAmenities] = useState(false);

  const hasActiveFilters = selectedChargerType !== 'All' || selectedCountry !== 'All' || selectedCity !== 'All' ||
    Object.values(amenityFilters).some(Boolean) || sortBy !== 'score';

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Zap size={14} className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700 mr-1">Connector Type:</span>
          {CHARGER_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onChargerTypeChange(t)}
              className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                selectedChargerType === t
                  ? 'bg-sky-600 text-white border-sky-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {t === 'All' ? 'All Types' : t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCountry}
            onChange={(e) => { onCountryChange(e.target.value); onCityChange('All'); }}
            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700"
          >
            <option value="All">All Countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700"
          >
            <option value="All">All Cities</option>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Amenities toggle (hidden by default) */}
          <div className="relative">
            <button onClick={() => setShowAmenities(!showAmenities)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg">
              Amenities {showAmenities ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {showAmenities && (
              <div className="absolute top-full left-0 mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg p-3 min-w-[200px]">
                <p className="text-[10px] text-gray-400 mb-2">Optional — show stations with these nearby:</p>
                <div className="flex flex-wrap gap-1.5">
                  {AMENITIES_HIDDEN.map((a) => (
                    <button
                      key={a.key}
                      onClick={() => onAmenityToggle(a.key)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                        amenityFilters[a.key]
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {a.emoji} {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-white text-gray-700 ml-auto"
          >
            <option value="score">Sort: Best Score</option>
            <option value="speed">Sort: Fastest</option>
            <option value="reliability">Sort: Most Reliable</option>
            <option value="chargerCount">Sort: Most Connectors</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">{resultsCount} station{resultsCount !== 1 ? 's' : ''} found</span>
          {hasActiveFilters && (
            <button onClick={onClearAll} className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
              <X size={12} /> Clear filters
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
