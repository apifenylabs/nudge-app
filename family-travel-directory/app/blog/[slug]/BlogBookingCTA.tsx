'use client';

import { ExternalLink, Hotel, Plane, Car, Compass, Shield, Star, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { bookingUrl, klookUrl, viatorUrl } from '@/lib/affiliate';
import { useState, useEffect, useRef } from 'react';

// ─── Destination keyword → booking intent mapping ───

interface BookingIntent {
  destination: string;       // Display name
  keywords: string[];        // Tags that trigger this offer
  country: string;           // For Booking.com search
  suggestHotels: boolean;    // Show hotel CTA
  suggestActivities: boolean;// Show activities CTA
  suggestTransport: boolean; // Show transport/car CTA
  image?: string;            // Emoji fallback
  highlight?: string;        // "Best time to book" note
}

const DESTINATION_MAP: BookingIntent[] = [
  { destination: 'Bali, Indonesia', keywords: ['bali', 'indonesia'], country: 'Bali, Indonesia', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Peak season Jun–Aug — book early' },
  { destination: 'Tokyo, Japan', keywords: ['tokyo', 'japan', 'osaka', 'kyoto'], country: 'Tokyo, Japan', suggestHotels: true, suggestActivities: true, suggestTransport: true, highlight: 'Cherry blossom (Mar–Apr) sells out fast' },
  { destination: 'Singapore', keywords: ['singapore'], country: 'Singapore', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Year-round destination — great deals in off-peak' },
  { destination: 'Bangkok, Thailand', keywords: ['bangkok', 'thailand', 'phuket'], country: 'Bangkok, Thailand', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Cool season Nov–Feb best for families' },
  { destination: 'Vietnam', keywords: ['vietnam', 'hanoi', 'ho-chi-minh-city', 'hoi-an', 'halong-bay'], country: 'Vietnam', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Spring (Mar–Apr) and autumn (Oct–Nov) ideal' },
  { destination: 'Hong Kong', keywords: ['hong-kong', 'hong kong'], country: 'Hong Kong', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Oct–Nov or Mar–Apr for best weather' },
  { destination: 'South Korea', keywords: ['seoul', 'korea', 'south-korea', 'jeju'], country: 'Seoul, South Korea', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Spring (Apr–May) and autumn (Sep–Oct) peak' },
  { destination: 'Malaysia', keywords: ['malaysia', 'kuala-lumpur', 'penang', 'borneo'], country: 'Malaysia', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Dry season Dec–Feb for west coast' },
  { destination: 'Philippines', keywords: ['philippines', 'manila', 'cebu', 'palawan'], country: 'Philippines', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Dry season Nov–Apr best for beach trips' },
  { destination: 'Sri Lanka', keywords: ['sri-lanka', 'colombo', 'kandy', 'galle'], country: 'Sri Lanka', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Jan–Mar on west/south coasts, May–Oct on east' },
  { destination: 'Cambodia', keywords: ['cambodia', 'siem-reap', 'angkor'], country: 'Cambodia', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Dry season Nov–Mar for temple trips' },
  { destination: 'India', keywords: ['india', 'mumbai', 'delhi', 'goa', 'kerala'], country: 'India', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Oct–Mar best for most regions' },
  { destination: 'Taiwan', keywords: ['taiwan', 'taipei', 'taichung'], country: 'Taiwan', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Oct–Dec and Mar–May for pleasant weather' },
  { destination: 'Langkawi', keywords: ['langkawi'], country: 'Langkawi, Malaysia', suggestHotels: true, suggestActivities: true, suggestTransport: false, highlight: 'Nov–Apr dry season ideal' },
];

function matchDestination(tags: string[]): BookingIntent | null {
  const tagSet = new Set(tags.map(t => t.toLowerCase().replace(/\s+/g, '-')));
  for (const dest of DESTINATION_MAP) {
    if (dest.keywords.some(k => tagSet.has(k))) return dest;
  }
  return null;
}

// ─── Action Card ───

function ActionCard({
  icon: Icon,
  title,
  description,
  href,
  color,
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={`group flex items-center gap-4 px-5 py-4 rounded-xl border-2 transition-all duration-200 bg-white hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] border-gray-100 hover:border-${color}-200`}
    >
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
        <Icon size={19} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-900 group-hover:text-gray-700">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <div className="flex-shrink-0">
        <ExternalLink size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
    </a>
  );
}

// ─── Main Component ───

interface BlogBookingCTAProps {
  tags: string[];
}

export default function BlogBookingCTA({ tags }: BlogBookingCTAProps) {
  const matched = matchDestination(tags);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-in animation
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

  if (!matched) {
    // Fallback: show generic Asia travel offers
    return <GenericBookingCTA ref={ref} visible={visible} />;
  }

  const dest = matched;
  const hotelUrl = bookingUrl(dest.country);
  const activitySearch = klookUrl(`${dest.destination} family activities`);
  const viatorSearch = viatorUrl(dest.destination);

  return (
    <div
      ref={ref}
      className={`my-10 rounded-2xl bg-gradient-to-br from-sky-50/80 to-blue-50/80 border border-sky-200/50 p-5 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 shadow-sm">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Plan Your {dest.destination} Trip</h3>
          <p className="text-[11px] text-gray-400">{dest.highlight}</p>
        </div>
      </div>

      {/* Action cards */}
      <div className="space-y-2.5">
        {dest.suggestHotels && (
          <ActionCard
            icon={Hotel}
            title="Find Family Hotels"
            description={searchHotelsDesc(dest.destination)}
            href={hotelUrl}
            color="from-sky-400 to-blue-500"
          />
        )}
        {dest.suggestActivities && (
          <ActionCard
            icon={Compass}
            title="Book Activities & Tours"
            description={`Best family-friendly activities in ${dest.destination}`}
            href={activitySearch}
            color="from-orange-400 to-rose-500"
          />
        )}
        {dest.suggestActivities && (
          <ActionCard
            icon={Star}
            title="Viator Top Experiences"
            description="TripAdvisor-rated tours with free cancellation"
            href={viatorSearch}
            color="from-rose-400 to-pink-600"
          />
        )}
        {dest.suggestTransport && (
          <ActionCard
            icon={Car}
            title="Car Rental & Transfers"
            description="Compare rental options & airport transfers"
            href={bookingUrl(dest.country)}
            color="from-emerald-400 to-teal-500"
          />
        )}
      </div>

      {/* Price note + disclosure */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
        <span className="flex items-center gap-1">
          <Shield size={10} className="text-emerald-500" />
          Secure booking via partner sites
        </span>
        <span>
          We may earn a commission at no extra cost to you
        </span>
      </div>
    </div>
  );
}

function searchHotelsDesc(dest: string): string {
  const options = [
    `Compare prices for ${dest} family hotels`,
    `Find kid-friendly hotels in ${dest}`,
    `Best-rated family accommodations in ${dest}`,
    `Browse ${dest} hotels with family rooms`,
  ];
  return options[Math.floor(Math.random() * options.length)];
}

// ─── Generic CTA (fallback when no destination matched) ───

import React from 'react';

const GenericBookingCTA = React.forwardRef<HTMLDivElement, { visible: boolean }>(
  function GenericBookingCTA({ visible }, ref) {
    return (
      <div
        ref={ref}
        className={`my-10 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-200/50 p-5 transition-all duration-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
            <Hotel size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Plan Your Asia Family Trip</h3>
            <p className="text-[11px] text-gray-400">Find the best family-friendly hotels & activities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <a
            href={bookingUrl('Asia')}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-white hover:border-sky-200 hover:bg-sky-50 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Hotel size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">Hotel Deals</p>
              <p className="text-xs text-gray-500">Booking.com — family rooms</p>
            </div>
            <ExternalLink size={12} className="text-gray-300 group-hover:text-sky-500" />
          </a>

          <a
            href={klookUrl('Asia family activities')}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center flex-shrink-0">
              <Compass size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">Activities & Tours</p>
              <p className="text-xs text-gray-500">Klook — best family picks</p>
            </div>
            <ExternalLink size={12} className="text-gray-300 group-hover:text-orange-500" />
          </a>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Shield size={10} className="text-emerald-500" />
            Secure checkout
          </span>
          <span>
            We may earn a commission at no extra cost
          </span>
        </div>
      </div>
    );
  }
);
