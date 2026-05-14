// Blog data — loaded from data/blog/*.json files

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  imageUrl?: string;
}

// Import blog post JSON files
import beaches from '@/data/blog/senior-friendly-beaches-southeast-asia.json';
import hotels from '@/data/blog/senior-friendly-hotel-chains-asia.json';
import temples from '@/data/blog/temple-etiquette-seniors-asia.json';
import weather from '@/data/blog/best-time-visit-asia-senior-travelers.json';
import tours from '@/data/blog/group-tours-vs-independent-seniors-asia.json';
import slowTravel from '@/data/blog/slow-travel-southeast-asia-seniors.json';
import foodTours from '@/data/blog/senior-friendly-food-tours-asia.json';
import connected from '@/data/blog/stay-connected-abroad-seniors-asia.json';
import budget from '@/data/blog/senior-budget-travel-asia.json';
import nature from '@/data/blog/accessible-nature-experiences-asia-seniors.json';
import wellness from '@/data/blog/senior-wellness-retreats-thailand-bali.json';
import guidedVsSelf from '@/data/blog/guided-vs-self-guided-tours-seniors-asia.json';
import riverCruises from '@/data/blog/best-river-cruises-seniors-asia.json';
import safetyTips from '@/data/blog/senior-travel-safety-tips-asia.json';
import photography from '@/data/blog/photography-tours-seniors-asia.json';
import japanHotels from '@/data/blog/senior-friendly-hotel-chains-japan.json';
import volunteering from '@/data/blog/volunteering-cultural-immersion-seniors-asia.json';
import airports from '@/data/blog/navigating-asian-airports-immigration-seniors.json';
import soloTravel from '@/data/blog/solo-senior-travel-asia-best-destinations.json';
import cuisineTips from '@/data/blog/cuisine-dietary-tips-senior-travelers-asia.json';

// Existing inline posts
const existingPosts: BlogPost[] = [
  {
    slug: 'best-cities-senior-travel-asia',
    title: '10 Best Cities in Asia for Senior Travelers in 2026',
    excerpt: 'Our curated ranking of the most accessible, senior-friendly cities across Asia. From Singapore\'s spotless MRT to Tokyo\'s omotenashi, find your perfect destination.',
    content: `Asia offers some of the world's most senior-friendly travel infrastructure. From Singapore's spotless MRT with elevators at every station to Japan's omotenashi culture of attentive service, the continent is increasingly accessible for older adults.\n\n## Our Top 10 Cities\n\n**1. Singapore** — Score: 9.2/10\nWorld-class accessibility with English signage throughout, elevators at every MRT station, and excellent healthcare. The city is spotless, safe, and easy to navigate.\n\n**2. Taipei** — Score: 8.9/10\nTaipei offers the most generous senior benefits in Asia. Citizens 65+ ride the MRT for free, and foreign seniors can access many of the same discounts at museums and attractions.\n\n**3. Hong Kong** — Score: 8.8/10\nEfficient MTR system with wheelchair access, excellent English-speaking healthcare, and the Octopus card makes everything easy. The Star Ferry is a gentle, scenic ride.\n\n**4. Kyoto** — Score: 8.7/10\nTemple gardens with flat paths, excellent public transport, and a pace of life that suits slow travel. Many temples have wheelchair access and senior discounts.\n\n**5. Tokyo** — Score: 8.6/10\nImpeccable public transport with priority seating, English signage on major lines, and incredible healthcare. The city is safe at all hours.\n\n**6. Chiang Mai** — Score: 8.5/10\nSlow-paced Northern Thai city with affordable living, excellent healthcare, and beautiful temple complexes with flat walkways. Digital nomad infrastructure benefits seniors too.\n\n**7. Bangkok** — Score: 8.0/10\nWorld-class medical tourism, affordable luxury, and the BTS Skytrain has elevators at most stations. Amazing food scene with senior-friendly options.\n\n**8. Seoul** — Score: 7.9/10\nExcellent subway system with accessibility features, great healthcare, and a safe city. Seoul Grand Park and the Han River parks are very accessible.\n\n**9. Kuala Lumpur** — Score: 7.7/10\nEnglish widely spoken, free city buses (Go KL), modern MRT with elevators, and very affordable luxury hotels and dining. Amazing multicultural food scene.\n\n**10. Penang** — Score: 7.4/10\nHeritage architecture, slow pace, excellent street food, and affordable accommodation. George Town is walkable and flat in many areas.\n\n## What Makes a City Senior-Friendly?\n\nWe evaluate destinations on five key criteria:\n- **Accessibility**: Public transit, wheelchair access, smooth pavements\n- **Healthcare**: English-speaking hospitals, pharmacy access\n- **Safety**: Low crime rates, well-lit streets\n- **Pace**: Opportunities for slow travel, rest spots\n- **Value**: Senior discounts, affordable luxury`,
    date: '2026-05-10',
    author: 'Senior-Friendly Travel Asia Team',
    readingTime: '8 min read',
    tags: ['city-guides', 'top-10', 'planning', 'accommodation', 'transport'],
  },
  {
    slug: 'accessible-transport-asia-seniors',
    title: 'Complete Guide to Accessible Transport in Asia for Seniors',
    excerpt: 'From Singapore\'s MRT to Tokyo\'s trains — a practical guide to getting around Asia\'s major cities with mobility concerns, wheelchair accessibility info, and senior discount cards.',
    content: `Navigating public transport in a foreign country can be challenging at any age. For seniors with mobility concerns, it requires advance planning. Here's our comprehensive guide to accessible transport across Asia's most popular destinations.\n\n## Singapore — The Gold Standard\n\nSingapore's MRT (Mass Rapid Transit) is the most senior-friendly metro system in Asia:\n- Elevators at every single station\n- Priority seating in every carriage\n- Senior Citizen MRT card for discounted fares (available to foreign seniors too)\n- Wide fare gates for wheelchair access\n- Trains have gap fillers between platform and carriage\n- All buses are wheelchair accessible\n\n**Tip:** Get the Singapore Tourist Pass for unlimited travel. Or use a contactless credit card for pay-as-you-go.\n\n## Tokyo & Japan — Impeccable Service\n\nJapan's omotenashi (hospitality) extends to public transport:\n- Priority seating clearly marked and respected\n- Elevators at major stations (less common at smaller ones)\n- English signage on JR lines and major metro systems\n- Station staff will assist with luggage and boarding\n- Shinkansen (bullet trains) are very accessible with wide aisles\n\n**Tip:** Get the Japan Rail Pass before arrival. For local travel, get an IC card (Suica or Pasmo).\n\n## Hong Kong — Compact & Efficient\n\nHong Kong's MTR is compact but extremely efficient:\n- Elevators at most stations\n- Octopus Card for seamless tap-and-go\n- Priority seating and wide fare gates\n- The Star Ferry is fully accessible\n- Taxis are affordable and plentiful\n\n**Tip:** Get an Octopus Card at any MTR station. It works on MTR, buses, ferries, and even at convenience stores.\n\n## Taipei — Free Travel for Seniors!\n\nTaipei offers the best senior transport benefits in Asia:\n- Senior EasyCard available to foreign visitors aged 65+\n- FREE MRT rides for qualifying seniors\n- Elevators at all MRT stations\n- Very affordable taxis ($5-8 USD for most rides)\n\n## Bangkok — Improving Rapidly\n\nBangkok's BTS Skytrain and MRT are modern and accessible:\n- Elevators at BTS and MRT stations (all newer stations)\n- Priority seating\n- Very affordable — and the MRT is air-conditioned\n- Taxis are cheap ($3-5 USD for most journeys)\n\n**Important:** Always negotiate taxi fares beforehand or insist on the meter. Use Grab (Southeast Asia's Uber) for fixed prices.\n\n## Kuala Lumpur — Free City Buses\n\nKL has an underrated public transport system:\n- Free Go KL buses (purple, green, red lines) cover major tourist areas\n- Modern MRT stations with elevators at all stops\n- KLIA Ekspres airport train is accessible\n- Very affordable Grab rides\n\n## Seoul — World-Class Metro\n\nSeoul's subway is one of the best in the world:\n- Elevators at nearly all stations\n- English signage throughout\n- T-money card for seamless travel\n- Senior discounts available for visitors 65+\n\n## General Tips\n\n1. **Always check station accessibility** before traveling. Google Maps now shows station accessibility info.\n2. **Travel off-peak** (after 9:30 AM) to avoid crowds\n3. **Carry a business card of your hotel** — show it to taxi drivers\n4. **Use ride-hailing apps** (Grab, Gojek, Uber) for door-to-door service\n5. **Book airport transfers** through your hotel for a stress-free arrival`,
    date: '2026-05-08',
    author: 'Senior-Friendly Travel Asia Team',
    readingTime: '12 min read',
    tags: ['transport', 'planning', 'accessibility', 'city-guides'],
  },
  {
    slug: 'healthcare-guide-senior-travel-asia',
    title: 'Healthcare Access for Senior Travelers in Asia: Country-by-Country Guide',
    excerpt: 'A practical guide to hospitals, clinics, pharmacies, and travel insurance for seniors traveling in Asia. Know where to find English-speaking doctors and what to carry.',
    content: `Access to quality healthcare is a top concern for senior travelers. Asia has some of the world's best hospitals — Bangkok's Bumrungrad and Singapore's Mount Elizabeth are globally recognized. But knowing where to go and how to access care varies by country.\n\n## Best Countries for Senior Healthcare\n\n### Singapore — World-Class\n**Hospitals:** Singapore General, Mount Elizabeth, Gleneagles\n**English:** All doctors speak English\n**Cost:** High — but quality matches the West\n**Pharmacies:** Guardian and Watsons on every corner\n\n### Thailand — Medical Tourism Capital\n**Hospitals:** Bumrungrad (Bangkok), Bangkok Hospital, Samitivej\n**English:** Yes, at international hospitals\n**Cost:** 50-70% less than Western prices\n\n### Malaysia — Affordable Excellence\n**Hospitals:** Prince Court (KL), Pantai, Gleneagles KL\n**English:** Widely spoken\n**Cost:** Very affordable — a consultation is $20-40\n\n## Travel Insurance\n\nNever travel internationally without comprehensive medical insurance that covers:\n- Pre-existing conditions (critical for seniors)\n- Emergency evacuation\n- Hospitalization and treatment\n- Repatriation\n\n**Recommended providers:** World Nomads, SafetyWing, Allianz Travel\n\n## What to Carry\n\n1. Medical history summary (in English)\n2. List of medications with generic names\n3. Emergency contacts\n4. Insurance policy number and 24-hour contact\n5. Doctor's letter for any medical devices or injectable medications`,
    date: '2026-05-05',
    author: 'Senior-Friendly Travel Asia Team',
    readingTime: '6 min read',
    tags: ['healthcare', 'safety', 'insurance', 'planning'],
  },
  {
    slug: 'senior-discounts-asia-2026',
    title: 'The Ultimate Guide to Senior Discounts Across Asia (2026)',
    excerpt: 'Save money on your Asian travels with senior discounts on attractions, transport, and accommodation. Country-by-country guide to what discounts are available and how to get them.',
    content: `One of the best-kept secrets of traveling in Asia as a senior is the availability of discounts. From free public transport in Taipei to reduced museum entry fees across Japan, seniors can save significantly.\n\n## Singapore\n- **Attractions:** Senior discounts at most museums and attractions (typically 20-50%)\n- **Transport:** Senior concession MRT card (available to visitors — ask at TransitLink)\n- **Accommodation:** Many hotels offer senior rates — ask at booking\n\n## Taiwan\n- **MRT:** FREE for visitors aged 65+ with Senior EasyCard\n- **Attractions:** Senior discounts at National Palace Museum, Taipei 101\n- **National Parks:** Free or reduced entry for seniors\n\n## Japan\n- **Museums & Temples:** Senior discounts at many (65+)\n- **Transport:** No national senior discount, but local buses sometimes offer reduced fares\n- **Theme Parks:** Senior rates at Disneyland Tokyo, Universal Studios\n\n## Thailand\n- **Attractions:** Senior discounts at most national parks and many museums\n- **Transport:** Some discounts on ferries and buses\n- **Shopping:** Reduced VAT refund threshold for seniors\n\n## Malaysia & Hong Kong\n- Less formalized senior discount systems but:\n- Many attractions offer senior rates (just ask)\n- Hotels frequently have senior packages`,
    date: '2026-05-02',
    author: 'Senior-Friendly Travel Asia Team',
    readingTime: '5 min read',
    tags: ['budget', 'planning', 'discounts', 'accommodation'],
  },
  {
    slug: 'packing-list-senior-travel-asia',
    title: 'The Senior Traveler\'s Packing List for Asia: What to Bring & What to Skip',
    excerpt: 'A thoughtful packing guide for seniors traveling in Asia, covering mobility aids, medications, clothing for tropical and temperate climates, and essential accessories.',
    content: `Packing for Asia as a senior traveler requires some thought. The climate ranges from tropical humidity to mountain coolness, and you'll want to be prepared without overpacking.\n\n## Essential Documents\n- Passport (valid 6+ months beyond your stay)\n- Visa (check requirements for your nationality)\n- Travel insurance certificate\n- Medical history summary\n- List of medications (with generic names)\n- Doctor's contact information\n- Emergency contacts\n\n## Mobility Aids\n- Walking stick/cane (collapsible)\n- Comfortable walking shoes (broken in!)\n- Knee or ankle supports if needed\n- Folding stool/seat (for queues)\n\n## Medications & Health\n- Prescription medications (carry in original packaging)\n- Basic first-aid kit\n- Anti-diarrheal medication (common issue for travelers)\n- Antihistamines\n- Motion sickness tablets\n- Electrolyte sachets\n- Sunscreen (high SPF)\n- Insect repellent\n- Hand sanitizer\n\n## Clothing\n- Lightweight, breathable fabrics (cotton, linen)\n- Modest clothing for temple visits (covering shoulders and knees)\n- Light jacket or shawl (for air-conditioned spaces)\n- Comfortable walking shoes\n- Sun hat\n- Swimwear\n- Umbrella (rain and sun)\n\n## Tech & Accessories\n- Universal power adapter\n- Power bank (essential for long days out)\n- Smartphone with local SIM/eSIM\n- Reusable water bottle (stay hydrated)\n- Small backpack or cross-body bag\n- Travel pillow\n- Compression socks for long flights`,
    date: '2026-04-28',
    author: 'Senior-Friendly Travel Asia Team',
    readingTime: '7 min read',
    tags: ['packing', 'planning', 'healthcare', 'budget'],
  },
];

// New posts loaded from JSON files (typed as BlogPost[])
const newPosts: BlogPost[] = [
  beaches as BlogPost,
  hotels as BlogPost,
  temples as BlogPost,
  weather as BlogPost,
  tours as BlogPost,
  slowTravel as BlogPost,
  foodTours as BlogPost,
  connected as BlogPost,
  budget as BlogPost,
  nature as BlogPost,
  wellness as BlogPost,
  guidedVsSelf as BlogPost,
  riverCruises as BlogPost,
  safetyTips as BlogPost,
  photography as BlogPost,
  japanHotels as BlogPost,
  volunteering as BlogPost,
  airports as BlogPost,
  soloTravel as BlogPost,
  cuisineTips as BlogPost,
];

const allPosts: BlogPost[] = [...existingPosts, ...newPosts];

export function getAllPosts(): BlogPost[] {
  return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  return allPosts.find((p) => p.slug === slug) || null;
}

export function getRelatedPosts(currentSlug: string, limit: number = 2): BlogPost[] {
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return allPosts.filter((p) => p.slug !== currentSlug).slice(0, limit);
  const currentTags = current.tags;
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const overlap = p.tags.filter((t) => currentTags.includes(t)).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
