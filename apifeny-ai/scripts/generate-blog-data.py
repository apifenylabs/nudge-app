#!/usr/bin/env python3
"""Generate blog data TypeScript module from JSON blog posts in data/blog/."""

import json
import os
import glob
from datetime import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPT_DIR)  # parent of scripts/
BLOG_DIR = os.path.join(BASE_DIR, "data", "blog")
OUTPUT_FILE = os.path.join(BASE_DIR, "lib", "generated-blog-data.ts")

def slugify(text):
    return text.lower().replace(" ", "-").replace("'", "")

def load_blog_posts():
    posts = []
    if not os.path.isdir(BLOG_DIR):
        print(f"⚠️  Blog directory '{BLOG_DIR}' not found. Creating empty generated data.")
        return posts
    
    json_files = glob.glob(os.path.join(BLOG_DIR, "*.json"))
    print(f"📂 Found {len(json_files)} blog post JSON files")
    
    for filepath in sorted(json_files):
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                post = json.load(f)
            
            required = ["slug", "title", "excerpt", "date", "content", "readingTime"]
            missing = [k for k in required if k not in post]
            if missing:
                print(f"⚠️  Skipping {filepath}: missing fields {missing}")
                continue
            
            posts.append(post)
        except json.JSONDecodeError as e:
            print(f"❌ Error parsing {filepath}: {e}")
        except Exception as e:
            print(f"❌ Unexpected error with {filepath}: {e}")
    
    return posts

def generate_ts(posts):
    lines = [
        "// Auto-generated from data/blog/*.json — DO NOT EDIT DIRECTLY",
        "// Run: npm run generate-blog-data",
        "",
        "export interface BlogPost {",
        "  slug: string;",
        "  title: string;",
        "  excerpt: string;",
        "  date: string;",
        "  author: string;",
        "  tags: string[];",
        "  readingTime: string;",
        "  content: string;",
        "}",
        "",
        "const allPosts: BlogPost[] = [",
    ]
    
    for i, post in enumerate(posts):
        # Write each post as a compact JSON entry
        clean_post = {k: post[k] for k in ["slug", "title", "excerpt", "date", "author", "tags", "readingTime", "content"]}
        json_str = json.dumps(clean_post, ensure_ascii=False, indent=2)
        # Indent properly
        indented = "\n".join("  " + line if line.strip() else "" for line in json_str.split("\n"))
        # First line
        lines.append(indented)
        if i < len(posts) - 1:
            lines[-1] += ","
    
    lines.append("];")
    lines.append("")
    lines.append("export default allPosts;")
    lines.append("export { allPosts }")
    
    return "\n".join(lines)

def main():
    print(f"🔍 Scanning {BLOG_DIR}/ for blog posts...")
    posts = load_blog_posts()
    print(f"📝 Loaded {len(posts)} blog posts")
    
    ts_content = generate_ts(posts)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"✅ Generated {OUTPUT_FILE} with {len(posts)} blog posts")

if __name__ == "__main__":
    main()
