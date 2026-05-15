import Link from "next/link";
import AffiliateLink from "./affiliate/AffiliateLink";

const sisterSites = [
  { name: "Asia Family Travel Directory", href: "https://www.familytravelasia.com", description: "Family-friendly destinations & tips across Asia" },
  { name: "Senior-Friendly Travel Asia", href: "https://senior-friendly-travel-asia.vercel.app", description: "Accessible travel for older adults" },
  { name: "EV Charging Asia", href: "https://ev-charging-asia.vercel.app", description: "EV charging station directory for Asia" },
  { name: "Apifeny AI", href: "https://apifeny-ai.vercel.app", description: "Curated AI tools & agents directory" },
  { name: "Nudge", href: "https://nudge-sigma-liart.vercel.app", description: "Voice-powered family task management app" },
  { name: "Kids Activities Asia", href: "https://kids-activities-asia.vercel.app", description: "Kid-friendly activities across Asia" },
  { name: "Social Beast", href: "https://social-beast-two.vercel.app", description: "AI-powered content creation suite" },
  { name: "Hike Japan", href: "https://hike-japan.vercel.app", description: "Hiking trails & outdoor adventures in Japan" },
  { name: "Dog-Friendly Japan", href: "https://dog-friendly-japan.vercel.app", description: "Pet-friendly destinations across Japan" },
  { name: "Japan Itineraries", href: "https://japan-itineraries.vercel.app", description: "Perfect Japan travel plans & day trips" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/search" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block bg-charcoal text-gray-300 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Top grid: brand, quick links, sister sites */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Brand column */}
          <div>
            <h3 className="font-serif text-xl text-gold mb-3 tracking-wide">
              Luxury Family Experiences Asia
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Curated premium family experiences across Asia. 5-star resorts, private villas,
              Michelin-star dining, and unforgettable adventures for discerning families.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base text-gold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sister sites */}
          <div>
            <h4 className="font-serif text-base text-gold mb-4 tracking-wide">Our Network</h4>
            <ul className="space-y-3">
              {sisterSites.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-sm text-gray-400 hover:text-gold transition-colors duration-200"
                  >
                    <span className="font-medium">{site.name}</span>
                    <span className="block text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                      {site.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Plan Your Trip — Monetization Bar */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-gold mb-3 text-center uppercase tracking-wider">Plan Your Trip</h4>
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />

        {/* Bottom row: copyright + legal links + AdSense credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} Luxury Family Travel Asia. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gold transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors duration-200">
              Terms of Service
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-600">
              Powered by{" "}
              <a
                href="https://apifeny-ai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-200"
              >
                Apifeny AI
              </a>
            </span>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mb-6 text-center">
          <p className="text-[10px] text-gray-500">
            Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
            As a Klook and Booking.com partner, we may earn from qualifying bookings.
          </p>
        </div>
      </div>
    </footer>
  );
}
