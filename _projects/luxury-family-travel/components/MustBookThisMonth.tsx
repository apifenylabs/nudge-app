'use client';

import { Crown, Sparkles, CalendarDays, Star } from 'lucide-react';
import PremiumCard from './PremiumCard';

interface MustBookDestination {
  id: string;
  slug?: string;
  name: string;
  city: string;
  country: string;
  category: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  safetyRating: number;
  popularity: number;
  reason?: string;
}

interface MustBookThisMonthProps {
  destinations: MustBookDestination[];
  month?: string;
}

export default function MustBookThisMonth({ destinations, month }: MustBookThisMonthProps) {
  const currentMonth = month || new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  if (!destinations.length) return null;

  return (
    <section className="relative mb-16">
      {/* Section header — Cosme-style editorial */}
      <div className="flex items-start gap-4 mb-7">
        <div className="p-3 rounded-xl bg-gradient-to-br from-gold to-gold-light shadow-lg shrink-0">
          <Crown size={22} className="text-navy" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-navy">Must-Book This Month</h2>
            <span className="px-2 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold-dark text-[10px] font-semibold uppercase tracking-wider">
              {currentMonth}
            </span>
          </div>
          <p className="text-sm text-navy-light/50 font-light">
            Our editors select the most extraordinary luxury experiences available right now
          </p>
        </div>
      </div>

      {/* Editorial preamble — zen-inspired quote line */}
      <div className="flex items-center gap-2 mb-5 text-xs text-navy-light/50 border-l-2 border-gold/30 pl-3 italic bg-gold/[0.02] py-2 rounded-r-lg">
        <Sparkles size={12} className="text-gold shrink-0" />
        <span>
          <strong className="text-navy/80 not-italic">Editor&apos;s note:</strong> These exceptional properties 
          are selling out quickly. We recommend booking at least 3 months in advance for peak season.
        </span>
      </div>

      {/* Curated grid — highlighted first card (Cosme-style hero placement) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.slice(0, 3).map((dest, i) => (
          <div
            key={dest.id}
            className={`premium-fade-in ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {i === 0 ? (
              <div className="relative group">
                {/* Gold accent border on editors pick */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-gold/40 to-gold/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative">
                  <PremiumCard
                    id={dest.id}
                    slug={dest.slug}
                    name={dest.name}
                    city={dest.city}
                    country={dest.country}
                    category={dest.category}
                    description={dest.description}
                    imageUrl={dest.imageUrl}
                    priceRange={dest.priceRange}
                    safetyRating={dest.safetyRating}
                    popularity={dest.popularity}
                    badgeText="★ Editor's Pick"
                    badgeGradient="from-gold to-amber-600"
                  />
                  {dest.reason && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 via-navy/60 to-transparent pointer-events-none">
                      <div className="flex items-center gap-1.5 text-gold text-xs font-medium mb-1">
                        <Sparkles size={12} />
                        Why our editors love it
                      </div>
                      <p className="text-white/90 text-xs leading-relaxed">{dest.reason}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <PremiumCard
                id={dest.id}
                slug={dest.slug}
                name={dest.name}
                city={dest.city}
                country={dest.country}
                category={dest.category}
                description={dest.description}
                imageUrl={dest.imageUrl}
                priceRange={dest.priceRange}
                safetyRating={dest.safetyRating}
                popularity={dest.popularity}
                badgeText={i === 1 ? '🌟 Rising Star' : '💎 Hidden Gem'}
                badgeGradient={i === 1 ? 'from-sky-500 to-indigo-500' : 'from-emerald-500 to-teal-500'}
              />
            )}
          </div>
        ))}
      </div>

      {/* Secondary row — gallery-style */}
      {destinations.length > 3 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {destinations.slice(3).map((dest, i) => (
            <div key={dest.id} className="premium-fade-in" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
              <PremiumCard
                id={dest.id}
                slug={dest.slug}
                name={dest.name}
                city={dest.city}
                country={dest.country}
                category={dest.category}
                description={dest.description}
                imageUrl={dest.imageUrl}
                priceRange={dest.priceRange}
                safetyRating={dest.safetyRating}
                popularity={dest.popularity}
                badgeText="Recommended"
                badgeGradient="from-navy/80 to-navy/60"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
