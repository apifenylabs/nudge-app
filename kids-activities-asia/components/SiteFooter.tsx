import Link from 'next/link';

const sisterSites = [
  { name: 'Asia Family Travel Directory', href: 'https://www.familytravelasia.com', description: 'Family-friendly destinations & tips' },
  { name: 'Luxury Family Travel Asia', href: 'https://luxuryfamilytravelasia.com', description: 'Premium family getaways & 5-star resorts' },
  { name: 'EV Charging Asia', href: 'https://ev-charging-asia.vercel.app', description: 'EV road trips & charging stations' },
  { name: 'Apifeny AI', href: 'https://apifeny-ai.vercel.app', description: 'Curated AI tools & agents directory' },
  { name: 'Nudge', href: 'https://nudge-sigma-liart.vercel.app', description: 'Voice-powered family task management' },
  { name: 'Social Beast', href: 'https://social-beast-two.vercel.app', description: 'AI-powered content creation suite' },
];

export default function SiteFooter() {
  return (
    <footer className="hidden sm:block border-t border-gray-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
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

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
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
