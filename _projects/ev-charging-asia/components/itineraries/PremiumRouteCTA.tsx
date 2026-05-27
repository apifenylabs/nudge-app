'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Lock, Loader2, Crown, Zap } from 'lucide-react';
import type { Itinerary } from '@/data/itineraries';
import { getPremiumRouteBySlug, premiumRoutes } from '@/lib/premium-routes';

interface PremiumRouteCTAProps {
  itinerary: Itinerary;
  /** Show compact inline version instead of full card */
  compact?: boolean;
}

/**
 * PremiumRouteCTA — Prompts users to purchase the premium PDF version
 * of a route guide. Shows a "Get Premium Guide" button that links to
 * the Stripe checkout flow.
 */
export default function PremiumRouteCTA({ itinerary, compact = false }: PremiumRouteCTAProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Try to find matching premium route
  const premium = premiumRoutes.find(r =>
    r.tags.some(t => itinerary.tags.includes(t)) ||
    r.slug.includes(itinerary.slug) ||
    itinerary.slug.includes(r.slug.replace('premium-', ''))
  );

  if (!premium) return null;

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: premium.slug }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      // Fallback: navigate to purchase page
      router.push(`/premium-routes/${premium.slug}/purchase`);
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handlePurchase}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-all text-sm font-medium shadow-sm disabled:opacity-50 w-full justify-center"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Crown size={16} className="text-amber-600" />
        )}
        {loading ? 'Opening...' : `Get Premium Guide — $${premium.price.toFixed(2)}`}
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
          <Crown size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-1.5">
            Premium Route Guide
            <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-semibold">
              ${premium.price.toFixed(2)}
            </span>
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {premium.pages}-page PDF with turn-by-turn directions, verified charging stations, family activities, luxury stays & offline maps.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Lock size={14} />
              )}
              {loading ? 'Processing...' : `Buy Now — $${premium.price.toFixed(2)}`}
            </button>
            <span className="text-[10px] text-gray-400 flex items-center gap-1">
              <Zap size={10} className="text-green-500" />
              Instant download
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
