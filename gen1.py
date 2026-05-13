#!/usr/bin/env python3
"""Generate blog post 1: Tokyo with Kids."""
import json, subprocess, os, sys, re

BLOG = "/home/captain/.openclaw/workspace/kids-activities-asia/data/blog"
os.makedirs(BLOG, exist_ok=True)

prompt = """You are a professional travel writer for a family travel website. Write a VERY detailed 1500-2000 word guide about traveling to Tokyo with kids.

Write the content as clean HTML paragraphs with h2 headings, ul/li lists, and bold tags. Include REAL specifics:
- Navigating Tokyo trains with a stroller (which subway lines are stroller-friendly, elevator locations at major stations like Shibuya, Shinjuku, Tokyo Station)
- Top attractions: teamLab Planets (¥3,200 adults, ¥1,000 kids 4-12), Tokyo Disneyland (¥7,900 single-day), Ueno Zoo (¥600 adults, free for kids under 12), Sanrio Puroland (¥3,500 adults), Ghibli Museum (¥1,000 adults, ¥800 kids)
- Kid-friendly restaurants: Pokemon Cafe (Nihonbashi, reservation needed), Ninja Akasaka (fun ninja show at tables), Kiddy Land (Harajuku shopping)
- Where to stay: Shinjuku (Hotel Gracery), Ueno (near zoo and park), Odaiba (family hotels with playgrounds)
- Practical tips: IC cards (Suica/Pasmo, kids get 50% off), convenience store meals, playgrounds in parks, nursing rooms in department stores
- Sample 5-day itinerary

Include affiliate links: Book teamLab Planets on Klook (https://www.klook.com/), Tokyo Disneyland tickets on Klook (https://www.klook.com/), Airport transfer via Klook (https://www.klook.com/)

OUTPUT FORMAT - Return ONLY valid JSON, no markdown:
{"slug":"tokyo-with-kids-complete-family-guide","title":"Tokyo with Kids: The Complete Family Travel Guide — 2026","excerpt":"Planning a family trip to Tokyo? From navigating the world-famous train system with a stroller to discovering the city's best kid-approved attractions, restaurants, and parks — this is everything you need to know for an unforgettable family adventure in Japan's capital.","date":"May 13, 2026","content":"<p>...</p>","tags":["tokyo","japan","family-travel-guide","kids-activities","stroller-travel"],"author":"Kids Activities Asia Team","readingTime":12,"imageUrl":null}"""

result = subprocess.run(["ollama", "run", "llama3.2"], input=prompt.encode(), capture_output=True, timeout=180)
stdout = result.stdout.decode("utf-8", errors="replace")

# Try to parse JSON
try: data = json.loads(stdout.strip())
except:
    match = re.search(r'\{[\s\S]*"slug"[\s\S]*"imageUrl"\s*:\s*null\s*\}', stdout)
    if match:
        try: data = json.loads(match.group())
        except: data = None
    else:
        data = None

if data and data.get("content"):
    output = {"slug":"tokyo-with-kids-complete-family-guide","title":"Tokyo with Kids: The Complete Family Travel Guide — 2026","excerpt":"Planning a family trip to Tokyo? From navigating the world-famous train system with a stroller to discovering the city's best kid-approved attractions, restaurants, and parks — this is everything you need to know for an unforgettable family adventure in Japan's capital.","date":"May 13, 2026","content":data["content"],"tags":["tokyo","japan","family-travel-guide","kids-activities","stroller-travel"],"author":"Kids Activities Asia Team","readingTime":12,"imageUrl":None}
    with open(f"{BLOG}/tokyo-with-kids-complete-family-guide.json","w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print("DONE1: tokyo-with-kids-complete-family-guide.json")
    print(f"Content length: {len(data['content'])} chars")
else:
    print("FAIL1 - no valid JSON for tokyo")
    print("STDERR:", result.stderr.decode()[:200])
