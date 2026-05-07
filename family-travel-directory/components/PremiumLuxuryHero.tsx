'use client';

import { Crown, Plane, Hotel, Sparkles, Users, Wifi, Dumbbell, Utensils, Waves, Car, Baby, Star, Award, ChevronRight, Globe, Shield, Check } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// ─── Premium Category Icons ────────────────────────────────────

const PREMIUM_CATEGORIES = [
  {
    id: 'business-class',
    title: 'Business & First Class Flying',
    description: 'Lie-flat seats, priority boarding, champagne on tap — traveling with kids in premium cabins is a game changer.',
    icon: Plane,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    stats: '12+ premium airlines',
    link: '/activity/things-to-do-in-singapore-with-kids',
  },
  {
    id: 'luxury-villas',
    title: 'Private Luxury Villas',
    description: 'Your own pool, butler, and chef. No crowds, no buffets. Just your family and the best Asia has to offer.',
    icon: Hotel,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    stats: '46 handpicked properties',
    link: '/search?priceRange=$$$$',
  },
  {
    id: 'exclusive-experiences',
    title: 'Exclusive Family Experiences',
    description: 'Private temple tours, chef-led cooking classes, helicopter rides — experiences money can buy that memories can\'t.',
    icon: Sparkles,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    stats: '83+ premium activities',
    link: '/search?category=Exclusive+Experience',
  },
  {
    id: 'wellness',
    title: 'Family Wellness Retreats',
    description: 'Spa treatments for parents, kids\' yoga, organic dining, and wellness programs designed for the whole family.',
    icon: Waves,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    stats: '24+ wellness resorts',
    link: '/search?category=Spa+%26+Wellness',
  },
];

// ─── Premium Perk Cards ─────────────────────────────────────────

const PREMIUM_PERKS = [
  { icon: Users, title: 'Dedicated Concierge', desc: 'Personal travel planner for every booking' },
  { icon: Car, title: 'Private Transfers', desc: 'Luxury vehicle with child seats included' },
  { icon: Baby, title: 'Certified Nannies', desc: 'Vetted childcare at every resort' },
  { icon: Utensils, title: 'Kids\' Fine Dining', desc: 'Michelin-starred kids\' menus available' },
  { icon: Dumbbell, title: 'Family Fitness', desc: 'Private trainers and kids\' yoga sessions' },
  { icon: Wifi, title: 'Stay Connected', desc: 'Complimentary premium WiFi worldwide' },
];

// ─── Scrolling Marquee of Premium Names ─────────────────────────

const PREMIUM_NAMES = [
  'Four Seasons', 'Aman', 'Ritz-Carlton', 'Mandarin Oriental', 'Bulgari',
  'Soneva', 'Capella', 'Rosewood', 'St. Regis', 'Waldorf Astoria',
  'Six Senses', 'Park Hyatt', 'Marina Bay Sands', 'Raffles',
];

// ─── Card Component ─────────────────────────────────────────────

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function PremiumLuxuryHero() {
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

  return (
    <section ref={ref} className="mb-12 sm:mb-16">
      {/* ─── Hero Banner ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 p-6 sm:p-8 mb-8">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/5 to-cyan-500/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Crown size={16} className="text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-amber-300/80 font-medium">Curated Premium Collection</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
            First-Class & Premium<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">Family Experiences in Asia</span>
          </h2>
          <p className="text-sm text-indigo-200 max-w-xl leading-relaxed mb-5">
            From private villa stays with butler service to business-class flights with lie-flat beds — 
            curated for families who want the very best. Every property and experience is vetted by real parents.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/search?priceRange=$$$$"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
            >
              <Crown size={14} />
              Browse Premium Picks
            </Link>
            <Link
              href="/search?priceRange=$$$"
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              <Star size={14} />
              Top-Rated ($$$)
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Feature Categories Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {PREMIUM_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.id}
              href={cat.link}
              className={`group ${cat.bgColor} border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
                  <Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-gray-700 transition-colors">{cat.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-medium ${cat.textColor} bg-white/80 px-2 py-0.5 rounded-full`}>{cat.stats}</span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Premium Perks Strip ─── */}
      <GlassCard className="mb-8">
        <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Award size={14} className="text-amber-500" />
          What Premium Families Get
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PREMIUM_PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div key={idx} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{perk.title}</p>
                  <p className="text-[10px] text-gray-400">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ─── Brand Marquee ─── */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-4 animate-marquee whitespace-nowrap">
          {[...PREMIUM_NAMES, ...PREMIUM_NAMES, ...PREMIUM_NAMES].map((name, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider"
            >
              <Star size={9} className="text-amber-300" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
