'use client';

import Link from 'next/link';
import { Globe, MapPin, ArrowRight } from 'lucide-react';

/**
 * Country landing pages — top 20 for SEO internal link equity.
 * Maps to /ai-tools-{slug} SSG pages.
 */
const POPULAR_COUNTRIES = [
 { slug: 'usa', label: 'United States', flag: '🇺🇸' },
 { slug: 'china', label: 'China', flag: '🇨🇳' },
 { slug: 'india', label: 'India', flag: '🇮🇳' },
 { slug: 'japan', label: 'Japan', flag: '🇯🇵' },
 { slug: 'singapore', label: 'Singapore', flag: '🇸🇬' },
 { slug: 'united-kingdom', label: 'United Kingdom', flag: '🇬🇧' },
 { slug: 'canada', label: 'Canada', flag: '🇨🇦' },
 { slug: 'australia', label: 'Australia', flag: '🇦🇺' },
 { slug: 'germany', label: 'Germany', flag: '🇩🇪' },
 { slug: 'france', label: 'France', flag: '🇫🇷' },
 { slug: 'south-korea', label: 'South Korea', flag: '🇰🇷' },
 { slug: 'brazil', label: 'Brazil', flag: '🇧🇷' },
 { slug: 'hong-kong', label: 'Hong Kong', flag: '🇭🇰' },
 { slug: 'thailand', label: 'Thailand', flag: '🇹🇭' },
 { slug: 'vietnam', label: 'Vietnam', flag: '🇻🇳' },
 { slug: 'malaysia', label: 'Malaysia', flag: '🇲🇾' },
 { slug: 'indonesia', label: 'Indonesia', flag: '🇮🇩' },
 { slug: 'philippines', label: 'Philippines', flag: '🇵🇭' },
 { slug: 'netherlands', label: 'Netherlands', flag: '🇳🇱' },
 { slug: 'switzerland', label: 'Switzerland', flag: '🇨🇭' },
];

export default function BrowseByCountry() {
 return (
 <section className="py-16 sm:py-20 bg-white">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between mb-8">
 <div>
 <div className="flex items-center gap-2 mb-1">
 <div className="p-2 rounded-lg bg-emerald-100">
 <Globe className="w-5 h-5 text-emerald-600" />
 </div>
 <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
 Browse AI Tools by Country
 </h2>
 </div>
 <p className="text-sm text-gray-500 ml-[52px]">
 Region-specific directories with local pricing, compliance, and language support
 </p>
 </div>
 <Link
 href="/ai-tools-by-category"
 className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
 >
 View all countries
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>

 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
 {POPULAR_COUNTRIES.map((country) => (
 <Link
 key={country.slug}
 href={`/ai-tools-${country.slug}`}
 className="group flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-gray-200 bg-white hover:border-violet-300 hover:shadow-md hover:shadow-violet-100/50 hover:-translate-y-0.5 transition-all duration-200"
 >
 <span className="text-lg leading-none shrink-0">{country.flag}</span>
 <div className="min-w-0 flex-1">
 <span className="text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors truncate block">
 {country.label}
 </span>
 <span className="text-[10px] text-gray-400 truncate block">
 AI tools curated for {country.label}
 </span>
 </div>
 <MapPin className="w-3.5 h-3.5 text-gray-300 group-hover:text-violet-400 transition-colors shrink-0" />
 </Link>
 ))}
 </div>

 <div className="mt-6 text-center">
 <Link
 href="/ai-tools-by-category"
 className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors sm:hidden"
 >
 Browse all 79+ country directories
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </section>
 );
}
