#!/usr/bin/env python3
"""Generate lib/generated-blog-data.ts from data/blog/*.json files.
Run: python3 scripts/generate-blog-data.py
"""

import json
import os
import glob

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
BLOG_DIR = os.path.join(PROJECT_DIR, 'data', 'blog')
OUTPUT_FILE = os.path.join(PROJECT_DIR, 'lib', 'generated-blog-data.ts')

ALLOWED_FIELDS = {'slug', 'title', 'excerpt', 'date', 'author', 'tags', 'readingTime', 'content', 'relatedDestinations', 'relatedStations'}

posts = []
for f in sorted(glob.glob(os.path.join(BLOG_DIR, '*.json'))):
    with open(f) as fh:
        raw = json.load(fh)
    clean = {k: v for k, v in raw.items() if k in ALLOWED_FIELDS}
    posts.append(clean)

posts.sort(key=lambda p: p.get('date', ''), reverse=True)

all_have_destinations = all('relatedDestinations' in p for p in posts)
all_have_stations = all('relatedStations' in p for p in posts)
any_has_destinations = any('relatedDestinations' in p for p in posts)
if all_have_stations:
    related_field = 'relatedStations'
elif any_has_destinations:
    related_field = 'relatedDestinations'
else:
    related_field = 'relatedDestinations'

ts = f'''// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY
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
  {related_field}: string[];
}}

const allPosts: BlogPost[] = {json.dumps(posts, indent=2, ensure_ascii=False)};

export default allPosts;
'''

with open(OUTPUT_FILE, 'w') as f:
    f.write(ts)

print(f'✓ Generated {len(posts)} posts -> lib/generated-blog-data.ts')
