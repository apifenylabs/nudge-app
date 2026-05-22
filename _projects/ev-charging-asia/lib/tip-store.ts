/**
 * Shared in-memory tip and vote store.
 * In production, replace with a database (Supabase, Vercel KV, etc.)
 * For this project, persists per server process lifetime.
 */

export interface Tip {
  id: string;
  stationId: string;
  author: string;
  text: string;
  category: 'family' | 'luxury' | 'wellness' | 'charging' | 'general';
  rating?: number;
  createdAt: string;
  helpful: number;
  photoUrl?: string;
}

/**
 * Route-specific seed tips for social proof.
 * Each route slug gets 2-3 curated tips so no route page shows "No tips yet."
 * StationId format: "route-{slug}"
 */
const ROUTE_SEED_TIPS: Record<string, Tip[]> = {
  'bangkok-to-phuket-road-trip': [
    {
      id: 'seed-bkk-phuket-1',
      stationId: 'route-bangkok-to-phuket-road-trip',
      author: 'James W.',
      text: 'The Hua Hin stop is perfect for families. Banyan Tree has a dedicated EV charger, and the kids loved the beach. Drive is easy — all highway.',
      category: 'family',
      rating: 5,
      createdAt: '2025-11-10T08:30:00Z',
      helpful: 18,
    },
    {
      id: 'seed-bkk-phuket-2',
      stationId: 'route-bangkok-to-phuket-road-trip',
      author: 'Priya M.',
      text: 'Charged at the PTT station in Chumphon — 150kW, fast and convenient. Had lunch at the attached café. Very reliable infrastructure.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-10-22T14:15:00Z',
      helpful: 10,
    },
    {
      id: 'seed-bkk-phuket-3',
      stationId: 'route-bangkok-to-phuket-road-trip',
      author: 'Thomas K.',
      text: 'Booked the InterContinental in Chumphon with hotel EV charging. Valet parked the car to charge overnight — seamless luxury EV travel.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-09-05T09:45:00Z',
      helpful: 14,
    },
  ],
  'bangkok-to-chiang-mai-road-trip': [
    {
      id: 'seed-bkk-cnx-1',
      stationId: 'route-bangkok-to-chiang-mai-road-trip',
      author: 'Rachel D.',
      text: 'Stunning drive through the mountains. Charge fully in Lampang before heading up — the elevation really drains battery. Saw wild elephants near the road!',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-01T16:00:00Z',
      helpful: 25,
    },
    {
      id: 'seed-bkk-cnx-2',
      stationId: 'route-bangkok-to-chiang-mai-road-trip',
      author: 'Akira T.',
      text: 'EA Anywhere chargers along route 11 are reliable. Nakhon Sawan stop has a 350kW charger. Road is well-maintained but watch for fog in the mountains.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-14T11:20:00Z',
      helpful: 9,
    },
  ],
  'singapore-to-kuala-lumpur-road-trip': [
    {
      id: 'seed-sin-kul-1',
      stationId: 'route-singapore-to-kuala-lumpur-road-trip',
      author: 'Nina P.',
      text: 'Easiest cross-border EV trip in Asia. Shell Recharge card works on both sides. Melaka is the perfect lunch stop — Jonker Street has great food by the charger.',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-28T10:00:00Z',
      helpful: 30,
    },
    {
      id: 'seed-sin-kul-2',
      stationId: 'route-singapore-to-kuala-lumpur-road-trip',
      author: 'Hassan A.',
      text: 'The Tampines charger in Singapore is the most convenient departure point. Make sure you have Touch \'n Go for MY tolls. Hotel charging at St Regis KL is excellent.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-30T07:45:00Z',
      helpful: 16,
    },
  ],
  'kuala-lumpur-to-penang-road-trip': [
    {
      id: 'seed-kul-pen-1',
      stationId: 'route-kuala-lumpur-to-penang-road-trip',
      author: 'Mei L.',
      text: 'Ipoh is a must-stop! White coffee, cave temples, and a 200kW charger at the Kinta City mall. Penang bridge approach has traffic — plan arrival after 10am.',
      category: 'family',
      rating: 4,
      createdAt: '2025-10-18T13:30:00Z',
      helpful: 11,
    },
    {
      id: 'seed-kul-pen-2',
      stationId: 'route-kuala-lumpur-to-penang-road-trip',
      author: 'Chris B.',
      text: 'The Batu Ferringghi hotels in Penang mostly have EV charging now. The Shangri-La Rasa Sayang let us charge overnight. George Town food is world-class.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-09-20T18:00:00Z',
      helpful: 20,
    },
  ],
  'tokyo-to-kyoto-road-trip': [
    {
      id: 'seed-tky-kyo-1',
      stationId: 'route-tokyo-to-kyoto-road-trip',
      author: 'Yuki S.',
      text: 'Spring cherry blossoms from Hakone to Nagoya are unforgettable. Charge at Nissan dealerships in smaller towns — they welcome EVs. The Tomei Expressway has chargers every 40km.',
      category: 'family',
      rating: 5,
      createdAt: '2025-04-10T09:00:00Z',
      helpful: 35,
    },
    {
      id: 'seed-tky-kyo-2',
      stationId: 'route-tokyo-to-kyoto-road-trip',
      author: 'Michael R.',
      text: 'Hotel charging at the Ritz-Carlton Kyoto was effortless. The concierge moved the car to charge overnight. Japanese EV infrastructure is world-class — bring CCS2 to CHAdeMO adapter.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-11-05T15:30:00Z',
      helpful: 22,
    },
    {
      id: 'seed-tky-kyo-3',
      stationId: 'route-tokyo-to-kyoto-road-trip',
      author: 'Sarah K.',
      text: 'Fuji Speedway charging station is a unique stop! Kids loved seeing the race track. The Hakone ropeway was a perfect break from driving.',
      category: 'general',
      rating: 4,
      createdAt: '2025-08-15T11:45:00Z',
      helpful: 13,
    },
  ],
  'hong-kong-to-guangzhou-road-trip': [
    {
      id: 'seed-hkg-gz-1',
      stationId: 'route-hong-kong-to-guangzhou-road-trip',
      author: 'Wei C.',
      text: 'Crossing the Hong Kong-Zhuhai-Macau Bridge in an EV is incredible. Shenzhen has excellent charging — NIO battery swap stations everywhere. Guangzhou traffic is intense, charge before entering city center.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-10-30T08:00:00Z',
      helpful: 15,
    },
    {
      id: 'seed-hkg-gz-2',
      stationId: 'route-hong-kong-to-guangzhou-road-trip',
      author: 'Lisa T.',
      text: 'Chimelong Safari was the highlight for our 6-year-old. The Panda Hotel in Guangzhou has EV charging and is near the park. Perfect family weekend trip.',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-20T16:30:00Z',
      helpful: 19,
    },
  ],
  'bali-east-coast-road-trip': [
    {
      id: 'seed-bali-1',
      stationId: 'route-bali-east-coast-road-trip',
      author: 'Sophie L.',
      text: 'Bali\'s east coast is much quieter than the south. Goa Lawah Temple (Bat Cave) is fascinating for kids. Go-Ion chargers are mostly at malls — plan lunch stops accordingly.',
      category: 'family',
      rating: 4,
      createdAt: '2025-07-15T10:00:00Z',
      helpful: 14,
    },
    {
      id: 'seed-bali-2',
      stationId: 'route-bali-east-coast-road-trip',
      author: 'Arun N.',
      text: 'The Amankila in Manggis is pure luxury — private beach and they charge your EV overnight. Tirta Gangga Water Palace is stunning. Bring Type 2 cable for hotel charging.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-06-22T14:45:00Z',
      helpful: 27,
    },
  ],
  'hanoi-to-ha-long-bay-road-trip': [
    {
      id: 'seed-han-hlg-1',
      stationId: 'route-hanoi-to-ha-long-bay-road-trip',
      author: 'Tuan M.',
      text: 'New highway from Hanoi to Ha Long is excellent for EVs — smooth road, light traffic. Charge at VinFast station in Hai Duong. Ha Long Bay cruise is a bucket-list experience.',
      category: 'family',
      rating: 5,
      createdAt: '2025-11-25T09:30:00Z',
      helpful: 21,
    },
    {
      id: 'seed-han-hlg-2',
      stationId: 'route-hanoi-to-ha-long-bay-road-trip',
      author: 'Emma B.',
      text: 'Vinpearl Resort has EV charging and a massive water park — the kids refused to leave. The overnight cruise with the junk boat is unforgettable for all ages.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-10-08T11:15:00Z',
      helpful: 12,
    },
  ],
  'delhi-agra-jaipur-golden-triangle-road-trip': [
    {
      id: 'seed-del-agra-1',
      stationId: 'route-delhi-agra-jaipur-golden-triangle-road-trip',
      author: 'Raj P.',
      text: 'Tata Power chargers along the Yamuna Expressway are reliable. Sunrise at Taj Mahal is worth the early start — reach the gate by 6am. EV range drops with AC on full in Delhi heat.',
      category: 'family',
      rating: 4,
      createdAt: '2025-12-08T05:00:00Z',
      helpful: 17,
    },
    {
      id: 'seed-del-agra-2',
      stationId: 'route-delhi-agra-jaipur-golden-triangle-road-trip',
      author: 'Claire H.',
      text: 'The Oberoi Amarvilas is worth every penny — every room faces the Taj. They have EV charging and arranged a guide who kept our 8-year-old engaged with stories.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-11-18T20:00:00Z',
      helpful: 23,
    },
    {
      id: 'seed-del-agra-3',
      stationId: 'route-delhi-agra-jaipur-golden-triangle-road-trip',
      author: 'Kenji T.',
      text: 'Jaipur to Agra road has some rough patches near Dausa. Allow 4 hours for 230km. Fatehpur Sikri is a great mid-way stop — the kids loved the ghost city stories.',
      category: 'general',
      rating: 3,
      createdAt: '2025-09-12T15:30:00Z',
      helpful: 8,
    },
  ],
  'chiang-mai-to-pai-mae-hong-son-road-trip': [
    {
      id: 'seed-cnx-pai-1',
      stationId: 'route-chiang-mai-to-pai-mae-hong-son-road-trip',
      author: 'Mia J.',
      text: 'The 762 curves to Pai are no joke — even in an EV! But the scenery is breathtaking. Charge fully in Chiang Mai — Pai has limited charging. Bring a portable charger just in case.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-12-12T12:00:00Z',
      helpful: 28,
    },
    {
      id: 'seed-cnx-pai-2',
      stationId: 'route-chiang-mai-to-pai-mae-hong-son-road-trip',
      author: 'Dmitry K.',
      text: 'Tham Lod Cave was our family highlight — the bamboo raft through the cave is magical for kids. Pai Island Resort charged our car overnight from a wall outlet, no problem.',
      category: 'family',
      rating: 4,
      createdAt: '2025-11-05T10:30:00Z',
      helpful: 16,
    },
  ],
  'seoul-to-busan-road-trip': [
    {
      id: 'seed-sel-bus-1',
      stationId: 'route-seoul-to-busan-road-trip',
      author: 'Jin-Ho P.',
      text: 'Korea has the best EV infrastructure in Asia. Gyeongbu Expressway chargers at every rest stop — 350kW. Gyeongju historic area is perfect for an EV — compact city, easy charging.',
      category: 'charging',
      rating: 5,
      createdAt: '2025-10-15T08:00:00Z',
      helpful: 19,
    },
    {
      id: 'seed-sel-bus-2',
      stationId: 'route-seoul-to-busan-road-trip',
      author: 'Anna W.',
      text: 'Sejong Smart City is fascinating! Futuristic architecture and robot delivery vehicles. Our kids loved the AI playground. Paradise Hotel Busan has valet EV charging.',
      category: 'family',
      rating: 5,
      createdAt: '2025-09-30T17:00:00Z',
      helpful: 14,
    },
  ],
  'ho-chi-minh-to-da-nang-road-trip': [
    {
      id: 'seed-sgn-dad-1',
      stationId: 'route-ho-chi-minh-to-da-nang-road-trip',
      author: 'Quang T.',
      text: 'Nha Trang beach stop is perfect mid-point. VinFast chargers along Hwy 1 are growing fast. Da Nang\'s My Khe Beach is beautiful and has chargers at nearby resorts.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-20T14:00:00Z',
      helpful: 11,
    },
    {
      id: 'seed-sgn-dad-2',
      stationId: 'route-ho-chi-minh-to-da-nang-road-trip',
      author: 'Heather S.',
      text: 'Hoi An Ancient Town is magical at night with lanterns. The Four Seasons Nam Hai has EV charging and is between Da Nang and Hoi An. Perfect family luxury stop.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-10-10T20:30:00Z',
      helpful: 16,
    },
  ],
  'manila-to-batangas-road-trip': [
    {
      id: 'seed-mnl-bat-1',
      stationId: 'route-manila-to-batangas-road-trip',
      author: 'Carlos R.',
      text: 'Leave Manila before 6am to avoid traffic. SLEX to Batangas is smooth. Cleanfuel chargers in Lipa are reliable. Tagaytay ridge road is stunning in the morning.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-12-05T07:00:00Z',
      helpful: 13,
    },
    {
      id: 'seed-mnl-bat-2',
      stationId: 'route-manila-to-batangas-road-trip',
      author: 'Grace L.',
      text: 'Taal Volcano view from Tagaytay is unforgettable. The kids loved the Sky Ranch theme park. Hotel Kimberly in Tagaytay has EV charging and a kids\' club.',
      category: 'family',
      rating: 4,
      createdAt: '2025-11-22T16:30:00Z',
      helpful: 9,
    },
  ],
  'shanghai-to-hangzhou-road-trip': [
    {
      id: 'seed-sha-hgh-1',
      stationId: 'route-shanghai-to-hangzhou-road-trip',
      author: 'Wei Z.',
      text: 'NIO battery swap stations make this trip incredibly convenient — 3 minutes to swap. West Lake in Hangzhou is beautiful any season. The Four Seasons Hangzhou has EV valet parking.',
      category: 'charging',
      rating: 5,
      createdAt: '2025-10-28T10:00:00Z',
      helpful: 20,
    },
    {
      id: 'seed-sha-hgh-2',
      stationId: 'route-shanghai-to-hangzhou-road-trip',
      author: 'Katherine M.',
      text: 'Shanghai Disney was the main reason we took this trip. We charged at the Disney parking lot (many EV spots). Hangzhou\'s tea plantations are stunning — great family photo ops.',
      category: 'family',
      rating: 5,
      createdAt: '2025-09-15T11:45:00Z',
      helpful: 17,
    },
  ],
  'kuala-lumpur-to-singapore-road-trip': [
    {
      id: 'seed-kul-sin-1',
      stationId: 'route-kuala-lumpur-to-singapore-road-trip',
      author: 'Amir H.',
      text: 'Driving south from KL to Singapore via the PLUS highway is straightforward. Charge at Ayer Keroh (Melaka) — 200kW and right next to a food court.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-28T12:00:00Z',
      helpful: 14,
    },
  ],
  'bali-family-road-trip': [
    {
      id: 'seed-bali-family-1',
      stationId: 'route-bali-family-road-trip',
      author: 'Linda C.',
      text: 'Waterbom Bali on the last day is genius — the kids wear themselves out before the flight. The EV range in Bali traffic is better than expected because speeds are low.',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-30T09:00:00Z',
      helpful: 26,
    },
    {
      id: 'seed-bali-family-2',
      stationId: 'route-bali-family-road-trip',
      author: 'Marcus B.',
      text: 'Ubud Monkey Forest and rice terraces are must-sees. Go-Ion charger at Ubud Market works perfectly. Bring small change for temple donations and parking attendants.',
      category: 'general',
      rating: 4,
      createdAt: '2025-11-10T15:15:00Z',
      helpful: 15,
    },
    {
      id: 'seed-bali-family-3',
      stationId: 'route-bali-family-road-trip',
      author: 'Naomi S.',
      text: 'Six Senses Uluwatu is incredible for a family splurge — infinity pool, cooking class, EV charging. Book in advance, it fills up fast during peak season.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-10-05T19:00:00Z',
      helpful: 21,
    },
  ],
};

// Global store to survive module reloads — with augmented type
const globalForStore = globalThis as unknown as {
  __tipStoreData: Tip[];
  __tipVoteStore: Map<string, number>;
  __routeSeedsInitialized: boolean;
};

if (!globalForStore.__tipStoreData) {
  globalForStore.__tipStoreData = [
    {
      id: 'seed-1',
      stationId: 'bangkok-1',
      author: 'Sarah L.',
      text: 'Great for families — there\'s a playground right next to the charging area. Grab coffee at Starbucks while the kids play.',
      category: 'family',
      rating: 5,
      createdAt: '2025-12-15T10:30:00Z',
      helpful: 12,
    },
    {
      id: 'seed-2',
      stationId: 'bangkok-2',
      author: 'Mike C.',
      text: 'Very reliable 250kW charger. The mall has a food court with kid-friendly options on the 3rd floor.',
      category: 'charging',
      rating: 4,
      createdAt: '2025-11-20T08:15:00Z',
      helpful: 8,
    },
    {
      id: 'seed-3',
      stationId: 'singapore-1',
      author: 'Amanda K.',
      text: 'Luxury experience. The Conrad hotel valet parks and charges your EV. Perfect for a weekend getaway.',
      category: 'luxury',
      rating: 5,
      createdAt: '2025-10-05T14:00:00Z',
      helpful: 15,
    },
    {
      id: 'seed-4',
      stationId: 'kl-1',
      author: 'David T.',
      text: 'Easy to find, well-lit at night. Has a 7-Eleven next door for snacks. Toilets are clean.',
      category: 'wellness',
      rating: 4,
      createdAt: '2025-09-28T16:45:00Z',
      helpful: 6,
    },
    {
      id: 'seed-5',
      stationId: 'chiang-mai-1',
      author: 'Emily R.',
      text: 'Beautiful mountain drive to get here. Charger works perfectly. Try the nearby café for organic coffee.',
      category: 'wellness',
      rating: 5,
      createdAt: '2025-08-12T09:20:00Z',
      helpful: 22,
    },
  ];
}

if (!globalForStore.__tipVoteStore) {
  globalForStore.__tipVoteStore = new Map();
}

export function getTips(): Tip[] {
  return globalForStore.__tipStoreData;
}

export function getTipsByStation(stationId: string): Tip[] {
  return globalForStore.__tipStoreData
    .filter(t => t.stationId === stationId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getTipsByStationPaginated(stationId: string, page: number, pageSize: number = 5): { tips: Tip[]; total: number; hasMore: boolean } {
  const all = globalForStore.__tipStoreData
    .filter(t => t.stationId === stationId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  const total = all.length;
  const end = page * pageSize;
  const tips = all.slice(0, end);
  const hasMore = end < total;
  
  return { tips, total, hasMore };
}

export function addTip(tip: Omit<Tip, 'id' | 'createdAt' | 'helpful'> & { photoUrl?: string }): Tip {
  const newTip: Tip = {
    ...tip,
    id: `tip-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    helpful: 0,
  };
  globalForStore.__tipStoreData.push(newTip);
  return newTip;
}

// In-memory vote tracking (per server restart)
export function recordVote(voteKey: string): number {
  const current = globalForStore.__tipVoteStore.get(voteKey) || 0;
  globalForStore.__tipVoteStore.set(voteKey, current + 1);
  return current + 1;
}

export function getTipStats(tipId: string): { totalVotes: number } {
  let total = 0;
  for (const [key, count] of globalForStore.__tipVoteStore.entries()) {
    if (key.endsWith(`:${tipId}`)) {
      total += count;
    }
  }
  return { totalVotes: total };
}

// Initialize route-specific seed tips (one-time)
function initializeRouteSeeds() {
  if (globalForStore.__routeSeedsInitialized) return;
  
  for (const [, tips] of Object.entries(ROUTE_SEED_TIPS)) {
    for (const tip of tips) {
      const exists = globalForStore.__tipStoreData.some(t => t.id === tip.id);
      if (!exists) {
        globalForStore.__tipStoreData.push(tip);
      }
    }
  }
  globalForStore.__routeSeedsInitialized = true;
}

// Run initialization immediately
initializeRouteSeeds();
