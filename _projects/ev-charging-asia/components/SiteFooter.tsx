import Link from 'next/link';
import { Zap, Mail } from 'lucide-react';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- Cross-site monetization bar: book hotels, activities, rentals --- */}
        {/* Visible on every page – subtle, informative, non-intrusive */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Plan Your Trip
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.booking.com/index.html?aid=2875669"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
              aria-label="Book hotels via Booking.com"
            >
              <span aria-hidden="true" className="text-sm">🏨</span>
              <span>Hotels</span>
            </a>
            <a
              href="https://affiliate.klook.com/redirect?aid=119991"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
              aria-label="Book activities via Klook"
            >
              <span aria-hidden="true" className="text-sm">🎫</span>
              <span>Activities</span>
            </a>
            <a
              href="https://www.viator.com/?pid=P00299136"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
              aria-label="Book tours via Viator"
            >
              <span aria-hidden="true" className="text-sm">🏛️</span>
              <span>Tours</span>
            </a>
            <a
              href="https://www.getyourguide.com/?partner_id=JcqJY3NLQH4"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
              aria-label="Book experiences via GetYourGuide"
            >
              <span aria-hidden="true" className="text-sm">🌟</span>
              <span>Experiences</span>
            </a>
            <a
              href="https://www.expedia.com/?msp_cid=296967635"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm active:scale-[0.97] transition-all duration-150"
              aria-label="Book car rental via Expedia"
            >
              <span aria-hidden="true" className="text-sm">🚗</span>
              <span>Car Rental</span>
            </a>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            Support this site — we may earn a commission when you book through these links, at no extra cost to you.
          </p>
        </div>

        {/* Newsletter section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="max-w-md mx-auto text-center">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              <Mail size={12} className="inline mr-1 text-emerald-500" />
              Free EV Road Trip Guide
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Get Monthly Route Updates</h3>
            <p className="text-xs text-gray-500 mb-3">
              New routes, charging station additions, and exclusive partner deals.
            </p>
            <NewsletterSignup variant="footer" source="footer" />
          </div>
        </div>

        {/* Main footer row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-3">
              <Zap size={18} className="text-green-500" />
              <span className="text-sm font-semibold">EV Charging Asia</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Find EV charging stations across Asia. Routes, reviews, and comparisons for the electric traveller.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-400 hover:text-green-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-gray-400 hover:text-green-600 transition-colors">Chargers</Link>
              </li>
              <li>
                <Link href="/routes" className="text-sm text-gray-400 hover:text-green-600 transition-colors">Routes</Link>
              </li>
              <li>
                <Link href="/compare" className="text-sm text-gray-400 hover:text-green-600 transition-colors">Compare</Link>
              </li>
              <li>
                <Link href="/premium-routes" className="text-sm text-amber-500 hover:text-amber-600 transition-colors font-medium">Premium Guides</Link>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">🌏 Our Network</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.familytravelasia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  Family Travel Asia
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Family travel tips & destinations</p>
              </li>
              <li>
                <a
                  href="https://luxury-family-travel-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-amber-600 transition-colors"
                >
                  Luxury Family Travel Asia
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Premium family getaways & 5-star resorts</p>
              </li>
              <li>
                <a
                  href="https://ev-charging-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-green-600 transition-colors"
                >
                  EV Charging Asia
                </a>
                <p className="text-xs text-gray-400 mt-0.5">EV road trips & charging stations</p>
              </li>
              <li>
                <a
                  href="https://apifeny-ai.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-purple-600 transition-colors"
                >
                  Apifeny AI
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Curated AI tools & agents directory</p>
              </li>
              <li>
                <a
                  href="https://kids-activities-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-sky-600 transition-colors"
                >
                  Kids Activities Asia
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Kid-friendly activities across Asia</p>
              </li>
              <li>
                <a
                  href="https://senior-friendly-travel-asia.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
                >
                  Senior-Friendly Travel Asia
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Accessible travel for older adults</p>
              </li>
              <li>
                <a
                  href="https://social-beast.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  Social Beast
                </a>
                <p className="text-xs text-gray-400 mt-0.5">AI-powered social content engine</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-6 text-center">
          <p className="text-[10px] text-gray-400">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            As a Klook, Booking.com, Viator, GetYourGuide, and Expedia partner we may earn from qualifying bookings.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} EV Charging Asia. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <Link href="/seasons" className="hover:text-gray-600 transition-colors">Seasons</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
