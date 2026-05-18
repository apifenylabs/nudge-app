/**
 * Affiliate Link Configuration for EV Charging Asia
 * 
 * All affiliate links are centralized here for easy maintenance.
 * Each link includes: id, name, url, type, countries, and optional commission note.
 * 
 * To update: just change the URLs here — all components reference these.
 */

export interface AffiliateLink {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'ev_rental' | 'hotel' | 'tour' | 'gear' | 'experience';
  tags: string[];
  countries: string[];
  commission?: string;
  badge?: string;
}

// --- Asia-specific affiliate links ---
// NOTE: Replace placeholder IDs with your actual affiliate IDs from each network.

const BOOKING_COM_AFFILIATE = 'https://www.booking.com/index.html?aid=2875669';
const KLOOK_AFFILIATE = 'https://affiliate.klook.com/redirect?aid=119991&aff_adid=';
const VIATOR_AFFILIATE = 'https://www.viator.com/?pid=P00299136';
const GETYOURGUIDE_AFFILIATE = 'https://www.getyourguide.com/?partner_id=JcqJY3NLQH4';
const AMAZON_AFFILIATE = 'https://www.amazon.com/?tag=familytravel0d-20';

export const affiliateLinks: AffiliateLink[] = [
  // --- Luxury EV Rentals ---
  {
    id: 'tesla-rental-thailand',
    name: 'Rent a Tesla in Thailand',
    description: 'Premium Tesla Model 3/Y rental in Bangkok, Phuket, Chiang Mai',
    url: `${KLOOK_AFFILIATE}tesla-rental-thailand`,
    type: 'ev_rental',
    tags: ['Tesla', 'rental', 'Thailand', 'luxury'],
    countries: ['Thailand'],
    badge: '🚗 Luxury EV Rental',
  },
  {
    id: 'ev-rental-singapore',
    name: 'Rent an EV in Singapore',
    description: 'Electric car rentals in Singapore — Tesla, Polestar, Hyundai',
    url: `${KLOOK_AFFILIATE}ev-rental-singapore`,
    type: 'ev_rental',
    tags: ['EV', 'rental', 'Singapore'],
    countries: ['Singapore'],
    badge: '🚗 EV Rental',
  },
  {
    id: 'ev-rental-malaysia',
    name: 'Rent an EV in Malaysia',
    description: 'EV car rentals available in KL, Penang, Johor Bahru',
    url: `${KLOOK_AFFILIATE}ev-rental-malaysia`,
    type: 'ev_rental',
    tags: ['EV', 'rental', 'Malaysia'],
    countries: ['Malaysia'],
    badge: '🚗 EV Rental',
  },
  {
    id: 'ev-rental-bali',
    name: 'Rent an EV Scooter/Car in Bali',
    description: 'Electric scooters and cars for rent in Bali, Indonesia',
    url: `${KLOOK_AFFILIATE}ev-rental-bali`,
    type: 'ev_rental',
    tags: ['EV', 'rental', 'Bali', 'Indonesia'],
    countries: ['Indonesia'],
    badge: '🛵 EV Rental',
  },
  {
    id: 'ev-rental-japan',
    name: 'Rent an EV in Japan',
    description: 'Electric car rental in Tokyo, Osaka, Kyoto with Nissan Sakura',
    url: `${KLOOK_AFFILIATE}ev-rental-japan`,
    type: 'ev_rental',
    tags: ['EV', 'rental', 'Japan'],
    countries: ['Japan'],
    badge: '🚗 EV Rental',
  },

  // --- Premium Hotels near EV routes ---
  {
    id: 'hotel-bangkok',
    name: 'Luxury Hotels Bangkok',
    description: 'Premium hotels with EV charging near Bangkok',
    url: `${BOOKING_COM_AFFILIATE}&city=4000100&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'luxury', 'Bangkok', 'Thailand'],
    countries: ['Thailand'],
    badge: '🏨 Premium Stay',
  },
  {
    id: 'hotel-phuket',
    name: 'Luxury Resorts Phuket',
    description: 'EV-friendly beachfront resorts in Phuket',
    url: `${BOOKING_COM_AFFILIATE}&city=4002283&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['resort', 'luxury', 'Phuket', 'Thailand'],
    countries: ['Thailand'],
    badge: '🏨 Beach Resort',
  },
  {
    id: 'hotel-chiang-mai',
    name: 'Boutique Stays Chiang Mai',
    description: 'Unique hotels with EV parking in Chiang Mai',
    url: `${BOOKING_COM_AFFILIATE}&city=4000948&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'boutique', 'Chiang Mai', 'Thailand'],
    countries: ['Thailand'],
    badge: '🏨 Boutique Stay',
  },
  {
    id: 'hotel-singapore',
    name: 'Luxury Hotels Singapore',
    description: 'Top-rated Singapore hotels near EV chargers',
    url: `${BOOKING_COM_AFFILIATE}&city=4006571&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'luxury', 'Singapore'],
    countries: ['Singapore'],
    badge: '🏨 5-Star Stay',
  },
  {
    id: 'hotel-kuala-lumpur',
    name: 'KL Luxury Hotels',
    description: 'Premium hotels in Kuala Lumpur with EV charging access',
    url: `${BOOKING_COM_AFFILIATE}&city=4002118&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'luxury', 'Kuala Lumpur', 'Malaysia'],
    countries: ['Malaysia'],
    badge: '🏨 Premium Stay',
  },
  {
    id: 'hotel-bali',
    name: 'Luxury Villas Bali',
    description: 'EV-friendly private villas and resorts in Bali',
    url: `${BOOKING_COM_AFFILIATE}&city=900047304&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['villa', 'luxury', 'Bali', 'Indonesia'],
    countries: ['Indonesia'],
    badge: '🌴 Villa Stay',
  },
  {
    id: 'hotel-tokyo',
    name: 'Luxury Hotels Tokyo',
    description: 'Top Tokyo hotels with EV charging facilities',
    url: `${BOOKING_COM_AFFILIATE}&city=4005195&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'luxury', 'Tokyo', 'Japan'],
    countries: ['Japan'],
    badge: '🏨 Luxury Stay',
  },
  {
    id: 'hotel-osaka',
    name: 'Hotels Osaka with EV',
    description: 'Convenient hotels near EV chargers in Osaka',
    url: `${BOOKING_COM_AFFILIATE}&city=4003483&nflt=ht_id%3D204&sb=1`,
    type: 'hotel',
    tags: ['hotel', 'Osaka', 'Japan'],
    countries: ['Japan'],
    badge: '🏨 City Stay',
  },

  // --- Guided Tours (Klook/Viator) ---
  {
    id: 'tour-bangkok',
    name: 'Bangkok Family Tours',
    description: 'Kid-friendly guided tours and activities in Bangkok',
    url: `${KLOOK_AFFILIATE}bangkok-family-tours`,
    type: 'tour',
    tags: ['family', 'tour', 'Bangkok', 'Thailand'],
    countries: ['Thailand'],
    badge: '👨‍👩‍👧‍👦 Family Tour',
  },
  {
    id: 'tour-chiang-mai',
    name: 'Chiang Mai Adventures',
    description: 'Elephant sanctuaries, cooking classes, zip-lining',
    url: `${KLOOK_AFFILIATE}chiang-mai-tours`,
    type: 'tour',
    tags: ['adventure', 'family', 'Chiang Mai', 'Thailand'],
    countries: ['Thailand'],
    badge: '🐘 Adventure',
  },
  {
    id: 'tour-singapore',
    name: 'Singapore Family Activities',
    description: 'Universal Studios, Gardens by the Bay, Night Safari',
    url: `${KLOOK_AFFILIATE}singapore-activities`,
    type: 'tour',
    tags: ['family', 'attractions', 'Singapore'],
    countries: ['Singapore'],
    badge: '🎡 Family Fun',
  },
  {
    id: 'tour-bali',
    name: 'Bali Family Tours',
    description: 'Temple tours, monkey forest, waterfall adventures',
    url: `${KLOOK_AFFILIATE}bali-family-tours`,
    type: 'tour',
    tags: ['family', 'tour', 'Bali', 'Indonesia'],
    countries: ['Indonesia'],
    badge: '🌊 Adventure',
  },
  {
    id: 'tour-japan',
    name: 'Japan Family Experiences',
    description: 'Disneyland, teamLab, samurai experiences',
    url: `${KLOOK_AFFILIATE}japan-family-tours`,
    type: 'tour',
    tags: ['family', 'Japan', 'Tokyo', 'Osaka'],
    countries: ['Japan'],
    badge: '🗾 Cultural',
  },

  // --- EV Road Trip Gear ---
  {
    id: 'portable-charger',
    name: 'Portable EV Charger',
    description: 'Level 1/2 portable EV charger for road trips — universal Type 2',
    url: `${AMAZON_AFFILIATE}portable-ev-charger-type2`,
    type: 'gear',
    tags: ['gear', 'charger', 'portable', 'road-trip'],
    countries: ['*'],
    badge: '🔌 Essential Gear',
  },
  {
    id: 'ev-adapter-kit',
    name: 'EV Adapter Kit Asia',
    description: 'CCS2 to CHAdeMO adapter, Type 2 to GB/T — essential for Asian road trips',
    url: `${AMAZON_AFFILIATE}ev-adapter-kit-asia`,
    type: 'gear',
    tags: ['gear', 'adapter', 'connector', 'road-trip'],
    countries: ['*'],
    badge: '🔌 Adapter Kit',
  },
  {
    id: 'ev-travel-case',
    name: 'EV Cable Travel Case',
    description: 'Premium organized storage for charging cables and adapters',
    url: `${AMAZON_AFFILIATE}ev-cable-travel-case`,
    type: 'gear',
    tags: ['gear', 'storage', 'travel'],
    countries: ['*'],
    badge: '🧳 Travel Gear',
  },

  // --- GetYourGuide Experiences ---
  {
    id: 'gyg-thailand',
    name: 'Thailand Experiences',
    description: 'Top-rated tours and activities across Thailand',
    url: `${GETYOURGUIDE_AFFILIATE}thailand`,
    type: 'experience',
    tags: ['experience', 'Thailand', 'family'],
    countries: ['Thailand'],
    badge: '🌟 Top Rated',
  },
  {
    id: 'gyg-singapore',
    name: 'Singapore Experiences',
    description: 'Best things to do in Singapore with family',
    url: `${GETYOURGUIDE_AFFILIATE}singapore`,
    type: 'experience',
    tags: ['experience', 'Singapore', 'family'],
    countries: ['Singapore'],
    badge: '🌟 Top Rated',
  },
  {
    id: 'gyg-japan',
    name: 'Japan Experiences',
    description: 'Unique Japanese experiences for EV road trippers',
    url: `${GETYOURGUIDE_AFFILIATE}japan`,
    type: 'experience',
    tags: ['experience', 'Japan', 'family'],
    countries: ['Japan'],
    badge: '🌟 Top Rated',
  },
  {
    id: 'gyg-bali',
    name: 'Bali Experiences',
    description: 'Bali tours and activities from Ubud to the coast',
    url: `${GETYOURGUIDE_AFFILIATE}bali`,
    type: 'experience',
    tags: ['experience', 'Bali', 'Indonesia', 'family'],
    countries: ['Indonesia'],
    badge: '🌟 Top Rated',
  },
];

/**
 * Get affiliate links relevant to a specific station/city/country.
 */
export function getAffiliatesForLocation(country?: string, city?: string, type?: string): AffiliateLink[] {
  let matches = affiliateLinks.filter(link => {
    const countryMatch = !country || link.countries.includes('*') || link.countries.includes(country);
    if (!countryMatch) return false;
    if (type && link.type !== type) return false;
    return true;
  });
  // Prioritize city-specific links
  if (city) {
    const cityLinks = matches.filter(l => l.tags.some(t => t.toLowerCase() === city.toLowerCase()));
    const genericLinks = matches.filter(l => !l.tags.some(t => t.toLowerCase() === city.toLowerCase()));
    matches = [...cityLinks, ...genericLinks];
  }
  return matches;
}

/**
 * Get charging cost comparison data per country (for price comparison widget).
 * Sources: Public data from EV databases, government sources, and charger network pricing.
 */
export interface ChargingCostData {
  country: string;
  currency: string;
  symbol: string;
  costPerKwh: number;  // Average USD/kWh
  costRange: [number, number]; // [min, max] USD/kWh
  slowAC: number;      // USD/kWh for <22kW
  fastDC: number;      // USD/kWh for 50-150kW
  ultraFast: number;   // USD/kWh for 150kW+
  source: string;
  updated: string;
}

export const chargingCosts: ChargingCostData[] = [
  {
    country: 'Thailand',
    currency: 'THB',
    symbol: '฿',
    costPerKwh: 0.15,
    costRange: [0.10, 0.20],
    slowAC: 0.12,
    fastDC: 0.15,
    ultraFast: 0.18,
    source: 'MEA/PEA EV rates',
    updated: '2026-03',
  },
  {
    country: 'Singapore',
    currency: 'SGD',
    symbol: 'S$',
    costPerKwh: 0.29,
    costRange: [0.22, 0.38],
    slowAC: 0.25,
    fastDC: 0.29,
    ultraFast: 0.35,
    source: 'SP Group, Shell Recharge',
    updated: '2026-03',
  },
  {
    country: 'Malaysia',
    currency: 'MYR',
    symbol: 'RM',
    costPerKwh: 0.12,
    costRange: [0.08, 0.18],
    slowAC: 0.10,
    fastDC: 0.12,
    ultraFast: 0.16,
    source: 'TNB, Gentari, ChargeSini',
    updated: '2026-03',
  },
  {
    country: 'Japan',
    currency: 'JPY',
    symbol: '¥',
    costPerKwh: 0.22,
    costRange: [0.15, 0.30],
    slowAC: 0.18,
    fastDC: 0.22,
    ultraFast: 0.28,
    source: 'TEPCO, e-Mobility Power',
    updated: '2026-03',
  },
  {
    country: 'Indonesia',
    currency: 'IDR',
    symbol: 'Rp',
    costPerKwh: 0.10,
    costRange: [0.07, 0.15],
    slowAC: 0.08,
    fastDC: 0.10,
    ultraFast: 0.14,
    source: 'PLN, Ion',
    updated: '2026-03',
  },
  {
    country: 'India',
    currency: 'INR',
    symbol: '₹',
    costPerKwh: 0.14,
    costRange: [0.08, 0.20],
    slowAC: 0.10,
    fastDC: 0.14,
    ultraFast: 0.18,
    source: 'Tata Power, EESL, ChargeZone',
    updated: '2026-03',
  },
  {
    country: 'China',
    currency: 'CNY',
    symbol: '¥',
    costPerKwh: 0.08,
    costRange: [0.05, 0.12],
    slowAC: 0.06,
    fastDC: 0.08,
    ultraFast: 0.11,
    source: 'State Grid, Teld, Star Charge',
    updated: '2026-03',
  },
];

export function getChargingCost(country: string): ChargingCostData | null {
  return chargingCosts.find(c => c.country === country) || null;
}
