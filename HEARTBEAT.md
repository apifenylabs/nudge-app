# HEARTBEAT.md - Scheduled Tasks

## Overnight Priority — Directory Beast expansion

Chris is asleep (bedtime ~01:19 HK). Keep working until at least 09:00 HK.

**Active subagents** (spawned 01:19 HK, expected runtime ~15-20 min each):
- batch-india-maldives-beyond.json (+15)
- batch-china-deep-malaysia-taiwan.json (+15)
- batch-thailand-deep-philippines-extra.json (+15)

**When ALL 3 batch files exist in `family-travel-directory/public/data/`:**
1. Run the Python merge script to combine into `destinations.json` (fix photo dupes → max 3 reuse, no same-city reuse)
2. `npm run build` — verify pass
3. `git add -A && git commit -m "Scale to N destinations" && git push origin master`
4. Trigger Vercel deployment via API
5. Verify count >=120. If yes, spawn 3 more agents:

**Agent 8 — South Asia:** Guwahati, Shillong, Darjeeling, Sikkim, Nepal (Kathmandu), Bhutan (Paro), Bangladesh (Dhaka) — 15 destinations
**Agent 9 — Australia/NZ:** Sydney, Melbourne, Gold Coast, Auckland, Queenstown — 15 destinations
**Agent 10 — Middle East:** Dubai, Abu Dhabi, Doha, Muscat — 15 destinations

Total target: 180+ destinations by morning.

**After deployment:** Check site loads, sitemap has all entries.
**Token budget:** DeepSeek-chat only. Keep under $0.50 total overnight.
**Compact memory** if context gets heavy.
**Send morning report** at ~09:00 HK with final count and deploy status.
