import json, os, requests, re, sys

DEEPSEEK_KEY = os.environ.get("DEEPSEEK_KEY", "sk-bd34aad94bc348faa306a253d606d7db")

def ask_deepseek(prompt, model="deepseek-chat", max_tokens=4096):
    headers = {"Content-Type": "application/json", "Authorization": "Bearer " + DEEPSEEK_KEY}
    payload = {"model": model, "messages": [{"role": "user", "content": prompt}], "max_tokens": max_tokens, "temperature": 0.7}
    r = requests.post("https://api.deepseek.com/chat/completions", headers=headers, json=payload, timeout=120)
    r.raise_for_status()
    return r.json()["choices"][0]["message"]["content"]

def extract_json(text):
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    start = text.find('{')
    end = text.rfind('}')
    if start < 0 or end < start:
        return None
    json_str = text[start:end+1]
    json_str = re.sub(r',\s*}', '}', json_str)
    json_str = re.sub(r',\s*]', ']', json_str)
    try:
        return json.loads(json_str)
    except:
        return None

EV_PROMPT_TEMPLATE = """You are a travel writer for EV Charging Asia. Write a blog post in strict JSON format.

Write ONLY valid JSON. No markdown. No code blocks. No explanation.

Required JSON fields:
- slug: string (lowercase with hyphens)
- title: string (compelling title)
- excerpt: string (2-3 sentence summary)
- date: "2026-05-15"
- author: "EV Charging Asia Team"
- tags: array of strings
- readingTime: string (e.g. "10 min read")
- content: string (FULL article, at least 1500 words, with markdown headers ## and tables)

Topic: {topic}

Content guidelines:
- Include specific charging station names, distances in km, and costs in local currency
- Include at least one markdown table
- Include family-friendly tips
- Front-load SEO keywords
- Be practical and detailed
- Mention Booking.com or Klook links naturally (e.g. "Book your stay on Booking.com")

JSON:
"""

def generate_ev_post(topic, slug):
    prompt = EV_PROMPT_TEMPLATE.format(topic=topic)
    print(f"Generating {slug}...")
    resp = ask_deepseek(prompt)
    data = extract_json(resp)
    if data:
        fname = f"data/blog/{slug}.json"
        with open(fname, "w") as f:
            json.dump(data, f, indent=2)
        print(f"  -> {fname} ({len(data.get('content', ''))} chars)")
        return True
    else:
        print(f"  FAILED to generate {slug}")
        print(f"  Raw: {resp[:200]}")
        return False

os.chdir("/home/captain/.openclaw/workspace/ev-charging-asia")

# Posts to generate (avoiding existing slugs)
posts = [
    ("Seoul to Busan EV Road Trip: Korea's ultra-fast charging corridor with family stops in Gyeongju and Daegu", "seoul-busan-ev-road-trip"),
    ("Chennai to Pondicherry EV Road Trip: India's emerging EV corridor along the East Coast Road", "chennai-pondicherry-ev-road-trip"),
    ("Bangkok to Krabi EV Road Trip: Southern Thailand adventure with charging stops in Chumphon and Surat Thani", "bangkok-krabi-ev-road-trip"),
    ("Kuala Lumpur to Malacca EV Road Trip: Short family EV trip from KL to Malaysia's historic city", "kuala-lumpur-malacca-ev-road-trip"),
    ("Best EV Charging Networks in Thailand Compared 2026: PTT EV Station PluZ vs EA Anywhere vs MG Charge", "thailand-ev-charging-networks-comparison"),
    ("Hong Kong to Guangzhou EV Road Trip: Cross-border driving through the Greater Bay Area", "hong-kong-guangzhou-ev-road-trip"),
]

success = 0
for topic, slug in posts:
    if generate_ev_post(topic, slug):
        success += 1

print(f"\nGenerated {success}/{len(posts)} posts")
if success > 0:
    print("Building...")
    result = os.system("npx next build 2>&1 | tail -3")
    print(f"Build exit: {result}")
