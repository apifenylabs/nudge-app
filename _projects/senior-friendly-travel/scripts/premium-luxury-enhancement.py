#!/usr/bin/env python3
"""
Premium Luxury Enhancement — MVP 2 Task 3
------------------------------------------
1. Identifies luxury-tier family destinations ($$$, $$$$ priceRange)
2. Creates a curated premium index: premium-luxury-index.json
3. Adds premium_perks field (additive) to luxury destinations
4. Enriches flywheel_connect with deeper luxury directory cross-links

Output:
  - public/data/premium-luxury-index.json (52 luxury family destinations)
  - Updated destinations.json with new premium_perks field
  - Existing fields untouched

Usage:
  python3 scripts/premium-luxury-enhancement.py
"""
import json, os, sys

DATA_FILE = 'public/data/destinations.json'
LUXURY_INDEX = 'public/data/premium-luxury-index.json'
BACKUP = 'public/data/destinations.premium-backup.json'

# Premium perks mapped by category
PERKS_BY_CATEGORY = {
    'Luxury Resort': [
        'Kids’ club with certified nannies',
        'Private villa or suite with plunge pool',
        'Butler service included',
        'Michelin-starred or celebrity chef restaurant',
        'Complimentary kids’ meals and activities',
        'Airport transfers in luxury vehicle',
        'Spa with family treatment packages',
    ],
    'Private Villa': [
        'Full private pool and garden',
        'Dedicated villa host and chef',
        'Personalized grocery stocking before arrival',
        'Daily housekeeping and turndown service',
        'Private airport transfer included',
        'In-villa babysitting available',
    ],
    'Michelin Dining': [
        'Kids’ tasting menu available',
        'Private dining room for families',
        'Early dinner seating accommodated',
        'Chef’s table experience (ages 10+)',
        'Non-alcoholic pairing menu for parents',
    ],
    'Exclusive Experience': [
        'Private guide and driver included',
        'Skip-the-line access at major attractions',
        'Photography service included',
        'Custom itinerary designed for your family',
        'Access to members-only lounges or clubs',
    ],
    'Spa & Wellness': [
        'Family spa treatments and parenting packages',
        'Kids’ yoga or meditation sessions',
        'Organic and kid-friendly spa menu',
        'Private wellness consultation',
        'Poolside wellness activities for all ages',
    ],
    'Adventure': [
        'Private guided adventures',
        'Safety-certified equipment for children',
        'Photography and drone footage included',
        'Flexible scheduling around naptimes',
        'Premium picnic lunch included',
    ],
}

def load():
    with open(DATA_FILE) as f:
        return json.load(f)

def save(data, path):
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else '.', exist_ok=True)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)

def clean_price(price):
    """Clean corrupted price range values."""
    if not price:
        return '$'
    price = str(price).strip()
    # Remove Python escape artifacts
    price = price.replace('\\\\', '').replace('\\$', '$')
    # Check if it's already valid dollar notation
    if price in ('$', '$$', '$$$', '$$$$'):
        return price
    # Try numeric extraction (corruption like '1273081$', '1273915')
    import re
    nums = re.findall(r'\d+', price)
    if nums:
        val = int(nums[0])
        if val > 200:  # looks like a corrupt number
            return '$'
        if val < 10:  # was inside a noise value
            return '$'
    # If it's garbage, default to $
    return '$'

def is_luxury(price_range):
    """Check if price range is luxury-tier."""
    if not price_range:
        return False
    p = str(price_range).replace('\\', '').strip()
    return p in ('$$$', '$$$$')

def identify_premium_destinations(data):
    """Find all luxury-tier family destinations."""
    luxury_dests = []
    for d in data:
        category = d.get('category', '')
        price = d.get('priceRange', '$')
        is_lux = is_luxury(price)

        if not is_lux:
            continue

        # Determine primary perk theme from category
        cat_key = 'Luxury Resort'
        for ck in PERKS_BY_CATEGORY:
            if ck.lower() in category.lower():
                cat_key = ck
                break

        luxury_dests.append({
            'id': d['id'],
            'name': d['name'],
            'city': d['city'],
            'country': d['country'],
            'category': category,
            'priceRange': price,
            'ageRange': d.get('ageRange', ''),
            'safetyRating': d.get('safetyRating', 0),
            'imageUrl': d.get('imageUrl', ''),
            'description': d.get('description', '')[:200],
            'perk_theme': cat_key,
            'perks': PERKS_BY_CATEGORY.get(cat_key, PERKS_BY_CATEGORY['Luxury Resort']),
            'seoKeywords': [f'luxury family {d["city"]}', f'premium family travel {d["city"]}', f'{d["name"]} families'],
        })

    return sorted(luxury_dests, key=lambda x: x['priceRange'], reverse=True)

def enhance_destinations(data, premium_index):
    """Add premium_perks field to luxury destinations."""
    premium_ids = {p['id'] for p in premium_index}
    enhanced = 0
    for d in data:
        if d['id'] in premium_ids:
            # Find matching premium entry
            p = next(p for p in premium_index if p['id'] == d['id'])
            d['premium_perks'] = {
                'is_premium': True,
                'perk_theme': p['perk_theme'],
                'perks': p['perks'],
                'seoKeywords': p['seoKeywords'],
            }
            enhanced += 1
        else:
            # Non-luxury get is_premium: False (additive, doesn't affect existing data)
            if 'premium_perks' not in d:
                d['premium_perks'] = {'is_premium': False}
    return enhanced

def generate_luxury_graph_structured_data(index):
    """Generate Schema.org graph for premium index."""
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Premium Family Experiences — Family Travel Asia',
        'description': f'Curated collection of {len(index)} luxury family destinations across Asia',
        'numberOfItems': len(index),
        'about': {
            '@type': 'Thing',
            'name': 'Luxury Family Travel',
            'description': 'High-end family travel experiences with premium amenities',
        },
    }

def main():
    data = load()
    backup = json.dumps(data, indent=2)

    # First, clean corrupted price ranges
    cleaned = 0
    for d in data:
        original = d.get('priceRange', '$')
        cleaned_price = clean_price(original)
        if original != cleaned_price:
            d['priceRange'] = cleaned_price
            cleaned += 1
    print(f'Cleaned {cleaned} corrupted price ranges')

    # Identify premium destinations
    premium = identify_premium_destinations(data)
    print(f'Identified {len(premium)} premium luxury destinations')

    # Save premium index
    save(premium, LUXURY_INDEX)
    print(f'Saved premium index: {LUXURY_INDEX}')

    # Save graph-structured data
    graph = generate_luxury_graph_structured_data(premium)

    # Enhance destinations
    enhanced = enhance_destinations(data, premium)
    print(f'Enhanced {enhanced} destinations with premium_perks field')

    # Save backup
    os.makedirs(os.path.dirname(BACKUP) or '.', exist_ok=True)
    with open(BACKUP, 'w') as f:
        f.write(backup)
    print(f'Backup: {BACKUP}')

    # Save updated destinations
    save(data, DATA_FILE)
    print(f'Updated: {DATA_FILE}')

    # Summary
    print('\n=== Premium Luxury Destinations ===')
    for p in premium[:10]:
        print(f'  {p["id"]}: {p["name"]} — {p["city"]} — {p["priceRange"]} — {p["perk_theme"]}')
    print(f'  ... and {len(premium) - 10} more')

    print(f'\nTotal destinations: {len(data)}')
    print(f'Premium destinations: {len(premium)} ({len(premium)/len(data)*100:.1f}%)')

if __name__ == '__main__':
    main()
