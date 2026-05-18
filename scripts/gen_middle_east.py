#!/usr/bin/env python3
"""Generate batch-middle-east-wave2.json with 15 destinations."""
import json

destinations = [
    {
        "id": "dubai-004",
        "name": "Aquaventure Waterpark",
        "city": "Dubai",
        "country": "UAE",
        "category": "Theme Parks",
        "ageRange": "4-16",
        "safetyRating": 4.6,
        "priceRange": "$$$",
        "popularity": 94,
        "description": "One of the world's largest waterparks at Atlantis, The Palm, featuring over 30 rides and slides including the terrifying Leap of Faith. Dedicated Splashers Cove zone for toddlers includes pint-sized slides and splash pads with full lifeguard coverage.",
        "location": "Atlantis The Palm, Crescent Road, Palm Jumeirah",
        "bestTime": "November to March, weekday mornings",
        "imageUrl": "https://images.unsplash.com/photo-1414963501131-5d61f46f1df8?w=800&q=80",
        "amenities": ["Lifeguard Stations", "Stroller Parking", "Cabanas for Families", "Multiple Restaurants", "Locker Rentals", "Changing Rooms", "Towel Service"],
        "safetyFeatures": ["24/7 Lifeguard Coverage", "Height Requirements Posted", "Life Jackets Available", "First Aid Stations", "Shaded Rest Areas"],
        "tipsAndTricks": [
            "Book the Aquaventure plus Lost Chambers combo ticket online -- it saves 25 percent and the aquarium is a perfect cool-down break.",
            "Arrive at 9:30 AM sharp before the 10 AM crowd rush especially on Fridays.",
            "Rent a locker with your phone -- the waterproof wristbands let you tap-pay for meals so you don't need cash.",
            "Splashers Cove has zero height restrictions so even a 2-year-old can join -- just bring swim diapers.",
            "Skip the Leap of Faith if your kid is nervous -- the Rapids River and Zoomerango are just as fun."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1595348026445-f6f0a100e21c?w=800&q=80",
            "https://images.unsplash.com/photo-1560109947-c81c064f87f4?w=800&q=80",
            "https://images.unsplash.com/photo-1577471488272-29e7ae5a36cc?w=800&q=80"
        ],
        "parentStory": {
            "title": "The water slide that cured my fear of heights",
            "excerpt": "My 7-year-old begged me to go on the Leap of Faith. I was terrified but she went first and I had to follow.",
            "author": "James, dad of 2 from London",
            "fullStory": "We almost skipped Aquaventure because I am terrified of heights. But my daughter saw the Leap of Faith on Instagram. At the top of that 27-meter slide she vanished down the drop. A lifeguard had to remind me to breathe. I went screaming all the way and at the bottom she was waiting with the biggest hug. Best 200 dollars I ever spent."
        },
        "itineraryComparison": {
            "halfDay": "Splashers Cove 2 hours, Rapids River 1 hour, lunch, 2-3 family slides",
            "fullDay": "All family slides, Leap of Faith, Lost Chambers Aquarium, lunch, wave pool, second round on favorites",
            "bestFor": "Families with kids 4-16 who love water thrills"
        },
        "commissionRate": "6%",
        "seoKeywords": ["Aquaventure Waterpark", "Dubai waterpark family", "Atlantis water park", "best waterparks Dubai"]
    },
    {
        "id": "dubai-005",
        "name": "Dubai Aquarium and Underwater Zoo",
        "city": "Dubai",
        "country": "UAE",
        "category": "Zoos & Aquariums",
        "ageRange": "2-14",
        "safetyRating": 4.8,
        "priceRange": "$$",
        "popularity": 92,
        "description": "A massive aquarium inside the Dubai Mall featuring a 48-meter acrylic tunnel surrounded by 140 species of marine life. The Underwater Zoo above offers interactive touch pools and behind-the-scenes experiences that kids love.",
        "location": "Dubai Mall, Financial Center Road, Downtown Dubai",
        "bestTime": "Weekday mornings, right when the mall opens at 10 AM",
        "imageUrl": "https://images.unsplash.com/photo-1533460004989-cef5103b0f41?w=800&q=80",
        "amenities": ["Stroller Access", "Nursing Rooms in Mall", "Restaurants Nearby", "Gift Shop", "Glass-Bottom Boat Rides", "Interactive Touch Pool"],
        "safetyFeatures": ["Glass Thickness Certified", "Staff Supervision at Touch Pools", "Well-Marked Exits", "AED Available", "Security Screening at Mall Entrance"],
        "tipsAndTricks": [
            "Buy the Explorer pass online which includes the aquarium VR experience and a glass-bottom boat ride for just 30 percent more than the basic ticket.",
            "Visit at 10 AM when Dubai Mall opens and you will have the 270-degree tunnel almost to yourself before school groups arrive.",
            "Pack a light jacket even in summer -- the aquarium is kept at 20 degrees Celsius and kids get cold fast.",
            "The touch pool experience runs from 11 AM to 7 PM and only fits 8 kids at a time so head straight there from the entrance.",
            "Combine this with the Dubai Mall indoor ice rink or KidZania -- a 1-day 3-attraction ticket saves 20 percent."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1445820200644-69f7d2847f51?w=800&q=80",
            "https://images.unsplash.com/photo-1598554739171-0407840ebbf8?w=800&q=80",
            "https://images.unsplash.com/photo-1598096972835-8ccf62c71f7c?w=800&q=80"
        ],
        "parentStory": {
            "title": "Two hours staring at one shark",
            "excerpt": "My 3-year-old spent two hours sitting on the floor of the tunnel watching one reef shark circle. I sat next to him. Never been so bored and so happy.",
            "author": "Priya, mom of 1 from Singapore",
            "fullStory": "The Dubai Mall is overwhelming but inside that aquarium tunnel everything went quiet. My son sat down cross-legged and watched a single shark make its rounds. I sat down next to him. Two hours later he stood up and said okay bye-bye fishy. It was the cheapest best therapy I have had in years."
        },
        "itineraryComparison": {
            "halfDay": "Main aquarium tunnel 1 hour, Underwater Zoo touch pool 45 minutes, lunch at food court, gift shop",
            "fullDay": "Add VR experience, glass-bottom boat, KidZania next door, ice rink, dinner, fountain show",
            "bestFor": "Kids 2-10 who love animals and calm indoor activities"
        },
        "commissionRate": "5%",
        "seoKeywords": ["Dubai Aquarium", "Dubai Mall aquarium", "Underwater Zoo Dubai", "family things to do Dubai"]
    },
    {
        "id": "dubai-006",
        "name": "IMG Worlds of Adventure",
        "city": "Dubai",
        "country": "UAE",
        "category": "Theme Parks",
        "ageRange": "5-16",
        "safetyRating": 4.5,
        "priceRange": "$$$",
        "popularity": 85,
        "description": "The world's largest indoor theme park with Marvel, Cartoon Network, and dinosaur-themed zones. Fully air-conditioned for Dubai summers with rides ranging from gentle kiddie coasters to intense thrill drops.",
        "location": "E311 Sheikh Mohammed Bin Zayed Road, Dubai",
        "bestTime": "Weekday mornings, September to April",
        "imageUrl": "https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=800&q=80",
        "amenities": ["Indoor Parking", "Multiple Dining Options", "Stroller Rentals", "Prayer Rooms", "Locker Rentals", "Baby Changing Facilities"],
        "safetyFeatures": ["Ride Safety Inspections", "Height Requirements", "First Aid Stations", "Lost Child Protocol", "CCTV Coverage"],
        "tipsAndTricks": [
            "Download the IMG app before arriving to check real-time queue times and book fast-track slots for the most popular rides.",
            "Hit the Marvel zone first -- Avengers Battle of Ultron queues hit 45 minutes by 11 AM so get there at park opening.",
            "The Lost Valley Dinosaur zone has a gentle spinning ride called The Velociraptor that is perfect for nervous first-timers aged 5 and up.",
            "Bring a refillable water bottle since there are free water stations near every restroom and bottled water costs AED 15 inside.",
            "Weekends from Thursday to Saturday are chaotic so aim for a Sunday or Monday when school buses do not come."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1568932259959-c909547373e6?w=800&q=80",
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
            "https://images.unsplash.com/photo-1573883431205-98b5f10aaedb?w=800&q=80"
        ],
        "parentStory": {
            "title": "The indoor park that saved our summer trip",
            "excerpt": "48 degrees Celsius in Dubai and we found IMG Worlds. We spent three days there taking turns on the Hulk coaster while the kids did Cartoon Network rides.",
            "author": "Aisha, mom of 2 from Jeddah",
            "fullStory": "July in Dubai is brutal and we were melting by day two. A local friend suggested IMG Worlds and it saved our holiday. The kids rode everything in the Cartoon Network zone on repeat. My husband and I took turns on the Avengers ride. We ended up buying 3-day passes."
        },
        "itineraryComparison": {
            "halfDay": "Marvel zone 2 hours, Cartoon Network zone 1 hour, lunch, one ride in Lost Valley",
            "fullDay": "All four zones, fast-track for Avengers ride, lunch sit-down, return to favorites, dinner inside",
            "bestFor": "Thrill-seeking families with kids 7 and up"
        },
        "commissionRate": "5%",
        "seoKeywords": ["IMG Worlds of Adventure", "Marvel theme park Dubai", "indoor theme park Dubai", "Dubai family attractions"]
    },
    {
        "id": "dubai-007",
        "name": "Dubai Miracle Garden",
        "city": "Dubai",
        "country": "UAE",
        "category": "Parks & Nature",
        "ageRange": "2-14",
        "safetyRating": 4.7,
        "priceRange": "$$",
        "popularity": 88,
        "description": "The world's largest natural flower garden with over 150 million blooms arranged in incredible sculptures and displays. Open only during winter months from November to May with life-sized floral castles, topiaries, and an actual A380 plane covered in flowers.",
        "location": "Al Barsha South, Dubailand, Dubai",
        "bestTime": "November to March, early morning or sunset",
        "imageUrl": "https://images.unsplash.com/photo-1585198560642-14e20d02ef76?w=800&q=80",
        "amenities": ["Wheelchair Access", "Stroller-Friendly Paths", "Cafes and Kiosks", "Souvenir Shops", "Shaded Seating Areas", "Parking"],
        "safetyFeatures": ["Fenced Perimeter", "Wide Pathways", "Security Personnel", "No Rides", "Clearly Marked Exits"],
        "tipsAndTricks": [
            "Come at 3 PM when the floral displays are backlit by golden hour and the temperature drops enough for comfortable walking.",
            "The sunflower field and the Emirates A380 are the most Instagram-worthy spots so arrive early if you want photos without crowds.",
            "Buy tickets online at least 2 days ahead because weekend slots sell out and walk-up lines can take 30 minutes.",
            "Bring hats and sunscreen even in winter since the open fields offer zero shade and reflection from the flowers is intense.",
            "Take the tram from the parking lot to the entrance since it is free and saves a 15-minute walk with toddlers."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1530878955558-a6c31bb9e6ef?w=800&q=80",
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80",
            "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80"
        ],
        "parentStory": {
            "title": "A garden that made my flower-hating son stop in his tracks",
            "excerpt": "My 6-year-old groaned when I said flower garden. Thirty minutes later he was dragging me to see the big airplane made of flowers and then spent 20 minutes smelling roses.",
            "author": "Leila, mom of 1 from Toronto",
            "fullStory": "I dragged my son to Miracle Garden expecting complaints. The floral A380 made his jaw drop. He kept asking how they did that. We spent three hours there. He smelled every rose bush and tried to count the sunflowers. The entrance was AED 95 for adults and free for under 3. Best value day of our Dubai trip."
        },
        "itineraryComparison": {
            "halfDay": "Main garden walk 1.5 hours, A380 display 30 minutes, sunflower field photos, ice cream break",
            "fullDay": "Combine with nearby Butterfly Garden a 10-minute walk away, lunch at nearby farm, return for sunset photos",
            "bestFor": "Families with young kids who love colorful stroller-friendly walks"
        },
        "commissionRate": "4%",
        "seoKeywords": ["Dubai Miracle Garden", "flower garden Dubai", "things to see in Dubai", "family garden Dubai"]
    },
    {
        "id": "dubai-008",
        "name": "Dubai Frame",
        "city": "Dubai",
        "country": "UAE",
        "category": "Museums",
        "ageRange": "4-16",
        "safetyRating": 4.6,
        "priceRange": "$$",
        "popularity": 82,
        "description": "An architectural landmark shaped like a giant picture frame offering panoramic views of old and new Dubai from its 150-meter-high glass-floored Sky Deck. The ground-floor museum takes families through Dubai's transformation from fishing village to futuristic metropolis.",
        "location": "Zabeel Park, Dubai",
        "bestTime": "Weekday mornings, right at 9 AM opening",
        "imageUrl": "https://images.unsplash.com/photo-1551829443-63cfcb5d042c?w=800&q=80",
        "amenities": ["Glass Sky Deck", "Elevator Access", "Museum Exhibition", "Gift Shop", "Cafe", "Parking"],
        "safetyFeatures": ["Glass Floor Safety Certified", "High Railings", "Security Staff", "Emergency Evacuation Plan", "Limited Capacity Control"],
        "tipsAndTricks": [
            "Book the 9 AM slot online to beat the heat and the crowds as the Sky Deck has limited capacity and sells out by 11 AM.",
            "Stand on the glass floor section near the corners where the reflection is clearest for the best photo.",
            "Visit Zabeel Park right after which is just below the Frame and has a massive children's play area and paddle boats.",
            "The museum exhibits are more interesting for kids aged 8 and up so younger ones may prefer just the Sky Deck and park time.",
            "Keep your ticket because the same QR code gives park entrance and a 10 percent discount at the cafe upstairs."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1571659326334-d5a7c41b5e54?w=800&q=80",
            "https://images.unsplash.com/photo-1519284948930-78c0c6bd8a89?w=800&q=80",
            "https://images.unsplash.com/photo-1580551650436-fb150bb7f445?w=800&q=80"
        ],
        "parentStory": {
            "title": "The moment my 7-year-old understood time",
            "excerpt": "At the Dubai Frame museum my son saw a diorama of Dubai as a fishing village then looked up at the skyline and said wait that was only 50 years ago?",
            "author": "David, dad of 1 from Cape Town",
            "fullStory": "Kids learn about the past from books but they never really get it until they see it. At the Dubai Frame the before-and-after displays finally clicked for my son. He stared at the fishing village model then looked out at the Burj Khalifa and said just 50 years ago? We spent an extra hour in the museum because he kept going back to compare the displays with the view."
        },
        "itineraryComparison": {
            "halfDay": "Sky Deck visit 45 minutes, museum 30 minutes, Zabeel Park playground 1 hour, lunch at park cafe",
            "fullDay": "Combine with Dubai Garden Glow and Dinosaur Park both in Zabeel Park for a full day of family fun",
            "bestFor": "Families with kids 5 and up interested in landmarks and city views"
        },
        "commissionRate": "4%",
        "seoKeywords": ["Dubai Frame", "Zabeel Park Dubai", "Dubai viewpoints", "family things Dubai"]
    },
    {
        "id": "abu-dhabi-001",
        "name": "Ferrari World Abu Dhabi",
        "city": "Abu Dhabi",
        "country": "UAE",
        "category": "Theme Parks",
        "ageRange": "5-16",
        "safetyRating": 4.6,
        "priceRange": "$$$",
        "popularity": 91,
        "description": "The world's first Ferrari-branded theme park and home to Formula Rossa, the fastest roller coaster on the planet reaching 240 km/h in 4.9 seconds. Beyond the thrill rides the Junior Grand Prix and kids driving school offer scaled-down experiences for younger children.",
        "location": "Yas Island, Abu Dhabi",
        "bestTime": "October to April, weekday mornings",
        "imageUrl": "https://images.unsplash.com/photo-1568735899246-5aea9a3b89bd?w=800&q=80",
        "amenities": ["Indoor Fully Air-Conditioned", "Family Restrooms", "Nursing Room", "Multiple Restaurants", "Gift Shop", "Prayer Rooms"],
        "safetyFeatures": ["Height Requirements Enforced", "Ride Restraint Checks", "First Aid", "Security Screening", "Lost Child Wristbands"],
        "tipsAndTricks": [
            "Book the Yas Island 2-Park combo if you are also doing Yas Waterworld since it saves 30 percent and includes free shuttle.",
            "Get to Formula Rossa before 10:30 AM because the line hits 90 minutes after lunch.",
            "The Junior Grand Prix is worth the extra AED 25 per child as a real mini-Ferrari on a track with working lights.",
            "Kids under 130 cm cannot ride most big coasters but the Speed of Magic 4D show is open to all ages.",
            "Eat at the park restaurants at 11:30 AM to beat the lunch rush since tables fill by noon."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1551016521-3580f5e63bb1?w=800&q=80",
            "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80",
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80"
        ],
        "parentStory": {
            "title": "Watching my speed-demon daughter conquer Formula Rossa",
            "excerpt": "My 9-year-old walked onto the fastest roller coaster on Earth like it was a merry-go-round. She came off grinning and said let us go again. We did it four times.",
            "author": "Tom, dad of 1 from Sydney",
            "fullStory": "I had heard about Formula Rossa doing 240 km/h with G-forces that make fighter pilots flinch. My daughter wanted to ride it the moment we walked in. I was terrified. She sat next to me held my hand and said you can do it daddy. We launched and I could not feel my face. She laughed the entire time. We went four times. She wanted a fifth."
        },
        "itineraryComparison": {
            "halfDay": "Formula Rossa 3 runs, Junior Grand Prix, Speed of Magic show, lunch",
            "fullDay": "All major coasters, kids zones, 4D shows, behind-the-scenes tour, dinner at Yas Marina",
            "bestFor": "Car-loving families and thrill seekers aged 8 and up"
        },
        "commissionRate": "6%",
        "seoKeywords": ["Ferrari World Abu Dhabi", "Formula Rossa", "Yas Island attractions", "Abu Dhabi theme parks"]
    },
    {
        "id": "abu-dhabi-002",
        "name": "Yas Waterworld",
        "city": "Abu Dhabi",
        "country": "UAE",
        "category": "Theme Parks",
        "ageRange": "3-16",
        "safetyRating": 4.7,
        "priceRange": "$$$",
        "popularity": 89,
        "description": "An Emirati-themed waterpark on Yas Island with over 40 rides slides and attractions. The pirate-themed Al Mariyah kids fort with more than 150 water features keeps toddlers entertained while older kids tackle the Bandit Bomber roller coaster water ride.",
        "location": "Yas Island, Abu Dhabi",
        "bestTime": "November to March, right at 10 AM opening",
        "imageUrl": "https://images.unsplash.com/photo-1575485184186-9c991aa5be90?w=800&q=80",
        "amenities": ["Lifeguard Stations", "Cabana Rentals", "Stroller Parking", "Changing Rooms", "Locker Rentals", "Family Dining", "Halal Food Options"],
        "safetyFeatures": ["Lifeguards at Every Pool", "Free Life Jackets", "Height Restriction Signs", "First Aid Room", "Sun Protection Stations with Free Sunscreen"],
        "tipsAndTricks": [
            "The YAS combo ticket covering Ferrari World Yas Waterworld and Warner Bros costs AED 495 per person which is 55 percent off individual tickets.",
            "Head to Bandit Bomber first since it is the only roller coaster water slide in the region and queues build fastest.",
            "Bring water shoes because the Abu Dhabi heat makes the ground hot enough to burn bare feet by 11 AM.",
            "The Al Mariyah pirate fort has timed bucket dumps every 15 minutes so stake out a spot for the best splash zone photos.",
            "Pack a waterproof phone pouch to capture photos of the giant pearl centerpiece and wave pool."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1560155016-bf3aac6e5f15?w=800&q=80",
            "https://images.unsplash.com/photo-1575995872537-3793d29d972c?w=800&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
        ],
        "parentStory": {
            "title": "Three hours in the pirate fort and nobody wanted to leave",
            "excerpt": "My 4-year-old twins spent three hours in the Al Mariyah pirate fort and never once looked for me. I read half a book in a lounger. Best day of the trip.",
            "author": "Emma, mom of twins from Auckland",
            "fullStory": "Yas Waterworld was supposed to be just another stop. But the minute my twins saw the Al Mariyah pirate fort they ran in and did not look back. I found a shaded lounger and checked on them every 15 minutes. They were making friends splashing and laughing. I finished 120 pages of a book which has not happened since 2019."
        },
        "itineraryComparison": {
            "halfDay": "Al Mariyah fort 1.5 hours, Bandit Bomber 3 runs, lazy river, lunch",
            "fullDay": "All major slides, wave pool, second round of favorites, cabana rental, dinner at Yas Plaza",
            "bestFor": "Families with mixed ages from toddlers to teens"
        },
        "commissionRate": "6%",
        "seoKeywords": ["Yas Waterworld", "Abu Dhabi waterpark", "Yas Island water park", "family waterpark UAE"]
    },
    {
        "id": "abu-dhabi-003",
        "name": "Louvre Abu Dhabi",
        "city": "Abu Dhabi",
        "country": "UAE",
        "category": "Museums",
        "ageRange": "4-16",
        "safetyRating": 4.9,
        "priceRange": "$$",
        "popularity": 87,
        "description": "The iconic museum on Saadiyat Island with a stunning rain of light dome. A dedicated children's gallery with hands-on activities storytelling sessions and art workshops makes it surprisingly family-friendly despite the fancy museum reputation.",
        "location": "Saadiyat Island, Abu Dhabi",
        "bestTime": "Saturday to Wednesday mornings",
        "imageUrl": "https://images.unsplash.com/photo-1554893520-20faec733c36?w=800&q=80",
        "amenities": ["Stroller Access", "Children's Gallery", "Nursing Room", "Cafe Restaurant", "Bookshop", "Free Wi-Fi"],
        "safetyFeatures": ["Security Staff Throughout", "Glass Barriers Near Art", "Wide Open Galleries", "Temperature Controlled", "First Aid"],
        "tipsAndTricks": [
            "Visit on Family Day Mondays when the children's gallery runs free art workshops from 10 AM to 12 PM normally AED 50 per child.",
            "The rain of light effect happens best between 11 AM and 1 PM so sit in the center of the dome for the full experience.",
            "Download the Louvre Kids app before going for a scavenger hunt that turns the museum into a game with stickers and rewards.",
            "Don't try to see everything -- pick 5-6 key pieces use the family audio guide AED 20 and aim for 90 minutes before kid fatigue.",
            "The outdoor boardwalk around the museum is stroller-friendly and has shaded seating with views of the Abu Dhabi skyline."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1594068972024-639a1101c20d?w=800&q=80",
            "https://images.unsplash.com/photo-1561576195-0e7ec4ecd76b?w=800&q=80",
            "https://images.unsplash.com/photo-1552410260-db4abc39adad?w=800&q=80"
        ],
        "parentStory": {
            "title": "My 6-year-old's art critique that stopped a room",
            "excerpt": "She stood in front of a Picasso and said his lines are messy because he was thinking about too many things. A curator said she was essentially right.",
            "author": "Nadia, mom of 1 from Kuala Lumpur",
            "fullStory": "I worried the Louvre would bore my 6-year-old. Instead she walked through the galleries like a tiny critic. She spent 5 minutes analyzing a Monet. A curator heard her and knelt down to say that is exactly right the Impressionists painted how things felt. She made a Picasso-style mask in the children's workshop. It is on our fridge."
        },
        "itineraryComparison": {
            "halfDay": "Dome viewing 20 minutes, children's gallery 1 hour, 5 key galleries, lunch at cafe",
            "fullDay": "Add audioguide tour, boardwalk walk, documentary screening, art workshop, sunset from the plaza",
            "bestFor": "Culture-curious families with kids 6 and up"
        },
        "commissionRate": "3%",
        "seoKeywords": ["Louvre Abu Dhabi", "Abu Dhabi museum family", "Saadiyat Island", "children's museum Abu Dhabi"]
    },
    {
        "id": "doha-001",
        "name": "Katara Cultural Village",
        "city": "Doha",
        "country": "Qatar",
        "category": "Museums",
        "ageRange": "3-14",
        "safetyRating": 4.7,
        "priceRange": "$",
        "popularity": 83,
        "description": "A sprawling cultural destination on Doha's eastern coast blending art galleries an open-air amphitheater a mosque and beautiful beachfront. Children love the kite-flying fields the small aquarium and the weekend markets with traditional crafts and camel riding.",
        "location": "West Bay, Doha",
        "bestTime": "November to March, late afternoons",
        "imageUrl": "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
        "amenities": ["Beach Access", "Restaurants and Cafes", "Art Galleries", "Open-Air Theater", "Prayer Room", "Free Parking"],
        "safetyFeatures": ["Security Personnel", "Well-Lit Walkways", "Shaded Seating Areas", "Pedestrian-Only Zones", "Fenced Beach Area"],
        "tipsAndTricks": [
            "Go on a Friday or Saturday afternoon when the weekend market is running with camel rides henna painting and traditional Qatari food stalls.",
            "Bring a kite since the wide-open plaza near the amphitheater is perfect for kite flying and vendors sell them for QR 30 if you forget.",
            "The beach section has gentle waves and lifeguards making it safe for toddlers to splash around just avoid midday heat.",
            "Check the Katara website for free cultural events like storytelling sessions and traditional dance performances on most Friday evenings.",
            "Park near the southern entrance closer to the beach and children's playground rather than the main gate which is busier on weekends."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1582995110737-f1b5203c2ef7?w=800&q=80",
            "https://images.unsplash.com/photo-1560996388-5b5624c0187b?w=800&q=80",
            "https://images.unsplash.com/photo-1567951209511-db7701bcb9c7?w=800&q=80"
        ],
        "parentStory": {
            "title": "A free afternoon that beat every paid attraction",
            "excerpt": "We spent 400 dollars on museum tickets earlier but my kids spent two hours flying a cheap kite on the Katara plaza and that was their favorite memory of Doha.",
            "author": "Sarah, mom of 2 from Melbourne",
            "fullStory": "We had been to all the big Doha museums on our trip. On our last day we stumbled into Katara just to kill time before our flight. My kids bought a kite from a street vendor for QR 20 and spent almost two hours running across the plaza trying to get it airborne. A local family shared traditional sweets with us. No entry fee. No queues. Just a perfect afternoon."
        },
        "itineraryComparison": {
            "halfDay": "Explore plazas and amphitheater 1 hour, kite flying 45 minutes, beach 30 minutes, lunch at waterfront cafe",
            "fullDay": "Add the art galleries, weekend market, beach time, dinner at Katara restaurants, evening fountain walk",
            "bestFor": "Families who want culture mixed with free outdoor fun for kids"
        },
        "commissionRate": "2%",
        "seoKeywords": ["Katara Cultural Village", "Doha family activities", "Qatar cultural attractions", "free things Doha"]
    },
    {
        "id": "doha-002",
        "name": "Museum of Islamic Art",
        "city": "Doha",
        "country": "Qatar",
        "category": "Museums",
        "ageRange": "4-16",
        "safetyRating": 4.8,
        "priceRange": "$",
        "popularity": 84,
        "description": "The iconic I.M. Pei-designed museum houses 1400 years of Islamic artifacts while its sprawling waterfront park offers playgrounds fountains and panoramic Doha skyline views. The family-friendly audio guide and activity booklets turn a cultural visit into a treasure hunt for kids.",
        "location": "Corniche, Doha",
        "bestTime": "November to March, right at 9 AM opening",
        "imageUrl": "https://images.unsplash.com/photo-1552125382-d5efbf5a1ffb?w=800&q=80",
        "amenities": ["Museum Cafe", "Gift Shop", "Children's Activity Room", "Stroller Access", "Free Wi-Fi", "Fountain Play Area"],
        "safetyFeatures": ["Security Screening", "Staff Throughout Galleries", "Artifact Glass Protection", "Spacious Galleries", "Air-Conditioned"],
        "tipsAndTricks": [
            "Ask at the information desk for the free kids activity backpack containing coloring books magnifying glasses and scavenger hunt cards.",
            "The museum restaurant IDAM by Alain Ducasse has a reasonable kids menu at QR 60 for a three-course meal with a Corniche view.",
            "Plan the museum visit for the first hour when kids are fresh then let them burn energy in the park and fountain area outside.",
            "The geometric patterns in the building fascinate children especially the central staircase and shadow play on the walls.",
            "Combine with a dhow boat ride from the nearby Corniche dock costing QR 40 per person for a 30-minute trip past the skyline."
        ],
        "gallery": [
            "https://images.unsplash.com/photo-1511652563611-6310a0cfe79d?w=800&q=80",
            "https://images.unsplash.com/photo-1518532086188-3cc1f0a7b78a?w=800&q=80",
            "https://images.unsplash.com/photo-1591101762088-9408d7be59f8?w=800&q=80"
        ],
        "parentStory": {
            "title": "Coloring in a world-class museum",
            "excerpt": "My 6-year-old spent most of her visit coloring Islamic geometric patterns at the activity table. A curator sat with her and explained how the patterns symbolize infinity. She was captivated.",
            "author": "Fatima, mom of 2 from Istanbul",
            "fullStory": "I worried a museum of Islamic art would bore my young children. But the moment we walked into the activity room they were hooked. My daughter spent a solid hour drawing geometric patterns. A curator sat down and explained that the star shapes represent the heavens