# Social Beast Launch Checklist

## Pre-Launch (Blocked on Credentials)
- [ ] Fill `credentials.json` with real values:
  - **Telegram:** Get bot token from @BotFather on Telegram
  - **Twitter/X:** Create app at developer.twitter.com, generate OAuth 1.0a keys
  - **LinkedIn:** Create app at linkedin.com/developers, get OAuth token
- [ ] Test `run-pipeline-mock.sh` (no creds needed) — should generate content successfully
- [ ] Verify all 5 test suites pass: `cd test && node test-pipeline.js`

## Launch
- [ ] Set cron job: `0 7 * * * /home/captain/.openclaw/workspace/skills/social-beast/daily-pipeline.sh`
- [ ] Commit to git: `cd /home/captain/.openclaw/workspace && git add skills/social-beast/ && git commit -m "Social Beast Phase 1 MVP"`
- [ ] Run first live pipeline: `cd skills/social-beast && bash daily-pipeline.sh`

## Post-Launch
- [ ] Monitor first 3 runs for errors
- [ ] Set up Telegram approval flow (requires real botToken)
- [ ] Check content is being published correctly on all 3 platforms
