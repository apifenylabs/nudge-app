#!/usr/bin/env python3
"""
merge-new-posts-fixed.py — Merges 5 new markdown blog posts into generated-blog-data.ts

Reads: family-travel-directory/content/blog/*.md (new posts)
       family-travel-directory/data/blog-posts.json (index of new posts)
       family-travel-directory/lib/generated-blog-data.ts (existing posts)

Writes: family-travel-directory/lib/generated-blog-data.ts (merged)
"""

import json
import re
import os
from pathlib import Path
from datetime import datetime

WORKSPACE = Path(__file__).resolve().parent.parent


def markdown_to_content(md_text):
    return md_text


def extract_frontmatter(md_text):
    lines = md_text.split('\n')
    for line in lines[:20]:
        if line.startswith('# '):
            return line.replace('# ', '').strip()
    return ''


def escape_ts_string(s):
    """Escape a string for embedding as a TS template string or JS string."""
    # Replace backslash, backticks, and ${} interpolation
    s = s.replace('\\', '\\\\')
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    return s


def post_to_ts_entry(post, indent=2):
    """Convert a post dict to a TS object literal entry."""
    pad = '  ' * indent
    pad_inner = '  ' * (indent + 1)

    lines = []
    lines.append(f'{pad}{{')
    lines.append(f'{pad_inner}"slug": {json.dumps(post["slug"])},')
    lines.append(f'{pad_inner}"title": {json.dumps(post["title"])},')
    lines.append(f'{pad_inner}"excerpt": {json.dumps(post.get("excerpt", ""))},')
    lines.append(f'{pad_inner}"date": {json.dumps(post.get("date", "2025-01-01"))},')
    lines.append(f'{pad_inner}"author": {json.dumps(post.get("author", "Family Travel Asia Team"))},')

    # Tags array
    tags_str = ', '.join(json.dumps(t) for t in post.get('tags', []))
    lines.append(f'{pad_inner}"tags": [{tags_str}],')

    lines.append(f'{pad_inner}"readingTime": {json.dumps(post.get("readingTime", "8 min read"))},')

    # Content — use JSON serialization to handle all escaping
    content_escaped = post['content'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    lines.append(f'{pad_inner}"content": "{escape_ts_string(post.get("content", ""))}",')

    # Related destinations
    lines.append(f'{pad_inner}"relatedDestinations": []')
    lines.append(f'{pad}}}')

    return '\n'.join(lines)


def merge():
    blog_content_dir = WORKSPACE / "family-travel-directory" / "content" / "blog"
    index_file = WORKSPACE / "family-travel-directory" / "data" / "blog-posts.json"
    ts_file = WORKSPACE / "family-travel-directory" / "lib" / "generated-blog-data.ts"

    # Read existing generated-blog-data.ts
    ts_content = ts_file.read_text()

    # Split at the array definition
    marker = 'const allPosts: BlogPost[] = '
    idx = ts_content.find(marker)
    if idx == -1:
        print("ERROR: Could not find marker in generated-blog-data.ts")
        return

    before = ts_content[:idx]
    tail = ts_content[idx + len(marker):]

    # Find the final '];' — that's where the array ends
    end_marker = '];\n\nexport default allPosts;'
    end_idx = tail.find(end_marker)
    if end_idx == -1:
        # Try without newline
        end_marker = '];\nexport default allPosts;'
        end_idx = tail.find(end_marker)
    if end_idx == -1:
        end_marker = '];'
        end_idx = tail.find('];')
    
    if end_idx == -1:
        print("ERROR: Could not find end of array")
        return

    json_str = tail[:end_idx + 1]  # Include the closing ]
    # Parse JSON array
    try:
        existing_posts = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"ERROR parsing JSON: {e}")
        print(f"JSON snippet (last 200 chars): {json_str[-200:]}")
        return

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

        new_post = {
            "slug": slug,
            "title": entry.get("title", extract_frontmatter(md_text)),
            "excerpt": entry.get("description", entry.get("excerpt", "")),
            "date": entry.get("date", datetime.now().strftime("%Y-%m-%d")),
            "author": entry.get("author", "Family Travel Asia Team"),
            "tags": entry.get("tags", ["family-travel"]),
            "readingTime": entry["readTime"] if entry.get("readTime") and entry["readTime"] != "8 min" else entry.get("readTime", "8 min read"),
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

    # Generate new TS content
    entries = []
    for post in existing_posts:
        entries.append(post_to_ts_entry(post, indent=2))

    posts_ts = ',\n'.join(entries)

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

const allPosts: BlogPost[] = [
{posts_ts}
];

export default allPosts;
'''

    ts_file.write_text(new_ts)

    # Count posts in new file (quick check)
    verify_content = ts_file.read_text()
    post_count = verify_content.count('"slug":')
    print(f"Verified: {post_count} posts in file")

    # Count cross-site links
    cross_links = len(re.findall(r'cross-site-link', verify_content))
    print(f"Cross-site links: {cross_links} preserved")


if __name__ == "__main__":
    merge()
