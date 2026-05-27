'use client';

import { ExternalLink, Zap, Car, PlugZap, Lightbulb, Sparkles, Shield } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { affiliateLinks } from '@/lib/affiliate-links';
import type { AffiliateLink } from '@/lib/affiliate-links';
import { trackAffiliateClick } from '@/lib/affiliate-tracking';

// ─── Country detection from blog tags ───
const COUNTRY_SYNONYMS: Record<string, string> = {
  'thailand': 'Thailand',
  'bangkok': 'Thailand',
  'phuket': 'Thailand',
  'chiang-mai': 'Thailand',
  'singapore': 'Singapore',
  'malaysia': 'Malaysia',
  'kuala-lumpur': 'Malaysia',
  'johor-bahru': 'Malaysia',
  'japan': 'Japan',
  'tokyo': 'Japan',
  'osaka': 'Japan',
  'kyoto': 'Japan',
  'indonesia': 'Indonesia',
  'bali': 'Indonesia',
  'china': 'China',
  'shanghai': 'China',
  'shenzhen': 'China',
  'beijing': 'China',
  'india': 'India',
  'mumbai': 'India',
  'delhi': 'India',
  'bangalore': 'India',
  'south-korea': 'South Korea',
  'korea': 'South Korea',
  'seoul': 'South Korea',
  'taiwan': 'Taiwan',
  'taipei': 'Taiwan',
  'hong-kong': 'Hong Kong',
  'hongkong': 'Hong Kong',
  'vietnam': 'Vietnam',
  'philippines': 'Philippines',
};

function detectCountry(tags: string[]): string | null {
  for (const tag of tags) {
    const lower = tag.toLowerCase().replace(/\s+/g, '-');
    if (COUNTRY_SYNONYMS[lower]) return COUNTRY_SYNONYMS[lower];
  }
  return null;
}

// ─── Tag-based affiliate matching ───
// Maps specific tags to relevant gear/product affiliate link slugs
const TAG_GEAR_MAP: Record<string, string[]> = {
  'portable-charger': ['portable-charger'],
  'charging-at-home': ['portable-charger'],
  'home-charging': ['portable-charger'],
  'road-trip': ['ev-adapter-kit', 'portable-charger', 'ev-travel-case'],
  'cross-border-travel': ['ev-adapter-kit', 'ev-travel-case'],
  'long-distance': ['ev-adapter-kit', 'portable-charger'],
  'adapters': ['ev-adapter-kit'],
  'connectors': ['ev-adapter-kit'],
  'charging-standards': ['ev-adapter-kit'],
  'ccs2': ['ev-adapter-kit'],
  'chademo': ['ev-adapter-kit'],
  'travel': ['ev-travel-case', 'portable-charger'],
  'family-travel': ['ev-travel-case', 'portable-charger', 'ev-adapter-kit'],
  'battery': ['ev-adapter-kit'],
  'electric-bike': ['ev-travel-case'],
  'ev-motorcycle': ['portable-charger'],
  'motorcycle': ['portable-charger'],
  'tesla': ['portable-charger', 'ev-adapter-kit'],
  'ev-rental': ['ev-adapter-kit', 'ev-travel-case'],
  'rental': ['ev-travel-case'],
};

function getGearSlugs(tags: string[]): string[] {
  const slugSet = new Set<string>();
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    const mapped = TAG_GEAR_MAP[lower];
    if (mapped) mapped.forEach(s => slugSet.add(s));
  }
  return Array.from(slugSet).slice(0, 3);
}

// ─── Component ───

export default function BlogAffiliateCTA({ tags }: { tags: string[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const country = detectCountry(tags);
  const gearSlugs = getGearSlugs(tags);

  // Select relevant affiliate links
  let relevantRentals: AffiliateLink[] = [];
  let relevantGear: AffiliateLink[] = [];
  let relevantExperiences: AffiliateLink[] = [];

  if (country) {
    // Country-specific EV rentals
    relevantRentals = affiliateLinks.filter(
      l => l.type === 'ev_rental' && l.countries.includes(country)
    );
    // Country experiences
    relevantExperiences = affiliateLinks.filter(
      l => (l.type === 'tour' || l.type === 'experience') && l.countries.includes(country)
    );
  } else {
    // Generic EV rental (show a few)
    relevantRentals = affiliateLinks.filter(l => l.type === 'ev_rental').slice(0, 2);
  }

  // Gear matching via tags
  relevantGear = affiliateLinks.filter(
    l => l.type === 'gear' && gearSlugs.includes(l.id)
  );
  // If no specific gear matches, show top gear items
  if (relevantGear.length === 0 && tags.some(t => ['road-trip','travel','long-distance','cross-border'].some(k => t.includes(k)))) {
    relevantGear = affiliateLinks.filter(l => l.type === 'gear').slice(0, 2);
  }

  // If absolutely nothing matches, still show something useful
  if (relevantRentals.length === 0 && relevantGear.length === 0 && relevantExperiences.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`my-8 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-slate-200 dark:border-gray-700 p-5 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 shadow-sm">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm">
            {country ? `Essential Gear for ${country} EV Trip` : 'EV Road Trip Essentials'}
          </h3>
          <p className="text-[11px] text-gray-400">Recommended products and services for your journey</p>
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-2">
        {/* Gear recommendations */}
        {relevantGear.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
              <PlugZap size={10} /> Gear & Accessories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {relevantGear.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  onClick={() => trackAffiliateClick(link.id)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-amber-200/60 bg-amber-50/60 dark:bg-amber-900/10 dark:border-amber-800/30 hover:border-amber-300 dark:hover:border-amber-600/50 hover:bg-amber-100/60 dark:hover:bg-amber-800/20 transition-all"
                >
                  <span className="text-sm">🔌</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{link.description}</p>
                  </div>
                  <ExternalLink size={10} className="text-gray-300 dark:text-gray-600 group-hover:text-amber-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* EV Rentals */}
        {relevantRentals.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
              <Car size={10} /> EV Rentals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {relevantRentals.slice(0, 4).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  onClick={() => trackAffiliateClick(link.id)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-sky-200/60 bg-sky-50/60 dark:bg-sky-900/10 dark:border-sky-800/30 hover:border-sky-300 dark:hover:border-sky-600/50 hover:bg-sky-100/60 dark:hover:bg-sky-800/20 transition-all"
                >
                  <span className="text-sm">🚗</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{link.description}</p>
                  </div>
                  <ExternalLink size={10} className="text-gray-300 dark:text-gray-600 group-hover:text-sky-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Experiences */}
        {relevantExperiences.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5 flex items-center gap-1">
              <Lightbulb size={10} /> Tours & Experiences
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {relevantExperiences.slice(0, 4).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  onClick={() => trackAffiliateClick(link.id)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg border border-pink-200/60 bg-pink-50/60 dark:bg-pink-900/10 dark:border-pink-800/30 hover:border-pink-300 dark:hover:border-pink-600/50 hover:bg-pink-100/60 dark:hover:bg-pink-800/20 transition-all"
                >
                  <span className="text-sm">🎫</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">
                      {link.name}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{link.description}</p>
                  </div>
                  <ExternalLink size={10} className="text-gray-300 dark:text-gray-600 group-hover:text-pink-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Disclosure */}
      <div className="mt-3 flex items-center gap-1 justify-between text-[10px] text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <Shield size={10} className="text-green-500" />
          We earn a commission if you purchase — at no extra cost to you.
        </span>
      </div>
    </div>
  );
}
