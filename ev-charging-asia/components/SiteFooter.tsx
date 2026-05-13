import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Our Network</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.familytravelasia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  Asia Family Travel Directory
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Family travel tips & destinations</p>
              </li>
              <li>
                <a
                  href="https://luxuryfamilytravelasia.com"
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
                  href="https://nudge-sigma-liart.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-rose-600 transition-colors"
                >
                  Nudge
                </a>
                <p className="text-xs text-gray-400 mt-0.5">Voice-powered family task management</p>
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
                  href="https://social-beast-two.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  Social Beast
                </a>
                <p className="text-xs text-gray-400 mt-0.5">AI-powered content creation suite</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-6 text-center">
          <p className="text-[10px] text-gray-400">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            As a Klook and Booking.com partner, we may earn from qualifying bookings.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>&copy; {new Date().getFullYear()} EV Charging Asia. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
