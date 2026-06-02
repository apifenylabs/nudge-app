import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, FileText, Lock, Check, Star, Download, MapPin, Users, BatteryCharging } from 'lucide-react';
import { getAllPremiumRoutes } from '@/lib/premium-routes';
import SiteFooter from '@/components/SiteFooter';
import NewsletterSignup from '@/components/NewsletterSignup';
import { BreadcrumbSchemaSSR } from '@/components/SchemaOrg';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Premium EV Road Trip Guides — PDF Downloads | EV Charging Asia',
  description: 'Download detailed premium PDF guides for Asia\'s best EV road trips. Turn-by-turn directions, verified charging stations, family activities with prices, and EV-friendly hotel recommendations.',
  alternates: {
    canonical: 'https://ev-charging-asia.vercel.app/premium-routes',
  },
  openGraph: {
    title: 'Premium EV Road Trip Guides — Downloadable PDF Itineraries',
    description: 'Expert-curated PDF guides for EV road trips across Asia. Every charging station mapped, every hotel verified, every activity priced.',
    url: 'https://ev-charging-asia.vercel.app/premium-routes',
    type: 'website',
    locale: 'en_US',
    siteName: 'EV Charging Asia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium EV Road Trip Guides — PDF Downloads',
    description: 'Detailed PDF guides for Asia\'s best EV road trips. Charging stops, hotels, activities, and more.',
  },
  other: {
    'keywords': 'EV road trip PDF guide, premium EV itinerary, downloadable EV route, Bangkok to Phuket PDF, Bali EV guide, Singapore to KL guide, Japan EV road trip book, cross-border EV guide Asia, EV road trip planning PDF, printable EV itinerary',
  },
};

const coverGradients: Record<string, string> = {
  'prem-bkk-phuket': 'from-emerald-500 to-teal-600',
  'prem-sg-kl': 'from-sky-500 to-indigo-600',
  'prem-bali-loop': 'from-lime-500 to-green-600',
  'prem-hk-macau': 'from-rose-500 to-red-600',
  'prem-osaka-tokyo': 'from-pink-500 to-rose-600',
  'prem-delhi-jaipur': 'from-amber-500 to-orange-600',
};

const tagEmojis: Record<string, string> = {
  thailand: '🇹🇭', malaysia: '🇲🇾', singapore: '🇸🇬', japan: '🇯🇵',
  india: '🇮🇳', indonesia: '🇮🇩', 'hong-kong': '🇭🇰', macau: '🇲🇴',
  china: '🇨🇳',
};

const highlightIcons: Record<string, string> = {
  thailand: '🐘', malaysia: '🏗️', singapore: '🏙️', japan: '🏔️',
  india: '🕌', indonesia: '🌴',
};

export default function PremiumRoutesIndexPage() {
  const routes = getAllPremiumRoutes();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Premium EV Road Trip PDF Guides for Asia',
    description: 'Downloadable premium PDF guides for EV road trips across Asia.',
    url: 'https://ev-charging-asia.vercel.app/premium-routes',
    numberOfItems: routes.length,
    itemListElement: routes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://ev-charging-asia.vercel.app/premium-routes/${r.slug}/purchase`,
      name: r.title,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchemaSSR items={[
        { name: 'Home', url: '/' },
        { name: 'Premium Guides', url: '/premium-routes' },
      ]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/routes" className="hover:text-gray-900">Routes</Link>
            <Link href="/compare" className="hover:text-gray-900">Compare</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star size={12} />
              PREMIUM
            </span>
            <span className="text-xs text-gray-500">Print-Ready PDF Guides</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Premium EV Road Trip PDF Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download the definitive guide for your EV road trip. Every charging station verified, 
            every hotel EV-parking confirmed, every family activity with prices and opening hours. 
            <span className="font-semibold text-gray-800"> Print it, pack it, hit the road.</span>
          </p>
        </div>
      </section>

      {/* Premium route cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map(route => {
            const gradient = coverGradients[route.id] || 'from-sky-500 to-indigo-600';
            const countryTag = route.tags.find(t => tagEmojis[t as keyof typeof tagEmojis]);
            const flag = countryTag ? tagEmojis[countryTag as keyof typeof tagEmojis] : '🌏';

            return (
              <div
                key={route.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col"
              >
                {/* Cover */}
                <Link href={`/premium-routes/${route.slug}/purchase`}>
                  <div className={`bg-gradient-to-br ${gradient} p-5 text-white relative h-36`}>
                    <div className="flex items-start justify-between">
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-medium flex items-center gap-1">
                        <FileText size={12} />
                        {route.pages} pages
                      </span>
                      <span className="text-2xl">{flag}</span>
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <h2 className="text-base font-bold leading-tight mb-1">
                        {route.title.replace(/Premium Guide$/, '').trim()}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-white/80">
                        <span>${route.price.toFixed(2)} USD</span>
                        <span>·</span>
                        <span>one-time</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {route.description}
                  </p>

                  {/* What's inside */}
                  <div className="space-y-1.5 mb-4">
                    {[
                      'Day-by-day EV-optimized route',
                      'Verified charging stations',
                      'Family activities with prices',
                      'EV-confirmed hotels',
                      'Printable PDF format',
                    ].slice(0, 4).map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <Check size={11} className="text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {route.countries.map(c => (
                      <span key={c} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[10px] font-medium">
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/premium-routes/${route.slug}/purchase`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm"
                  >
                    <Lock size={14} />
                    Download — ${route.price.toFixed(2)}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Benefits section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Buy a Premium Guide?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-3">
                <MapPin size={20} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Verified Charging Stations</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every charging station on the route is checked for availability, connector type, and speed. 
                No more arriving at a broken charger.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                <Users size={20} className="text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Family-First Planning</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Activities with admission prices, kid-friendly restaurants, and EV-confirmed family hotels 
                with playgrounds and pools.
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                <Download size={20} className="text-amber-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1">Printable + Offline</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No signal? No problem. Every guide is a print-ready PDF. Keep it in your glove box 
                or on your phone for offline access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NewsletterSignup variant="hero" source="premium-routes" />
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            {
              q: 'How do I receive my PDF after purchase?',
              a: 'Immediately after payment confirmation, you\'ll be redirected to a download page where you can save your PDF. We also email you a download link.',
            },
            {
              q: 'Can I print the guide?',
              a: 'Absolutely. Every PDF is designed to be printer-friendly — optimized for both A4 and Letter sizes. Print the full guide or just the day you need.',
            },
            {
              q: 'Are the charging station details up to date?',
              a: 'We review and update every guide quarterly. Each PDF includes a version date, and we email update notifications to all purchasers when a new version is available.',
            },
            {
              q: 'What if my route doesn\'t match exactly?',
              a: 'Our guides cover the main route with recommended stops. We include alternative charging stations and detour options so you can customize as needed.',
            },
            {
              q: 'Is there a bundle discount?',
              a: 'Not yet — but we\'re working on it! Join the newsletter above and we\'ll let you know when bundle pricing launches.',
            },
          ].map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border border-gray-200 group">
              <summary className="px-4 py-3 text-sm font-semibold text-gray-900 cursor-pointer flex items-center justify-between list-none">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="px-4 pb-3 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-2">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
