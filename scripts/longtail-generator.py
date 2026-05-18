#!/usr/bin/env python3
"""
Long-Tail SEO Page Generator — Phase 5: Distribution Avalanche
--------------------------------------------------------------
Generates static long-tail landing pages for programmatic SEO.
Key phrases: "things to do in [city] with kids", "[age] friendly [city]",
"[category] in [city]", "best [city] family destinations"

Output:
  - public/data/longtail-index.json (mapping of slugs to page data)
  - Generates the app route: /activity/[slug] (SSG pages)

Usage:
  python3 scripts/longtail-generator.py
  python3 scripts/longtail-generator.py --count 50
"""
import json
import os
import re

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'destinations.json')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'longtail-index.json')
PAGE_COUNT = 30

def load():
    with open(DATA_FILE) as f:
        return json.load(f)

def slugify(text):
    s = text.lower().strip()
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'\s+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')

def get_phrase_variants(city, country):
    """Generate multiple long-tail keyword phrases for a city."""
    return [
        f"things-to-do-in-{slugify(city)}-with-kids",
        f"best-{slugify(city)}-family-attractions",
        f"kid-friendly-{slugify(city)}-activities",
        f"family-things-to-do-{slugify(city)}",
        f"{slugify(city)}-with-toddlers",
        f"top-rated-{slugify(city)}-for-families",
        f"weekend-family-trip-{slugify(city)}",
        f"free-kids-activities-{slugify(city)}",
        f"rainy-day-{slugify(city)}-with-kids",
        f"stroller-friendly-{slugify(city)}",
    ]

def age_tier(age_range):
    """Categorize age range into tier for template generation."""
    if not age_range or 'All Ages' in age_range:
        return 'all-ages'
    if '-' in age_range:
        parts = age_range.split('-')
        try:
            mi, ma = int(parts[0]), int(parts[1])
            if mi <= 3: return 'toddlers'
            if mi <= 5: return 'preschoolers'
            if mi <= 8: return 'young-kids'
            if ma <= 12: return 'school-age'
            return 'teens'
        except:
            pass
    extra = age_range.replace('+', '')
    try:
        a = int(extra)
        if a <= 3: return 'toddlers'
        if a <= 5: return 'preschoolers'
        if a <= 8: return 'young-kids'
        if a <= 12: return 'school-age'
        return 'teens'
    except:
        pass
    return 'all-ages'

def age_label(tier):
    labels = {
        'toddlers': 'Toddler-Friendly (Ages 0-3)',
        'preschoolers': 'Preschooler-Friendly (Ages 4-5)',
        'young-kids': 'Great for Young Kids (Ages 6-8)',
        'school-age': 'Perfect for School-Age (Ages 9-12)',
        'teens': 'Teen-Approved (Ages 13+)',
        'all-ages': 'Fun for All Ages',
    }
    return labels.get(tier, 'Family-Friendly')

def generate_intro(city, country, count, categories):
    """Generate intro paragraph for a city page."""
    cats = ', '.join(sorted(categories)[:3])
    return (f"Looking for the best things to do with your family in {city}, {country}? "
            f"You're in the right place. We've curated {count} top-rated family attractions spanning "
            f"{cats}. Each destination is vetted by real parents with safety ratings, "
            f"age recommendations, and insider tips you won't find on generic travel sites. "
            f"From splash parks to cultural gems, here's your complete guide to {city} with kids.")

def generate_outro(city, country):
    return (f"Ready to explore {city}? Bookmark this page — we update it regularly with new "
            f"family-friendly destinations, verified tips, and real parent reviews. "
            f"Don't forget to check our {city} trip planning resources for the best hotel deals "
            f"and family tour packages.")

def generate_page(destinations, city, country):
    """Generate a single long-tail page object."""
    count = len(destinations)
    categories = set(d.get('category', '') for d in destinations)
    slugs = [d['id'] for d in destinations]
    age_tiers = set(age_tier(d.get('ageRange', '')) for d in destinations)
    primary_tier = max(age_tiers, key=lambda t: sum(1 for d in destinations if age_tier(d.get('ageRange', '')) == t))

    # Pick the best phrase for the title
    phrases = get_phrase_variants(city, country)
    title_phrase = phrases[0]

    return {
        'slug': title_phrase,
        'title': f"Things To Do In {city} With Kids — Family Travel Guide 2026",
        'meta_title': f"{count} Best Things To Do in {city} with Kids (2026) — Family Travel Asia",
        'meta_description': f"Discover {count} top family-friendly activities in {city}, {country}. "
                           f"Safe, age-rated destinations with real parent tips. {age_label(primary_tier)} attractions included.",
        'h1': f"Best Things To Do in {city} with Kids",
        'intro': generate_intro(city, country, count, categories),
        'outro': generate_outro(city, country),
        'city': city,
        'country': country,
        'destination_count': count,
        'categories': sorted(categories),
        'age_tiers': sorted(age_tiers),
        'primary_age_tier': primary_tier,
        'slug_phrases': phrases[:5],
        'destination_ids': slugs,
        'graph': {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            'name': f"Things to Do in {city} with Kids",
            'description': f"Family-friendly attractions in {city}, {country}",
            'url': f"https://www.familytravelasia.com/activity/{title_phrase}",
            'numberOfItems': count,
        },
    }

def generate():
    data = load()
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

    # Group destinations by city
    from collections import defaultdict
    city_groups = defaultdict(list)
    for d in data:
        city_groups[(d['city'], d['country'])].append(d)

    # Generate pages for top cities, sorted by destination count
    sorted_cities = sorted(city_groups.items(), key=lambda x: len(x[1]), reverse=True)

    pages = []
    for (city, country), dests in sorted_cities[:PAGE_COUNT]:
        page = generate_page(dests, city, country)
        pages.append(page)

    # Add age-specific variants for top 10 cities
    for (city, country), dests in sorted_cities[:10]:
        # Categorize destinations by age tier
        by_age = defaultdict(list)
        for d in dests:
            by_age[age_tier(d.get('ageRange', ''))].append(d)

        for tier, tier_dests in by_age.items():
            if len(tier_dests) < 2:
                continue
            page = generate_page(tier_dests, city, country)
            # Override slug and title for age-specific page
            age_slug_templates = {
                'toddlers': f"toddler-friendly-things-{slugify(city)}",
                'preschoolers': f"preschooler-activities-{slugify(city)}",
                'young-kids': f"things-to-do-in-{slugify(city)}-ages-6-8",
                'school-age': f"school-age-activities-{slugify(city)}",
                'teens': f"teen-things-to-do-{slugify(city)}",
            }
            page['slug'] = age_slug_templates.get(tier, f"{tier}-{slugify(city)}")
            page['title'] = f"{age_label(tier)} Activities in {city} — Family Travel Guide"
            page['meta_title'] = f"{age_label(tier)} Things To Do in {city} (2026)"
            page['meta_description'] = f"Looking for {age_label(tier).lower()} activities in {city}? We found {len(tier_dests)} perfect destinations with real parent reviews and safety ratings."
            page['h1'] = f"{age_label(tier)} Activities in {city}"
            page['intro'] = f"Traveling with {'young children' if tier in ['toddlers','preschoolers','young-kids'] else 'older kids'}? Here are the best {city} attractions matched to your child's age group."
            page['primary_age_tier'] = tier
            pages.append(page)

    # Remove duplicates by slug
    seen_slugs = set()
    unique_pages = []
    for p in pages:
        if p['slug'] not in seen_slugs:
            seen_slugs.add(p['slug'])
            unique_pages.append(p)

    # Save index
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(unique_pages, f, indent=2)
    print(f"Long-tail index saved: {len(unique_pages)} pages -> longtail-index.json")

    # Preview
    print("\n=== Generated Long-Tail Pages ===")
    for p in unique_pages[:20]:
        print(f"  /activity/{p['slug']} — {p['title'][:60]}... ({p['destination_count']} dests, {p['primary_age_tier']})")

    print(f"\nTotal pages: {len(unique_pages)}")

if __name__ == '__main__':
    import sys
    if '--count' in sys.argv:
        idx = sys.argv.index('--count') + 1
        if idx < len(sys.argv):
            PAGE_COUNT = int(sys.argv[idx])
    generate()
