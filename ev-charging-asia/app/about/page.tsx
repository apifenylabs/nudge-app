import { Metadata } from 'next';
import Link from 'next/link';
import { Zap, MapPin, Star, Globe, ChevronRight } from 'lucide-react';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'About — EV Charging Asia',
  description: 'We built EV Charging Asia because existing tools work great in Europe/US but fall short in Asia. We are fixing that — one charging station at a time.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Zap size={20} className="text-green-500" />
            <span className="font-semibold text-gray-900 text-sm">EV Charging Asia</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/search" className="hover:text-gray-900">Search</Link>
            <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About EV Charging Asia</h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          We built EV Charging Asia because existing tools work great in Europe and the US but fall short in Asia. We&apos;re fixing that — one charging station at a time.
        </p>
        <p className="text-gray-600 mb-12 leading-relaxed">
          Whether you&apos;re road-tripping from Bangkok to Chiang Mai, driving across the Malay Peninsula, or navigating Japan&apos;s expressways, our directory helps you find reliable EV charging stations with the connectors you need, rated by real drivers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <MapPin size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive Coverage</h3>
            <p className="text-sm text-gray-600">30+ charging stations across 5 countries — Japan, Singapore, Thailand, Malaysia, and China. From Tokyo to Singapore, we have got you covered.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
              <Star size={24} className="text-sky-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Driver-Rated Reliability</h3>
            <p className="text-sm text-gray-600">Real-time status reports from EV drivers. No stale data — see working, broken, or occupied before you drive there.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Globe size={24} className="text-amber-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Multi-Connector Support</h3>
            <p className="text-sm text-gray-600">CCS2, CHAdeMO, Type 2, GB/T, and NACS. Filter by your car&apos;s connector — OR logic so you see every compatible station.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Star size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Built for Road Trips</h3>
            <p className="text-sm text-gray-600">Speed ratings (150kW+, 50-150kW, &lt;50kW), reliability scores, and route planning data for long-distance EV travel across Asia.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Help Us Grow</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Know a charging station we should add? Want to report an error? Get in touch.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-gray-900 font-semibold rounded-xl hover:bg-green-400 transition-all">
            Contact Us <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
