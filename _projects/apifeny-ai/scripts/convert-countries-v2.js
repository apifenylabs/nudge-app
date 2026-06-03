/**
 * Convert all country pages to use CountryPageTemplate component.
 * v2 - handles proper escaping of apostrophes in single-quoted strings.
 */
const fs = require('fs');
const path = require('path');

const APPS_DIR = path.resolve(__dirname, '..', 'app');
const SKIP = new Set(['by-category', 'for-startups', 'morocco']);

const FLAG_GRADIENTS = {
  argentina: 'from-sky-400 via-white to-amber-500',
  australia: 'from-blue-600 via-white to-red-600',
  austria: 'from-red-600 via-white to-red-600',
  bangladesh: 'from-green-600 via-red-600 to-green-600',
  belgium: 'from-black via-yellow-400 to-red-600',
  brazil: 'from-green-600 via-yellow-400 to-blue-600',
  bulgaria: 'from-white via-green-600 to-red-600',
  cambodia: 'from-blue-800 via-red-600 to-blue-800',
  canada: 'from-red-600 via-white to-red-600',
  chile: 'from-blue-700 via-white to-red-600',
  china: 'from-red-600 via-yellow-400 to-red-600',
  colombia: 'from-yellow-400 via-blue-600 to-red-600',
  'costa-rica': 'from-blue-600 via-white to-red-600',
  croatia: 'from-red-600 via-white to-blue-600',
  'czech-republic': 'from-blue-700 via-white to-red-600',
  denmark: 'from-red-600 via-white to-red-600',
  egypt: 'from-red-600 via-white to-black',
  estonia: 'from-blue-600 via-black to-white',
  finland: 'from-white via-blue-600 to-white',
  france: 'from-blue-600 via-white to-red-600',
  germany: 'from-black via-red-600 to-yellow-400',
  ghana: 'from-red-600 via-yellow-400 to-green-600',
  greece: 'from-blue-600 via-white to-blue-600',
  'hong-kong': 'from-red-600 via-white to-red-600',
  hungary: 'from-red-600 via-white to-green-600',
  iceland: 'from-blue-600 via-white to-red-600',
  india: 'from-orange-500 via-white to-green-500',
  indonesia: 'from-red-600 via-white to-red-600',
  ireland: 'from-green-600 via-white to-orange-500',
  israel: 'from-blue-700 via-white to-blue-700',
  italy: 'from-green-600 via-white to-red-600',
  japan: 'from-white via-red-600 to-white',
  jordan: 'from-black via-white to-green-600',
  kenya: 'from-black via-red-600 to-green-600',
  kuwait: 'from-green-600 via-white to-red-600',
  latvia: 'from-red-600 via-white to-red-600',
  lithuania: 'from-yellow-400 via-green-600 to-red-600',
  luxembourg: 'from-red-600 via-white to-blue-500',
  malaysia: 'from-blue-700 via-white to-red-600',
  mexico: 'from-green-600 via-white to-red-600',
  myanmar: 'from-yellow-400 via-green-600 to-red-600',
  nepal: 'from-blue-700 via-white to-red-600',
  netherlands: 'from-orange-500 via-white to-blue-600',
  'new-zealand': 'from-blue-600 via-white to-red-600',
  nigeria: 'from-green-600 via-white to-green-600',
  norway: 'from-red-600 via-white to-blue-600',
  oman: 'from-red-600 via-white to-green-600',
  pakistan: 'from-green-600 via-white to-green-600',
  panama: 'from-blue-700 via-white to-red-600',
  peru: 'from-red-600 via-white to-red-600',
  philippines: 'from-blue-600 via-white to-red-600',
  poland: 'from-white via-red-600 to-white',
  portugal: 'from-green-600 via-red-600 to-green-600',
  qatar: 'from-maroon-700 via-white to-maroon-700',
  romania: 'from-blue-600 via-yellow-400 to-red-600',
  russia: 'from-white via-blue-600 to-red-600',
  'saudi-arabia': 'from-green-600 via-white to-green-600',
  serbia: 'from-red-600 via-blue-600 to-white',
  singapore: 'from-red-600 via-white to-red-600',
  slovakia: 'from-white via-blue-600 to-red-600',
  slovenia: 'from-white via-blue-600 to-red-600',
  'south-africa': 'from-green-600 via-yellow-400 to-red-600',
  'south-korea': 'from-white via-blue-600 to-red-600',
  spain: 'from-red-600 via-yellow-400 to-red-600',
  'sri-lanka': 'from-yellow-400 via-green-600 to-red-600',
  sweden: 'from-blue-600 via-yellow-400 to-blue-600',
  switzerland: 'from-red-600 via-white to-red-600',
  taiwan: 'from-red-600 via-white to-blue-600',
  thailand: 'from-blue-600 via-white to-red-600',
  turkey: 'from-red-600 via-white to-red-600',
  uae: 'from-green-600 via-white to-black',
  uk: 'from-blue-600 via-white to-red-600',
  ukraine: 'from-blue-600 via-yellow-400 to-blue-600',
  uruguay: 'from-blue-600 via-white to-blue-600',
  usa: 'from-blue-600 via-white to-red-600',
  vietnam: 'from-red-600 via-yellow-400 to-red-600',
};

function getLangCode(languages) {
  const firstLang = languages.split('/')[0].trim().toLowerCase();
  const langMap = {
    'arabic': 'ar', 'french': 'fr', 'spanish': 'es', 'portuguese': 'pt',
    'german': 'de', 'dutch': 'nl', 'italian': 'it', 'japanese': 'ja',
    'korean': 'ko', 'chinese': 'zh', 'russian': 'ru', 'hindi': 'hi',
    'bengali': 'bn', 'turkish': 'tr', 'vietnamese': 'vi', 'thai': 'th',
    'indonesian': 'id', 'malay': 'ms', 'tagalog': 'tl', 'polish': 'pl',
    'czech': 'cs', 'swedish': 'sv', 'norwegian': 'no', 'danish': 'da',
    'finnish': 'fi', 'hungarian': 'hu', 'greek': 'el', 'hebrew': 'he',
    'urdu': 'ur', 'tamil': 'ta', 'nepali': 'ne', 'khmer': 'km',
    'burmese': 'my', 'sinhala': 'si', 'serbian': 'sr', 'croatian': 'hr',
    'slovak': 'sk', 'slovenian': 'sl', 'bulgarian': 'bg', 'romanian': 'ro',
    'ukrainian': 'uk', 'estonian': 'et', 'latvian': 'lv', 'lithuanian': 'lt',
    'icelandic': 'is', 'luxembourgish': 'lb', 'persian': 'fa', 'pashto': 'ps',
    'english': 'en',
  };
  return langMap[firstLang] || firstLang.slice(0, 2);
}

function slugToComponentName(slug) {
  return 'AITools' + slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
}

function toDisplayName(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Country-specific overrides for display names
const COUNTRY_NAMES = {
  'czech-republic': 'Czech Republic',
  'costa-rica': 'Costa Rica',
  'hong-kong': 'Hong Kong',
  'new-zealand': 'New Zealand',
  'saudi-arabia': 'Saudi Arabia',
  'south-africa': 'South Africa',
  'south-korea': 'South Korea',
  'sri-lanka': 'Sri Lanka',
  turkey: 'Türkiye',
  uae: 'UAE',
  uk: 'UK',
  usa: 'USA',
};

// Extract old META/Geo data from the file
function extractOldData(content, slug) {
  const displayName = COUNTRY_NAMES[slug] || toDisplayName(slug);
  
  // Extract META from old file
  const metaTitle = content.match(/title:\s*'([^']*)'/);
  const metaDesc = content.match(/description:\s*'([^']*)'/);
  // For multi-line descriptions, look for the full pattern
  const metaOgTitle = content.match(/ogTitle:\s*'([^']*)'/);
  const metaOgDesc = content.match(/ogDescription:\s*'([^']*)'/);
  
  const result = {
    metaTitle: metaTitle ? metaTitle[1].replace(/\\'/g, "'") : `Best AI Tools in ${displayName} (2026) — Curated for ${displayName} Teams & Startups`,
    metaDesc: metaDesc ? metaDesc[1].replace(/\\'/g, "'") : 'AI tools directory · AI startup directory · AI business tools',
    metaOgTitle: metaOgTitle ? metaOgTitle[1].replace(/\\'/g, "'") : `Best AI Tools in ${displayName} (2026) — Apifeny AI`,
    metaOgDesc: metaOgDesc ? metaOgDesc[1].replace(/\\'/g, "'") : `Find AI tools built for ${displayName}. 85+ tools, expert ranked.`,
    countryName: (content.match(/countryName:\s*"([^"]*)"/) || [])[1] || displayName,
    countryCode: (content.match(/countryCode:\s*"([^"]*)"/) || [])[1] || slug,
    capital: (content.match(/capital:\s*"([^"]*)"/) || [])[1] || displayName,
    currency: (content.match(/currency:\s*"([^"]*)"/) || [])[1] || 'USD',
    language: (content.match(/language:\s*"([^"]*)"/) || [])[1] || 'English',
  };
  
  result.langCode = (content.match(/languageCode:\s*"([^"]*)"/) || [])[1] || getLangCode(result.language);
  
  // Market size - handle template strings
  const msMatch = content.match(/marketSize:\s*\{(?:["`])([^"`]*)(?:["`])/);
  if (msMatch) {
    result.marketSize = msMatch[1].replace(/\\n/g, ' ').replace(/\\'/g, "'").trim();
  } else {
    const msMatch2 = content.match(/marketSize:\s*`([^`]*)`/);
    result.marketSize = msMatch2 ? msMatch2[1].replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() : `A growing market in ${result.countryName}`;
  }
  
  // Extract FAQs
  const faqMatch = content.match(/faqs:\s*(\[[\s\S]*?\])\s*\n\s*\}/);
  if (faqMatch) {
    result.faqs = faqMatch[1];
  } else {
    // Try alternate pattern
    const faqMatch2 = content.match(/faqs=\{\[([\s\S]*?)\]\}/);
    result.faqs = faqMatch2 ? `[${faqMatch2[1]}]` : '[]';
  }
  
  return result;
}

function generateSections(countryName, languages, currency) {
  // Use double quotes for the section descriptions to avoid JS escaping issues with apostrophes
  const langText = languages.toLowerCase();
  const name = countryName;
  const escName = name.replace(/'/g, "\\'");
  
  return [
`          { icon: Globe, title: '${languages}', description: '${name} operates in ${langText} for business. We flag every tool for local language support — critical for serving customers across ${escName}\\'s diverse regions.' }`,
`          { icon: ShieldCheck, title: '${currency} Pricing & Local Compliance', description: '${name} businesses need tools that work in ${currency}, offer local payment methods, and comply with local data protection regulations. We rank every tool on real-world usability for ${name} teams.' }`,
`          { icon: Star, title: '${languages} Support', description: '${escName}\\'s diverse business environment demands tools with ${langText} support, local customer service, and integration with locally-used platforms. We evaluate every tool for ${name} market readiness.' }`,
  ];
}

function buildFile(slug, data) {
  const grad = FLAG_GRADIENTS[slug] || 'from-violet-500 via-purple-500 to-violet-600';
  const componentName = slugToComponentName(slug);
  const sections = generateSections(data.countryName, data.language, data.currency);
  const displayName = COUNTRY_NAMES[slug] || toDisplayName(slug);
  
  // Clean market size - remove newlines, collapse whitespace
  const marketSize = data.marketSize.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Use the template literals for multi-line FAQ content
  const faqsContent = data.faqs;
  
  return `'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, Layers, Star, Zap, BookOpen, Globe, Wallet, ShieldCheck, MapPin,
} from 'lucide-react';

import SeoMetadata from '@/components/SeoMetadata';
import FeaturedPlaybooks from '@/components/FeaturedPlaybooks';
import BlogCategoryLinks from '@/components/BlogCategoryLinks';
import LandingPageCrossLinks from '@/components/LandingPageCrossLinks';
import BrowseByCountry from '@/components/BrowseByCountry';
import { toolsData } from '@/lib/data';
import { playbooks } from '@/lib/playbooks';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import GeoSeoSchema from '@/components/GeoSeoSchema';
import CountryPageTemplate from '@/components/CountryPageTemplate';

const META = {
  title: '${data.metaTitle.replace(/'/g, "\\'")}',
  description: '${data.metaDesc.replace(/'/g, "\\'")}',
  ogTitle: '${data.metaOgTitle.replace(/'/g, "\\'")}',
  ogDescription: '${data.metaOgDesc.replace(/'/g, "\\'")}',
  ogImage: '/og',
};

const CATEGORY_NAMES = ['Writing & Content', 'Code & Development', 'Design & Creative', 'Marketing & SEO'] as const;

function topByTrending(limit: number) {
  return [...toolsData].filter((t) => t.is_published).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

function topByCategory(category: string, limit: number) {
  return [...toolsData].filter((t) => t.is_published && t.category === category).sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
}

export default function ${componentName}() {
  const top12 = useMemo(() => topByTrending(12), []);
  const categorySections = useMemo(() =>
    CATEGORY_NAMES.map((name) => ({
      name,
      tools: topByCategory(name, 6),
      count: toolsData.filter((t) => t.is_published && t.category === name).length,
    })),
  []);
  const totalCount = useMemo(() => toolsData.filter((t) => t.is_published).length, []);

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', item: '/' }, { name: 'AI Tools ${displayName}', item: '/ai-tools-${slug}' }]} />
      <GeoSeoSchema
        countryName="${data.countryName}"
        countryCode="${data.countryCode}"
        capital="${data.capital}"
        currency="${data.currency}"
        language="${data.language}"
        languageCode="${data.langCode}"
        marketSize={"${marketSize}"}
        slug="ai-tools-${slug}"
        faqs={${faqsContent}}
      />
      <SeoMetadata title={META.title} description={META.description} ogTitle={META.ogTitle} ogDescription={META.ogDescription} ogImage={META.ogImage} />

      <CountryPageTemplate
        config={{
          slug: 'ai-tools-${slug}',
          countryName: '${data.countryName.replace(/'/g, "\\'")}',
          countryCode: '${data.countryCode}',
          capital: '${data.capital}',
          currency: '${data.currency}',
          languages: '${data.language}',
          heroGradient: '${grad}',
          heroTitle: 'Best AI Tools for ${data.countryName} in 2026',
          badgeBg: 'bg-violet-50',
          badgeBorder: 'border-violet-200',
          badgeText: 'text-violet-700',
        }}
        topTools={top12}
        categorySections={categorySections}
        totalCount={totalCount}
        heroHighlight={
          <>
            <span className="bg-gradient-to-r ${grad} bg-clip-text text-transparent">${data.countryName}</span>
          </>
        }
        sections={[
${sections.join(',\n')}
        ]}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'AI Tools ${displayName}', item: '/ai-tools-${slug}' },
        ]}
      />

      {/* FEATURED PLAYBOOKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-violet-600" />
              <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">Playbooks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI Playbooks for ${data.countryName} Professionals</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">Step-by-step guides using the top AI tools featured above — tailored for ${data.countryName}&apos;s unique business environment.</p>
          </div>
          <FeaturedPlaybooks />
        </div>
      </section>

      {/* CROSS LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <LandingPageCrossLinks currentSlug="ai-tools-${slug}" />
      </section>

      <BrowseByCountry />

      {/* BLOG LINKS */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <BlogCategoryLinks />
        </div>
      </section>

      {/* FOMO BAR */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] sm:text-xs text-gray-500">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-violet-500" /> Updated Daily</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-violet-500" /> {totalCount}+ tools</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500" /> Expert ranked</span>
          </div>
        </div>
      </div>
    </>
  );
}
`;
}

// Main
const slugs = fs.readFileSync('/tmp/country_pages.txt', 'utf-8')
  .trim().split('\n')
  .map(s => s.trim())
  .filter(s => s && !SKIP.has(s));

console.log(`Converting ${slugs.length} country pages...\n`);

let success = 0;
let fail = 0;

for (const slug of slugs) {
  const filePath = path.resolve(APPS_DIR, `ai-tools-${slug}`, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Not found: ai-tools-${slug}`);
    fail++;
    continue;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = extractOldData(content, slug);
    const newContent = buildFile(slug, data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Converted: ai-tools-${slug}`);
    success++;
  } catch (err) {
    console.error(`❌ Failed: ai-tools-${slug}: ${err.message}`);
    fail++;
  }
}

console.log(`\nDone! ${success} converted, ${fail} failed`);
