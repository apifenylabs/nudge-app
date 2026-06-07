// ══════════════════════════════════════════════════════════
// BlogGeoLinks — Cross-links blog posts to relevant geo pages
// ══════════════════════════════════════════════════════════
// Analyzes blog post slug + tags, and renders internal links
// to relevant country/region geo-targeted landing pages.
// Strengthens topical authority by creating a bi-directional
// link graph between blog content and geo SEO pages.
// ══════════════════════════════════════════════════════════

import Link from 'next/link';
import { Globe, ArrowRight } from 'lucide-react';

// ─── Geo page definitions ────────────────────────────────────────
interface GeoPage {
 slug: string;
 name: string;
 flag: string;
 keywords: string[]; // tags/slugs that trigger this geo page
}

const GEO_PAGES: GeoPage[] = [
 { slug: 'ai-tools-singapore', name: 'Singapore', flag: '🇸🇬', keywords: ['singapore', 'sg', 'sgd'] },
 { slug: 'ai-tools-malaysia', name: 'Malaysia', flag: '🇲🇾', keywords: ['malaysia', 'my', 'myr', 'kuala-lumpur'] },
 { slug: 'ai-tools-hong-kong', name: 'Hong Kong', flag: '🇭🇰', keywords: ['hong-kong', 'hk', 'hkd'] },
 { slug: 'ai-tools-vietnam', name: 'Vietnam', flag: '🇻🇳', keywords: ['vietnam', 'vn', 'vnd', 'hanoi', 'ho-chi-minh'] },
 { slug: 'ai-tools-philippines', name: 'Philippines', flag: '🇵🇭', keywords: ['philippines', 'ph', 'php', 'manila'] },
 { slug: 'ai-tools-indonesia', name: 'Indonesia', flag: '🇮🇩', keywords: ['indonesia', 'id', 'idr', 'jakarta'] },
 { slug: 'ai-tools-thailand', name: 'Thailand', flag: '🇹🇭', keywords: ['thailand', 'th', 'thb', 'bangkok'] },
 { slug: 'ai-tools-cambodia', name: 'Cambodia', flag: '🇰🇭', keywords: ['cambodia', 'kh', 'phnom-penh'] },
 { slug: 'ai-tools-myanmar', name: 'Myanmar', flag: '🇲🇲', keywords: ['myanmar', 'mm', 'yangon'] },
 { slug: 'ai-tools-japan', name: 'Japan', flag: '🇯🇵', keywords: ['japan', 'jp', 'jpy', 'tokyo', 'osaka'] },
 { slug: 'ai-tools-south-korea', name: 'South Korea', flag: '🇰🇷', keywords: ['south-korea', 'korea', 'kr', 'krw', 'seoul'] },
 { slug: 'ai-tools-taiwan', name: 'Taiwan', flag: '🇹🇼', keywords: ['taiwan', 'tw', 'twd', 'taipei'] },
 { slug: 'ai-tools-india', name: 'India', flag: '🇮🇳', keywords: ['india', 'in', 'inr', 'mumbai', 'bangalore', 'delhi'] },
];

// ─── Slug pattern matching ───────────────────────────────────────
// Some blog posts use "best-ai-tools-<country>" naming convention
function extractCountryFromSlug(slug: string): string | null {
 for (const geo of GEO_PAGES) {
 if (slug.includes(geo.keywords[0].replace(/-/g, ''))) return geo.slug;
 }
 return null;
}

interface Props {
 postSlug: string;
 postTags: string[];
}

export default function BlogGeoLinks({ postSlug, postTags }: Props) {
 // 1. Check if any tags match a geo page
 const matchedGeoSlugs = new Set<string>();
 const tagLower = postTags.map(t => t.toLowerCase().replace(/-/g, ''));

 for (const geo of GEO_PAGES) {
 // Check tag matches
 for (const t of tagLower) {
 for (const kw of geo.keywords) {
 if (t.includes(kw.replace(/-/g, '')) || kw.replace(/-/g, '').includes(t)) {
 matchedGeoSlugs.add(geo.slug);
 break;
 }
 }
 }
 }

 // 2. Check slug pattern (best-ai-tools-{country})
 const slugMatch = extractCountryFromSlug(postSlug);
 if (slugMatch) matchedGeoSlugs.add(slugMatch);

 // 3. Show geo pages that are relevant to "asia" tag
 if (tagLower.some(t => t.includes('asia') || t.includes('sea') || t.includes('southeast'))) {
 // For broad Asia content, show major markets only
 ['ai-tools-singapore', 'ai-tools-malaysia', 'ai-tools-india'].forEach(s => matchedGeoSlugs.add(s));
 }

 if (matchedGeoSlugs.size === 0) return null;

 const matchedPages = GEO_PAGES.filter(g => matchedGeoSlugs.has(g.slug));

 return (
 <section className="border-t border-gray-200 bg-gray-50/30 mt-12">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 <div className="flex items-center gap-2 mb-8">
 <Globe className="w-5 h-5 text-neon" />
 <h2 className="text-2xl font-bold text-white">Region-Specific AI Guides</h2>
 </div>
 <p className="text-gray-600 text-sm mb-6">
 Looking for AI tools tailored to your market? Check out our country-specific guides:
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {matchedPages.map((geo) => (
 <Link
 key={geo.slug}
 href={`/${geo.slug}`}
 className="group bg-gray-50/40 border border-gray-200 rounded-xl p-5 hover:border-neon/30 transition-all"
 >
 <div className="flex items-center gap-3 mb-2">
 <span className="text-2xl">{geo.flag}</span>
 <h3 className="font-semibold text-white group-hover:text-neon-light transition">
 AI Tools for {geo.name}
 </h3>
 </div>
 <p className="text-xs text-gray-400">
 Curated AI tools ranked for {geo.name}&apos;s market — with local pricing, 
 language support, and region-specific compliance info.
 </p>
 <div className="flex items-center gap-1 text-xs text-neon-light mt-3 group-hover:gap-2 transition-all">
 Explore {geo.name} Guide
 <ArrowRight className="w-3 h-3" />
 </div>
 </Link>
 ))}
 </div>

 <div className="text-center mt-8">
 <Link
 href="/"
 className="inline-flex items-center gap-1.5 text-sm text-neon-light hover:text-neon transition"
 >
 Browse all country guides
 <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </section>
 );
}
