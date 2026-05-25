'use client';

import { ExternalLink } from 'lucide-react';
import { getAffiliateLinks, getPartner, fireAffiliateBeacon } from '@/lib/affiliate';
import type { BlogPost } from '@/lib/blog-data';

interface BlogBookingCTAProps {
  post: BlogPost;
  /** Override the destination text (defaults to post title) */
  destination?: string;
  /** Number of affiliate cards to show (default 3) */
  cardCount?: number;
}

/**
 * BlogBookingCTA — Renders affiliate partner cards at the bottom of blog posts.
 *
 * Infers relevant partners from the post's tags:
 * - "accommodation" tags → booking.com, agoda
 * - "tour" / "attraction" tags → Klook, Viator
 * - "flight" tags → Skyscanner
 * - Falls back to hotel + tour if no tag match
 */
export default function BlogBookingCTA({
  post,
  destination,
  cardCount = 3,
}: BlogBookingCTAProps) {
  const dest = destination || post.title.replace(/^(Complete Guide to |Guide to |Best |Top |Ultimate |The )/i, '').replace(/ for Seniors.*$/i, '').trim();
  const links = getAffiliateLinks(dest, post.tags || [], cardCount);

  if (links.length === 0) return null;

  return (
    <div className="my-10 p-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border border-teal-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ExternalLink className="w-5 h-5 text-teal-600" />
        <h3 className="text-lg font-bold text-gray-900">Plan Your Trip</h3>
      </div>
      <p className="text-sm text-gray-600 mb-5">
        Ready to go? These trusted partners offer great deals for senior travelers in <strong>{dest}</strong>.
      </p>

      <div className="grid gap-3">
        {links.map((link) => {
          const partner = getPartner(link.partner);
          if (!partner) return null;
          return (
            <a
              key={link.partner}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 hover:shadow-md transition-shadow border border-gray-100 group"
              onClick={() => fireAffiliateBeacon(`blog-${link.partner}`, link.url)}
            >
              <span className="text-2xl">{partner.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-900 text-sm">{partner.name}</span>
                  <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full font-medium">
                    {link.commission}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{partner.tagline}</p>
              </div>
              <span className="text-teal-600 text-sm font-medium group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                Search &rsaquo;
              </span>
            </a>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
        We may earn a small commission when you book through these links — at no extra cost to you.
        It helps us keep this guide free and up to date for all seniors.
      </p>
    </div>
  );
}
