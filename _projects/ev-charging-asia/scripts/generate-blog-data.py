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

posts = []
for f in sorted(glob.glob(os.path.join(BLOG_DIR, '*.json'))):
    with open(f) as fh:
        posts.append(json.load(fh))

posts.sort(key=lambda p: p.get('date', ''), reverse=True)

ts = f'''// Auto-generated from data/blog/*.json
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
  relatedStations?: string[];
  imageUrl?: string;
  category?: string;
  metaDescription?: string;
  faq?: unknown;
  relatedDestinations?: string[];
  published?: string;
  categories?: string[];
  keywords?: string;
  image?: string;
  schemaType?: string;
  readTime?: string;
  featuredImage?: string;
  country?: string;
  [key: string]: unknown;
}}

const allPosts: BlogPost[] = {json.dumps(posts, indent=2, ensure_ascii=False)};

export default allPosts;
'''

with open(OUTPUT_FILE, 'w') as f:
    f.write(ts)

print(f'Generated {len(posts)} posts -> lib/generated-blog-data.ts')
