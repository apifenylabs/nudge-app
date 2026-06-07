#!/usr/bin/env python3
"""
SEO META DESCRIPTION FIX for EV Charging Asia blog posts.

Scan all .md/.mdx files in content/blog/ and insert a `description:`
frontmatter field (150-160 chars, keyword-rich, actionable) for files
that are missing it.
"""

import os
import re
import time

BLOG_DIR = os.path.join(os.path.dirname(__file__), "content", "blog")


def extract_frontmatter(content: str):
    """Extract frontmatter block. Returns (frontmatter_text, body_text, end_index) or None."""
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
    if m:
        return m.group(1), content[m.end() :], m.end()
    return None, content, 0


def has_description(frontmatter: str) -> bool:
    """Check if frontmatter already has a description field."""
    return bool(re.search(r"^description:\s", frontmatter, re.MULTILINE))


def get_title(frontmatter: str) -> str:
    """Extract title value from frontmatter."""
    m = re.search(r'^title:\s+"?(.+?)"?\s*$', frontmatter, re.MULTILINE)
    if m:
        return m.group(1).strip().strip('"')
    return ""


def get_first_paragraph(body: str) -> str:
    """
    Extract the first meaningful content paragraph after frontmatter.
    Strips headings, empty lines, and import statements.
    """
    text = re.sub(r"^import .*?;\s*", "", body, flags=re.MULTILINE)
    text = re.sub(r"<!--.*?-->", "", text, flags=re.DOTALL)
    lines = text.split("\n")
    para_buf = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            if para_buf:
                break
            continue
        # Skip headings, JSX, images, and "Last updated:" lines
        if stripped.startswith("#") or stripped.startswith("<") or stripped.startswith("{"):
            if para_buf:
                break
            continue
        if stripped.startswith("!["):
            continue
        if re.match(r"^\*+Last\s+updated", stripped, re.IGNORECASE):
            continue
        if re.match(r"^Last\s+updated", stripped, re.IGNORECASE):
            continue
        para_buf.append(stripped)
        if len(" ".join(para_buf)) > 80:
            break
    return " ".join(para_buf)


def clean_text(text: str) -> str:
    """Remove markdown formatting, links, bold, etc."""
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = text.replace("**", "").replace("*", "")
    text = re.sub(r"^[\*_]+\s*Last updated.*?(?=\.|$)", "", text).strip()
    text = re.sub(r"Last updated:.*?(?=\.|$)", "", text).strip()
    text = re.sub(r"#+", "", text)
    text = " ".join(text.split())
    return text.strip()


def generate_description(title: str, first_para: str) -> str:
    """
    Generate a 150-160 char SEO meta description from title + first paragraph.
    Natural-sounding, keyword-rich, actionable.
    """
    title_clean = clean_text(title)
    para_clean = clean_text(first_para)

    title_lower = title_clean.lower()
    para_lower = para_clean.lower()

    # Detect location
    locations = [
        "Singapore", "Malaysia", "Thailand", "Vietnam", "Indonesia", "Philippines",
        "Bali", "Lombok", "Jakarta", "Bangkok", "Kuala Lumpur", "Penang",
        "Hong Kong", "China", "Japan", "South Korea", "Taiwan", "India",
        "Bangladesh", "Myanmar", "Laos", "Cambodia", "Brunei",
        "Hanoi", "Ho Chi Minh City", "Da Nang", "Chiang Mai", "Phnom Penh",
        "Siem Reap", "Cebu", "Bohol", "Siquijor", "Langkawi",
        "Seoul", "Busan", "Guangzhou", "Yangtze", "Hainan",
        "Southeast Asia", "Asia"
    ]
    location = "Asia"
    combined_lower = title_lower + " " + para_lower
    for loc in locations:
        if loc.lower() in combined_lower:
            location = loc
            break

    # Get 1-2 sentences from paragraph as detail source
    sentences = [s.strip() for s in re.split(r'(?<=[.!?])\s+', para_clean) if s.strip() and len(s.strip()) > 15]

    # Pick the best detail sentence (with numbers or concrete nouns)
    detail = ""
    for s in sentences:
        if re.search(r"\d+", s) or re.search(r"(charging|station|network|km|battery|cost|route|guide|ferry|island|expressway)", s.lower()):
            detail = s
            break
    if not detail and sentences:
        detail = sentences[0]
    if not detail:
        detail = para_clean[:120]

    # Build description: title concept + colon + key detail
    base = title_clean
    if len(base) > 75:
        parts = re.split(r"\s*[:\u2014\u2013]\s*", base)
        base = parts[0]
    base = re.sub(r"\s*\[\d{4}\]", "", base).strip()
    base = base.rstrip(" ,;:-")

    # Start constructing
    desc = f"{base}. {detail}"
    desc = re.sub(r"\s+", " ", desc).strip()

    # Fit to 150-160 chars
    if len(desc) > 160:
        # Try to end at a sentence boundary
        cut = 155
        while cut > 140 and desc[cut] not in ".!?":
            cut -= 1
        if cut > 140:
            desc = desc[: cut + 1]
        else:
            # End at word boundary
            cut = 155
            while cut > 140 and desc[cut] != " ":
                cut -= 1
            if cut > 140:
                desc = desc[:cut].rstrip(" ,;:-") + "."
            else:
                desc = desc[:152].rstrip(" ,;:-") + "."

    # Ensure minimum 148 chars
    desc = desc.strip()
    if len(desc) < 148:
        pad = f" Plan your {location} EV trip with our expert guide."
        test = desc.rstrip(".") + pad
        if len(test) <= 160:
            desc = test
        else:
            short_pad = f" Plan your {location} EV trip today."
            test = desc.rstrip(".") + short_pad
            if len(test) <= 160:
                desc = test

    if len(desc) < 148:
        desc = desc.rstrip(".") + ". Expert advice for EV drivers across Asia."
        if len(desc) > 160:
            desc = desc[:157].rstrip(" ,;-") + "."

    # Final cleanup
    desc = desc.strip()
    if not desc.endswith("."):
        desc += "."
    desc = desc.replace("..", ".")
    if len(desc) > 160:
        desc = desc[:157].rstrip(" ,;-") + "."

    return desc


def fix_file(filepath: str) -> tuple:
    """
    Fix a single file if it lacks description.
    Returns (fixed: bool, reason: str).
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    frontmatter, body, _ = extract_frontmatter(content)
    if frontmatter is None:
        return (False, "No frontmatter found")

    if has_description(frontmatter):
        return (False, "Already has description")

    body_words = body.strip()
    if not body_words:
        return (False, "Empty content")

    title = get_title(frontmatter)
    if not title:
        return (False, "No title found")

    first_para = get_first_paragraph(body)
    if not first_para or len(first_para.strip()) < 10:
        body_clean = re.sub(r"<[^>]+>\s*", "", body)
        body_clean = re.sub(r"import .*?;", "", body_clean)
        lines = [l.strip() for l in body_clean.split("\n") if l.strip() and not l.strip().startswith("#") and not l.strip().startswith("<")]
        if lines:
            first_para = " ".join(lines[:3])
    if not first_para or len(first_para.strip()) < 10:
        return (False, "No content paragraph found")

    desc = generate_description(title, first_para)

    # Insert description after the title line in frontmatter
    title_match = re.search(r"^title:.*$", frontmatter, re.MULTILINE)
    if not title_match:
        return (False, "Cannot find title line for insertion")

    title_end = title_match.end()
    new_frontmatter = frontmatter[:title_end] + f'\ndescription: "{desc}"' + frontmatter[title_end:]

    m = re.match(r"^(---\s*\n).*?(\n---\s*\n)", content, re.DOTALL)
    new_content = m.group(1) + new_frontmatter + m.group(2) + body

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

    return (True, f"Added ({len(desc)} chars)")


def verify_missing(filepath: str) -> bool:
    """Check if file still lacks description."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    frontmatter, _, _ = extract_frontmatter(content)
    if frontmatter is None:
        return True
    return not has_description(frontmatter)


def main():
    start_time = time.time()

    blog_dir = BLOG_DIR
    if not os.path.isdir(blog_dir):
        print(f"ERROR: Blog directory not found: {blog_dir}")
        return

    files = sorted(os.listdir(blog_dir))
    md_files = [f for f in files if f.endswith(".md") or f.endswith(".mdx")]

    print(f"Found {len(md_files)} blog files")
    print("=" * 60)

    fixed = 0
    skipped = 0
    skipped_reasons = {}
    fixed_files_info = []

    for filename in md_files:
        filepath = os.path.join(blog_dir, filename)
        success, reason = fix_file(filepath)
        if success:
            fixed += 1
            fixed_files_info.append(filename)
            print(f"  + {filename}: {reason}")
        else:
            skipped += 1
            skipped_reasons[reason] = skipped_reasons.get(reason, 0) + 1
            if "Already" not in reason:
                print(f"  - {filename}: {reason}")

    # Verify
    remaining = 0
    for filename in md_files:
        filepath = os.path.join(blog_dir, filename)
        if verify_missing(filepath):
            remaining += 1

    elapsed = time.time() - start_time

    # Print all fixed descriptions for quality check
    print("\n" + "=" * 60)
    print("FIXED DESCRIPTIONS:")
    for filename in sorted(fixed_files_info):
        filepath = os.path.join(blog_dir, filename)
        with open(filepath, "r", encoding="utf-8") as fh:
            content = fh.read()
        frontmatter, _, _ = extract_frontmatter(content)
        if frontmatter:
            dm = re.search(r'^description:\s*"(.+)"', frontmatter, re.MULTILINE)
            if dm:
                d = dm.group(1)
                print(f"  [{len(d):3d}c] {filename}: {d}")

    # Summary
    print("\n" + "=" * 60)
    print(f"SUMMARY")
    print(f"  Total files:     {len(md_files)}")
    print(f"  Fixed:           {fixed}")
    print(f"  Skipped:         {skipped}")
    print(f"  Already had:     {skipped_reasons.get('Already has description', 0)}")
    print(f"  Still missing:   {remaining}")
    print(f"  Time taken:      {elapsed:.2f}s")

    # Write report
    report_path = os.path.join(os.path.dirname(__file__), "SEO_DESC_FIX_REPORT.md")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(f"# SEO Meta Description Fix Report\n\n")
        f.write(f"**Generated:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"**Script:** `fix-meta-descriptions.py`\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"| Metric | Value |\n")
        f.write(f"|--------|-------|\n")
        f.write(f"| Total blog files | {len(md_files)} |\n")
        f.write(f"| Files fixed | {fixed} |\n")
        f.write(f"| Already had description (untouched) | {skipped_reasons.get('Already has description', 0)} |\n")
        f.write(f"| Skipped (no content/title/frontmatter) | {skipped - skipped_reasons.get('Already has description', 0)} |\n")
        f.write(f"| Still missing description after run | {remaining} |\n")
        f.write(f"| Total time | {elapsed:.2f}s |\n\n")

        f.write(f"## Files Fixed\n\n")
        f.write("| # | File | Length | Description |\n")
        f.write("|---|------|--------|-------------|\n")
        for i, filename in enumerate(sorted(fixed_files_info), 1):
            filepath = os.path.join(blog_dir, filename)
            with open(filepath, "r", encoding="utf-8") as fh:
                content = fh.read()
            frontmatter, _, _ = extract_frontmatter(content)
            if frontmatter:
                dm = re.search(r'^description:\s*"(.+)"', frontmatter, re.MULTILINE)
                if dm:
                    d = dm.group(1)
                    f.write(f"| {i} | {filename} | {len(d)} | {d} |\n")

        f.write(f"\n## Files Skipped (untouched)\n\n")
        for reason, count in sorted(skipped_reasons.items()):
            f.write(f"- {reason}: {count}\n")

    print(f"\nReport written to SEO_DESC_FIX_REPORT.md")


if __name__ == "__main__":
    main()
