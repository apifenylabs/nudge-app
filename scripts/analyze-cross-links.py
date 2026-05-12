#!/usr/bin/env python3
"""
analyze-cross-links.py — Scans all blog posts across all sites for cross-site link opportunities.
Generates a report of missing contextual links between sister sites.

Usage: python3 scripts/analyze-cross-links.py
"""

import json
import re
import os
from pathlib import Path

WORKSPACE = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Site definitions
SITES = {
    "family-travel-directory": {
        "name": "Family Travel Asia",
        "domain": "familytravelasia.com",
        "keywords": ["family travel", "kids", "parenting", "bali with kids", "thailand with kids"],
    },
    "ev-charging-asia": {
        "name": "EV Charging Asia",
        "domain": "ev-charging-asia.vercel.app",
        "keywords": ["ev", "electric vehicle", "charging station", "road trip", "ev road trip"],
    },
    "luxury-family-travel": {
        "name": "Luxury Family Travel",
        "domain": "luxury-family-travel-asia.vercel.app",
        "keywords": ["luxury", "premium", "5-star", "resort", "villa", "high-end"],
    },
}

# Keyword cross-links: each (keyword) on site A should link to site B
CROSS_LINK_RULES = [
    # Family Travel → EV
    {"from": "family-travel-directory", "to": "ev-charging-asia", "keywords": ["road trip", "driving", "car rental", "self-drive"]},
    # Family Travel → Luxury
    {"from": "family-travel-directory", "to": "luxury-family-travel", "keywords": ["luxury", "5-star", "premium", "splurge", "villa"]},
    # EV → Family Travel
    {"from": "ev-charging-asia", "to": "family-travel-directory", "keywords": ["family", "kids", "children", "toddler", "baby"]},
    # EV → Luxury
    {"from": "ev-charging-asia", "to": "luxury-family-travel", "keywords": ["luxury", "5-star", "premium hotel", "resort"]},
    # Luxury → Family Travel
    {"from": "luxury-family-travel", "to": "family-travel-directory", "keywords": ["budget", "affordable", "kids", "family activity", "child-friendly"]},
    # Luxury → EV
    {"from": "luxury-family-travel", "to": "ev-charging-asia", "keywords": ["road trip", "ev charging", "electric car", "drive"]},
]


def extract_blog_posts(site_dir):
    """Extract blog posts from generated-blog-data.ts"""
    blog_file = WORKSPACE / site_dir / "lib" / "generated-blog-data.ts"
    if not blog_file.exists():
        return []
    
    content = blog_file.read_text()
    try:
        # Find the marker + open bracket
        marker = "const allPosts: BlogPost[] = "
        idx = content.find(marker)
        if idx == -1:
            print(f"  No allPosts array found in {site_dir}")
            return []
        
        json_start = idx + len(marker)
        tail = content[json_start:]
        
        # The array ends at '];'
        end_marker = "];"
        end_idx = tail.rfind(end_marker)
        if end_idx == -1:
            print(f"  Could not find array end in {site_dir}")
            return []
        
        json_str = tail[:end_idx + 1]
        # Remove trailing comma before ]
        json_str = re.sub(r',(\s*)\]', r'\1]', json_str)
        
        posts = json.loads(json_str)
        print(f"  Parsed {len(posts)} blog posts")
        return posts
    except (json.JSONDecodeError, ValueError) as e:
        print(f"  Error parsing {site_dir}: {e}")
        return []


def analyze_post(post, site_key, site_name):
    """Analyze a single post for cross-link opportunities"""
    content = post.get("content", "") + post.get("excerpt", "")
    content_lower = content.lower()
    title = post.get("title", post.get("slug", ""))
    slug = post.get("slug", "")
    
    opportunities = []
    
    for rule in CROSS_LINK_RULES:
        if rule["from"] != site_key:
            continue
        target_site_name = SITES[rule["to"]]["name"]
        
        for keyword in rule["keywords"]:
            if keyword.lower() in content_lower:
                # Check if already linked
                target_domain = SITES[rule["to"]]["domain"]
                if target_domain not in content and target_domain.replace(".vercel.app", "") not in content:
                    opportunities.append({
                        "post_title": title,
                        "post_slug": slug,
                        "keyword": keyword,
                        "target_site": target_site_name,
                        "target_domain": target_domain,
                    })
    
    return opportunities


def main():
    print("=" * 70)
    print("CROSS-SITE LINK ANALYSIS REPORT")
    print("=" * 70)
    print()
    
    total_opportunities = 0
    site_reports = []
    
    for site_dir, site_info in SITES.items():
        print(f"\n--- {site_info['name']} ({site_dir}) ---")
        posts = extract_blog_posts(site_dir)
        print(f"  Found {len(posts)} blog posts")
        
        all_ops = []
        for post in posts:
            ops = analyze_post(post, site_dir, site_info["name"])
            all_ops.extend(ops)
        
        if all_ops:
            total_opportunities += len(all_ops)
            site_reports.append({
                "site": site_info["name"],
                "site_dir": site_dir,
                "count": len(all_ops),
                "opportunities": all_ops,
            })
            print(f"  Found {len(all_ops)} cross-link opportunities:")
            for op in all_ops[:10]:  # Show top 10
                print(f"    [{op['target_site']}] '{op['keyword']}' in \"{op['post_title'][:60]}...\"")
            if len(all_ops) > 10:
                print(f"    ... and {len(all_ops) - 10} more")
        else:
            print(f"  No new cross-link opportunities found")
    
    print(f"\n{'=' * 70}")
    print(f"TOTAL: {total_opportunities} cross-link opportunities identified")
    print(f"{'=' * 70}")
    
    # Generate actionable output
    if total_opportunities > 0:
        output_file = WORKSPACE / "scripts" / "cross-link-actions.json"
        with open(output_file, "w") as f:
            json.dump(site_reports, f, indent=2)
        print(f"\nDetailed report saved to: scripts/cross-link-actions.json")
        
        # Generate markdown action list
        md_lines = [
            "# Cross-Site Link Actions",
            "",
            f"Generated: {total_opportunities} opportunities to add contextual cross-site links.",
            "",
            "## Priority Order",
            ""
        ]
        
        for report in sorted(site_reports, key=lambda x: x["count"], reverse=True):
            md_lines.append(f"### {report['site']} ({report['count']} links)")
            md_lines.append("")
            for op in report["opportunities"]:
                md_lines.append(f"- **\"{op['keyword']}\"** in \"{op['post_title']}\" → link to [{op['target_site']}](https://{op['target_domain']})")
            md_lines.append("")
        
        md_file = WORKSPACE / "content" / "cross-link-actions.md"
        with open(md_file, "w") as f:
            f.write("\n".join(md_lines))
        print(f"Action list saved to: content/cross-link-actions.md")
    
    print("\nDone.")


if __name__ == "__main__":
    main()
