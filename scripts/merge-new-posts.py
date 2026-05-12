#!/usr/bin/env python3
"""
merge-new-posts.py — Merges 5 new markdown blog posts into generated-blog-data.ts

Reads: family-travel-directory/content/blog/*.md (new posts from sub-agent 2)
       family-travel-directory/data/blog-posts.json (index of new posts)
       family-travel-directory/lib/generated-blog-data.ts (existing 47 posts)

Writes: family-travel-directory/lib/generated-blog-data.ts (52 posts)
"""

import json
import re
import os
from pathlib import Path
from datetime import datetime

WORKSPACE = Path(__file__).resolve().parent.parent

def markdown_to_content(md_text):
    """Convert markdown blog post to the content format used in generated-blog-data.ts"""
    # The content field stores raw markdown (it gets converted to HTML at render time)
    return md_text

def extract_frontmatter(md_text):
    """Extract basic info from markdown content"""
    lines = md_text.split('\n')
    title = ''
    for line in lines[:20]:
        if line.startswith('# '):
            title = line.replace('# ', '').strip()
            break
    return title

def merge():
    blog_content_dir = WORKSPACE / "family-travel-directory" / "content" / "blog"
    index_file = WORKSPACE / "family-travel-directory" / "data" / "blog-posts.json"
    ts_file = WORKSPACE / "family-travel-directory" / "lib" / "generated-blog-data.ts"
    
    # Read existing generated-blog-data.ts (with 47 posts already with cross-links)
    ts_content = ts_file.read_text()
    
    # Extract existing posts
    marker = 'const allPosts: BlogPost[] = '
    idx = ts_content.find(marker)
    json_start = idx + len(marker)
    tail = ts_content[json_start:]
    
    # Find array end more carefully
    # The TS file ends: ...\n];\n with export default allPosts;
    match = re.search(r'\];', tail)
    if not match:
        print("ERROR: Could not find array end in generated-blog-data.ts")
        print(f"Tail preview: {tail[:200]}")
        return
    
    # Walk backwards from ]; to find the closing bracket of the outer array
    # The posts array is nested inside another array. Find the last ']' before '];'
    end_idx = match.start()
    # The structure is: [... {...}, {...} ];
    # Walk backwards to find the last ']' that closes the outer array
    outer_bracket = tail.rfind(']', 0, end_idx)
    if outer_bracket == -1:
        print("ERROR: Could not find closing bracket")
        return
    
    json_str = tail[:outer_bracket]
    json_str_clean = re.sub(r',(\s*)\]', r'\1]', json_str)
    existing_posts = json.loads(json_str_clean)
    
    existing_slugs = {p['slug'] for p in existing_posts}
    print(f"Existing: {len(existing_posts)} posts")
    
    # Read index of new posts
    new_posts_index = json.loads(index_file.read_text())
    print(f"New posts in index: {len(new_posts_index)}")
    
    # Read markdown files and build new posts
    added = 0
    for entry in new_posts_index:
        slug = entry['slug']
        if slug in existing_slugs:
            print(f"  SKIP {slug} (already exists)")
            continue
        
        md_file = blog_content_dir / f"{slug}.md"
        if not md_file.exists():
            print(f"  SKIP {slug} (markdown file not found)")
            continue
        
        md_text = md_file.read_text()
        
        # Build BlogPost structure matching the interface
        new_post = {
            "slug": slug,
            "title": entry.get("title", extract_frontmatter(md_text)),
            "excerpt": entry.get("description", ""),
            "date": entry.get("date", datetime.now().strftime("%Y-%m-%d")),
            "author": entry.get("author", "Family Travel Asia Team"),
            "tags": entry.get("tags", ["family-travel"]),
            "readingTime": entry.get("readTime", "8 min read"),
            "content": markdown_to_content(md_text),
            "relatedDestinations": []
        }
        
        existing_posts.append(new_post)
        existing_slugs.add(slug)
        added += 1
        print(f"  ADDED {slug}")
    
    if added == 0:
        print("No new posts to add")
        return
    
    print(f"\nTotal after merge: {len(existing_posts)} posts (+{added})")
    
    # Write back to generated-blog-data.ts
    new_json_str = json.dumps(existing_posts, indent=2, ensure_ascii=False)
    
    # Rebuild the TS file, preserving the structure
    before = ts_content[:json_start]
    # After the array: we need ]; and the rest of the file
    after_content = ts_content[json_start:]
    # Find what comes after the array
    rest = "const allPosts: BlogPost[] = "
    after_array = tail[match.end():]  # Everything after ];
    
    new_ts = f'''// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY
// Run: npm run generate-blog-data

export interface BlogPost {{
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: string;
  content: string;
  relatedDestinations: string[];
}}

const allPosts: BlogPost[] = {new_json_str};

export default allPosts;
'''
    
    ts_file.write_text(new_ts)
    
    # Verify
    verify_content = ts_file.read_text()
    verify_json_str = re.sub(r',(\s*)\]', r'\1]', verify_content.split('const allPosts: BlogPost[] = ')[1].rsplit('];', 1)[0] + ']')
    verify_posts = json.loads(verify_json_str)
    print(f"Verified: {len(verify_posts)} posts successfully written")
    
    # Count cross-site links
    cross_links = len(re.findall(r'cross-site-link', new_ts))
    print(f"Cross-site links: {cross_links} preserved")


if __name__ == "__main__":
    merge()
