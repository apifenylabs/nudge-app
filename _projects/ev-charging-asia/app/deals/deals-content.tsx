'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Zap, Crown, DollarSign, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import AffiliateCTABar from '@/components/AffiliateCTABar';
import { affiliateLinks } from '@/lib/affiliate-links';
import type { AffiliateLink, ChargingCostData } from '@/lib/affiliate-links';

// Dynamic imports for widget components
const RoadTripPackageWidget = dynamic(
  () => import('@/components/RoadTripPackageWidget'),
  { ssr: false, loading: () => <div className="h-48 bg-gray-50 rounded-xl animate-pulse" /> }
);

const PremiumPartnerSection = dynamic(
  () => import('@/components/PremiumPartnerSection'),
  { ssr: false, loading: () => <div className="h-32 bg-gray-50 rounded-xl animate-pulse" /> }
);

const PriceComparisonWidget = dynamic(
  () => import('@/components/PriceComparisonWidget'),
  { ssr: false, loading: () => <div className="h-32 bg-gray-50 rounded-xl animate-pulse" /> }
);

/** Charging cost data used by PriceComparisonWidget */
const CHARGING_COSTS = [
  { id: 'sg', country: 'Singapore', currency: 'SGD', symbol: 'S$', costPerKwh: 0.29, costRange: [0.22, 0.38] as [number, number], slowAC: 0.25, fastDC: 0.29, ultraFast: 0.35, source: 'SP Group / Shell Recharge', updated: '2026-03' },
  { id: 'my', country: 'Malaysia', currency: 'MYR', symbol: 'RM', costPerKwh: 0.15, costRange: [0.10, 0.20] as [number, number], slowAC: 0.12, fastDC: 0.15, ultraFast: 0.18, source: 'TNB EV', updated: '2026-03' },
  { id: 'th', country: 'Thailand', currency: 'THB', symbol: '฿', costPerKwh: 0.15, costRange: [0.10, 0.20] as [number, number], slowAC: 0.12, fastDC: 0.15, ultraFast: 0.18, source: 'MEA/PEA EV rates', updated: '2026-03' },
  { id: 'id', country: 'Indonesia', currency: 'IDR', symbol: 'Rp', costPerKwh: 0.20, costRange: [0.14, 0.26] as [number, number], slowAC: 0.16, fastDC: 0.20, ultraFast: 0.24, source: 'PLN EV', updated: '2026-03' },
  { id: 'jp', country: 'Japan', currency: 'JPY', symbol: '¥', costPerKwh: 0.28, costRange: [0.22, 0.36] as [number, number], slowAC: 0.24, fastDC: 0.28, ultraFast: 0.34, source: 'e-Mobility Power', updated: '2026-03' },
  { id: 'kr', country: 'South Korea', currency: 'KRW', symbol: '₩', costPerKwh: 0.22, costRange: [0.16, 0.28] as [number, number], slowAC: 0.18, fastDC: 0.22, ultraFast: 0.26, source: 'KEPCO EV', updated: '2026-03' },
  { id: 'cn', country: 'China', currency: 'CNY', symbol: '¥', costPerKwh: 0.12, costRange: [0.08, 0.18] as [number, number], slowAC: 0.09, fastDC: 0.12, ultraFast: 0.15, source: 'State Grid / TELD', updated: '2026-03' },
  { id: 'in', country: 'India', currency: 'INR', symbol: '₹', costPerKwh: 0.14, costRange: [0.10, 0.20] as [number, number], slowAC: 0.10, fastDC: 0.14, ultraFast: 0.18, source: 'Tata Power / EESL', updated: '2026-03' },
  { id: 'vn', country: 'Vietnam', currency: 'VND', symbol: '₫', costPerKwh: 0.16, costRange: [0.12, 0.22] as [number, number], slowAC: 0.12, fastDC: 0.16, ultraFast: 0.20, source: 'VinFast EV', updated: '2026-03' },
  { id: 'ph', country: 'Philippines', currency: 'PHP', symbol: '₱', costPerKwh: 0.24, costRange: [0.18, 0.30] as [number, number], slowAC: 0.20, fastDC: 0.24, ultraFast: 0.28, source: 'MERALCO EV', updated: '2026-03' },
] satisfies ChargingCostData[];

/** Feature affiliate links that fit the "deals" narrative */
const DEAL_AFFILIATE_LINKS: AffiliateLink[] = affiliateLinks.filter(
  l => l.tags.includes('Tesla') || l.tags.includes('luxury') || l.tags.includes('rental') || l.tags.includes('hotel')
).slice(0, 8);

const DealsPageContent: FC = () => {
  return (
    <>
      {/* Country Deals — affiliate-optimized quick links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-sky-500" />
          Deals by Country
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { country: 'Singapore', flag: '🇸🇬', slug: 'singapore', deals: 12 },
            { country: 'Malaysia', flag: '🇲🇾', slug: 'malaysia', deals: 8 },
            { country: 'Thailand', flag: '🇹🇭', slug: 'thailand', deals: 15 },
            { country: 'Japan', flag: '🇯🇵', slug: 'japan', deals: 10 },
            { country: 'Indonesia', flag: '🇮🇩', slug: 'indonesia', deals: 6 },
            { country: 'Vietnam', flag: '🇻🇳', slug: 'vietnam', deals: 5 },
            { country: 'South Korea', flag: '🇰🇷', slug: 'south-korea', deals: 7 },
            { country: 'China', flag: '🇨🇳', slug: 'china', deals: 4 },
          ].map((item) => (
            <a
              key={item.slug}
              href={`https://affiliate.klook.com/redirect?aid=119991&aff_adid=deals-${item.slug}`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:border-sky-200 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{item.flag}</span>
              <div>
                <div className="text-sm font-semibold text-gray-900 group-hover:text-sky-700 transition-colors">
                  {item.country}
                </div>
                <div className="text-[10px] text-gray-400">{item.deals} deals</div>
              </div>
              <ExternalLink size={12} className="ml-auto text-gray-300 group-hover:text-sky-500 transition-colors shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Road Trip Packages */}
      <section className="mb-10" id="road-trip-packages">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Zap size={18} className="text-sky-500" />
          EV Road Trip Packages
          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200">Best Value</span>
        </h2>
        <RoadTripPackageWidget />
      </section>

      {/* Premium Partners */}
      <section className="mb-10" id="premium-partners">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Crown size={18} className="text-amber-500" />
          Premium Partners
        </h2>
        <PremiumPartnerSection />
      </section>

      {/* Charging Cost Comparison */}
      <section className="mb-10" id="charging-costs">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign size={18} className="text-emerald-500" />
          EV Charging Cost Comparison
        </h2>
        <PriceComparisonWidget costs={CHARGING_COSTS} />
      </section>

      {/* Featured Deals — hand-picked affiliate links */}
      <section className="mb-10" id="featured-offers">
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-2xl border border-amber-200/70 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            Featured Offers
            <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium border border-red-200">Limited Time</span>
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Hand-picked deals with exclusive discounts for EV travelers.
          </p>
          <AffiliateCTABar links={DEAL_AFFILIATE_LINKS} title="Today's Top Deals" maxDisplay={8} />
        </div>
      </section>

      {/* Newsletter + Final CTA */}
      <section className="text-center bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl border border-sky-100 p-8 md:p-10">
        <span className="text-4xl block mb-3">🚗</span>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Don&apos;t Miss a Deal</h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-5">
          New EV packages and discounts added weekly. Bookmark this page and check back for the latest offers.
        </p>
        <a
          href="https://affiliate.klook.com/redirect?aid=119991&aff_adid=ev-rental"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md"
        >
          Browse All EV Rentals <ChevronRight size={16} />
        </a>
        <p className="text-[10px] text-gray-400 mt-3">
          We earn a commission when you book through our affiliate links, at no extra cost to you.
        </p>
      </section>
    </>
  );
};

export default DealsPageContent;
