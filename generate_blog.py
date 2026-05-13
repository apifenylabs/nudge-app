#!/usr/bin/env python3
"""Generate 5 blog posts for Kids Activities Asia using Ollama."""
import json
import subprocess
import sys
import os

BLOG_DIR = "/home/captain/.openclaw/workspace/kids-activities-asia/data/blog"
os.makedirs(BLOG_DIR, exist_ok=True)

PROMPTS = [
    {
        "slug": "tokyo-with-kids-complete-family-guide",
        "title": "Tokyo with Kids: The Complete Family Travel Guide — 2026",
        "excerpt": "Planning a family trip to Tokyo? From navigating the world-famous train system with a stroller to discovering the city's best kid-approved attractions, restaurants, and parks — this is everything you need to know for an unforgettable family adventure in Japan's capital.",
        "tags": ["tokyo", "japan", "family-travel-guide", "kids-activities", "stroller-travel"],
        "readingTime": 12,
        "system_prompt": """You are a professional travel writer for a family travel website. Write a VERY detailed 1500-2000 word guide. Use REAL specifics: station names (Shibuya, Shinjuku, Ueno), price ranges in JPY, real restaurant names, real hotel names. Include affiliate links to Klook and Viator.

Write the content as clean HTML paragraphs with h2 headings, ul/li lists, and bold tags. Include:
- Getting around Tokyo with a stroller (which subway lines are stroller-friendly, elevator locations at major stations)
- Top attractions: teamLab Planets (¥3,200 adults), Tokyo Disneyland (¥7,900 single-day), Ueno Zoo (¥600), Sanrio Puroland, Ghibli Museum
- Kid-friendly restaurants: Kiddy Land area, Pokemon Cafe, ninja-themed restaurants
- Where to stay: Shinjuku, Ueno, Odaiba areas
- Practical tips: IC cards, convenience store meals, playgrounds in parks, nursing rooms
- Sample 5-day itinerary""",
        "user_prompt": "Write the full blog post about Tokyo with Kids. Output ONLY valid JSON matching the structure given."
    },
    {
        "slug": "best-kid-friendly-cooking-classes-asia",
        "title": "Best Kid-Friendly Cooking Classes in Asia — 2026",
        "excerpt": "From making pad thai in Bangkok to rolling sushi in Tokyo, these hands-on cooking classes across Asia welcome young chefs with open arms. We've rounded up the best family-friendly culinary experiences that kids will actually enjoy (and parents will love eating the results).",
        "tags": ["cooking-classes", "kids-cooking", "bangkok", "bali", "tokyo", "singapore", "hong-kong"],
        "readingTime": 10,
        "system_prompt": """You are a professional travel writer for a family travel website. Write a VERY detailed 1500-2000 word guide about the best kid-friendly cooking classes in Asia.

Cover these cities with specific details:
- BANGKOK: Baipai Thai Cooking School (children from 6+, ฿2,800/person), Blue Elephant (half-day courses), Silom Thai Cooking School
- BALI: Paon Bali Cooking Class (Ubud, kids 5+ welcome, from IDR 350,000), Bali Asli (east Bali), Casa Luna Cooking School
- TOKYO: Cooking Sun (Shinjuku, family classes from ¥5,500), ABC Cooking Studio (locations across Tokyo), Tokyo Sushi Academy
- SINGAPORE: Shermay's Cooking School (kids' classes S$50-80), Cookery Magic (Tiong Bahru), Palate Sensations
- HONG KONG: Hong Kong Cookery (Wan Chai, family dim sum classes HK$650), Cook Food Studio, Dabnih!

Include affiliate links to Klook and Viator for booking.
Write content as clean HTML with h2 headings, ul/li, bold tags for emphasis. Include specific prices in local currency, age recommendations, booking tips, and what each class covers.""",
        "user_prompt": "Write the full blog post about kid-friendly cooking classes in Asia. Output ONLY valid JSON."
    },
    {
        "slug": "free-things-to-do-hong-kong-with-kids",
        "title": "Free Things to Do in Hong Kong with Kids — 2026",
        "excerpt": "Hong Kong doesn't have to break the bank. From world-class hiking trails with skyline views to free museums, beaches, and sprawling parks, here's our ultimate guide to enjoying Hong Kong with kids for next to nothing.",
        "tags": ["hong-kong", "free-activities", "family-budget", "parks", "beaches", "hiking"],
        "readingTime": 9,
        "system_prompt": """You are a professional travel writer for a family travel website. Write a VERY detailed 1200-1500 word guide about free things to do in Hong Kong with kids.

Include specific details:
- PARKS: Hong Kong Park (free aviary), Kowloon Walled City Park, Victoria Park, Cyberport Waterfront Park (great playground)
- MUSEUMS (free entry days): Hong Kong Museum of History (free permanent exhibition), Hong Kong Science Museum (free on Wednesdays!), Hong Kong Heritage Museum, Art Museum at CUHK
- BEACHES: Repulse Bay, Shek O Beach, Clear Water Bay (all free public beaches with lifeguards)
- HIKING TRAILS: Dragon's Back (easy family hike 2-3 hours), Peak Circle Walk (flat, stroller-friendly), Bowen Road Fitness Trail
- PLAYGROUNDS: Tsim Sha Tsui Promenade, West Kowloon Art Park, Hong Kong Park playground
- FREE ATTRACTIONS: Symphony of Lights (8pm nightly), Ten Thousand Buddhas Monastery, Nan Lian Garden
- FERRIES: Star Ferry (adults HK$4-5, children HK$2-3)

Write content as clean HTML with h2 headings, ul/li, bold tags. Include practical tips about opening hours, best times to visit, and nearby food options.""",
        "user_prompt": "Write the full blog post about free things to do in Hong Kong with kids. Output ONLY valid JSON."
    },
    {
        "slug": "family-friendly-day-trips-from-bangkok",
        "title": "Family-Friendly Day Trips from Bangkok — 2026",
        "excerpt": "Escape the hustle of Bangkok with these incredible day trips that kids will love. From ancient temple ruins in Ayutthaya to ethical elephant encounters, floating markets, and hands-on farm experiences, here are the best family excursions within easy reach of the Thai capital.",
        "tags": ["bangkok", "day-trips", "thailand", "ayutthaya", "elephant-sanctuary", "floating-markets", "family-travel"],
        "readingTime": 11,
        "system_prompt": """You are a professional travel writer for a family travel website. Write a VERY detailed 1500-1800 word guide about the best family-friendly day trips from Bangkok.

Include specific details with prices in THB:
- AYUTTHAYA: UNESCO World Heritage site, 80km from Bangkok. Train from Hua Lamphong (฿15-45/person), hiring a private car (฿2,500-3,500). Bike rental for exploring (฿50-100/day). Kid-friendly temples: Wat Mahathat, Wat Yai Chai Mongkhon. Elephantstay Ayutthaya (฿2,000/half day).
- DAMNOEN SADUAK FLOATING MARKET: 100km southwest. Tour packages from ฿400-800/person. Boat rides ฿150-500. Best time: 7-9am before crowds. Tips for kids.
- SAMUT PRAKARN CROCODILE FARM & ZOO: 30km south. Adults ฿300, kids ฿200. Crocodile shows, elephant shows. Alternative: Crocodile Lake.
- SAFARI WORLD: 40km east. Adults ฿1,500, kids ฿1,200. Drive-through safari, marine park shows.
- ELEPHANT SANCTUARIES: Elephant Jungle Sanctuary (ethical, 2hr from Bangkok, ฿2,500/half day), Samui Elephant Sanctuary
- FLOATING MARKETS CLOSER: Taling Chan Floating Market (only 12km from Bangkok center, weekends only). Khlong Lat Mayom.
- FARM EXPERIENCES: Farm de Lek (organic farm, workshops), Thai Farmer's House
- BANG KACHO: "Green Lung" of Bangkok, bike through jungle, 30min from city

Include transport logistics (train, car hire, tour booking via Klook/Viator), best time to visit each, and practical parenting tips. Write as clean HTML.""",
        "user_prompt": "Write the full blog post about family-friendly day trips from Bangkok. Output ONLY valid JSON."
    },
    {
        "slug": "best-theme-parks-asia-families-young-kids",
        "title": "Best Theme Parks in Asia for Families with Young Kids — 2026",
        "excerpt": "Looking for theme park fun beyond Disney and Universal? These lesser-known but incredible Asian parks cater specifically to younger children with gentle rides, water play areas, and character experiences that won't overwhelm little ones. Your toddlers and preschoolers will thank you.",
        "tags": ["theme-parks", "young-kids", "asia", "family-attractions", "toddler-friendly", "amusement-parks"],
        "readingTime": 10,
        "system_prompt": """You are a professional travel writer for a family travel website. Write a VERY detailed 1500-2000 word guide about the best theme parks in Asia for families with young kids (NOT Disney, NOT Universal - the less obvious ones).

Cover at LEAST these parks with specific details:
- LEGOLAND MALAYSIA (Johor Bahru, 1hr from Singapore): Water park + theme park. No queue system is amazing for young kids. Ages 2-12 sweet spot. Duplo Playtown, Lego Kingdom. Tickets MYR 129-159. Kids under 2 free. Water park included in combo.
- LEGOLAND KOREA (Chuncheon): Similar to Malaysia but smaller. Good for Seoul day trips.
- KIDZANIA TOKYO (Toyota City/AEON Mall): Not a theme park per se but kids role-play 100+ jobs. Ages 3-15. Half-day (¥3,100-4,100) vs full-day.
- KIDZANIA (Bangkok, Kuala Lumpur, Singapore, Jakarta): Multiple locations. Bangkok branch at Siam Paragon. Converts kids into mini-professionals.
- PORTO EUROPE (Nara, Japan): European-themed, family-friendly. Gentle attractions. Adults ¥3,400, kids ¥2,000.
- TOBU ZOO PARK & HANA PARK (Saitama): Zoo + amusement park combo with gentle rides. Reasonable prices.
- LOTTE WORLD (Seoul): Indoor (Kids Zone) + outdoor (Magic Island). Magic Pass system for fast track. Adults ₩47,000, kids ₩36,000. Under 36 months free.
- EVERLAND (Yongin, South Korea): Korea's largest theme park. Zootopia area, gentle rides. Tickets ₩40,000-50,000 if pre-booked.
- HAPPY MAGIC LAND (Macau): Indoor playground + theme park at Macau Fisherman's Wharf.
- FANTASY WORLD (Thailand, near Chiang Mai): Small, family-run. Rides perfect for 3-8 year olds.
- HARRY POTTER: Studio Tour Tokyo - opening 2026, but for older kids.

Include ticket prices, height restrictions, best age ranges, food options, stroller policies, and affiliate links to Klook. Write as clean HTML with h2, ul/li, bold.""",
        "user_prompt": "Write the full blog post about theme parks in Asia for families with young kids. Output ONLY valid JSON."
    }
]

def generate_ollama(slug, title, excerpt, tags, reading_time, system_prompt, user_prompt):
    """Generate a blog post using Ollama."""
    full_prompt = f"""{system_prompt}

OUTPUT FORMAT - return ONLY valid JSON, no markdown, no code fences:
{json.dumps({
    "slug": slug,
    "title": title,
    "excerpt": excerpt,
    "date": "May 13, 2026",
    "content": "<p>Full HTML content here...</p>",
    "tags": tags,
    "author": "Kids Activities Asia Team",
    "readingTime": reading_time,
    "imageUrl": None
}, indent=2)}"""

    result = subprocess.run(
        ["ollama", "run", "llama3.2"],
        input=full_prompt.encode(),
        capture_output=True,
        timeout=180
    )
    
    stdout = result.stdout.decode("utf-8", errors="replace")
    stderr = result.stderr.decode("utf-8", errors="replace")
    
    # Try to parse JSON from the output
    # First try direct parse
    try:
        data = json.loads(stdout.strip())
        return data
    except json.JSONDecodeError:
        pass
    
    # Try to find JSON in the output (between { and })
    import re
    json_match = re.search(r'\{[\s\S]*"slug"[\s\S]*"imageUrl"\s*:\s*null\s*\}', stdout)
    if json_match:
        try:
            data = json.loads(json_match.group())
            return data
        except json.JSONDecodeError:
            pass
    
    # Try a broader match
    json_match = re.search(r'\{[\s\S]*"slug"[\s\S]*\}', stdout)
    if json_match:
        try:
            data = json.loads(json_match.group())
            return data
        except json.JSONDecodeError:
            pass
    
    return {"raw_output": stdout, "stderr": stderr, "error": "Could not parse JSON"}


def main():
    for i, post in enumerate(PROMPTS):
        print(f"\n{'='*60}")
        print(f"Generating post {i+1}/{len(PROMPTS)}: {post['title']}")
        print(f"{'='*60}")
        sys.stdout.flush()
        
        result = generate_ollama(
            post["slug"],
            post["title"],
            post["excerpt"],
            post["tags"],
            post["readingTime"],
            post["system_prompt"],
            post["user_prompt"]
        )
        
        if "error" in result:
            print(f"ERROR: {result['error']}")
            print(f"STDERR: {result.get('stderr', '')[:500]}")
            sys.stdout.flush()
            continue
        
        # Ensure the content is proper HTML
        if isinstance(result.get("content"), str):
            content = result["content"]
        else:
            print("WARNING: content is not a string, using placeholder")
            sys.stdout.flush()
            continue
        
        filepath = os.path.join(BLOG_DIR, f"{post['slug']}.json")
        
        output = {
            "slug": post["slug"],
            "title": post["title"],
            "excerpt": post.get("excerpt", result.get("excerpt", "")),
            "date": "May 13, 2026",
            "content": content,
            "tags": post["tags"],
            "author": "Kids Activities Asia Team",
            "readingTime": post["readingTime"],
            "imageUrl": None
        }
        
        with open(filepath, "w") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Saved to {filepath}")
        print(f"  Content length: {len(content)} chars")
        sys.stdout.flush()
    
    print("\nDone! All posts generated.")

if __name__ == "__main__":
    main()
