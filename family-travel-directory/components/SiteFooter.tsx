import Link from 'next/link';

const sisterSites = [
  { name: 'Luxury Family Travel Asia', href: 'https://luxuryfamilytravelasia.com', description: 'Premium family getaways & 5-star resorts' },
  { name: 'EV Charging Asia', href: 'https://ev-charging-asia.vercel.app', description: 'EV road trips & charging stations across Asia' },
  { name: 'Apifeny AI', href: 'https://apifeny-ai.vercel.app', description: 'Curated AI tools & agents directory' },
  { name: 'Nudge', href: 'https://nudge-sigma-liart.vercel.app', description: 'Voice-powered family task management app' },
  { name: 'Kids Activities Asia', href: 'https://kids-activities-asia.vercel.app', description: 'Kid-friendly activities & destinations' },
  { name: 'Social Beast', href: 'https://social-beast-two.vercel.app', description: 'AI-powered content creation suite' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              <span className="text-teal-600">✦</span> Family Travel Asia
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Honest family travel advice for Asia. Real parent stories, practical tips, and kid-approved destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Destinations</Link></li>
              <li><Link href="/account/saved" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Saved</Link></li>
              <li><Link href="/account" className="text-sm text-gray-500 hover:text-teal-600 transition-colors">Account</Link></li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div className="sm:col-span-2 md:col-span-2">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Our Network</h4>
            <ul className="space-y-3">
              {sisterSites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 group-hover:bg-teal-600 transition-colors" />
                    <span className="font-medium">{site.name}</span>
                    <span className="text-gray-300">—</span>
                    <span className="text-gray-400">{site.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Family Travel Directory. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-teal-600 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
