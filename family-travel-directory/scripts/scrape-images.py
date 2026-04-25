#!/usr/bin/env python3
"""
scrape-images.py — Replace all destination photos with real Flickr photos.
Flickr public feed is free, no API key, no rate limits.
Saves incrementally.
"""
import json, urllib.request, urllib.parse, ssl, re, sys, time, os

sys.setrecursionlimit(10000)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'destinations.json')

def flickr_image(query):
    """Return first real Flickr photo URL for a query, or None."""
    url = f"https://www.flickr.com/services/feeds/photos_public.gne?tags={urllib.parse.quote(query)}&format=json"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    resp = urllib.request.urlopen(req, timeout=10, context=ctx)
    raw = resp.read().decode('utf-8', errors='replace')
    raw = re.sub(r'^jsonFlickrFeed\(', '', raw)
    raw = re.sub(r'\)$', '', raw)
    data = json.loads(raw)
    for item in data.get('items', []):
        m_url = item.get('media', {}).get('m', '')
        if m_url:
            # Convert to large
            large = m_url.replace('_m.jpg', '_b.jpg')
            # Verify it loads
            try:
                vreq = urllib.request.Request(large, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
                vresp = urllib.request.urlopen(vreq, timeout=5, context=ctx)
                if vresp.status == 200:
                    return large
            except:
                pass
    return None

def build_query(d):
    """Build the best search query for a destination."""
    name = d['name']
    city = d['city']
    country = d['country']
    
    # Clean up name for better searching
    clean = name.replace(' Family Tour', '').replace(' Family', '').replace(' Tour', '').replace(' - ', ' ').strip()
    
    # Try queries in priority order
    queries = [
        f"{clean} {city}",
        f"{clean}",
        f"{name}",
        f"{city} {country}",
        f"{clean} {country}",
    ]
    return queries

def main():
    start_idx = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    end_idx = int(sys.argv[2]) if len(sys.argv) > 2 else 506
    
    data = json.load(open(JSON_PATH))
    done = 0
    fail = 0
    
    for idx in range(start_idx, min(end_idx, len(data))):
        d = data[idx]
        
        # Skip if already has a non-picsum URL
        cur = d.get('imageUrl', '')
        if cur and 'picsum' not in cur:
            continue
        
        queries = build_query(d)
        found = None
        
        for q in queries:
            try:
                found = flickr_image(q)
                if found:
                    break
            except:
                pass
            time.sleep(0.3)
        
        if found:
            d['imageUrl'] = found
            done += 1
        else:
            fail += 1
        
        if (idx + 1) % 25 == 0 or (idx == min(end_idx, len(data)) - 1):
            json.dump(data, open(JSON_PATH, 'w'), indent=2)
            srcs = {}
            for x in data:
                u = x.get('imageUrl', '')
                if 'flickr' in u:
                    srcs['flickr'] = srcs.get('flickr', 0) + 1
                elif 'picsum' in u:
                    srcs['picsum'] = srcs.get('picsum', 0) + 1
                else:
                    srcs['other'] = srcs.get('other', 0) + 1
            print(f"  [{idx+1}/{len(data)}] +{done} ok, {fail} fail. Sources: {srcs}", flush=True)
    
    print(f"\n✅ Complete [{start_idx}:{end_idx}]")
    srcs = {}
    for x in data:
        u = x.get('imageUrl', '')
        if 'flickr' in u:
            srcs['flickr'] = srcs.get('flickr', 0) + 1
        elif 'picsum' in u:
            srcs['picsum'] = srcs.get('picsum', 0) + 1
        else:
            srcs['other'] = srcs.get('other', 0) + 1
    print(f"   Sources: {srcs}")

if __name__ == '__main__':
    main()
