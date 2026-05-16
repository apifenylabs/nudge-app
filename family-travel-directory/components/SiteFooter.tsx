import Link from 'next/link';
import AffiliateLink from './affiliate/AffiliateLink';

const sisterSites = [
  { name: 'Apifeny AI', href: 'https://apifeny-ai.vercel.app', description: 'Curated AI tools & agents directory', badge: 'AI Hub' },
  { name: 'EV Charging Asia', href: 'https://ev-charging-asia.vercel.app', description: 'EV road trips & charging stations across Asia', badge: 'New' },
  { name: 'Luxury Family Travel Asia', href: 'https://luxury-family-travel-asia.vercel.app', description: 'Premium family getaways & 5-star resorts', badge: 'Luxury' },
  { name: 'Senior-Friendly Travel Asia', href: 'https://senior-friendly-travel-asia.vercel.app', description: 'Accessible travel for older adults' },
  { name: 'Kids Activities Asia', href: 'https://kids-activities-asia.vercel.app', description: 'Kid-friendly activities & destinations' },
  { name: 'Nudge', href: 'https://nudge-sigma-liart.vercel.app', description: 'Voice-powered family task management app' },
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
                    {site.badge && (
                      <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-light border border-accent/30">
                        {site.badge}
                      </span>
                    )}
                    <span className="text-sand-300 hidden sm:inline">—</span>
                    <span className="text-sand-200 hidden sm:inline">{site.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plan Your Trip — Monetization Bar */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-warm-white mb-3 text-center uppercase tracking-wider">Plan Your Trip</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <AffiliateLink href="https://www.booking.com" provider="booking.com">
              🏨 Hotels
            </AffiliateLink>
            <AffiliateLink href="https://www.klook.com" provider="klook">
              🎫 Activities
            </AffiliateLink>
            <AffiliateLink href="https://www.viator.com" provider="viator">
              🏛️ Tours
            </AffiliateLink>
            <AffiliateLink href="https://www.getyourguide.com" provider="getyourguide">
              🌟 Experiences
            </AffiliateLink>
            <AffiliateLink href="https://www.expedia.com" provider="expedia">
              🚗 Car Rental
            </AffiliateLink>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-6 text-center">
          <p className="text-[10px] text-sand-300">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            As a Klook, Booking.com, Viator, GetYourGuide, and Expedia partner, we may earn from qualifying bookings.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-sand-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
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
