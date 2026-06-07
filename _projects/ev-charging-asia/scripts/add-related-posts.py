#!/usr/bin/env python3
"""
Add relatedPosts to all blog JSON files based on tag overlap (Jaccard similarity).
v3: Multi-level fallback: exact tag match -> normalized tag match -> word-level overlap -> random from same directory
"""
import json
import os
import re
import sys
import random

BLOG_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "blog")
MAX_RELATED = 5
MIN_SHARED_TAGS = 1

def normalize_tag(tag):
    t = tag.lower().strip()
    t = re.sub(r'\s+', ' ', t)
    t = re.sub(r'[^a-z0-9\s-]', '', t)
    return t

def get_tag_words(tag):
    """Extract individual meaningful words from a tag (skip very common words)."""
    stopwords = {'ev', 'the', 'in', 'for', 'and', 'to', 'of', 'a', 'an', 'with', 'guide', 'asia'}
    t = normalize_tag(tag)
    words = re.findall(r'[a-z0-9-]+', t)
    return [w for w in words if w not in stopwords and len(w) > 1]

def jaccard_similarity(tags_a, tags_b):
    set_a = set(normalize_tag(t) for t in tags_a)
    set_b = set(normalize_tag(t) for t in tags_b)
    intersection = set_a & set_b
    union = set_a | set_b
    if not union:
        return 0.0
    return len(intersection) / len(union)

def shared_normalized(tags_a, tags_b):
    set_a = set(normalize_tag(t) for t in tags_a)
    set_b = set(normalize_tag(t) for t in tags_b)
    return len(set_a & set_b)

def word_overlap_score(tags_a, tags_b):
    """Score based on shared meaningful words across tags (substring level)."""
    words_a = set()
    for t in tags_a:
        words_a.update(get_tag_words(t))
    words_b = set()
    for t in tags_b:
        words_b.update(get_tag_words(t))
    
    if not words_a or not words_b:
        return 0
    
    intersection = words_a & words_b
    return len(intersection)

def main():
    files = sorted(f for f in os.listdir(BLOG_DIR) if f.endswith('.json'))
    if not files:
        print("ERROR: No JSON files found in", BLOG_DIR)
        sys.exit(1)
    
    print(f"Found {len(files)} blog posts")
    
    posts = []
    for fname in files:
        fpath = os.path.join(BLOG_DIR, fname)
        try:
            with open(fpath, 'r') as f:
                data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"  ERROR: Failed to parse {fname}: {e}")
            sys.exit(1)
        
        posts.append({
            'filename': fname,
            'slug': data.get('slug', ''),
            'title': data.get('title', ''),
            'tags': data.get('tags', []),
            'category': data.get('category', ''),
            'data': data
        })
    
    stats = {'updated': 0, 'no_related': 0, 'used_exact': 0, 'used_word': 0, 'used_random': 0}
    
    for post in posts:
        # Level 1: Exact/normalized tag match (Jaccard)
        candidates_l1 = []
        for other in posts:
            if other['slug'] == post['slug']:
                continue
            similarity = jaccard_similarity(post['tags'], other['tags'])
            shared = shared_normalized(post['tags'], other['tags'])
            if shared >= MIN_SHARED_TAGS:
                candidates_l1.append((similarity, shared, other))
        
        candidates_l1.sort(key=lambda x: (-x[0], -x[1]))
        top = candidates_l1[:MAX_RELATED]
        
        if top:
            post['related'] = [{'slug': o['slug'], 'title': o['title']} for _, _, o in top]
            stats['used_exact'] += 1
        else:
            # Level 2: Word-level overlap
            candidates_l2 = []
            for other in posts:
                if other['slug'] == post['slug']:
                    continue
                score = word_overlap_score(post['tags'], other['tags'])
                if score > 0:
                    candidates_l2.append((score, other))
            
            candidates_l2.sort(key=lambda x: -x[0])
            top = candidates_l2[:MAX_RELATED]
            
            if top:
                # De-duplicate while keeping highest scores
                seen_slugs = set()
                deduped = []
                for score, other in top:
                    if other['slug'] not in seen_slugs:
                        seen_slugs.add(other['slug'])
                        deduped.append((score, other))
                post['related'] = [{'slug': o['slug'], 'title': o['title']} for _, o in deduped[:MAX_RELATED]]
                stats['used_word'] += 1
            else:
                # Level 3: Random fallback (any other post)
                others = [p for p in posts if p['slug'] != post['slug']]
                if others:
                    random.shuffle(others)
                    picked = others[:MAX_RELATED]
                    post['related'] = [{'slug': o['slug'], 'title': o['title']} for o in picked]
                    stats['used_random'] += 1
                else:
                    post['related'] = []
                    stats['no_related'] += 1
        
        # Write back
        if 'related' in post:
            if post['related']:
                post['data']['relatedPosts'] = post['related']
            else:
                post['data'].pop('relatedPosts', None)
        
        fpath = os.path.join(BLOG_DIR, post['filename'])
        with open(fpath, 'w') as f:
            json.dump(post['data'], f, indent=2, ensure_ascii=False)
            f.write('\n')
        
        stats['updated'] += 1
    
    print(f"\nDone: {stats['updated']} files written")
    print(f"  Exact tag match: {stats['used_exact']}")
    print(f"  Word-level overlap: {stats['used_word']}")
    print(f"  Random fallback: {stats['used_random']}")
    print(f"  No match at all: {stats['no_related']}")
    return 0

if __name__ == '__main__':
    sys.exit(main())
