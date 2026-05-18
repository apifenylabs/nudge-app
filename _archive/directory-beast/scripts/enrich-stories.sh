#!/bin/bash
# enrich-stories.sh — Batch enrich parent fullStory fields using Ollama (llama3.2)
# Takes short-stories.json input, outputs enriched-stories.json

INPUT="/tmp/short-stories.json"
OUTPUT="/tmp/enriched-stories.json"
OLLAMA_URL="http://localhost:11434"
MODEL="llama3.2"

if [ ! -f "$INPUT" ]; then
    echo "ERROR: $INPUT not found"
    exit 1
fi

python3 << 'PYEOF'
import json, subprocess, sys, re

with open('/tmp/short-stories.json') as f:
    destinations = json.load(f)

enriched = []

for idx, d in enumerate(destinations):
    slug = d['slug']
    name = d['name']
    city = d['city']
    country = d['country']
    category = d['category']
    desc = d.get('description', '')
    age_range = d.get('ageRange', '')
    amenities = d.get('amenities', [])
    safety = d.get('safetyFeatures', [])
    tips = d.get('tipsAndTricks', [])
    itinerary = d.get('itineraryComparison', {})
    ps = d.get('parentStory', {})
    story_title = ps.get('title', '')
    story_excerpt = ps.get('excerpt', '')
    story_author = ps.get('author', '')
    current_full = ps.get('fullStory', '')

    prompt = f"""You are a parent writing a short personal story about traveling with kids. Write ONE authentic, warm, 200-400 character first-person story based on these details:

Destination: {name} in {city}, {country}
Category: {category}
Description: {desc}
Age range recommended: {age_range}
Amenities: {', '.join(amenities[:4]) if isinstance(amenities, list) else amenities}
Safety features: {', '.join(safety[:3]) if isinstance(safety, list) else safety}
Parent tip: {', '.join(tips[:2]) if isinstance(tips, list) else ''}

Story title: {story_title}
Story excerpt: {story_excerpt}
Current fullStory: {current_full}

Write a 200-400 character personal story in first-person as a parent. It should be warm, specific, and feel like something a real parent would share. Include a specific moment or detail. Do NOT use markdown or quotes wrapping. Just the story text."""

    # Call Ollama
    payload = {
        "model": "llama3.2",
        "prompt": prompt,
        "stream": False,
        "options": {
            "temperature": 0.7,
            "num_predict": 512
        }
    }

    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "POST", "http://localhost:11434/api/generate",
             "-H", "Content-Type: application/json",
             "-d", json.dumps(payload)],
            capture_output=True, text=True, timeout=120
        )
        resp = json.loads(result.stdout)
        new_story = resp.get('response', '').strip()
        # Clean up quotes if wrapped
        new_story = re.sub(r'^["\']+|["\']+$', '', new_story)
    except Exception as e:
        new_story = f"[Error: {str(e)}]"
        print(f"  ERROR for {slug}: {e}", file=sys.stderr)

    enriched.append({
        "slug": slug,
        "name": name,
        "old_fullStory": current_full,
        "new_fullStory": new_story[:400],  # cap at 400 chars
        "title": story_title,
        "excerpt": story_excerpt,
        "author": story_author
    })

    print(f"[{idx+1}/30] {slug}: {len(new_story)} chars", flush=True)

with open('/tmp/enriched-stories.json', 'w') as f:
    json.dump(enriched, f, indent=2)

print(f"\nDone! {len(enriched)} stories enriched.")
print(f"Output: /tmp/enriched-stories.json")
PYEOF
