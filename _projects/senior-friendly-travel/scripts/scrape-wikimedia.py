#!/usr/bin/env python3
"""
Scrape Wikimedia for destination photos.
Saves incrementally every 25 destinations so partial progress isn't lost.
"""
import json, urllib.request, urllib.parse, ssl, sys, time, os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HERE = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(HERE, '..', 'public', 'data', 'destinations.json')

IMAGE_EXT = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
SKIP_WORDS = ['map', 'logo', 'icon', 'flag', 'locator', 'blank', 'diagram', 'pdf']

SRSTART = int(sys.argv[1]) if len(sys.argv) > 1 else 0
SREND = int(sys.argv[2]) if len(sys.argv) > 2 else 506
assert 0 <= SRSTART <= SREND <= 506

def wiki_json(q, limit=5):
    url = ("https://commons.wikimedia.org/w/api.php?"
           "action=query&list=search&srsearch={q}&srlimit={l}&format=json"
           "&srnamespace=6&srprop=").format(q=urllib.parse.quote(q), l=limit)
    req = urllib.request.Request(url, headers={'User-Agent': 'FamilyTravelDir/2.0'})
    return json.loads(urllib.request.urlopen(req, timeout=10, context=ctx).read())

def find_image(d):
    name, city, country = d['name'], d['city'], d['country']
    clean = name.replace(' Family Tour', '').replace(' Family', '').replace(' Tour', '').strip()
    queries = [f"{clean} {city}", f"{clean}", f"{name} {city}", f"{city} {country}"]
    for q in queries:
        try:
            res = wiki_json(q)
            for item in res.get('query', {}).get('search', []):
                t = item['title']
                if not t.startswith('File:'):
                    continue
                fn = t[5:]
                if not any(fn.lower().endswith(e) for e in IMAGE_EXT):
                    continue
                if any(w in fn.lower() for w in SKIP_WORDS):
                    continue
                return f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(fn)}?width=800"
        except:
            pass
        time.sleep(0.08)
    return None

data = json.load(open(JSON_PATH))
done = 0
fail = 0
skip = 0

# Resume: count existing wikimedia URLs
existing = sum(1 for d in data if 'wikimedia' in d.get('imageUrl', ''))
if existing > 0 and SRSTART == 0:
    print(f"Resuming from {existing} existing Wikimedia URLs")

for idx in range(SRSTART, min(SREND, len(data))):
    d = data[idx]
    if 'wikimedia' in d.get('imageUrl', ''):
        skip += 1
        continue
    
    url = find_image(d)
    if url:
        d['imageUrl'] = url
        done += 1
    else:
        fail += 1
    
    if (idx + 1) % 25 == 0:
        json.dump(data, open(JSON_PATH, 'w'), indent=2)
        print(f"  [{idx+1}/{len(data)}] +{done} ok, {fail} fail, {skip} skip", flush=True)

# Final save
json.dump(data, open(JSON_PATH, 'w'), indent=2)

# Stats
wiki = sum(1 for d in data if 'wikimedia' in d.get('imageUrl', ''))
picsum = len(data) - wiki
print(f"\n✅ Done range [{SRSTART}:{SREND}]")
print(f"   This run: +{done} ok, {fail} failed")
print(f"   Total: {wiki} Wikimedia, {picsum} Picsum fallback")
