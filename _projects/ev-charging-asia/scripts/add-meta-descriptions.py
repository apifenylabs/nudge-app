#!/usr/bin/env python3
"""Add metaDescription field to blog posts from their excerpt field.
Run: python3 scripts/add-meta-descriptions.py
"""

import json
import os
import glob

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
BLOG_DIR = os.path.join(PROJECT_DIR, 'data', 'blog')
OUTPUT_FILE = os.path.join(PROJECT_DIR, 'lib', 'generated-blog-data.ts')

updated = 0
added = 0
for f in sorted(glob.glob(os.path.join(BLOG_DIR, '*.json'))):
    with open(f) as fh:
        post = json.load(fh)
    
    meta_desc = post.get('metaDescription', '')
    
    if meta_desc:
        continue
    
    # Use excerpt if available, else derive from first sentence of content
    if post.get('excerpt'):
        # Clean excerpt to reasonable meta length (max 160 chars for Google)
        meta_desc = post['excerpt'].strip()
        # Trim to sentence boundary under 160 chars
        if len(meta_desc) > 155:
            # Try to cut at last space under 155
            cut = meta_desc.rfind(' ', 0, 155)
            if cut > 100:
                meta_desc = meta_desc[:cut] + '...'
            else:
                meta_desc = meta_desc[:152] + '...'
        
        post['metaDescription'] = meta_desc
        added += 1
    else:
        # Try to get first sentence from content
        content = post.get('content', '')
        if content:
            # Get first paragraph, strip markdown headers
            lines = [l.strip() for l in content.split('\n') if l.strip() and not l.startswith('#') and not l.startswith('*By')]
            first_para = ''
            for l in lines:
                if l and len(l) > 30:
                    first_para = l
                    break
            # Clean markdown bold
            first_para = first_para.replace('**', '')
            if len(first_para) > 155:
                cut = first_para.rfind(' ', 0, 155)
                if cut > 100:
                    first_para = first_para[:cut] + '...'
                else:
                    first_para = first_para[:152] + '...'
            if first_para:
                post['metaDescription'] = first_para
                added += 1
    
    with open(f, 'w') as fh:
        json.dump(post, fh, indent=2, ensure_ascii=False)
    updated += 1

print(f'Checked {updated} files, added metaDescription to {added} posts.')

# Now regenerate generated-blog-data.ts
posts = []
for f in sorted(glob.glob(os.path.join(BLOG_DIR, '*.json'))):
    with open(f) as fh:
        posts.append(json.load(fh))

posts.sort(key=lambda p: p.get('date', ''), reverse=True)

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

# Also update blog-index.json
index_path = os.path.join(PROJECT_DIR, 'data', 'blog-index.json')
blog_index = []
for p in posts:
    blog_index.append({
        'slug': p['slug'],
        'title': p['title'],
        'description': p.get('metaDescription', p.get('excerpt', '')),
        'metaDescription': p.get('metaDescription', ''),
        'date': p['date'],
        'tags': p['tags'],
        'readingTime': p.get('readingTime', ''),
    })

with open(index_path, 'w') as f:
    json.dump(blog_index, f, indent=2, ensure_ascii=False)

print(f'Generated {len(posts)} posts -> lib/generated-blog-data.ts')
print(f'Generated blog-index.json with {len(blog_index)} entries')
