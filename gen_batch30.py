import json

entries = []

# 1. Dominican Republic - Indigenous Eyes Park
entries.append({
    "id": "punta-cana-001",
    "name": "Indigenous Eyes Park (Parque Ojos Indigenas)",
    "city": "Punta Cana",
    "country": "Dominican Republic",
    "category": "Parks & Nature",
    "ageRange": "3-16",
    "safetyRating": 4.7,
    "priceRange": "$$",
    "popularity": 85,
    "description": "A stunning 1,500-acre ecological reserve inside the Punta Cana Resort, featuring 12 freshwater lagoons (indigenous eyes), nature trails through subtropical forest, and a protected beach. Perfect for families who want a safe, guided nature experience with swimming in crystal-clear natural pools.",
    "location": "Punta Cana Resort & Club, Carretera Punta Cana, Punta Cana 23000",
    "bestTime": "Morning 8-11am, November-April",
    "imageUrl": "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=800&q=80",
    "amenities": ["Guided Nature Trails", "Swimming Lagoons", "Restrooms", "Parking", "Shaded Picnic Areas"],
    "safetyFeatures": ["Certified Nature Guides", "Life Jackets Available", "Clearly Marked Trails", "First Aid Station", "Fenced Entry"],
    "tipsAndTricks": [
        "Book the 8am guided tour - it's cooler, less crowded, and you'll spot more iguanas and birds before the heat sets in.",
        "Bring water shoes. The lagoon bottoms are sandy but the trail between them has some rocky patches.",
        "Only 4 of the 12 lagoons are open for swimming. The clearest one is Laguna 8 - it's the deepest and most Instagrammable.",
        "The nature trail is about 1.5km. It's stroller-friendly in a rugged way - better to baby-wear if your kid is under 2.",
        "Pack bug spray. The forest has mosquitoes especially after rain. The resort provides some at the entrance but bring your own."
    ],
    "parentStory": {
        "title": "She thought she was swimming in a giant fishbowl",
        "excerpt": "Our 6-year-old kept calling the lagoon the giant fishbowl because she could see every pebble at the bottom. We spent 2 hours floating in Laguna 8 while parrotfish swam past. The most peaceful family morning of our entire trip.",
        "author": "Emma, mom of 2 from Toronto",
        "fullStory": "I was nervous about taking two young kids into nature in the Caribbean - bugs, currents, who knows what. But the Indigenous Eyes park is so well-managed. Our guide led us slowly, pointing out lizards and tropical flowers. The lagoon swimming was the highlight - waist-deep, no waves, water like glass. My daughter refused to leave."
    },
    "itineraryComparison": {
        "halfDay": "2-hour guided nature walk + swim in 2-3 lagoons, done by noon",
        "fullDay": "Morning walk + lagoon swim + beach time at the reserve's private beach + picnic lunch",
        "bestFor": "Ages 3-16, nature-loving families, first-time snorkelers"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Indigenous Eyes Park Punta Cana", "family nature park Dominican Republic", "freshwater lagoons Punta Cana"],
    "gallery": [
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80",
        "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80"
    ]
})

# 2. Dominican Republic - Manati Park
entries.append({
    "id": "punta-cana-002",
    "name": "Manati Park",
    "city": "Punta Cana",
    "country": "Dominican Republic",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 4.5,
    "priceRange": "$$",
    "popularity": 80,
    "description": "A family-friendly ecological park featuring native Dominican wildlife including flamingos, parrots, sea lions, and manatees. Highlights include interactive dolphin shows, parrot feeding, and a replica Taino village. Compact and easy to navigate with young children.",
    "location": "Av. Espana, Punta Cana 23000",
    "bestTime": "Morning shows at 10am, November-April",
    "imageUrl": "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80",
    "amenities": ["Animal Shows", "Restrooms", "Souvenir Shop", "Food Court", "Shaded Walkways"],
    "safetyFeatures": ["Trained Animal Handlers", "Secure Animal Enclosures", "Hand Sanitizer Stations", "First Aid Station", "Fenced Perimeter"],
    "tipsAndTricks": [
        "Plan your day around the show schedule - the sea lion show at 11am and parrot show at 2pm are the best. Arrive 15 minutes early for good seats in the shade.",
        "Skip the on-site restaurant. It's overpriced and mediocre. There's a nice Dominican restaurant 5 minutes down the road called Don Luca with kid-friendly portions.",
        "The parrot feeding area lets kids hold the birds. Bring a phone lanyard - parrots love shiny objects and will grab for phones.",
        "Manati is small - you can see everything in 2-3 hours. Combine it with a morning at nearby Macao Beach for a balanced day.",
        "Buy tickets online the night before. The walk-up line moves slowly and you'll save 15-20 minutes with pre-booked entry."
    ],
    "parentStory": {
        "title": "He fed a parrot and forgot about iPads for an hour",
        "excerpt": "My 4-year-old son, who usually needs a screen within 30 seconds of sitting still, spent 45 minutes hand-feeding parrots. A green one sat on his shoulder and wouldn't leave. He named it Paco. Best $30 we spent all trip.",
        "author": "David, dad of 1 from Chicago",
        "fullStory": "Manati Park isn't a world-class zoo - it's a Dominican animal park that feels a bit retro. But the kid encounters are fantastic. The parrot feeding area lets you buy a cup of seeds and birds land right on your hands. Our son was terrified at first, then obsessed. The sea lion show made him laugh so hard he snorted. Three hours, zero screens, pure joy."
    },
    "itineraryComparison": {
        "halfDay": "2-3 hours, see all animals, catch 2 shows, done by lunchtime",
        "fullDay": "Not necessary - park is compact. Add Macao Beach or Indigenous Eyes Park in the afternoon",
        "bestFor": "Ages 2-14, animal lovers, families wanting a low-key morning"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Manati Park Punta Cana", "family zoo Dominican Republic", "animal shows Punta Cana kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=800&q=80",
        "https://images.unsplash.com/photo-1550358864-518f202c02ba?w=800&q=80",
        "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800&q=80"
    ]
})

# 3. Dominican Republic - Dolphin Explorer
entries.append({
    "id": "punta-cana-003",
    "name": "Dolphin Explorer Punta Cana",
    "city": "Punta Cana",
    "country": "Dominican Republic",
    "category": "Zoos & Aquariums",
    "ageRange": "3-16",
    "safetyRating": 4.8,
    "priceRange": "$$$",
    "popularity": 88,
    "description": "An interactive dolphin encounter program in a protected natural lagoon at the Punta Cana Resort. Families can swim, play, and learn alongside trained dolphins in a small-group setting. Programs include shallow-water encounters for toddlers and deeper swims for older kids and adults.",
    "location": "Punta Cana Resort & Club, Carretera Punta Cana 23000",
    "bestTime": "Morning sessions 9am, November-April",
    "imageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "amenities": ["Changing Rooms", "Lockers", "Showers", "Underwater Photo Service", "Shaded Viewing Area"],
    "safetyFeatures": ["Marine Biologist Supervision", "Life Jackets Provided", "Small Group Ratio (max 8 per group)", "Emergency Response Team", "Shallow Water Options for Toddlers"],
    "tipsAndTricks": [
        "Book the Dolphin Encounter (waist-deep water, 30 min) for ages 3-6. The Dolphin Swim (deep water, 45 min) is better for ages 7+ who are confident in the water.",
        "The underwater photo package is worth it - $50 gets you 20+ professional photos. Your phone in a waterproof pouch won't get the same shots.",
        "Arrive 30 minutes early for check-in and a safety briefing. Late arrivals may be turned away with no refund.",
        "Pregnant women and kids under 3 can't participate in the full swim program - check the Dolphin Encounter for the most accessible option.",
        "Bring reef-safe sunscreen. Regular sunscreen is not allowed in the lagoon as it harms the dolphins."
    ],
    "parentStory": {
        "title": "The dolphin kissed her and she screamed with joy",
        "excerpt": "For 2 years my daughter had watched dolphin videos every night to fall asleep. When she finally touched one, she cried happy tears. The trainer let her give a hand signal and the dolphin did a backflip. She's 7 and still calls it the best day of my life.",
        "author": "Linda, mom of 1 from New York",
        "fullStory": "I was worried Dolphin Explorer would feel like a tourist trap. It's not. The trainers are genuine marine educators who clearly love the animals. My daughter was nervous until the dolphin nudged her hand. Within 5 minutes she was laughing, splashing, and giving commands. The trainers let each kid have one-on-one time."
    },
    "itineraryComparison": {
        "halfDay": "Dolphin Encounter/Swim session (1-1.5h total), done by 10:30am",
        "fullDay": "Not needed. Combine with Indigenous Eyes Park visit since they're on the same resort property",
        "bestFor": "Ages 3-16, animal lovers, families wanting a bucket-list experience"
    },
    "commissionRate": "12%",
    "seoKeywords": ["dolphin swim Punta Cana", "dolphin encounter kids Dominican Republic", "family dolphin experience Caribbean"],
    "gallery": [
        "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
        "https://images.unsplash.com/photo-1438109491414-7198515b166b?w=800&q=80",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
    ]
})

# 4. Grand Cayman - Cayman Turtle Centre
entries.append({
    "id": "grand-cayman-001",
    "name": "Cayman Turtle Centre",
    "city": "Grand Cayman",
    "country": "Cayman Islands",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 4.7,
    "priceRange": "$$",
    "popularity": 84,
    "description": "A conservation and education centre where families can interact with sea turtles of all sizes, from hatchlings to 600-pound giants. Features turtle pools, a predator reef tank, a nature trail, and a splash park for toddlers. Combines wildlife education with hands-on fun in a safe, well-maintained facility.",
    "location": "825 Northwest Point Road, West Bay, Grand Cayman",
    "bestTime": "Morning 9am-12pm, November-April",
    "imageUrl": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    "amenities": ["Touch Pools", "Splash Park", "Restrooms", "Cafe", "Souvenir Shop", "Shaded Seating Areas"],
    "safetyFeatures": ["Life Guards at Splash Park", "Hand Washing Stations", "Shallow Pools for Toddlers", "First Aid Station", "Fenced Grounds"],
    "tipsAndTricks": [
        "Head straight to the Turtle Touch Pool when you arrive - it has the smallest hatchlings and kids under 5 love holding them. It gets crowded after 10am.",
        "The splash park is included in admission. Bring swimsuits and towels even if you think you won't use them. Kids see the water and can't resist.",
        "Skip the on-site cafe. Walk 3 minutes to Macabuca next door - it has better food, cheaper prices, and ocean views.",
        "The nature trail behind the centre takes 15 minutes and has native birds and iguanas. Good for burning off post-lunch energy.",
        "Buy a Turtle Feeder cup ($5) at the front desk. The big turtles in the main pond will swim right up to your kids."
    ],
    "parentStory": {
        "title": "Holding a baby turtle broke something in me (in a good way)",
        "excerpt": "My 5-year-old daughter gently held a hatchling the size of her palm. She whispered to it for 5 minutes. When she put it back, she looked at me with total seriousness and said I'm going to save ALL the turtles. We've been donating to sea turtle conservation ever since.",
        "author": "Rachel, mom of 1 from Boston",
        "fullStory": "I honestly thought Cayman Turtle Centre was just a tourist trap. It's actually doing meaningful conservation work - breeding endangered green sea turtles and releasing them. The touch pool is supervised by knowledgeable staff who explain everything. My daughter learned more about marine conservation in 2 hours than I could teach in a year."
    },
    "itineraryComparison": {
        "halfDay": "2-3 hours: touch turtles, splash park, nature trail, done by lunch",
        "fullDay": "Not needed. Combine with Stingray City or Seven Mile Beach in the afternoon",
        "bestFor": "Ages 2-14, animal lovers, families wanting educational fun"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Cayman Turtle Centre", "Grand Cayman with kids", "sea turtle encounter Cayman Islands"],
    "gallery": [
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80"
    ]
})

# 5. Grand Cayman - Stingray City Sandbar Tour
entries.append({
    "id": "grand-cayman-002",
    "name": "Stingray City Sandbar Tour",
    "city": "Grand Cayman",
    "country": "Cayman Islands",
    "category": "Zoos & Aquariums",
    "ageRange": "3-16",
    "safetyRating": 4.9,
    "priceRange": "$$$",
    "popularity": 95,
    "description": "A world-famous family experience where you stand waist-deep on a sandbar in crystal-clear Caribbean water while friendly southern stingrays glide around you. Professional guides teach safe interaction with these gentle creatures. Boat tour includes snorkeling at a nearby coral reef. An absolute bucket-list family activity.",
    "location": "North Sound, Grand Cayman (depart from Seven Mile Beach or Rum Point)",
    "bestTime": "Early morning 7:30-9:30am, calmest water conditions November-April",
    "imageUrl": "https://images.unsplash.com/photo-1541823709867-1b206113eafd?w=800&q=80",
    "amenities": ["Life Jackets (all sizes including toddler)", "Snorkel Gear Included", "Underwater Cameras Available", "Dry Bags", "Freshwater Rinse"],
    "safetyFeatures": ["Certified Marine Guides", "Stingray Handling Training", "Emergency Life Jackets", "Boat Safety Equipment", "Shallow Waist-Deep Water"],
    "tipsAndTricks": [
        "Book the 7am or 8am departure. The water is calmer, the stingrays are more active, and you'll have the sandbar mostly to yourself before the 10am crowd arrives.",
        "Tell your kids the stingray shuffle - slide your feet on the sandy bottom instead of stepping. It gently moves any hidden rays and prevents accidental stepping.",
        "Bring a rash guard or wetsuit top for kids. The sun at 10am in Cayman is brutal and reapplying sunscreen on wet kids is impossible.",
        "Toddlers under 3 can join but must stay on the boat. The Stingray City experience requires stepping off the boat into waist-deep water.",
        "The guides will take turns holding a stingray for photos. Let your kids touch the wings (smooth) not the tail (spiny). They're harmless but the feel surprises some kids."
    ],
    "parentStory": {
        "title": "The stingray kissed his cheek and he didn't even flinch",
        "excerpt": "I was terrified of stingrays. My 8-year-old son was not. When the guide showed him how to feed a squid to a ray, he didn't hesitate. The ray's mouth brushed his cheek and he just laughed. I learned more from watching him that day than from any guide.",
        "author": "Marcus, dad of 1 from London",
        "fullStory": "After Steve Irwin, I had a deep fear of stingrays. I almost backed out. But Stingray City is different - it's a sandbar, not deep water, and the rays are wild but accustomed to gentle human interaction. The guides taught us the scoop technique for feeding. My son was fearless. I held a stingray for the first time in my life."
    },
    "itineraryComparison": {
        "halfDay": "3-hour tour: 40min at Stingray City + 30min snorkel + boat ride, done by 11am",
        "fullDay": "Book a Stingray City + Snorkel + Lunch combo tour (4-5 hours total)",
        "bestFor": "Ages 3-16, adventurous families, first-time Caribbean water experiences"
    },
    "commissionRate": "12%",
    "seoKeywords": ["Stingray City Grand Cayman", "family stingray tour Cayman Islands", "snorkeling with stingrays kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1503256200498-2e6f4c310d9f?w=800&q=80",
        "https://images.unsplash.com/photo-1506751331345-831a30d5a740?w=800&q=80",
        "https://images.unsplash.com/photo-1647592720834-ffe28f6ddf75?w=800&q=80"
    ]
})

# 6. Aruba - Butterfly Farm
entries.append({
    "id": "aruba-001",
    "name": "Aruba Butterfly Farm",
    "city": "Oranjestad",
    "country": "Aruba",
    "category": "Zoos & Aquariums",
    "ageRange": "2-14",
    "safetyRating": 4.9,
    "priceRange": "$$",
    "popularity": 82,
    "description": "A lush tropical garden sanctuary housing hundreds of free-flying butterflies from species around the world. Walk through screened enclosures as butterflies land on your shoulders, arms, and hands. Educational guided tours explain the butterfly lifecycle from egg to chrysalis to adult. Peaceful, magical, and perfect for young children.",
    "location": "J.E. Irausquin Boulevard 344, Palm Beach, Aruba",
    "bestTime": "Morning 9-11am, butterflies most active in warm humid conditions",
    "imageUrl": "https://images.unsplash.com/photo-1775144113652-6592b3ebeb06?w=800&q=80",
    "amenities": ["Guided Tours", "Chrysalis Viewing Area", "Souvenir Shop", "Shaded Benches", "Restrooms"],
    "safetyFeatures": ["Screened Enclosures (no escape)", "Clean Pathways", "Hand Washing Station", "Non-Toxic Plants Only", "First Aid Kit"],
    "tipsAndTricks": [
        "Wear bright colors - pink, yellow, and orange attract butterflies. They'll land on you within minutes. White also works well.",
        "The guided tour lasts about 30 minutes and is worth it. You'll see the chrysalis room where hundreds of butterflies are hatching, and the guide knows exactly which species land the most.",
        "Don't wear strong perfume or sunscreen with heavy fragrance. Butterflies have scent receptors on their antennae and strong smells can confuse or repel them.",
        "Bring a camera with macro mode. The butterflies are incredibly photogenic but small - phone cameras without zoom miss the detail.",
        "Combine with the nearby Philips Animal Garden (Aruba's small zoo) which is a 2-minute walk away. Makes for a lovely animal-filled morning."
    ],
    "parentStory": {
        "title": "A blue morpho landed on her nose and she froze like a statue",
        "excerpt": "Our 3-year-old was holding so still I thought she'd stopped breathing. A blue morpho butterfly landed right on her nose. She looked at me with huge eyes, whispering Mama, I'm a princess. We stayed in that garden for 2 hours. She talked about it for weeks.",
        "author": "Sophie, mom of 1 from Amsterdam",
        "fullStory": "I was worried a butterfly farm would be dull for a toddler. Wrong. The moment we stepped in, butterflies were everywhere. A guide showed us a chrysalis that was actually shaking - a butterfly was emerging inside. The garden is designed so butterflies naturally land on visitors. My daughter wore a bright pink dress and was a butterfly magnet."
    },
    "itineraryComparison": {
        "halfDay": "1-2 hours: guided tour + free-roam time, combine with Philips Animal Garden",
        "fullDay": "Not needed. Add Palm Beach or Eagle Beach for the afternoon",
        "bestFor": "Ages 2-14, young children, families wanting a calm nature experience"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Aruba Butterfly Farm", "butterfly garden Aruba", "family activity Aruba kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1573558290253-fde4fa372d80?w=800&q=80",
        "https://images.unsplash.com/photo-1642262978329-a9211480300b?w=800&q=80",
        "https://images.unsplash.com/photo-1560580652-cd41f0dcc565?w=800&q=80"
    ]
})

# 7. Curacao - Sea Aquarium
entries.append({
    "id": "curacao-001",
    "name": "Curacao Sea Aquarium",
    "city": "Willemstad",
    "country": "Curacao",
    "category": "Zoos & Aquariums",
    "ageRange": "2-16",
    "safetyRating": 4.8,
    "priceRange": "$$",
    "popularity": 86,
    "description": "One of the Caribbean's best family aquariums, featuring an open-water system that pumps fresh seawater directly from the ocean. Highlights include an open-sea exhibit with sharks and rays, touch pools with starfish and sea cucumbers, daily animal feeding shows, and a famous Animal Encounter program where kids can swim with dolphins and sea lions in a natural lagoon.",
    "location": "Bapor Kibra z/n, Willemstad, Curacao",
    "bestTime": "Morning 9-11am, feeding shows start at 10am",
    "imageUrl": "https://images.unsplash.com/photo-1735796788543-c99c460a0800?w=800&q=80",
    "amenities": ["Touch Pools", "Animal Encounter Programs", "Restaurant with Ocean View", "Souvenir Shop", "Changing Facilities", "Restrooms"],
    "safetyFeatures": ["Professional Marine Staff", "Secure Glass Barriers", "Life Jackets for Water Programs", "Shaded Viewing Areas", "Emergency Exits"],
    "tipsAndTricks": [
        "Time your visit around the feeding schedule - shark feeding at 11am is the highlight and the underwater viewing window is incredible for kids.",
        "The Sea Lion Encounter (separate fee) is better for kids under 8 than the dolphin program. Sea lions are smaller, less intimidating, and the interaction is shallower.",
        "Buy the combo ticket for the aquarium + Curacao Ostrich Farm (15 minutes away). It saves 20% and makes for a full family day.",
        "The restaurant has a kids' menu and ocean-view balcony. The lionfish tacos are surprisingly kid-friendly.",
        "Parking is free but limited. Arrive before 10am on cruise ship days or you'll be circling for 15 minutes."
    ],
    "parentStory": {
        "title": "He touched a shark and thought he was a superhero",
        "excerpt": "The touch pool lets kids pet baby sharks and rays. My 5-year-old touched a bamboo shark and spent an hour telling everyone he was the shark whisperer. The open-sea tunnel made him feel like he was underwater. Best aquarium we've visited in 12 countries.",
        "author": "Tom, dad of 2 from Sydney",
        "fullStory": "Curacao Sea Aquarium is brilliantly designed for kids. The open-water system means the exhibits are vibrant and healthy. My kids were mesmerized by the open-sea tank - it's huge, with sharks, rays, and giant groupers swimming right overhead. The touch pool staff were patient, letting each child take their time. We stayed 4 hours."
    },
    "itineraryComparison": {
        "halfDay": "2-3 hours: main aquarium + all feeding shows + touch pool",
        "fullDay": "Add Sea Lion or Dolphin Encounter + Ostrich Farm combo",
        "bestFor": "Ages 2-16, marine life enthusiasts, rainy day activity"
    },
    "commissionRate": "10%",
    "seoKeywords": ["Curacao Sea Aquarium", "aquarium Curacao kids", "family activities Willemstad"],
    "gallery": [
        "https://images.unsplash.com/photo-1724892053773-cd28a4f6a622?w=800&q=80",
        "https://images.unsplash.com/photo-1718863336605-5e9c7c738336?w=800&q=80",
        "https://images.unsplash.com/photo-1738023354227-16a406891bd2?w=800&q=80"
    ]
})

# 8. St. Lucia - Zoo
entries.append({
    "id": "st-lucia-001",
    "name": "St Lucia Zoo (Zoo La Belle Vie)",
    "city": "Castries",
    "country": "St. Lucia",
    "category": "Zoos & Aquariums",
    "ageRange": "3-14",
    "safetyRating": 4.3,
    "priceRange": "$",
    "popularity": 70,
    "description": "A small, intimate zoo in a beautiful tropical garden setting. Home to native St. Lucian parrots (the endangered Amazona versicolor), iguanas, agoutis, monkeys, and boa constrictors. The zoo is compact and easily walkable, with informative signage and a strong conservation focus.",
    "location": "Morne Cochon, Union, Castries, St. Lucia",
    "bestTime": "Morning 9am-12pm, cooler and animals are more active",
    "imageUrl": "https://images.unsplash.com/photo-1775152496490-9cebc8bb7dde?w=800&q=80",
    "amenities": ["Shaded Pathways", "Restrooms", "Small Gift Shop", "Parking", "Picnic Tables"],
    "safetyFeatures": ["Secure Enclosures", "Staff Supervision", "First Aid Kit", "Emergency Contact Signage"],
    "tipsAndTricks": [
        "Go in the morning before it gets hot. The St. Lucian parrot is most active between 9-10am and often hides during afternoon heat.",
        "This is a small zoo - 45 minutes to 1 hour is plenty. Combine with a visit to Morne Coubaril Estate or Marigot Bay for a full day.",
        "Expect a local zoo experience, not a Western-style facility. Some enclosures are basic. It's charming but not flashy.",
        "The gift shop sells handcrafted St. Lucian parrot souvenirs. Profits support the conservation program - worth buying a small thing.",
        "Bring your own water. There's a drink stand but it's cash-only and occasionally closed without notice."
    ],
    "parentStory": {
        "title": "We saw the rarest parrot in the world",
        "excerpt": "Standing 3 feet from a St. Lucian parrot - one of the rarest birds on Earth - with my 7-year-old was unreal. The zoo is humble but the conservation work matters. My daughter wrote her school report on parrots of the Caribbean after that visit.",
        "author": "Jennifer, mom of 1 from Manchester",
        "fullStory": "Don't come expecting a world-class zoo. Come expecting a real, honest conservation effort. The St. Lucian parrot is stunning - purple, green, and blue feathers you can't believe are real. The zookeeper gave us a 10-minute talk about their breeding program. My daughter was captivated."
    },
    "itineraryComparison": {
        "halfDay": "45-60 min zoo visit + Morne Coubaril Estate or Marigot Bay",
        "fullDay": "Zoo + Morne Coubaril + Castries market visit",
        "bestFor": "Ages 3-14, nature-focused families, bird lovers"
    },
    "commissionRate": "8%",
    "seoKeywords": ["St Lucia Zoo", "Zoo La Belle Vie", "St. Lucian parrot conservation"],
    "gallery": [
        "https://images.unsplash.com/photo-1508597370841-836e72ef6f54?w=800&q=80",
        "https://images.unsplash.com/photo-1737040009019-1576b1342b0e?w=800&q=80",
        "https://images.unsplash.com/photo-1716745324526-8a4149760198?w=800&q=80"
    ]
})

# 9. Antigua - Stingray City Antigua
entries.append({
    "id": "antigua-001",
    "name": "Stingray City Antigua",
    "city": "St. John's",
    "country": "Antigua & Barbuda",
    "category": "Zoos & Aquariums",
    "ageRange": "4-16",
    "safetyRating": 4.8,
    "priceRange": "$$$",
    "popularity": 88,
    "description": "A thrilling family experience in the clear, calm waters of Antigua's North Sound. Step onto a shallow sandbar surrounded by dozens of friendly southern stingrays. Professional guides teach safe interaction, feeding, and even allow gentle holds for photos. Includes snorkeling on a nearby coral reef. The water is crystal clear and never deeper than waist-level for adults.",
    "location": "Moss Bay, North Sound, Antigua (depart from St. John's or Dickenson Bay)",
    "bestTime": "Morning 8-10am, calmest conditions December-May",
    "imageUrl": "https://images.unsplash.com/photo-1772550018808-ebbcc271726c?w=800&q=80",
    "amenities": ["Snorkel Gear Provided", "Life Jackets (all sizes)", "Underwater Photography", "Dry Bags", "Freshwater Rinse", "Boat Amenities"],
    "safetyFeatures": ["Certified Marine Guides", "Life Jackets for All Ages", "Safety Briefing Before Entry", "Shallow Sandbar (waist-deep max)", "Emergency Communication on Boat"],
    "tipsAndTricks": [
        "Book directly with Stingray City Antigua (not through a hotel desk) to save 15-20%. Hotel concierges add a markup.",
        "The 8am tour is the best - you'll beat the cruise ship crowds and have calmer water. By 11am, 3-4 tour boats share the sandbar.",
        "Kids under 4 generally can't participate - the minimum age is 4 for safety reasons. Check the individual operator's policy.",
        "Bring reef-safe sunscreen and a rash guard. The boat ride is 20 minutes each way and the Caribbean sun is relentless.",
        "Feed the stingrays with your palm flat (fingers together) so they don't nibble your fingertips. The guides demonstrate this clearly."
    ],
    "parentStory": {
        "title": "She fed a stingray and stopped being afraid of everything",
        "excerpt": "My daughter was terrified of everything - dogs, bugs, the dark. She was shaking getting on the boat. But the moment she saw those stingrays gliding through the clear water, something switched. She fed one on the first try.",
        "author": "Chris, dad of 1 from Austin",
        "fullStory": "I booked Stingray City Antigua as a splurge. Best money I've spent. The guides are incredible with kids - patient, encouraging, and knowledgeable. My daughter was terrified at first but within 5 minutes she was feeding stingrays like a pro. The water is so clear you can see everything. We did the reef snorkel after and saw sea turtles. One of those rare experiences that actually lives up to the hype."
    },
    "itineraryComparison": {
        "halfDay": "3-hour tour: Stingray City + reef snorkel, done by 11:30am",
        "fullDay": "Combo with lunch at North Sound beach club for a 5-hour excursion",
        "bestFor": "Ages 4-16, families wanting an unforgettable water experience"
    },
    "commissionRate": "12%",
    "seoKeywords": ["Stingray City Antigua", "family stingray experience Antigua", "snorkeling Antigua kids"],
    "gallery": [
        "https://images.unsplash.com/photo-1599387433955-63ea3540497d?w=800&q=80",
        "https://images.unsplash.com/photo-1612276036430-e7240b151bd0?w=800&