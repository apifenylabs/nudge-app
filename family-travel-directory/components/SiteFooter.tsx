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
    <footer className="bg-navy text-warm-white border-t border-sand-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-warm-white mb-3">
              <span className="text-accent-light">✦</span> Family Travel Asia
            </h3>
            <p className="text-sm text-sand-200 leading-relaxed">
              Honest family travel advice for Asia. Real parent stories, practical tips, and kid-approved destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-warm-white mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-sand-200 hover:text-accent-light transition-colors">Home</Link></li>
              <li><Link href="/search" className="text-sm text-sand-200 hover:text-accent-light transition-colors">Destinations</Link></li>
              <li><Link href="/account/saved" className="text-sm text-sand-200 hover:text-accent-light transition-colors">Saved</Link></li>
              <li><Link href="/account" className="text-sm text-sand-200 hover:text-accent-light transition-colors">Account</Link></li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div className="sm:col-span-2 md:col-span-2">
            <h4 className="text-sm font-semibold text-warm-white mb-3 uppercase tracking-wider">Our Network</h4>
            <ul className="space-y-3">
              {sisterSites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-sand-200 hover:text-accent-light transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:bg-accent-light transition-colors" />
                    <span className="font-medium text-warm-white">{site.name}</span>
                    <span className="text-sand-300">—</span>
                    <span className="text-sand-200">{site.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 md:mt-8 pt-6 border-t border-sand-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-sand-300">
            &copy; {new Date().getFullYear()} Family Travel Directory. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-sand-300">
            <Link href="/privacy" className="hover:text-accent-light transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-accent-light transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-accent-light transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
