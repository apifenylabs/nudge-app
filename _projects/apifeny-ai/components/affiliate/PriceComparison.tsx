'use client';

import { FC } from 'react';
import AffiliateLink, { AffiliateProvider } from './AffiliateLink';
import { DollarSign, TrendingDown } from 'lucide-react';

// ---------------------------------------------------------------------------
// PriceComparison – a static price-comparison widget for any bookable item
// ---------------------------------------------------------------------------
// Displays a row of provider cards showing logo + price + "Check Price"
// button. Fully server-safe (no external API calls). Responsive: horizontal
// row on desktop → vertical stack on mobile.
//
// Use it on blog posts, itinerary pages, station pages to compare hotel /
// tour / rental prices across Booking.com, Klook, Viator, Expedia etc.
// ---------------------------------------------------------------------------

export interface PriceOption {
 provider: AffiliateProvider;
 /** Display price string, e.g. "$45", "฿1,200" */
 price: string;
 /** Fallback URL */
 url: string;
 /** Optional product ID for affiliate deep-linking */
 productId?: string;
 /** Optional label override, e.g. "Best Value" */
 badge?: string;
}

interface PriceComparisonProps {
 /** Human-friendly title, e.g. "Compare prices for this activity" */
 title?: string;
 /** Array of price options to compare */
 options: PriceOption[];
 /** Optional sort direction (default: cheapest-first) */
 sortBy?: 'price' | 'none';
}

// Color-coded badges so each provider gets a subtle highlight
const BADGE_COLORS: Record<string, string> = {
 'Best Value': 'bg-emerald-50 text-emerald-700 border-emerald-200',
 'Fastest': 'bg-sky-50 text-sky-700 border-sky-200',
 'Most Popular': 'bg-amber-50 text-amber-700 border-amber-200',
 'Premium': 'bg-purple-50 text-purple-700 border-purple-200',
};

const PriceComparison: FC<PriceComparisonProps> = ({
 title = 'Compare Prices',
 options,
 sortBy = 'price',
}) => {
 if (!options || options.length === 0) return null;

 const sorted = sortBy === 'price'
 ? [...options].sort((a, b) => {
 const aNum = parseFloat(a.price.replace(/[^0-9.]/g, ''));
 const bNum = parseFloat(b.price.replace(/[^0-9.]/g, ''));
 return aNum - bNum;
 })
 : options;

 return (
 <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
 {/* Header */}
 <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
 <DollarSign size={16} className="text-emerald-500 shrink-0" />
 <span className="text-sm font-semibold text-gray-900">{title}</span>
 {options.length > 1 && (
 <span className="text-[10px] text-gray-400 ml-auto">
 {options.length} providers
 </span>
 )}
 </div>

 {/* Option rows – vertical stack on mobile, horizontal row on sm+ */}
 <div className="p-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
 {sorted.map((opt, idx) => (
 <div
 key={`${opt.provider}-${idx}`}
 className={`
 flex flex-row items-center gap-3
 rounded-lg border border-gray-100 bg-gray-50/50
 p-3
 flex-1 min-w-0
 ${idx === 0 && sorted.length > 1 ? 'ring-1 ring-emerald-200 bg-emerald-50/30' : ''}
 `}
 >
 {/* Provider badge + price */}
 <div className="flex items-center gap-2 min-w-0 shrink">
 <AffiliateLink
 href={opt.url}
 provider={opt.provider}
 productId={opt.productId}
 showExternalIcon={false}
 className="!px-2 !py-1.5 !border-0 !bg-transparent hover:!bg-gray-100"
 >
 {null}
 </AffiliateLink>
 <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
 {opt.price}
 </span>
 </div>

 {/* Badge */}
 {opt.badge && (
 <span
 className={`
 text-[10px] font-semibold px-2 py-0.5 rounded-full border
 whitespace-nowrap shrink-0
 ${BADGE_COLORS[opt.badge] || 'bg-gray-100 text-gray-600 border-gray-200'}
 `}
 >
 {opt.badge}
 </span>
 )}

 {/* Spacer */}
 <div className="flex-1 min-w-2" />

 {/* CTA */}
 <AffiliateLink
 href={opt.url}
 provider={opt.provider}
 productId={opt.productId}
 className="!text-xs !px-3 !py-1.5 shrink-0"
 >
 Check Price
 </AffiliateLink>
 </div>
 ))}
 </div>

 {/* Cheapest label (when sorted) */}
 {sorted.length > 1 && sortBy === 'price' && (
 <div className="px-4 pb-3 flex items-center gap-1.5">
 <TrendingDown size={12} className="text-emerald-500" />
 <span className="text-[10px] text-gray-400">
 Cheapest option shown first. Prices may vary.
 </span>
 <span className="text-[10px] text-gray-400 ml-auto">Affiliate links</span>
 </div>
 )}
 </div>
 );
};

export default PriceComparison;
