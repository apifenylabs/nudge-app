#!/usr/bin/env python3
"""
Mass Internal Link Injector — ALL Posts (ULTRA SAFE)
Adds 2-3 "See also" links to every blog post at section ends.
NEVER modifies existing content. Only appends new paragraphs.

Usage: cd /home/captain/.openclaw/workspace/apifeny-ai && python3 scripts/add-internal-links.py
"""

import json, glob, os, re, random

BLOG_DIR = 'data/blog'
PLACEHOLDER_SLUGS = {'build-ai-agent-from-scratch-2026', 'deepseek-vs-chatgpt-2026-comparison'}

ALL_POSTS = {}
for fpath in sorted(glob.glob(os.path.join(BLOG_DIR, '*.json'))):
    slug = os.path.basename(fpath).replace('.json', '')
    if slug == 'index': continue
    try:
        with open(fpath) as fh:
            ALL_POSTS[slug] = json.load(fh)
    except: pass

print(f"Loaded {len(ALL_POSTS)} posts\n")

def count_blog_links(text):
    md = re.findall(r'\[([^\]]+)\]\(\s*/blog/([a-z0-9-]+)\)', text)
    a = re.findall(r'<a[^>]*href="/blog/([a-z0-9-]+)"', text)
    return len(md) + len(a)

def get_used_slugs(text):
    return set(m.group(1) for m in re.finditer(r'/blog/([a-z0-9-]+)', text))

def find_related(slug, tags, exclude=None, min_overlap=2):
    if exclude is None: exclude = set()
    exclude.add(slug)
    tag_set = set(t.lower() for t in tags)
    scored = []
    for s, post in ALL_POSTS.items():
        if s in exclude or s in PLACEHOLDER_SLUGS or not post.get('content'): continue
        overlap = len(tag_set & set(t.lower() for t in post.get('tags', [])))
        if overlap >= min_overlap:
            scored.append((s, post['title'], overlap))
    scored.sort(key=lambda x: (-x[2], random.random()))
    return [(s, t) for s, t, _ in scored[:6]]

def shorten_title(title, max_chars=55):
    t = re.sub(r'^(Best |Top |The |Ultimate |Complete )', '', title, flags=re.IGNORECASE).strip()
    t = re.sub(r'\s*\(.*?\)\s*', ' ', t).strip()
    if len(t) > max_chars:
        t = t[:max_chars-1].rstrip() + '…'
    return t

def find_section_ends(content):
    """Find safe insertion points at section ends."""
    spots = []
    for h_match in re.finditer(r'^## ', content, re.MULTILINE):
        h_start = h_match.start()
        sec_end = re.search(r'(?:^## )|\Z', content[h_start+4:], re.MULTILINE)
        if sec_end:
            sec_end_global = h_start + 4 + sec_end.start()
        else:
            sec_end_global = len(content)
        
        # Find last paragraph break in this section
        body = content[h_start:sec_end_global]
        last_para_end = h_start
        for m in re.finditer(r'\n\n', body):
            last_para_end = h_start + m.end()
        
        if last_para_end >= h_start and last_para_end < sec_end_global:
            # Verify last paragraph isn't a table/code block
            sample = content[last_para_end:sec_end_global].strip()[:50]
            if not any(sample.startswith(x) for x in ('|', '```', '- [', '**', '### ')):
                spots.append(last_para_end)
    
    # End of content is always safe
    spots.append(len(content))
    
    # Remove positions inside code blocks
    clean = []
    for pos in spots:
        fences = list(re.finditer(r'```', content[:pos]))
        if len(fences) % 2 == 0:
            # Also check we're not inside a markdown link
            text_before = content[max(0,pos-200):pos]
            open_brackets = text_before.count('[')
            close_brackets = text_before.count(']')
            if open_brackets <= close_brackets:
                clean.append(pos)
    
    return clean

def inject_into(text, slug, tags, max_new=3):
    already = count_blog_links(text)
    needed = min(max_new, max(0, 3 - already))
    if needed <= 0: return text, 0
    
    used = get_used_slugs(text)
    related = find_related(slug, tags, exclude=used, min_overlap=2)
    if not related:
        related = find_related(slug, tags, exclude=used, min_overlap=1)
    if not related:
        return text, 0
    
    spots = find_section_ends(text)
    if not spots: return text, 0
    
    added = 0
    added_slugs = set(used)
    used_spots = set()
    
    for rel_slug, rel_title in related:
        if added >= needed: break
        if rel_slug in added_slugs: continue
        
        short_title = shorten_title(rel_title)
        link_md = f'\n\n📖 **See also:** [{short_title}](/blog/{rel_slug})'
        
        placed = False
        target_tags = set(t.lower() for t in ALL_POSTS[rel_slug].get('tags', []))
        
        for pos in reversed(spots):
            if pos in used_spots: continue
            context = text[max(0,pos-500):pos].lower()
            score = sum(1 for kw in target_tags if kw in context)
            if score > 0:
                text = text[:pos] + link_md + text[pos:]
                used_spots.add(pos)
                added += 1
                added_slugs.add(rel_slug)
                placed = True
                break
        
        if not placed:
            un = [s for s in spots if s not in used_spots]
            if un:
                p = un[-1]
                text = text[:p] + link_md + text[p:]
                used_spots.add(p)
                added += 1
                added_slugs.add(rel_slug)
    
    return text, added


def main():
    random.seed(42)
    total_injected = 0
    total_modified = 0
    
    for slug, post in sorted(ALL_POSTS.items()):
        if slug in PLACEHOLDER_SLUGS: continue
        
        content = post.get('content', '')
        sections = post.get('sections', [])
        
        if not content and not sections: continue
        
        modified = False
        
        if content:
            new_content, added = inject_into(content, slug, post.get('tags', []))
            if added > 0:
                post['content'] = new_content
                total_injected += added
                modified = True
        
        if sections:
            for i, sec in enumerate(sections[:6]):
                sc = sec.get('content', '')
                if not sc: continue
                new_sc, added_sc = inject_into(sc, slug, post.get('tags', []), max_new=2)
                if added_sc > 0:
                    sections[i]['content'] = new_sc
                    total_injected += added_sc
                    modified = True
        
        if modified:
            fpath = os.path.join(BLOG_DIR, f'{slug}.json')
            with open(fpath, 'w') as fh:
                json.dump(post, fh, indent=2, ensure_ascii=False)
            total_modified += 1
    
    # Final audit
    dist = {}
    for slug, post in ALL_POSTS.items():
        if slug in PLACEHOLDER_SLUGS: continue
        text = (post.get('content') or '') + ' '.join(s.get('content','') for s in post.get('sections',[]))
        n = count_blog_links(text)
        dist[n] = dist.get(n, 0) + 1
    
    print(f"\nFinal distribution:")
    for n in sorted(dist.keys()):
        print(f"  {n} links: {dist[n]} posts")
    print(f"\nTotal modified: {total_modified}")  
    print(f"Total links added: {total_injected}")


if __name__ == '__main__':
    main()
