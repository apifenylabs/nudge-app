# Social Beast — Distribution Tools (Concept Research)

Free, embeddable tools that drive organic traffic and convert into affiliate revenue.

---

## 1. Family Travel Budget Calculator

**Concept:** Free interactive calculator where a family inputs their trip budget, group size, and preferred region. The calculator returns a personalized list of matching destinations from Directory Beast, ranked by value.

**How it works:**
1. User selects: total budget (HKD/SGD/USD/etc.), group size (2–8), preferred country/region, travel dates (flexible or fixed)
2. Calculator estimates daily costs per destination (accommodation, food, activities, transport) using Directory Beast's data
3. Returns top 5–10 destinations within budget, ranked by value score
4. Each destination links to the Directory Beast page with affiliate booking options

**Traffic driver:** Parents searching "family vacation budget calculator Asia" → lands on tool → sees curated destinations → clicks through to book (affiliate).

**Tech stack:**
- Vanilla JS or lightweight React widget
- Cache destination cost data in localStorage (updated weekly)
- No backend needed for MVP — embed directly on Directory Beast site

**Monetization:** Affiliate hotel/activity bookings from recommended destinations.

---

## 2. Family Safety Score Tool

**Concept:** A gamified quiz that asks parents about their travel style (adventure level, youngest child age, medical concerns, solo parent vs. couple, etc.) and generates a "Family Safety Score" for different destinations.

**How it works:**
1. User answers 5–8 quick quiz questions
2. Algorithm maps answers against Directory Beast's safety ratings (medical facilities, crime stats, child-friendliness, English accessibility)
3. Generates a personalized score (e.g., "Bali: 87/100 Safe" or "Bangkok: 72/100 Safe")
4. Shows "Best Matches" based on score + preferences
5. Shareable result card (great for social virality)

**Traffic driver:** "How safe is [destination] for my family?" — high-intent search term. Gamification makes it shareable → viral loop.

**Monetization:** Affiliate hotel/activity bookings. The "top matches" section includes bookable options.

**Bonus:** Collect email addresses in exchange for "Full Safety Report PDF" → newsletter lead gen.

---

## 3. EV Route Planner

**Concept:** An interactive tool where EV drivers input their origin and destination cities across Southeast Asia. The planner returns a route with charging station stops, estimated charge times, and affiliate hotel booking links for overnight stays.

**How it works:**
1. User enters: from city, to city, vehicle model (for range estimate), preferred charging speed
2. Tool plots route using EV Charging Asia's 1,125+ station database
3. Shows: each charging stop, distance between stops, estimated charge time, nearby amenities
4. For longer routes: recommends hotels at charging stops with affiliate booking links
5. Exportable route as PDF or shareable link

**Traffic driver:** "EV route planner Malaysia" or "Singapore to Bangkok EV road trip" — long-tail SEO goldmine.

**Tech stack:**
- Leaflet.js for mapping (free, no API key needed for basic)
- GeoJSON of all 1,125 stations pre-loaded in static JSON
- Client-side routing algorithm (no backend needed for MVP)
- Cached hotel recommendations for major route segments

**Monetization:** Affiliate hotel bookings at overnight charging stops. This maps naturally to "book a hotel while you charge."

---

## 4. Embeddable Widget for Travel Bloggers

**Concept:** A small, customizable widget that travel bloggers can embed on their sites. It shows "Best family things to do in [City]" pulled from Directory Beast's database. Each entry includes an affiliate booking link.

**How it works:**
1. Blogger picks a city from the dropdown (or auto-detects based on their blog post topic)
2. Generates an embed snippet (similar to YouTube embed)
3. Widget displays: top 5 family activities/destinations in that city, each with a "Book Now" affiliate link
4. Updates automatically as Directory Beast adds new data
5. Blogger earns a revenue share (or we keep all affiliate commissions and pay them a referral fee)

**Traffic driver:** Bloggers embed widget → their readers click affiliate links → we get commissions → bloggers keep embedding more.

**Why bloggers will use it:**
- Zero effort content — they don't need to write the activity list
- Auto-updates as we add data
- Revenue share creates alignment
- Smaller bloggers get access to curated data they couldn't build themselves

**Tech stack:**
- Vanilla JS embed snippet (< 10KB, no framework dependency)
- JSONP or script tag injection (no CORS issues)
- Data served from a CDN (Cloudflare R2 or similar)
- Optional: Blogger dashboard to track clicks and earnings

**Monetization:** Straight affiliate revenue share. 70% to us (data provider), 30% to blogger (referral fee), or negotiable split.

---

## Prioritization Matrix

| Tool | Traffic Potential | Dev Complexity | Monetization Fit | Viral Potential | Priority |
|------|:-:|:-:|:-:|:-:|:-:|
| Budget Calculator | Medium | Low | High | Low | **#2** |
| Safety Score Quiz | High | Medium | Medium | High | **#1** |
| EV Route Planner | Medium | Medium | High | Medium | **#3** |
| Embeddable Widget | High | Medium | High | Medium | **#4** |

**Recommended build order:** Safety Score Quiz → Budget Calculator → EV Route Planner → Embeddable Widget

Rationale: Safety Score has the best viral potential + SEO play + email capture. Budget Calculator is fastest to build. EV Route Planner captures a growing niche. Embeddable Widget requires more dev effort but creates a distribution network.

---

*Last updated: 2026-05-01*
*Maintained by: Captain (Social Beast orchestration)*
