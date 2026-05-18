'use client';

import { FC, useState } from 'react';
import { Crown, ExternalLink, Star, ChevronDown, ChevronUp, Zap, Shield, Award } from 'lucide-react';

/**
 * Premium Listing / Featured Partner Section
 * 
 * Showcases premium sponsors and partners with enhanced visibility.
 * Can be used on homepage, station pages, and route pages.
 * 
 * Fully additive — does not replace or remove any existing content.
 * Partners are configured via the `premiumPartners` array below;
 * update URLs and names as partnerships evolve.
 */

interface PremiumPartner {
  id: string;
  name: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: string;
  features: string[];
  tier: 'platinum' | 'gold' | 'silver';
  category: 'rental' | 'hotel' | 'tour' | 'insurance' | 'gear';
}

// --- Premium partner configuration ---
// Replace URLs with actual sponsored/affiliate links.
const premiumPartners: PremiumPartner[] = [
  {
    id: 'klook-ev-rental',
    name: 'Klook EV Rentals',
    description: 'Asia\'s largest EV rental marketplace. Book Tesla, Polestar, Hyundai IONIQ across 8 countries.',
    url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental',
    badge: '🌟 Featured Partner',
    badgeColor: 'bg-gradient-to-r from-amber-400 to-orange-500',
    features: [
      'Free cancellation up to 48h',
      'Insurance included',
      'Child seats available',
      '24/7 roadside assistance',
    ],
    tier: 'platinum',
    category: 'rental',
  },
  {
    id: 'booking-com-hotel',
    name: 'Booking.com — EV Hotels',
    description: 'Premium hotels with EV charging stations across Asia. Filter by EV charger amenity.',
    url: 'https://www.booking.com/index.html?aid=2875669&nflt=ht_id%3D204',
    badge: '🏨 Recommended',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    features: [
      'EV charging filter',
      'Free cancellation',
      'No booking fees',
      'Genius loyalty discounts',
    ],
    tier: 'platinum',
    category: 'hotel',
  },
  {
    id: 'viator-tours',
    name: 'Viator EV-Friendly Tours',
    description: 'Top-rated family tours that accommodate EV road trippers. Book experiences en route.',
    url: 'https://www.viator.com/?pid=P00299136',
    badge: '🎫 Premium Tours',
    badgeColor: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    features: [
      'Family-friendly guides',
      'Flexible scheduling',
      'Free cancellation',
      'Verified reviews',
    ],
    tier: 'gold',
    category: 'tour',
  },
  {
    id: 'ev-insurance',
    name: 'EV Road Trip Insurance',
    description: 'Comprehensive EV travel insurance covering charging delays, battery damage, and roadside assistance.',
    url: 'https://www.booking.com/index.html?aid=2875669',
    badge: '🛡️ Trusted',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-violet-600',
    features: [
      'Battery damage cover',
      'Charging delay',
      'Towing assistance',
      '24/7 claims support',
    ],
    tier: 'silver',
    category: 'insurance',
  },
  {
    id: 'ev-gear',
    name: 'Essential EV Road Trip Gear',
    description: 'Portable chargers, adapter kits, and cable organizers — curated for Asian road trips.',
    url: 'https://www.amazon.com/?tag=familytravel0d-20',
    badge: '🔌 Recommended Gear',
    badgeColor: 'bg-gradient-to-r from-gray-700 to-gray-900',
    features: [
      'Type 2 portable charger',
      'CCS2/CHAdeMO adapters',
      'Cable travel cases',
      'Fast shipping',
    ],
    tier: 'silver',
    category: 'gear',
  },
];

const tierConfig = {
  platinum: { icon: <Crown size={18} className="text-amber-400 fill-amber-400" />, label: 'Platinum Partner', bg: 'bg-gradient-to-br from-amber-50 via-white to-orange-50', border: 'border-amber-200' },
  gold: { icon: <Award size={16} className="text-blue-500" />, label: 'Gold Partner', bg: 'bg-gradient-to-br from-blue-50 via-white to-sky-50', border: 'border-blue-200' },
  silver: { icon: <Shield size={16} className="text-gray-500" />, label: 'Silver Partner', bg: 'bg-gray-50', border: 'border-gray-200' },
};

interface PremiumPartnerSectionProps {
  compact?: boolean;
  maxDisplay?: number;
}

const PremiumPartnerSection: FC<PremiumPartnerSectionProps> = ({ compact = false, maxDisplay }) => {
  const [expanded, setExpanded] = useState(false);
  const [expandedPartner, setExpandedPartner] = useState<string | null>(null);

  const sorted = [...premiumPartners].sort((a, b) => {
    const order = { platinum: 0, gold: 1, silver: 2 };
    return order[a.tier] - order[b.tier];
  });

  const displayCount = maxDisplay || (compact ? 2 : sorted.length);
  const shown = expanded ? sorted : sorted.slice(0, displayCount);

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-xl border border-amber-200/70 p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Crown size={16} className="text-amber-500 fill-amber-500" />
          <h3 className="text-sm font-bold text-gray-900">Premium Partners</h3>
          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">Sponsored</span>
        </div>
        <div className="space-y-2">
          {shown.map((partner) => {
            const cfg = tierConfig[partner.tier];
            return (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-lg border border-amber-100 hover:border-amber-300 hover:shadow-sm transition-all group"
              >
                <span className="text-lg shrink-0">{cfg.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-gray-900 truncate flex items-center gap-1.5">
                    {partner.name}
                    <span className="text-[9px] text-gray-400 font-normal bg-gray-100 px-1 py-0.5 rounded">{partner.tier}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">{partner.description}</div>
                </div>
                <ExternalLink size={12} className="text-gray-400 group-hover:text-amber-600 shrink-0 transition-colors" />
              </a>
            );
          })}
        </div>
        {sorted.length > displayCount && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium mt-2 mx-auto"
          >
            {expanded ? 'Show less' : `View all ${sorted.length} partners`}
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          We earn a commission when you book through partner links, at no extra cost to you.
        </p>
      </div>
    );
  }

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Crown size={20} className="text-amber-500 fill-amber-500" />
        <h2 className="text-lg font-bold text-gray-900">Premium Partners & Featured Listings</h2>
        <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium border border-amber-200">Sponsored</span>
      </div>

      <div className="space-y-4">
        {shown.map((partner) => {
          const cfg = tierConfig[partner.tier];
          const isExpanded = expandedPartner === partner.id;

          return (
            <div
              key={partner.id}
              className={`${cfg.bg} border ${cfg.border} rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              {/* Partner header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 shrink-0">
                    {cfg.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{partner.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`inline-block text-white text-[9px] font-semibold px-2 py-0.5 rounded-full ${partner.badgeColor}`}>
                        {partner.badge}
                      </span>
                      <span className="text-gray-400 text-[10px] capitalize">{partner.tier} partner</span>
                    </div>
                  </div>
                </div>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg hover:scale-105 transition-all"
                >
                  Learn more <ExternalLink size={12} />
                </a>
              </div>

              <p className="text-sm text-gray-600 mb-3">{partner.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-3">
                {partner.features.map((feat, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600">
                    <Star size={10} className="text-emerald-500 fill-emerald-500" />
                    {feat}
                  </span>
                ))}
              </div>

              {/* Expandable partner details */}
              <button
                onClick={() => setExpandedPartner(isExpanded ? null : partner.id)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 font-medium"
              >
                {isExpanded ? 'Show less' : 'Partner details'}
                {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>

              {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 space-y-1 animate-fade-in">
                  <p><strong>Category:</strong> {partner.category === 'rental' ? 'EV Car Rental' : partner.category === 'hotel' ? 'Accommodation' : partner.category === 'tour' ? 'Tours & Activities' : partner.category === 'insurance' ? 'Travel Insurance' : 'EV Gear & Accessories'}</p>
                  <p><strong>Commission:</strong> We receive a commission for bookings made through our partner links, at no additional cost to you.</p>
                  <p><strong>Availability:</strong> Services available across major Asian EV road trip destinations.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show all / show less */}
      {sorted.length > displayCount && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-sky-600 hover:text-sky-700 font-medium mt-3 mx-auto"
        >
          {expanded ? 'Show less' : `Show all ${sorted.length} premium partners`}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      <p className="text-[10px] text-gray-400 mt-3">
        Some links on this page are affiliate links. If you book through them, we may earn a commission at no extra cost to you.
      </p>
    </section>
  );
};

export default PremiumPartnerSection;
