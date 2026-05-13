'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, TrendingUp, X } from 'lucide-react';

interface StickyBookBarProps {
  destinationName: string;
  city: string;
  priceRange: string;
  destinationId: string;
}

/**
 * StickyBookBar — Floating bottom booking bar for mobile devices.
 * Appears on scroll and shows quick affiliate booking CTAs.
 */
export default function StickyBookBar({
  destinationName,
  city,
  priceRange,
  destinationId,
}: StickyBookBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const encodedDest = encodeURIComponent(destinationName);
  const encodedCity = encodeURIComponent(city);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show after scrolling past 700px from top
          setVisible(window.scrollY > 700);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (dismissed || !visible) return null;

  // Extract price display
  const priceCount = priceRange ? (priceRange.replace(/[^$₩¥]/g, '').length || 1) : 1;
  const priceDisplay = '$'.repeat(Math.min(priceCount, 4));

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <div className="bg-white/95 backdrop-blur-lg border-t border-gold/20">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss booking bar"
        >
          <X size={12} />
        </button>

        <div className="px-4 py-3">
          {/* Destination info */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="min-w-0 flex-1 mr-2">
              <p className="text-xs font-semibold text-charcoal truncate">{destinationName}</p>
              <p className="text-[10px] text-gray-500">{city} · {priceDisplay}</p>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-gold font-semibold whitespace-nowrap">
              Best Rate
            </span>
          </div>

          {/* Booking buttons row */}
          <div className="flex gap-2">
            <a
              href={`https://www.booking.com/searchresults.html?ss=${encodedDest}%20${encodedCity}&aid=2875669`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gold text-navy text-xs font-bold rounded-lg hover:bg-gold-light transition-all active:scale-[0.97] min-h-[40px]"
            >
              <Calendar size={12} />
              Book Hotel
            </a>
            <a
              href={`https://www.klook.com/search/?keyword=${encodedDest}%20${encodedCity}&aid=119991`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition-all active:scale-[0.97] min-h-[40px]"
            >
              <TrendingUp size={12} />
              Tours
            </a>
            <a
              href={`https://www.viator.com/${encodedCity.replace(/%20/g, '')}/things-to-do?aid=P00299136`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-rose-500 text-white text-xs font-semibold rounded-lg hover:bg-rose-600 transition-all active:scale-[0.97] min-h-[40px]"
            >
              <ExternalLink size={12} />
              Tours
            </a>
          </div>

          {/* Affiliate disclosure */}
          <p className="text-[8px] text-gray-400 text-center mt-1.5">
            We may earn a commission at no extra cost to you
          </p>
        </div>
      </div>
    </div>
  );
}
