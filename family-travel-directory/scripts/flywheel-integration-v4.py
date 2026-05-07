#!/usr/bin/env python3
"""
Flywheel Integration — Phase 4 Migration Script
Populates flywheel_connect fields on every Family Directory destination.
Additive only. Zero existing keys touched.
"""
import json
import os
import re
import shutil

FAMILY_DATA = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'destinations.json')
EV_DATA = os.path.join(os.path.dirname(__file__), '..', '..', 'ev-charging-asia', 'data', 'stations.json')
LUXURY_DATA = os.path.join(os.path.dirname(__file__), '..', '..', 'luxury-family-travel', 'public', 'data', 'destinations.json')
BACKUP_FILE = FAMILY_DATA.replace('.json', '.phase4-backup.json')
INDEX_FILE = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'flywheel-index.json')

# City aliases for cross-directory matching
CITY_ALIASES = {
    'hoian': ['danang', 'hoian'],
    'danang': ['danang', 'hoian'],
    'nhatrang': ['nhatrang'],
    'hcmc': ['hcmc', 'hochiminh', 'saigon'],
    'hochiminh': ['hcmc', 'hochiminh', 'saigon'],
    'yogya': ['yogya', 'yogyakarta'],
    'yogyakarta': ['yogya', 'yogyakarta'],
    'siemreap': ['siemreap', 'siemreap'],
    'luangprabang': ['luangprabang', 'luangprabang'],
}

def load_json(path, label):
    try:
        if not os.path.exists(path):
            print(f"⚠  {label} not found: {path}")
            return []
        with open(path) as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠  Error loading {label}: {e}")
        return []

def n(city):
    if not city:
        return ''
    return re.sub(r'[^a-z0-9]', '', city.lower()).strip()

def expand(city_key):
    return CITY_ALIASES.get(city_key, [city_key])

def build_city_index(records):
    idx = {}
    for r in records:
        c = r.get('city', '')
        if not c:
            continue
        key = n(c)
        idx.setdefault(key, []).append(r.get('id', ''))
    return idx

def match_by_city(dest, idx, max_items=3):
    city_key = n(dest.get('city', ''))
    candidates = set()
    for alias in expand(city_key):
        for match_key, ids in idx.items():
            if alias in match_key or match_key in alias:
                candidates.update(ids)
    return sorted(candidates)[:max_items]

def build_flywheel_index(family_data, ev_data, luxury_data):
    ev_lookup = {s['id']: {'name': s.get('name', ''), 'city': s.get('city', 'Unknown'),
                          'url': f"https://www.evchargingasia.com/station/{s['id']}"} for s in ev_data}
    lux_lookup = {d['id']: {'name': d.get('name', ''), 'city': d.get('city', 'Unknown'),
                           'url': f"https://www.luxuryfamilytravel.com/destination/{d['id']}"} for d in luxury_data}
    fam_lookup = {d['id']: {'name': d.get('name', ''), 'city': d.get('city', ''),
                           'url': f"/destination/{d['id']}"} for d in family_data}
    return {'ev': ev_lookup, 'luxury': lux_lookup, 'family': fam_lookup}

def run():
    print("=== Phase 4: Flywheel Integration Migration ===")

    family = load_json(FAMILY_DATA, "Family Directory")
    ev = load_json(EV_DATA, "EV Directory")
    luxury = load_json(LUXURY_DATA, "Luxury Directory")

    # Backup
    shutil.copy2(FAMILY_DATA, BACKUP_FILE)
    print(f"Backup: {BACKUP_FILE}")

    ev_idx = build_city_index(ev)
    lux_idx = build_city_index(luxury)

    print(f"EV: {len(ev)} stations / {len(ev_idx)} cities")
    print(f"Luxury: {len(luxury)} stays / {len(lux_idx)} cities")
    print(f"Family: {len(family)} destinations\n")

    ev_l = lux_l = fam_l = 0
    ev_t = lux_t = fam_t = 0

    for d in family:
        fc = d.setdefault('flywheel_connect', {})

        if not fc.get('related_ev_station_id'):
            m = match_by_city(d, ev_idx, 3)
            if m:
                fc['related_ev_station_id'] = m if len(m) > 1 else m[0]
                ev_l += 1; ev_t += len(m)

        if not fc.get('related_luxury_stay_id'):
            m = match_by_city(d, lux_idx, 2)
            if m:
                fc['related_luxury_stay_id'] = m if len(m) > 1 else m[0]
                lux_l += 1; lux_t += len(m)

        if not fc.get('related_family_activity_id'):
            city_key = n(d.get('city', ''))
            same = []
            for d2 in family:
                if d2['id'] != d['id'] and expand(n(d2.get('city', '')))[0] == expand(city_key)[0]:
                    same.append(d2)
            same.sort(key=lambda x: x.get('popularity', 0), reverse=True)
            m = list(dict.fromkeys(x['id'] for x in same))[:4]
            if len(m) > 1:
                fc['related_family_activity_id'] = m
                fam_l += 1; fam_t += len(m)

    with open(FAMILY_DATA, 'w') as f:
        json.dump(family, f, indent=2)

    idx = build_flywheel_index(family, ev, luxury)
    os.makedirs(os.path.dirname(INDEX_FILE), exist_ok=True)
    with open(INDEX_FILE, 'w') as f:
        json.dump(idx, f, indent=2)

    none = sum(1 for d in family if not d.get('flywheel_connect', {}).get('related_ev_station_id')
               and not d.get('flywheel_connect', {}).get('related_luxury_stay_id')
               and not d.get('flywheel_connect', {}).get('related_family_activity_id'))

    print("=== Results ===")
    print(f"EV links:  {ev_l}/{len(family)} ({ev_t} refs)")
    print(f"Luxury:    {lux_l}/{len(family)} ({lux_t} refs)")
    print(f"Family:    {fam_l}/{len(family)} ({fam_t} refs)")
    print(f"Zero links: {none}")

    # Integrity
    with open(BACKUP_FILE) as f:
        backup = json.load(f)
    ok = True
    for i in range(len(family)):
        d, b = family[i], backup[i]
        for key in b:
            if key == 'flywheel_connect': continue
            if json.dumps(d.get(key)) != json.dumps(b.get(key)):
                print(f"FAIL: {d.get('id')}.{key}")
                ok = False
        for phase_key in ['revenue_engine', 'information_gain', 'geo_metadata']:
            if json.dumps(d.get(phase_key)) != json.dumps(b.get(phase_key)):
                print(f"FAIL: {d.get('id')}.{phase_key}")
                ok = False

    print(f"\nIntegrity: {'PASS ✓' if ok else 'FAIL ✗'}")
    print(f"\n=== GREEN LIGHT for Phase 5 (Distribution Avalanche) ===")

if __name__ == '__main__':
    import sys
    if '--check' in sys.argv:
        f = load_json(FAMILY_DATA, "Family Directory")
        ev = sum(1 for d in f if d.get('flywheel_connect', {}).get('related_ev_station_id'))
        lx = sum(1 for d in f if d.get('flywheel_connect', {}).get('related_luxury_stay_id'))
        fm = sum(1 for d in f if d.get('flywheel_connect', {}).get('related_family_activity_id'))
        print(f"EV: {ev} | Luxury: {lx} | Family cross: {fm} | Total: {len(f)}")
    else:
        run()
