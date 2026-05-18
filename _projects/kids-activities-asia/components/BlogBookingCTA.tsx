'use client';

import { ExternalLink } from 'lucide-react';
import { AFFILIATE, klookUrl, bookingUrl, viatorUrl } from '@/lib/affiliate';
import type { BlogPost } from '@/lib/blog-data';

/**
 * TAG-to-partner mapping for kids activities content.
 * Infers relevant booking partners from blog post tags.
 */
const TAG_TO_PARTNERS: Record<string, Array<{ name: string; icon: string; color: string; tagline: string }>> = {
  'activities': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Book kids tours & attraction tickets' },
    { name: 'GetYourGuide', icon: '🗺️', color: '#FA5833', tagline: 'Top-rated family tours & day trips' },
  ],
  'travel': [
    { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Find family-friendly hotels & resorts' },
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Book airport transfers & day trips' },
  ],
  'parent-tips': [
    { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Family hotels with kids clubs' },
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Kids activities & attraction passes' },
  ],
  'safety': [
    { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Safe kid-friendly hotels' },
    { name: 'Viator', icon: '🌟', color: '#E2231A', tagline: 'Family-safe tours & experiences' },
  ],
  'birthday-parties': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Birthday party venues & packages' },
    { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Party rooms & family hotels' },
  ],
  'education': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Educational tours & museum passes' },
    { name: 'Viator', icon: '🌟', color: '#E2231A', tagline: 'Guided educational experiences' },
  ],
  'reviews': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Book top-rated activities' },
  ],
  'classes': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Kids classes, workshops & camps' },
    { name: 'GetYourGuide', icon: '🗺️', color: '#FA5833', tagline: 'Cooking, arts & craft classes' },
  ],
  'comparisons': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Compare prices on family attractions' },
  ],
  'seasonal': [
    { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Seasonal events & holiday activities' },
    { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Holiday family hotel deals' },
  ],
};

const DEFAULT_PARTNERS = [
  { name: 'Booking.com', icon: '🏨', color: '#003580', tagline: 'Find family-friendly hotels' },
  { name: 'Klook', icon: '🎫', color: '#FF5A00', tagline: 'Book kids activities & tours' },
  { name: 'Viator', icon: '🌟', color: '#E2231A', tagline: 'Family-friendly experiences' },
];

/** Build search URL for a given partner and destination */
function partnerUrl(partnerName: string, dest: string): string {
  switch (partnerName) {
    case 'Booking.com': return bookingUrl(dest);
    case 'Klook': return klookUrl(`${dest} kids`);
    case 'Viator': return viatorUrl(dest);
    case 'GetYourGuide': return `https://www.getyourguide.com/s/?q=${encodeURIComponent(dest)}&partner_id=${AFFILIATE.getYourGuideId}&utm_medium=online_publisher&placement=content-middle`;
    default: return '';
  }
}

interface BlogBookingCTAProps {
  post: BlogPost;
  destination?: string;
  cardCount?: number;
}

/**
 * BlogBookingCTA — Renders affiliate partner cards below blog posts.
 * 
 * Infers relevant partners from the post's tags.
 * Falls back to hotels + activities if no tag match.
 */
export default function BlogBookingCTA({
  post,
  destination,
  cardCount = 3,
}: BlogBookingCTAProps) {
  const dest = (destination || post.title)
    .replace(/^(Complete Guide to |Guide to |Best |Top |Ultimate |The )/i, '')
    .replace(/ for Kids.*$/i, '')
    .replace(/ Kids.*$/i, '')
    .trim();

  // Collect partners from tags
  const partnerSet = new Set<string>();
  const partners: Array<{ name: string; icon: string; color: string; tagline: string }> = [];

  for (const tag of post.tags || []) {
    const mapped = TAG_TO_PARTNERS[tag.toLowerCase()];
    if (mapped) mapped.forEach((p) => {
      if (!partnerSet.has(p.name)) {
        partnerSet.add(p.name);
        partners.push(p);
      }
    });
  }

  // Fallback if no tags matched
  if (partners.length === 0) {
    DEFAULT_PARTNERS.slice(0, cardCount).forEach((p) => {
      partnerSet.add(p.name);
      partners.push(p);
    });
  }

  const displayPartners = partners.slice(0, cardCount);

  if (displayPartners.length === 0) return null;

  return (
    <div className="my-10 p-6 bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl border border-orange-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-bold text-gray-900">Family Fun in {dest}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-5">
        Ready for an adventure? Book your family activities and accommodation through these trusted partners.
      </p>

      <div className="grid gap-3">
        {displayPartners.map((partner) => (
          <a
            key={partner.name}
            href={partnerUrl(partner.name, dest)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 hover:shadow-md transition-shadow border border-gray-100 group"
          >
            <span className="text-2xl">{partner.icon}</span>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-900 text-sm block">{partner.name}</span>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{partner.tagline}</p>
            </div>
            <span className="text-orange-600 text-sm font-medium group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
              Search &rsaquo;
            </span>
          </a>
        ))}
      </div>

      <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
        We may earn a small commission when you book through these links — at no extra cost to you.
        It helps us keep this guide free for families.
      </p>
    </div>
  );
}
