#!/usr/bin/env python3
"""Generate the 4 missing geo pages: Austria, Belgium, Chile, Colombia."""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_lib import make, APP

this_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(this_dir, 'countries_4.json')) as f:
    countries = json.load(f)

for slug, data in sorted(countries.items()):
    name = data["name"]
    print(f"Generating {name}...")
    page = make(**data)
    out_dir = os.path.join(APP, f"ai-tools-{slug}")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "page.tsx")
    with open(out_path, "w") as f:
        f.write(page)
    print(f"  Wrote {out_path} ({len(page)} bytes)")
