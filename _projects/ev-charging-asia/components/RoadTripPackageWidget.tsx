'use client';

import { FC, useState } from 'react';
import { ExternalLink, Package, ChevronDown, ChevronUp, Star, Zap, MapPin, Calendar, Users } from 'lucide-react';

/**
 * EV Road Trip Package Booking Widget
 * 
 * Displays bundled packages for EV road trips — combining car rental,
 * hotels, and activities into bookable packages.
 * 
 * Fully additive — does not replace any existing component.
 */

interface PackageDeal {
  id: string;
  name: string;
  description: string;
  country: string;
  cities: string[];
  duration: string;
  priceLabel: string;
  url: string;
  highlights: string[];
  rating: number;
  badge: string;
  category: 'weekend' | 'week-long' | 'extended';
}

const packageDeals: PackageDeal[] = [
  {
    id: 'sg-kl-weekend',
    name: 'Singapore → KL Weekend Escape',
    description: '3-day EV road trip from Singapore to Kuala Lumpur with charging stops at Melaka heritage sites. Includes EV rental + 2 nights luxury hotel.',
    country: 'Singapore',
    cities: ['Singapore', 'Melaka', 'Kuala Lumpur'],
    duration: '3 days',
    priceLabel: 'From S$899',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=sg-kl-package',
    highlights: ['EV rental included', 'Luxury hotel stay', 'Melaka heritage tour', 'Charging stops planned'],
    rating: 4.8,
    badge: '🌏 Best Seller',
    category: 'weekend',
  },
  {
    id: 'bkk-cnx-adventure',
    name: 'Bangkok → Chiang Mai Northern Adventure',
    description: '5-day EV road trip through Northern Thailand. Visit elephant sanctuaries, mountain temples, and local markets. EV + accommodation + tours.',
    country: 'Thailand',
    cities: ['Bangkok', 'Ayutthaya', 'Chiang Mai', 'Pai'],
    duration: '5 days',
    priceLabel: 'From ฿28,000',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=bkk-cnx-package',
    highlights: ['EV rental (Tesla Model 3)', 'Elephant sanctuary visit', '4 nights boutique hotels', 'Charging support'],
    rating: 4.9,
    badge: '🌿 Family Favorite',
    category: 'week-long',
  },
  {
    id: 'bali-loop-package',
    name: 'Bali EV Loop Explorer',
    description: '4-day Bali EV loop from Seminyak to Ubud. Electric scooter & car options. Temple tours, waterfalls, and rice terrace visits.',
    country: 'Indonesia',
    cities: ['Seminyak', 'Ubud', 'Canggu', 'Jimbaran'],
    duration: '4 days',
    priceLabel: 'From US$520',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=bali-loop-package',
    highlights: ['EV scooter or car', 'Ubud monkey forest', 'Waterfall tours', 'Seafood dinner'],
    rating: 4.7,
    badge: '🌴 Top Rated',
    category: 'week-long',
  },
  {
    id: 'tokyo-hakone-micro',
    name: 'Tokyo → Hakone Micro-Trip',
    description: '2-day weekend micro-trip from Tokyo to Hakone. Mt. Fuji views, onsen, and mountain EV driving. Compact but unforgettable.',
    country: 'Japan',
    cities: ['Tokyo', 'Hakone'],
    duration: '2 days',
    priceLabel: 'From ¥72,000',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=tokyo-hakone-package',
    highlights: ['Nissan Sakura rental', 'Onsen ryokan stay', 'Hakone ropeway', 'Mt. Fuji viewpoint'],
    rating: 4.8,
    badge: '🗾 Quick Getaway',
    category: 'weekend',
  },
  {
    id: 'kl-penang-coastal',
    name: 'KL → Penang Coastal Run',
    description: '3-day coastal EV drive from Kuala Lumpur to Penang. Ipoh heritage, Penang street food, and Batu Ferringhi beaches.',
    country: 'Malaysia',
    cities: ['Kuala Lumpur', 'Ipoh', 'Penang'],
    duration: '3 days',
    priceLabel: 'From RM2,100',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=kl-penang-package',
    highlights: ['EV rental', 'Ipoh heritage walk', 'Penang food trail', 'Beach resort stay'],
    rating: 4.6,
    badge: '🍜 Foodie Pick',
    category: 'weekend',
  },
  {
    id: 'osaka-tokyo-cross',
    name: 'Osaka → Tokyo Cross-Country',
    description: '7-day epic EV road trip from Osaka to Tokyo via Nagoya, Shizuoka, and Mt. Fuji. The ultimate Japanese EV adventure.',
    country: 'Japan',
    cities: ['Osaka', 'Nagoya', 'Shizuoka', 'Hakone', 'Tokyo'],
    duration: '7 days',
    priceLabel: 'From ¥198,000',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=osaka-tokyo-package',
    highlights: ['7 days EV rental', 'Historic castle visits', 'Hot spring resorts', 'Tokyo drop-off'],
    rating: 4.9,
    badge: '⭐ Premium Choice',
    category: 'extended',
  },
];

const categoryLabels: Record<string, string> = {
  weekend: '🚗 Weekend Trips',
  'week-long': '🗓️ Week-Long Adventures',
  extended: '🌟 Extended Journeys',
};

interface RoadTripPackageWidgetProps {
  country?: string;
  compact?: boolean;
  maxDisplay?: number;
}

const RoadTripPackageWidget: FC<RoadTripPackageWidgetProps> = ({ country, compact = false, maxDisplay }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  let filtered = packageDeals;
  if (country) {
    filtered = packageDeals.filter(p => p.country === country);
    // If no country-specific packages, show all
    if (filtered.length === 0) filtered = packageDeals;
  }

  const displayCount = maxDisplay || (compact ? 2 : filtered.length);
  const shown = expanded ? filtered : filtered.slice(0, displayCount);

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-sky-50 via-white to-indigo-50 rounded-xl border border-sky-200/70 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Package size={16} className="text-sky-500" />
          <h3 className="text-sm font-bold text-gray-900">EV Road Trip Packages</h3>
          <span className="text-[10px] bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded-full font-medium">Bookable</span>
        </div>
        <div className="space-y-2">
          {shown.map((deal) => (
            <a
              key={deal.id}
              href={deal.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-lg border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all group"
            >
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  {deal.rating.toFixed(1)}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-gray-900 truncate group-hover:text-sky-700 transition-colors">
                  {deal.name}
                </div>
                <div className="text-[10px] text-gray-500 truncate">{deal.duration} · {deal.priceLabel}</div>
              </div>
              <ExternalLink size={12} className="text-gray-400 group-hover:text-sky-600 shrink-0 transition-colors" />
            </a>
          ))}
        </div>
        {filtered.length > displayCount && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium mt-2 mx-auto"
          >
            {expanded ? 'Show less' : `View all ${filtered.length} packages`}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Book your complete EV road trip package — car, hotels, and experiences included.
        </p>
      </div>
    );
  }

  // Group by category for the full version
  const grouped = filtered.reduce<Record<string, PackageDeal[]>>((acc, deal) => {
    if (!acc[deal.category]) acc[deal.category] = [];
    acc[deal.category].push(deal);
    return acc;
  }, {});

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Package size={20} className="text-sky-500" />
        <h2 className="text-lg font-bold text-gray-900">EV Road Trip Packages</h2>
        <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full font-medium border border-sky-200">Bookable Deals</span>
      </div>

      {country && (
        <p className="text-sm text-gray-500 mb-4">
          Curated EV road trip packages {country ? `for ${country}` : 'across Asia'} — includes rental, accommodation, and experiences.
        </p>
      )}

      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, deals]) => (
          <div key={cat}>
            <h3 className="text-sm font-bold text-gray-800 mb-3">{categoryLabels[cat] || cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {deals.map((deal) => {
                const isExpanded = expandedPackage === deal.id;
                return (
                  <div
                    key={deal.id}
                    className="bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-sky-300 hover:-translate-y-1 transition-all duration-300 p-4 group"
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">
                        {deal.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <Star size={12} className="fill-amber-500" />
                        {deal.rating}
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{deal.name}</h4>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{deal.description}</p>

                    {/* Quick stats */}
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {deal.duration}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {deal.cities.length} cities</span>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {deal.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm font-bold text-gray-900">{deal.priceLabel}</span>
                      <a
                        href={deal.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium rounded-lg hover:scale-105 transition-all"
                      >
                        Book now <ExternalLink size={10} />
                      </a>
                    </div>

                    {/* Expandable details */}
                    <button
                      onClick={() => setExpandedPackage(isExpanded ? null : deal.id)}
                      className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-gray-600 mt-2 w-full justify-center"
                    >
                      {isExpanded ? 'Less details' : 'More details'}
                      {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] text-gray-500 space-y-1 animate-fade-in">
                        <p><strong>Route:</strong> {deal.cities.join(' → ')}</p>
                        <p><strong>Includes:</strong> {deal.highlights.join(' · ')}</p>
                        <p className="text-[9px] text-gray-400 mt-1">Book through our affiliate link to support EV Charging Asia.</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
          <Package size={32} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500">No packages available yet. Check back soon!</p>
        </div>
      )}

      <p className="text-[10px] text-gray-400 mt-4 text-center">
        Package prices are indicative and subject to availability. We earn a commission when you book through our links.
      </p>
    </section>
  );
};

export default RoadTripPackageWidget;
