# Skill: daily-pipeline

**Goal:** Main orchestrator: source → transform → approval → publish, run daily at 09:00 HKT.

**Input:**
- `config` (object): Pipeline configuration
  - `date` (string): Date string (YYYY-MM-DD)
  - `sources` (object[]): Source configurations
    - `type` (string): 'directory-beast' or 'build-in-public'
    - `config` (object): Source-specific config
  - `publishPlatforms` (string[]): Platforms to publish to
  - `credentials` (object): Platform API credentials
  - `maxItems` (number, optional): Max items per source. Default: 5

**Steps:**
1. **Source** (07:00 HKT): Run all configured source skills:
   - source-directory-beast: Pull destinations
   - source-build-in-public: Generate milestone post
2. **Transform** (07:30 HKT): Run all 8 transform skills per source item:
   - short-hook, story-thread, telegram-deep-dive, linkedin-insight
   - carousel-card, tiktok-script, build-in-public, newsletter-blurb
3. **Approval** (08:00 HKT): Create approval queue, send to Telegram
4. **Collect** (08:30 HKT): Gather approval responses
5. **Publish** (09:00 HKT): Run publish skills for approved items
6. **Log**: Write results to workspace/social-beast-logs/
7. **Archive**: Move approvals to archive

**Output:**
- `summary` (object): Pipeline run summary
  - `itemsProcessed` (number)
  - `itemsApproved` (number)
  - `itemsPublished` (number)
  - `errors` (string[])

**Dependencies:**
- source-directory-beast.skill.md
- source-build-in-public.skill.md
- transform-short-hook.skill.md
- transform-story-thread.skill.md
- transform-telegram-deep-dive.skill.md
- transform-linkedin-insight.skill.md
- transform-carousel-card.skill.md
- transform-tiktok-script.skill.md
- transform-build-in-public.skill.md
- transform-newsletter-blurb.skill.md
- publish-twitter.skill.md
- publish-telegram.skill.md
- publish-linkedin.skill.md
- approval-telegram.skill.md
- schemas.md
