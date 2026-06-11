#!/usr/bin/env python3
"""
Pinterest Pin Generator — Phase 5: Distribution Avalanche
--------------------------------------------------------
Generates ready-to-post Pinterest pin descriptions + image overlay text
for every destination. Bottleneck-friendly: outputs batch CSVs for
manual posting (no API key needed; Canva/Pinterest upload directly).

Outputs:
  - public/pins/pins-batch-1.csv (first 30 pins, ready to post)
  - public/pins/pins-full.json  (all pins, for custom scheduling)
  - public/pins/pin-template.svg (visual template for overlay)

Usage:
  python3 scripts/pinterest-pin-generator.py
  python3 scripts/pinterest-pin-generator.py --batch 50
"""
import json
import os
import csv
import re

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'destinations.json')
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'pins')
BATCH_SIZE = 30

def load():
    with open(DATA_FILE) as f:
        return json.load(f)

def make_hashtags(name, city, country, category, tags=None):
    """Generate 5-8 relevant hashtags."""
    tags_list = tags or []
    base = [
        'FamilyTravel',
        'AsiaWithKids',
        'TravelWithKids',
    ]

    # City/country tags
    city_tag = city.replace(' ', '')
    country_tag = country.replace(' ', '')
    base.append(f'{city_tag}')
    base.append(f'{country_tag}FamilyTravel')

    # Category tag
    cat_tag = category.replace(' & ', '').replace(' ', '')
    base.append(cat_tag)

    # Custom tags
    for t in tags_list[:2]:
        base.append(t.replace(' ', ''))

    # Remove dupes, dedup, format
    seen = set()
    result = []
    for tag in base:
        clean = tag.strip().replace("'", '').replace('"', '')
        if clean and clean.lower() not in seen:
            seen.add(clean.lower())
            result.append(f'#{clean}')
    return ' '.join(result[:8])

def make_pin_title(name, city, country, age_range, description):
    """Short punchy title for the pin (60-100 chars)."""
    desc_short = description[:80].strip()
    return f"{name} in {city}, {country} — {desc_short}..."

def make_pin_title_line(name, age_range):
    """Overlay text (1-2 lines for image text overlay)."""
    if 'All Ages' in age_range:
        return f"{name}\nFun for ALL Ages"
    parts = age_range.split('-')
    if len(parts) == 2:
        a, b = parts
        return f"{name}\nAges {a}-{b}"
    return f"{name}\n{age_range}"

def make_pin_description(name, city, country, category, age_range, safety, tip, desc):
    """250-400 char pin description optimized for Pinterest SEO."""
    first = f"Planning a trip to {city}, {country}? {name} is a top-rated family {category.lower().replace(' & ', ' ')} destination perfect for ages {age_range}."

    middle = ""
    if tip:
        middle = f"\n\nReal talk from parents: {tip}"

    callout = f"\n\nSafety rating: {safety}/5 ⭐"
    hashtags = make_hashtags(name, city, country, category)
    closing = f"\n\n{hashtags}"

    return first + middle + callout + closing

def score_pin_virality(dest):
    """0-100 score for how likely a pin is to perform well."""
    score = 0
    # Safety (higher = more parent trust)
    score += (dest.get('safetyRating', 0) / 5) * 20
    # Has image
    if dest.get('imageUrl') and 'placeholder' not in dest.get('imageUrl', ''):
        score += 20
    # Has verified tip
    if dest.get('information_gain', {}).get('human_verified_tip'):
        score += 15
    # Popularity
    score += (dest.get('popularity', 0) / 100) * 15
    # Has gallery images
    if dest.get('gallery') and len(dest['gallery']) > 1:
        score += 10
    # Age range (broader = more search volume)
    ar = dest.get('ageRange', '')
    if '-' in ar:
        parts = ar.split('-')
        try:
            span = int(parts[1]) - int(parts[0])
            if span >= 10: score += 10
            elif span >= 5: score += 5
        except:
            pass
    # Trending locations bonus
    trending = ['tokyo', 'bangkok', 'bali', 'singapore', 'dubai', 'seoul', 'osaka', 'phuket', 'london', 'paris']
    if dest.get('city', '').lower() in trending:
        score += 10

    return min(round(score), 100)

def generate_all():
    data = load()
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    pins = []
    for dest in data:
        ig = dest.get('information_gain', {})
        pin = {
            'id': dest['id'],
            'title': make_pin_title(dest['name'], dest.get('city', ''), dest.get('country', ''),
                                    dest.get('ageRange', ''), dest.get('description', '')),
            'title_line': make_pin_title_line(dest['name'], dest.get('ageRange', '')),
            'description': make_pin_description(
                dest['name'], dest.get('city', ''), dest.get('country', ''),
                dest.get('category', ''), dest.get('ageRange', ''),
                dest.get('safetyRating', 0),
                ig.get('human_verified_tip'),
                dest.get('description', '')
            ),
            'image_url': dest.get('imageUrl', ''),
            'destination_url': f"https://www.familytravelasia.com/destination/{dest['id']}",
            'board': 'Family Travel Asia Destinations',
            'city': dest.get('city', ''),
            'country': dest.get('country', ''),
            'category': dest.get('category', ''),
            'age_range': dest.get('ageRange', ''),
            'hashtags': make_hashtags(dest['name'], dest.get('city', ''), dest.get('country', ''),
                                      dest.get('category', ''), dest.get('seoKeywords', [])),
            'virality_score': score_pin_virality(dest),
        }
        pins.append(pin)

    # Sort by virality score
    pins.sort(key=lambda p: p['virality_score'], reverse=True)

    # Save full JSON
    with open(os.path.join(OUTPUT_DIR, 'pins-full.json'), 'w') as f:
        json.dump(pins, f, indent=2)
    print(f"Full pin set saved: {len(pins)} pins -> pins-full.json")

    # Save CSV batch
    batch = pins[:BATCH_SIZE]
    csv_path = os.path.join(OUTPUT_DIR, f'pins-batch-1.csv')
    with open(csv_path, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=['title', 'description', 'image_url', 'destination_url', 'board', 'hashtags', 'virality_score'])
        w.writeheader()
        for p in batch:
            w.writerow({
                'title': p['title'],
                'description': p['description'],
                'image_url': p['image_url'],
                'destination_url': p['destination_url'],
                'board': p['board'],
                'hashtags': p['hashtags'],
                'virality_score': p['virality_score'],
            })
    print(f"Batch CSV saved: {csv_path} ({len(batch)} pins)")

    # Top 10 preview
    print("\n=== Top 10 Most Pinnable Destinations ===")
    for p in pins[:10]:
        print(f"  [{p['virality_score']}] {p['title'][:70]}...")

    print("\n=== Pin Generator Complete ===")
    print(f"Output dir: {OUTPUT_DIR}")
    print("Upload pins-batch-1.csv to Pinterest or use pins-full.json for scheduling.")

if __name__ == '__main__':
    import sys
    if '--batch' in sys.argv:
        idx = sys.argv.index('--batch') + 1
        if idx < len(sys.argv):
            BATCH_SIZE = int(sys.argv[idx])
    generate_all()
