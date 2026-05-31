# Apifeny Distribution Research: Alex Prompter & God of Prompts Reverse-Engineering

**Date:** 2026-05-31
**Purpose:** Feed into Apifeny AI content engine build
**Method:** Web scrape + X search snippets + ThreadReader + product pages

---

## 1. PROFILE SUMMARY

### Alex Prompter (@alex_prompter)
- **Role:** Co-founder of God of Prompt
- **Handle:** @alex_prompter
- **Bio:** "Marketing + AI = $$$ @godofprompt (co-founder)"
- **Followers:** ~95,787 (as of May 2026)
- **Verified:** Yes
- **Content focus:** "Steal my [model] prompt to..." pattern — daily free prompt threads
- **Real name (LinkedIn):** Oleksandr Veremeyenko (Founder @ God of Prompt, background in filmmaking + marketing)

### God of Prompt (@godofprompt)
- **Handle:** @godofprompt
- **Followers:** ~1.2M (as of May 2026)
- **Bio:** "Human + AI = Superpowers | Sharing AI Prompts, Systems, Tips & Tricks"
- **Status:** Compromised/stolen April 2026 — Alex lost control. New content moved to @alex_prompter
- **Instagram:** 340K followers, 543 posts, @godofprompt
- **LinkedIn Company Page:** 7,620 followers
- **Website:** godofprompt.ai — 30,000+ prompts library
- **Revenue model:** $150 lifetime bundle (Complete AI Bundle)
- **Reported customers:** 20,000+ (website claim), 100,000+ users claimed

---

## 2. POSTING FORMAT BREAKDOWN

### Alex Prompter's "Steal my" Thread Format

**Exact structure of every prompt thread:**

```
[Tweet 1 - Hook + Card Image]
Steal my [MODEL NAME] prompt to [OUTCOME/BENEFIT]

[One-line problem statement or contrarian take]

[One-line value proposition]

Full prompt 👇

---IMAGE: branded prompt card (screenshot of the prompt text in a styled card, image URL from pbs.twimg.com)---
```

**Then the thread continues with the actual prompt in text form:**

```
----------------------------
[PROMPT TITLE - ALL CAPS]
----------------------------

CONTEXT:
[Paragraph setting the scene]

ROLE:
[Role description - "Act as a..."]

INSTRUCTIONS:
[Step-by-step numbered process]

[Then 5-7 sections with PHASE/STEP/ANALYSIS headers]

OUTPUT FORMAT:
[Specific output structure]

RULES:
[3-5 bullet points of constraints]
```

**Key observations from sampled posts:**

| Element | Pattern |
|---|---|
| Opening hook | "Steal my [MODEL] prompt to..." |
| Problem setup | 1-2 sentences framing a pain point |
| Value claim | 1 sentence of benefit |
| Visual | Always opens with single image card showing prompt text |
| Thread length | Usually 4-10 tweets, 3-6 min read |
| Card image | Screenshot of prompt in styled card format (black/dark background, colored section headers) |
| Prompt structure | CONTEXT → ROLE → INSTRUCTIONS → numbered phases → OUTPUT FORMAT → RULES |
| Closing | CTA embedded in the image + "Full prompt 👇" text |

**Actual examples found:**

1. "Steal my o3 prompt to learn 100+ prompt engineering techniques" — interactive course format
2. "Steal my Claude prompt to turn it into a full travel research analyst" — 5 analysis phases, serious roleplay
3. "Steal my rude prompt like it's straight out of Mad Men to generate copy"
4. "Steal my Claude prompt to generate viral LinkedIn posts in seconds" — 5 strategic phases
5. "Steal my Gemini prompt to analyze and convert an image into a detailed JSON prompt"
6. "Steal my OpenClaw system prompt to turn it into an actual productive assistant" — guardrails focus
7. "Steal my prompt that kills rose-colored glasses before you make a life decision" — Reality Checker
8. "Steal my ChatGPT Images 2.0 prompt to generate a full week of branded Instagram content in one shot"
9. "Steal this mega prompt before I delete it" — Alex Hormozi/Gary Vee clone prompt
10. "Steal my prompt to... " — travel research (detailed full prompt in ThreadReader)

**Tweet length for the opening post:**
- Hook tweet: ~40-60 characters for the "Steal my..." line
- Total first tweet: Typically 100-200 characters
- Each follow-up tweet in thread: Varies, but structured as self-contained prompt sections
- **Entire thread: 4-10 tweets, 3-11 min read time**

### God of Prompt's Daily Posting Format

**Two distinct post types:**

#### Type A: "🚨 BREAKING" Feature Discovery Threads
```
🚨 BREAKING: [MODEL] has a feature called [COOL NAME].

You can use it to [OUTCOME].

Here are 7 prompts to access it: 👇

[Image card showing prompt template]

1. [Feature Name]
Prompt: "[Full prompt text...]"
```

This was their **dominant format** before account compromise. Prompts are shorter, more template-like (bracket placeholders), and designed to be copy-pasted directly.

**Actual examples:**
- "🚨 BREAKING: ChatGPT has a feature called Story Brand Messaging Engine" — 7 prompts, 9 tweets
- "🚨 BREAKING: Claude has a feature called Decision Intelligence Mode" — 7 prompts, 9 tweets
- "🚨 BREAKING: Gemini has a feature called Director's Prep System" — 7 prompts, 9 tweets
- "🚨 BREAKING: Perplexity has a feature called Vibe Code Market Gap Radar" — 7 prompts, 9 tweets
- "🚨 NEWS FLASH: ChatGPT has a feature called Disruptive Product Discovery Engine" — 7 prompts, 9 tweets
- "Claude is your ultimate writing assistant. Here are 10 prompts that will take your content creation to the next level"

#### Type B: Single-Prompt Value Posts
```
Use this prompt if you [SITUATION].

[Image card]

[Prompt text directly in post or image]
```

Less common but used for single-purpose prompts. The image inline from the X snippet shows engagement metrics.

**Thread length for God of Prompt:** Consistent 9 tweets per thread (almost every day). Very consistent structure.

---

## 3. POSTING FREQUENCY & CADENCE

### Alex Prompter
- **Frequency:** 1-2 "steal my" prompt threads per week (not daily — more curated)
- **Additional posts:** Commentary on AI news, tool reviews, hot takes
- **Total posting:** 2-5 posts per day when active, with 1-2 being prompt threads
- **Thread cadence:** Every 2-3 days a new mega-thread
- **Pattern:** Comments on news → Drops new prompt → Engagement bait (reply with likes)

### God of Prompt (pre-compromise)
- **Frequency:** **Daily** — almost one thread per day
- **Post type:** Nearly always "🚨 BREAKING: [MODEL] has a feature called [NAME]" format
- **Total posting:** 5-10+ posts per day including replies
- **Thread cadence:** Every single day (consistent daily posting)
- **Instagram:** ~543 total posts (over ~2.5 years) → ~3-4 posts per week on IG
- **Consistency:** Posted on weekends too — no gaps

### Engagement Metrics (from search snippets)

| Account | Sample Post | Likes | Reposts | Replies | Views |
|---|---|---|---|---|---|
| @alex_prompter | Claude LinkedIn post | 598 | ~1.2K | 18 | — |
| @alex_prompter | Gemini prompt post | — | — | 27 | — |
| @alex_prompter | LinkedIn sucks post | 91 | — | 26 | — |
| @alex_prompter | o3 prompt course | — | — | ~10 | — |
| @godofprompt | Career prompt post | 25 | 285 | 4K | 563K |
| @godofprompt | Profile snapshot | 132 | 573 | 3.9K | 1.2M |
| @godofprompt | Grok viral prompt | — | — | — | (high, mentioned as "viral") |
| @godofprompt (IG) | Profile: 340K followers | — | — | — | — |

**Estimated engagement rates:**
- Alex Prompter (~95K followers): ~0.5-1.5% engagement rate on prompt posts
- God of Prompt (~1.2M followers): ~0.1-0.5% engagement rate (typical for large accounts)
- **Viral posts** occasionally break 4K+ replies and 1M+ views
- Typical post: 100-600 likes, 200-4K reposts, 10-30 replies

---

## 4. VISUAL CARD DESIGN SPECS

From the Instagram posts and ThreadReader image descriptions, the visual format:

### Alex Prompter's Cards
- **Format:** Plain text screenshot in a styled card
- **Background:** Dark gray/charcoal with colored accent sections
- **Typography:** Monospace font for prompt text, bold headers in accent color
- **Section headers:** Colored (orange/blue/green) ALL-CAPS labels
- **Layout:**
  ```
  [PROMPT TITLE] ← colored header bar or text
  [Divider line "----------------------------"]
  CONTEXT: [paragraph]
  ROLE: [paragraph]
  INSTRUCTIONS: [numbered steps]
  ```
- **Dimensions:** Appears to be 1080x1080 or 1200x900 (standard X card ratios)
- **Source:** Created in Canva or similar template tool — not custom design, not AI-generated images
- **Format saved as:** PNG attached to first tweet of thread

### God of Prompt's Cards
- **Format:** Dark background with white text, cleaner template design
- **Background:** Dark (often black or very dark gray)
- **Typography:** Larger, cleaner sans-serif — more readable at a glance
- **Layout (from Instagram description):** "graphic of poster, crossword puzzle, magazine and text"
- **Framework:** Consistent branded template — seems to use a standard Canva or similar template
- **Instagram version:** Carousel/post format with ">> Swipe" CTA

### Design Rules (Reconstructed)
1. **Dark background** — always. Never light/white cards
2. **High contrast text** — white or light gray on dark
3. **Accent color** for section titles — orange, blue, or green
4. **Monospace or clean sans-serif** for prompt code
5. **Consistent divider** pattern: `-----` or `----------------------------`
6. **All-caps section headers** throughout prompt text
7. **No logos, no watermarks, no clutter** — just the prompt
8. **Card image is always the first tweet** in a thread

---

## 5. PROMPT TEXT STRUCTURE (Dissected)

### What makes their prompts work:

**For Alex Prompter (narrative, long-form, roleplay-style):**
```
[TITLE - aggressive, outcome-focused]
[CONTEXT - 2-3 paragraphs setting up the "why"]
[ROLE - detailed persona: "Act as a senior X who has Y years of experience"]
[INSTRUCTIONS - step-by-step, numbered]
[PHASE 1-5 or ANALYSIS 1-5 - each with sub-bullets]
[OUTPUT FORMAT - explicit structure]
[RULES - 3-5 constraints: "Never guess at...", "Be specific..."]
```

**For God of Prompt (short, template-based, bracket-filled):**
```
🚨 BREAKING: [MODEL] has [FEATURE NAME].

Prompt [NUMBER]: [TITLE]

"Act as a [ROLE].

Your task: [TASK].

My context: [DESCRIBE YOUR CONTEXT]

For each result, include: [FORMAT]

Rules:
- [RULE 1]
- [RULE 2]"
```

**Key difference:**
- Alex Prompter gives you a **complete, long, production-grade prompt** that reads like a system instruction
- God of Prompt gives you **a template with [BRACKETS]** that you fill in — shorter, more accessible, less intimidating

### Why this makes them viral:

1. **"Steal my" frames it as a secret** — zero barrier. You don't need permission
2. **Contrarian hook** — "Every [common belief] thread is lying to you"
3. **Specific outcome** — not vague, always "generate viral LinkedIn posts" or "find hidden costs"
4. **Role lock-in** — "Act as a senior operations analyst" gives instant credibility to the output
5. **Zero setup** — Copy, paste, run. Immediate value
6. **Thread format** — Forces engagement (each tweet is a self-contained read)
7. **Image card** — Creates shareable visual asset that gets reposted off-platform

---

## 6. MONETIZATION FUNNEL (Reconstructed)

```
X/Twitter (FREE)
  │
  ├── Daily prompt thread → engaged followers
  │   └── Image card gets reposted → virality
  │
  └── Drop "Steal my" prompt → curiosity → follow
      │
      ▼
Email List / Newsletter
  │
  ├── "Free Ultimate Guide to Prompt Engineering" lead magnet
  │   ├── https://godofprompt.ai/prompt-engineering-guide
  │   └── Linked from blog, social, linktr.ee
  │
  └── Weekly email with exclusive prompts
      │
      ▼
Products (Via godofprompt.ai/products)
  │
  ├── Complete AI Bundle: $150 lifetime (normally $299)
  │   ├── 6 paid products in one Notion
  │   ├── Unlimited Prompt Generator
  │   ├── Lifetime updates
  │   ├── Commercial-use license
  │   └── 7-day guarantee
  │
  ├── No-Code Automations Bundle: $120 lifetime
  ├── Custom GPTs Toolkit: $47 lifetime
  ├── ChatGPT Custom Instructions Pack: $27 lifetime
  ├── AI Cheatsheets Collection: $17 lifetime
  ├── 200+ Top AI Tools Directory: $17 lifetime
  │
  └── (Alex Prompter also sells: "Claude Skills" bundle, ~€49)
```

### Funnel Mechanics:
1. **Top:** Free daily prompt thread on X → drives follows
2. **Middle:** Newsletter signup with free guide → builds email list
3. **Bottom:** $150 lifetime bundle → one-time purchase, high LTV

**Key insight:** The prompt threads ARE the ad. Every "Steal my" thread is a freemium sample of the paid library. The free prompt is good enough to be useful, but the paid bundle has "30,000+ prompts across 19 categories."

**Cross-platform distribution:**
- X: Daily threads (main traffic source)
- LinkedIn: Reposts of X content (company page: 7.6K followers)
- Instagram: 340K followers, carousel reposts
- YouTube: Blog integrations
- Blog: SEO traffic to godofprompt.ai (massive keyword coverage)

---

## 7. WHAT MAKES PROMPTS "VIRAL-WORTHY" VS. FORGETTABLE

### Viral-worthy characteristics:

| Factor | Why It Works |
|---|---|
| **"Steal my" framing** | Removes permission barrier. Defuses accusation of "selling." Gives social proof that others are using it |
| **Contrarian hook** | "Every X thread is lying to you" or "Stop doing Y" — triggers curiosity gap |
| **Specific model name** | "Steal my Claude/Gemini/Grok prompt" — rides model hype waves, keyword-optimized for search |
| **Measurable outcome** | "Generate viral LinkedIn posts in seconds" — not "improve your writing" |
| **Thread format** | Each tweet is a dopamine hit. Low commitment to start reading |
| **Image card** | Repostable asset. People share the card without the thread |
| **Roleplay persona** | "Act as a 15-year senior analyst" — people love the fantasy of having an expert on call |
| **Zero setup required** | Copy, paste, run. No "first, install this plugin" |

### Forgettable prompt characteristics:

| Factor | Why It Fails |
|---|---|
| **Generic title** | "How to write better prompts" |
| **No model name** | Unclear which AI to use |
| **Long setup required** | "First connect your API, then install..." |
| **Vague outcome** | "Improve your workflow" |
| **Wall of text** | No visual, no thread break |
| **No role/persona** | Prompt is just "Write me X" |
| **Sharing as text-only** | No image = no repostability |

---

## 8. TOP 3 THINGS WE CAN REPLICATE TODAY

### ✅ #1: "Steal my [Apifeny/Model] prompt to..." Thread Format

**Cost: $0. Time: 30 min.**  
**What to do:**
- Write a prompt thread using the exact Alex Prompter formula
- Opening tweet: "Steal my [model] prompt to [outcome]" with a card image
- Structure: CONTEXT → ROLE → INSTRUCTIONS → numbered phases → OUTPUT FORMAT → RULES
- Post as a 5-8 tweet thread with first tweet being the card image

**Example for Apifeny:**
```
"Steal my ChatGPT prompt to build an AI agent mascot in 10 minutes"
"Steal my Claude prompt to gamify any SaaS onboarding"
"Steal my Grok prompt to research any market gap in Asia"
```

### ✅ #2: Branded Dark-Mode Prompt Card Template

**Cost: $0 (Canva). Time: 1 hour to create 5 templates.**
- Dark background (charcoal #1A1A2E or black #0D0D0D)
- White/light text (#FFFFFF body, accent color headers)
- Consistent divider pattern: `─────` or `▬▬▬`
- Section headers in ALL CAPS with an accent color (Apifeny brand: purple/teal)
- Export at 1200×900px or 1080×1080px for X
- Save as template so any prompt becomes a card in 2 minutes

### ✅ #3: "7 Prompts" Daily Thread Rotation

**Cost: $0. Time: 2-3 hours to batch a week.**
- Use God of Prompt's "🚨 BREAKING" formula but adapted for Apifeny
- Post 1 thread per day with 7 prompts
- Each thread: 9 tweets (the magic number — God of Prompt uses 9 religiously)
- Title: "{BREAKING/REVEALED} Apifeny has [COOL FEATURE] — here are 7 prompts to use it"
- Promise: Copy-paste ready, bracket-filled templates

**Batch 7 days in one sitting:**
- Day 1: ChatGPT prompts for agent building
- Day 2: Claude prompts for monetization
- Day 3: Grok prompts for market research
- Day 4: Gemini prompts for image generation
- Day 5: Midjourney prompts for mascot design
- Day 6: Perplexity prompts for competition analysis
- Day 7: Mega-bundle of "The best 3 from each day"

---

## 9. ADDITIONAL TACTICAL NOTES

### Cross-platform Recycling
- Alex posts on X → reposts screenshot on LinkedIn → carousel on Instagram
- Every thread gets recycled 3 ways
- **Action:** Build one thread, reformat for 3 platforms

### The "BREAKING" Frame
- God of Prompt calls every feature "BREAKING" even if it's existed for months
- Creates urgency without lying (can be "BREAKING to you")
- **Action:** Use "BREAKING" / "NEW" / "REVEALED" in our thread titles

### Optimal Posting Times
- X: 8-10 AM EST / 1-3 PM EST (standard peak hours)
- Alex posts at roughly 6-8 AM PST (8-10 AM EST window)
- Weekend posts also perform (God of Prompt posted daily)

### Image Card Advantage
- Cards get reposted as images across platforms
- People share the card without attribution — this **helps** (virality > credit)
- God of Prompt's cards don't have watermarks (intentional)

---

## 10. RISK & ACCOUNT LANDSCAPE

- **God of Prompt account was stolen in April 2026** — Alex lost admin access
- Alex now operates from @alex_prompter (95K followers, rebuilding)
- The @godofprompt account still has 1.2M followers but under unknown control
- **Reddit OSINT investigation** claims God of Prompt ran growth-bots/follow-unfollow
- Instagram: 340K followers | LinkedIn: 7,620 followers
- Alex sells: "Claude Skills" bundle (~€49) + Linktree partnerships email

### Implications for Apifeny
- We can enter the same niche but avoid the growth-hack risks
- Focus on **genuine utility** + consistent daily posting
- Don't need to match 1.2M — even 10K engaged followers who buy prompts is profitable
- The space has room: Alex's account was compromised, creating a vacuum

---

## SOURCES
- X profile pages (search snippets, May 2026)
- ThreadReader App: user/alex_prompter, user/godofprompt
- godofprompt.ai (homepage, products, blog)
- linktr.ee/alex_prompter
- Instagram @godofprompt (340K followers)
- LinkedIn linkedin.com/company/god-of-prompt (7.6K followers)
- LinkedIn profile: Oleksandr Veremeyenko (founder)
- Reddit r/EdgeUsers OSINT on God of Prompt
- Various X post search results with engagement metrics

---

**END OF RESEARCH. Ready for content engine build.**
