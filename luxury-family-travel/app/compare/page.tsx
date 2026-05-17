'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Star, ArrowRight, X, MapPin, Users, Clock, DollarSign, Award, Scale, Briefcase, PlusCircle } from 'lucide-react';

const ALL_DESTINATIONS = [
  { id: 'phuket-001', slug: 'amanpuri-phuket', name: 'Amanpuri', city: 'Phuket', country: 'Thailand', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$', popularity: 98, bestTime: 'Nov-May', amenities: ['Kids Club', 'Butler Service', 'Private Beach', 'Spa'], description: 'Aman first property, private peninsula.' },
  { id: 'tokyo-001', slug: 'aman-tokyo', name: 'Aman Tokyo', city: 'Tokyo', country: 'Japan', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$', popularity: 98, bestTime: 'Mar-May, Oct-Nov', amenities: ['Indoor Pool', 'Spa', 'Concierge', 'Kids Welcome'], description: 'Top 6 floors of Otemachi Tower.' },
  { id: 'maldives-001', slug: 'soneva-fushi-maldives', name: 'Soneva Fushi', city: 'Maldives', country: 'Maldives', category: 'Private Island', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$$', popularity: 97, bestTime: 'Nov-Apr', amenities: ['Waterslides', 'Chocolate Room', 'Observatory', 'Kids Club', 'Butler Service'], description: 'Private island, waterslides, chocolate room.' },
  { id: 'maldives-002', slug: 'velaa-private-island', name: 'Velaa Private Island', city: 'Maldives', country: 'Maldives', category: 'Private Island', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$$', popularity: 96, bestTime: 'Nov-Apr', amenities: ['Submarine', 'Private Yacht', 'Wine Cellar', 'Spa', 'Kids Club'], description: '47 villas, submarine, private yacht.' },
  { id: 'kyoto-001', slug: 'aman-kyoto', name: 'Aman Kyoto', city: 'Kyoto', country: 'Japan', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$', popularity: 96, bestTime: 'Mar-May, Oct-Nov', amenities: ['Moss Garden', 'Onsen', 'Tea Ceremony', 'Concierge'], description: '26 pavilions, 32 acres moss garden.' },
  { id: 'bali-001', slug: 'four-seasons-sayan-bali', name: 'Four Seasons Sayan', city: 'Bali', country: 'Indonesia', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$', popularity: 95, bestTime: 'Apr-Oct', amenities: ['Kids Club', 'Butler Service', 'Rice Terrace', 'Spa'], description: 'Luxury in Ayung River valley.' },
  { id: 'hongkong-002', slug: 'four-seasons-hong-kong', name: 'Four Seasons Hong Kong', city: 'Hong Kong', country: 'Hong Kong', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$', popularity: 95, bestTime: 'Oct-Dec', amenities: ['Michelin Dining', 'Infinity Pool', 'Spa', 'Concierge'], description: '2 Michelin-star Chinese, best spa.' },
  { id: 'palawan-001', slug: 'amanpulo-palawan', name: 'Amanpulo', city: 'Palawan', country: 'Philippines', category: 'Private Island', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$$', popularity: 95, bestTime: 'Nov-May', amenities: ['Private Beach', 'Snorkeling', 'Casita Villas', 'Spa', 'Kids Club'], description: 'Private island sanctuary.' },
  { id: 'phuket-002', slug: 'trisara-phuket', name: 'Trisara', city: 'Phuket', country: 'Thailand', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$$', popularity: 94, bestTime: 'Nov-May', amenities: ['Michelin Dining', 'Private Pool', 'Spa', 'Butler Service'], description: 'Garden in Third Heaven.' },
  { id: 'hongkong-001', slug: 'mandarin-oriental-hong-kong', name: 'Mandarin Oriental Hong Kong', city: 'Hong Kong', country: 'Hong Kong', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$$', popularity: 94, bestTime: 'Oct-Dec', amenities: ['Michelin Dining', 'Harbour View', 'Spa', 'Concierge'], description: '1963 institution, harbour views.' },
  { id: 'bali-002', name: 'Bulgari Resort Bali', city: 'Bali', country: 'Indonesia', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.7, priceRange: '$$$$', popularity: 93, bestTime: 'Apr-Oct', amenities: ['Private Beach', 'Spa', 'Butler Service', 'Wedding Chapel'], description: 'Italian design meets Balinese.' },
  { id: 'bali-003', name: 'Ayana Estate', city: 'Bali', country: 'Indonesia', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.6, priceRange: '$$$', popularity: 92, bestTime: 'Apr-Oct', amenities: ['Kids Club', 'Multiple Pools', 'Rock Bar', 'Spa'], description: '90-hectare cliff-top resort.' },
  { id: 'langkawi-001', name: 'The Datai Langkawi', city: 'Langkawi', country: 'Malaysia', category: 'Luxury Resort', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$', popularity: 91, bestTime: 'Nov-May', amenities: ['Kids Club', 'Rainforest', 'Butler Service', 'Spa'], description: 'A legendary rainforest resort.' },
  { id: 'singapore-001', name: 'Raffles Singapore', city: 'Singapore', country: 'Singapore', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$$', popularity: 91, bestTime: 'Jan-Mar', amenities: ['Butler Service', 'Heritage', 'Michelin Dining', 'Spa'], description: 'Colonial grandeur since 1887.' },
  { id: 'bali-007', name: 'Capella Ubud', city: 'Bali', country: 'Indonesia', category: 'Luxury Camp', ageRange: '0-16', safetyRating: 4.7, priceRange: '$$$$', popularity: 90, bestTime: 'Apr-Oct', amenities: ['Glamping', 'Rainforest', 'Spa', 'Stargazing'], description: 'Luxury tented camp in the jungle.' },
  { id: 'maldives-005', name: 'Cheval Blanc Randheli', city: 'Maldives', country: 'Maldives', category: 'Private Island', ageRange: '0-16', safetyRating: 4.9, priceRange: '$$$$$', popularity: 90, bestTime: 'Nov-Apr', amenities: ['Butler Service', 'Spa', 'Fine Dining', 'Kids Club'], description: 'LVMH luxury in the Maldives.' },
  { id: 'tokyo-002', name: 'Park Hyatt Tokyo', city: 'Tokyo', country: 'Japan', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.7, priceRange: '$$$', popularity: 89, bestTime: 'Mar-May', amenities: ['Famous Bar', 'Spa', 'Pool', 'Concierge'], description: 'Lost in Translation icon.' },
  { id: 'kyoto-002', name: 'Ritz-Carlton Kyoto', city: 'Kyoto', country: 'Japan', category: 'Luxury Hotel', ageRange: '0-16', safetyRating: 4.8, priceRange: '$$$$', popularity: 89, bestTime: 'Mar-May', amenities: ['Kamo-gawa View', 'Spa', 'Michelin Dining', 'Butler Service'], description: 'Luxury on the Kamo-gawa river.' },
];

function computeSafetyLabel(rating: number): string {
  if (rating >= 4.8) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  return 'Good';
}

function computeFamilyScore(dest: typeof ALL_DESTINATIONS[0]): number {
  let score = 0;
  score += dest.safetyRating * 2;
  score += dest.popularity * 0.05;
  if (dest.amenities?.includes('Kids Club')) score += 1;
  if (dest.amenities?.includes('Butler Service')) score += 0.5;
  if (dest.ageRange === '0-16') score += 0.5;
  return Math.round(score * 10) / 10;
}

export default function ComparePage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDestination = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(x => x !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selected = useMemo(
    () => ALL_DESTINATIONS.filter(d => selectedIds.includes(d.id)).sort((a, b) => {
      const familyScoreA = computeFamilyScore(a);
      const familyScoreB = computeFamilyScore(b);
      return familyScoreB - familyScoreA;
    }),
    [selectedIds]
  );

  const filtered = useMemo(
    () => ALL_DESTINATIONS.filter(d =>
      !selectedIds.includes(d.id) &&
      (d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
       d.country.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
    [searchTerm, selectedIds]
  );

  const comparisonRows = [
    { label: 'Category', icon: Briefcase, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.category },
    { label: 'Location', icon: MapPin, getValue: (d: typeof ALL_DESTINATIONS[0]) => `${d.city}, ${d.country}` },
    { label: 'Price Range', icon: DollarSign, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.priceRange },
    { label: 'Age Range', icon: Users, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.ageRange },
    { label: 'Best Time', icon: Clock, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.bestTime },
    { label: 'Safety', icon: Award, getValue: (d: typeof ALL_DESTINATIONS[0]) => `${d.safetyRating}/5 (${computeSafetyLabel(d.safetyRating)})` },
    { label: 'Popularity', icon: Star, getValue: (d: typeof ALL_DESTINATIONS[0]) => `${d.popularity}%` },
    { label: 'Family Score', icon: Scale, getValue: (d: typeof ALL_DESTINATIONS[0]) => `${computeFamilyScore(d)}/10` },
    { label: 'Kids Club', icon: Users, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.amenities?.includes('Kids Club') ? '✓' : '—' },
    { label: 'Butler Service', icon: Briefcase, getValue: (d: typeof ALL_DESTINATIONS[0]) => d.amenities?.includes('Butler Service') ? '✓' : '—' },
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Compare Luxury Family Resorts
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            Select up to 3 properties to compare side-by-side and find the perfect family escape.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gold/10">
          {/* Selection */}
          {selected.length < 3 && (
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search destinations to compare..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 bg-gray-50 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 outline-none text-sm transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              {searchTerm && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {filtered.slice(0, 12).map(d => (
                    <button
                      key={d.id}
                      onClick={() => {
                        toggleDestination(d.id);
                        setSearchTerm('');
                      }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:border-gold/30 hover:bg-gold/5 transition-all text-left"
                    >
                      <PlusCircle size={14} className="text-gray-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">{d.name}</p>
                        <p className="text-xs text-gray-500">{d.city}, {d.country}</p>
                      </div>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="col-span-full text-sm text-gray-500 py-4 text-center">
                      No matching destinations found.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Selected badges */}
          {selected.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Comparing:</span>
              {selected.map((d) => (
                <span
                  key={d.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold/10 text-gold-dark border border-gold/20 text-sm font-medium"
                >
                  {d.name}
                  <button onClick={() => toggleDestination(d.id)} className="hover:text-gold-dark/70">
                    <X size={14} />
                  </button>
                </span>
              ))}
              {selected.length > 0 && selected.length < 3 && (
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-xs text-gray-500 hover:text-charcoal underline"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {/* Comparison Table */}
          {selected.length >= 2 ? (
            <div className="overflow-x-auto -mx-6 md:-mx-8">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    <th className="w-[140px] px-6 py-4 text-left">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Feature</span>
                    </th>
                    {selected.map((d) => (
                      <th key={d.id} className="px-4 py-4 text-left border-l border-gray-100">
                        <Link
                          href={`/destination/${d.slug || d.id}`}
                          className="text-lg font-bold text-charcoal-dark hover:text-gold-dark transition-colors"
                        >
                          {d.name}
                        </Link>
                        <p className="text-xs text-gray-500 mt-0.5">{d.description}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700 flex items-center gap-2">
                        <row.icon size={14} className="text-gray-400" />
                        {row.label}
                      </td>
                      {selected.map((d) => {
                        const val = row.getValue(d);
                        return (
                          <td
                            key={d.id}
                            className={`px-4 py-4 text-sm border-l border-gray-100 ${
                              val === '✓' ? 'text-emerald-600 font-semibold' :
                              val === '—' ? 'text-gray-300' : 'text-gray-700'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : selected.length === 1 ? (
            <div className="text-center py-16">
              <Scale size={40} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">Select One More Destination</h3>
              <p className="text-gray-500 text-sm">Add at least one more property to compare side-by-side.</p>
            </div>
          ) : (
            <div className="text-center py-16">
              <Scale size={40} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">Select 2-3 Properties to Compare</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Choose from our curated collection of 18+ luxury family destinations across Asia.
              </p>
            </div>
          )}

          {/* CTA */}
          {selected.length >= 2 && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-all shadow-sm"
              >
                Browse All 50+ Destinations
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
