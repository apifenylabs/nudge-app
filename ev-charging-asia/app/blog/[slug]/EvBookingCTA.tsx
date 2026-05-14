'use client';

import { ExternalLink, Zap, Car, Hotel, Compass, Shield, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// ─── EV Blog Affiliate CTA ───
// Shows contextual booking options based on blog post tags

const COUNTRY_TAGS: Record<string, { name: string; bookingCity: string; klookQuery: string }> = {
  'thailand': { name: 'Thailand', bookingCity: 'Thailand', klookQuery: 'Thailand EV road trip' },
  'singapore': { name: 'Singapore', bookingCity: 'Singapore', klookQuery: 'Singapore activities' },
  'malaysia': { name: 'Malaysia', bookingCity: 'Malaysia', klookQuery: 'Malaysia EV road trip' },
  'japan': { name: 'Japan', bookingCity: 'Japan', klookQuery: 'Japan EV rental' },
  'indonesia': { name: 'Indonesia', bookingCity: 'Indonesia', klookQuery: 'Indonesia EV' },
  'china': { name: 'China', bookingCity: 'China', klookQuery: 'China EV' },
  'yangtze-river-delta': { name: 'China', bookingCity: 'Shanghai, Hangzhou, Nanjing', klookQuery: 'China' },
  'india': { name: 'India', bookingCity: 'India', klookQuery: 'India EV' },
};

function detectCountry(tags: string[]): { name: string; bookingCity: string; klookQuery: string } | null {
  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (COUNTRY_TAGS[lower]) return COUNTRY_TAGS[lower];
  }
  return null;
}

interface EvBookingCTAProps {
  tags: string[];
}

export default function EvBookingCTA({ tags }: EvBookingCTAProps) {
  const country = detectCountry(tags);
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

  const hotelUrl = country
    ? (country.name === 'China'
      ? `https://www.booking.com/searchresults.html?ss=Shanghai%2C+China&aid=2875669`
      : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(country.name)}&aid=2875669`)
    : `https://www.booking.com/searchresults.html?ss=Asia&aid=2875669`;

  const klookUrl = country
    ? `https://www.klook.com/search/?keyword=${encodeURIComponent(country.klookQuery)}&aid=119991`
    : `https://www.klook.com/search/?keyword=EV+rental+Asia&aid=119991`;

  return (
    <div
      ref={ref}
      className={`my-10 rounded-2xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 p-5 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 shadow-sm">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">
            {country ? `Plan Your ${country.name} EV Trip` : 'Plan Your Asia EV Road Trip'}
          </h3>
          <p className="text-[11px] text-gray-400">Find EV rentals, hotels with charging, and activities</p>
        </div>
      </div>

      {/* Action cards */}
      <div className="space-y-2.5">
        <a
          href={klookUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="group flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-100 bg-white hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
            <Car size={19} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700">
              {country ? `EV Rentals in ${country.name}` : 'Find EV Rentals in Asia'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {country ? `Browse EV rental options in ${country.name} on Klook` : 'Browse EV rental options across Asia'}
            </p>
          </div>
          <div className="flex-shrink-0">
            <ExternalLink size={14} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
          </div>
        </a>

        <a
          href={hotelUrl}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="group flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-100 bg-white hover:border-sky-200 hover:bg-sky-50 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
            <Hotel size={19} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700">
              {country ? `Hotels with EV Charging in ${country.name}` : 'EV-Friendly Hotels in Asia'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Find hotels with EV charging facilities — filter by destination
            </p>
          </div>
          <div className="flex-shrink-0">
            <ExternalLink size={14} className="text-gray-300 group-hover:text-sky-500 transition-colors" />
          </div>
        </a>

        <a
          href="https://www.viator.com/?pid=P00299136"
          target="_blank"
          rel="nofollow sponsored noopener"
          className="group flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-gray-100 bg-white hover:border-rose-200 hover:bg-rose-50 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
            <Compass size={19} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700">
              {country ? `Top Experiences in ${country.name}` : 'Asia Experiences'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Viator — TripAdvisor-rated tours with free cancellation
            </p>
          </div>
          <div className="flex-shrink-0">
            <ExternalLink size={14} className="text-gray-300 group-hover:text-rose-500 transition-colors" />
          </div>
        </a>
      </div>

      {/* Disclosure */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
        <span className="flex items-center gap-1">
          <Shield size={10} className="text-emerald-500" />
          Secure booking via partner sites
        </span>
        <span>We may earn a commission at no extra cost</span>
      </div>
    </div>
  );
}
