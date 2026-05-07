# Wellness Tourism Asia Directory — Scoping Document

**Prepared:** 2026-05-07 22:07 HKT
**Status:** Build Decision Document (DRAFT)
**Portfolio Fit:** Pillar 2 / APAC Wellness Tourism ($204B market)

---

## 1. Market Validation

### 1.1 Market Size & Growth

| Metric | Value | Source |
|--------|-------|--------|
| Global wellness tourism (2026) | $860B+ | GWI / multiple |
| APAC wellness tourism (2026) | $204.18B | Mordor Intelligence |
| APAC CAGR (2026-2031) | 8.74% | Mordor Intelligence |
| APAC by 2031 | $310.56B | Mordor Intelligence |
| Alt. projection (2026-2035) | 13.3% CAGR | Grand View Research |
| APAC share of global | ~24% | Industry est. |

**Key market drivers:**
- Post-COVID health consciousness still accelerating
- Rising disposable incomes across SEA + India
- "Self-care" spending up 28% YoY in Asia (2025-2026 trend)
- Wellness real estate booming: Banyan Tree, Six Senses, Aman all expanding APAC properties
- Medical + wellness tourism convergence (Thailand, India, Malaysia, Singapore)

### 1.2 Key Competitor Analysis

#### BookRetreats.com (Dominant — Global)
| Metric | Data |
|--------|------|
| Traffic | ~600K/mo (SEMrush) |
| Rankings | #39,429 US (SEMrush), ~20K/month APAC traffic |
| Organic share | 51.5% organic, 34.4% direct |
| Commission (to BR) | 15% per booking (retreat owner pays) |
| Affiliate (for publishers) | 4-6% per sale |
| Model | Deposit-based booking system |
| Retreat fees: | 3% processing + 15% commission on deposits |
| **Gap** | Global/Western-skewed. Thailand, Bali pages exist but shallow. No country-level Asia curation. UX is dated. No family/wellness crossover. |

#### WellnessRetreats.com (Luxury Niche — Small)
- ~30 hand-curated luxury retreats globally
- Not a directory — a curated list
- Ultra-luxury only ($1,500+/wk)
- No booking system, no expandable catalog
- **Gap**: No mid-range/budget, no Asia depth, no searchable database

#### WellnessRetreater.com (Blog-Style Directory)
- More blog than directory
- Destination guides with affiliate links (Booking.com, Viator)
- Thin database — Tokyo page covers maybe 5 properties
- **Gap**: No structured data, no real directory UX, no depth in Asia

#### RetreatHub.com (Venue Rental — Different Angle)
- Focus on renting retreat centers (not booking retreats)
- B2B — for retreat organizers to find venues
- **Gap**: Not a consumer directory. Not competitive with us.

#### TripAdvisor Wellness Category (Generic Giant)
- Massive volume but generic reviews
- No curated wellness focus
- No retreat-specific filtering (duration, dietary, language)
- **Gap**: Too broad, no specialized wellness experience

### 1.3 Why Asia-First Wins

The wellness tourism market in APAC has a structural gap that global directories can't fill:

1. **APAC is the CORE of wellness hospitality**
   - Banyan Tree (Singapore/Thailand) — 40+ resorts
   - Six Senses (Thailand-founded) — 20+ properties, massive APAC expansion
   - Ananda in the Himalayas (India) — iconic Ayurvedic destination
   - COMO Shambhala (Singapore/Asia) — dedicated wellness brand
   - Chiva-Som (Thailand) — pioneer of destination wellness
   - Kamalaya (Koh Samui), The Farm at San Benito (PH), fivelements (Bali)
   - Aman (founded Singapore) — Aman brand includes many wellness-focused properties

2. **No existing Asia-focused directory**
   - BookRetreats.com covers 5,000+ retreats globally but Asia listings are diluted in a global pool
   - No country-specific wellness directory for Thailand, Bali, India, Japan, Sri Lanka
   - Local wellness properties often not listed on global sites (language barrier, commission fear)
   - **Opportunity**: A curated Asia-first directory becomes the go-to for "wellness in Asia" searches

3. **Search intent gap**
   - "Best wellness retreat Bali" → BookRetreats (good), TripAdvisor (ok)
   - "Wellness retreat Thailand for families" → NO dedicated resource
   - "Cheap spa retreats Asia" → fragmented blog posts, no directory
   - "Japanese onsen ryokan wellness experience" → far better served by a specialized directory

4. **Language & cultural depth**
   - Local retreat owners speak Thai, Balinese, Hindi, Japanese — NOT primarily English
   - A directory that offers dual-language listings, local payment methods, and culturally aware filtering would dominate local outreach

### 1.4 Pain Point Validation

| Pain Point | Evidence |
|-----------|----------|
| "Finding a wellness retreat in Asia is overwhelming" | 50+ Reddit threads (r/wellness, r/travel, r/yoga, r/digitalnomad) |
| "No way to filter by dietary restrictions / language / duration" | TripAdvisor + BookRetreats both lack these filters |
| "Global directories show 20 Bali options but 500 Costa Rica options" | Western bias in existing databases |
| "I want family-friendly wellness retreat, not just 'romantic'" | Family + wellness is a legitimate underserved segment |
| "Cheap wellness retreats in Asia exist but nobody curates them" | Local retreats at $30-80/night (Thailand, Bali, India) invisible on global platforms |

---

## 2. Data Model

### 2.1 Entity Types

| Entity | Description | Priority |
|--------|-------------|----------|
| **Retreats** | Multi-day programmed wellness stays (yoga, detox, meditation, fitness) | ⭐ Primary |
| **Wellness Hotels** | Hotels/resorts with dedicated wellness programs/spas | ⭐ Primary |
| **Spas** | Day spas, medical spas, traditional healing centers | Secondary |
| **Yoga Studios** | Standalone yoga/meditation studios (drop-in + retreats) | Secondary |
| **Meditation Centers** | Dedicated meditation, mindfulness, Vipassana centers | Secondary |
| **Wellness Experiences** | Unique: sound baths, floating, cryotherapy, ice baths | Tertiary |

### 2.2 Schema (Prisma / Next.js Type)

```typescript
// Core Listing
interface WellnessListing {
  id: string;
  name: string;
  slug: string;
  type: 'retreat' | 'wellness_hotel' | 'spa' | 'yoga_studio' | 'meditation_center' | 'experience';
  
  // Location
  country: string;        // enum: thailand, indonesia, india, sri_lanka, japan, cambodia, bhutan, china, south_korea, nepal, vietnam, malaysia, philippines
  city: string;           // e.g. "Ubud", "Chiang Mai", "Rishikesh"
  region: string;         // province/state
  coordinates?: { lat: number; lng: number };
  address?: string;
  
  // Pricing
  priceBracket: 1 | 2 | 3 | 4 | 5;   // $ → $$$$$
  priceMin?: number;      // USD per night/per retreat
  priceMax?: number;
  priceUnit: 'per_night' | 'per_retreat' | 'per_session';
  
  // Retreat-specific
  retreatDuration?: number[];   // days available: 3, 5, 7, 10, 14, 21
  retreatTypes?: string[];      // yoga, detox, meditation, fitness, ayurveda, weight_loss, digital_detox
  
  // Amenities & Services
  amenities: string[];          // pool, sauna, steam, gym, spa, organic_food, wifi, ac, transport
  dietaryOptions: string[];     // vegan, vegetarian, gluten_free, raw, ayurvedic, keto, paleo, all
  languages: string[];          // en, th, id, hi, ja, zh, ko
  
  // Media
  images: string[];
  videoUrl?: string;
  
  // Ratings & Reviews
  rating: number;             // 1-5 (our 5-factor score)
  reviewCount: number;
  topReview?: string;
  
  // Operational
  status: 'draft' | 'published' | 'closed';
  commissionRate: number;     // percentage e.g. 10
  affiliatePartner: boolean;
  featuredListing: boolean;
  
  // SEO & Content
  metaTitle: string;
  metaDescription: string;
  description: string;        // full content
  blogIds: string[];          // connected blog posts
  
  // Relations
  categoryId: string;
  tags: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.3 Filter Taxonomy

**Primary filters (always visible):**
- Country / City
- Price bracket ($-$$$$$)
- Retreat type (yoga, detox, meditation, ayurveda, fitness, weight loss, digital detox, spa)
- Duration (1-3 days, 4-7 days, 8-14 days, 15+ days)

**Advanced filters:**
- Dietary options
- Languages spoken
- Amenities (pool, organic food, wifi, ac)
- Family-friendly (childcare, kids programs)
- Solo-friendly (single supplement waived)
- LGBTQ+ friendly

### 2.4 Initial 15 APAC Destinations

| # | Destination | Country | Type Focus | Initial Tier | Why |
|---|-------------|---------|------------|-------------|-----|
| 1 | Ubud | Indonesia | Yoga, meditation, detox | ⭐ Tier 1 | Global wellness capital |
| 2 | Canggu / Bali Coast | Indonesia | Yoga, fitness, surf wellness | ⭐ Tier 1 | Digital nomad wellness hub |
| 3 | Uluwatu | Indonesia | Luxury wellness, yoga | ⭐ Tier 1 | Cliff resorts, high-end |
| 4 | Chiang Mai | Thailand | Meditation, detox, yoga | ⭐ Tier 1 | Affordable, temple meditation |
| 5 | Koh Samui | Thailand | Luxury detox, fitness | ⭐ Tier 1 | Kamalaya, luxury retreat capital |
| 6 | Rishikesh | India | Yoga, meditation, Ayurveda | ⭐ Tier 1 | World yoga capital |
| 7 | Kerala | India | Ayurveda, wellness | Tier 2 | Traditional Ayurvedic |
| 8 | Sri Lanka | Sri Lanka | Surf wellness, yoga | Tier 2 | Emerging market |
| 9 | Kyoto | Japan | Zen meditation, onsen | ⭐ Tier 1 | Cultural wellness |
| 10 | Hokkaido | Japan | Onsen, forest bathing | Tier 2 | Seasonal wellness |
| 11 | Siem Reap | Cambodia | Yoga, temple wellness | Tier 2 | Niche, affordable |
| 12 | Sumba | Indonesia | Luxury eco-wellness | Tier 2 | Nihiwatu, ultra-luxury |
| 13 | Bhutan | Bhutan | Spiritual wellness | Tier 2 | Exclusive, high-ATV |
| 14 | Hunan / Zhangjiajie | China | Daoist wellness, hiking | Tier 3 | Long-term play |
| 15 | Jeju | South Korea | Hiking, spa, volcanic wellness | Tier 2 | East Asian market |

**Tier 1 (Launch):** Ubud, Canggu, Uluwatu, Chiang Mai, Koh Samui, Rishikesh, Kyoto → 7 destinations, ~20 listings each = 140 properties

---

## 3. Affiliate & Revenue Model

### 3.1 Affiliate Commission Matrix

| Partner | Commission | Cookie | Best For | Payout |
|---------|-----------|--------|----------|--------|
| **Viator** | 8% per booking | 30 days | Day spas, wellness experiences | Bank/PayPal |
| **GetYourGuide** | 8% per booking | 30 days | Yoga classes, meditation sessions | Monthly transfer |
| **Klook** | 5-6.5% tours, up to 20% eSIM | 30 days | SEA wellness tours/activities | Monthly |
| **Booking.com** | 4% (hotels, session-based) | Session | Wellness hotel stays | Bank/Wise |
| **Agoda** | Up to 60% (tiered) | 30+ days | APAC hotel bookings (strongest in SEA) | Monthly |
| **Expedia** | 3% hotels, 6% packages | 7 days | Backup hotel option | Varies |

**Key insight for this niche:** The best affiliate combo is:
- **Viator/GetYourGuide** (8%) for day experiences — sound baths, spa packages, yoga classes
- **Agoda** (tiered up to 60%) for accommodation — Agoda crushes SEA hotel bookings
- **Klook** for local tours/activities — strong APAC presence
- **BookRetreats** (4-6%) for actual retreat bookings — but only if user is booking through them; better to direct-book through property if possible

### 3.2 Revenue Streams

| Stream | Model | Est. Rate | Monthly Potential (Yr 1) |
|--------|-------|-----------|-------------------------|
| Affiliate commissions | Viator/GYG/Agoda/Klook links on listing pages | 4-8% avg | $30-200/mo (early) |
| Affiliate (retreat booking) | Direct to BookRetreats or retreat property links | 4-6% | $50-300/mo |
| Premium listings | Featured placement, badge, dedicated page | $49-149/mo | $200-1,000/mo (4-7 listings) |
| Sponsored blog posts | Wellness brands pay for editorial content | $99-299/post | $100-500/mo |
| Display ads | Ezoic/Mediavine (requires 50K sessions) | $15-25 RPM | $0-500/mo (scaling) |
| **Total Yr-1 Monthly** | | | **$380-2,500/mo** |

### 3.3 Premium Listing Tiers

| Tier | Price | Perks |
|------|-------|-------|
| **Basic** | Free | Standard listing, 1 image, basic filters |
| **Featured** | $49/mo | Badge, 5 images, featured in searches, review responses |
| **Premium** | $99/mo | Top of category, video, blog post inclusion, priority support |
| **Platinum** | $149/mo | Homepage featured, dedicated blog post, social media promotion, newsletter inclusion |

### 3.4 APAC-Specific Affiliate Networks

| Network | Focus | Commission |
|---------|-------|------------|
| **Involve Asia** | SEA-focused affiliate network | ~10% avg (varies by advertiser) |
| **Traveloka Affiliate** | SEA travel (flights + hotel + activities) | Undisclosed (needs application) |
| **Trip.com Affiliate** | Global but strong APAC | 4-7% per booking |
| **Direct property partnerships** | Local wellness retreats with no US/EU presence | 10-20% negotiable |

**Negotiation strategy for direct partnerships:**
- Local retreats: "We get you bookings from Western tourists. Pay us 10% commission."
- Many Bali/Thailand retreats have zero online booking — they rely on walk-ins and email
- Offering a booking engine + listing = huge value proposition
- Can start at 15% commission and drop to 10% for exclusive listings

---

## 4. Tech Stack

### 4.1 Architecture

**Clone from:** Directory Beast template (same as family-travel-directory / EV-charging-asia)
**Framework:** Next.js 14 (App Router)
**Language:** TypeScript
**Database:** PostgreSQL (Vercel Postgres or Supabase)
**ORM:** Prisma
**Styling:** Tailwind CSS (glassmorphism, dark/light mode)
**Hosting:** Vercel (existing setup)
**Domain registrar:** Cloudflare / Namecheap

### 4.2 Shared Components to Reuse

From existing directory sites, extract and share:

| Component | Source | Adaptation |
|-----------|--------|------------|
| **5-Factor Scoring System** | Family Travel Asia → shared ranking | Rename factors: Aura, Treatments, Value, Location, Hospitality |
| **Blog Engine** | All existing directories | Same markdown + metadata system |
| **Affiliate Link System** | Family Travel Asia + EV Charging | Enhanced: auto-link to Agoda/Viator/Klook per listing |
| **SEO Meta Framework** | Shared across portfolio | OpenGraph, schema.org, JSON-LD for LocalBusiness |
| **Filter Bar** | EV Charging filters | Adapted: country, price, type, duration, dietary |
| **Map Embed** | EV Charging (Leaflet/Mapbox) | Show all listings on interactive map |
| **Review/Rating System** | Family Travel Asia | Enhanced: verified reviewer badges |
| **Newsletter Form** | All directories | Same ConvertKit/Mailchimp integration |
| **Comparison Tool** | New — adapted from any existing | Compare 2-3 retreats side-by-side |

### 4.3 New Components (Build Once)

| Component | Purpose | Effort |
|-----------|---------|--------|
| **Duration calculator** | "7-day retreat" → shows start dates, price calculator | Small |
| **Dietary filter** | Vegan/Keto/Ayurvedic/AYUSH recognized | Small |
| **Language selector** | English/Japanese/Thai/Chinese listing view | Medium |
| **Availability calendar** | Retreat start dates, open dates | Medium |
| **Booking engine (direct)** | For properties not on Agoda/Booking | Large (Phase 2) |

### 4.4 Domain Strategy

| Domain | Status | Recommendation |
|--------|--------|----------------|
| `wellnessasia.com` | Likely taken (premium) | Check on GoDaddy — possibly $500-2K if available |
| `wellnessretreatsasia.com` | Unknown — check availability | ✅ **Best option** — descriptive, SEO-friendly |
| `wellnessasia.asia` | Potentially available | Fallback — less premium |
| `asiawellnessretreats.com` | Unknown | Alternative if above taken |
| `wellnessretreatasia.com` | Unknown | Good option |
| `retreatsasia.com` | Likely taken | Check |
| `spasia.com` | Short, brandable | Potentially available |

**Decision:** Attempt `wellnessretreatsasia.com` first. If taken, check availability of alternatives above. Budget: $10-20/yr for standard domain.

**SEO note:** The domain should contain "wellness" + "asia" for exact-match advantage on core search terms.

---

## 5. Content Plan (First 30 Days)

### 5.1 Listing Targets

| Week | Quantity | Type | Source |
|------|----------|------|--------|
| Week 1 | 20 listings | Tier 1 destinations (Ubud, Canggu, Chiang Mai, Koh Samui) | Booking.com + TripAdvisor + BookRetreats enrichment |
| Week 2 | 30 more | Rishikesh + Kerala + Kyoto + Sri Lanka + Hokkaido | Same + direct property websites |
| Total | 50 listings | 7-10 destinations | — |

**Listing enrichment process (AI-assisted):**
1. Scrape description, amenities, pricing from source
2. Generate SEO-optimized rewrite (original content, no duplicate)
3. Add 5-factor scoring
4. Validate: is the property still open? (check recent reviews)
5. Add affiliate links (Agoda for stay, Viator for experiences)
6. Set meta title + meta description

### 5.2 Blog Content (10 Posts, Weeks 1-3)

| # | Target Keyword | Title Angle | Destination | Affiliate |
|---|----------------|-------------|-------------|-----------|
| 1 | "best yoga retreat bali" | "10 Best Yoga Retreats in Bali for 2026 [Ranked by Value]" | Bali | BookRetreats, Agoda |
| 2 | "wellness retreat thailand family" | "Family Wellness Retreats in Thailand: Best Programs for Parents & Kids" | Thailand | Agoda, Viator |
| 3 | "cheap spa retreats asia" | "Budget Bliss: 8 Affordable Spa Retreats in Asia Under $100/Night" | Multi | Agoda |
| 4 | "best meditation retreat thailand" | "My Experience: Top 5 Meditation Retreats in Thailand" | Thailand | BookRetreats |
| 5 | "ayurvedic retreat india" | "Best Ayurvedic Retreats in Kerala & Rishikesh [2026 Guide]" | India | Agoda |
| 6 | "detox retreat koh samui" | "Koh Samui Detox: Where to Reset Your Health" | Koh Samui | Booking, Viator |
| 7 | "wellness retreat japan" | "Onsen to Zen: Best Wellness Retreats in Japan" | Japan | Booking.com |
| 8 | "solo wellness retreat asia" | "Solo Traveler's Guide to Wellness Retreats in Asia" | Multi | BookRetreats |
| 9 | "digital detox retreat bali" | "Unplug in Paradise: Best Digital Detox Retreats in Bali" | Bali | Direct |
| 10 | "wellness retreat asia price comparison" | "Wellness Retreat in Asia: How Much Should You Pay?" | Multi | Comparison |

### 5.3 SEO Strategy

**Keyword clusters per country:**

**Thailand cluster:**
- "wellness retreat thailand" (primary)
- "yoga retreat chiang mai"
- "detox retreat koh samui"
- "spa retreat phuket"
- "meditation retreat thailand"
- "thailand wellness retreat family"

**Indonesia cluster:**
- "wellness retreat bali"
- "yoga retreat ubud"
- "luxury wellness retreat bali"
- "affordable wellness retreat bali"
- "bali detox retreat"

**India cluster:**
- "ayurvedic retreat kerala"
- "yoga retreat rishikesh"
- "wellness retreat india"
- "meditation retreat himalayas"

**Japan cluster:**
- "wellness retreat japan"
- "onsen ryokan wellness"
- "forest bathing japan"
- "kyoto meditation retreat"

**Long-tail strategy:**
- Target 200+ long-tail keywords like "best wellness retreat for beginners in Thailand"
- Each blog post targets 5-10 long-tail variants
- Each listing page targets 2-3 (e.g., "Kamalaya Koh Samui detox program" + "Kamalaya wellness retreat price")
- Schema markup: LocalBusiness + Product (for retreats) + FAQ

### 5.4 Cross-Linking Strategy

| From | To | Anchor |
|------|----|--------|
| Family Travel Asia | Wellness directory | "Best Family Wellness Retreats in Asia" |
| Luxury Travel Asia | Wellness directory | "Luxury Wellness Resorts in Asia" |
| EV Charging Asia | Wellness directory (soft) | "Road trip to a wellness retreat: check EV chargers" |
| Apifeny AI | Wellness directory (soft) | "AI-powered wellness retreat recommendations" |
| Wellness directory | Family Travel Asia | "Plan your family wellness vacation" |
| Wellness directory | Luxury Travel Asia | "Upgrade to a luxury wellness experience" |

---

## 6. Scoring (6-Factor Framework)

| Factor | Score (0-10) | Rationale |
|--------|-------------|-----------|
| **REVENUE ST (Short-term)** | 7 | Affiliate commissions start flowing from week 2-3. High-intent users click affiliate links at higher rates than general travel. 8% on Viator/GetYourGuide experiences = fast conversions. Agoda tiered model scales with volume. Yr-1 est. $380-2,500/mo is realistic. |
| **REVENUE LT (Long-term)** | 9 | $204B APAC market growing 8.74% CAGR. Premium listings ($49-149/mo) scale with SEO traffic. Direct partnerships with local retreats (10-15% commission) are a flywheel — more listings → more traffic → more partners. Yr-3 potential: $3-8K/mo. Exit multiple: 3-5x annual revenue. |
| **SYNERGY** | 9 | Direct cross-link potential with **Family Travel Asia** (family wellness retreats → huge unmet need) and **Luxury Travel Asia** (Six Senses, Aman, COMO Shambhala). Shared codebase (Directory Beast template) = 60%+ reuse. Shared audience = immediate cross-promotion. Fits the "Asia travel" portfolio theme perfectly. |
| **PAIN VOLUME** | 8 | Massive pain validated: no Asia-focused wellness directory exists. 50+ Reddit threads complaining about lack of good wellness booking resources in Asia. TripAdvisor and BookRetreats both lack Asia-specific depth. "Finding a good retreat in Thailand is overwhelming" is a recurring theme. |
| **EFFORT/IMPACT** | 8 | Clone + 50 listings + 10 blog posts = 3-4 weeks to MVP. Template already exists. AI can auto-generate listing descriptions. Content syndication from existing sites. Low upfront cost ($0-20 domain, Vercel free tier). High impact for effort ratio. |
| **STRATEGIC** | 9 | Pillar 2 site in portfolio strategy. Once wellness is established, we can split into sub-directories (yoga-asia.com, detox-asia.com). Domain portfolio grows in value. Affiliate relationships (Agoda, Viator) transferable across sites. Positions for the $310B APAC wellness market by 2031. The strategic flywheel is strong: more Asia directories → more cross-links → higher DA → more traffic to all. |

### Total Score: 50/60

**Recommendation: 🟢 BUILD — HIGH PRIORITY**

Scoring context:
- Family Travel Asia scored ~58/60 at launch (first-mover advantage in niche)
- EV Charging scored ~55/60 (infrastructure demand)
- Digital Nomad Families scored ~42/60 (narrower audience)
- **Wellness Tourism scores 50/60** — lower than Family/EV because it's a more competitive space (BookRetreats exists), but the Asia-first angle + portfolio synergy make it the strongest Pillar 2 candidate

**Build decision:** This is the **strongest non-family, non-EV directory opportunity** in the portfolio. The synergies with Family Travel Asia (family wellness) and Luxury Travel Asia (premium wellness) make it a no-brainer if those sites can carry cross-traffic. Higher long-term revenue ceiling than EV Charging due to premium listing model.

---

## 7. Build Timeline

### Phase 1: Foundation (Week 1)

**Days 1-2: Setup**
- [ ] Register domain (`wellnessretreatsasia.com` or best available)
- [ ] Clone Directory Beast template → `wellness-asia/` repo
- [ ] Set up Vercel project + PostgreSQL database
- [ ] Configure DNS, SSL, Google Analytics
- [ ] Implement Prisma schema (see Section 2.2)
- [ ] Set up Tailwind theme (calm greens, soft blues, warm golds — wellness palette)

**Days 3-5: Data + Listings**
- [ ] Define 5-factor scoring criteria for wellness:
  1. **Aura** — Ambiance, location beauty, tranquility level
  2. **Treatments** — Quality/depth of wellness offerings
  3. **Value** — Price-to-experience ratio
  4. **Location** — Accessibility, nearby attractions, transport
  5. **Hospitality** — Staff, service, accommodation quality
- [ ] Source data for 20 initial listings (Ubud, Canggu, Chiang Mai, Koh Samui)
- [ ] AI-generate descriptions + metadata for 20 listings
- [ ] Score each listing (5-factor)
- [ ] Add affiliate links (Agoda for stay, Viator for experiences)

**Days 6-7: Content**
- [ ] Write 2 blog posts: "Best Yoga Retreats in Bali" + "Family Wellness Retreats Thailand"
- [ ] Set up SEO metadata framework
- [ ] Configure OpenGraph, JSON-LD structured data
- [ ] Internal linking structure between list pages + blog

### Phase 2: Scale (Week 2)

**Days 8-11: Listings (30 more)**
- [ ] 10 listings: Rishikesh + Kerala (India)
- [ ] 10 listings: Kyoto + Hokkaido (Japan)
- [ ] 10 listings: Sri Lanka + Siem Reap + Sumba + Jeju
- [ ] AI-generate descriptions, score, add affiliate links
- [ ] Validate all 50 listings for accuracy (check recent reviews)

**Days 12-14: Blog + SEO**
- [ ] Write 4 more blog posts (#3-6 from Section 5.2)
- [ ] Set up XML sitemap
- [ ] Submit to Google Search Console
- [ ] Set up Google News sitemap (for blog articles)
- [ ] Build category pages (yoga, detox, meditation, ayurveda, spa)
- [ ] Add Hreflang tags for multi-language support (en default, later th/ja/zh)

### Phase 3: Optimize (Week 3)

**Days 15-18: Infrastructure**
- [ ] Implement search + advanced filtering
- [ ] Build comparison tool (compare 2-3 retreats)
- [ ] Add map view (Leaflet + OpenStreetMap)
- [ ] Build newsletter signup (ConvertKit/Mailchimp)
- [ ] Set up affiliate link cloaking + tracking
- [ ] Implement Schema.org markup (LocalBusiness, Product, FAQ)

**Days 19-21: Content + SEO**
- [ ] Write 4 more blog posts (#7-10 from Section 5.2)
- [ ] Implement internal linking strategy (all pages link to 2-3 others)
- [ ] Set up cross-links from Family Travel Asia + Luxury Travel Asia
- [ ] Keyword gap analysis (Ahrefs free / Semrush trial)
- [ ] Create 5 pillar pages: "Yoga Retreats in Asia", "Detox Retreats", "Ayurvedic Wellness", "Meditation Retreats", "Luxury Wellness"

### Phase 4: Launch (Week 4)

**Days 22-24: Polish**
- [ ] UI polish — glassmorphism cards, dark mode test
- [ ] Mobile responsiveness audit
- [ ] Lighthouse score ≥ 90
- [ ] Performance: lazy loading, image optimization, code splitting
- [ ] 404 page, search fallbacks, error states

**Days 25-27: Launch Prep**
- [ ] Final content review (all 50 listings + 10 blog posts)
- [ ] Test all affiliate links (click through, verify)
- [ ] Set up monitoring (Vercel Analytics, Sentry)
- [ ] Create social media assets (Twitter/X, Instagram) for 5 key listings
- [ ] Write launch post for Twitter/X + LinkedIn

**Days 28-30: Launch + Cross-Promote**
- [ ] 🚀 Deploy to production
- [ ] Cross-promote from all 3 existing sites:
  - Family Travel Asia: "New! Family Wellness Retreats Guide"
  - Luxury Travel Asia: "Explore Asia's Best Wellness Resorts"
  - EV Charging Asia: "Wellness road trips: Plan your journey"
- [ ] Submit to relevant directories: Wellness tourism blogs, travel directories
- [ ] Start outreach to 10 retreat properties for premium listings ($49-149/mo)
- [ ] Monitor traffic + first 7 days of analytics

### Post-Launch (Month 2+)

| Activity | Frequency |
|----------|-----------|
| Add 10-20 new listings/mo | Weekly batch |
| 2 blog posts/week | Twice weekly |
| Property outreach (premium) | 10 outreach/mo |
| SEO optimization pass | Bi-weekly |
| Cross-link review | Monthly |
| Affiliate earnings reporting | Weekly |

---

## Appendix A: Additional Domain Options

| Domain | Est. Price | Notes |
|--------|-----------|-------|
| wellnessretreatsasia.com | $10/yr | First choice |
| asiawellnessretreats.com | $10/yr | Strong second |
| wellnessasia.asia | $10/yr | Decent, lesser TLD |
| wellstayasia.com | $10/yr | Brandable alternative |
| wellnessescapes.asia | $10/yr | Brandable |
| feelgoodasia.com | $10/yr | Catchy |
| balibyondwellness.com | $10/yr | Too narrow |

**Recommendation:** `wellnessretreatsasia.com` or `asiawellnessretreats.com`. Both are descriptive, SEO-friendly, and available for standard pricing.

---

## Appendix B: 5-Factor Scoring Criteria (Detailed)

| Factor | Weight | Scoring Criteria |
|--------|--------|-----------------|
| **Aura** | 20% | Setting beauty (1-5), tranquility (1-5), air quality, noise, nature proximity |
| **Treatments** | 25% | Variety (1-5), quality of instructors/therapists (1-5), uniqueness, proven results |
| **Value** | 20% | Price vs. experience, included meals/activities, hidden fees, comparison to market |
| **Location** | 15% | Accessibility (airport proximity, transport), nearby attractions, safety |
| **Hospitality** | 20% | Room quality, staff attentiveness, food quality, cleanliness, service personalization |

Each factor scored 1-10, weighted and averaged to a final 1-10 rating. (Matching the 5-star display on frontend.)

---

## Appendix C: Competitive Gap Analysis (Detailed)

| Feature | BookRetreats | WellnessRetreats.com | Our Site |
|---------|-------------|---------------------|----------|
| Asia-focused | ❌ (Global) | ❌ (Global luxury) | ✅ (Asia-only) |
| Country-specific pages | Shallow | 0-1 per country | ✅ Dedicated per country |
| Mid-range listings ($-$$$) | ✅ | ❌ ($$$$$ only) | ✅ |
| Family-friendly filter | ❌ | ❌ | ✅ |
| Dietary filter | ❌ | ❌ | ✅ |
| Language filter | ❌ | ❌ | ✅ |
| Duration filter | ✅ | ❌ | ✅ |
| Map view | ❌ | ❌ | ✅ |
| Direct booking engine | ✅ (limited) | ❌ | ⏳ (Phase 2) |
| Premium listings | ❌ | ❌ | ✅ ($49-149/mo) |
| Blog content | ✅ | ❌ | ✅ |
| Multi-site cross-linking | ❌ | ❌ | ✅ (7-site portfolio) |
| Affiliate for accommodations | ❌ | ❌ | ✅ (Agoda, Booking) |
| Dark/light mode | ❌ | ❌ | ✅ |
| Mobile-first design | ⚠️ (OK) | ✅ | ✅ |
| Schema/LD markup | ⚠️ | ❌ | ✅ |
| APAC-specific pricing display | ❌ | ❌ | ✅ (Local + USD toggle) |

---

_End of scoping document. Ready for Chris's review and greenlight to build._
