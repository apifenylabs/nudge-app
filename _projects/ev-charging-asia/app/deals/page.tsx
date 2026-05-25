import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, Crown, DollarSign, Gift, ArrowRight, Shield, Star } from 'lucide-react';
import DealsPageContent from './deals-content';
import { getMeta } from '@/lib/getData';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Best EV Deals & Packages in Asia 2026 | Discounted Rentals, Hotels & Tours',
    description: 'Find the best EV travel deals across Asia: discounted Tesla rentals, EV-friendly hotels, road trip packages, charging bundles, and exclusive Klook & Booking.com offers. Save on your next electric road trip.',
    openGraph: {
      title: 'Best EV Deals & Packages in Asia 2026',
      description: 'Discounted EV rentals, road trip packages, EV-friendly hotels, and exclusive affiliate offers across Asia. Save big on your electric adventure.',
      type: 'website',
      images: [{ url: '/og-deals.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best EV Deals & Packages in Asia 2026',
      description: 'Discounted EV rentals, hotel stays, and road trip packages across Asia.',
    },
    keywords: ['EV deals Asia', 'EV rental discount', 'electric car deals', 'Tesla rental deals', 'EV hotel packages', 'road trip deals', 'Klook EV promo', 'EV charging bundle', 'Asia travel deals 2026', 'Singapore EV rental', 'Thailand EV road trip', 'Malaysia EV travel'],
  };
}

export default function DealsPage() {
  const meta = getMeta();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'Best EV Deals & Packages in Asia 2026',
        description: 'Curated EV travel deals, packages, and discounts across Asia. Save on rentals, hotels, and experiences.',
        url: 'https://ev-charging-asia.vercel.app/deals',
        isPartOf: {
          '@type': 'WebSite',
          name: 'EV Charging Asia',
          url: 'https://ev-charging-asia.vercel.app',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ev-charging-asia.vercel.app' },
          { '@type': 'ListItem', position: 2, name: 'Deals & Packages', item: 'https://ev-charging-asia.vercel.app/deals' },
        ],
      },
    ],
  };

  // Hot deals metadata for page
  const instantSavings = [
    { icon: '🚗', text: 'Tesla rental in Thailand', discount: '15% off', url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=tesla-thailand' },
    { icon: '🏨', text: 'EV-friendly hotels in Malaysia', discount: '10% off', url: 'https://www.booking.com/index.html?aid=2875669&city=4006800&nflt=ht_id%3D204' },
    { icon: '🔌', text: 'EV charging bundle Singapore', discount: 'Free charging', url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=charging-bundle-sg' },
    { icon: '🗾', text: 'Japan EV road trip package', discount: '20% off', url: 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=japan-ev-package' },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-600 font-medium">Deals & Packages</span>
          </nav>

          <div className="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <Gift size={20} className="text-amber-300" />
              <span className="text-sm font-medium text-amber-200 uppercase tracking-wider">Limited Time Offers</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Best EV Deals & Packages<br />
              <span className="text-amber-300">Across Asia</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
              Curated discounts on EV rentals, road trip packages, EV-friendly hotels, and charging bundles. 
              Save up to <strong className="text-amber-300">25%</strong> on your next electric adventure.
            </p>

            {/* Instant savings bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {instantSavings.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex flex-col items-center gap-1 bg-white/10 hover:bg-white/20 rounded-xl p-4 backdrop-blur-sm transition-all hover:scale-105 group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs text-blue-100 text-center leading-tight">{item.text}</span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    {item.discount}
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why Book Through Us */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Shield size={20} className="text-emerald-500" />, title: 'Verified Deals', desc: 'Every offer verified for EV travelers. No expired promos, no hidden fees.' },
              { icon: <Star size={20} className="text-amber-500" />, title: 'Best Price Guarantee', desc: 'We compare across Booking.com, Klook, and partners to find you the lowest price.' },
              { icon: <Zap size={20} className="text-sky-500" />, title: 'EV-Specific Filters', desc: 'Only deals that include EV charging, verified by our team of EV travel experts.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Deals Content (client component for interactivity) */}
        <DealsPageContent />
      </div>
    </>
  );
}
