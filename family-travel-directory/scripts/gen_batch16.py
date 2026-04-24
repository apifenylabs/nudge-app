#!/usr/bin/env python3
"""Generate batch-thailand-deep-extra.json with 15 entries."""
import json

data = []

# 1. Bangkok - Lumphini Park
data.append({
    "id": "bangkok-007",
    "name": "Lumphini Park Family Day",
    "city": "Bangkok",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "0-12",
    "safetyRating": 4.7,
    "priceRange": "$",
    "popularity": 83,
    "description": "Bangkok's answer to Central Park \u2014 a sprawling 142-acre green oasis in the heart of the city. Paddleboats on the lake, monitor lizards sunbathing on the banks, shaded playgrounds, and wide paths perfect for strollers and training wheels.",
    "location": "192 Wireless Road, Pathum Wan, Bangkok",
    "bestTime": "Early morning (6-8 AM) or late afternoon (4-6 PM)",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "amenities": ["Paddleboat Rentals", "Playgrounds", "Jogging Paths", "Shaded Picnic Areas", "Public Toilets", "Outdoor Gym"],
    "safetyFeatures": ["Park Rangers on Duty", "Fenced Play Areas", "Well-Lit Paths", "First Aid Station at Main Gate", "Lifeguards at Boat Dock"],
    "tipsAndTricks": [
        "Come at sunrise. The park opens at 4:30 AM and the 6-8 AM slot is magical \u2014 cool weather, no crowds, and the monitor lizards are most active.",
        "Rent the swan paddleboats early (they run out by 10 AM). Kids under 3 ride free on a parent's lap.",
        "Bring bread or lettuce for the enormous catfish in the lake \u2014 they swarm to the surface when fed and kids love it.",
        "The playground near the south gate is best for toddlers (soft flooring, smaller slides). The north one is for big kids 6+.",
        "Don't touch the monitor lizards. They're harmless if left alone but will hiss if startled. Keep kids at least 3 meters away."
    ],
    "parentStory": {
        "title": "She spent an entire hour watching ONE lizard",
        "excerpt": "I dragged my 4-year-old to Lumphini expecting a quick jog. She spotted a monitor lizard near the lake and sat cross-legged on the grass watching it for 55 minutes. I got zero exercise. She got the best morning of her life.",
        "author": "Priya, mom of 1 from Mumbai",
        "fullStory": "We live 10 minutes from Lumphini and I'd never taken my daughter because I thought parks were boring for her. Wrong. The monitor lizards are basically dinosaurs to a 4-year-old. We saw three of them during our visit. She named them all (Steve, Tiny Steve, and Big Steve). Now we go every Saturday morning and it's become our ritual."
    },
    "itineraryComparison": {
        "halfDay": "1-2 hours: paddleboats, playground, lizard spotting",
        "fullDay": "Full morning: boat rental, both playgrounds, picnic lunch, nature walk around the entire lake",
        "bestFor": "Ages 0-10, budget travelers, families needing a green break from Bangkok chaos"
    },
    "commissionRate": "2%",
    "seoKeywords": ["Lumphini Park Bangkok", "free things to do Bangkok with kids", "family park Bangkok", "Bangkok nature with toddlers"],
    "gallery": [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
    ]
})

# 2. Bangkok - Art & Culture Centre
data.append({
    "id": "bangkok-008",
    "name": "Bangkok Art & Culture Centre",
    "city": "Bangkok",
    "country": "Thailand",
    "category": "Museums",
    "ageRange": "4-16",
    "safetyRating": 4.8,
    "priceRange": "$",
    "popularity": 76,
    "description": "A stunning contemporary art space with 11 floors of rotating exhibitions, a kids' hands-on art lab, and a spiral walkway that makes the journey as fun as the destination. Most galleries are free and the entire centre is stroller-friendly.",
    "location": "939 Rama I Road, Wang Mai, Pathum Wan, Bangkok (opposite MBK Center)",
    "bestTime": "Weekday afternoons (Tuesday-Friday, 11 AM-2 PM)",
    "imageUrl": "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=800&q=80",
    "amenities": ["Kids' Art Lab", "Cafe on 1st Floor", "Bookshop", "Free Lockers", "Nursing Room", "Elevator Access All Floors"],
    "safetyFeatures": ["Security at All Entrances", "Shatterproof Display Cases", "Non-Slip Floors", "Emergency Exits on Every Floor", "Staff in Every Gallery"],
    "tipsAndTricks": [
        "Start at the 7th floor and walk DOWN the spiral ramp. The ramp is the highlight \u2014 kids love the gradual descent past changing exhibits.",
        "The kids' art lab (3rd floor) has free paper, crayons, and craft supplies. Plan at least 30 minutes here.",
        "Some galleries have interactive digital installations. Let kids touch the screens \u2014 the security guards are friendly and will tell you which ones are hands-on.",
        "Cross the skywalk to MBK Center for lunch \u2014 the food court on the 6th floor has cheap, kid-friendly Thai food.",
        "The glass elevator gives amazing views of the spiral interior. Ride it up and down at least once."
    ],
    "parentStory": {
        "title": "My son asked if Art could be 'just a feeling'",
        "excerpt": "A 6-year-old looked at an abstract painting and said, 'I think the artist was sad when he made this. But then he got happy.' The museum guard nodded. I almost cried. Art does that to kids.",
        "author": "David, dad of 1 from Sydney",
        "fullStory": "I expected my son to be bored within 10 minutes. Instead, he spent 45 minutes in the contemporary gallery asking questions about every piece. The staff handed him a 'Junior Art Detective' activity sheet (ask at the information desk). He walked through the entire space like a tiny art critic. Best free activity in Bangkok."
    },
    "itineraryComparison": {
        "halfDay": "2 hours: spiral ramp, main galleries, kids' art lab, cafe",
        "fullDay": "3-4 hours: full museum + lunch at MBK + nearby Jim Thompson House Museum",
        "bestFor": "Ages 4-16, creative kids, rainy day activity, budget families"
    },
    "commissionRate": "3%",
    "seoKeywords": ["Bangkok Art and Culture Centre", "free museum Bangkok kids", "indoor activity Bangkok children", "BACC Bangkok family"],
    "gallery": [
        "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=800&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80"
    ]
})

# 3. Phuket - Elephant Sanctuary
data.append({
    "id": "phuket-005",
    "name": "Phuket Elephant Sanctuary",
    "city": "Phuket",
    "country": "Thailand",
    "category": "Zoos & Aquariums",
    "ageRange": "3-12",
    "safetyRating": 4.9,
    "priceRange": "$$$",
    "popularity": 92,
    "description": "An ethical elephant sanctuary where rescued elephants roam freely in a 30-acre natural habitat. No riding, no hooks \u2014 just observation, feeding, and mud baths. Your visit directly funds their care and rehabilitation.",
    "location": "100 Moo 2, Paklok, Thalang, Phuket",
    "bestTime": "Morning session (6:30 AM-12 PM, cooler and elephants more active)",
    "imageUrl": "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
    "amenities": ["Observation Platforms", "Shaded Viewing Areas", "Restrooms", "Gift Shop", "Changing Rooms", "Complimentary Water"],
    "safetyFeatures": ["Professional Guides at All Times", "Safety Zones 10m from Elephants", "Emergency Evacuation Plan", "Trained Medical Staff On-site", "Fenced Viewing Areas"],
    "tipsAndTricks": [
        "Book the morning session (6:30 AM). The elephants are most playful before noon and the afternoon heat makes them lazy.",
        "Wear dark, quick-dry clothes for the mud bath observation. You'll get splashed (and that's a good thing).",
        "Children under 3 are free but must stay in a carrier or stroller \u2014 no walking near the elephants for safety.",
        "Bring a reusable water bottle. Refill stations are everywhere and single-use plastic isn't allowed on site.",
        "Teach your kids about elephant conservation beforehand. The sanctuary provides a kid-friendly worksheet at check-in."
    ],
    "parentStory": {
        "title": "She fed a banana to an elephant and whispered 'thank you'",
        "excerpt": "My daughter was nervous about the elephants up close. A guide knelt beside her, showed her how to hold the banana flat on her palm, and an old elephant named Boon Ma gently took it. She whispered 'thank you' and cried happy tears.",
        "author": "Rachel, mom of 2 from Singapore",
        "fullStory": "This isn't a circus or a show. It's a retirement home for elephants who worked in logging or trekking camps. You see them being elephants \u2014 eating, bathing, playing. My 6-year-old asked why some had scars. Our guide explained gently. She learned more about compassion in one morning than in a year of school."
    },
    "itineraryComparison": {
        "halfDay": "Morning session (6:30-12 PM): feeding, mud bath, guided walk",
        "fullDay": "Not needed \u2014 the morning session covers everything",
        "bestFor": "Ages 3-12, animal lovers, families who want ethical tourism"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Phuket Elephant Sanctuary", "ethical elephant experience Phuket", "Phuket family activities", "elephant sanctuary kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
        "https://images.unsplash.com/photo-1506751331345-831a30d5a740?w=800&q=80"
    ]
})

# 4. Phuket - Splash Jungle Water Park
data.append({
    "id": "phuket-006",
    "name": "Splash Jungle Water Park",
    "city": "Phuket",
    "country": "Thailand",
    "category": "Theme Parks",
    "ageRange": "2-14",
    "safetyRating": 4.6,
    "priceRange": "$$",
    "popularity": 81,
    "description": "Phuket's largest water park with a dedicated kids' zone, wave pool, lazy river, and slides ranging from gentle toddler drops to heart-pumping free-fall. Shaded lounge areas and lifeguards at every pool make it a stress-free day for parents.",
    "location": "55 Moo 3, Kathu, Phuket",
    "bestTime": "Weekday mornings right at 10 AM opening",
    "imageUrl": "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
    "amenities": ["Kids' Splash Zone", "Wave Pool", "Lazy River", "Changing Rooms with Lockers", "Restaurant & Snack Bar", "Souvenir Shop"],
    "safetyFeatures": ["Lifeguards at Every Pool and Slide", "Height Requirements Posted", "Non-Slip Decking", "First Aid Station", "Life Jackets Available (Free)"],
    "tipsAndTricks": [
        "Rent a locker at the entrance (200 THB). You'll thank yourself when you don't have to guard your phone and wallet on every ride.",
        "The Kidz zone is perfect for ages 2-7 \u2014 shallow water, mini slides, and a dumping bucket that kids find hilarious.",
        "Buy tickets online at least 24 hours in advance. Walk-up price is 30% more and you skip the queue.",
        "Bring reef-safe sunscreen. The park sells it but at triple the price.",
        "The wave pool runs every hour on the hour for 15 minutes. Time your visit to catch it."
    ],
    "parentStory": {
        "title": "The dumping bucket ruined our lunch \u2014 in the best way",
        "excerpt": "We were eating at the cafe when the giant bucket tipped. My 3-year-old screamed with joy and ran back in. We ate cold sandwiches 45 minutes later. Worth it.",
        "author": "Tom, dad of 2 from Melbourne",
        "fullStory": "Splash Jungle is not fancy. But it's honest fun. The kids' zone kept our 3-year-old and 7-year-old occupied for 4 hours. The lazy river is genuinely relaxing (adults only after 4 PM). We went on a Tuesday and it was quiet enough that our kids could run between slides without us worrying."
    },
    "itineraryComparison": {
        "halfDay": "4 hours: kids' zone, wave pool, lazy river, 2-3 slides",
        "fullDay": "6-8 hours: all slides, multiple wave pool sessions, lunch break, lazy river float",
        "bestFor": "Ages 2-14, hot days, families who need to burn energy"
    },
    "commissionRate": "7%",
    "seoKeywords": ["Splash Jungle Phuket", "water park Phuket kids", "Phuket family day out", "best water parks Thailand families"],
    "gallery": [
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
        "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80"
    ]
})

# 5. Chiang Mai - Night Safari
data.append({
    "id": "chiangmai-006",
    "name": "Chiang Mai Night Safari",
    "city": "Chiang Mai",
    "country": "Thailand",
    "category": "Zoos & Aquariums",
    "ageRange": "3-12",
    "safetyRating": 4.7,
    "priceRange": "$$",
    "popularity": 84,
    "description": "Asia's only nighttime zoo experience where nocturnal animals are at their most active. Ride a tram through open enclosures past giraffes, zebras, and antelope, then walk predator tunnels with big cats prowling above through glass floors.",
    "location": "33 Moo 12, Hang Dong, Chiang Mai",
    "bestTime": "Arrive at 5 PM for the twilight show before the night tram tours begin",
    "imageUrl": "https://images.unsplash.com/photo-1573558290253-fde4fa372d80?w=800&q=80",
    "amenities": ["Night Tram Tours", "Predator Walkway", "Jaguar Trail Zone", "Show Amphitheater", "Restaurants", "Souvenir Shops"],
    "safetyFeatures": ["Enclosed Tram Cars", "Reinforced Glass Barriers", "Trained Tram Guides", "Emergency Phones Along Trail", "Security Patrols"],
    "tipsAndTricks": [
        "Arrive at 5 PM to see the twilight animal show (tigers and leopards being fed). Then take the 6 PM tram before the 7 PM rush.",
        "Buy a bag of carrots and bananas at the entrance for 50 THB. Animals on the tram route will eat from your hand.",
        "The predator tunnel (glass floor above lions) is terrifyingly cool for kids 5+. Under-5s might find it scary.",
        "Bring a light jacket. It gets surprisingly cool at night in the open tram.",
        "Skip the restaurant inside. The food is mediocre. Have dinner at the nearby Kad Farang village after."
    ],
    "parentStory": {
        "title": "A giraffe licked my son's hand clean",
        "excerpt": "Our 5-year-old held his carrot piece too long and a giraffe's 18-inch tongue wrapped around his whole hand. He shrieked, then laughed so hard he couldn't breathe. Best 50 baht I ever spent.",
        "author": "Anna, mom of 2 from Helsinki",
        "fullStory": "I was skeptical about a night zoo \u2014 wouldn't the animals be sleeping? Wrong. The crepuscular animals are most active at dusk. We saw giraffes, zebras, and antelope up close from the tram. The night predators show was incredible (owls flying inches above our heads). My kids still talk about it 6 months later."
    },
    "itineraryComparison": {
        "halfDay": "4-5 PM to 8 PM: twilight show, 2 tram tours, predator walkway",
        "fullDay": "Not needed \u2014 the evening window covers everything",
        "bestFor": "Ages 3-12, animal lovers, families wanting a unique evening activity"
    },
    "commissionRate": "8%",
    "seoKeywords": ["Chiang Mai Night Safari", "night zoo Chiang Mai", "Chiang Mai family activities evening", "nocturnal animals Thailand"],
    "gallery": [
        "https://images.unsplash.com/photo-1573558290253-fde4fa372d80?w=800&q=80",
        "https://images.unsplash.com/photo-1503256200498-2e6f4c310d9f?w=800&q=80",
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80"
    ]
})

# 6. Chiang Mai - Art in Paradise
data.append({
    "id": "chiangmai-007",
    "name": "Art in Paradise 3D Museum",
    "city": "Chiang Mai",
    "country": "Thailand",
    "category": "Museums",
    "ageRange": "3-14",
    "safetyRating": 4.5,
    "priceRange": "$",
    "popularity": 78,
    "description": "An interactive 3D trick-art museum with over 130 painted illusions across 6 zones. Kids become part of the art \u2014 flying on magic carpets, escaping giant crocodiles, or surfing a waterfall. Every painting has a marked best photo spot for perfect perspective shots.",
    "location": "199/9 Chang Klan Road, Chiang Mai (near Night Bazaar)",
    "bestTime": "Weekday mornings (10 AM opening, before school groups arrive)",
    "imageUrl": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
    "amenities": ["Photo Spots Marked", "Air Conditioning", "Shoe Locker", "Gift Shop", "Cafe"],
    "safetyFeatures": ["Non-Slip Floor Markings", "Soft Corners on Installations", "Clear Paths Between Zones", "Staff in Every Gallery", "Emergency Exits Marked"],
    "tipsAndTricks": [
        "Charge your phone or camera fully \u2014 you'll take 100+ photos. There's no charging station inside.",
        "The Underwater World zone (zone 3) is the best for kids 3-6. The Safari zone (zone 5) is best for 7+.",
        "Ask staff to take the photos. They know exactly where to stand for the perspective to work.",
        "Wear socks. You remove shoes at the entrance and the floor can get warm by afternoon.",
        "Combine with a visit to the Chiang Mai Night Bazaar (opens 6 PM) \u2014 it's a 2-minute walk away."
    ],
    "parentStory": {
        "title": "The crocodile painting got us 47 likes",
        "excerpt": "My daughter pretended to be eaten by a giant crocodile and the 3D effect was so convincing our friends asked if we went to a real zoo. The photos are the best souvenirs you'll bring home.",
        "author": "Mike, dad of 2 from Auckland",
        "fullStory": "I rolled my eyes when my wife suggested a 3D museum. I was wrong. This place is genius. Each painting has a diagram showing exactly where to stand and how to pose. The kids became part of the art \u2014 one minute they're escaping a dinosaur, the next they're floating in space. We spent 2 hours there and got 150 photos."
    },
    "itineraryComparison": {
        "halfDay": "1.5-2 hours: all 6 zones, photo session",
        "fullDay": "Combine with Night Bazaar in the evening",
        "bestFor": "Ages 3-14, Instagram families, rainy day activity"
    },
    "commissionRate": "5%",
    "seoKeywords": ["Art in Paradise Chiang Mai", "3D museum Chiang Mai kids", "Chiang Mai indoor activity children", "family photos Chiang Mai"],
    "gallery": [
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80"
    ]
})

# 7. Krabi - Tiger Cave Temple Hike
data.append({
    "id": "krabi-003",
    "name": "Tiger Cave Temple Family Hike",
    "city": "Krabi",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "6-14",
    "safetyRating": 4.3,
    "priceRange": "$",
    "popularity": 77,
    "description": "A challenging but rewarding family hike up 1,237 steps through jungle to a golden Buddha with panoramic views of Krabi's limestone karsts. The lower section has caves, a giant tiger paw print in stone, and friendly monkeys \u2014 you don't need to reach the top for a memorable experience.",
    "location": "Wat Tham Suea, Krabi Noi, Mueang Krabi",
    "bestTime": "7-9 AM (before the heat and after the monkeys settle down)",
    "imageUrl": "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80",
    "amenities": ["Monastery Grounds", "Cave Temple", "Rest Areas Every 100 Steps", "Water Refill Station", "Parking", "Basic Toilets"],
    "safetyFeatures": ["Handrails on Steep Sections", "Non-Slip Step Surface", "Shaded Paths", "Monastery Staff Presence", "First Aid at the Base"],
    "tipsAndTricks": [
        "Don't attempt the full 1,237 steps with kids under 6. The first 200 steps to the cave temple are enough for young children.",
        "Bring at least 1 liter of water per person. There's one refill station at the base and nowhere on the climb.",
        "The monkeys are bold. Don't carry food in open hands or bags. Use sealed ziplocks inside your backpack.",
        "The tiger paw print (at the 50-step mark) is a natural rock formation. Kids love touching where the tiger stepped.",
        "Wear proper hiking sandals or sneakers. Flip-flops are dangerous on the steep sections."
    ],
    "parentStory": {
        "title": "My 7-year-old made it to step 637 and that was enough",
        "excerpt": "She wanted to see the golden Buddha. We got to step 637 and she sat down. A monk passing by gave her a bottle of water and said, 'You're closer to heaven than most people ever get.' She beamed. We turned around happy.",
        "author": "Claire, mom of 1 from Paris",
        "fullStory": "I was anxious about taking my daughter here \u2014 1,237 steps is no joke. But the hike is broken up into sections with shaded rest spots and incredible views at every turn. We went at 7 AM and the jungle was alive with birds and butterflies. The cave temple at the base is beautiful too \u2014 giant Buddha statues and stalactites. Even if you don't reach the top, the experience is unforgettable."
    },
    "itineraryComparison": {
        "halfDay": "2-3 hours: base caves, tiger paw, first 200-400 steps, temple grounds",
        "fullDay": "4-5 hours: full summit attempt with breaks, picnic at top, explore monastery",
        "bestFor": "Ages 6-14, active families, nature lovers"
    },
    "commissionRate": "3%",
    "seoKeywords": ["Tiger Cave Temple Krabi", "Wat Tham Suea family", "Krabi family hike", "free activities Krabi kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80",
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ]
})

# 8. Koh Samui - Angthong Marine Park
data.append({
    "id": "kohsamui-003",
    "name": "Angthong Marine Park Boat Tour",
    "city": "Koh Samui",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "5-14",
    "safetyRating": 4.6,
    "priceRange": "$$$",
    "popularity": 91,
    "description": "A full-day speedboat or big-boat tour through Mu Ko Ang Thong National Marine Park's 42 emerald islands. Snorkel in hidden lagoons, kayak through sea caves, climb to the iconic Emerald Lake viewpoint, and spot wild monkeys on deserted beaches.",
    "location": "Departure from Nathon Pier, Koh Samui (park is 35 km northwest)",
    "bestTime": "March-September (calm seas), depart at 7:30 AM",
    "imageUrl": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    "amenities": ["Snorkeling Equipment", "Kayak Rentals", "Buffet Lunch on Beach", "Life Jackets All Sizes", "Freshwater Rinse", "First Aid Onboard"],
    "safetyFeatures": ["Licensed Boat Operators", "Life Jackets for All Ages", "Emergency Radio on Board", "Trained Crew in Water Rescue", "Weather Monitoring System"],
    "tipsAndTricks": [
        "Choose a BIG boat (not speedboat) if your kids are under 8 or prone to seasickness. Speedboats are faster but way bumpier.",
        "Book a tour that does the Emerald Lake viewpoint FIRST (before the crowds). Most tours do it last when it's packed.",
        "Pack seasickness tablets. Give them 30 minutes before departure. The gulf can get choppy. Don't risk it.",
        "Bring dry bags for phones and clothes. Kayaking can get splashy and you don't want wet everything.",
        "The snorkeling at Talay Nai (Inner Sea) is calm and shallow \u2014 perfect for beginner snorkelers aged 7+."
    ],
    "parentStory": {
        "title": "She saw Nemo and cried actual tears",
        "excerpt": "My 8-year-old had been obsessed with Finding Nemo for years. When she saw a real clownfish among the coral during our snorkel stop, she burst into tears of joy. The guide gave her a high-five. Best day of our entire Thailand trip.",
        "author": "James, dad of 2 from London",
        "fullStory": "I was worried about a 7-hour boat tour with kids. But the tour company we chose (Samui Marine Park Tours) had a dedicated kids' guide who played games and pointed out marine life. The kayaking through sea caves was the highlight \u2014 we paddled into a hidden lagoon surrounded by limestone cliffs. It felt like Jurassic Park."
    },
    "itineraryComparison": {
        "halfDay": "Not possible \u2014 it's a full-day tour (7:30 AM - 4:30 PM)",
        "fullDay": "Full day: 2 snorkel stops, Emerald Lake hike, kayaking, beach lunch, monkey spotting",
        "bestFor": "Ages 5-14, adventurous families, nature lovers, marine enthusiasts"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Angthong Marine Park Koh Samui", "Koh Samui boat tour kids", "family snorkeling Koh Samui", "Angthong National Park family"],
    "gallery": [
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80"
    ]
})

# 9. Hat Yai - Children's Activity Center
data.append({
    "id": "hat-yai-001",
    "name": "Hat Yai Children's Activity Center",
    "city": "Hat Yai",
    "country": "Thailand",
    "category": "Museums",
    "ageRange": "2-10",
    "safetyRating": 4.5,
    "priceRange": "$",
    "popularity": 65,
    "description": "A hands-on science and discovery museum designed for young children. Interactive exhibits on water play, sound waves, light refraction, and a mini construction zone with foam blocks. Everything is built at kid height and designed to be touched, climbed, and explored.",
    "location": "80/1 Thanon Kanjanavanich, Hat Yai (near Prince of Songkla University)",
    "bestTime": "Weekday mornings (Tuesday-Thursday, 9-11 AM)",
    "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    "amenities": ["Interactive Science Exhibits", "Water Play Area", "Construction Zone", "Art & Craft Room", "Air Conditioning", "Parent Lounge"],
    "safetyFeatures": ["Soft Flooring Throughout", "Rounded Corners on All Exhibits", "Staff in Every Zone", "Child-Safe Materials", "Clean and Sanitized Hourly"],
    "tipsAndTricks": [
        "The water play zone is the star \u2014 bring a change of clothes because your kids WILL get soaked.",
        "Tuesday and Thursday are the quietest days. Wednesday has school groups from 10 AM.",
        "The construction zone (foam blocks and mini tools) is best for ages 2-5. Older kids prefer the science exhibits.",
        "There's a small cafe with kid-friendly snacks (fresh fruit, yogurt, sandwiches) but no full meals.",
        "Combine with a visit to Hat Yai Municipal Park (10 minutes away) \u2014 there's a cable car and a small zoo."
    ],
    "parentStory": {
        "title": "We spent 2 hours at the water table",
        "excerpt": "Just water, tubes, funnels, and buckets. My 4-year-old didn't move from that table for 2 hours. Free entertainment. No batteries required.",
        "author": "Siti, mom of 1 from Kuala Lumpur",
        "fullStory": "We drove from KL to Hat Yai for a weekend and found this gem. The center is small but perfectly curated for young kids. The water play exhibit teaches basic physics (flow, gravity, pressure) without them realizing they're learning. My daughter spent 2 hours moving water through tubes and we practically had to carry her out."
    },
    "itineraryComparison": {
        "halfDay": "2-3 hours: science zone, water play, art room",
        "fullDay": "Combine with Hat Yai Municipal Park and Kim Jong Shopping Center",
        "bestFor": "Ages 2-10, rainy days, budget families"
    },
    "commissionRate": "4%",
    "seoKeywords": ["Hat Yai children activity", "Hat Yai with kids", "indoor activities Hat Yai", "Hat Yai family attractions"],
    "gallery": [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
        "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80"
    ]
})

# 10. Kanchanaburi - Erawan National Park
data.append({
    "id": "kanchanaburi-001",
    "name": "Erawan National Park",
    "city": "Kanchanaburi",
    "country": "Thailand",
    "category": "Parks & Nature",
    "ageRange": "4-14",
    "safetyRating": 4.8,
    "priceRange": "$",
    "popularity": 88,
    "description": "Home to Thailand's most stunning seven-tiered waterfall, each level a natural emerald swimming pool. The lower tiers are easy for small children to reach and swim in, while the higher tiers require a moderate jungle hike through bamboo forests populated by wild monkeys and exotic birds.",
    "location": "Erawan National Park, Tha Kradan, Si Sawat, Kanchanaburi",
    "bestTime":