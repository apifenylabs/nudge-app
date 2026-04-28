'use client';

import { SlidersHorizontal, X, ChevronDown, Shield, ArrowUpDown, ListFilter } from 'lucide-react';
import { useState, useMemo } from 'react';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  selectedAge: string;
  onAgeChange: (a: string) => void;
  selectedPrice: string;
  onPriceChange: (p: string) => void;
  minSafety: number | null;
  onSafetyChange: (s: number | null) => void;
  selectedCountry: string;
  onCountryChange: (c: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  countries: string[];
  categories: string[];
  resultsCount: number;
  onClearAll: () => void;
}

const ageOptions = [
  { value: 'All', label: 'All Ages' },
  { value: '0-3', label: 'Toddlers 0-3' },
  { value: '4-9', label: 'Kids 4-9' },
  { value: '10+', label: 'Tweens 10+' },
];
const priceOptions = [
  { value: 'All', label: 'Any Price' },
  { value: '$', label: 'Free / $' },
  { value: '$$', label: '$$' },
  { value: '$$$', label: '$$$' },
  { value: '$$$$', label: '$$$$' },
];
const safetyOptions = [3.5, 4.0, 4.5];
const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'safety', label: 'Safety Rating' },
  { value: 'price', label: 'Price: Low-High' },
];

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${active ? 'bg-sky-100 text-sky-700 border-sky-200 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
      {label}
    </button>
  );
}

export default function FilterBar({
  selectedCategory, onCategoryChange, selectedAge, onAgeChange,
  selectedPrice, onPriceChange, minSafety, onSafetyChange,
  selectedCountry, onCountryChange, sortBy, onSortChange,
  countries, categories, resultsCount, onClearAll,
}: FilterBarProps) {
  const [showMobile, setShowMobile] = useState(false);

  const activeFilterCount = useMemo(() => {
    let c = 0;
    if (selectedCategory !== 'All') c++;
    if (selectedAge !== 'All') c++;
    if (selectedPrice !== 'All') c++;
    if (minSafety !== null && minSafety > 0) c++;
    if (selectedCountry !== 'All') c++;
    return c;
  }, [selectedCategory, selectedAge, selectedPrice, minSafety, selectedCountry]);

  const catLabel = (c: string) => c === 'Theme Parks & Attractions' ? '🛝 Parks' : c === 'Nature & Outdoor Adventures' ? '🌿 Nature' : '🏛️ Cultural';

  const desktopBar = (
    <div className="flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
      {categories.map(c => <Pill key={c} label={catLabel(c)} active={selectedCategory === c} onClick={() => onCategoryChange(selectedCategory === c ? 'All' : c)} />)}
      <div className="w-px h-6 bg-gray-200 shrink-0" />
      {ageOptions.map(o =>
        o.value === 'All' ? null : <Pill key={o.value} label={o.label} active={selectedAge === o.value} onClick={() => onAgeChange(o.value)} />
      )}
      <div className="w-px h-6 bg-gray-200 shrink-0" />
      {priceOptions.slice(1).map(o => <Pill key={o.value} label={o.label} active={selectedPrice === o.value} onClick={() => onPriceChange(selectedPrice === o.value ? 'All' : o.value)} />)}
      <div className="w-px h-6 bg-gray-200 shrink-0" />
      {safetyOptions.map(s => <Pill key={s} label={<><Shield size={11} className="mr-0.5" />{s}+</> as any} active={minSafety === s} onClick={() => onSafetyChange(minSafety === s ? null : s)} />)}
      <div className="w-px h-6 bg-gray-200 shrink-0" />
      <select value={selectedCountry} onChange={e => onCountryChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-600 rounded-full px-3.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer pr-7 shrink-0">
        <option value="All">🌍 All Countries</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select value={sortBy} onChange={e => onSortChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 text-gray-600 rounded-full px-3.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-300 cursor-pointer pr-7 shrink-0">
        {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {activeFilterCount > 0 && (
        <button onClick={onClearAll} className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all">
          <X size={12} /> Clear
        </button>
      )}
    </div>
  );

  const mobilePanel = (
    <div className="sm:hidden bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-4">
      {[
        { label: 'Category', opts: categories.map(c => ({ v: c, l: catLabel(c), active: selectedCategory === c, onClick: () => onCategoryChange(selectedCategory === c ? 'All' : c) })) },
        { label: 'Age Range', opts: ageOptions.map(o => ({ v: o.value, l: o.label, active: selectedAge === o.value, onClick: () => onAgeChange(o.value) })) },
        { label: 'Price', opts: priceOptions.map(o => ({ v: o.value, l: o.label, active: selectedPrice === o.value, onClick: () => onPriceChange(o.value === 'All' ? o.value : selectedPrice === o.value ? 'All' : o.value) })) },
        { label: 'Safety', opts: safetyOptions.map(s => ({ v: String(s), l: `${s}+`, active: minSafety === s, onClick: () => onSafetyChange(minSafety === s ? null : s) })) },
      ].map(section => (
        <div key={section.label}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{section.label}</p>
          <div className="flex flex-wrap gap-2">
            {section.opts.map(o => (
              <button key={String(o.v)} onClick={o.onClick}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${o.active ? 'bg-sky-100 text-sky-700 border-sky-200' : 'bg-white text-gray-600 border-gray-200'}`}>
                {section.label === 'Safety' && <Shield size={14} className="inline mr-1" />}{o.l}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Country</p>
          <select value={selectedCountry} onChange={e => onCountryChange(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
            <option value="All">All Countries</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sort</p>
          <select value={sortBy} onChange={e => onSortChange(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300">
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      </div>
      {activeFilterCount > 0 && (
        <button onClick={() => { onClearAll(); setShowMobile(false); }}
          className="w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 border border-red-200 font-medium text-sm hover:bg-red-100 transition-all">
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">Destinations</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">{resultsCount} {resultsCount === 1 ? 'place' : 'places'}</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full"><ListFilter size={12} />{activeFilterCount}</span>
          )}
        </div>
        <button className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:border-gray-300" onClick={() => setShowMobile(!showMobile)}>
          <SlidersHorizontal size={14} /> Filters
          {activeFilterCount > 0 && <span className="w-4 h-4 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
        </button>
      </div>
      <div className="hidden sm:block">{desktopBar}</div>
      {showMobile && mobilePanel}
    </div>
  );
}
