'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Route, Zap, Search, ChevronRight, Users, MapPin, Mountain, Sun } from 'lucide-react';
import { getAllItineraries } from '@/data/itineraries';
import type { Itinerary } from '@/data/itineraries';

interface FormState {
  duration: string;
  difficulty: string;
  familyTrip: string;
  region: string;
  vibe: string;
}

const initialForm: FormState = {
  duration: '',
  difficulty: '',
  familyTrip: '',
  region: '',
  vibe: '',
};

const DURATIONS = [
  { value: '1-2', label: 'Weekend (1-2 days)' },
  { value: '3-4', label: 'Short trip (3-4 days)' },
  { value: '5+', label: 'Extended (5+ days)' },
];

const DIFFICULTIES = [
  { value: 'easy', label: '🟢 Easy' },
  { value: 'moderate', label: '🟡 Moderate' },
  { value: 'hard', label: '🔴 Challenging' },
];

const REGIONS = [
  { value: 'se-asia', label: '🌴 Southeast Asia' },
  { value: 'east-asia', label: '🗾 East Asia' },
  { value: 'south-asia', label: '🕌 South Asia' },
];

const VIBES = [
  { value: 'beach', label: '🏖️ Beach & Coastal' },
  { value: 'culture', label: '🏛️ Culture & Heritage' },
  { value: 'nature', label: '🌲 Nature & Mountains' },
  { value: 'city', label: '🏙️ Urban Explorer' },
  { value: 'mixed', label: '🎯 Mixed Experiences' },
];

function filterItineraries(it: Itinerary, form: FormState): boolean {
  const days = parseInt(it.duration) || 3;

  if (form.duration) {
    const [min, max] = form.duration === '5+' ? [5, 99] : form.duration.split('-').map(Number);
    if (days < min || days > max) return false;
  }

  if (form.difficulty && it.difficulty !== form.difficulty) return false;

  if (form.familyTrip === 'yes' && it.familyHighlights.length === 0) return false;

  if (form.region) {
    const regionCountries: Record<string, string[]> = {
      'se-asia': ['thailand', 'malaysia', 'vietnam', 'indonesia', 'singapore', 'philippines', 'laos', 'cambodia', 'myanmar'],
      'east-asia': ['japan', 'china', 'korea', 'taiwan'],
      'south-asia': ['india', 'nepal', 'sri lanka', 'bangladesh'],
    };
    const countries = regionCountries[form.region] || [];
    if (!it.countries.some(c => countries.includes(c.toLowerCase()))) return false;
  }

  if (form.vibe) {
    const tagsLower = it.tags.join(' ').toLowerCase();
    const descLower = it.description.toLowerCase();
    if (form.vibe === 'beach' && !(/beach|coastal|coast|ocean|sea/.test(tagsLower) || /beach|coast|ocean/.test(descLower))) return false;
    if (form.vibe === 'culture' && !(/culture|temple|heritage|history/.test(tagsLower) || /temple|historic|cultural/.test(descLower))) return false;
    if (form.vibe === 'nature' && !(/nature|mountain|forest|park/.test(tagsLower) || /mountain|nature|scenic/.test(descLower))) return false;
    if (form.vibe === 'city' && !(/city|urban|tokyo|bangkok|singapore/.test(tagsLower) || /city|urban/.test(descLower))) return false;
  }

  return true;
}

export default function RoutePlannerForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const allItineraries = useMemo(() => getAllItineraries(), []);

  const results = useMemo(() => {
    const hasFilters = Object.values(form).some(v => v !== '');
    if (!hasFilters) return allItineraries;
    return allItineraries.filter(it => filterItineraries(it, form));
  }, [form, allItineraries]);

  const hasFilters = Object.values(form).some(v => v !== '');

  const update = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }));
    setSubmitted(false);
  };

  const clearAll = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 md:p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
        <Route size={20} className="text-sky-500" />
        Route Planner
      </h2>
      <p className="text-xs text-gray-500 mb-4">
        Tell us about your trip and we&apos;ll find the perfect EV route.
      </p>

      {/* Filters grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {/* Duration */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Duration</label>
          <div className="space-y-1">
            {DURATIONS.map(d => (
              <button
                key={d.value}
                onClick={() => update('duration', d.value)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  form.duration === d.value
                    ? 'bg-sky-50 border-sky-300 text-sky-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Difficulty</label>
          <div className="space-y-1">
            {DIFFICULTIES.map(d => (
              <button
                key={d.value}
                onClick={() => update('difficulty', d.value)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  form.difficulty === d.value
                    ? 'bg-sky-50 border-sky-300 text-sky-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Family trip */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Family Trip</label>
          <div className="space-y-1">
            {[
              { value: 'yes', label: '👨‍👩‍👧‍👦 Yes, with kids' },
              { value: 'no', label: '👤 Adults only' },
            ].map(o => (
              <button
                key={o.value}
                onClick={() => update('familyTrip', o.value)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  form.familyTrip === o.value
                    ? 'bg-sky-50 border-sky-300 text-sky-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Region</label>
          <div className="space-y-1">
            {REGIONS.map(r => (
              <button
                key={r.value}
                onClick={() => update('region', r.value)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  form.region === r.value
                    ? 'bg-sky-50 border-sky-300 text-sky-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe */}
        <div>
          <label className="block text-[10px] font-semibold text-gray-400 mb-1.5 uppercase tracking-wider">Vibe</label>
          <div className="space-y-1">
            {VIBES.map(v => (
              <button
                key={v.value}
                onClick={() => update('vibe', v.value)}
                className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                  form.vibe === v.value
                    ? 'bg-sky-50 border-sky-300 text-sky-700 font-medium'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Clear + Search count */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-gray-400 hover:text-gray-600 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500">
          {hasFilters ? (
            <span className="font-medium text-sky-700">{results.length} route{results.length !== 1 ? 's' : ''} match</span>
          ) : (
            <span className="text-gray-400">Select filters to narrow down</span>
          )}
        </div>
      </div>

      {/* Results */}
      {hasFilters && (
        <div className="mt-4 space-y-2 max-h-[400px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="text-center py-6">
              <Search size={24} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No routes match these filters. Try different preferences.</p>
            </div>
          ) : (
            results.map(it => (
              <Link
                key={it.id}
                href={`/routes/${it.slug}`}
                className="group flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                  <Route size={16} className="text-sky-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-sky-700 truncate">
                    {it.title.split(':')[0] || it.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">{it.cities.join(' → ')}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                    <span>{it.duration}</span>
                    <span>·</span>
                    <span>{it.totalDistanceKm} km</span>
                    <span>·</span>
                    <span className={`capitalize ${
                      it.difficulty === 'easy' ? 'text-emerald-500' :
                      it.difficulty === 'moderate' ? 'text-amber-500' : 'text-red-500'
                    }`}>{it.difficulty}</span>
                    {it.familyHighlights.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-emerald-500">👨‍👩‍👧‍👦</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight size={14} className="text-gray-300 group-hover:text-sky-500 shrink-0 mt-2" />
              </Link>
            ))
          )}
        </div>
      )}

      {/* Bottom CTA */}
      {!hasFilters && (
        <div className="text-center py-4">
          <Link
            href="/routes"
            className="inline-flex items-center gap-1.5 text-xs text-sky-600 hover:text-sky-700 font-medium"
          >
            Browse all {allItineraries.length} routes
            <ChevronRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}
