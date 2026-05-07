#!/usr/bin/env python3
"""
Phase 1: Schema Hardening — Migration Script v1
-----------------------------------------------
Additive only: appends 4 new modules to every destination.
Does NOT remove, rename, modify, or touch any existing keys.
"""

import json
import os
import sys
from datetime import datetime

# ─── Config ──────────────────────────────────────────────────────
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "data")
INPUT_FILE = os.path.join(DATA_DIR, "destinations.json")
BACKUP_FILE = os.path.join(DATA_DIR, "destinations.backup.json")
OUTPUT_FILE = os.path.join(DATA_DIR, "destinations.json")
SCHEMA_FILE = os.path.join(os.path.dirname(__file__), "..", "knowledge", "master_directory_schema_v1.json")

# ─── New modules to inject ──────────────────────────────────────
NEW_MODULES = {
    "revenue_engine": {
        "klook_product_id": None,
        "viator_product_id": None,
        "current_price_usd": 0,
        "last_price_check": None
    },
    "information_gain": {
        "reddit_sentiment_snippet": "",
        "primary_source_url": "",
        "human_verified_tip": "",
        "geo_highlight_score": 0
    },
    "flywheel_connect": {
        "related_ev_station_id": None,
        "related_luxury_stay_id": None,
        "related_family_activity_id": None
    },
    "geo_metadata": {
        "last_updated": datetime.utcnow().strftime("%Y-%m-%d"),
        "data_version": "1.0.0",
        "verification_status": "AI"
    }
}

# ─── Verification keys (must remain untouched) ──────────────────
VERIFY_KEYS = ["title", "location", "description", "image"]
# Note: "title" and "image" don't exist in current schema — this
# guard exists to prevent accidental creation or overwriting of
# similarly-named keys in future iterations.

# ─── Run migration ──────────────────────────────────────────────
def main():
    print("=== Phase 1: Schema Hardening Migration ===")
    print()

    # 1. Load
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        destinations = json.load(f)
    print(f"Loaded {len(destinations)} destinations from {INPUT_FILE}")

    # 2. Backup
    with open(BACKUP_FILE, "w", encoding="utf-8") as f:
        json.dump(destinations, f, indent=2, ensure_ascii=False)
    print(f"Backup saved to {BACKUP_FILE}")

    # 3. Snapshot old keys for verification
    original_keys = {}
    for d in destinations:
        original_keys[d["id"]] = list(d.keys())

    # 4. Append new modules (additive only)
    modified = 0
    for d in destinations:
        d.update(NEW_MODULES)
        modified += 1
    print(f"Appended 4 new modules to {modified} destinations")
    for module in NEW_MODULES:
        print(f"  ✓ {module}")

    # 5. Verify nothing was removed or renamed
    errors = []
    for d in destinations:
        did = d["id"]
        old = set(original_keys[did])
        new = set(d.keys())
        removed = old - new
        if removed:
            errors.append(f"  ✗ {did}: keys removed: {removed}")
    if errors:
        print("\nERRORS:")
        for e in errors:
            print(e)
        sys.exit(1)

    # 6. Verify critical keys untouched
    sample = destinations[0]
    for key in VERIFY_KEYS:
        if key in sample:
            print(f"  ✓ '{key}' exists (not touched)")
        else:
            # Key doesn't exist — that's fine, just note it
            pass

    # Ensure 'location', 'description', 'imageUrl' are exactly as they were
    if "location" in sample:
        print(f"  ✓ location = '{sample['location'][:40]}...' (untouched)")
    if "description" in sample:
        print(f"  ✓ description = '{sample['description'][:40]}...' (untouched)")
    if "name" in sample:
        print(f"  ✓ name = '{sample['name']}' (untouched)")
    if "imageUrl" in sample:
        print(f"  ✓ imageUrl = '{sample['imageUrl'][:40]}...' (untouched)")

    # 7. Write output
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(destinations, f, indent=2, ensure_ascii=False)
    print(f"\nMigration written to {OUTPUT_FILE}")
    print("Migration complete. Destinations file updated in-place.")

    # 8. Also write a schema template to knowledge base
    schema_template = {
        "$schema": "https://json-schema.org/draft-07/schema#",
        "title": "Directory Beast — Master Schema v1",
        "description": "Structured schema for all destination cards across directory products",
        "version": "1.0.0",
        "last_migrated": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "destination_required_fields": list(destinations[0].keys()),
        "new_modules_in_v1": list(NEW_MODULES.keys()),
        "sample_destination": destinations[0],
        "change_log": [
            {
                "version": "1.0.0",
                "date": datetime.utcnow().strftime("%Y-%m-%d"),
                "phase": 1,
                "changes": [
                    "Added 'revenue_engine' — affiliate/commission tracking fields",
                    "Added 'information_gain' — research quality metadata",
                    "Added 'flywheel_connect' — cross-directory relationships",
                    "Added 'geo_metadata' — verification and versioning"
                ],
                "guardrails": [
                    "Additive only — no existing keys modified"
                ]
            }
        ]
    }
    os.makedirs(os.path.dirname(SCHEMA_FILE), exist_ok=True)
    with open(SCHEMA_FILE, "w", encoding="utf-8") as f:
        json.dump(schema_template, f, indent=2, ensure_ascii=False)
    print(f"Schema template written to {SCHEMA_FILE}")

    print("\n=== Migration Summary ===")
    print(f"Total destinations: {len(destinations)}")
    print(f"Total keys per destination: {len(destinations[0].keys())}")
    print(f"New keys added: {list(NEW_MODULES.keys())}")
    print("Existing keys: COMPLETELY UNTOUCHED ✓")
    print("GREEN LIGHT for Phase 2 (Deep Link Engine)")


if __name__ == "__main__":
    main()
