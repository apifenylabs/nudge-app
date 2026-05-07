#!/bin/bash
# scrape-images.sh — Scrape real destination photos from Wikimedia Commons
# For each destination, search Wikimedia and grab the first image
# Completely free, no API key needed
# Cost: $0
set -euo pipefail

cd "$(dirname "$0")/.."
JSON="public/data/destinations.json"
TMP=$(mktemp)

echo "📷 Scraping Wikimedia for destination photos..."
echo ""

python3 << 'PYEOF'
import json, urllib.request, urllib.parse, ssl, sys, time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open('public/data/destinations.json') as f:
    data = json.load(f)

# For each destination, try to find a relevant Wikimedia image
# We search by destination name + city
succeeded = 0
failed = 0
skipped = 0
image_map = {}  # id -> wikimedia image URL

for i, d in enumerate(data):
    pid = d['id']
    name = d['name']
    city = d['city']
    country = d['country']
    
    # Prioritize: search with destination name first
    # Wikimedia namespace 6 = File: namespace
    
    # Try different queries in priority order
    queries = [
        f"{name} {city} {country}",
        f"{name} {city}",
        f"{name}",
        f"{city} {country}",
    ]
    
    found_url = None
    
    for q in queries:
        api_url = ("https://commons.wikimedia.org/w/api.php?"
            "action=query&list=search&srsearch={q}&srlimit=3&format=json"
            "&srnamespace=6&srprop=").format(q=urllib.parse.quote(q))
        
        try:
            req = urllib.request.Request(api_url, headers={'User-Agent': 'FamilyTravelDir/1.0'})
            resp = urllib.request.urlopen(req, timeout=8, context=ctx)
            result = json.loads(resp.read())
            
            for item in result.get('query', {}).get('search', []):
                title = item['title']
                if not title.startswith('File:'):
                    continue
                # Skip icons, logos, maps
                title_lower = title.lower()
                if any(x in title_lower for x in ['map','logo','icon','flag','locator','blank','diagram']):
                    continue
                
                # Build direct URL
                fname = title[5:].replace(' ', '_')
                img_url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{urllib.parse.quote(fname)}?width=800"
                
                # Verify it's accessible
                try:
                    vreq = urllib.request.Request(img_url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
                    vresp = urllib.request.urlopen(vreq, timeout=5, context=ctx)
                    if vresp.status == 200:
                        found_url = img_url
                        break
                except:
                    pass
            
            if found_url:
                break
        except Exception as e:
            pass
        
        time.sleep(0.2)  # Rate limit
    
    if found_url:
        image_map[pid] = found_url
        succeeded += 1
    else:
        failed += 1
    
    if (i+1) % 50 == 0:
        print(f"  Progress: {i+1}/{len(data)} — {succeeded} ok, {failed} failed")

# Now update the JSON
updated = 0
for d in data:
    if d['id'] in image_map:
        d['imageUrl'] = image_map[d['id']]
        updated += 1

with open('public/data/destinations.json', 'w') as f:
    json.dump(data, f, indent=2)

print(f"\n✅ Done! {updated} photos scraped from Wikimedia")
print(f"   {failed} destinations without Wikimedia results")
print(f"   (will keep picsum fallback for those)")
PYEOF

echo ""
echo "Done! Building to verify..."
npm run build 2>&1 | tail -5
