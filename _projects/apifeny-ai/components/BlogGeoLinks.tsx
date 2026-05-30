// BlogGeoLinks — Auto-detect country/region mentions from
// blog post tags and slug, then link to matching geo page.

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

interface GeoPageEntry {
 slug: string;
 name: string;
 keywords: string[];
}

const GEO_PAGES: GeoPageEntry[] = [
 { slug: 'ai-tools-singapore', name: 'Singapore', keywords: ['singapore', 'sg'] },
 { slug: 'ai-tools-malaysia', name: 'Malaysia', keywords: ['malaysia', 'kl', 'kuala-lumpur'] },
 { slug: 'ai-tools-hong-kong', name: 'Hong Kong', keywords: ['hong-kong', 'hong kong', 'hk'] },
 { slug: 'ai-tools-vietnam', name: 'Vietnam', keywords: ['vietnam', 'hanoi', 'ho-chi-minh'] },
 { slug: 'ai-tools-philippines', name: 'Philippines', keywords: ['philippines', 'manila'] },
 { slug: 'ai-tools-indonesia', name: 'Indonesia', keywords: ['indonesia', 'jakarta', 'bali'] },
 { slug: 'ai-tools-thailand', name: 'Thailand', keywords: ['thailand', 'bangkok'] },
 { slug: 'ai-tools-cambodia', name: 'Cambodia', keywords: ['cambodia', 'phnom-penh'] },
 { slug: 'ai-tools-myanmar', name: 'Myanmar', keywords: ['myanmar', 'yangon'] },
 { slug: 'ai-tools-japan', name: 'Japan', keywords: ['japan', 'tokyo', 'osaka'] },
 { slug: 'ai-tools-south-korea', name: 'South Korea', keywords: ['south-korea', 'korea', 'seoul'] },
 { slug: 'ai-tools-taiwan', name: 'Taiwan', keywords: ['taiwan', 'taipei'] },
 { slug: 'ai-tools-india', name: 'India', keywords: ['india', 'mumbai', 'bangalore', 'delhi'] },
 { slug: 'ai-tools-bangladesh', name: 'Bangladesh', keywords: ['bangladesh', 'dhaka'] },
 { slug: 'ai-tools-sri-lanka', name: 'Sri Lanka', keywords: ['sri-lanka', 'colombo'] },
 { slug: 'ai-tools-nepal', name: 'Nepal', keywords: ['nepal', 'kathmandu'] },
];

const ASIA_KEYWORDS = ['asia', 'southeast-asia', 'sea', 'apac', 'asian'];

interface BlogGeoLinksProps {
 postSlug: string;
 postTags: string[];
}

export default function BlogGeoLinks({ postSlug, postTags }: BlogGeoLinksProps) {
 const lowerTags = postTags.map(t => t.toLowerCase());
 const lowerSlug = postSlug.toLowerCase();

 const isAsiaBroad = lowerTags.some(t => ASIA_KEYWORDS.includes(t))
 || ASIA_KEYWORDS.some(k => lowerSlug.includes(k));

 const matchedPages = GEO_PAGES.filter(page => {
 const tagMatch = page.keywords.some(kw =>
 lowerTags.some(t => t.includes(kw))
 );
 const slugMatch = page.keywords.some(kw => lowerSlug.includes(kw));
 if (isAsiaBroad) return true;
 return tagMatch || slugMatch;
 });

 const isGeoPage = GEO_PAGES.some(p => lowerSlug.includes(p.slug.replace('ai-tools-', '')));
 const filteredPages = isGeoPage
 ? matchedPages.filter(p => !lowerSlug.includes(p.slug.replace('ai-tools-', '')))
 : matchedPages;

 if (filteredPages.length === 0) return null;

 return (
 <section className="border-y border-gray-200 bg-gray-50">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="flex items-center gap-2 mb-4">
 <MapPin className="w-5 h-5 text-blue-600" />
 <h2 className="text-lg font-bold text-gray-900">
 {isAsiaBroad
 ? '🌏 AI Tools by Country in Asia'
 : '📍 AI Tools in These Countries'}
 </h2>
 </div>
 <div className="flex flex-wrap gap-2">
 {filteredPages.map(page => (
 <Link
 key={page.slug}
 href={`/${page.slug}`}
 className="group inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all"
 >
 <MapPin className="w-3.5 h-3.5" />
 <span>{page.name}</span>
 <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
 </Link>
 ))}
 </div>
 {isAsiaBroad && (
 <p className="mt-3 text-xs text-gray-500">
 Browse our curated lists of AI tools available and optimized for each Asian market.
 </p>
 )}
 </div>
 </section>
 );
}
