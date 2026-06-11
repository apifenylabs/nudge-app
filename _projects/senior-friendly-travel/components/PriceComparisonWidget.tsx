'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ExternalLink, DollarSign, Tag, Search, Globe, TrendingUp, ChevronRight, Zap, Clock, Shield, CheckCircle, Sparkles, Star, BadgeCheck } from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────

interface RevenueEngine {
  klook_product_id?: string | null;
  viator_product_id?: string | null;
  current_price_usd?: number | null;
  last_price_check?: string | null;
}

interface DeepLinkInfo {
  klook: { productId: string | null; price: number | null; lastCheck: string | null; url: string; label: string; directLabel: string };
  viator: { productId: string | null; price: number | null; lastCheck: string | null; url: string; label: string; directLabel: string };
  bestPrice: string;
  hasIds: boolean;
}

interface PriceComparisonWidgetProps {
  name: string;
  city: string;
  revenue_engine?: RevenueEngine | null;
}

// ─── Affiliate IDs from Env Vars ──────────────────────────────
// Set KLOOK_AFFILIATE_ID and VIATOR_AFFILIATE_ID in Vercel env vars
// Falls back to hardcoded defaults for local dev
const KLOOK_AFFILIATE_ID = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID || '38VWJMX';
const VIATOR_AFFILIATE_ID = process.env.NEXT_PUBLIC_VIATOR_AFFILIATE_ID || '455806';

function klookUrl(name: string, city: string, productId?: string | null): string {
  const query = encodeURIComponent(`${name} ${city}`);
  if (productId) return `https://www.klook.com/activity/${productId}/?aid=${KLOOK_AFFILIATE_ID}`;
  return `https://www.klook.com/search/?keyword=${query}&aid=${KLOOK_AFFILIATE_ID}`;
}

function viatorUrl(name: string, city: string, productId?: string | null): string {
  const query = encodeURIComponent(`${name} ${city}`);
  if (productId) return `https://www.viator.com/tours/${productId}?pid=${VIATOR_AFFILIATE_ID}`;
  return `https://www.viator.com/searchResults/all?text=${query}&pid=${VIATOR_AFFILIATE_ID}`;
}

function buildDeepLinks(name: string, city: string, re?: RevenueEngine | null): DeepLinkInfo {
  const hasKlookId = !!(re?.klook_product_id);
  const hasViatorId = !!(re?.viator_product_id);
  const price = re?.current_price_usd || null;

  return {
    klook: {
      productId: re?.klook_product_id || null,
      price,
      lastCheck: re?.last_price_check || null,
      url: klookUrl(name, city, re?.klook_product_id),
      label: hasKlookId && price ? `Book Now on Klook — $${price}` : 'Check Klook for the best price',
      directLabel: 'Save on Klook today →',
    },
    viator: {
      productId: re?.viator_product_id || null,
      price,
      lastCheck: re?.last_price_check || null,
      url: viatorUrl(name, city, re?.viator_product_id),
      label: hasViatorId && price ? `Book Now on Viator — $${price}` : 'Check Viator for the best price',
      directLabel: 'Save on Viator today →',
    },
    bestPrice: price ? `From $${price}` : 'Check best price',
    hasIds: hasKlookId || hasViatorId,
  };
}

const PLATFORMS = {
  klook: {
    name: 'Klook',
    color: 'from-orange-500 to-rose-500',
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textColor: 'text-orange-700',
    hoverBg: 'hover:bg-orange-100',
    hoverBorder: 'hover:border-orange-300',
    icon: Tag,
    trustLine: 'Secure booking · 100K+ reviews',
  },
  viator: {
    name: 'Viator',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    borderLight: 'border-rose-200',
    textColor: 'text-rose-700',
    hoverBg: 'hover:bg-rose-100',
    hoverBorder: 'hover:border-rose-300',
    icon: Globe,
    trustLine: 'TripAdvisor company · Free cancellation',
  },
};

// ─── Component ──────────────────────────────────────────────────

export default function PriceComparisonWidget({ name, city, revenue_engine }: PriceComparisonWidgetProps) {
  const links = buildDeepLinks(name, city, revenue_engine);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll-in animation
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
    <div
      ref={ref}
      className={`bg-gradient-to-br from-amber-50/80 to-orange-50/80 border border-amber-200/50 rounded-2xl p-5 mb-12 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={`${name} tickets`} />
      <link itemProp="url" href={`https://www.klook.com/en-US/search?query=${encodeURIComponent(name)}`} />

      {/* ─── HEADER ─── */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-sm">
          <DollarSign size={15} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">Best Price Guarantee</h3>
          <p className="text-[10px] text-gray-400">Compare prices across trusted booking platforms</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Shield size={10} className="text-emerald-500" />
          <span className="text-[10px] text-emerald-600 font-medium">Secure checkout</span>
        </div>
      </div>

      {/* ─── TRUST BANNER ─── */}
      <div className="mb-4 p-2.5 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeCheck size={14} className="text-amber-600" />
            <p className="text-[11px] text-amber-800 font-medium">
              {links.bestPrice ? links.bestPrice : 'Unlock the best price'}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-amber-600">
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <span className="ml-0.5">Trusted by families</span>
          </div>
        </div>
      </div>

      {/* ─── PLATFORM CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(['klook', 'viator'] as const).map((platform) => {
          const p = PLATFORMS[platform];
          const info = links[platform];
          const Icon = p.icon;
          const loading = hovered === null;

          return (
            <a
              key={platform}
              href={info.url}
              target="_blank"
              rel="nofollow sponsored noopener"
              onMouseEnter={() => setHovered(platform)}
              onMouseLeave={() => setHovered(null)}
              className={`group relative flex items-center gap-3 px-4 py-4 rounded-xl border-2 transition-all duration-200 ${
                hovered === platform
                  ? `${p.bgLight} ${p.borderLight} ${p.hoverBorder} shadow-lg -translate-y-0.5`
                  : 'bg-white border-gray-100 hover:bg-gray-50 hover:border-gray-200 shadow-sm'
              } active:scale-[0.98]`}
            >
              {/* Platform icon */}
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
                <Icon size={17} className="text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-bold ${p.textColor}`}>{p.name}</p>
                  <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
                    {info.productId ? 'Exact match' : 'Search'}
                  </span>
                </div>
                <p className={`text-xs font-semibold ${hovered === platform ? p.textColor : 'text-gray-700'} truncate`}>
                  {info.label}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <CheckCircle size={9} className="text-emerald-400" />
                  {p.trustLine}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className={`flex items-center gap-0.5 text-xs font-semibold ${p.textColor} opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0`}>
                <span>Book</span>
                <ExternalLink size={10} />
              </div>
            </a>
          );
        })}
      </div>

      {/* ─── DISCLOSURE ─── */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <Clock size={10} />
          {links.klook.lastCheck && (
            <span>Prices updated: {new Date(links.klook.lastCheck).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          )}
        </div>
        <Link
          href={`/search?q=${encodeURIComponent(name)}`}
          className="text-[10px] text-sky-600 hover:text-sky-700 font-medium flex items-center gap-0.5"
        >
          More options <ChevronRight size={10} />
        </Link>
      </div>
    </div>
  );
}


