'use client';

import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, Lock, Check, FileText, AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';
import { premiumRoutes, getPremiumRouteBySlug } from '@/lib/premium-routes';

export default function PremiumRoutePurchasePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const isFallback = searchParams.get('fallback') === 'true';

  const route = getPremiumRouteBySlug(slug);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Premium Route Not Found</h1>
          <p className="text-gray-600 mb-4">This premium guide is no longer available.</p>
          <Link href="/routes" className="text-sky-600 hover:underline text-sm">← Back to routes</Link>
        </div>
      </div>
    );
  }

  const handlePurchase = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: route.slug }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Simple header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={18} className="text-green-500" />
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">EV Charging Asia</span>
          </Link>
          <Link href="/routes" className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <ArrowLeft size={14} />
            Routes
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Purchase card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} />
              <span className="text-xs uppercase tracking-wider font-medium opacity-80">Premium Guide</span>
            </div>
            <h1 className="text-xl font-bold mb-1">{route.title}</h1>
            <p className="text-sm text-white/80">{route.subtitle}</p>
          </div>

          {/* Price & details */}
          <div className="p-6">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ${route.price.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm">USD • one-time purchase</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                <FileText size={12} />
                {route.pages} pages
              </span>
              {route.countries.map(c => (
                <span key={c} className="inline-flex items-center px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                  {c}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {route.description}
            </p>

            {/* What's included */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">What You Get:</h3>
              <ul className="space-y-2">
                {[
                  'Full day-by-day itinerary optimized for EVs',
                  'Verified charging stations along the entire route',
                  'Curated family-friendly activities with prices',
                  'EV-charging verified hotel recommendations',
                  'Offline-ready printable PDF format',
                  'Local emergency contacts & roadside assistance',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Purchase button */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4">
                <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-indigo-700 transition-all disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Lock size={18} />
              )}
              {loading ? 'Opening checkout...' : `Purchase Premium Guide — $${route.price.toFixed(2)}`}
            </button>

            {isFallback && (
              <div className="mt-3 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Stripe payment is not yet configured. This purchase flow will redirect to a simulated completion.
                </p>
              </div>
            )}

            <p className="mt-3 text-xs text-center text-gray-400">
              Secure checkout powered by Stripe. Your guide is available immediately after purchase.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href={`/routes/${route.slug}`} className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
            <ArrowLeft size={14} />
            Back to {route.title}
          </Link>
        </div>
      </main>
    </div>
  );
}
