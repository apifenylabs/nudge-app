#!/usr/bin/env python3
"""Inject 6 missing cross-site links into the 5 new posts."""
import re
from pathlib import Path

filepath = Path("family-travel-directory/lib/generated-blog-data.ts")
text = filepath.read_text()

injections = []

# 1. skip-gen-travel: "premium"
injections.append({
    "slug": "skip-gen-travel-asia-ultimate-guide",
    "keyword": "premium",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">For premium travel experiences, browse our curated collection of luxury family accommodations at Luxury Family Travel Asia — featuring Asia&#x27;s finest five-star resorts and private villas.</a>'
})

# 2. skip-gen-travel: "villa"
injections.append({
    "slug": "skip-gen-travel-asia-ultimate-guide",
    "keyword": "villa",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">For families seeking more space and privacy, our Luxury Family Travel Asia directory features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.</a>'
})

# 3. family-microtrips: "villa"
injections.append({
    "slug": "family-microtrips-asia-best-weekend-getaways",
    "keyword": "villa",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">For families seeking more space and privacy, our Luxury Family Travel Asia directory features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.</a>'
})

# 4. multi-generational: "villa"
injections.append({
    "slug": "best-asia-multi-generational-family-holidays-2026",
    "keyword": "villa",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">For families seeking more space and privacy, our Luxury Family Travel Asia directory features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.</a>'
})

# 5. bali budget: "splurge"
injections.append({
    "slug": "bali-family-trip-cost-breakdown-2026",
    "keyword": "splurge",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">Ready to splurge? Our Luxury Family Travel Asia collection has the finest family-friendly resorts and private villas — perfect for making your Bali trip truly unforgettable.</a>'
})

# 6. cooking classes: "villa"
injections.append({
    "slug": "best-family-cooking-classes-southeast-asia",
    "keyword": "villa",
    "html": '\\n\\n<a href=\\"https://luxury-family-travel-asia.vercel.app\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cross-site-link\\">For families seeking more space and privacy, our Luxury Family Travel Asia directory features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.</a>'
})

total = 0
for inj in injections:
    slug = inj["slug"]
    keyword = inj["keyword"]
    link_html = inj["html"]
    
    # Find slug position
    slug_pos = text.find(f'"slug": "{slug}"')
    if slug_pos == -1:
        print(f"  SKIP {slug} — slug not found")
        continue
    
    # Find content field start
    cf_marker = '"content": "'
    cf_pos = text.find(cf_marker, slug_pos)
    if cf_pos == -1:
        print(f"  SKIP {slug} — no content field")
        continue
    
    content_start = cf_pos + len(cf_marker)
    
    # Check if link already exists in this content
    # Find the content section boundary (until next "relatedDestinations")
    rd_marker = 'relatedDestinations'
    rd_pos = text.find(rd_marker, content_start)
    if rd_pos == -1:
        print(f"  SKIP {slug} — no relatedDestinations")
        continue
    
    content_section = text[content_start:rd_pos]
    if "luxury-family-travel-asia.vercel.app" in content_section:
        print(f"  SKIP {slug}/{keyword} — link already exists")
        continue
    
    # Find the end of content value (before ", that ends content)
    # Format: ...content",\n      "relatedDestinations"
    # We need to find the ", that closes the content string
    content_end_marker = '",\n'
    
    # Scan from content_start to find the proper closing quote
    # Simple approach: the content string is bounded by ", followed by \n and indentation + "relatedDestinations"
    # Find the last ", before relatedDestinations
    last_quote = content_section.rfind('",')
    if last_quote == -1:
        print(f"  SKIP {slug}/{keyword} — no closing quote")
        continue
    
    # The content value spans from content_start to content_start + last_quote
    content_value = text[content_start:content_start + last_quote]
    
    # Find keyword in content (case-insensitive)
    kw_lower = content_value.lower()
    kw_idx = kw_lower.find(keyword.lower())
    
    if kw_idx == -1:
        # Try finding keyword within words
        print(f"  SKIP {slug}/{keyword} — keyword not found")
        continue
    
    # Find next paragraph break (\\n\\n) after keyword
    after_kw = content_value[kw_idx:]
    
    # First try to find \\n---\\n (section break - preferred insertion point)
    section_break = after_kw.find('\\n---\\n')
    if section_break != -1:
        insert_rel_pos = kw_idx + section_break + len('\\n---\\n')
    else:
        # Find next paragraph break \\n\\n after keyword
        para_break = after_kw.find('\\n\\n')
        if para_break != -1:
            insert_rel_pos = kw_idx + para_break
        else:
            # Insert at end of content
            insert_rel_pos = len(content_value)
    
    # Inject the link
    new_content = content_value[:insert_rel_pos] + link_html + content_value[insert_rel_pos:]
    text = text[:content_start] + new_content + text[content_start + len(content_value):]
    total += 1
    print(f"    ✅ {keyword} into \"{slug}\"")

if total > 0:
    filepath.write_text(text)
    print(f"\n💾 Saved {total} link(s) injected")
else:
    print("\nNo new links injected")

# Verify final counts
from pathlib import Path
final = filepath.read_text()
link_count = final.count('cross-site-link')
url_count = final.count('luxury-family-travel-asia.vercel.app')
print(f"\nTotal cross-site-link occurrences: {link_count}")
print(f"Total luxury-family-travel-asia URLs: {url_count}")

# Per-slug verification
print("\nPer-post link status:")
for s in set(inj["slug"] for inj in injections):
    s_pos = final.find(f'"slug": "{s}"')
    if s_pos == -1:
        print(f"  ❌ {s} — not found")
        continue
    rd_pos = final.find('relatedDestinations', s_pos)
    section = final[s_pos:rd_pos] if rd_pos != -1 else final[s_pos:s_pos+5000]
    has = "luxury-family-travel-asia.vercel.app" in section
    print(f"  {'✅' if has else '❌'} {s}")

PYEOF
