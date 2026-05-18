#!/usr/bin/env python3
"""Generate blog posts using Ollama REST API (no ANSI noise)."""
import json, os, sys, requests, time

BLOG_DIR = "/home/captain/.openclaw/workspace/luxury-family-travel/data/blog"
OLLAMA_URL = "http://localhost:11434/api/generate"

with open(os.path.join(BLOG_DIR, "bali-luxury-family-villas-private-pools-2026.json")) as f:
    REF = json.load(f)
print(f"[REF] Keys: {list(REF.keys())}")
print(f"[REF] Tags example: {REF['tags']}")
print(f"[REF] readingTime: {REF['readingTime']}")
print(f"[REF] relatedDestinations: {REF['relatedDestinations']}")

POSTS = [
    {
        "slug": "best-luxury-private-villas-bali-2026",
        "title": "Top 10 Luxury Private Villas in Bali for Families — 2026 Review",
        "excerpt": "Discover Bali's most exclusive private villas perfect for luxury family holidays. From cliffside infinity pools to private chefs and dedicated kids' clubs.",
        "readingTime": "10 min read",
        "tags": ["luxury-travel", "asia", "family", "bali", "villas", "indonesia", "private-pool"],
        "prompt": """Write a detailed, SEO-optimized blog post titled 'Top 10 Luxury Private Villas in Bali for Families — 2026 Review' for a luxury family travel website. Include an introduction about why families choose Bali for luxury travel, then list 10 top villas with descriptions of what makes each special for families (kids clubs, pools, nannies, dining, activities), and end with practical tips (best time to visit, booking advice, nanny services, pool safety). Write at least 1500 words of rich, engaging content in British English. Write in a warm, sophisticated tone that appeals to affluent parents. Use markdown headings for each villa and section.""",
        "relatedDestinations": ["bali", "seminyak", "ubud", "canggu", "jimbaran", "nusa-dua", "indonesia"]
    },
    {
        "slug": "maldives-family-overwater-villas-2026",
        "title": "Best Overwater Villas in the Maldives for Families with Kids — 2026",
        "excerpt": "The Maldives isn't just for honeymooners. Discover the best overwater villas that truly welcome children, with kids' clubs, shallow lagoons, and family-friendly dining.",
        "readingTime": "12 min read",
        "tags": ["luxury-travel", "asia", "family", "maldives", "overwater-villas", "kids-club", "snorkeling"],
        "prompt": """Write a detailed, SEO-optimized blog post titled 'Best Overwater Villas in the Maldives for Families with Kids — 2026' for a luxury family travel website. Start by explaining that the Maldives is now incredibly family-friendly, not just for couples. Then list 10 top overwater villa resorts that welcome children, describing each resort's family amenities: kids clubs, shallow lagoons for safe swimming, family-friendly dining, babysitting services, teen programmes, and water sports. Include sections on best time to visit, how to choose the right atoll, seaplane tips with kids, and what to pack. Write at least 1800 words in British English. Warm, sophisticated tone for affluent parents. Use markdown headings.""",
        "relatedDestinations": ["maldives", "north-male-atoll", "south-male-atoll", "baa-atoll", "ari-atoll"]
    },
    {
        "slug": "private-jet-travel-families-asia",
        "title": "Private Jet Travel for Families in Asia — Complete Guide 2026",
        "excerpt": "Everything affluent families need to know about flying private in Asia: costs, charter companies, empty-leg deals, and how to make long-haul travel effortless with children.",
        "readingTime": "10 min read",
        "tags": ["luxury-travel", "asia", "family", "private-jet", "VIP", "exclusive", "travel-tips"],
        "prompt": """Write a detailed, SEO-optimized blog post titled 'Private Jet Travel for Families in Asia — Complete Guide 2026' for a luxury family travel website. Cover: why families choose private jets in Asia, major charter companies (VistaJet, Air Charter Service, etc.), costs and how pricing works, empty-leg opportunities, popular routes (Singapore to Maldives, Hong Kong to Bali, etc.), what to expect on board with children, catering for kids, pet policies, and booking tips. Include a comparison section and practical advice for first-time private jet travellers. Write at least 1500 words in British English. Warm, sophisticated tone. Use markdown headings.""",
        "relatedDestinations": ["singapore", "hong-kong", "bali", "maldives", "bangkok", "tokyo", "asia"]
    },
    {
        "slug": "best-michelin-restaurants-tokyo-family-friendly",
        "title": "Best Michelin-Starred Restaurants in Tokyo That Welcome Kids — 2026 Guide",
        "excerpt": "Tokyo has more Michelin stars than any city on earth. Here are the starred restaurants where children are genuinely welcomed, with tips on booking, menus, and dining etiquette.",
        "readingTime": "8 min read",
        "tags": ["luxury-travel", "asia", "family", "tokyo", "michelin", "dining", "japan", "food"],
        "prompt": """Write a detailed, SEO-optimized blog post titled 'Best Michelin-Starred Restaurants in Tokyo That Welcome Kids — 2026 Guide' for a luxury family travel website. Introduce Tokyo as the Michelin capital of the world and explain that many starred restaurants now welcome well-behaved children. List 8-10 Michelin-starred restaurants in Tokyo that are genuinely family-friendly, describing the cuisine, atmosphere, children's menu options (if any), dress code, and how to book. Include a section on dining etiquette in Japan with children, what time to book, and how to handle picky eaters at high-end restaurants. Write at least 1300 words in British English. Warm, sophisticated tone. Use markdown headings.""",
        "relatedDestinations": ["tokyo", "japan", "ginza", "roppongi", "shibuya", "shinjuku"]
    },
    {
        "slug": "luxury-safari-thailand-eco-resorts",
        "title": "Luxury Safari & Eco-Resorts in Thailand for Families — Top Picks 2026",
        "excerpt": "Thailand's wild side: from ethical elephant sanctuaries to jungle-canopy treehouses, discover the most extraordinary safari-style eco-luxury resorts for families.",
        "readingTime": "10 min read",
        "tags": ["luxury-travel", "asia", "family", "thailand", "safari", "eco-resorts", "nature", "elephant-sanctuaries"],
        "prompt": """Write a detailed, SEO-optimized blog post titled 'Luxury Safari & Eco-Resorts in Thailand for Families — Top Picks 2026' for a luxury family travel website. Cover Thailand's best safari and eco-luxury experiences suitable for families. List 8-10 top properties and experiences: ethical elephant sanctuaries (Elephant Hills, etc.), national park lodges (Khao Sok, etc.), rainforest resorts, glamping experiences, and conservation-focused properties. For each, describe family amenities, age suitability, wildlife viewing opportunities, and sustainability credentials. Include practical tips: best time to visit, what to pack for jungle with kids, health considerations, and how to choose ethical animal experiences. Write at least 1500 words in British English. Warm, sophisticated tone. Use markdown headings.""",
        "relatedDestinations": ["thailand", "chiang-mai", "chiang-rai", "khao-sok", "kanchanaburi", "khao-yai", "phuket"]
    }
]

def call_ollama(prompt_text):
    """Call local Ollama via REST API."""
    payload = {
        "model": "llama3.2",
        "prompt": prompt_text,
        "stream": False,
        "options": {"temperature": 0.7, "num_predict": 4096}
    }
    r = requests.post(OLLAMA_URL, json=payload, timeout=600)
    r.raise_for_status()
    return r.json()["response"].strip()

for i, post in enumerate(POSTS, 1):
    print(f"\n[{i}/5] Generating: {post['title']} (slug: {post['slug']})")
    sys.stdout.flush()
    
    try:
        content = call_ollama(post['prompt'])
    except Exception as e:
        print(f"  ERROR: {e}")
        continue
    
    wc = len(content.split())
    cc = len(content)
    print(f"  Got {cc} chars, ~{wc} words", flush=True)
    
    # Trim hallucinated title repetition at start
    lines = content.split('\n')
    while lines and (lines[0].strip().strip('#').strip() == post['title'].strip() or lines[0].strip() == ''):
        lines = lines[1:]
    content = '\n'.join(lines).strip()
    
    blog_json = {
        "slug": post['slug'],
        "title": post['title'],
        "excerpt": post['excerpt'],
        "date": "2026-05-17",
        "author": "Luxury Family Travel Asia Team",
        "tags": post['tags'],
        "readingTime": post['readingTime'],
        "content": content,
        "relatedDestinations": post['relatedDestinations']
    }
    
    outpath = os.path.join(BLOG_DIR, f"{post['slug']}.json")
    with open(outpath, 'w') as f:
        json.dump(blog_json, f, indent=2, ensure_ascii=False)
    
    print(f"  ✓ Saved to {os.path.basename(outpath)}", flush=True)
    time.sleep(3)

print("\n=== ALL 5 POSTS GENERATED ===")
