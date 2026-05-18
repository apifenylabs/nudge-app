import Link from 'next/link';

const sisterSites = [
  { name: 'Family Travel Asia', href: 'https://www.familytravelasia.com', description: 'Family-friendly destinations & tips across Asia' },
  { name: 'Luxury Family Travel Asia', href: 'https://luxury-family-travel-asia.vercel.app', description: 'Premium family getaways & 5-star resorts' },
  { name: 'EV Charging Asia', href: 'https://ev-charging-asia.vercel.app', description: 'EV road trips & charging stations' },
  { name: 'Apifeny AI', href: 'https://apifeny-ai.vercel.app', description: 'Curated AI tools & agents directory' },
  { name: 'Kids Activities Asia', href: 'https://kids-activities-asia.vercel.app', description: 'Kid-friendly activities across Asia' },
  { name: 'Senior-Friendly Travel Asia', href: 'https://senior-friendly-travel-asia.vercel.app', description: 'Accessible travel for older adults' },
  { name: 'Social Beast', href: 'https://social-beast.vercel.app', description: 'AI-powered social content engine' },
];

export default function SiteFooter() {
  return (
    <footer className="hidden sm:block border-t border-gray-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* --- Cross-site monetization bar: book hotels, activities, tours --- */}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎪</span>
              <span className="font-bold text-base text-gray-900">KidsActivitiesAsia</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Curated guide to the best kids&apos; activities, classes, and family-friendly attractions across Asia. Parent-approved, age-filtered, safety-rated.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Browse Activities</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Our Network</h4>
            <ul className="space-y-2">
              {sisterSites.map(site => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-orange-500 transition-colors block"
                  >
                    {site.name}
                  </a>
                  <p className="text-xs text-gray-400">{site.description}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</Link></li>
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
          <span>&copy; {new Date().getFullYear()} Kids Activities Asia. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
