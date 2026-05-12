#!/usr/bin/env python3
"""
reinject-cross-links.py — Fast cross-site link injection using text-based approach.
Does NOT parse JSON (avoids control character issues in TS). Instead does direct
text manipulation with careful marker insertion.
"""

import re
from pathlib import Path

WORKSPACE = Path("/home/captain/.openclaw/workspace")

# The cross-link opportunities from the most recent analysis
# These are the 6 remaining links for the 5 new posts
LINK_OPS = [
    # post_slug, keyword, target_site, target_url
    ("skip-gen-travel-asia-ultimate-guide", "premium", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("skip-gen-travel-asia-ultimate-guide", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("family-microtrips-asia-best-weekend-getaways", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("best-asia-multi-generational-family-holidays-2026", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("bali-family-trip-cost-breakdown-2026", "splurge", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("best-family-cooking-classes-southeast-asia", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
]

# Link text templates per target
LINK_TEXT = {
    "Luxury Family Travel": {
        "premium": "For premium travel experiences, browse our curated collection of luxury family accommodations at Luxury Family Travel Asia — featuring Asia's finest five-star resorts and private villas.",
        "villa": "For families seeking more space and privacy, our Luxury Family Travel Asia directory features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.",
        "splurge": "Ready to splurge? Our Luxury Family Travel Asia collection has the finest family-friendly resorts and private villas — perfect for making your Bali trip truly unforgettable.",
    }
}


def inject_into_file():
    blog_file = WORKSPACE / "family-travel-directory" / "lib" / "generated-blog-data.ts"
    content = blog_file.read_text()
    
    total_injected = 0
    injected_info = []
    
    for slug, keyword, target_site, target_url in LINK_OPS:
        if target_url in content:
            print(f"  SKIP {slug}/{keyword} → {target_site} (link already exists)")
            continue
        
        # Find the slug section in the file
        slug_marker = f'"slug": "{slug}"'
        slug_idx = content.find(slug_marker)
        if slug_idx == -1:
            print(f"  SKIP {slug} — not found")
            continue
        
        # Now find the content field within this slug's section and inject
        # The content field is: "content": "some text..."
        # Find it after the slug
        section_start = content[slug_idx:]
        content_field_marker = '"content": "'
        cf_idx = section_start.find(content_field_marker)
        if cf_idx == -1:
            print(f"  SKIP {slug} — no content field")
            continue
        
        # The content starts after '"content": "'
        content_start = slug_idx + cf_idx + len(content_field_marker)
        
        # Find the end of the content string
        # Starting from content_start, scan forward carefully:
        # - Find closing " that's not escaped
        # - Then look for the next character after to confirm it's end of field (newline)
        content_text_start = content_start
        # Use a buffer to find the last post code before next field
        end_of_post_marker = '"tags":'
        post_section = content[slug_idx:]
        tag_idx = post_section.find(end_of_post_marker)
        if tag_idx == -1:
            print(f"  SKIP {slug} — no tags field")
            continue
        
        # The content is between content_start and the start of tags
        # Actually in the JSON, content string ends with " then comma+newline
        # Find: ", (the closing quote + comma)
        # But the content itself contains escaped quotes \"
        # Let's find the pattern: ", right before tags
        content_section = post_section[cf_idx + len(content_field_marker):tag_idx]
        # The content string ends with " followed by the , before "tags"
        # Content string: "..." where ... is the content with escaped inner quotes
        # We need to find the final " that's not escaped
        # Scan the content section backwards from the end
        # The content string is: "blah blah...blah blah",
        # We need to find the last unconsumed closing "
        
        # Remove the trailing ", from the content section
        content_value = content_section.strip()
        # The content value ends with ",
        # Remove trailing comma and quotes
        # More robust: find the pattern ", in the content
        # Actually let's use a different approach - just find the position
        # of the closing quote before tags:
        
        # Walk backwards from tag_idx to find the closing quote
        end_search = content[slug_idx:slug_idx + tag_idx]
        # The structure is: ...\n      "tags": [...]
        # So before tags: ...\n      ",
        # Find: ",\n      "tags"
        close_pattern = '",\n      "tags"'
        close_idx = end_search.find(close_pattern)
        if close_idx == -1:
            # Try alternative
            close_pattern = '",\n    "tags"'
            close_idx = end_search.find(close_pattern)
        if close_idx == -1:
            print(f"  SKIP {slug} — cannot find end of content field")
            continue
        
        content_end_within_section = close_idx + 1  # The position of the "
        # The content is from content_field_marker position + length to content_end
        actual_content_start = cf_idx + len(content_field_marker)
        actual_content_end = actual_content_start + content_end_within_section - len(content_field_marker) - 1
        # Wait, let me recalculate. The actual position in the file:
        abs_content_end = slug_idx + actual_content_end
        
        content_value = content[content_start:abs_content_end]
        
        # Now inject the link
        # Find keyword in content
        keyword_lower = keyword.lower()
        content_lower = content_value.lower()
        kw_idx = content_lower.find(keyword_lower)
        
        if kw_idx == -1:
            print(f"  SKIP {slug}/{keyword} — keyword not found in content")
            continue
        
        # Find paragraph end after keyword
        insert_offset = kw_idx + len(keyword)
        # Find next \n\n (paragraph break) from that position
        after_keyword = content_value[insert_offset:]
        para_break = after_keyword.find('\n\n')
        
        if para_break == -1:
            # Try \n followed by # (next heading)
            heading_break = after_keyword.find('\n#')
            if heading_break != -1:
                insert_after = insert_offset + heading_break
            else:
                insert_after = content_start + len(content_value)  # end of content
        else:
            insert_after = insert_offset + para_break
        
        # Build link HTML
        link_site_name = target_site
        link_texts = LINK_TEXT.get(target_site, {})
        link_sentence = link_texts.get(keyword, f"For more options, check out our {target_site} directory featuring hand-picked family accommodations across Asia.")
        
        link_html = f'\n\n<a href="{target_url}" target="_blank" rel="noopener noreferrer" class="cross-site-link">{link_sentence}</a>\n\n'
        
        # Insert link after the paragraph
        insert_pos = content_start + insert_after
        new_content = content[:insert_pos] + link_html + content[insert_pos:]
        content = new_content
        
        total_injected += 1
        injected_info.append(f"    ✅ {keyword} → {target_site} in \"{slug}\"")
        print(f"    ✅ {keyword} → {target_site} in \"{slug}\"")
    
    if total_injected > 0:
        blog_file.write_text(content)
        print(f"\n💾 Saved {total_injected} link injections to {blog_file}")
    else:
        print(f"\nNo new links to inject")
    
    return total_injected


if __name__ == "__main__":
    result = inject_into_file()
    print(f"\nTotal: {result} cross-site links injected")
