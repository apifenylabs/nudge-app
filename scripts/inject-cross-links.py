#!/usr/bin/env python3
"""
inject-cross-links.py — Injects contextual cross-site links into blog posts.
Reads cross-link-actions.json, finds contextually appropriate insertion points,
and adds natural link sentences.

Usage: python3 scripts/inject-cross-links.py [--dry-run]
"""

import json
import re
import os
import sys
from pathlib import Path

WORKSPACE = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

SITE_DOMAINS = {
    "Family Travel Asia": "https://familytravelasia.com",
    "EV Charging Asia": "https://ev-charging-asia.vercel.app",
    "Luxury Family Travel": "https://luxury-family-travel-asia.vercel.app",
}

SITE_DIR_MAP = {
    "Family Travel Asia": "family-travel-directory",
    "EV Charging Asia": "ev-charging-asia",
    "Luxury Family Travel": "luxury-family-travel",
}

# Link templates: natural sentences that introduce cross-site links
LINK_TEMPLATES = {
    "road trip": {
        "text": "Planning a self-drive adventure? Check out our {target_site} guide to EV-friendly road trips across Asia, with charging station locations and family itinerary tips.",
        "site": "EV Charging Asia",
    },
    "driving": {
        "text": "For EV drivers, our {target_site} has detailed charging station maps and route planning for family road trips.",
        "site": "EV Charging Asia",
    },
    "car rental": {
        "text": "Renting an EV for your trip? Our {target_site} directory helps you find charging stations along your route.",
        "site": "EV Charging Asia",
    },
    "self-drive": {
        "text": "Taking a self-drive holiday? Browse our {target_site} guide for EV-friendly routes with family-friendly charging stops.",
        "site": "EV Charging Asia",
    },
    "luxury": {
        "text": "For those seeking something extra special, explore our curated collection of {target_site} properties — from private villas to five-star resorts.",
        "site": "Luxury Family Travel",
    },
    "5-star": {
        "text": "Looking to upgrade? Our {target_site} directory features hand-picked five-star properties perfect for discerning families.",
        "site": "Luxury Family Travel",
    },
    "villa": {
        "text": "For a more exclusive experience, browse our {target_site} selection of premium villas with private pools and dedicated staff.",
        "site": "Luxury Family Travel",
    },
    "splurge": {
        "text": "Ready to splurge? Our {target_site} collection has the finest accommodations for families who want the best.",
        "site": "Luxury Family Travel",
    },
    "premium": {
        "text": "Explore premium options on our {target_site} directory, featuring Asia's most extraordinary family-friendly properties.",
        "site": "Luxury Family Travel",
    },
    "budget": {
        "text": "Looking for more affordable options? Our {target_site} directory has practical family travel guides, budget breakdowns, and money-saving tips for Asia trips.",
        "site": "Family Travel Asia",
    },
    "kids": {
        "text": "For more family-friendly ideas, visit {target_site} — our complete directory of kid-approved destinations, activities, and travel tips across Asia.",
        "site": "Family Travel Asia",
    },
    "family": {
        "text": "Discover more family travel inspiration at {target_site}, with honest reviews, budget guides, and itineraries written by parents for parents.",
        "site": "Family Travel Asia",
    },
    "children": {
        "text": "Find more child-friendly travel ideas at {target_site}, Asia's leading family travel resource with real parent reviews.",
        "site": "Family Travel Asia",
    },
    "child-friendly": {
        "text": "For more child-friendly recommendations, visit {target_site} where our expert parents share honest family travel advice.",
        "site": "Family Travel Asia",
    },
    "resort": {
        "text": "For premium resort recommendations, browse our {target_site} collection of Asia's finest family accommodations.",
        "site": "Luxury Family Travel",
    },
    "drive": {
        "text": "Planning to drive? Our {target_site} directory helps EV-driving families find charging stations and plan road trips.",
        "site": "EV Charging Asia",
    },
}

# Specific link text overrides for common phrases
SPECIFIC_LINKS = {
    "EV charging": {
        "text": "Find nearby {target_site} charging stations and plan your route with our comprehensive directory.",
        "site": "EV Charging Asia",
    },
    "electric car": {
        "text": "Our {target_site} directory maps charging stations across Asia specifically for EV-driving families.",
        "site": "EV Charging Asia",
    },
}


def inject_link(content, keyword, target_site, target_domain):
    """Inject a natural cross-site link after the first occurrence of keyword"""
    template_info = LINK_TEMPLATES.get(keyword, SPECIFIC_LINKS.get(keyword, None))
    if not template_info:
        return content  # Skip unknown keywords
    
    link_text = template_info["text"].format(target_site=target_site)
    link_html = f'\n\n<a href="{target_domain}" target="_blank" rel="noopener noreferrer" class="cross-site-link">{link_text}</a>\n\n'
    
    # Try to find keyword in content
    content_lower = content.lower()
    idx = content_lower.find(keyword.lower())
    
    if idx == -1:
        return content  # Keyword not found in content
    
    # Find paragraph end after keyword
    # Look for double newline (paragraph break) or end of sentence after keyword
    insert_pos = idx + len(keyword)
    
    # Find next paragraph break (double newline)
    next_break = content.find("\n\n", insert_pos)
    if next_break == -1:
        next_break = content.find("\n", insert_pos)
    if next_break == -1 or next_break > insert_pos + 500:  # Cap at 500 chars
        next_break = insert_pos + len(keyword)
    
    # Adjust to end of the sentence/paragraph
    end_of_para = content.find("\n\n", next_break)
    if end_of_para == -1:
        end_of_para = len(content)
    
    # Check if link already exists
    if target_domain in content:
        return content
    
    # Insert link at end of the paragraph containing the keyword
    before = content[:end_of_para]
    after = content[end_of_para:]
    
    return before + link_html + after


def main():
    dry_run = "--dry-run" in sys.argv
    
    actions_file = WORKSPACE / "scripts" / "cross-link-actions.json"
    if not actions_file.exists():
        print("No cross-link-actions.json found. Run analyze-cross-links.py first.")
        return
    
    with open(actions_file) as f:
        site_reports = json.load(f)
    
    print(f"Loading {len(site_reports)} site reports...")
    
    total_injected = 0
    for report in site_reports:
        site_dir = report["site_dir"]
        domain = SITE_DOMAINS.get(report["site"], "")
        
        blog_file = WORKSPACE / site_dir / "lib" / "generated-blog-data.ts"
        if not blog_file.exists():
            print(f"  Skipping {site_dir} — no generated-blog-data.ts")
            continue
        
        content = blog_file.read_text()
        
        # Extract current posts JSON
        marker = "const allPosts: BlogPost[] = "
        idx = content.find(marker)
        json_start = idx + len(marker)
        tail = content[json_start:]
        end_marker = "];"
        end_idx = tail.rfind(end_marker)
        
        json_str = tail[:end_idx + 1]
        import json as json_lib
        json_str = re.sub(r',(\s*)\]', r'\1]', json_str)
        posts = json.loads(json_str)
        
        print(f"\n  --- {report['site']} ({site_dir}) ---")
        
        changes = 0
        for op in report["opportunities"]:
            post = next((p for p in posts if p["slug"] == op["post_slug"]), None)
            if not post:
                continue
            
            original_content = post.get("content", "")
            new_content = inject_link(
                original_content,
                op["keyword"],
                op["target_site"],
                op["target_domain"],
            )
            
            if new_content != original_content:
                post["content"] = new_content
                changes += 1
                print(f"    ✅ {op['keyword']} → {op['target_site']} in \"{op['post_title'][:50]}...\"")
        
        if changes > 0 and not dry_run:
            # Write back the updated JSON
            updated_json_str = json.dumps(posts, indent=2, ensure_ascii=False)
            # Put it back in the TS file
            updated_ts = content[:json_start] + updated_json_str + "\n];\n"
            blog_file.write_text(updated_ts)
            print(f"  💾 Saved {changes} link injections to {blog_file}")
        elif changes > 0 and dry_run:
            print(f"  📋 DRY RUN: Would inject {changes} links (saved {changes} but not written)")
        else:
            print(f"  No changes needed (links may already exist)")
        
        total_injected += changes
    
    print(f"\n{'=' * 60}")
    if dry_run:
        print(f"DRY RUN: {total_injected} links would be injected")
    else:
        print(f"DONE: {total_injected} cross-site links injected")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
