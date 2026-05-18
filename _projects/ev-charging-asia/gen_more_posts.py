import json, os, requests, re

DEEPSEEK_KEY = "sk-bd34aad94bc348faa306a253d606d7db"

def ask_deepseek(prompt, model="deepseek-chat", max_tokens=4096):
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": max_tokens, "temperature": 0.7}
    r = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

os.chdir("/home/captain/.openclaw/workspace/ev-charging-asia")

# Read existing blog post slugs to find gaps
existing = set()
for f in os.listdir("data/blog"):
    if f.endswith(".json"):
        slug = f.replace(".json", "")
        existing.add(slug)

print(f"Existing posts: {len(existing)}")

# Topics not yet covered — focused on new destinations and rankings
new_posts = [
    ("Top 10 EV-Friendly Hotels in Malaysia: Best Family Stays with EV Charging 2026",
     "Ranking the 10 best hotels in Malaysia with EV charging for families. From KL to Penang, Langkawi to Johor. Includes charging speed, location, and family amenities."),
    
    ("Singapore to Johor Bahru EV Road Trip: Cross-Border Charging Guide for Families",
     "Complete guide for driving an EV from Singapore to Johor Bahru. Includes crossing customs, charging at JB malls, and family-friendly activities in Johor."),
    
    ("Vietnam EV Road Trip: Ho Chi Minh City to Da Lat — Complete Guide",
     "Drive an EV from Ho Chi Minh City to Da Lat in Vietnam's Central Highlands. 300km route with charging stops, mountain roads, and family activities."),
    
    ("Jakarta to Yogyakarta EV Road Trip: Java's Cultural Heart by Electric Car",
     "Drive 550km from Jakarta to Yogyakarta across Java in an EV. Charging stops along the Trans-Java Toll Road, family-friendly attractions, and cultural highlights."),
    
    ("Manila to Baguio EV Road Trip: Philippines' Cordillera Mountain Route",
     "Complete guide to driving an EV from Manila to Baguio City. 250km through the Cordillera mountains with charging stops at Marcos Highway rest areas."),
    
    ("Top 10 EV Charging Apps in Asia Compared 2026: Which One Should You Use?",
     "Comparing ChargePlus, PlugShare, State Grid e-Charging, TELD, PTT EV Station PluZ, EA Anywhere, NIO Power, Tesla App, and more. Features, coverage, and user reviews."),
]

# Generate via DeepSeek
template = """You are a travel writer. Write a blog post in plain text (not JSON), at least 1000 words.

Topic: {title}

{description}

Format as markdown with headings (##) and at least one table. Include specific distances in km, costs in local currency, and real charging station names.

Write the content directly — no JSON wrapper."""

for title, desc in new_posts:
    slug = title.lower().replace(":", "").replace("'", "").replace("’", "")
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug).strip('-')
    
    if slug in existing:
        print(f"Skipping {slug} — already exists")
        continue
    
    prompt = template.format(title=title, description=desc)
    print(f"Generating {slug}...")
    
    resp = ask_deepseek(prompt, max_tokens=3000)
    
    # Build JSON entry matching existing format
    post = {
        "slug": slug,
        "title": title,
        "excerpt": desc,
        "date": "2026-05-16",
        "author": "EV Charging Asia Team",
        "tags": [t.lower() for t in title.split() if len(t) > 3][:8],
        "readingTime": "8 min read",
        "content": resp
    }
    
    fname = f"data/blog/{slug}.json"
    with open(fname, "w") as f:
        json.dump(post, f, indent=2)
    print(f"  -> {fname} ({len(resp)} chars)")
    
print("Done!")
