'use client';

import { FC, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Car, MapPin, BatteryFull, Search, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import type { Station } from '@/lib/scoring';
import type { EvCarModel } from '@/data/car-models';
import { carModels, getBrands } from '@/data/car-models';
import { calculateRange, searchCities } from '@/lib/range-calculator';
import type { RangeResult } from '@/lib/range-calculator';
import RangeResultCard from '@/components/RangeResultCard';

// Dynamically import the map (Leaflet SSR-safe)
const RangeMap = dynamic(() => import('@/components/RangeMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl" style={{ height: '400px' }}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 size={24} className="animate-spin text-gray-400" />
        <p className="text-sm text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
});

// ─── Helpers ────────────────────────────────────────────────────

const brands = getBrands();

/** Get coordinates for a city from station data */
function getCityCoord(city: string, stations: Station[]): { lat: number; lng: number } | null {
  const q = city.toLowerCase();
  const cityStations = stations.filter(s => s.city.toLowerCase() === q);
  if (cityStations.length > 0) {
    return {
      lat: cityStations.reduce((sum, s) => sum + s.latitude, 0) / cityStations.length,
      lng: cityStations.reduce((sum, s) => sum + s.longitude, 0) / cityStations.length,
    };
  }
  // partial
  const partial = stations.filter(s => s.city.toLowerCase().includes(q));
  if (partial.length > 0) {
    return {
      lat: partial.reduce((sum, s) => sum + s.latitude, 0) / partial.length,
      lng: partial.reduce((sum, s) => sum + s.longitude, 0) / partial.length,
    };
  }
  return null;
}

// ─── Component ───────────────────────────────────────────────────

interface RangeClientProps {
  stations: Station[];
}

const RangeClient: FC<RangeClientProps> = ({ stations }) => {
  // State
  const [selectedCarId, setSelectedCarId] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [originInput, setOriginInput] = useState('');
  const [destInput, setDestInput] = useState('');
  const [batteryPct, setBatteryPct] = useState(80);
  const [result, setResult] = useState<RangeResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autocomplete state
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<string[]>([]);
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);

  // Refs for click-outside detection
  const originRef = useRef<HTMLDivElement>(null);
  const destRef = useRef<HTMLDivElement>(null);

  // Filtered car models by brand
  const filteredCars = useMemo(() => {
    if (!selectedBrand) return carModels;
    return carModels.filter(c => c.brand === selectedBrand);
  }, [selectedBrand]);

  const selectedCar = useMemo(() => {
    return carModels.find(c => c.id === selectedCarId);
  }, [selectedCarId]);

  // Autocomplete handler
  const handleOriginChange = useCallback(
    (value: string) => {
      setOriginInput(value);
      if (value.length >= 1) {
        const suggestions = searchCities(value, stations);
        setOriginSuggestions(suggestions);
        setShowOriginSuggestions(suggestions.length > 0);
      } else {
        setOriginSuggestions([]);
        setShowOriginSuggestions(false);
      }
    },
    [stations],
  );

  const handleDestChange = useCallback(
    (value: string) => {
      setDestInput(value);
      if (value.length >= 1) {
        const suggestions = searchCities(value, stations);
        setDestSuggestions(suggestions);
        setShowDestSuggestions(suggestions.length > 0);
      } else {
        setDestSuggestions([]);
        setShowDestSuggestions(false);
      }
    },
    [stations],
  );

  // Click outside to close autocomplete
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setShowOriginSuggestions(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Calculate
  const handleCalculate = useCallback(() => {
    setError(null);

    // Validate
    if (!selectedCar) {
      setError('Please select an EV model.');
      return;
    }
    if (!originInput.trim()) {
      setError('Please enter a starting city.');
      return;
    }
    if (!destInput.trim()) {
      setError('Please enter a destination city.');
      return;
    }
    if (batteryPct <= 0) {
      setError('Battery percentage must be greater than 0%.');
      return;
    }
    if (originInput.trim().toLowerCase() === destInput.trim().toLowerCase()) {
      setError('Origin and destination must be different.');
      return;
    }

    // Verify cities exist
    const originCoord = getCityCoord(originInput.trim(), stations);
    const destCoord = getCityCoord(destInput.trim(), stations);

    if (!originCoord) {
      setError(`City "${originInput.trim()}" not found. Try typing a city name from our database.`);
      return;
    }
    if (!destCoord) {
      setError(`City "${destInput.trim()}" not found. Try typing a city name from our database.`);
      return;
    }

    setIsCalculating(true);

    // Use short timeout so UI updates before CPU work
    setTimeout(() => {
      try {
        const calcResult = calculateRange({
          car: selectedCar,
          origin: originInput.trim(),
          destination: destInput.trim(),
          batteryPct,
          stations,
        });
        setResult(calcResult);
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error('Range calculator error:', err);
      } finally {
        setIsCalculating(false);
      }
    }, 100);
  }, [selectedCar, originInput, destInput, batteryPct, stations]);

  const handleReset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  // Map data
  const mapData = useMemo(() => {
    if (!result || !result.isFeasible || result.error) return null;
    const originCoord = getCityCoord(result.origin, stations);
    const destCoord = getCityCoord(result.destination, stations);
    if (!originCoord || !destCoord) return null;
    return {
      origin: { ...originCoord, name: result.origin },
      destination: { ...destCoord, name: result.destination },
      stops: result.stopLocations,
    };
  }, [result, stations]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
      {/* SEO heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
        EV Range Calculator
      </h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
        Plan your electric road trip across Asia. Enter your EV, route, and battery level to find charging stops.
      </p>

      {/* Calculator Form */}
      <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-6 mb-6">
        {/* Error alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Car Selection */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Car size={16} className="text-vibe-sky" />
              Your EV Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              <select
                value={selectedBrand}
                onChange={e => {
                  setSelectedBrand(e.target.value);
                  setSelectedCarId('');
                }}
                className="sm:col-span-1 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-vibe-sky focus:border-vibe-sky outline-none"
                aria-label="Filter by brand"
              >
                <option value="">All Brands</option>
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <select
                value={selectedCarId}
                onChange={e => setSelectedCarId(e.target.value)}
                className="sm:col-span-4 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-vibe-sky focus:border-vibe-sky outline-none"
                aria-label="Select car model"
              >
                <option value="">Select your EV model...</option>
                {filteredCars.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.brand} {c.model} ({c.batteryKwh} kWh, {c.efficiencyWhKm} Wh/km)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Origin City */}
          <div ref={originRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin size={16} className="text-emerald-500" />
              Starting City
            </label>
            <input
              type="text"
              value={originInput}
              onChange={e => handleOriginChange(e.target.value)}
              onFocus={() => {
                if (originSuggestions.length > 0) setShowOriginSuggestions(true);
              }}
              placeholder="e.g. Bangkok"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-vibe-sky focus:border-vibe-sky outline-none"
            />
            {showOriginSuggestions && (
              <ul className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {originSuggestions.map(city => (
                  <li
                    key={city}
                    onClick={() => {
                      setOriginInput(city);
                      setShowOriginSuggestions(false);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Destination City */}
          <div ref={destRef} className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin size={16} className="text-red-500" />
              Destination City
            </label>
            <input
              type="text"
              value={destInput}
              onChange={e => handleDestChange(e.target.value)}
              onFocus={() => {
                if (destSuggestions.length > 0) setShowDestSuggestions(true);
              }}
              placeholder="e.g. Chiang Mai"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-vibe-sky focus:border-vibe-sky outline-none"
            />
            {showDestSuggestions && (
              <ul className="absolute z-20 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {destSuggestions.map(city => (
                  <li
                    key={city}
                    onClick={() => {
                      setDestInput(city);
                      setShowDestSuggestions(false);
                    }}
                    className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Battery Percentage */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
              <BatteryFull size={16} className="text-emerald-500" />
              Current Battery: <strong>{batteryPct}%</strong>
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-8 text-right">0%</span>
              <input
                type="range"
                min={1}
                max={100}
                value={batteryPct}
                onChange={e => setBatteryPct(Number(e.target.value))}
                className="flex-1 h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:accent-emerald-400 bg-gray-200 dark:bg-gray-700"
              />
              <span className="text-xs text-gray-400 w-8">100%</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="mt-5 w-full sm:w-auto px-6 py-3 bg-vibe-sky hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
        >
          {isCalculating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              <Search size={18} />
              Calculate Range
              <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Selected car info */}
        {selectedCar && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/50 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">{selectedCar.brand} {selectedCar.model}</span>
            {' · '}{selectedCar.batteryKwh} kWh battery · {selectedCar.efficiencyWhKm} Wh/km · 
            up to {selectedCar.maxChargeKw} kW DC fast charge
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Map */}
          <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="p-3 border-b border-gray-100 dark:border-gray-700/50">
              <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <MapPin size={16} className="text-vibe-sky" />
                Route Map
              </h2>
            </div>
            {mapData ? (
              <RangeMap
                origin={mapData.origin}
                destination={mapData.destination}
                stops={mapData.stops}
                height="400px"
              />
            ) : (
              <div className="flex items-center justify-center h-[200px] bg-gray-50 dark:bg-gray-800/40 text-sm text-gray-400">
                Map unavailable for this route
              </div>
            )}
          </div>

          {/* Result details */}
          <RangeResultCard result={result} onReset={handleReset} />
        </div>
      )}
    </div>
  );
};

export default RangeClient;
