# HEARTBEAT.md - Scheduled Tasks (Detailed)

Every 30 minutes:
- Check for new tasks from user or CEO
- Execute only low-cost actions
- Compact memory if context > 4k tokens
- Send short status update if any important action was taken

Daily at 20:00 HK time: (In table format if possible)
- Send revenue / progress summary to user
- Include exact token usage and estimated cost
- Include estimated time spent on tasks
- Archive old context
- Prepare next day's priorities

Weekly on Sunday 20:00 HK time:
- Review last week's performance
- Suggest improvements to rules or workflows
