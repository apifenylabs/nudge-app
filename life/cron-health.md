# Cron Health Log
Track persistent cron issues and root causes. Each entry: date, job name, failure count, root cause, fix applied.

## 2026-05-16

### ceo-proactive-improvement (4 consecutive errors)
- **Root cause**: `delivery.channel = "last"` with recipient "@heartbeat" that doesn't resolve. The job generates useful improvement work but can't deliver. Also has no sessionKey binding so messages drop into void.
- **Impact**: ~8h of potential improvement work lost per day
- **Fix applied**: None yet — requires delivery config change to `channel: "telegram", to: "-1003960261214:topic:2"` which needs RULES.yaml/cron job update (not safe for partial change)

### ceo-social-publisher (3 consecutive timeouts)
- **Root cause**: 300s timeout is insufficient for the generate-all-content.js pipeline. Last run consumed all 300s and still timed out.
- **Impact**: 3 cycles of social content not generated/published (18h gap)
- **Fix**: Increase timeout to 600s in cron job config

### proactive-builder (2 consecutive timeouts)
- **Root cause**: 300s timeout across all 6 project scanning + execution. Jobs with 5min stagger run into same timeout.
- **Impact**: High-value independent improvements not happening
- **Fix**: Increase timeout to 600s, or narrow scan scope to 2 projects max

### ceo-site-health-audit (3 consecutive errors)
- **Root cause**: Same delivery issue as proactive-improvement — `delivery.channel = "last"` pointing to unresolvable "@heartbeat" recipient
- **Impact**: Site health checks not completed for 3 days, broken links and 404s not being caught
- **Fix**: Same delivery config fix needed (requires Chris approval for cron job update)
