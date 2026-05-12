#!/usr/bin/env python3
"""Merge exactly the 5 new blog posts that were missing."""
import json, re, sys
from pathlib import Path

WORKSPACE = Path(__file__).resolve().parent.parent
blog_content_dir = WORKSPACE / "family-travel-directory" / "content" / "blog"
index_file = WORKSPACE / "family-travel-directory" / "data" / "blog-posts.json"
ts_file = WORKSPACE / "family-travel-directory" / "lib" / "generated-blog-data.ts"

ts_content = ts_file.read_text()
idx = ts_content.find("const allPosts: BlogPost[] = ")
json_start = idx + len("const allPosts: BlogPost[] = ")
tail = ts_content[json_start:]

match = re.search(r'\];', tail)
end_idx = match.start()
outer_bracket = tail.rfind("]", 0, end_idx)
json_str = tail[:outer_bracket]
json_str_clean = re.sub(r',(\s*)\]', r'\1]', json_str)
existing_posts = json.loads(json_str_clean)
existing_slugs = {p["slug"] for p in existing_posts}
print(f"Existing: {len(existing_posts)} posts")

new_posts_index = json.loads(index_file.read_text())
print(f"New posts in index: {len(new_posts_index)}")

added = 0
for entry in new_posts_index:
    slug = entry["slug"]
    if slug in existing_slugs:
        print(f"  SKIP {slug} (already exists)")
        continue
    md_file = blog_content_dir / f"{slug}.md"
    if not md_file.exists():
        print(f"  SKIP {slug} (markdown file not found)")
        continue
    md_text = md_file.read_text()
    title = entry.get("title", "")
    if not title:
        for line in md_text.split("\n")[:20]:
            if line.startswith("# "):
                title = line.replace("# ", "").strip()
                break
    new_post = {
        "slug": slug,
        "title": title,
        "excerpt": entry.get("description", ""),
        "date": entry.get("date", "2026-05-01"),
        "author": entry.get("author", "Family Travel Asia Team"),
        "tags": entry.get("tags", ["family-travel"]),
        "readingTime": entry.get("readTime", "8 min read"),
        "content": md_text,
        "relatedDestinations": []
    }
    existing_posts.append(new_post)
    existing_slugs.add(slug)
    added += 1
    print(f"  ADDED {slug}: {title[:60]}")

if added == 0:
    print("No new posts to add")
    sys.exit(0)

new_json_str = json.dumps(existing_posts, indent=2, ensure_ascii=False)

new_ts = "// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY\n"
new_ts += "// Run: npm run generate-blog-data\n\n"
new_ts += "export interface BlogPost {\n"
new_ts += "  slug: string;\n"
new_ts += "  title: string;\n"
new_ts += "  excerpt: string;\n"
new_ts += "  date: string;\n"
new_ts += "  author: string;\n"
new_ts += "  tags: string[];\n"
new_ts += "  readingTime: string;\n"
new_ts += "  content: string;\n"
new_ts += "  relatedDestinations: string[];\n"
new_ts += "}\n\n"
new_ts += f"const allPosts: BlogPost[] = {new_json_str};\n\n"
new_ts += "export default allPosts;\n"

ts_file.write_text(new_ts)
print(f"\nWrote {len(existing_posts)} posts successfully ✅")

verify = ts_file.read_text()
verify_slugs = re.findall(r'"slug": "([^"]+)"', verify)
print(f"Verified: {len(verify_slugs)} slugs")
cross_links = len(re.findall(r'cross-site-link', verify))
print(f"Cross-site links preserved: {cross_links}")
