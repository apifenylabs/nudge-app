#!/usr/bin/env python3
"""Generate 15 entries for batch-thailand-deep-philippines-extra.json"""

import json

entries = []

# 1. Ayutthaya Elephant Kraal
entries.append({
    "id": "ayutthaya-001",
    "name": "Ayutthaya Elephant Kraal",
    "city": "Ayutthaya",
    "country": "Thailand",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 4.1,
    "priceRange": "$",
    "popularity": 68,
    "description": "Historic elephant corral where kids can watch, feed, and learn about rescued elephants in a semi-natural setting near the ancient ruins.",
    "location": "Ayutthaya Historical Park area (1 hour north of Bangkok)",
    "bestTime": "Early morning (8-10am) before elephants retreat from heat",
    "imageUrl": "https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80",
    "amenities": ["Food Stalls", "Hand Washing Stations", "Shaded Viewing Areas", "Parking", "Restrooms"],
    "safetyFeatures": ["Keep distance during feeding", "Staff supervision", "Barriers around bathing area", "Fenced viewing platforms"],
    "tipsAndTricks": [
        "Combine this with a morning trip to the Ayutthaya ruins — they're 10 minutes apart.",
        "Buy bananas from the vendors at the entrance (฿20) instead of the prepackaged ones inside (฿100).",
        "The elephant bathing session at 10am is the best photo op — they splash and play for 30 minutes.",
        "Visit on a weekday to avoid the worst of the tour bus crowds."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80",
        "https://images.unsplash.com/photo-1738023354227-16a406891bd2?w=800&q=80",
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80"
    ],
    "parentStory": {
        "title": "An elephant kissed my 4-year-old",
        "excerpt": "A rescued elephant reached through the fence and gently touched her cheek. She still talks about 'her elephant friend.'",
        "author": "Rachel, mom of 2 from Melbourne",
        "fullStory": "We almost skipped Ayutthaya because Bangkok traffic is brutal. Best decision to go. The elephant kraal is ethically run — the elephants are retired from logging and tourism, not chained or forced to perform. Our 4-year-old was mesmerized watching them bathe. One elephant reached through the fence and gently touched her cheek with its trunk. She didn't speak for 5 minutes — just stared. Now she calls it 'her elephant friend.'"
    },
    "itineraryComparison": {
        "halfDay": "Morning elephant feeding + ruins tour, lunch in Ayutthaya, return to Bangkok",
        "fullDay": "Add Ayutthaya Historical Park, boat tour around the island, sunset temple visit",
        "bestFor": "Ages 2-14, gentle animal encounters, history + nature combo"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Ayutthaya with kids", "elephant day trip Bangkok", "Thailand family temples", "ethical elephant sanctuary"]
})

# 2. Ayutthaya Historical Park Bike Tour
entries.append({
    "id": "ayutthaya-002",
    "name": "Ayutthaya Historical Park Bike Tour",
    "city": "Ayutthaya",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "4-16",
    "safetyRating": 3.8,
    "priceRange": "$",
    "popularity": 72,
    "description": "Pedal through 400-year-old temple ruins on flat, car-free paths. Kids ride in trailers or on their own bikes past iconic Buddha heads and towering prangs.",
    "location": "Ayutthaya Historical Park, Phra Nakhon Si Ayutthaya",
    "bestTime": "November-February, 7am-10am before the heat builds",
    "imageUrl": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    "amenities": ["Bike Rentals", "Bike Trailers for Toddlers", "Water Refill Stations", "Restrooms", "Shaded Routes"],
    "safetyFeatures": ["Bike helmets included", "Designated bike lanes in parts", "Traffic-light pedestrian zones", "Flat terrain"],
    "tipsAndTricks": [
        "Rent bikes from outside the park (฿50/hr) not inside (฿150/hr) — same quality, huge price difference.",
        "Get a bike trailer with a canopy if your youngest is under 5 — the sun is intense by 10am.",
        "Start at Wat Mahathat (the Buddha in tree roots) and ride clockwise to avoid backtracking.",
        "Bring a reusable water bottle — there are free refill stations at every temple entrance."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
    ],
    "parentStory": {
        "title": "Our 5-year-old biked through a UNESCO site",
        "excerpt": "We rented a tiny bike with training wheels and she pedaled past 600-year-old temples like she owned the place.",
        "author": "Tom, dad of 1 from Singapore",
        "fullStory": "My daughter learned to ride a bike three months before this trip. I was nervous about traffic. Turns out most of the park is pedestrian-only in the morning. She wobbled past ancient Buddha statues, crashed into a bush twice, and got back up laughing. It wasn't about seeing the temples — it was about watching her discover she could do hard things."
    },
    "itineraryComparison": {
        "halfDay": "Bike tour 7-10am, stop at Wat Mahathat and Wat Phra Si Sanphet, lunch at a riverside restaurant",
        "fullDay": "Full temple circuit by bike, boat tour of the island, Ayutthaya Floating Market in the afternoon",
        "bestFor": "Ages 4-16, active families, history buffs who want to cover ground"
    },
    "commissionRate": "3%",
    "seoKeywords": ["Ayutthaya bike tour kids", "family cycling Thailand", "temple ruins cycling", "Ayutthaya with children"]
})

# 3. Krabi Railay Beach
entries.append({
    "id": "krabi-001",
    "name": "Railay Beach Family Day",
    "city": "Krabi",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "0-16",
    "safetyRating": 4.2,
    "priceRange": "$$",
    "popularity": 85,
    "description": "Stunning limestone-framed beach accessible only by longtail boat. Calm turquoise water, soft sand, and tide pools perfect for toddlers to explore.",
    "location": "Railay Beach, Krabi (15-min longtail boat from Ao Nang)",
    "bestTime": "November-April, morning 8-11am for calmest water",
    "imageUrl": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    "amenities": ["Beachfront Restaurants", "Restrooms", "Beach Chair Rentals", "Kayak Rentals", "Shaded Areas Under Cliffs"],
    "safetyFeatures": ["Lifeguard patrol (high season)", "Calm east bay for swimming", "Rope rails on cliff trails", "No motorized vehicles"],
    "tipsAndTricks": [
        "Take a longtail from Ao Nang (฿100/person) not a speedboat — kids love the ride and it's half the price.",
        "Bring water shoes — the sand is soft but the rocks near the cliffs can be sharp for little feet.",
        "The east beach (Ton Sai side) has calmer water for toddlers. West beach has bigger waves for older kids.",
        "Pack a picnic lunch — restaurant prices on Railay are 2-3x Ao Nang prices."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1506751331345-831a30d5a740?w=800&q=80",
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
        "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=800&q=80"
    ],
    "parentStory": {
        "title": "My toddler discovered her first hermit crab",
        "excerpt": "She spent 45 minutes watching a hermit crab swap shells. Not bored for a second. Pure toddler magic.",
        "author": "Maya, mom of 1 from Berlin",
        "fullStory": "I expected Railay to be a 'get in, take a photo, leave' kind of beach. My 2-year-old had other plans. She found a hermit crab in a tide pool within 5 minutes and spent almost an hour watching it move between shells. She named it 'Shelly.' We ended up staying 4 hours. I read a book under a limestone cliff while she played in the shallows. Best beach day of our lives."
    },
    "itineraryComparison": {
        "halfDay": "Morning longtail boat, 3 hours on Railay East beach, lunch, return by 1pm",
        "fullDay": "Both East and West beaches, kayak around the peninsula, hike to Railay viewpoint, sunset at West beach",
        "bestFor": "Ages 0-12, beach families, toddlers and crawlers"
    },
    "commissionRate": "4%",
    "seoKeywords": ["Railay Beach with kids", "Krabi family beach", "Thailand beaches toddlers", "Ao Nang family day trip"]
})

# 4. Krabi Emerald Pool
entries.append({
    "id": "krabi-002",
    "name": "Emerald Pool & Hot Springs",
    "city": "Krabi",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "2-14",
    "safetyRating": 3.5,
    "priceRange": "$",
    "popularity": 76,
    "description": "Natural emerald-green pool fed by hot springs in the middle of a rainforest. Kids can wade in warm mineral water while parents soak in the hot springs just upstream.",
    "location": "Khao Phra Bang Khram Nature Reserve, Krabi (40 min from Ao Nang)",
    "bestTime": "Weekdays at 8am opening to avoid tour bus crowds",
    "imageUrl": "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
    "amenities": ["Changing Rooms", "Restrooms", "Lockers", "Food Stalls Outside", "Parking", "Boardwalk Paths"],
    "safetyFeatures": ["Life jackets available for kids", "Slippery rock warnings", "Rope boundaries in deep areas", "Staff at entry/exit points"],
    "tipsAndTricks": [
        "Arrive at 8am sharp when the gates open — by 10am it's packed with tour groups and you'll queue 30+ minutes.",
        "Bring water shoes with good grip. The rocks are extremely slippery and kids will fall without them.",
        "Skip the hot springs if your kids are under 3 — the water is too hot (40C) and they won't enjoy it.",
        "The Blue Pool is 1.5km further in the forest and much quieter — worth the walk if you have older kids."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=800&q=80",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
    ],
    "parentStory": {
        "title": "The warm pool that cured our jetlag",
        "excerpt": "The Emerald Pool at 8am felt like a giant bath. My 4-year-old didn't want to leave.",
        "author": "David, dad of 1 from London",
        "fullStory": "After 12 hours flying with a 4-year-old, we were zombies. Someone suggested the hot springs as a gentle first day activity. Best advice ever. The forest walk is beautiful — boardwalks the whole way. The pool is bright blue-green, like a swimming pool made by nature. The water is bath-warm. My son floated with his water wings for an hour, splashing and laughing. Jetlag? What jetlag?"
    },
    "itineraryComparison": {
        "halfDay": "Emerald Pool + hot springs 8-11am, lunch at the food stalls, back to hotel for nap",
        "fullDay": "Add Tiger Cave Temple hike (not for young kids) or Krabi town afternoon market",
        "bestFor": "Ages 2-12, families who love warm water and nature walks"
    },
    "commissionRate": "3%",
    "seoKeywords": ["Emerald Pool Krabi kids", "Krabi hot springs family", "Thailand natural pools", "Krabi nature reserve with children"]
})

# 5. Koh Samui Butterfly Garden
entries.append({
    "id": "kohsamui-001",
    "name": "Samui Butterfly Garden",
    "city": "Koh Samui",
    "country": "Thailand",
    "category": "Zoos & Aquariums",
    "ageRange": "0-12",
    "safetyRating": 4.6,
    "priceRange": "$",
    "popularity": 62,
    "description": "Enclosed tropical garden with hundreds of free-flying butterflies, a small insect museum, and a koi pond. Calm, beautiful, and perfectly sized for short attention spans.",
    "location": "144 Moo 2, Hua Thanon, Koh Samui (near Lamai Beach)",
    "bestTime": "9-11am when butterflies are most active in the sun",
    "imageUrl": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    "amenities": ["Restrooms", "Seating Areas", "Shaded Paths", "Gift Shop", "Parking"],
    "safetyFeatures": ["Enclosed net prevents escapes", "Non-slip paths", "Hand wash stations", "Gentle slope walkways"],
    "tipsAndTricks": [
        "Wear bright colors like pink or yellow — butterflies land on you more when you're colorful.",
        "Skip the bug museum if kids are under 5 — pinned insects creep out most toddlers.",
        "Combine with the Samui Aquarium (same road, 5 minutes away) for a half-day outing.",
        "Adults are 200 baht, kids under 120cm are free — one of the cheapest attractions on the island."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1503256200498-2e6f4c310d9f?w=800&q=80",
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
        "https://images.unsplash.com/photo-1524253482453-3b9bebb08a23?w=800&q=80"
    ],
    "parentStory": {
        "title": "A butterfly landed on her nose and she held her breath for a full minute",
        "excerpt": "A huge blue butterfly landed right on her nose. She froze, eyes wide. When it flew away she whispered 'again.'",
        "author": "Lisa, mom of 1 from Seoul",
        "fullStory": "My daughter is a ball of energy — never sits still. At the Butterfly Garden, a Blue Morpho landed on her outstretched finger. She didn't move for a solid 60 seconds. I've never seen her that still. The koi pond at the end was the perfect cool-down. We spent 200 baht on fish food pellets and she thought she'd won the lottery."
    },
    "itineraryComparison": {
        "halfDay": "Butterfly Garden 9am, Samui Aquarium 10:30am, lunch at Lamai Beach",
        "fullDay": "Add Lamai Beach swimming, Hin Ta Hin Ya rock formations, and Lamai night market",
        "bestFor": "Ages 0-8, quiet nature lovers, toddlers and preschoolers"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Samui Butterfly Garden", "Koh Samui kids activities", "Samui family attractions", "butterfly garden Thailand kids"]
})

# 6. Koh Samui Aquarium
entries.append({
    "id": "kohsamui-002",
    "name": "Samui Aquarium & Tiger Zoo",
    "city": "Koh Samui",
    "country": "Thailand",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 3.2,
    "priceRange": "$$",
    "popularity": 58,
    "description": "Oceanarium with local marine life in underwater tunnels plus a zoo area. Kids love the feeding shows and the colorful reef fish displays.",
    "location": "33/2 Moo 2, Hua Thanon, Koh Samui",
    "bestTime": "10am for the seal show, then 11am for the tiger feeding",
    "imageUrl": "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
    "amenities": ["Restrooms", "Food Court", "Gift Shop", "Parking", "Shaded Seating for Shows"],
    "safetyFeatures": ["Glass barriers at tiger enclosure", "Staff throughout facility", "Hand sanitizer stations", "Emergency exits clearly marked"],
    "tipsAndTricks": [
        "Arrive by 9:45am to get good seats for the 10am seal show — it's the highlight and fills up fast.",
        "The tiger zoo section has mixed reviews. Skip it if uneasy about animal welfare — the aquarium alone is worth the entry.",
        "Buy tickets online for a 15% discount. Walk-up price is 700 baht adult, 350 baht kid.",
        "Combine with the Butterfly Garden next door — they're a 5-minute walk apart."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80",
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
        "https://images.unsplash.com/photo-1718863336605-5e9c7c738336?w=800&q=80"
    ],
    "parentStory": {
        "title": "The seal show stole our hearts",
        "excerpt": "A rescued seal does tricks, high-fives kids, and paints with a brush. My 3-year-old got a seal kiss.",
        "author": "Emma, mom of 1 from Sydney",
        "fullStory": "I was skeptical about the Tiger Zoo part (it's not great), but the aquarium is genuinely wonderful. The seal show is the highlight — a rescued seal named Samui does tricks, paints, and kisses volunteers. My daughter was picked to go up and get a 'seal kiss' on the cheek. She didn't wash her face for the rest of the day."
    },
    "itineraryComparison": {
        "halfDay": "Seal show 10am, aquarium walkthrough, lunch, head out by 1pm",
        "fullDay": "Add Butterfly Garden + Lamai Beach afternoon",
        "bestFor": "Ages 2-12, marine life lovers, show-focused families"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Samui Aquarium", "Koh Samui with kids", "Samui seal show", "Samui family day out"]
})

# 7. Da Lat Flower Gardens
entries.append({
    "id": "dalat-001",
    "name": "Da Lat Flower Gardens",
    "city": "Da Lat",
    "country": "Vietnam",
    "category": "Parks & Nature",
    "ageRange": "0-14",
    "safetyRating": 4.5,
    "priceRange": "$",
    "popularity": 65,
    "description": "8 hectares of perfectly manicured flower gardens in cool mountain weather. Orchids, hydrangeas, and roses bloom year-round in Vietnam's flower capital.",
    "location": "2 Phu Dong Thien Vuong, Da Lat city center",
    "bestTime": "December-March for peak bloom, any morning 8-10am",
    "imageUrl": "https://images.unsplash.com/photo-1599387433955-63ea3540497d?w=800&q=80",
    "amenities": ["Restrooms", "Benches Throughout", "Shaded Walkways", "Souvenir Stalls", "Parking", "Coffee Shop"],
    "safetyFeatures": ["Well-paved paths", "Fenced garden beds", "First aid station at entrance", "Garden staff patrolling"],
    "tipsAndTricks": [
        "Entry is only 50,000 VND ($2) — one of the cheapest family activities in Da Lat.",
        "Visit during the annual Flower Festival (late December) for incredible floral displays.",
        "Bring a light jacket — Da Lat is cool year-round and the garden is even cooler than the town.",
        "Combine with the nearby Valley of Love for a full morning of outdoor activities."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1508597370841-836e72ef6f54?w=800&q=80",
        "https://images.unsplash.com/photo-1485257334450-84ec1ba6393d?w=800&q=80",
        "https://images.unsplash.com/photo-1737040009019-1576b1342b0e?w=800&q=80"
    ],
    "parentStory": {
        "title": "She touched a real orchid for the first time",
        "excerpt": "My urban kid was mesmerized by flowers growing from the ground. She only knew them from cartoons.",
        "author": "Minh, dad of 1 from Ho Chi Minh City",
        "fullStory": "We live in Saigon — concrete, traffic, skyscrapers. My 3-year-old thought flowers only existed in Peppa Pig. At the Da Lat Flower Gardens, she walked through rows of hydrangeas taller than her and touched real petals for the first time. We stayed for 2 hours just wandering. The cool mountain air was a bonus."
    },
    "itineraryComparison": {
        "halfDay": "Flower Garden 8:30-10am, walk around Xuan Huong Lake, lunch at a cafe",
        "fullDay": "Add Valley of Love, Da Lat Cable Car, and Truc Lam Pagoda",
        "bestFor": "Ages 0-12, flower lovers, families wanting a calm outdoor morning"
    },
    "commissionRate": "3%",
    "seoKeywords": ["Da Lat Flower Gardens", "Da Lat with kids", "Da Lat family activities", "Vietnam flower garden kids"]
})

# 8. Da Lat Alpine Coaster
entries.append({
    "id": "dalat-002",
    "name": "Alpine Coaster at Datanla Waterfall",
    "city": "Da Lat",
    "country": "Vietnam",
    "category": "Theme Parks",
    "ageRange": "4-16",
    "safetyRating": 4.0,
    "priceRange": "$",
    "popularity": 80,
    "description": "Thrilling 1.2km alpine roller coaster through pine forest down to Datanla Waterfall. Riders control their own speed — slow for young kids, fast for thrill-seekers.",
    "location": "Datanla Tourist Area, Prenn Pass, Da Lat (20 min from city center)",
    "bestTime": "9am opening to avoid the 2-hour queues that build by midday",
    "imageUrl": "https://images.unsplash.com/photo-1594103345324-16aa1bcffdb9?w=800&q=80",
    "amenities": ["Parking", "Restrooms", "Food Court", "Cable Car", "Picnic Areas"],
    "safetyFeatures": ["Individual brake controls", "Seat belts on each cart", "Height requirement: 100cm minimum", "Staff at start/end of track"],
    "tipsAndTricks": [
        "GET THERE BY 8:45AM. The queue hits 60-90 minutes by 10am. First thing you'll walk straight on.",
        "Kids under 100cm can ride with an adult on a double cart — perfect for nervous first-timers.",
        "Don't buy the combo ticket for adventure activities unless kids are over 10 — rope course is too advanced.",
        "The waterfall itself is 2km of stairs down. Skip it with toddlers."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1612276036430-e7240b151bd0?w=800&q=80",
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
        "https://images.unsplash.com/photo-1508597370841-836e72ef6f54?w=800&q=80"
    ],
    "parentStory": {
        "title": "My 5-year-old drove and I screamed",
        "excerpt": "She grabbed the speed lever and floored it. I held on for dear life while she cackled.",
        "author": "Sarah, mom of 1 from Singapore",
        "fullStory": "I thought the alpine coaster would be a gentle ride with me controlling the brake. My 5-year-old had other plans. She grabbed the speed lever and pushed it all the way. We flew down the mountain while she laughed hysterically. I was terrified and euphoric at the same time. We rode it 4 times."
    },
    "itineraryComparison": {
        "halfDay": "Alpine coaster 9am, waterfall viewing platform, lunch at Datanla cafe, back to town",
        "fullDay": "Add cable car to Truc Lam Pagoda, Da Lat Flower Garden, and afternoon at Valley of Love",
        "bestFor": "Ages 5-14, thrill-seeking families, anyone who loves roller coasters"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Datanla Waterfall coaster", "Da Lat alpine coaster kids", "Da Lat theme park", "Da Lat family activities", "Vietnam roller coaster"]
})

# 9. VinWonders Nha Trang
entries.append({
    "id": "nhatrang-001",
    "name": "VinWonders Nha Trang",
    "city": "Nha Trang",
    "country": "Vietnam",
    "category": "Theme Parks",
    "ageRange": "2-16",
    "safetyRating": 4.7,
    "priceRange": "$$$",
    "popularity": 88,
    "description": "Massive island theme park reached by the world's longest sea cable car. Water park, aquarium, thrill rides, and a castle-themed area. Full-day destination.",
    "location": "Hon Tre Island, Nha Trang (15-min cable car from mainland)",
    "bestTime": "Weekdays, right at 8am opening to ride the cable car before crowds",
    "imageUrl": "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
    "amenities": ["Restaurants", "Restrooms Throughout", "Baby Care Rooms", "Stroller Rentals", "Lockers", "Shaded Seating Areas"],
    "safetyFeatures": ["Height requirements on all rides", "Life jackets at water park", "First aid stations", "Lost child center", "Security throughout"],
    "tipsAndTricks": [
        "Ride the cable car at sunset on the way back — the view of Nha Trang Bay is unforgettable.",
        "Hit the water park first (opens 9am) before it gets packed. The wave pool is the main draw.",
        "Skip the aquarium if you've been to a good one — it's average and time is better spent on rides.",
        "Bring a change of clothes for everyone — you'll get soaked in the water park.",
        "The on-site restaurants are overpriced. Pack sandwiches and buy drinks inside."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
        "https://images.unsplash.com/photo-1724892053773-cd28a4f6a622?w=800&q=80",
        "https://images.unsplash.com/photo-1735796788543-c99c460a0800?w=800&q=80"
    ],
    "parentStory": {
        "title": "The cable car ride was worth the ticket alone",
        "excerpt": "My 6-year-old pressed her face to the glass the entire 15-minute ride across the bay, gasping at every boat.",
        "author": "Wei, dad of 1 from Shanghai",
        "fullStory": "I was skeptical about the $60 ticket price. But the cable car ride across Nha Trang Bay — 3.3km over turquoise water — is world-class. My daughter narrated the entire journey. The park is clean and organized. The water park was the highlight. We spent 6 hours and she passed out before we got back to the hotel."
    },
    "itineraryComparison": {
        "halfDay": "Cable car in, 3-4 rides, water park splash, lunch, cable car back by 2pm",
        "fullDay": "Cable car at 8am, all zones, water park, shows, fireworks, cable car back at sunset",
        "bestFor": "Ages 3-14, thrill rides and water parks, families who want a full theme park day"
    },
    "commissionRate": "8%",
    "seoKeywords": ["VinWonders Nha Trang", "Nha Trang theme park kids", "Hon Tre Island family", "Nha Trang water park", "Vietnam amusement park"]
})

# 10. Hon Mun Island Snorkeling
entries.append({
    "id": "nhatrang-002",
    "name": "Hon Mun Island Snorkeling",
    "city": "Nha Trang",
    "country": "Vietnam",
    "category": "Parks & Nature",
    "ageRange": "4-16",
    "safetyRating": 3.6,
    "priceRange": "$$",
    "popularity": 74,
    "description": "Snorkel in crystal-clear water at Hon Mun Marine Protected Area, home to the most diverse coral reef in Vietnam. Colorful fish, sea turtles, and pristine visibility.",
    "location": "Hon Mun Island, Nha Trang Bay (20-min boat from Nha Trang harbor)",
    "bestTime": "March-September, 8-11am for best visibility",
    "imageUrl": "https://images.unsplash.com/photo-1546029361-2e9d4d1d8f7a?w=800&q=80",
    "amenities": ["Boat Tours Include Equipment", "Life Jackets", "Floating Platforms", "Restrooms on Island", "Food Served on Boat"],
    "safetyFeatures": ["Life jackets mandatory for kids", "Guides in water with groups", "Floating ring buoys", "Boat crew trained in water rescue"],
    "tipsAndTricks": [
        "Book a private longtail boat (1.5M VND) instead of a group tour — more flexibility if kids get tired.",
        "Bring your own snorkel mask — the provided ones often leak, which terrifies young kids.",
        "Avoid boats offering 'lunch on the island' — the food is mediocre and eats snorkeling time.",
        "Kids who can't swim can use a life jacket and float ring — guides are patient with beginners.",
        "Seasickness meds 30 min before departure are non-negotiable. The water gets choppy."
    ],
    "gallery": [
        "https://images.unsplash.com/photo-1506751331345-831a30d5a740?w=800&q=80",
        "https://images.unsplash.com/photo-1644327981167-fbd67b34ba72?w=800&q=80",
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80"
    ],
    "parentStory": {
        "title": "My 5-year-old saw Nemo and screamed underwater",
        "excerpt": "She spotted a clownfish and tried to yell 'NEMO!' through her snorkel. Water everywhere. Worth it.",
        "author": "Amanda, mom of 1 from Hong Kong",
        "fullStory": "I was nervous about taking a 5-year-old snorkeling. The guides were incredible — they held her hand and pointed out fish. When she saw a clownfish in an anemone, she jerked up, ripped out her snorkel, and screamed 'NEMO MOMMY NEMO!' The mask flooded. She didn't care. We put it back on and she went straight back down."
    },
    "itineraryComparison": {
        "halfDay": "8am boat pickup, snorkel 9-11am, return by noon, lunch at Nha Trang harbor",
        "fullDay": "Add Mun Island beach stop, lunch on boat, Hon Tam Island visit, return 3pm",
        "bestFor": "Ages 5-14, first-time snorkelers, marine life enthusiasts"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Hon Mun Island", "Nha Trang snorkeling kids", "Nha Trang coral reef", "Vietnam family snorkeling"]
})

# 11. Borobudur Sunrise
entries.append({
    "id": "yogya-001",
    "name": "Borobudur Temple Sunrise with Kids",
    "city": "Yogyakarta",
    "country": "Indonesia",
    "category": "Parks & Nature",
    "ageRange": "4-16",
    "safetyRating": 3.3,
    "priceRange": "$$",
    "popular