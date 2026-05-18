#!/usr/bin/env python3
"""Add affiliate link placeholder comments to all blog posts without affiliate content."""

import json, os, re

blog_dir = 'data/blog'
files = sorted([f for f in os.listdir(blog_dir) if f.endswith('.json')])

# Map tags to affiliate links
affiliate_comments = {
    # Booking.com hotel searches
    'thailand': '<!-- affiliate:booking.com/search?destination=Thailand&filter=ev_charging -->',
    'bangkok': '<!-- affiliate:booking.com/search?destination=Bangkok&filter=ev_charging -->',
    'phuket': '<!-- affiliate:booking.com/search?destination=Phuket&filter=ev_charging -->',
    'chiang-mai': '<!-- affiliate:booking.com/search?destination=Chiang+Mai&filter=ev_charging -->',
    'pattaya': '<!-- affiliate:booking.com/search?destination=Pattaya&filter=ev_charging -->',
    'krabi': '<!-- affiliate:booking.com/search?destination=Krabi&filter=ev_charging -->',
    'hua-hin': '<!-- affiliate:booking.com/search?destination=Hua+Hin&filter=ev_charging -->',
    
    'singapore': '<!-- affiliate:booking.com/search?destination=Singapore&filter=ev_charging -->',
    
    'malaysia': '<!-- affiliate:booking.com/search?destination=Malaysia&filter=ev_charging -->',
    'kuala-lumpur': '<!-- affiliate:booking.com/search?destination=Kuala+Lumpur&filter=ev_charging -->',
    'penang': '<!-- affiliate:booking.com/search?destination=Penang&filter=ev_charging -->',
    'malacca': '<!-- affiliate:booking.com/search?destination=Malacca&filter=ev_charging -->',
    'johor': '<!-- affiliate:booking.com/search?destination=Johor+Bahru&filter=ev_charging -->',
    
    'indonesia': '<!-- affiliate:booking.com/search?destination=Indonesia&filter=ev_charging -->',
    'jakarta': '<!-- affiliate:booking.com/search?destination=Jakarta&filter=ev_charging -->',
    'bandung': '<!-- affiliate:booking.com/search?destination=Bandung&filter=ev_charging -->',
    'bali': '<!-- affiliate:booking.com/search?destination=Bali&filter=ev_charging -->',
    
    'japan': '<!-- affiliate:booking.com/search?destination=Japan&filter=ev_charging -->',
    'tokyo': '<!-- affiliate:booking.com/search?destination=Tokyo&filter=ev_charging -->',
    'osaka': '<!-- affiliate:booking.com/search?destination=Osaka&filter=ev_charging -->',
    'kyoto': '<!-- affiliate:booking.com/search?destination=Kyoto&filter=ev_charging -->',
    'hakone': '<!-- affiliate:booking.com/search?destination=Hakone&filter=ev_charging -->',
    'nagoya': '<!-- affiliate:booking.com/search?destination=Nagoya&filter=ev_charging -->',
    'hokkaido': '<!-- affiliate:booking.com/search?destination=Hokkaido&filter=ev_charging -->',
    
    'vietnam': '<!-- affiliate:booking.com/search?destination=Vietnam&filter=ev_charging -->',
    'hanoi': '<!-- affiliate:booking.com/search?destination=Hanoi&filter=ev_charging -->',
    'sapa': '<!-- affiliate:booking.com/search?destination=Sapa&filter=ev_charging -->',
    'ho-chi-minh-city': '<!-- affiliate:booking.com/search?destination=Ho+Chi+Minh+City&filter=ev_charging -->',
    'da-nang': '<!-- affiliate:booking.com/search?destination=Da+Nang&filter=ev_charging -->',
    'hoi-an': '<!-- affiliate:booking.com/search?destination=Hoi+An&filter=ev_charging -->',
    'nha-trang': '<!-- affiliate:booking.com/search?destination=Nha+Trang&filter=ev_charging -->',
    
    'china': '<!-- affiliate:booking.com/search?destination=China&filter=ev_charging -->',
    'beijing': '<!-- affiliate:booking.com/search?destination=Beijing&filter=ev_charging -->',
    'shanghai': '<!-- affiliate:booking.com/search?destination=Shanghai&filter=ev_charging -->',
    'hong-kong': '<!-- affiliate:booking.com/search?destination=Hong+Kong&filter=ev_charging -->',
    'guangzhou': '<!-- affiliate:booking.com/search?destination=Guangzhou&filter=ev_charging -->',
    'shenzhen': '<!-- affiliate:booking.com/search?destination=Shenzhen&filter=ev_charging -->',
    'nanjing': '<!-- affiliate:booking.com/search?destination=Nanjing&filter=ev_charging -->',
    'hangzhou': '<!-- affiliate:booking.com/search?destination=Hangzhou&filter=ev_charging -->',
    
    'south-korea': '<!-- affiliate:booking.com/search?destination=South+Korea&filter=ev_charging -->',
    'seoul': '<!-- affiliate:booking.com/search?destination=Seoul&filter=ev_charging -->',
    'busan': '<!-- affiliate:booking.com/search?destination=Busan&filter=ev_charging -->',
    
    'taiwan': '<!-- affiliate:booking.com/search?destination=Taiwan&filter=ev_charging -->',
    'taipei': '<!-- affiliate:booking.com/search?destination=Taipei&filter=ev_charging -->',
    'kaohsiung': '<!-- affiliate:booking.com/search?destination=Kaohsiung&filter=ev_charging -->',
    'taichung': '<!-- affiliate:booking.com/search?destination=Taichung&filter=ev_charging -->',
    'tainan': '<!-- affiliate:booking.com/search?destination=Tainan&filter=ev_charging -->',
    'hualien': '<!-- affiliate:booking.com/search?destination=Hualien&filter=ev_charging -->',
    
    'philippines': '<!-- affiliate:booking.com/search?destination=Philippines&filter=ev_charging -->',
    'manila': '<!-- affiliate:booking.com/search?destination=Manila&filter=ev_charging -->',
    'baguio': '<!-- affiliate:booking.com/search?destination=Baguio&filter=ev_charging -->',
    'cebu': '<!-- affiliate:booking.com/search?destination=Cebu&filter=ev_charging -->',
    
    'india': '<!-- affiliate:booking.com/search?destination=India&filter=ev_charging -->',
    'chennai': '<!-- affiliate:booking.com/search?destination=Chennai&filter=ev_charging -->',
    'pondicherry': '<!-- affiliate:booking.com/search?destination=Pondicherry&filter=ev_charging -->',
    
    'cambodia': '<!-- affiliate:booking.com/search?destination=Cambodia&filter=ev_charging -->',
    'siem-reap': '<!-- affiliate:booking.com/search?destination=Siem+Reap&filter=ev_charging -->',
    'phnom-penh': '<!-- affiliate:booking.com/search?destination=Phnom+Penh&filter=ev_charging -->',
    
    'laos': '<!-- affiliate:booking.com/search?destination=Laos&filter=ev_charging -->',
    'vientiane': '<!-- affiliate:booking.com/search?destination=Vientiane&filter=ev_charging -->',
    'luang-prabang': '<!-- affiliate:booking.com/search?destination=Luang+Prabang&filter=ev_charging -->',
    
    'sri-lanka': '<!-- affiliate:booking.com/search?destination=Sri+Lanka&filter=ev_charging -->',
    'colombo': '<!-- affiliate:booking.com/search?destination=Colombo&filter=ev_charging -->',
    'kandy': '<!-- affiliate:booking.com/search?destination=Kandy&filter=ev_charging -->',
    'galle': '<!-- affiliate:booking.com/search?destination=Galle&filter=ev_charging -->',
    
    'myanmar': '<!-- affiliate:booking.com/search?destination=Myanmar&filter=ev_charging -->',
    'yangon': '<!-- affiliate:booking.com/search?destination=Yangon&filter=ev_charging -->',
    
    'bangladesh': '<!-- affiliate:booking.com/search?destination=Bangladesh&filter=ev_charging -->',
    'dhaka': '<!-- affiliate:booking.com/search?destination=Dhaka&filter=ev_charging -->',
    
    'nepal': '<!-- affiliate:booking.com/search?destination=Nepal&filter=ev_charging -->',
    'kathmandu': '<!-- affiliate:booking.com/search?destination=Kathmandu&filter=ev_charging -->',
    
    # Generic ones for theme posts
    'road-trip': '<!-- affiliate:booking.com/search?destination=Asia&filter=ev_charging&type=road_trip -->',
    'family': '<!-- affiliate:booking.com/search?destination=Asia&filter=family_friendly&ev_charging=1 -->',
    'charging-guide': '<!-- affiliate:booking.com/search?destination=Asia&filter=ev_charging -->',
    'ev-rental': '<!-- affiliate:klook.com/search?category=ev_rentals&destination=Asia -->',
}

def get_best_affiliate_comment(tags):
    """Get the most specific affiliate comment based on the post's tags."""
    comment = None
    # First, try to find a specific city/country match
    for tag in tags:
        tag_lower = tag.lower().replace(' ', '-')
        if tag_lower in affiliate_comments:
            comment = affiliate_comments[tag_lower]
    
    # If no match, try partial matching
    if not comment:
        for tag in tags:
            tag_lower = tag.lower()
            for key, val in affiliate_comments.items():
                if key in tag_lower or tag_lower in key:
                    comment = val
                    break
            if comment:
                break
    
    # Finally, fall back to generic Asia
    if not comment:
        comment = '<!-- affiliate:booking.com/search?destination=Asia&filter=ev_charging -->'
    
    return comment

def has_affiliate_in_content(content):
    """Check if content already has affiliate links or comments."""
    return any(x in content.lower() for x in [
        'affiliate', 'booking.com', 'klook', 'getyourguide', 'viator', 'expedia',
        'agoda', '<!-- affiliate'
    ])

count = 0
for fname in files:
    fpath = os.path.join(blog_dir, fname)
    with open(fpath, 'r') as f:
        raw = f.read()
    
    # Skip if already has affiliate content
    if has_affiliate_in_content(raw):
        continue
    
    try:
        post = json.loads(raw)
    except json.JSONDecodeError:
        print(f'  SKIP {fname}: JSON parse error')
        continue
    
    # Find the best affiliate comment based on tags
    tags = post.get('tags', [])
    comment = get_best_affiliate_comment(tags)
    
    # Add the comment at the end of the content, before any markdown footnotes/end
    content = post.get('content', '')
    if not content:
        continue
    
    # Add the affiliate comment at the bottom before final paragraph
    updated_content = content.rstrip() + '\n\n' + comment + '\n'
    post['content'] = updated_content
    
    # Write back
    with open(fpath, 'w') as f:
        json.dump(post, f, indent=2, ensure_ascii=False)
    
    print(f'  ADDED {comment[-60:]} to {fname}')
    count += 1

print(f'\nUpdated {count} blog posts with affiliate placeholders.')
