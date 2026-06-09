#!/usr/bin/env python3
"""Read the JSON skeleton and the markdown content, merge them, validate."""
import json
import os

json_path = os.path.join(os.path.dirname(__file__), os.pardir, "data", "blog", "ai-customer-retention-asia-2026.json")
md_path = os.path.join(os.path.dirname(__file__), "content_retention.md")

with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

with open(md_path, "r", encoding="utf-8") as f:
    content_md = f.read()

data["content"] = content_md

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Validate
with open(json_path, "r", encoding="utf-8") as f:
    loaded = json.load(f)

content_len = len(loaded["content"])
print(f"JSON valid. Content length: {content_len} chars")
print(f"Total file size: {os.path.getsize(json_path)} bytes")
print(f"Slug: {loaded['slug']}")
print(f"Date: {loaded['date']}")
print(f"Title: {loaded['title'][:60]}...")

# Verify key sections exist
required_sections = [
    "Key Takeaways",
    "Why Retention Matters in Asia",
    "10 AI Tools for Customer Retention",
    "Asian-Market Coverage Matrix",
    "Building a Retention Stack by Business Stage",
    "Real-World Asian Case Studies",
    "Pricing Stack Comparison",
    "The Bottom Line"
]

for section in required_sections:
    if section in content_md:
        print(f"  ✓ Section found: {section}")
    else:
        print(f"  ✗ Section MISSING: {section}")

# Verify 10 tools
tools = ["Mixpanel", "Amplitude", "HubSpot", "Braze", "Zendesk", "Intercom", "Customer.io", "Salesforce", "AppsFlyer", "Segment"]
for tool in tools:
    if tool in content_md:
        print(f"  ✓ Tool found: {tool}")
    else:
        print(f"  ✗ Tool MISSING: {tool}")

# Verify affiliate links
for link in data["affiliate_links"]:
    print(f"  ✓ Affiliate link: {link['text']} -> {link['url']}")

# Check for case studies
for cs in ["Indonesia", "Indian D2C", "Japanese B2B"]:
    if cs in content_md:
        print(f"  ✓ Case study found: {cs}")
    else:
        print(f"  ✗ Case study MISSING: {cs}")

# Check pricing stacks
for tier in ["Budget Retention Stack", "Professional Retention Stack", "Enterprise Retention Stack"]:
    if tier in content_md:
        print(f"  ✓ Pricing tier found: {tier}")
    else:
        print(f"  ✗ Pricing tier MISSING: {tier}")
