/**
 * Premium Route Products — PDF download routes available via Stripe Checkout
 *
 * Each premium route offers a detailed PDF guide with:
 * - Full day-by-day itinerary with turn-by-turn directions
 * - Curated charging stop recommendations with specific station names & tips
 * - Restaurant and hotel recommendations with booking links
 * - Offline maps and printable checklists
 * - Family activity suggestions with admission prices & hours
 * - Local SIM / navigation app recommendations
 * - Emergency contact numbers for roadside EV assistance
 */

export interface PremiumRoute {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  currency: string;
  pages: number;
  countries: string[];
  tags: string[];
  coverImage?: string;
  stripePriceId?: string; // optional: Stripe Price ID for recurring use
}

export const premiumRoutes: PremiumRoute[] = [
  {
    id: 'prem-bkk-phuket',
    slug: 'premium-bangkok-to-phuket',
    title: 'Bangkok → Phuket EV Road Trip Premium Guide',
    subtitle: 'The Ultimate Thailand EV Road Trip — 850 km of tropical coastline, luxury resorts & family fun',
    description:
      'Our most popular route, now in premium format. This 45-page PDF guide includes turn-by-turn directions optimized for EVs, every charging station between Bangkok and Phuket with live-updated status tips, 15+ family-friendly activities with admission prices, luxury hotel recommendations with EV-charging verified, and emergency contacts for PTT EV roadside assistance.',
    price: 4.99,
    currency: 'USD',
    pages: 45,
    countries: ['Thailand'],
    tags: ['thailand', 'beach', 'family', 'luxury', 'bangkok', 'phuket'],
  },
  {
    id: 'prem-sg-kl',
    slug: 'premium-singapore-to-kuala-lumpur',
    title: 'Singapore → Kuala Lumpur EV Express Premium Guide',
    subtitle: 'Cross-Border EV Luxury Express — 350 km, 2 countries, 1 unforgettable trip',
    description:
      'The definitive cross-border EV route guide. This 38-page PDF covers both Singapore and Malaysia EV charging networks (SP Group, Charge+, Gentari, Tenaga Nasional), border crossing procedures for EVs, customs paperwork checklist, verified EV-friendly hotels in KL, and the best durian stops along the North-South Expressway.',
    price: 4.99,
    currency: 'USD',
    pages: 38,
    countries: ['Singapore', 'Malaysia'],
    tags: ['singapore', 'malaysia', 'cross-border', 'express', 'family', 'luxury'],
  },
  {
    id: 'prem-bali-loop',
    slug: 'premium-bali-ev-loop',
    title: 'Bali EV Loop Premium Guide',
    subtitle: 'The Complete Bali EV Adventure — Temples, rice terraces & surf beaches by electric car',
    description:
      'Navigate Bali\'s narrow roads and limited charging infrastructure with confidence. This 42-page PDF features every public charging station on the island (including hidden hotel chargers open to non-guests), scenic driving routes through Ubud rice terraces, best family villas with EV charging, and a complete guide to Bali\'s EV rental companies.',
    price: 4.99,
    currency: 'USD',
    pages: 42,
    countries: ['Indonesia'],
    tags: ['indonesia', 'bali', 'island', 'tropical', 'family', 'luxury', 'beach'],
  },
  {
    id: 'prem-hk-macau',
    slug: 'premium-hong-kong-to-macau',
    title: 'Hong Kong → Macau EV Road Trip Premium Guide',
    subtitle: 'Hong Kong to Macau via the Hong Kong-Zhuhai-Macao Bridge — Asia\'s most spectacular EV crossing',
    description:
      'Drive the world\'s longest sea-crossing bridge in your EV. This 35-page PDF guide covers charging stations across Hong Kong, the bridge EV policies, Macau\'s unique charging network, best dim sum routes, luxury casino hotels with EV charging, and cross-border insurance requirements.',
    price: 4.99,
    currency: 'USD',
    pages: 35,
    countries: ['Hong Kong', 'Macau', 'China'],
    tags: ['hong-kong', 'macau', 'china', 'bridge', 'luxury', 'city'],
  },
  {
    id: 'prem-osaka-tokyo',
    slug: 'premium-osaka-to-tokyo',
    title: 'Osaka → Tokyo EV Road Trip Premium Guide',
    subtitle: 'Japan\'s Golden Route by EV — Mt. Fuji views, hot springs & bullet-train-speed charging',
    description:
      'Conquer Japan\'s Tōmei Expressway in an EV. This 50-page PDF covers CHAdeMO charging network etiquette, Japan EV rental guide (Nissan Sakura, Toyota bZ4X), every NEXCO rest area with quick-chargers, onsen towns accessible by EV, and Japanese EV driving laws foreign visitors must know.',
    price: 5.99,
    currency: 'USD',
    pages: 50,
    countries: ['Japan'],
    tags: ['japan', 'osaka', 'tokyo', 'mount-fuji', 'onsen', 'luxury', 'family'],
  },
  {
    id: 'prem-delhi-jaipur',
    slug: 'premium-delhi-to-jaipur',
    title: 'Delhi → Jaipur → Agra EV Golden Triangle Premium Guide',
    subtitle: 'India\'s Most Iconic Route by EV — Taj Mahal, Pink City & Mughal history',
    description:
      'Navigate India\'s rapidly growing EV charging network across the Golden Triangle. This 44-page PDF includes all operational charging stations on the Delhi-Jaipur-Agra highway, hotel EV charging verification for 20+ properties, toll road EV policies, best family-friendly attractions with EV parking, and emergency numbers for Tata Power EZ and Statiq networks.',
    price: 4.99,
    currency: 'USD',
    pages: 44,
    countries: ['India'],
    tags: ['india', 'delhi', 'jaipur', 'agra', 'golden-triangle', 'heritage', 'family'],
  },
];

export function getPremiumRouteBySlug(slug: string): PremiumRoute | undefined {
  return premiumRoutes.find(r => r.slug === slug);
}

export function getAllPremiumRoutes(): PremiumRoute[] {
  return premiumRoutes;
}

export function getPremiumRoutesByCountry(country: string): PremiumRoute[] {
  return premiumRoutes.filter(r =>
    r.countries.some(c => c.toLowerCase() === country.toLowerCase())
  );
}
