import json, os, requests, re

DEEPSEEK_KEY = "sk-bd34aad94bc348faa306a253d606d7db"

def ask_deepseek(prompt, model="deepseek-chat", max_tokens=4096):
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": max_tokens, "temperature": 0.7}
    r = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

os.chdir("/home/captain/.openclaw/workspace/ev-charging-asia")

existing = set(os.listdir("data/blog"))

topics = [
    ("Top 10 Budget-Friendly EVs for Asian Families 2026",
     "Ranking the 10 most affordable EVs for families in Asia. Includes price in local currencies, range, safety rating, and family-friendly features."),
    
    ("Top 10 Longest-Range EVs for Asian Road Trips 2026",
     "Compare the 10 EVs with the longest real-world range available in Asia. Perfect for the family that wants to minimize charging stops on road trips."),
    
    ("Top 5 EV Road Trips in Thailand Every Family Should Try",
     "From Bangkok to Chiang Mai, Phuket to Krabi — the 5 best EV road trip routes in Thailand ranked by scenery, charging infrastructure, and family activities."),
]

for title, desc in topics:
    slug = title.lower().replace(":", "").replace("'", "")
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug).strip('-')
    
    if slug + ".json" in existing:
        print(f"Skipping {slug}")
        continue
    
    prompt = f"""You are a travel writer for EV Charging Asia. Write a blog post.

Topic: {title}
Description: {desc}

Write at least 1200 words in markdown format with:
- ## headings for each entry
- At least one table comparing entries
- Specific prices in USD and local currencies, range in km, charging speeds in kW
- Family-friendly tips for each
- Natural affiliate mentions: 'Book your stay on Booking.com'

Write the content directly. No JSON wrapper."""

    print(f"Generating {slug}...")
    resp = ask_deepseek(prompt, max_tokens=3000)
    
    post = {
        "slug": slug,
        "title": title,
        "excerpt": desc,
        "date": "2026-05-16",
        "author": "EV Charging Asia Team",
        "tags": [slug.split("-")[0], "ev-ranking", "top-10"],
        "readingTime": "10 min read",
        "content": resp
    }
    
    fname = f"data/blog/{slug}.json"
    with open(fname, "w") as f:
        json.dump(post, f, indent=2)
    print(f"  -> {fname} ({len(resp)} chars)")

print("Done!")
