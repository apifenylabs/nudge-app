// BlogGeoLinks — Auto-detect country/region mentions from
// blog post tags and slug, then link to matching geo page.
// Uses dynamic 79-country directory from geo-pages-data.ts.

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { ALL_GEO_PAGES, ASIA_KEYWORDS, type GeoPageEntry } from '@/lib/geo-pages-data';

interface BlogGeoLinksProps {
 postSlug: string;
 postTags: string[];
}

export default function BlogGeoLinks({ postSlug, postTags }: BlogGeoLinksProps) {
 const lowerTags = postTags.map(t => t.toLowerCase());
 const lowerSlug = postSlug.toLowerCase();

 const isAsiaBroad = lowerTags.some(t => ASIA_KEYWORDS.includes(t))
   || ASIA_KEYWORDS.some(k => lowerSlug.includes(k));

 const matchedPages = ALL_GEO_PAGES.filter(page => {
   const tagMatch = page.keywords.some(kw =>
     lowerTags.some(t => t.includes(kw))
   );
   const slugMatch = page.keywords.some(kw => lowerSlug.includes(kw));
   if (isAsiaBroad) return true;
   return tagMatch || slugMatch;
 });

 // If this IS a geo page, don't link back to itself
 const currentCountrySlug = ALL_GEO_PAGES.find(p =>
   lowerSlug.includes(p.slug.replace('ai-tools-', ''))
 );
 const filteredPages = currentCountrySlug
   ? matchedPages.filter(p => p.slug !== currentCountrySlug.slug)
   : matchedPages;

 if (filteredPages.length === 0) return null;

 // Country group for the heading
 const regionLabel = isAsiaBroad ? 'Asia' : 'Related Countries';

 return (
   <section className="border-y border-gray-200 bg-gray-50">
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div className="flex items-center gap-2 mb-4">
         <MapPin className="w-5 h-5 text-blue-600" />
         <h2 className="text-lg font-bold text-gray-900">
           {isAsiaBroad
             ? '🌏 AI Tools by Country in Asia'
             : `📍 AI Tools in ${regionLabel}`}
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
