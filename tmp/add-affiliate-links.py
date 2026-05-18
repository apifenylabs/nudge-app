#!/usr/bin/env python3
"""Add Booking.com affiliate links to family-travel blog posts."""
import json, os, re

BLOG_DIR = os.path.expanduser("~/.openclaw/workspace/_projects/family-travel-directory/data/blog")
AID = "2875669"

# Known hotel keywords / patterns to detect hotel mentions
HOTEL_CONTEXT = re.compile(
    r'(hotel|resort|accommodation|stay|lodging|inn|villa|suite|property)',
    re.IGNORECASE
)

def add_affiliate_links(content: str, slug: str) -> tuple[str, int]:
    """Add Booking.com affiliate links to HTML content where hotels are mentioned."""
    links_added = 0
    
    # Pattern: find hotel names mentioned as proper nouns near hotel keywords
    # Look for patterns like "Hotel XYZ", "XYZ Hotel", "The XYZ Resort"
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        stripped = line.strip()
        # Skip if line already has an affiliate link
        if f'aid={AID}' in stripped:
            new_lines.append(line)
            continue
        
        # Skip short lines or navigation
        if len(stripped) < 30 or stripped.startswith('<') and not stripped.startswith('<p'):
            new_lines.append(line)
            continue
        
        # Check if this line mentions a hotel
        if not HOTEL_CONTEXT.search(stripped):
            new_lines.append(line)
            continue
        
        # Find hotel names (capitalized multi-word phrases near hotel keywords)
        hotel_matches = re.findall(
            r'(?:The\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(Hotel|Resort|Inn|Villa|Suites)',
            stripped
        )
        
        if not hotel_matches:
            # Also try: Hotel/Hotel name at end of list or after "at"/"in"
            hotel_matches = re.findall(
                r'(?:at|in|the)\s+([A-Z][a-zA-Z\']+(?:\s+[A-Za-z\']+){1,4})(?:,|\s+and|\s+in|\s+for|\.|</)',
                stripped
            )
        
        if hotel_matches:
            for match in hotel_matches[:3]:  # Max 3 per paragraph
                hotel_name = match.strip()
                if len(hotel_name) < 5 or len(hotel_name) > 60:
                    continue
                # Skip if it doesn't look like a hotel name
                if not any(kw in hotel_name.lower() for kw in ['hotel', 'resort', 'inn', 'villa', 'suites', 'grand', 'palace', 'marina', 'bay', 'garden', 'club', 'park', 'beach', 'spa', 'lodge']):
                    # Check if the context word is nearby
                    continue
                
                link = f'<a href="https://www.booking.com/search.html?ss={hotel_name.replace(" ", "+")}&aid={AID}" target="_blank" rel="nofollow sponsored">Check prices for {hotel_name} on Booking.com</a>'
                
                # Append link after the paragraph if there's an opening/closing tag
                if stripped.startswith('<p>') and stripped.endswith('</p>'):
                    stripped = stripped[:-5] + f'</p>\n<p>{link}</p>'
                    links_added += 1
                elif stripped.startswith('<p>'):
                    stripped = stripped + f'</p>\n<p>{link}</p>'
                    links_added += 1
                else:
                    stripped = stripped + f'\n\n<p>{link}</p>'
                    links_added += 1
        
        new_lines.append(stripped if line.endswith('\n') else stripped)
    
    return '\n'.join(new_lines), links_added

# Process top blog posts
posts = [
    "guide-traveling-asia-with-babies-essentials-tips.json",
    "best-family-hotels-bangkok-pool-kids-clubs-2026.json",
    "packing-list-family-trip-asia-ultimate-guide.json",
    "kid-friendly-hikes-southeast-asia-family-trails.json",
    "family-friendly-restaurants-hong-kong-2026.json",
    "best-asian-airlines-families-2026.json",
    "hong-kong-with-kids-3-day-itinerary.json",
    "tokyo-with-kids-top-10-family-attractions.json",
    "singapore-with-kids-complete-guide-2026.json",
    "osaka-with-kids-universal-studios-aquarium.json",
    "taipei-with-kids-night-markets-hot-springs.json",
    "singapore-with-toddlers-parks-playgrounds.json",
]

total_added = 0
for post in posts:
    path = os.path.join(BLOG_DIR, post)
    if not os.path.exists(path):
        print(f"❌ {post}: File not found")
        continue
    
    try:
        with open(path) as f:
            data = json.load(f)
    except (json.JSONDecodeError, Exception) as e:
        print(f"❌ {post}: JSON error - {e}")
        continue
    
    slug = data.get('slug', post)
    content = data.get('content', '')
    
    if not content:
        print(f"⏭️ {slug}: No content field")
        continue
    
    new_content, n = add_affiliate_links(content, slug)
    
    if n > 0:
        data['content'] = new_content
        with open(path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"✅ {slug}: Added {n} affiliate links")
        total_added += n
    else:
        print(f"⏭️ {slug}: No hotel mentions found")

print(f"\n📊 Total: {total_added} affiliate links added across {sum(1 for p in posts if os.path.exists(os.path.join(BLOG_DIR, p)))} files")
