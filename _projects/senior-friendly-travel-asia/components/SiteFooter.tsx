import Link from "next/link";

const sisterSites = [
  { name: "Family Travel Asia", url: "https://www.familytravelasia.com" },
  { name: "Luxury Family Travel Asia", url: "https://luxury-family-travel-asia.vercel.app" },
  { name: "EV Charging Asia", url: "https://ev-charging-asia.vercel.app" },
  { name: "Kids Activities Asia", url: "https://kids-activities-asia.vercel.app" },
  { name: "Apifeny AI", url: "https://apifeny-ai.vercel.app" },
  { name: "Social Beast", url: "https://social-beast.vercel.app" },
  { name: "Nudge", url: "https://nudge-sigma-liart.vercel.app" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-100 text-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* --- Cross-site monetization bar --- */}
        <div className="mb-10 pb-8 border-b border-gray-200">
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

        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-800">
              Senior-Friendly Travel Asia
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600 text-[15px]">
              Making Asian travel accessible, comfortable, and memorable for
              older adults. Curated destinations, mobility-friendly attractions,
              and practical advice for the modern senior explorer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-gray-600 transition hover:text-gray-900 focus:outline-none focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Our Network
            </h3>
            <ul className="mt-4 space-y-3">
              {sisterSites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] text-gray-600 transition hover:text-gray-900 focus:outline-none focus:underline"
                  >
                    {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate disclosure */}
        <div className="mt-10 rounded-md bg-gray-200/70 px-4 py-3 text-sm leading-relaxed text-gray-500">
          <strong className="font-medium text-gray-600">Affiliate Disclosure:</strong>{" "}
          Some links on this site are affiliate links. We may earn a commission at no extra cost to you.
          As a Klook, Booking.com, Viator, GetYourGuide, and Expedia partner we may earn from qualifying bookings.
          We only recommend services and products we genuinely believe add value for senior travelers.
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-500 sm:flex-row">
          <p>&copy; {year} Senior-Friendly Travel Asia. All rights reserved.</p>
          <Link
            href="/privacy"
            className="transition hover:text-gray-800 focus:outline-none focus:underline"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
