#!/usr/bin/env python3
"""
reinject-links-v2.py — Injects cross-site links by direct text manipulation.
Uses line-level operations to find content field boundaries.
"""

import re
from pathlib import Path

WORKSPACE = Path("/home/captain/.openclaw/workspace")

LINK_OPS = [
    ("skip-gen-travel-asia-ultimate-guide", "premium", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("skip-gen-travel-asia-ultimate-guide", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("family-microtrips-asia-best-weekend-getaways", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("best-asia-multi-generational-family-holidays-2026", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("bali-family-trip-cost-breakdown-2026", "splurge", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
    ("best-family-cooking-classes-southeast-asia", "villa", "Luxury Family Travel", "https://luxury-family-travel-asia.vercel.app"),
]

LINK_BY_KEYWORD = {
    "premium": "For premium travel experiences, browse our curated collection of <a href='https://luxury-family-travel-asia.vercel.app' target='_blank' rel='noopener noreferrer' class='cross-site-link'>luxury family accommodations at Luxury Family Travel Asia</a> — featuring Asia's finest five-star resorts and private villas.",
    "villa": "For families seeking more space and privacy, our <a href='https://luxury-family-travel-asia.vercel.app' target='_blank' rel='noopener noreferrer' class='cross-site-link'>Luxury Family Travel Asia directory</a> features hand-picked villas with private pools, dedicated staff, and premium amenities across Asia.",
    "splurge": "Ready to splurge? Our <a href='https://luxury-family-travel-asia.vercel.app' target='_blank' rel='noopener noreferrer' class='cross-site-link'>Luxury Family Travel Asia collection</a> has the finest family-friendly resorts and private villas — perfect for making your Bali trip truly unforgettable.",
}


def get_content_bounds(lines, from_idx):
    """Given a line index where content field starts, find the content
    boundaries: the start position (where the opening quote is) and
    the end position (where the closing quote is, right before ',')"""
    
    line = lines[from_idx]
    assert '"content": "' in line or '"content": "' in line, f"Not a content line: {line}"
    
    # The content starts at the opening "
    content_line_start = line.find('"content": "')
    if content_line_start == -1:
        content_line_start = line.find('"content": "')
    quote_start = line.index('"', content_line_start + 10)  # position of first " after "content":
    
    # Walk through lines to find the closing ", 
    content_lines = []
    in_content = True
    for i in range(from_idx, len(lines)):
        l = lines[i]
        if i == from_idx:
            # First line - find opening quote
            qpos = l.index('"', content_line_start + 10)
            rest = l[qpos:]  # "blah..."
            content_lines.append(rest)
        else:
            content_lines.append(l)
        
        # Check if this line ends with the content string
        # Content strings end with ", followed by comma on same line
        # OR the closing " is at the start of the next content field
        # Actually the format varies. Let's check for the pattern:
        # ...content text",\n      "relatedDestinations"
        if l.rstrip().endswith('",'):
            # Check if the next non-blank line starts a field (not more content)
            peek = i + 1
            while peek < len(lines) and lines[peek].strip() == '':
                peek += 1
            if peek < len(lines) and (lines[peek].strip().startswith('"relatedDestinations"') or 
                                       lines[peek].strip().startswith('},') or
                                       lines[peek].strip().startswith('},')):
                return from_idx, quote_start, i, content_lines
    
    return from_idx, quote_start, len(lines)-1, content_lines


def main():
    blog_file = WORKSPACE / "family-travel-directory" / "lib" / "generated-blog-data.ts"
    content = blog_file.read_text()
    lines = content.split('\n')
    
    total_injected = 0
    
    for slug, keyword, target_site, target_url in LINK_OPS:
        # Check if link already exists
        if target_url in content:
            print(f"  SKIP {slug}/{keyword} → {target_site} (link exists)")
            continue
        
        # Find slug line
        slug_line = -1
        for i, line in enumerate(lines):
            if f'"slug": "{slug}"' in line:
                slug_line = i
                break
        
        if slug_line == -1:
            print(f"  SKIP {slug} — not found")
            continue
        
        # Find content field after slug
        content_line = -1
        for i in range(slug_line, min(slug_line + 200, len(lines))):
            if '"content": "' in lines[i] or '"content":' in lines[i]:
                content_line = i
                break
        
        if content_line == -1:
            print(f"  SKIP {slug} — no content field")
            continue
        
        # Extract the content text
        line = lines[content_line]
        if '"content": "' in line:
            quote_start_in_line = line.index('"', line.find('"content":') + 10)
        else:
            # Handle other formats
            quote_start_in_line = line.index('"content":') + len('"content": "')
            if line[quote_start_in_line] == '"':
                quote_start_in_line += 1
        
        # Find the raw content text
        # First line of content
        first_content_part = line[quote_start_in_line:]
        if not first_content_part:
            # Quote is on this line, content starts from next
            first_content_part = line[quote_start_in_line+1:]
        
        # Now find where the content ends. Look for '",' ending
        # We need to find the line where the content closes
        # Content ends with '",' that's NOT inside the content string
        
        content_end_line = -1
        content_end_col = -1
        
        for i in range(content_line, min(content_line + 2000, len(lines))):
            l = lines[i]
            # Look for line ending with '",'
            stripped = l.rstrip()
            if stripped.endswith('",'):
                # Check: if this is the first line and the ", is at the quote_start, 
                # it's an empty content
                if i == content_line:
                    pos = l.find('",', quote_start_in_line + 1)
                    if pos != -1:
                        # Need to verify this is the end, not escaped
                        before = l[:pos]
                        if not before.endswith('\\'):
                            content_end_line = i
                            content_end_col = pos
                            break
                else:
                    # Check the quote is not escaped
                    before = l[:len(l) - 2]
                    if not before.endswith('\\'):
                        content_end_line = i
                        content_end_col = len(l) - 2
                        break
        
        if content_end_line == -1:
            print(f"  SKIP {slug}/{keyword} — could not find content end")
            continue
        
        # Extract the full content text
        full_content = ""
        if content_line == content_end_line:
            full_content = lines[content_line][quote_start_in_line:content_end_col]
        else:
            first_part = lines[content_line][quote_start_in_line:]
            last_part = lines[content_end_line][:content_end_col]
            middle = lines[content_line + 1 : content_end_line]
            full_content = first_part + '\n' + '\n'.join(middle) + '\n' + last_part
        
        # Now find keyword and inject link
        keyword_lower = keyword.lower()
        content_lower = full_content.lower()
        kw_idx = content_lower.find(keyword_lower)
        
        if kw_idx == -1:
            print(f"  SKIP {slug}/{keyword} — keyword not found")
            continue
        
        # Find next paragraph break after keyword
        after_kw = full_content[kw_idx + len(keyword):]
        para_break = after_kw.find('\n\n')
        if para_break == -1:
            # Try end of section (---)
            section_break = after_kw.find('\n---\n')
            if section_break != -1:
                insert_point = kw_idx + len(keyword) + section_break
            else:
                insert_point = kw_idx + len(keyword)  # Fallback: right after keyword
        else:
            insert_point = kw_idx + len(keyword) + para_break
        
        # Build link text
        link_html = LINK_BY_KEYWORD.get(keyword, f"Check out our <a href='{target_url}' target='_blank' rel='noopener noreferrer' class='cross-site-link'>{target_site} directory</a> for more options.")
        
        # Insert the link
        new_full_content = full_content[:insert_point] + '\n\n' + link_html + '\n\n' + full_content[insert_point:]
        
        # Now rebuild the file lines with the new content
        # The new content needs to be re-inserted into the right lines
        new_content_lines = new_full_content.split('\n')
        
        if content_line == content_end_line:
            # Single line content, need to split
            line_prefix = lines[content_line][:quote_start_in_line]
            if len(new_content_lines) == 1:
                lines[content_line] = line_prefix + new_full_content + '",'
            else:
                # Multiple lines - replace the single line with multiple
                new_lines = [line_prefix + new_content_lines[0]]
                new_lines.extend(new_content_lines[1:])
                # Fix the last line: add closing quote
                new_lines[-1] = new_lines[-1] + '",'
                lines[content_line:content_end_line + 1] = new_lines
        else:
            # Multi-line content, replace the range
            line_prefix = lines[content_line][:quote_start_in_line]
            new_lines = [line_prefix + new_content_lines[0]]
            new_lines.extend(new_content_lines[1:])
            # Fix the last line: add closing quote and comma
            if not new_lines[-1].endswith('"'):
                new_lines[-1] = new_lines[-1] + '",'
            lines[content_line:content_end_line + 1] = new_lines
        
        total_injected += 1
        print(f"    ✅ {keyword} → {target_site} in \"{slug}\"")
        
        # Update the content variable for link dedup check
        content = '\n'.join(lines)
    
    if total_injected > 0:
        blog_file.write_text('\n'.join(lines))
        print(f"\n💾 Saved {total_injected} link injections to {blog_file}")
    else:
        print("No links injected")
    
    return total_injected


if __name__ == "__main__":
    result = main()
    print(f"\nTotal: {result} cross-site link(s) injected")
