# Content Pipeline Guide (For Sub-Agents)

## The Rule: Write JSON, Not TS

Every site's blog content lives in `_projects/<site>/data/blog/*.json` files.
These JSON files are the **canonical source of truth**.

Do NOT write to `lib/generated-blog-data.ts` directly. That file is:
- **Auto-generated** from the JSON files by `scripts/generate-blog-data.py`
- **Overwritten** on every build (`npm run generate-blog-data`)
- NOT the source — it's the build output

## How to Add a Blog Post

1. Create a `.json` file in `<site>/data/blog/<slug>.json` with this structure:
```json
{
  "slug": "my-post-slug",
  "title": "My Post Title",
  "excerpt": "Short description for listing pages",
  "date": "2026-05-17",
  "author": "Apifeny AI Team",
  "tags": ["travel", "family", "thailand"],
  "readingTime": "8 min read",
  "content": "## Main heading\n\nBody content in markdown...",
  "relatedDestinations": []
}
```

2. **Do NOT** update `generated-blog-data.ts` — it regenerates automatically on deploy

3. **Do NOT** update `lib/playbooks.ts` for playbooks — that file IS source-controlled

## Sites and Their Blog Paths

| Site | Blog JSON Path |
|------|---------------|
| Apifeny AI | `_projects/apifeny-ai/data/blog/*.json` |
| EV Charging Asia | `_projects/ev-charging-asia/data/blog/*.json` |
| Family Travel | `_projects/family-travel-directory/data/blog/*.json` |
| Luxury Travel | `_projects/luxury-family-travel/data/blog/*.json` |
| Kids Activities | `_projects/kids-activities-asia/data/blog/*.json` |
| Senior-Friendly | `_projects/senior-friendly-travel-asia/data/blog/*.json` |

## Verifying Your Work

After adding JSON files, run:
```bash
python3 scripts/generate-blog-data.py
```
Then check `lib/generated-blog-data.ts` now includes your post count.

## Why This Matters

On May 17 2026, a sub-agent wrote 3 EV road trip posts and 3 luxury blog posts directly to `generated-blog-data.ts`. These would have been LOST on the next build. The fix required manually extracting content from the TS file and saving as JSON. Don't repeat this mistake.
