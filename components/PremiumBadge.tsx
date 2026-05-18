'use client';

import { Crown, Check, Star, Sparkles, Award, Plane, Hotel, ExternalLink, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PremiumPerks {
  is_premium: boolean;
  perk_theme?: string;
  perks?: string[];
  seoKeywords?: string[];
}

interface PremiumBadgeProps {
  premium_perks: PremiumPerks;
  destinationName: string;
  city: string;
  country: string;
}

// ─── Category-specific premium badges ──────────────────────────

const THEME_ICONS: Record<string, { icon: React.ElementType; color: string; emoji: string }> = {
  'Business Class & First Class Flying': { icon: Plane, color: 'from-indigo-500 to-purple-600', emoji: '✈️' },
  'Private Luxury Villas': { icon: Hotel, color: 'from-emerald-500 to-teal-600', emoji: '🏡' },
  'Michelin Dining': { icon: Star, color: 'from-amber-500 to-orange-600', emoji: '⭐' },
  'Exclusive Experience': { icon: Sparkles, color: 'from-purple-500 to-pink-600', emoji: '✨' },
  'Spa & Wellness': { icon: Sparkles, color: 'from-cyan-500 to-blue-600', emoji: '🌊' },
  'Luxury Resort': { icon: Hotel, color: 'from-amber-400 to-orange-500', emoji: '🏰' },
  'Adventure': { icon: Award, color: 'from-green-500 to-emerald-600', emoji: '🌄' },
  'Private Villa': { icon: Hotel, color: 'from-rose-500 to-pink-600', emoji: '🌴' },
};

function priceTier(priceRange: string): string {
  const clean = priceRange.replace(/[^$]/g, '');
  if (clean === '$$$$') return 'Ultra-Luxury';
  if (clean === '$$$') return 'Premium';
  return '';
}

export default function PremiumBadge({ premium_perks, destinationName, city, country }: PremiumBadgeProps) {
  if (!premium_perks?.is_premium) return null;

  const theme = premium_perks.perk_theme || 'Luxury Resort';
  const themeConfig = THEME_ICONS[theme] || THEME_ICONS['Luxury Resort'];
  const Icon = themeConfig.icon;

  return (
    <div className="group bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-200/80 rounded-2xl p-4 sm:p-5 hover:border-amber-300 hover:shadow-lg transition-all duration-200">
      {/* Header with gradient accent */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${themeConfig.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
          <Icon size={18} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-gray-900">Premium Family Experience</h4>
            <span className="text-[9px] bg-gradient-to-r from-amber-400 to-orange-400 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              {priceTier('$$$$') || 'Premium'}
            </span>
          </div>
          <p className="text-[10px] text-amber-700 font-medium">{theme}</p>
        </div>
        <Award size={16} className="text-amber-400 ml-auto" />
      </div>

      {/* Perks list */}
      {premium_perks.perks && premium_perks.perks.length > 0 && (
        <ul className="space-y-1.5 mb-3">
          {premium_perks.perks.slice(0, 5).map((perk, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
              <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={9} className="text-emerald-600" />
              </div>
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA — dual action */}
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <Link
          href={`/search?priceRange=$$$$&q=${encodeURIComponent(destinationName)}`}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-4 py-2 rounded-xl transition-all hover:shadow-md active:scale-[0.98]"
        >
          <Crown size={12} />
          Compare Prices & Save
          <ExternalLink size={10} />
        </Link>
        <Link
          href="/search?priceRange=$$$$"
          className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition-all"
        >
          View All Premium Deals
          <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
}
