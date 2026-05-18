import Link from "next/link";
import { Heart, MapPin, Star, ChevronRight, Accessibility } from "lucide-react";

// Placeholder data — will be moved to data/ and expanded
const FEATURED_DESTINATIONS = [
  { name: "Singapore", slug: "singapore", tagline: "World-class accessibility & efficiency", score: 9.2, destinations: 12, image: "/placeholder-singapore.jpg" },
  { name: "Kyoto", slug: "kyoto", tagline: "Temple gardens & wheelchair-friendly paths", score: 8.7, destinations: 10, image: "/placeholder-kyoto.jpg" },
  { name: "Chiang Mai", slug: "chiang-mai", tagline: "Slow-paced Northern Thai charm", score: 8.5, destinations: 8, image: "/placeholder-chiang-mai.jpg" },
  { name: "Hong Kong", slug: "hong-kong", tagline: "Efficient MTR & senior discounts", score: 8.8, destinations: 11, image: "/placeholder-hong-kong.jpg" },
  { name: "Taipei", slug: "taipei", tagline: "Clean, safe & easy to navigate", score: 8.9, destinations: 9, image: "/placeholder-taipei.jpg" },
  { name: "Penang", slug: "penang", tagline: "Heritage strolls & affordable luxury", score: 8.3, destinations: 7, image: "/placeholder-penang.jpg" },
];

const ACCESSIBILITY_FEATURES = [
  { icon: "🚇", title: "Accessible Transit", description: "Elevators, ramps, priority seating in every city" },
  { icon: "🏥", title: "Healthcare Access", description: "English-speaking clinics & hospitals nearby" },
  { icon: "♿", title: "Mobility Friendly", description: "Wheelchair ramps, flat walkways, senior taxis" },
  { icon: "🍜", title: "Dietary Options", description: "Vegetarian, low-sodium & soft-food friendly" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is Asia safe for senior solo travelers?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Singapore, Japan, Taiwan, and South Korea consistently rank among the safest destinations for seniors. We rate each destination on safety, healthcare access, and mobility friendliness." }
              },
              {
                "@type": "Question",
                "name": "What accessibility features should I look for?",
                "acceptedAnswer": { "@type": "Answer", "text": "Look for wheelchair-accessible MRT stations, priority seating on public transport, elevators at tourist sites, English-speaking medical facilities, and flat walking paths." }
              },
              {
                "@type": "Question",
                "name": "Do Asian cities have senior discounts?",
                "acceptedAnswer": { "@type": "Answer", "text": "Many — Japan offers senior discounts at temples and museums, Singapore has senior-rate MRT cards, and Hong Kong's MTR provides half-fare for seniors 65+." }
              },
              {
                "@type": "Question",
                "name": "Which Asian city has the best healthcare for visiting seniors?",
                "acceptedAnswer": { "@type": "Answer", "text": "Singapore, Tokyo, and Hong Kong boast world-class hospitals with English-speaking staff, short wait times, and easy access from most tourist areas." }
              }
            ]
          })
        }}
      />
      <main>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-300 via-transparent to-transparent animate-gradient-shift" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="flex items-center gap-2 text-teal-200 text-sm mb-4">
            <Accessibility className="w-5 h-5" />
            <span className="tracking-wider uppercase font-medium">Senior-Friendly Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-4">
            Explore Asia<br />
            <span className="text-teal-300">At Your Own Pace</span>
          </h1>
          <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mb-8 leading-relaxed">
            Curated destinations across Asia with accessible transport, senior-friendly attractions, 
            and practical tips for the 60+ traveler. No rushed itineraries. No hidden stairs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 bg-white text-teal-900 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Destinations
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              How It Works
            </Link>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-12 bg-gray-50 rounded-t-[2rem]" />
      </section>

      {/* Accessibility Features Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ACCESSIBILITY_FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Destinations</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Senior-Friendly Cities</h2>
          </div>
          <Link
            href="/destinations"
            className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_DESTINATIONS.map((dest) => (
            <Link
              key={dest.slug}
              href={`/destinations/${dest.slug}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="h-40 bg-gradient-to-br from-teal-100 to-navy-100 flex items-center justify-center text-4xl">
                🌏
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors">
                    {dest.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full text-sm font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {dest.score}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{dest.tagline}</p>
                <div className="flex items-center text-gray-400 text-xs gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{dest.destinations} senior-friendly spots</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Seniors Love Asia */}
      <section className="bg-teal-50 border-t border-teal-100">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Why Asia?</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1 mb-4">
              Designed for comfort, built for discovery
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Asia offers some of the world's most senior-friendly travel infrastructure. 
              From Singapore's spotless MRT with priority seating to Japan's omotenashi culture 
              of attentive service, the continent is increasingly accessible for older adults. 
              We curate only the destinations that meet our strict accessibility, safety, and 
              comfort standards — so you can explore without worry.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-teal-700 to-navy-800 rounded-3xl p-8 sm:p-12 text-white text-center">
          <Heart className="w-10 h-10 mx-auto mb-4 text-teal-300" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Know a great senior-friendly spot?</h2>
          <p className="text-teal-100 max-w-lg mx-auto mb-6">
            We're building this directory together. Share your experience and help other seniors 
            discover the best of Asia.
          </p>
          <Link
            href="/suggest"
            className="inline-flex items-center gap-2 bg-white text-teal-900 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-all shadow-lg"
          >
            Suggest a Destination
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Senior-Friendly Travel Asia. Built with ❤️ for the 60+ traveler.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
