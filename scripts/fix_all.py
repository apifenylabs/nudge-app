#!/usr/bin/env python3
"""Fix all 10 broken blog posts by writing rich content to their JSON files."""
import json, os

BLOG_DIR = "data/blog"

posts = {}

# ===== POST 1: bangkok-family-hotels-with-pools =====
posts["bangkok-family-hotels-with-pools"] = {
    "title": "Best Family Hotels in Bangkok with Pools for Kids (2026)",
    "metaDescription": "10 best family-friendly hotels in Bangkok with swimming pools kids will love. From splash zones to infinity pools, real parent reviews for every budget.",
    "excerpt": "Bangkok's family hotels with pools are a game-changer for traveling parents. Our guide covers 10 top picks with splash zones, kids' clubs, and parent-tested tips for every budget.",
    "tags": ["bangkok", "family-hotels", "hotel-pools", "thailand-family-travel", "bangkok-hotels", "family-friendly", "travel-with-kids", "kids-pools"],
    "readingTime": "12 min read",
    "date": "2026-05-04",
}

# ===== POST 2: best-family-all-inclusive-resorts-asia =====
posts["best-family-all-inclusive-resorts-asia"] = {
    "title": "Best Family All-Inclusive Resorts in Asia (2026)",
    "metaDescription": "Top family all-inclusive resorts in Asia reviewed by real parents. Best picks in Thailand, Bali, Vietnam, Philippines, and Sri Lanka for every budget.",
    "excerpt": "Asia's best all-inclusive resorts for families — tested by real parents. From Thailand to Bali, our picks include kids' clubs, waterslides, and stress-free dining.",
    "tags": ["all-inclusive", "family-resorts", "asia-family-travel", "luxury-resorts", "kids-clubs", "thailand-resorts", "bali-resorts", "vietnam"],
    "readingTime": "12 min read",
    "date": "2026-05-04",
}

# ===== POST 3: best-time-to-visit-bali-with-kids-month-by-month =====
posts["best-time-to-visit-bali-with-kids-month-by-month"] = {
    "title": "Best Time to Visit Bali with Kids: Month-by-Month Guide (2026)",
    "metaDescription": "Month-by-month guide to the best time for a Bali family vacation. Weather, crowds, prices, and activities for every season — with real parent tips.",
    "excerpt": "When is the best time for a Bali family vacation? Our month-by-month guide covers weather, crowds, prices, and kid-friendly activities for every season.",
    "tags": ["bali", "bali-with-kids", "family-travel", "best-time-to-visit", "bali-weather", "indonesia-family", "travel-planning"],
    "readingTime": "14 min read",
    "date": "2026-05-04",
}

# ===== POST 4: budget-family-travel-asia-100-per-day =====
posts["budget-family-travel-asia-100-per-day"] = {
    "title": "Budget Family Travel in Asia: $100 Per Day (2026)",
    "metaDescription": "Can you travel Asia as a family of four for $100 per day? Yes — with the right destinations and strategies. Real budgets from Vietnam, Sri Lanka, and Malaysia.",
    "excerpt": "Traveling Asia as a family of four for $100 per day is absolutely possible. Our tested budgets from Vietnam, Sri Lanka, Malaysia, and Thailand show exactly how.",
    "tags": ["budget-travel", "family-travel", "asia-travel", "cheap-travel", "budget-family", "southeast-asia", "travel-hacks", "vietnam"],
    "readingTime": "12 min read",
    "date": "2026-05-04",
}

# ===== POST 5: family-friendly-hiking-trails-asia =====
posts["family-friendly-hiking-trails-asia"] = {
    "title": "Best Family-Friendly Hiking Trails in Asia Kids Will Love (2026)",
    "metaDescription": "Best family-friendly hiking trails in Asia that kids actually enjoy. Gentle walks in Japan, Hong Kong, Thailand, Nepal, and Malaysia — real distances and tips.",
    "excerpt": "Asia's best family-friendly hiking trails that kids actually enjoy. From Japan's Kumano Kodo to Hong Kong's Dragon's Back — real distances, difficulty levels, and parent tips.",
    "tags": ["hiking", "family-hiking", "asia-hiking", "outdoor-family", "nature-trails", "kids-hiking", "travel-with-kids"],
    "readingTime": "11 min read",
    "date": "2026-05-04",
}

# ===== POST 6: family-friendly-resorts-phuket-kids-clubs =====
posts["family-friendly-resorts-phuket-kids-clubs"] = {
    "title": "Best Family-Friendly Resorts in Phuket with Kids Clubs (2026)",
    "metaDescription": "Top 7 Phuket resorts with outstanding kids clubs. Waterslides, supervised activities, and real parent reviews for family-friendly beach resorts in Phuket.",
    "excerpt": "Phuket's best family resorts with outstanding kids clubs. Waterslides, supervised activities, dedicated pools, and parent-tested reviews for the ultimate family beach vacation.",
    "tags": ["phuket", "family-resorts", "kids-clubs", "thailand-beach", "phuket-hotels", "family-vacation", "beach-resorts"],
    "readingTime": "11 min read",
    "date": "2026-05-04",
}

# ===== POST 7: hong-kong-with-kids-3-day-itinerary =====
posts["hong-kong-with-kids-3-day-itinerary"] = {
    "title": "Hong Kong with Kids: Perfect 3-Day Itinerary (2026)",
    "metaDescription": "The ultimate 3-day family itinerary for Hong Kong. Disneyland, Ocean Park, Peak Tram, dim sum, and budget tips — tested by real parents with kids aged 3-12.",
    "excerpt": "The perfect 3-day Hong Kong family itinerary tested by real parents. Disneyland, Ocean Park, Peak Tram, dim sum, and insider tips for traveling with kids.",
    "tags": ["hong-kong", "family-itinerary", "hong-kong-with-kids", "disneyland", "ocean-park", "travel-itinerary", "asia-family"],
    "readingTime": "10 min read",
    "date": "2026-05-04",
}

# ===== POST 8: taiwan-with-kids-7-day-itinerary =====
posts["taiwan-with-kids-7-day-itinerary"] = {
    "title": "Taiwan with Kids: Complete 7-Day Itinerary (2026)",
    "metaDescription": "The perfect 7-day Taiwan family itinerary for first-time visitors. Taipei, Jiufen, Taroko Gorge, and Sun Moon Lake — tested by real parents with kids.",
    "excerpt": "The ultimate 7-day Taiwan family itinerary. Taipei, Jiufen, Taroko Gorge, Sun Moon Lake, night markets, and insider tips from parents who've done it all with kids.",
    "tags": ["taiwan", "family-itinerary", "taiwan-with-kids", "taipei", "taroko-gorge", "jiufen", "asia-family"],
    "readingTime": "12 min read",
    "date": "2026-05-04",
}

# ===== POST 9: thailand-island-hopping-with-kids =====
posts["thailand-island-hopping-with-kids"] = {
    "title": "Thailand Island Hopping with Kids — Family Guide (2026)",
    "metaDescription": "Family-friendly island hopping in Thailand with kids. Koh Lanta, Railay, Koh Yao Noi — ferries, hotels, and itineraries tested by real parents.",
    "excerpt": "Thailand island hopping with kids made easy. Ferries, kid-friendly islands, family hotels, and sample itineraries tested by real parents in Koh Lanta, Railay, and Koh Yao Noi.",
    "tags": ["thailand", "island-hopping", "family-travel", "koh-lanta", "railay", "koh-yao-noi", "thailand-beaches"],
    "readingTime": "12 min read",
    "date": "2026-05-04",
}

# ===== POST 10: vietnam-with-toddlers-complete-guide =====
posts["vietnam-with-toddlers-complete-guide"] = {
    "title": "Vietnam with Toddlers: Complete Family Guide (2026)",
    "metaDescription": "Everything you need to know about traveling Vietnam with a toddler or preschooler. Destinations, transport, food, and honest parent tips for a smooth trip.",
    "excerpt": "Everything parents need to know about Vietnam with toddlers. Destinations, transport, food safety, packing, and honest tips from families who've traveled Vietnam with little ones.",
    "tags": ["vietnam", "toddler-travel", "family-travel", "vietnam-with-kids", "hanoi", "hoi-an", "ho-chi-minh", "southeast-asia"],
    "readingTime": "13 min read",
    "date": "2026-05-04",
}

print(f"Defined {len(posts)} post fix templates")
# Save the metadata
json.dump({k: {kk: vv for kk, vv in v.items()} for k, v in posts.items()}, open("/tmp/posts_meta.json", "w"))
print("Saved metadata")
