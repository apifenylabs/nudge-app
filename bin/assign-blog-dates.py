#!/usr/bin/env python3
"""
Assign publish dates to AI Directory blog posts based on file mtime (write order).
Reads index.json, sorts posts by mtime of their JSON file, assigns dates every 2 days
starting from Jun 9, 2026 going forward, writes updated index.json.
"""
import json
import os
from datetime import datetime, timezone

BLOG_DIR = os.path.expanduser("~/.openclaw/workspace/apifeny-ai/data/blog")
INDEX_PATH = os.path.join(BLOG_DIR, "index.json")

with open(INDEX_PATH) as f:
    data = json.load(f)

posts = data["posts"]

# Build slug -> mtime map from actual JSON files
slug_mtime = {}
for entry in posts:
    slug = entry.get("slug", "")
    fpath = os.path.join(BLOG_DIR, f"{slug}.json")
    if os.path.exists(fpath):
        mtime = os.path.getmtime(fpath)
        slug_mtime[slug] = mtime

# Sort posts by mtime (oldest first)
sorted_posts = sorted(posts, key=lambda p: slug_mtime.get(p.get("slug", ""), 0))

# Assign dates: start from Jun 9, 2026 and go forward every 2 days
START_DATE = datetime(2026, 6, 9, tzinfo=timezone.utc)
assigned = 0

for i, post in enumerate(sorted_posts):
    pub_date = (START_DATE + __import__('datetime').timedelta(days=2 * i)).strftime("%Y-%m-%d")
    post["publishDate"] = pub_date
    post["date"] = pub_date
    assigned += 1

# Rebuild the array in the original order (it's fine)
data["posts"] = sorted_posts
data["lastUpdated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
data["totalPosts"] = len(sorted_posts)

with open(INDEX_PATH, "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Print summary
print(f"✅ Assigned dates to {assigned} posts")
print(f"📅 Range: {sorted_posts[0].get('publishDate','?')} → {sorted_posts[-1].get('publishDate','?')}")
print()

# Show first 10
print("=== FIRST PUBLISHED ===")
for p in sorted_posts[:10]:
    print(f"  {p['publishDate']} | {p['title'][:60]}")

print()
# Show Sep 7-13 range
print("=== SEP 7-13 ===")
for p in sorted_posts:
    d = p['publishDate']
    if '2026-09-07' <= d <= '2026-09-13':
        print(f"  {d} | {p['title'][:60]}")
