#!/bin/bash
# ─── OmniMind/OpenClaw Multi-Workspace Watchdog ───
# Runs every 15 min via cron (tracked in cron-health.md)
#
# Checks:
#   1. Gateway health
#   2. ALL workspace repos (git status, recent activity, uncommitted changes)
#   3. ~/life/ PARA structure (Projects, Areas, Resources freshness)
#   4. Daily notes (existence, staleness)
#   5. Build/health of deployed sites
#   6. Open project reviews ("is work done? blocked? next?")
#   7. If stalled → generates proactive CEO tasks
#
# Logs to: /home/captain/.openclaw/workspace/life/cron-health.md

set +eu  # Don't exit on errors — we want full diagnostics, even on failed cd

# ─── Config ───────────────────────────────────────────────────────
WORKSPACE="/home/captain/.openclaw/workspace"
LIFE_DIR="$WORKSPACE/life"
LOG="$LIFE_DIR/cron-health.md"
WATCHDOG_LOG="$LIFE_DIR/watchdog-log.md"
DAILY_DIR="$LIFE_DIR/daily"
HEARTBEAT_MD="$WORKSPACE/HEARTBEAT.md"
MEMORY_MD="$WORKSPACE/MEMORY.md"

NOW=$(date '+%Y-%m-%d %H:%M:%S HKT')
TODAY=$(date '+%Y-%m-%d')
HOUR=$(date '+%H')
PORTFOLIO_CHECK="${WATCHDOG_CHECK:-all}"  # "all" or specific project

# ANSI codes for log readability
OK="✅"
WARN="⚠️"
ERR="❌"
INFO="📋"
SKIP="⏭️"

# ─── Helper Functions ─────────────────────────────────────────────

log() {
  echo "$1" >> "$LOG"
}

log_header() {
  log ""
  log "---"
  log "## Watchdog Cycle — $NOW"
  log ""
}

_check_gateway() {
  local status
  status=$(openclaw gateway status 2>&1)
  if echo "$status" | grep -q "Runtime: running"; then
    log "$OK **Gateway:** Running"
    return 0
  else
    log "$ERR **Gateway:** DOWN — $(echo "$status" | head -1)"
    log "$INFO Attempting restart..."
    openclaw gateway restart 2>&1 >> "$LOG"
    sleep 3
    if openclaw gateway status 2>&1 | grep -q "Runtime: running"; then
      log "$OK **Gateway:** Restarted successfully"
    else
      log "$ERR **Gateway:** Restart FAILED"
    fi
    return 1
  fi
}

_scan_workspaces() {
  log ""
  log "### 📁 Workspace Scan"
  log ""
  
  local count=0
  local dirty=0
  local stale_projects=""
  local blocked=""
  local updated=""
  local MAX_STALE_SECONDS=$((7 * 24 * 3600))  # 7 days without commit

  # Find all git repos across known locations
  local ALL_GIT_REPOS
  ALL_GIT_REPOS=$(find /home/captain/.openclaw/workspace /home/captain/workspaces -maxdepth 4 -name ".git" -type d 2>/dev/null | sed 's|/\.git$||' | sort -u)
  
  for dir in $ALL_GIT_REPOS; do
    local name
    name=$(basename "$dir")
    
    # Skip hidden/system dirs
    [[ "$name" == .* ]] && continue
    [[ "$name" == "node_modules" ]] && continue
    [[ "$name" == "memory" ]] && continue
    [[ "$name" == "openclaw" ]] && continue
    [[ "$name" == "canvas" ]] && continue
    
    [ ! -d "$dir/.git" ] && continue
    
    ((count++))
    
    # Git status
    cd "$dir" 2>/dev/null || continue
    local branch
    branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
    local has_changes
    has_changes=$(git status --porcelain 2>/dev/null | wc -l)
    local last_commit_ts
    last_commit_ts=$(git log -1 --format=%ct 2>/dev/null || echo "0")
    local now_ts
    now_ts=$(date +%s)
    local age_days=$(( (now_ts - last_commit_ts) / 86400 ))
    local last_msg
    last_msg=$(git log -1 --format=%s 2>/dev/null || echo "none")
    local ahead_behind
    ahead_behind=$(git rev-list --left-right --count HEAD...@{upstream} 2>/dev/null || echo "0 0")
    local ahead
    ahead=$(echo "$ahead_behind" | awk '{print $1}')
    local behind
    behind=$(echo "$ahead_behind" | awk '{print $2}')
    
    if [ "$has_changes" -gt 0 ]; then
      log "$WARN **$name:** $has_changes uncommitted files (branch: $branch, last: \"$last_msg\")"
      ((dirty++))
    elif [ "$age_days" -gt 7 ]; then
      log "$SKIP **$name:** No activity in $age_days days (branch: $branch, \"$last_msg\")"
    else
      log "$OK **$name:** Clean — $branch branch, \"$last_msg\""
    fi
    
    # Ahead/behind tracking
    if [ "${ahead:-0}" -gt 0 ] || [ "${behind:-0}" -gt 0 ]; then
      log "  $INFO Remote: $ahead ahead, $behind behind"
    fi
    
    # Check for blocked markers
    if grep -q "BLOCKED\|BLOCKER" "$dir/HEARTBEAT.md" 2>/dev/null || \
       grep -q "BLOCKED\|BLOCKER" "$dir/README.md" 2>/dev/null; then
      blocked="$blocked $name"
    fi
  done

  log ""
  log "$OK **$count** workspace repos scanned, **$dirty** with uncommitted changes"
  
  echo "$count|$dirty|$blocked"
}

_check_para() {
  log ""
  log "### 📂 PARA Structure — $LIFE_DIR"
  log ""
  
  local issues=0
  
  # Projects
  local proj_count=0
  if [ -d "$LIFE_DIR/Projects" ]; then
    proj_count=$(find "$LIFE_DIR/Projects" -maxdepth 1 -type f -o -type d | wc -l)
    proj_count=$((proj_count - 1))  # remove the dir itself
    log "$OK **Projects:** $proj_count entries"
  else
    log "$ERR **Projects:** Missing!"
    ((issues++))
  fi
  
  # Areas
  if [ -d "$LIFE_DIR/Areas" ]; then
    local area_files
    area_files=$(ls "$LIFE_DIR/Areas/"*.md 2>/dev/null | wc -l)
    log "$OK **Areas:** $area_files files"
    # Check each area file freshness
    for f in "$LIFE_DIR/Areas/"*.md; do
      [ ! -f "$f" ] && continue
      local name
      name=$(basename "$f" .md)
      local mod_time
      mod_time=$(stat -c %Y "$f" 2>/dev/null || echo "0")
      local now_ts
      now_ts=$(date +%s)
      local age_days=$(( (now_ts - mod_time) / 86400 ))
      if [ "$age_days" -gt 30 ]; then
        log "$WARN   **$name:** Last updated $age_days days ago (stale)"
        ((issues++))
      elif [ "$age_days" -gt 14 ]; then
        log "$INFO   **$name:** $age_days days since update"
      fi
    done
  else
    log "$ERR **Areas:** Missing!"
    ((issues++))
  fi
  
  # Resources
  if [ -d "$LIFE_DIR/Resources" ]; then
    local res_count
    res_count=$(ls "$LIFE_DIR/Resources/"*.md 2>/dev/null | wc -l)
    log "$OK **Resources:** $res_count files"
  else
    log "$ERR **Resources:** Missing!"
    ((issues++))
  fi
  
  # Archives
  if [ -d "$LIFE_DIR/Archives" ]; then
    local arch_count
    arch_count=$(ls "$LIFE_DIR/Archives/"*.md 2>/dev/null | wc -l)
    log "$OK **Archives:** $arch_count files"
  else
    log "$WARN **Archives:** Missing (optional)"
  fi
  
  # Daily notes
  if [ -d "$DAILY_DIR" ]; then
    local note_count
    note_count=$(ls "$DAILY_DIR/"*.md 2>/dev/null | wc -l)
    local today_exists="no"
    [ -f "$DAILY_DIR/$TODAY.md" ] && today_exists="yes"
    log "$OK **Daily Notes:** $note_count total, today=$today_exists"
    
    # Check if no daily note in last 3 days
    local recent=0
    for i in 0 1 2; do
      local d
      d=$(date -d "-$i days" '+%Y-%m-%d')
      [ -f "$DAILY_DIR/$d.md" ] && recent=$((recent + 1))
    done
    if [ "$recent" -eq 0 ]; then
      log "$ERR No daily notes in 3 days!"
      ((issues++))
    fi
  else
    log "$ERR **Daily Notes:** Missing!"
    ((issues++))
  fi
  
  # Consolidation log
  if [ -f "$LIFE_DIR/consolidation-log.md" ]; then
    local cons_size
    cons_size=$(wc -c < "$LIFE_DIR/consolidation-log.md")
    local last_entry
    last_entry=$(grep "^## " "$LIFE_DIR/consolidation-log.md" 2>/dev/null | tail -1 | sed 's/## //')
    log "$OK **Consolidation Log:** ${cons_size}b, last: $last_entry"
  else
    log "$WARN **Consolidation Log:** Missing"
    ((issues++))
  fi
  
  # Vision file
  if [ -f "$LIFE_DIR/VISION-2026.md" ]; then
    log "$OK **VISION-2026.md:** Present"
  else
    log "$WARN **VISION-2026.md:** Missing"
  fi
  
  # cron-health.md itself (current file check)
  log "$OK **cron-health.md:** Updating now"
  
  log ""
  if [ "$issues" -gt 0 ]; then
    log "$WARN **$issues** PARA issues found"
  else
    log "$OK All PARA structures healthy"
  fi
  
  return $issues
}

_check_daily_note_quality() {
  local note="$DAILY_DIR/$TODAY.md"
  if [ ! -f "$note" ]; then
    log "$ERR No daily note for today"
    return 1
  fi
  
  local content
  content=$(cat "$note")
  
  # Check for empty sections
  for section in "Highlights" "Decisions" "Blockers"; do
    if echo "$content" | grep -q "^## $section\$" || echo "$content" | grep -q "^## $section \*$"; then
      log "$WARN **$section:** Empty section"
    fi
  done
  
  # Count meaningful entries (bullet points)
  local bullets
  bullets=$(echo "$content" | grep -c "^- " 2>/dev/null || echo 0)
  log "$OK **Daily Note:** $bullets entries"
  
  return 0
}

_check_deployed_sites() {
  log ""
  log "### 🌐 Deployed Sites Health"
  log ""
  
  local SITES=(
    "https://nudge-sigma-liart.vercel.app"
    "https://familytravelasia.com"
    "https://ev-charging-asia.vercel.app"
    "https://luxury-family-travel-asia.vercel.app"
    "https://apifeny-ai.vercel.app"
    "https://seniortravel.vercel.app"
    "https://social-beast-two.vercel.app"
    "https://ai-cofounder.vercel.app"
    "https://agent-hq-alpha.vercel.app"
    # "https://omnimind-service.vercel.app"  # not deployed yet
  )
  
  local ok=0
  local fail=0
  
  for url in "${SITES[@]}"; do
    local code
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$url" 2>/dev/null || echo "timeout")
    local name
    name=$(echo "$url" | sed 's|https://||' | sed 's|\.vercel\.app||')
    if [ "$code" = "200" ] || [ "$code" = "308" ] || [ "$code" = "307" ]; then
      log "$OK **$name:** $code"
      ((ok++))
    else
      log "$ERR **$name:** $code"
      ((fail++))
    fi
  done
  
  log ""
  log "$OK **$ok** sites healthy" 
  [ "$fail" -gt 0 ] && log "$ERR **$fail** sites unhealthy"
  
  echo "$ok/$((ok+fail))"
}

_check_cron_health() {
  log ""
  log "### ⏰ Cron Job Health"
  log ""
  
  local cron_output
  cron_output=$(openclaw cron list 2>/dev/null)
  
  local total
  total=$(echo "$cron_output" | grep -c "^[0-9a-f-]")
  local errors
  errors=$(echo "$cron_output" | grep -c "error")
  local oks
  oks=$(echo "$cron_output" | grep -c "ok")
  local idle
  idle=$(echo "$cron_output" | grep -c "idle")
  
  log "$OK **$total** cron jobs ($oks ok, $idle idle, $errors error)"
  
  if [ "$errors" -gt 0 ]; then
    log "$ERR Failing cron jobs:"
    echo "$cron_output" | grep "error" | while read -r line; do
      log "  $ERR $line"
    done
  fi
  
  echo "$total|$errors|$oks"
}

_check_projects_blockers() {
  log ""
  log "### 🚧 Project Reviews (from MEMORY.md + HEARTBEAT.md)"
  log ""
  
  # Read blocker info from MEMORY.md
  if [ -f "$MEMORY_MD" ]; then
    log "$OK MEMORY.md present"
    # Extract what's blocked
    local blocked_count
    blocked_count=$(grep -c "BLOCKED\|BLOCKER" "$MEMORY_MD" 2>/dev/null || echo 0)
    if [ "$blocked_count" -gt 0 ]; then
      log "$WARN **$blocked_count** blockers mentioned in MEMORY.md"
      grep -n "BLOCKED\|BLOCKER" "$MEMORY_MD" 2>/dev/null | head -10 | while read -r line; do
        log "  📌 $line"
      done
    fi
  fi
  
  # Check HEARTBEAT.md blockers
  if [ -f "$HEARTBEAT_MD" ]; then
    local hb_blockers
    hb_blockers=$(grep -A 20 "BLOCKERS" "$HEARTBEAT_MD" 2>/dev/null | grep "^- " | head -10 || echo "")
    if [ -n "$hb_blockers" ]; then
      log "$WARN **HEARTBEAT.md** lists blockers:"
      echo "$hb_blockers" | while read -r line; do
        log "  🚫 $line"
      done
    fi
  fi
  
  # Key project status — check all git repos for stalled detection
  local ALL_GIT_REPOS
  ALL_GIT_REPOS=$(find /home/captain -maxdepth 4 -name ".git" -type d 2>/dev/null | sed 's|/\.git$||' | sort -u)
  
  for proj_dir in $ALL_GIT_REPOS; do
    local proj
    proj=$(basename "$proj_dir")
    
    # Skip the workspace root itself
    [ "$proj_dir" = "$WORKSPACE" ] && continue
    [ "$proj" = "openclaw" ] && continue
    [ "$proj" = "canvas" ] && continue
    
    if [ ! -d "$proj_dir/.git" ]; then
      continue
    fi
    
    cd "$proj_dir" 2>/dev/null || continue
    local last_commit
    last_commit=$(git log -1 --format="%s (%ar)" 2>/dev/null || echo "none")
    local days_since
    days_since=$(git log -1 --format=%ct 2>/dev/null)
    local now_ts
    now_ts=$(date +%s)
    local age_hours=$(( (now_ts - days_since) / 3600 ))
    
    # Check if project is officially archived or deferred
    local arch_path="/home/captain/.openclaw/workspace/life/Archives/stalled-projects/$proj.md"
    local is_archived=false
    local is_deferred=false
    if [ -f "$arch_path" ]; then
      if grep -q "ARCHIVED" "$arch_path" 2>/dev/null; then
        is_archived=true
      elif grep -q "KEPT" "$arch_path" 2>/dev/null; then
        is_deferred=true
      fi
    fi
    
    if [ "$is_archived" = true ]; then
      log "$SKIP **$proj:** ARCHIVED — $age_hours hours stale (see ~/life/Archives/stalled-projects/)"
    elif [ "$age_hours" -gt 72 ] && [ "$is_deferred" = false ]; then
      log "$ERR **$proj:** STALLED — $age_hours hours since last commit: \"$last_commit\""
    elif [ "$age_hours" -gt 72 ] && [ "$is_deferred" = true ]; then
      log "$SKIP **$proj:** Deferred — $age_hours hours idle (core product, kept per Chris directive)"
    elif [ "$age_hours" -gt 24 ]; then
      log "$WARN **$proj:** Low activity — $age_hours hours: \"$last_commit\""
    else
      log "$OK **$proj:** Active — \"$last_commit\""
    fi
  done
}

_generate_ceo_tasks() {
  log ""
  log "### 🧠 CEO Task Generation"
  log ""
  
  local tasks=0
  
  # Task 1: Check if any site is down
  local site_check_log
  site_check_log=$(grep -A 20 "Deployed Sites Health" "$LOG" 2>/dev/null | grep "ERR" | head -5)
  if [ -n "$site_check_log" ]; then
    log "$ERR **TASK:** Fix down sites detected this cycle"
    log "  $INFO Priority: P0 — sites returning non-200"
    ((tasks++))
  fi
  
  # Task 2: Stalled projects (only genuinely stalled, not archived)
  local stalled
  stalled=$(grep "STALLED" "$LOG" 2>/dev/null | head -5)
  if [ -n "$stalled" ]; then
    # Filter out archived/deferred projects
    local real_stalled=""
    while read -r line; do
      local proj_name
      proj_name=$(echo "$line" | sed 's/.*\*\*\(.[^:*]*\)[:**].*/\1/')
      local arch="/home/captain/.openclaw/workspace/life/Archives/stalled-projects/$proj_name.md"
      if [ ! -f "$arch" ]; then
        real_stalled="$real_stalled$proj_name "
      fi
    done <<< "$stalled"
    if [ -n "$real_stalled" ]; then
      log "$WARN **TASK:** Re-engage stalled projects: $real_stalled"
      echo "$real_stalled" | while read -r proj; do
        [ -n "$proj" ] && log "  $INFO Suggested: Investigate $proj — commit pending work or unpause"
      done
      ((tasks++))
    fi
  fi
  
  # Task 3: PARA issues
  local para_issues
  para_issues=$(grep "PARA issues found" "$LOG" 2>/dev/null | grep -oP '\d+(?= PARA)')
  if [ -n "$para_issues" ] && [ "$para_issues" -gt 0 ]; then
    log "$WARN **TASK:** $para_issues PARA issues to resolve"
    ((tasks++))
  fi
  
  # Task 4: Empty daily note sections
  local empty_sections
  empty_sections=$(grep "Empty section" "$LOG" 2>/dev/null | head -5)
  if [ -n "$empty_sections" ]; then
    log "$WARN **TASK:** Daily note has empty sections — needs logging"
    ((tasks++))
  fi
  
  # Task 5: Cron failures
  local cron_fails
  cron_fails=$(grep "Failing cron" "$LOG" 2>/dev/null | head -3)
  if [ -n "$cron_fails" ]; then
    log "$ERR **TASK:** Fix failing cron jobs"
    ((tasks++))
  fi
  
  # Task 6: Uncommitted changes
  local dirty
  dirty=$(grep "uncommitted" "$LOG" 2>/dev/null | head -5)
  if [ -n "$dirty" ]; then
    log "$WARN **TASK:** Uncommitted workspaces — commit and push"
    ((tasks++))
  fi
  
  if [ "$tasks" -eq 0 ]; then
    log "$OK All clear — no CEO tasks generated"
  else
    log ""
    log "$INFO **$tasks** CEO tasks generated for next heartbeat"
  fi
  
  # Write a structured task output for easy processing
  cat > /tmp/omnimind-ceo-tasks.json 2>/dev/null << TASKS_EOF
{
  "cycle": "$NOW",
  "tasks": $tasks,
  "sites_healthy": "$SITE_HEALTH",
  "workspace_count": "$WS_COUNT",
  "dirty_count": "$WS_DIRTY",
  "stalled_found": $([ -n "$(grep STALLED "$LOG" 2>/dev/null)" ] && echo "true" || echo "false"),
  "cron_errors": "$CRON_ERRORS"
}
TASKS_EOF
  
  return $tasks
}

_update_heartbeat() {
  # Refresh HEARTBEAT.md with watchdog status summary
  local ws_total
  ws_total=$(grep "workspace repos scanned" "$LOG" 2>/dev/null | grep -oP '\d+(?= workspace)' | tail -1)
  local ws_dirty
  ws_dirty=$(grep "workspace repos scanned" "$LOG" 2>/dev/null | grep -oP '\d+(?= with uncommitted)' | tail -1)
  local sites_ok
  sites_ok=$(grep "sites healthy" "$LOG" 2>/dev/null | grep -oP '\d+(?= sites healthy)' | tail -1)
  local ceo_tasks
  ceo_tasks=$(grep "CEO tasks" /tmp/omnimind-ceo-tasks.json 2>/dev/null | grep -oP '\d+' | tail -1)
  
  # Append a brief summary to the bottom of HEARTBEAT.md 
  echo "" >> "$HEARTBEAT_MD"
  echo "---" >> "$HEARTBEAT_MD"
  echo "_Watchdog $NOW — ${ws_total:-0} workspaces, ${sites_ok:-0}/${SITE_TOTAL:-10} sites, ${ceo_tasks:-0} CEO tasks_" >> "$HEARTBEAT_MD"
}

# ─── Main ─────────────────────────────────────────────────────────

# Ensure log file exists
mkdir -p "$LIFE_DIR"
touch "$LOG"

# Deduplicate: remove old entries if log exceeds 500 lines
if [ "$(wc -l < "$LOG")" -gt 500 ]; then
  tail -250 "$LOG" > /tmp/cron-health-clean.md
  mv /tmp/cron-health-clean.md "$LOG"
fi

log_header

# 1. Gateway
_check_gateway

# 2. Workspace scan
WS_RESULT=$(_scan_workspaces)
WS_COUNT=$(echo "$WS_RESULT" | cut -d'|' -f1)
WS_DIRTY=$(echo "$WS_RESULT" | cut -d'|' -f2)
WS_BLOCKED=$(echo "$WS_RESULT" | cut -d'|' -f3-)

# 3. PARA structure
_check_para
PARA_EXIT=$?

# 4. Daily note quality
_check_daily_note_quality

# 5. Deployed sites
SITE_HEALTH=$(_check_deployed_sites)

# 6. Cron health
CRON_RESULT=$(_check_cron_health)
CRON_TOTAL=$(echo "$CRON_RESULT" | cut -d'|' -f1)
CRON_ERRORS=$(echo "$CRON_RESULT" | cut -d'|' -f2)
CRON_OK=$(echo "$CRON_RESULT" | cut -d'|' -f3)

# 7. Project status / blockers
_check_projects_blockers

# 8. CEO reverse-prompt task generation
_generate_ceo_tasks

# Summary footer
log ""
log "---"
log ""
log "**Watchdog Summary:**"
log "- Workspaces: $WS_COUNT ($WS_DIRTY dirty)"
log "- Sites: $SITE_HEALTH"
log "- PARA issues: $PARA_EXIT"
log "- Cron: $CRON_TOTAL total, $CRON_ERRORS errors"
log "- Gateways: $(openclaw gateway status 2>&1 | grep -c 'Runtime: running' || echo '0')/1"
log ""

# Write to watchog-log.md as well (structured format)
{
  echo "## $NOW"
  echo "| Metric | Value |"
  echo "|--------|-------|"
  echo "| Workspaces | $WS_COUNT |"
  echo "| Dirty | $WS_DIRTY |"
  echo "| Sites Healthy | $SITE_HEALTH |"
  echo "| PARA Issues | $PARA_EXIT |"
  echo "| Cron Jobs | $CRON_TOTAL ($CRON_ERRORS errors) |"
  echo "| CEO Tasks | $(grep '"tasks":' /tmp/omnimind-ceo-tasks.json 2>/dev/null | grep -oP '\d+' || echo 0) |"
  echo "---"
} >> "$WATCHDOG_LOG"

# Keep watchog log to last 100 entries
if [ "$(wc -l < "$WATCHDOG_LOG")" -gt 300 ]; then
  tail -150 "$WATCHDOG_LOG" > /tmp/watchdog-trim.md
  mv /tmp/watchdog-trim.md "$WATCHDOG_LOG"
fi

# Auto-trim cron-health.md
if [ "$(wc -l < "$LOG")" -gt 600 ]; then
  tail -300 "$LOG" > /tmp/ch-trim.md
  mv /tmp/ch-trim.md "$LOG"
fi

# Update HEARTBEAT.md with summary
_update_heartbeat

echo "Watchdog complete — $NOW"
exit 0
