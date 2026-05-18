import { Metadata } from 'next';
import Link from 'next/link';
import { Crown, Star, MapPin, Users, Award, ChevronRight } from 'lucide-react';
import { allDestinations, type Destination } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Top 10 Luxury Family Resorts in Asia | Editorially Curated',
  description: 'Our definitive ranking of the 10 best luxury family resorts in Asia. From Amanpuri to Mandarin Oriental, discover truly exceptional experiences for discerning families.',
  openGraph: {
    title: 'Top 10 Luxury Family Resorts in Asia | Editorially Curated',
    description: 'The definitive list of Asia\'s most extraordinary family resorts, ranked by our editors.',
    images: ['/og'],
  },
};

function getImageUrlFromData(d: Destination): string | null {
  // Try structured image paths first, then fall back to destination imageUrl
  if (d.gallery && d.gallery.length > 0) return d.gallery[0];
  if (d.imageUrl) return d.imageUrl;
  return null;
}

const curatedReview = (dest: Destination): string => {
  const reviews: Record<string, string> = {
    'phuket-001': 'Amanpuri is where the Aman legend began — and it remains the benchmark for barefoot luxury. Set on a private peninsula on Phuket\'s west coast, this 40-acre estate offers Thai-inspired pavilions, a pristine beach, and the kind of service that anticipates every need before you voice it. Families rave about the Kids\' Club, the world-class spa, and the sense of absolute privacy that lets you truly disconnect.',
    'tokyo-001': 'Aman Tokyo occupies the top six floors of the Otemachi Tower, offering unparalleled views of the Imperial Palace gardens and Mount Fuji on clear days. The 34-meter indoor pool is a serene masterpiece, and the suite design — all washi paper, Japanese cedar, and stone — creates a tranquil urban sanctuary. Children are welcomed with custom amenities and the concierge can arrange private sumo viewing or sushi masterclasses for the family.',
    'maldives-001': 'Soneva Fushi is the ultimate family fantasy island. Kids love the waterslides, the chocolate room, and the observatory. Parents love the spacious villas, the bespoke butler service, and the knowledge that this was one of the first luxury resorts to truly embrace sustainability. The island\'s "no shoes, no news" philosophy sets the tone for a vacation where time slows down and every moment feels like an adventure.',
    'maldives-002': 'Velaa Private Island is Maldives at its most exclusive. With just 47 villas, a private submarine, and a dedicated yacht, this is the choice for families who value absolute privacy. The children\'s club is exceptional, with programmes in marine biology and Maldivian culture, while parents can enjoy Asia\'s most comprehensive wine cellar and a spa that seems to float above the lagoon.',
    'kyoto-001': 'Aman Kyoto is a masterpiece of landscape and light. Set within a 32-acre moss garden that was once a textile research facility, the 26 guest pavilions are a study in understated elegance. The location offers direct access to the Kinkaku-ji Temple and the city\'s finest cultural experiences. Families will treasure the private garden strolls, tea ceremonies, and the profound sense of peace that this extraordinary property provides.',
    'bali-001': 'Four Seasons Sayan is Bali\'s most romantic family resort. Hidden in the Ayung River valley and accessed by a dramatic suspension bridge, the resort\'s signature rice-terrace architecture creates a connection to Bali\'s spiritual heart. The Kids\' Club introduces Balinese dance and offering-making, while the river-view infinity pool and spa treatments offer parents their own slice of paradise.',
    'hongkong-002': 'Perched in the International Finance Centre, Four Seasons Hong Kong offers a rare combination: city convenience and resort-like tranquility. The infinity pool with Victoria Harbour views is unforgettable, the two-Michelin-star Lung King Heen serves the finest dim sum in the city, and the spa is a haven of calm. Families love the connecting suites and the concierge\'s ability to arrange helicopter tours over the skyline.',
    'palawan-001': 'Amanpulo is the ultimate castaway fantasy made real. Pamalican Island in Palawan offers powdery white sand, a coral reef teeming with marine life, and casita-style villas that blend seamlessly into the landscape. The entire resort feels like your private island — because it almost is. Families can customise every moment, from private beach dinners to guided reef snorkelling with the resident marine biologist.',
    'phuket-002': 'Trisara — meaning "the garden in the third heaven" — lives up to its name. Overlooking a serene bay in northwest Phuket, the resort\'s private-pool villas are among the most generous in Asia. Pru, its Michelin-starred restaurant, offers a farm-to-table journey, and the spa\'s Ayurvedic treatments are legendary. The weekly sundowner cocktail party is the social highlight of the season.',
    'hongkong-001': 'Mandarin Oriental Hong Kong has been a harbour icon since 1963, and it continues to set the standard for luxury hospitality. The recently renovated suites blend heritage and contemporary design, the Michelin-starred restaurants (including the legendary Mandarin Grill) are superb, and the spa is the city\'s finest. Children receive VIP treatment from check-in, and the central location makes exploring Hong Kong effortless.',
  };
  return reviews[dest.id] || `Experience the unparalleled luxury of ${dest.name}, where every detail has been curated for families who value the extraordinary. From world-class dining to exceptional service, this destination offers the perfect setting for unforgettable family memories.`;
};

const bestTimeMap: Record<string, string> = {
  'Apr-Oct': 'April to October offers the perfect balance of sunshine and comfortable temperatures. Peak season runs July-August, so book early for the best villas.',
  'Nov-Feb': 'November to February brings cooler, drier weather — ideal for exploration and outdoor activities. This is the high season, so premium suites command top prices.',
  'Mar-Sep': 'March to September sees minimal rainfall and abundant sunshine. Shoulder months (March-April and September) offer the best value without compromising weather.',
};

export default function Top10Page() {
  const scored = allDestinations.map(d => {
    const score = (d.popularity || 0) * 0.6 + (d.safetyRating || 0) * 20 * 0.4;
    return { ...d, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top10 = scored.slice(0, 10);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Editorial Header */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-medium mb-6">
            <Crown size={14} />
            Editor&apos;s Choice
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Top 10 Luxury Family Resorts in Asia
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            After visiting hundreds of properties across Asia, our editors have curated the definitive list of the continent&apos;s most extraordinary family experiences. These are the resorts that redefine luxury travel with children.
          </p>
          <div className="flex items-center justify-center gap-6 text-white/50 text-xs uppercase tracking-widest">
            <span>10 Properties</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>6 Countries</span>
            <span className="w-1 h-1 rounded-full bg-gold/50" />
            <span>Editor Approved</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gold/10">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            <span className="text-gold-dark font-bold text-xl">&ldquo;</span>
            The best luxury family resorts in Asia don&apos;t just accommodate children — they celebrate them. From private island sanctuaries where every villa has its own waterslide to urban retreats with Michelin-star dining for all ages, these ten properties set the gold standard for family travel in the region.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our editors consider five key criteria: <strong>kid-centric luxury</strong> (does the resort truly cater to children without compromising the adult experience?), <strong>privacy and safety</strong> (can families relax without worry?), <strong>dining excellence</strong> (is the food exceptional for all ages?), <strong>unique experiences</strong> (are there moments you can&apos;t find anywhere else?), and <strong>service standards</strong> (does the staff anticipate every family need?).
          </p>
          <p className="text-gray-600 leading-relaxed">
            Prices listed are for peak-season family suites or villas. Many of these properties offer significant savings during shoulder season — we&apos;ve noted the best times to visit for both weather and value.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3 text-sm text-gray-500">
            <Award size={18} className="text-gold" />
            Last updated: March 2026
          </div>
        </div>
      </section>

      {/* Top 10 List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-10">
          {top10.map((dest, index) => {
            const heroUrl = getImageUrlFromData(dest);
            return (
              <article
                key={dest.id}
                id={dest.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 border border-gold/10 hover:border-gold/30 ${index === 0 ? 'ring-2 ring-gold/30' : ''}`}
              >
                {/* Rank + Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  {/* Rank Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                      index === 0
                        ? 'bg-gold text-navy'
                        : index <= 3
                          ? 'bg-navy text-gold'
                          : 'bg-white/90 backdrop-blur-sm text-navy'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                  {/* Image */}
                  {heroUrl ? (
                    <img
                      src={heroUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center">
                      <Crown size={48} className="text-gold/30" />
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{dest.name}</h2>
                    <p className="text-white/80 text-sm flex items-center gap-1.5 mt-1">
                      <MapPin size={14} />
                      {dest.location || `${dest.city}, ${dest.country}`}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-5 text-xs text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-gold" />
                      Safety: {dest.safetyRating}/5
                    </span>
                    <span>{dest.priceRange}</span>
                    <span>Ages: {dest.ageRange}</span>
                    <span>Best: {dest.bestTime}</span>
                  </div>

                  {/* Editorial Review */}
                  <div className="prose prose-gray max-w-none mb-5">
                    <p className="text-gray-700 leading-relaxed italic text-base">
                      {curatedReview(dest)}
                    </p>
                  </div>

                  {/* Best Time */}
                  <div className="bg-cream rounded-xl p-4 mb-5 border border-gold/10">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-charcoal-dark">Best Time to Visit:</span>{' '}
                      {bestTimeMap[dest.bestTime] || `${dest.bestTime} — the ideal window for family travel to this destination.`}
                    </p>
                  </div>

                  {/* Insider Tips */}
                  {dest.tipsAndTricks && dest.tipsAndTricks.length > 0 && (
                    <div className="mb-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-dark mb-2">
                        Insider Tips
                      </h3>
                      <ul className="space-y-1.5">
                        {dest.tipsAndTricks.slice(0, 3).map((tip, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="text-gold mt-0.5">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Amenities */}
                  {dest.amenities && dest.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {dest.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold-dark border border-gold/20">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/destination/${dest.slug || dest.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-lg text-sm font-medium hover:bg-navy-light transition-all shadow-sm group/link"
                  >
                    View Full Review
                    <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-navy via-navy-dark to-navy rounded-2xl p-8 md:p-12 border border-gold/20">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready for the Trip of a Lifetime?
            </h2>
            <p className="text-white/70 text-base mb-6 max-w-lg mx-auto">
              Explore all 50+ luxury family destinations across Asia. Each one is curated by our editors.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-all"
            >
              Browse All Destinations
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
