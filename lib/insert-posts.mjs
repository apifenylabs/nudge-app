import fs from 'fs';

const c = fs.readFileSync('./lib/generated-blog-data.ts', 'utf8');

// The exact marker at the end
const marker = '];\n\nexport default allPosts;';
const idx = c.lastIndexOf(marker);
console.log('Marker index:', idx);
if (idx === -1) {
  console.error('NOT FOUND');
  process.exit(1);
}

// Singapore post
const sgContent = '<h2>Why Singapore Is the Gold Standard for Family Travel</h2>\n\n<p>Singapore is the easiest city in Asia to visit with kids. The tap water is drinkable, the streets are spotless, public transport is world-class, and everyone speaks English. There are playgrounds in every neighborhood and changing tables in every bathroom.</p>\n\n<p>In 2026, Singapore has added new family attractions while refining the classics. Here\'s everything you need for a stress-free family trip.</p>\n\n<!-- affiliate:booking.com/singapore-family -->\n\n<h2>Best Time to Visit</h2>\n\n<table>\n  <tr><th>Period</th><th>Weather</th><th>Pros</th><th>Cons</th></tr>\n  <tr><td>Feb-Apr</td><td>30-33°C, drier</td><td>Best weather, lowest rainfall</td><td>Can be hot</td></tr>\n  <tr><td>May-Jul</td><td>28-32°C, afternoon rain</td><td>Fewer crowds, lower rates</td><td>Daily storms</td></tr>\n  <tr><td>Aug-Oct</td><td>27-31°C, haze possible</td><td>Great deals, fewer tourists</td><td>Haze risk</td></tr>\n  <tr><td>Nov-Jan</td><td>25-30°C, monsoon</td><td>Christmas decorations spectacular</td><td>Peak crowds, higher prices</td></tr>\n</table>\n\n<h2>Where to Stay</h2>\n\n<p><strong>Marina Bay / City Centre</strong> — Best for first-timers. Walking distance to Gardens by the Bay. <a href="https://www.booking.com/searchresults.html?ss=Singapore" target="_blank" rel="nofollow sponsored">Browse Marina Bay hotels</a></p>\n\n<p><strong>Sentosa Island</strong> — Resort-focused. Universal Studios, S.E.A. Aquarium, beaches on one island.</p>\n\n<p><strong>Shangri-La Singapore (Orchard)</strong> — Best kids\' club in Singapore. 2-storey building with water playground. <strong>Cost:</strong> S$200-350/night.</p>\n\n<p><strong>Hard Rock Hotel Sentosa</strong> — Connected to Universal Studios. Lazy river, water slides. <strong>Cost:</strong> S$150-250/night.</p>\n\n<p><strong>Hotel Boss (Lavender)</strong> — Budget option near MRT. <strong>Cost:</strong> S$60-100/night.</p>\n\n<p><a href="https://www.booking.com/searchresults.html?ss=Singapore" target="_blank" rel="nofollow sponsored">Compare all Singapore family hotels</a></p>\n\n<h2>Getting Around: MRT</h2>\n\n<p>Clean, safe, stroller-friendly. Kids under 7 ride free. EZ-Link card required.</p>\n\n<ul>\n  <li><strong>Circle Line:</strong> Marina Bay, Botanic Gardens</li>\n  <li><strong>North-East Line:</strong> Chinatown, Little India, Sentosa</li>\n  <li><strong>Downtown Line:</strong> Bugis, Expo</li>\n</ul>\n\n<h2>Day 1: Gardens by the Bay</h2>\n\n<p><strong>9:00 AM — Gardens by the Bay.</strong> Supertree Grove free. Cloud Forest Dome (S$15/adult, S$8/child) — 35m indoor waterfall.</p>\n\n<p><strong>12:30 PM — Satay by the Bay.</strong> Satay S$0.80/stick, kway teow S$4.</p>\n\n<p><strong>2:00 PM — ArtScience Museum: FUTURE WORLD.</strong> Digital playground. S$17/adult, S$12/child.</p>\n\n<p><strong>5:00 PM — Marina Bay Sands SkyPark.</strong> 57th floor. S$20/adult, S$14/child.</p>\n\n<p><strong>7:45 PM — Garden Rhapsody Light Show.</strong> Free.</p>\n\n<h2>Day 2: Sentosa</h2>\n\n<p><strong>9:00 AM — S.E.A. Aquarium.</strong> 100,000+ marine animals. S$30/adult, S$20/child.</p>\n\n<p><strong>12:00 PM — Malaysian Food Street.</strong> Hokkien mee S$5, chicken rice S$4.</p>\n\n<p><strong>1:30 PM — Universal Studios Singapore.</strong> S$55/adult, S$40/child. Battlestar Galactica, Transformers, Shrek 4D.</p>\n\n<p><strong>6:00 PM — Siloso Beach.</strong> Calm water, kayak rentals S$10/hour.</p>\n\n<h2>Day 3: Zoo and Night Safari</h2>\n\n<p><strong>8:30 AM — Singapore Zoo (Mandai).</strong> Breakfast with orangutans (S$35/adult, S$25/child). S$30/adult entry.</p>\n\n<p><strong>12:30 PM — River Safari.</strong> Giant pandas. S$25/adult, S$15/child.</p>\n\n<p><strong>7:00 PM — Night Safari.</strong> Nocturnal animals. S$35/adult, S$20/child. Combo S$50.</p>\n\n<h2>Best Kid Food</h2>\n\n<table>\n  <tr><th>Dish</th><th>Where</th><th>Cost</th></tr>\n  <tr><td>Chicken Rice</td><td>Tian Tian (Maxwell)</td><td>S$3</td></tr>\n  <tr><td>Laksa</td><td>328 Katong Laksa</td><td>S$5</td></tr>\n  <tr><td>Kaya Toast</td><td>Ya Kun Kaya Toast</td><td>S$3</td></tr>\n  <tr><td>Ice Kachang</td><td>Any hawker</td><td>S$2</td></tr>\n</table>\n\n<h2>Budget Per Day</h2>\n\n<table>\n  <tr><th>Item</th><th>Budget</th><th>Mid-Range</th></tr>\n  <tr><td>Accommodation</td><td>S$80</td><td>S$180</td></tr>\n  <tr><td>Food</td><td>S$40</td><td>S$80</td></tr>\n  <tr><td>Transport</td><td>S$10</td><td>S$25</td></tr>\n  <tr><td>Activities</td><td>S$40</td><td>S$90</td></tr>\n  <tr><td><strong>Total</strong></td><td><strong>S$170</strong></td><td><strong>S$375</strong></td></tr>\n</table>\n\n<ol>\n  <li><strong>Changi Airport playground.</strong> Butterfly garden, 4-story slide. Arrive 4 hours early.</li>\n  <li><strong>Book online.</strong> 15-30% discounts on Klook.</li>\n  <li><strong>Tap water is safe.</strong> Save S$5/day.</li>\n</ol>\n\n<p><a href="https://www.booking.com/searchresults.html?ss=Singapore" target="_blank" rel="nofollow sponsored">Book Singapore hotels on Booking.com</a></p>\n';

// Tokyo post
const tkContent = '<h2>Why Tokyo Is Magical for Kids</h2>\n\n<p>Tokyo is where a vending machine dispenses hot corn soup, a toilet talks to you, and a 10-story arcade has a floor for winning Pikachu plushies. It\'s one of the safest cities on earth. Trains run on time, food is spectacular at every price point, and the Japanese are unfailingly polite to children.</p>\n\n<p>This 2026 guide gives you a complete 4-day family itinerary for Tokyo covering Disney, attractions, and money-saving tips.</p>\n\n<!-- affiliate:booking.com/tokyo-family -->\n\n<h2>Best Time to Visit</h2>\n\n<table>\n  <tr><th>Period</th><th>Weather</th><th>Pros</th><th>Cons</th></tr>\n  <tr><td>Mar-May</td><td>10-22°C, cherry blossoms</td><td>Perfect weather</td><td>Very crowded, pricey</td></tr>\n  <tr><td>Jun-Jul</td><td>20-30°C, rainy</td><td>Fewer tourists, lower rates</td><td>Rainy season</td></tr>\n  <tr><td>Aug-Oct</td><td>25-32°C</td><td>Fall foliage, festivals</td><td>August hot and humid</td></tr>\n  <tr><td>Nov-Feb</td><td>2-12°C</td><td>Lowest crowds, cheapest</td><td>Cold, shorter days</td></tr>\n</table>\n\n<h2>Where to Stay</h2>\n\n<p><strong>Shinjuku</strong> — Best for first-timers. Central hub with JR Yamanote Line. Free observatory.</p>\n\n<p><strong>Ueno / Asakusa</strong> — Culture-focused. Zoo, museums, Senso-ji Temple. Affordable. <a href="https://www.booking.com/searchresults.html?ss=Tokyo,Japan" target="_blank" rel="nofollow sponsored">Browse Asakusa hotels</a></p>\n\n<p><strong>Keio Plaza Hotel (Shinjuku)</strong> — Hello Kitty room! \u00a515,000-30,000/night.</p>\n\n<p><strong>Hotel Sunroute Plaza Shinjuku</strong> — Right by station. \u00a510,000-18,000/night.</p>\n\n<p><strong>Hilton Tokyo (Shinjuku)</strong> — Kids\' floor, babysitting. \u00a525,000-45,000/night.</p>\n\n<p><a href="https://www.booking.com/searchresults.html?ss=Tokyo,Japan" target="_blank" rel="nofollow sponsored">Compare all Tokyo family hotels</a></p>\n\n<h2>Getting Around</h2>\n\n<p><strong>Suica / Pasmo Card</strong> — Prepaid IC card. Kids 6-11 half-price, under 6 free.</p>\n\n<ul>\n  <li><strong>JR Yamanote (green):</strong> Loop line — Shinjuku, Shibuya, Ueno</li>\n  <li><strong>Tokyo Metro:</strong> Everywhere JR doesn\'t go. Google Maps is 100% reliable.</li>\n</ul>\n\n<h2>Day 1: Shibuya, Harajuku, Shinjuku</h2>\n\n<p><strong>9:00 AM — Shibuya Scramble.</strong> Famous crossing. Watch from 2nd floor Starbucks. Hachiko photo.</p>\n\n<p><strong>10:00 AM — Meiji Jingu Shrine.</strong> Peaceful forest walk. Free.</p>\n\n<p><strong>11:30 AM — Harajuku Takeshita Street.</strong> Crepes \u00a5400-700, Kiddy Land toys.</p>\n\n<p><strong>1:00 PM — Ichiran Ramen.</strong> \u00a51,000-1,500/person. Solo booth format.</p>\n\n<p><strong>2:30 PM — Pokemon Center Ikebukuro.</strong> Largest Pokemon store. Free entry.</p>\n\n<p><strong>6:00 PM — Shinjuku Evening.</strong> Free observatory, yakitori \u00a5200-400/skewer.</p>\n\n<h2>Day 2: Tokyo DisneySea</h2>\n\n<p><strong>7:00 AM — Maihama Station.</strong> 25 min from Shinjuku.</p>\n\n<ul>\n  <li>Tickets: \u00a57,900/adult, \u00a54,500/child. Book 1-2 months ahead.</li>\n  <li>Must-rides: Journey to Center of Earth (7+), Sindbad (all ages), Mermaid Lagoon (toddlers)</li>\n  <li>Bring onigiri from 7-Eleven for lunch.</li>\n</ul>\n\n<h2>Day 3: Ueno, Asakusa, Akihabara</h2>\n\n<p><strong>9:00 AM — Ueno Zoo.</strong> Pandas! \u00a5600/adult, free kids under 12.</p>\n\n<p><strong>11:00 AM — National Museum of Nature and Science.</strong> Dinos. \u00a5630/adult.</p>\n\n<p><strong>12:30 PM — Ameyoko Market.</strong> Takoyaki \u00a5400.</p>\n\n<p><strong>2:00 PM — Asakusa.</strong> Senso-ji Temple. Rickshaw \u00a55,000/20 min.</p>\n\n<p><strong>4:30 PM — Akihabara.</strong> Arcades, toy stores. Visit before 7pm.</p>\n\n<h2>Day 4: Tsukiji, TeamLab, Views</h2>\n\n<p><strong>8:00 AM — Tsukiji Outer Market.</strong> Tamagoyaki \u00a5100, beef bowls \u00a5400.</p>\n\n<p><strong>10:30 AM — TeamLab Planets.</strong> Digital art. \u00a53,200/adult, \u00a51,000/child.</p>\n\n<p><strong>5:00 PM — Shibuya Sky.</strong> Open-air 230m deck. \u00a52,000/adult.</p>\n\n<h2>Best Kid Food</h2>\n\n<table>\n  <tr><th>Dish</th><th>Where</th><th>Cost</th></tr>\n  <tr><td>Tonkotsu Ramen</td><td>Ichiran</td><td>\u00a51,000-1,500</td></tr>\n  <tr><td>Katsu Curry</td><td>Coco Ichibanya</td><td>\u00a5800-1,200</td></tr>\n  <tr><td>Onigiri</td><td>7-Eleven</td><td>\u00a5100-200</td></tr>\n  <tr><td>Taiyaki</td><td>Naruto Taiyaki</td><td>\u00a5150-300</td></tr>\n</table>\n\n<h2>Budget Per Day</h2>\n\n<table>\n  <tr><th>Item</th><th>Budget</th><th>Mid-Range</th></tr>\n  <tr><td>Accommodation</td><td>\u00a510,000</td><td>\u00a520,000</td></tr>\n  <tr><td>Food</td><td>\u00a55,000</td><td>\u00a510,000</td></tr>\n  <tr><td>Transport</td><td>\u00a51,500</td><td>\u00a52,500</td></tr>\n  <tr><td>Activities</td><td>\u00a52,000</td><td>\u00a55,000</td></tr>\n  <tr><td><strong>Total</strong></td><td><strong>\u00a518,500 (~$125)</strong></td><td><strong>\u00a537,500 (~$250)</strong></td></tr>\n</table>\n\n<ol>\n  <li><strong>Get pocket Wi-Fi.</strong> \u00a5400-600/day from Ninja WiFi at Narita.</li>\n  <li><strong>Convenience stores are gold.</strong> Breakfast for \u00a5500/person at 7-Eleven.</li>\n  <li><strong>Pack comfortable shoes.</strong> 15,000-20,000 steps per day.</li>\n  <li><strong>Learn Sumimasen and Arigato.</strong> Kids love practicing.</li>\n</ol>\n\n<p><a href="https://www.booking.com/searchresults.html?ss=Tokyo,Japan" target="_blank" rel="nofollow sponsored">Book Tokyo hotels on Booking.com</a></p>\n';

// Escape content for JSON embedding
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

const sgEntry = `  },
  {
    "slug": "singapore-with-kids-complete-family-travel-guide-2026",
    "title": "Singapore with Kids: Complete Family Travel Guide 2026",
    "excerpt": "Singapore is Asia's most kid-friendly city — spotless, safe, and packed with attractions designed for children. From Sentosa's beaches to Gardens by the Bay's light show, this guide covers everything for the perfect family trip.",
    "date": "May 17, 2026",
    "author": "Family Travel Asia",
    "tags": ["singapore","family travel","sentosa","gardens by the bay","singapore zoo","kids activities","2026 travel"],
    "readingTime": "13 min read",
    "content": "${esc(sgContent)}",
    "relatedDestinations": ["singapore-001","singapore-5-day-family-itinerary","singapore-kids-free-activities-tips","best-family-theme-parks-singapore-families","family-multi-city-itinerary-bali-singapore-bangkok-hong-kong"]
  }`;

const tkEntry = `  },
  {
    "slug": "tokyo-with-kids-complete-family-travel-guide-2026",
    "title": "Tokyo with Kids: Complete Family Travel Guide 2026",
    "excerpt": "Tokyo is a wonderland for kids — high-tech toilets, vending machines that sell hot soup, and the best Disney resort in Asia. This parent-tested guide covers DisneySea, kid-friendly food, efficient transport, and best family neighborhoods.",
    "date": "May 17, 2026",
    "author": "Family Travel Asia",
    "tags": ["tokyo","japan","family travel","disneyland","tokyo disneysea","kids activities","2026 travel"],
    "readingTime": "14 min read",
    "content": "${esc(tkContent)}",
    "relatedDestinations": ["tokyo-family-guide-season-japan","tokyo-with-kids-top-10-family-attractions","osaka-with-kids-family-guide-2026","kyoto-with-kids-family-guide","japan-family-itinerary-14-days-2026"]
  }`;

// Step 1: Add Singapore post
const before = c.slice(0, idx);
const after = c.slice(idx);
const step1 = before + sgEntry + '\n' + after;
fs.writeFileSync('./lib/generated-blog-data.ts', step1);
console.log('Singapore added successfully');

// Step 2: Add Tokyo post (read fresh file)
const c2 = fs.readFileSync('./lib/generated-blog-data.ts', 'utf8');
const idx2 = c2.lastIndexOf('];\n\nexport default allPosts;');
if (idx2 === -1) {
  console.error('Marker not found after Singapore insert!');
  process.exit(1);
}
const before2 = c2.slice(0, idx2);
const after2 = c2.slice(idx2);
const step2 = before2 + tkEntry + '\n' + after2;
fs.writeFileSync('./lib/generated-blog-data.ts', step2);
console.log('Tokyo added successfully');
