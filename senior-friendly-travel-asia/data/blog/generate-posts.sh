#!/bin/bash
# Generate 5 blog post JSON files using Ollama + llama3.2
# Each post is ~800-1200 words of markdown content

PROJECT_DIR="/home/captain/.openclaw/workspace/senior-friendly-travel-asia"
BLOG_DIR="$PROJECT_DIR/data/blog"

# Helper to generate a single blog post
generate_post() {
  local slug="$1"
  local title="$2"
  local excerpt="$3"
  local tags="$4"
  local reading_time="$5"
  local prompt="$6"

  echo "Generating: $slug ($title)"

  ollama run llama3.2 "
You are a travel writer for a senior-friendly travel website. Write a detailed, SEO-optimized blog post.

OUTPUT FORMAT: Return ONLY valid JSON. No explanation, no preamble, no markdown fences.

TITLE: $title
EXCERPT: $excerpt
TAGS: $tags
READING TIME: $reading_time
DATE: 2026-05-14
AUTHOR: Senior-Friendly Travel Asia Team

Write 800-1200 words of content in markdown format with proper headings. Include specific locations, prices, and practical tips. Here is the topic:

$prompt

Return this JSON structure exactly:
{
  \"slug\": \"$slug\",
  \"title\": \"$title\",
  \"excerpt\": \"$excerpt\",
  \"content\": \"CONTENT_HERE\\n\\nUse \\n for newlines and escape quotes\",
  \"date\": \"2026-05-14\",
  \"author\": \"Senior-Friendly Travel Asia Team\",
  \"readingTime\": \"$reading_time\",
  \"tags\": $tags
}

Important: 
- Escape all double quotes in the content with backslash
- Use \\n for newlines within the content string
- The content must be 800-1200 words of real, practical information with markdown headings
- Include specific prices and location names
" 2>/dev/null | sed 's/^```json//;s/^```//' > "$BLOG_DIR/$slug.json"

  # Validate it's valid JSON
  if python3 -c "import json; data=json.load(open('$BLOG_DIR/$slug.json')); print('Valid JSON, words:', len(data['content'].split()))" 2>/dev/null; then
    echo "  ✓ $slug generated successfully"
  else
    echo "  ✗ $slug failed - invalid JSON, fixing..."
    # Try to extract just the JSON part
    grep -o '{.*}' "$BLOG_DIR/$slug.json" 2>/dev/null > "$BLOG_DIR/${slug}_clean.json" && mv "$BLOG_DIR/${slug}_clean.json" "$BLOG_DIR/$slug.json"
    if python3 -c "import json; json.load(open('$BLOG_DIR/$slug.json'))" 2>/dev/null; then
      echo "  ✓ $slug fixed"
    else
      echo "  ✗ $slug still broken, need manual fix"
    fi
  fi
}

# Post 1: Best Senior-Friendly Beaches
generate_post \
  "senior-friendly-beaches-southeast-asia" \
  "8 Best Senior-Friendly Beach Destinations in Southeast Asia (2026)" \
  "Discover Southeast Asia's most accessible beaches — from Phuket's flat boardwalks to Bali's calm coves. Our guide to senior-friendly seaside escapes with easy access, shade, and gentle surf." \
  '["beaches", "top-10", "planning", "transport"]' \
  "7 min read" \
  "Write about 8 specific senior-friendly beach destinations in Southeast Asia. Include: 
1. Phuket, Thailand (Patong Beach boardwalk, calm waters, beach wheelchairs available)
2. Hua Hin, Thailand (flat sandy beaches, easy access, quiet)
3. Nha Trang, Vietnam (long promenade, calm bay, affordable beach clubs)
4. Boracay, Philippines (Station 1 has gentle slope entry, flat beaches)
5. Batu Ferringhi, Penang (flat beach, nearby hotels, easy Penang access)
6. Bali, Indonesia (Sanur Beach has flat paved path for walking)
7. Langkawi, Malaysia (Pantar Cenang has accessible walkways, calm waters)
8. Da Nang, Vietnam (My Khe Beach is flat, quiet, and has accessible resorts)

For each: mention specific places to stay nearby, beach accessibility features (wheelchair access, flat paths, shade structures), water conditions, nearest hospitals, and approximate costs. Include practical tips for seniors like best time of day to visit, where to rent beach wheelchairs, and how to stay safe in the sun."

# Post 2: Senior-Friendly Hotels
generate_post \
  "senior-friendly-hotel-chains-asia" \
  "Senior-Friendly Hotel Chains in Asia: What to Look For in 2026" \
  "From accessible rooms to bathtub grab bars — our practical guide to finding the right hotel chain for senior travelers in Asia. We review Marriott, Accor, Hilton, and local chains across the region." \
  '["accommodation", "planning", "budget", "safety"]' \
  "8 min read" \
  "Write about senior-friendly hotel chains and features in Asia. Include:

Specific hotel chains and what they offer seniors:
1. Marriott International (JW Marriott, Ritz-Carlton) — accessible rooms with roll-in showers, grab bars, hearing-impaired kits. Concierge can arrange senior-friendly tours.
2. Accor (Sofitel, Novotel, Pullman) — accessibility standards vary by property, but Novotel is generally reliable. Ask for 'Accessible Room' category.
3. Hilton — 'Accessible Room' standards across Asia, including lowered closet rods, visual alarms, and TTY phones.
4. Marriott Bonvoy senior rates — discounts for ages 62+
5. Local chains: Dusit Thani (Thailand), Shangri-La (HK/Singapore) — excellent service and accessibility
6. Capsule hotels and hostels — NOT recommended for seniors. Minimum standards to look for.

Specific features seniors should look for:
- Roll-in showers vs bathtubs
- Grab bars near toilet and shower
- Room near elevator on quiet floors
- 24-hour room service
- English-speaking staff
- Nearby pharmacies and hospitals
- Good lighting in rooms (Asia hotels can be too dim)
- Non-slip bathroom floors

Money-saving tip: Senior rates are offered by many chains but you must call or email to get them — not always bookable online. Mention specific prices and examples."

# Post 3: Temple Etiquette for Seniors
generate_post \
  "temple-etiquette-seniors-asia" \
  "Temple Etiquette for Senior Travelers in Asia: A Complete Guide (2026)" \
  "Navigate Asia's sacred spaces with confidence. Practical temple etiquette for seniors — from Angkor Wat to Shinto shrines — covering dress codes, mobility, and cultural dos and don'ts." \
  '["culture", "safety", "planning", "transport"]' \
  "7 min read" \
  "Write about temple etiquette for senior travelers in Asia. Include:

Specific temples and what seniors need to know:
1. Wat Phra Kaew & Grand Palace, Bangkok — strict dress code (long pants, covered shoulders), smooth walkways, mostly flat. Hire a wheelchair from the information booth. Avoid midday heat.
2. Shwedagon Pagoda, Yangon — shoes off everywhere, long walkways, escalators available, elevator to main platform. Bring socks for hot ground. Rest areas available.
3. Angkor Wat, Cambodia — steep stairs are the main challenge. Use the wooden staircase added for accessibility on the west side. Many temples in Angkor complex have flat paths. Hire a tuk-tuk driver for the full day ($20-30).
4. Senso-ji, Tokyo — flat approach, accessible, wheelchair rentals available. Shoe removal areas have benches.
5. Fushimi Inari, Kyoto — thousands of stairs, NOT recommended for those with mobility issues. Alternative: visit the base area only, which is beautiful and flat.
6. Borobudur, Java — steep stone stairs. Sunrise visits are beautiful but strenuous. Consider viewing from nearby hotels for sunrise instead of climbing.
7. Temple of Heaven, Beijing — very accessible with ramps, wide flat paths in the park, elderly locals practicing tai chi.

Practical tips:
- Always carry a scarf/shawl for covering shoulders
- Compression socks for temple walking days
- Best times to visit (early morning before 9 AM to avoid heat and crowds)
- Where to sit/rest — temples often have designated rest areas
- How to bow/wai properly for seniors (you don't need to bow deeply, a slight nod is respectful)
- Donation customs (small bills)
- Shoes off/on strategy — bring slip-on shoes, sit on provided benches, use a small folding stool if needed
- Water stations at major temples
- Accessible toilets at major temple complexes"

# Post 4: Best Time to Visit
generate_post \
  "best-time-visit-asia-senior-travelers" \
  "Best Time of Year to Visit Asia for Senior Travelers: Month-by-Month Guide (2026-2027)" \
  "Avoid the crowds, extreme heat, and monsoon rains. Our month-by-month guide to the best seasons for senior travel across Asia, with specific temperature data and crowd forecasts." \
  '["weather", "planning", "budget", "safety"]' \
  "8 min read" \
  "Write a detailed month-by-month guide about the best time for seniors to visit different parts of Asia. Include:

Key factors for senior travelers:
- Avoid extreme heat (over 35°C / 95°F)
- Avoid monsoon/rainy seasons
- Avoid peak tourist crowds (Chinese New Year, Golden Week, summer holidays)
- Shoulder seasons offer best balance

Month-by-month guide:
- November-February: BEST time for most of SE Asia (dry, cool, pleasant). Great for Thailand, Vietnam, Cambodia, Myanmar. Daytime temps 25-30°C. Perfect for seniors.
- March-April: HOT season in SE Asia (30-38°C). Thailand/N Cambodia/Mynmar reach extreme heat. NOT recommended for seniors in these areas. However, Japan spring (cherry blossoms) is pleasant.
- May-October: MONSOON season for much of SE Asia. However, this is a good time for Bali (dry season May-Oct!). Also good for Japan (summer is hot but manageable with planning).
- June-August: HOT AND HUMID in most of Asia. Japan summer is hot (30-35°C). Korea same. BUT this is good for mountain escapes like Dalat (Vietnam), Cameron Highlands (Malaysia), or Baguio (Philippines).
- September-October: Shoulder season — good for most of Asia, some rain but fewer crowds. Good time for Kyoto and Tokyo.

Specific recommendations by country with months:
- Thailand: Best Nov-Feb, avoid Mar-May
- Vietnam: North Sep-Nov & Mar-Apr, South Nov-Feb
- Japan: Mar-May & Oct-Nov
- Singapore: Year-round warm (26-31°C), Feb-Apr slightly less rain
- Bali: Best May-Oct (dry season)
- Cambodia: Best Nov-Feb
- Malaysia: Best Dec-Feb
- South Korea: Best Apr-Jun & Sep-Oct
- Sri Lanka: Best Dec-Mar (west/south coast)

Include specific temperatures for each season and practical packing advice for each season."

# Post 5: Group Tours vs Independent
generate_post \
  "group-tours-vs-independent-seniors-asia" \
  "Group Tours vs Independent Travel for Seniors in Asia: Which is Right for You? (2026)" \
  "Should you join a guided tour or travel independently? We compare Intrepid, G Adventures, and solo travel with local guides for senior travelers in Asia — with real costs and experiences." \
  '["tours", "planning", "budget", "safety", "accommodation"]' \
  "9 min read" \
  "Write a detailed comparison of group tours vs independent travel for senior travelers in Asia. Include:

Group Tours (pros and cons):
1. Intrepid Travel — 'Comfort' trips designed for seniors, small groups (max 12), good pace, included accommodation. Asia tours from $150-250/day. Excellent for solo seniors.
2. G Adventures — 'Comfort' and 'Classic' levels. 'National Geographic Journeys' are higher-end. Asia tours from $120-200/day. Good for active seniors.
3. Rick Steves tours — Not available in Asia specifically, but philosophy applies.
4. Luxury tour operators: Tauck, Abercrombie & Kent — Asian tours $400-800+/day. Very senior-friendly.
5. Local tour companies: Exotissimo (Vietnam/Thailand), Buffalo Tours — can customize private tours

Independent Travel (pros and cons):
1. More flexibility — rest when you want, change plans easily
2. Lower cost overall ($50-100/day in most of Asia)
3. Requires more planning — need to arrange transport, accommodation
4. Can hire local guides day-by-day (approx $30-50/day)
5. Best for experienced travelers or repeat visitors to Asia

Cost comparison for a 14-day trip to Thailand:
- Budget tour group: $1,200-1,800 (Intrepid/G Adventures comfort level)
- Luxury tour group: $4,000-7,000
- Independent (mid-range): $800-1,500 including flights
- Independent (luxury): $2,500-4,000

Specific recommendations:
- First-time Asia traveler? → Group tour
- Health/medical concerns? → Group tour (support network)
- Experienced traveler? → Independent
- Traveling alone? → Group tour (instant companions) or independent (Grab/Gojek everywhere)
- Short trip (1 week)? → Group tour (maximize time)
- Long trip (3+ weeks)? → Independent (save money, go at your pace)

Practical tips for either choice:
- Travel insurance is essential either way
- Pace yourself — one major activity per day is plenty
- Build in rest days
- Ask about 'slow travel' options
- Emergency contacts for both scenarios"
