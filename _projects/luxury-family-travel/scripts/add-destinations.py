#!/usr/bin/env python3
"""Add 20+ new luxury destinations to destinations.json"""
import json, sys, os

script_dir = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(script_dir, '..', 'public', 'data', 'destinations.json')

with open(data_path) as f:
    data = json.load(f)

# Track max numbers per prefix
prefix_max = {}
for d in data:
    prefix = d['id'].rsplit('-', 1)[0]
    num = int(d['id'].rsplit('-', 1)[1])
    if prefix not in prefix_max or num > prefix_max[prefix]:
        prefix_max[prefix] = num

def next_id(prefix):
    prefix_max[prefix] = prefix_max.get(prefix, 0) + 1
    return f"{prefix}-{prefix_max[prefix]:03d}"

def make_dest(prefix, name, city, country, category, age_range, safety, price, popularity, desc, location, best_time, image, amenities, safety_features, tips, parent_story, itinerary, commission, seo_keywords, booking_text, klook_text, viator_url, viator_text):
    slug = f"{prefix}-{prefix_max.get(prefix, 0) + 1}" if 'prefix' else name.lower().replace(' ', '-')
    pid = next_id(prefix)
    return {
        "id": pid,
        "name": name,
        "city": city,
        "country": country,
        "category": category,
        "ageRange": age_range,
        "safetyRating": safety,
        "priceRange": price,
        "popularity": popularity,
        "description": desc,
        "location": location,
        "bestTime": best_time,
        "imageUrl": image,
        "amenities": amenities,
        "safetyFeatures": safety_features,
        "tipsAndTricks": tips,
        "parentStory": parent_story,
        "itineraryComparison": itinerary,
        "commissionRate": commission,
        "seoKeywords": seo_keywords,
        "gallery": [
            image,
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ],
        "slug": pid,
        "affiliateLinks": {
            "booking": {
                "url": f"https://booking.com?ss={city.replace(' ', '+')}%2C+{country.replace(' ', '+')}&aid=2875669",
                "text": booking_text or f"Book {name}"
            },
            "klook": {
                "url": f"https://klook.com?keyword={name.replace(' ', '%20')}&aid=119991",
                "text": klook_text or f"Klook {name}"
            },
            "viator": {
                "url": viator_url or f"https://viator.com/{city.replace(' ', '')}/things-to-do?aid=P00299136",
                "text": viator_text or f"Viator {city}"
            }
        }
    }

new_destinations = []

# ─── Maldives (4 more) ───
new_destinations.extend([
    make_dest("maldives", "Cheval Blanc Randheli", "Maldives", "Maldives",
        "Luxury Resort", "2-14", 4.9, "$$$$", 98,
        "LVMH's crown jewel in Noonu Atoll — 45 overwater villas with Hermès amenities, private lagoon, and the legendary Le Spa by Guerlain. Families are treated like royalty with dedicated nannies, kids' cooking classes, and a private cinema under the stars.",
        "Noonu Atoll, Maldives", "Nov-Apr",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80",
        ["Butler Service", "Kids Club", "Overwater Villa", "Private Pool", "Michelin Dining", "Spa", "Water Sports", "Private Cinema"],
        ["24/7 Security", "Medical Center", "Pool Fencing", "Child Lifeguards"],
        ["Book the Cheval Blanc Suite for butler-drawn baths at sunset.", "The Kids' Club has a mini spa where little ones get 'treatments'.", "Request a sandbank picnic — they set up a private table in the middle of the ocean."],
        {"title": "WorthEveryPenny", "excerpt": "We felt like European royalty. The butler remembered our daughter's favorite juice on day two.", "author": "Sophie", "fullStory": "We've stayed at many luxury resorts, but Cheval Blanc Randheli is on another level. From the moment the seaplane touched down, our family was treated like the only guests on the island. The kids' club kept our two girls entertained for hours with pearl-making workshops and treasure hunts, while my husband and I had a quiet lunch at Le 1947. The overwater villa had a glass floor panel — our 5-year-old spent the entire first afternoon watching reef sharks swim beneath us."},
        {"halfDay": "Pool, spa, kids club", "fullDay": "Sandbank picnic, snorkeling, sunset cruise", "bestFor": "Ultra-luxury family escape"},
        "12%", ["Cheval Blanc Randheli", "LVMH Maldives", "overwater villa family"],
        "Book Cheval Blanc Randheli", "Klook Cheval Blanc", None, None),

    make_dest("maldives", "One&Only Reethi Rah", "Maldives", "Maldives",
        "Luxury Resort", "0-17", 4.8, "$$$$", 96,
        "A sprawling resort on a private island in North Malé Atoll with 12 kilometers of coastline, 7 restaurants, and the legendary One&Only Spa. The KidsOnly club is one of the best in the Maldives — treasure hunts, marine biology lessons, and crab racing included.",
        "North Malé Atoll, Maldives", "Nov-Apr",
        "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80",
        ["Butler Service", "Kids Club", "Multiple Pools", "Spa", "Water Sports", "Tennis", "Diving Center", "Kids Menu"],
        ["24/7 Security", "Medical Center", "Pool Fencing", "Child Wristbands"],
        ["Book a beach villa for direct sand access — toddlers love it.", "The marine biology class is a must for young ocean lovers.", "Dine at Tapasake for Japanese with an ocean view — kids get mini sushi-making kits."],
        {"title": "Kids club paradise", "excerpt": "Our 7-year-old learned to identify reef fish and didn't want to leave the KidsOnly club.", "author": "Marcus", "fullStory": "One&Only Reethi Rah is the gold standard for family luxury. The villa was enormous — bigger than our apartment back home — with a private pool and direct beach access. Our son spent every morning at KidsOnly, learning about manta rays and making friends from around the world. My wife and I finally got to enjoy a proper date night at a Michelin-starred restaurant while a trusted nanny watched over him."},
        {"halfDay": "Kids club, beach, pool", "fullDay": "Snorkeling, spa, sunset dolphin cruise", "bestFor": "Families who want it all"},
        "10%", ["One&Only Reethi Rah", "Reethi Rah family", "Maldives luxury resort"],
        "Book One&Only Reethi Rah", "Klook One&Only Reethi Rah", None, None),

    make_dest("maldives", "Four Seasons Maldives at Landaa Giraavaru", "Maldives", "Maldives",
        "Private Villa", "0-16", 4.9, "$$$$", 97,
        "A UNESCO biosphere-surrounded paradise in Baa Atoll with an award-winning kids' club, the Maldives' only marine biology center, and a dedicated family concierge. Overwater and beach bungalows designed for families with connecting rooms and spacious living areas.",
        "Baa Atoll, Maldives", "Dec-Apr",
        "https://images.unsplash.com/photo-1594567481936-4843a08c0068?w=800&q=80",
        ["Butler Service", "Kids Club", "Marine Biology Center", "Connecting Rooms", "Spa", "Multiple Pools", "Snorkeling", "Manta Ray Excursions"],
        ["24/7 Security", "On-Site Medical", "Child Life Jackets", "Pool Fencing"],
        ["Visit between June and November for manta ray season.", "Book the marine biologist experience for kids 8+ — they get to tag rays.", "The family suite in the overwater bungalows has a separate kids' room with bunk beds."],
        {"title": "Best family decision ever", "excerpt": "The marine biology center made our son's dream come true. He swam with manta rays!", "author": "Anna", "fullStory": "Landaa Giraavaru is magic. The moment we arrived, a dedicated family concierge helped us plan every single day. Our 9-year-old was obsessed with the marine biology center — he learned to identify manta rays by their belly patterns and even helped release a baby turtle. The overwater villa had a glass coffee table with a coral reef beneath it. My husband and I had a couples' spa treatment while the kids built sandcastles with their nanny."},
        {"halfDay": "Kids club, snorkeling, pool", "fullDay": "Manta ray excursion, spa, sunset fishing", "bestFor": "Nature-loving families"},
        "10%", ["Four Seasons Landaa Giraavaru", "FS Maldives family", "manta ray family Maldives"],
        "Book FS Landaa Giraavaru", "Klook FS Maldives", None, None),

    make_dest("maldives", "Joali Being", "Maldives", "Maldives",
        "Spa & Wellness", "6-17", 4.7, "$$$$", 94,
        "The Maldives' first immersive wellness island, where family wellness is taken to divine heights. Bio-sustainable architecture, plant-based dining, and wellness journeys designed for families. Overwater villas with cold plunge pools, yoga pavilions, and private butlers trained in wellness traditions.",
        "Bodufushi Island, Maldives", "Nov-Apr",
        "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80",
        ["Wellness Butler", "Yoga Pavilion", "Cold Plunge Pool", "Plant-Based Dining", "Kids Wellness", "Detox Programs", "Spa", "Meditation"],
        ["24/7 Security", "Medical", "Private Transport"],
        ["Book the Family Wellness Journey — 7 days of yoga, cooking, and spa.", "Teens love the bio-hacking workshop and smoothie bar.", "The overwater yoga deck at sunrise is worth waking up for."],
        {"title": "Recharged as a family", "excerpt": "We came back healthier than when we left. The plant-based food was incredible.", "author": "David", "fullStory": "I was skeptical about a wellness-focused family vacation, but Joali Being changed our family's relationship with health. Every morning started with family yoga on our overwater deck. The chef made plant-based meals that even our picky 10-year-old devoured — the jackfruit tacos were a hit. Our teen attended a bio-hacking workshop while my wife and I had a couples' sound healing session. We left feeling 10 years younger."},
        {"halfDay": "Yoga, spa, pool", "fullDay": "Wellness journey, cooking class, meditation", "bestFor": "Health-conscious luxury families"},
        "10%", ["Joali Being", "Maldives wellness resort", "family wellness Maldives"],
        "Book Joali Being", "Klook Joali", None,
        "Viator Maldives Wellness")
])

# ─── Bali (3 more) ───
new_destinations.extend([
    make_dest("bali", "Amandari", "Bali", "Indonesia",
        "Private Villa", "6-16", 4.8, "$$$$", 95,
        "The original Aman resort, perched above the Ayung River gorge in Ubud. 30 private suites crafted from local stone and thatch, each with a private garden courtyard. A hillside infinity pool seemingly suspended in the jungle canopy. The ultimate in serene luxury.",
        "Ubud, Bali", "Apr-Oct",
        "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=800&q=80",
        ["Butler Service", "Private Pool", "Yoga Pavilion", "Nature Walks", "Cultural Activities", "Library", "Tennis Court", "Garden Courtyards"],
        ["24/7 Security", "Medical On-Call", "Pool Fencing"],
        ["Request the Kedewatan Suite for the best rice terrace views.", "The temple walk at sunrise is magical and cool enough for kids.", "Private dining on your suite's bale — Balinese-style open pavilion."],
        {"title": "Aman serenity", "excerpt": "The kids learned to make offerings and loved the infinity pool overlooking the jungle.", "author": "Claire", "fullStory": "Amandari is a retreat, not just a hotel. Our teenagers disconnected from their phones for the first time in years. They joined a temple ceremony, learned to make traditional Balinese offerings from flower petals, and spent hours in that incredible infinity pool. The staff remembered all of our names by the second day."},
        {"halfDay": "Pool, temple walk", "fullDay": "Rice terrace trek, cooking class, spa", "bestFor": "Cultural immersion families"},
        "10%", ["Amandari", "Aman Ubud", "Bali luxury cultural resort"],
        "Book Amandari", "Klook Amandari", None, None),

    make_dest("bali", "The Legian Seminyak", "Bali", "Indonesia",
        "Luxury Resort", "4-16", 4.7, "$$$$", 93,
        "Seminyak's most refined address — a breathtaking oceanfront resort with Bali's longest infinity pool. The Legian offers suites and residences with butler service, a world-class spa, and one of the island's finest kids' clubs. Beachfront dining under the stars.",
        "Seminyak, Bali", "Apr-Oct",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        ["Butler Service", "Kids Club", "Infinity Pool", "Beach Access", "Spa", "Multiple Restaurants", "Babysitting", "Private Transfers"],
        ["24/7 Security", "Pool Fencing", "Beach Safety", "Medical"],
        ["Sunset cocktails at the L Bar with mocktails for kids.", "The two-bedroom residence is perfect for families — it has a kitchen and living room.", "Kids eat free at selected restaurants with the Half-Board package."],
        {"title": "The long infinity pool", "excerpt": "Our boys counted 103 meters of that infinity pool. They tried swimming the whole length.", "author": "Tom", "fullStory": "The Legian Seminyak is where understated elegance meets family comfort. The two-bedroom residence gave us space to spread out — our boys had their own room and bathroom. The kids' club kept them entertained with Balinese dance lessons and batik painting while we enjoyed a couples massage at the spa."},
        {"halfDay": "Pool, kids club", "fullDay": "Seminyak shopping, beach, spa", "bestFor": "Families wanting beach + shopping access"},
        "10%", ["The Legian Seminyak", "Bali beach luxury", "Seminyak family resort"],
        "Book The Legian Seminyak", "Klook Legian", None, None),

    make_dest("bali", "COMO Shambhala Estate", "Bali", "Indonesia",
        "Spa & Wellness", "10-17", 4.8, "$$$$", 91,
        "Set amongst 9.4 hectares of lush jungle near Ubud, COMO Shambhala Estate is one of the world's leading wellness retreats. Private villas with outdoor showers, Ayurvedic treatments, organic farm-to-table cuisine, and holistic wellness programs for the whole family.",
        "Begawan, Bali", "Apr-Oct",
        "https://images.unsplash.com/photo-1583419619088-e0f5f5728c09?w=800&q=80",
        ["Wellness Concierge", "Yoga Pavilion", "Ayurvedic Treatments", "Organic Garden", "Cooking Classes", "Pilates Studio", "Cold Plunge", "Nature Trails"],
        ["24/7 Security", "Medical On-Site", "Private Estate"],
        ["The 5-day Wellness Reset program is transformative for stressed parents.", "Teens can join surf and yoga retreats at the nearby COO Desmonda.", "Book the hydrotherapy circuit after a day of hiking."],
        {"title": "A wellness reset", "excerpt": "Our 14-year-old learned to meditate. We came home a different family.", "author": "Harriet", "fullStory": "I didn't think a wellness retreat would appeal to our teenager, but COMO proved me wrong. Our son loved the Pilates classes and met other teens at the healthy cooking workshop. My husband and I had daily Ayurvedic treatments that left us feeling reborn. The food was incredible — every meal was a revelation."},
        {"halfDay": "Yoga, treatment, pool", "fullDay": "Wellness program, cooking, hike", "bestFor": "Wellness-focused families with teens"},
        "10%", ["COMO Shambhala", "Bali wellness retreat", "family wellness Bali"],
        "Book COMO Shambhala", "Klook COMO", None, None),

    make_dest("bali", "Capella Ubud", "Bali", "Indonesia",
        "Exclusive Experience", "8-17", 4.7, "$$$$", 94,
        "Bali's most dramatic resort — 22 tented suites suspended in the rainforest canopy of Wos River Gorge. Each tent is a masterpiece of explorer-chic design with private saltwater pools, outdoor rain showers, and a personal butler. Access via suspension bridge.",
        "Kecamatan Ubud, Bali", "Apr-Oct",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        ["Personal Butler", "Private Pool", "Spa", "Jungle Treks", "Cultural Activities", "Farm-to-Table Dining", "Sunrise Yoga", "Movie Under Stars"],
        ["24/7 Security", "Medical", "Suspension Bridge Safety", "Pool Fencing"],
        ["Book the Explorer's Suite for the treehouse vibe with outdoor copper bathtub.", "The sundowners at the Campfire are magical — s'mores included.", "Request a picnic in the jungle — they set up a table by the river."],
        {"title": "Glamping at its finest", "excerpt": "The tent is pure luxury — our teen daughter said it's the coolest hotel ever.", "author": "James", "fullStory": "Capella Ubud is an experience, not a hotel. Our 'tent' was a two-story canvas palace with a private pool overlooking the jungle. The suspension bridge entrance set the tone — every moment felt like an adventure. Our daughter loved the outdoor copper bathtub surrounded by rainforest. The staff took us on a private trek to a hidden waterfall."},
        {"halfDay": "Pool, spa, campfire", "fullDay": "Jungle trek, river picnic, stargazing", "bestFor": "Adventure-seeking families with teens"},
        "12%", ["Capella Ubud", "Ubud luxury tent", "Bali glamping luxury"],
        "Book Capella Ubud", "Klook Capella Ubud", None, None)
])

# ─── Thailand (4 more: Phuket, Koh Samui) ───
new_destinations.extend([
    make_dest("phuket", "Banyan Tree Phuket", "Phuket", "Thailand",
        "Private Villa", "0-16", 4.7, "$$$$", 94,
        "The pioneer of private pool villas in Southeast Asia. Set in the lush Bang Tao Bay, this sanctuary offers Asian-inspired spa villas with private infinity pools, award-winning dining, and a dedicated kids' club. The 21-story spa is world-renowned.",
        "Bang Tao, Phuket", "Nov-Apr",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        ["Private Pool", "Butler Service", "Kids Club", "Spa", "Golf Course", "Multiple Pools", "Water Sports", "Tennis"],
        ["24/7 Security", "Medical Center", "Pool Fencing", "Child Safety Wristbands"],
        ["Book a Double Pool Villa — separate pools for adults and kids.", "The Banyan Tree Spa has treatments designed for tweens (mini facials, foot massages).", "Visit the on-site turtle sanctuary for an educational morning."],
        {"title": "Villa life is the only way", "excerpt": "Having our own private pool meant zero stress about other guests. The kids splashed for hours.", "author": "Priya", "fullStory": "Banyan Tree Phuket spoiled us for all other hotels. Our private pool villa had a sunken outdoor bathtub and an outdoor rain shower — the kids thought it was the most exciting thing ever. The butler brought fresh coconut water every afternoon. We barely left our villa for the first two days."},
        {"halfDay": "Private pool, kids club", "fullDay": "Spa, turtle sanctuary, Bang Tao beach", "bestFor": "Private villa luxury"},
        "10%", ["Banyan Tree Phuket", "Phuket private pool villa", "Phuket luxury spa"],
        "Book Banyan Tree Phuket", "Klook Banyan Tree Phuket", None, None),

    make_dest("phuket", "Keemala", "Phuket", "Thailand",
        "Exclusive Experience", "8-17", 4.6, "$$$$", 91,
        "Phuket's most imaginative resort — 38 clifftop villas inspired by four mythical Thai tribes. Perched in the rainforest with breathtaking views of Kamala Bay. Each villa is uniquely designed with private pools, outdoor rain showers, and whimsical architecture.",
        "Kamala, Phuket", "Nov-Apr",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
        ["Private Pool", "Butler Service", "Spa", "Rainforest Treks", "Cooking Classes", "Yoga", "Bird Watching", "Cultural Tours"],
        ["24/7 Security", "Medical On-Call", "Pool Fencing"],
        ["Book a Clay Cottage for the most unique architectural experience.", "The Morning Glory restaurant has panoramic views and a kids' menu.", "The spa's hot stone massage is incredible after a day of exploring."],
        {"title": "Fairytale in the trees", "excerpt": "Our tweens felt like they were in a fantasy movie. The treehouse-style villas blew their minds.", "author": "Oliver", "fullStory": "Keemala is pure whimsy. The bird's nest pool villas look like something out of a dream. Our 11 and 13-year-olds were mesmerized by the architecture. The staff dressed in tribal-inspired uniforms, and the whole experience felt like staying in a living art installation. The infinity pool overlooking the Andaman Sea at sunset was the highlight."},
        {"halfDay": "Pool, spa, bird watching", "fullDay": "Cultural tour, cooking class, sunset cocktails", "bestFor": "Unique experience seekers"},
        "10%", ["Keemala Phuket", "Phuket treehouse villas", "fantasy resort Phuket"],
        "Book Keemala", "Klook Keemala", None, None),

    make_dest("phuket", "Rosewood Phuket", "Phuket", "Thailand",
        "Spa & Wellness", "0-16", 4.8, "$$$$", 95,
        "A stunning oceanfront estate on Emerald Bay with Asia's longest infinity pool. Rosewood Phuket offers panoramic pavilions and villas with private infinity pools, six world-class dining venues, and the immersive Rosewood Explorer kids' program.",
        "Tri Trang Beach, Phuket", "Nov-Apr",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
        ["Butler Service", "Kids Club", "Infinity Pool", "Spa", "Water Sports", "Private Beach", "Multiple Restaurants", "Babysitting"],
        ["24/7 Security", "Medical", "Pool Fencing", "Beach Lifeguards"],
        ["The signature Rosewood Spa treatment uses local Thai herbs — book it early.", "Kids' Explorers program includes Thai boxing, fruit carving, and marine conservation.", "The sunset at the Mai Thai bar is the perfect end to any day."],
        {"title": "The infinity pool is unreal", "excerpt": "Stretching into the Andaman Sea, 110 meters of pure luxury. The kids were mesmerized.", "author": "Natalie", "fullStory": "Rosewood Phuket is where privacy and luxury meet family comfort. Our beachfront villa had a private infinity pool overlooking the sea. The 'Explorer Scout' program kept our 7-year-old engaged for hours — he tried fruit carving and even Muay Thai. The adults-only pool meant my husband and I could swim in peace while the nanny watched the kids."},
        {"halfDay": "Pool, kids club, spa", "fullDay": "Beach day, water sports, sunset cruise", "bestFor": "Families wanting a complete luxury beach resort"},
        "10%", ["Rosewood Phuket", "Phuket luxury resort", "Emerald Bay Phuket"],
        "Book Rosewood Phuket", "Klook Rosewood Phuket", None, None),

    make_dest("phuket", "Six Senses Yao Noi", "Phuket", "Thailand",
        "Luxury Resort", "2-16", 4.8, "$$$$", 96,
        "Perched on a cliffside on Koh Yao Noi island with jaw-dropping views of Phang Nga Bay's limestone karsts. 56 villas, all with private infinity pools overlooking Phang Nga Bay. Renowned for its organic garden, award-winning spa, and the most Instagrammable pool in Thailand.",
        "Koh Yao Noi, Thailand", "Nov-Apr",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80",
        ["Private Infinity Pool", "Butler Service", "Kids Club", "Organic Garden", "Spa", "Cooking Classes", "Kayaking", "Rock Climbing"],
        ["24/7 Security", "Medical", "Pool Fencing", "Life Jackets"],
        ["Take the speedboat transfer from Phuket — it's an adventure itself.", "The Grotto restaurant in a cave is unforgettable for kids.", "Book a private longtail boat tour of Phang Nga Bay for James Bond Island."],
        {"title": "Cave dinner made our trip", "excerpt": "Eating in a limestone cave as the sun set was something our kids will never forget.", "author": "Michael", "fullStory": "Six Senses Yao Noi is the most memorable family stay we've ever had. Getting there by speedboat was half the fun. Our villa's infinity pool seemed to merge with the stunning Phang Nga Bay. The highlight was dinner at The Grotto — a restaurant set inside a cave, lit by candlelight, with the sea lapping at the entrance. Our kids felt like explorers."},
        {"halfDay": "Pool, kids club, organic garden tour", "fullDay": "Phang Nga Bay tour, rock climbing, spa", "bestFor": "Active families wanting stunning views"},
        "10%", ["Six Senses Yao Noi", "Yao Noi luxury", "Phang Nga Bay family"],
        "Book Six Senses Yao Noi", "Klook Six Senses Yao Noi", None, None),

    # ─── Koh Samui ───
    make_dest("phuket", "Four Seasons Koh Samui", "Koh Samui", "Thailand",
        "Luxury Resort", "0-16", 4.8, "$$$$", 96,
        "Luxurious hilltop resort on Koh Samui's northwestern coast with sweeping Gulf of Siam views. Private pool villas nestled in coconut groves, a palm-fringed beach, and the legendary Four Seasons kids' program. The resort's Thai chefs offer family cooking classes.",
        "Laem Yai Beach, Koh Samui", "Dec-Mar",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
        ["Butler Service", "Kids Club", "Private Pool", "Spa", "Cooking Classes", "Water Sports", "Tennis", "Fitness Center"],
        ["24/7 Security", "Medical", "Pool Fencing", "Beach Safety"],
        ["Book a One-Bedroom Pool Villa for maximum privacy.", "The complimentary kids' program runs all day with Thai craft lessons.", "The Koh Thai restaurant serves authentic Southern Thai cuisine in a treehouse setting."],
        {"title": "Koh Samui perfection", "excerpt": "The kids learned to make pad thai while we enjoyed a couples spa treatment.", "author": "Laura", "fullStory": "Four Seasons Koh Samui delivered on every level. Our pool villa was perched on the hillside with views that stretched to the horizon. The kids' club was exceptional — our 6-year-old learned traditional Thai dancing and made a friend from Japan. The cooking class where our family made pad thai together was a highlight."},
        {"halfDay": "Pool, kids club, beach", "fullDay": "Island tour, cooking class, spa, sunset cruise", "bestFor": "Families seeking a complete luxury resort"},
        "10%", ["Four Seasons Koh Samui", "FS Koh Samui", "Samui luxury resort"],
        "Book FS Koh Samui", "Klook FS Koh Samui", None, None)
])

# ─── Dubai (3 new) ───
new_destinations.extend([
    make_dest("dubai", "Burj Al Arab", "Dubai", "UAE",
        "Luxury Resort", "4-16", 4.8, "$$$$", 97,
        "The world's most iconic hotel — a billowing sail of pure luxury on its own private island. 202 duplex suites with floor-to-ceiling ocean views, private butlers, a fleet of Rolls Royces, and one of the world's most photographed infinity pools. Kids receive a dedicated 'Kids Concierge' with personalized activities.",
        "Jumeirah Beach, Dubai", "Nov-Mar",
        "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=800&q=80",
        ["Private Butler", "Kids Concierge", "Private Beach", "Infinity Pool", "Spa", "Michelin Dining", "Helipad", "Rolls Royce Fleet"],
        ["24/7 Security", "Medical Center", "Pool Fencing", "Child Safety"],
        ["Book a stay in the Royal Suite for the yacht-like living experience.", "The underwater restaurant Al Mahara is mesmerizing for kids who love fish.", "Request the butler to draw a bath with gold flakes — yes, really."],
        {"title": "Gold-flake bathtub", "excerpt": "Our daughter still talks about the gold-flake bath the butler drew for her.", "author": "Fatima", "fullStory": "Burj Al Arab is as extraordinary as the pictures suggest. Our duplex suite had a private cinema, a rotating bed, and a butler who anticipated our every need. The kids' 'Concierge' set up a treasure hunt across the hotel and a private movie screening. We ate at Al Mahara — sitting in a submarine-like dining room surrounded by a massive aquarium."},
        {"halfDay": "Pool, spa, private beach", "fullDay": "Desert safari, Dubai Mall, Burj Khalifa", "bestFor": "Over-the-top luxury for families"},
        "12%", ["Burj Al Arab", "Dubai iconic hotel", "Dubai luxury family"],
        "Book Burj Al Arab", "Klook Burj Al Arab", None, None),

    make_dest("dubai", "Atlantis The Royal", "Dubai", "UAE",
        "Luxury Resort", "0-17", 4.7, "$$$$", 96,
        "Dubai's newest landmark — a bold architectural statement on Palm Jumeirah with the world's most photographed infinity pool, 90-meter-high sky pool, and 17 world-class restaurants including three by Michelin-starred chefs. The largest Aquaventure waterpark and Lost Chambers Aquarium are on the doorstep.",
        "Palm Jumeirah, Dubai", "Nov-Mar",
        "https://images.unsplash.com/photo-1592800312669-4130df8b795c?w=800&q=80",
        ["Butler Service", "Kids Club", "Waterpark Access", "Aquarium", "Multiple Pools", "Michelin Dining", "Spa", "Private Beach"],
        ["24/7 Security", "Medical Center", "Lifeguards", "Child Wristbands"],
        ["The Royal Mansion suite has its own private pool and spa.", "Kids under 12 eat free at most restaurants.", "The Sky Pool on the 22nd floor is adults-only — perfect for a parents' break."],
        {"title": "Waterpark paradise", "excerpt": "We didn't leave the resort for 4 days. Aquaventure alone could fill a week.", "author": "Omar", "fullStory": "Atlantis The Royal is a city unto itself. The sheer scale is overwhelming — in the best way. Our kids spent every morning at Aquaventure waterpark while we lounged on the private beach. The dining options are incredible; we ate at a different world-class restaurant every night. The Lost Chambers Aquarium mesmerized our 4-year-old for hours."},
        {"halfDay": "Waterpark, aquarium, pool", "fullDay": "Beach, spa, dining, sky pool", "bestFor": "Families wanting non-stop entertainment"},
        "10%", ["Atlantis The Royal", "Dubai Palm Jumeirah", "Dubai family waterpark"],
        "Book Atlantis The Royal", "Klook Atlantis The Royal", None, None),

    make_dest("dubai", "One&Only Royal Mirage", "Dubai", "UAE",
        "Luxury Resort", "2-14", 4.7, "$$$$", 93,
        "An Arabian palace resort spread over 65 acres of lush gardens on Jumeirah Beach. Moorish architecture, private beach, three distinct wings (Arabian Court, Residence & Spa, The Palace), and the legendary One&Only KidsOnly club. A serene escape from Dubai's glittering skyline.",
        "Jumeirah Beach, Dubai", "Nov-Mar",
        "https://images.unsplash.com/photo-1590073242678-70ee3fc28f8e?w=800&q=80",
        ["Butler Service", "Kids Club",