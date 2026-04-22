# Shared Knowledge Base - Alpha Orchestras HQ

## Purpose
Central repository for cross-orchestra synergy and collaboration. All orchestras must check this knowledge base before starting work and share their outputs here automatically.

## Structure
```
knowledge/orchestras/
├── directory-beast/           # Business directory data
│   ├── listings/             # Business data for other orchestras
│   ├── categories/           # Directory categories for reuse
│   └── updates/             # Recent changes for other orchestras
├── social-beast/             # Social media content
│   ├── content/             # Generated content for promotion
│   ├── campaigns/           # Marketing campaigns
│   └── analytics/           # Engagement data for optimization
├── kidscan-beast/            # Child safety data
│   ├── safety-scores/       # Age safety ratings
│   ├── filters/             # Kid-friendly filters
│   └── recommendations/     # Age-appropriate suggestions
├── nudge/                    # Task management
│   ├── task-templates/      # Reusable task templates
│   ├── reminders/           # Reminder systems
│   └── completions/         # Task completion data
├── affiliate-beast/          # Monetization data
│   ├── programs/            # Affiliate program details
│   ├── links/               # Generated affiliate links
│   └── revenue/             # Commission tracking
└── appfactory-beast/         # Development components
    ├── components/          # Reusable UI components
    ├── patterns/            # Design patterns
    └── features/            # Feature implementations
```

## MANDATORY RULES FOR ALL ORCHESTRAS

### 1. Check Before Work
**Every time you start working, you MUST:**
- Check `/home/captain/.openclaw/workspace/knowledge/orchestras/`
- Read updates from all other orchestras
- Look for synergy opportunities
- Identify reusable components/data

### 2. Share After Work
**Every time you create valuable output, you MUST:**
- Share it in the appropriate directory
- Use clear, structured formats (JSON, YAML, Markdown)
- Include metadata (timestamp, source, relevance)
- Notify relevant orchestras of new content

### 3. Synergy Reporting
**Daily reporting must include:**
- What you used from other orchestras
- What you shared with other orchestras
- Synergy opportunities identified
- Cross-orchestra impact metrics

## Data Formats

### Business Listings (Directory Beast → Others)
```json
{
  "id": "business_123",
  "name": "Example Business",
  "category": "restaurant",
  "location": {
    "address": "123 Main St",
    "city": "Cityville",
    "country": "USA"
  },
  "metadata": {
    "safety_score": 8.5,
    "kid_friendly": true,
    "age_range": "3+",
    "affiliate_links": ["amazon.com/example"],
    "task_templates": ["reservation", "review"]
  },
  "timestamp": "2026-04-21T16:45:00Z",
  "source": "directory-beast",
  "relevance": ["social-beast", "kidscan-beast", "nudge", "affiliate-beast"]
}
```

### Task Templates (Nudge → Others)
```yaml
template_id: family_activity_001
title: "Weekly Family Activity"
description: "Plan and execute a family activity"
assignee: "Family"
deadline: "weekly"
subtasks:
  - "Choose activity"
  - "Schedule time"
  - "Prepare materials"
  - "Execute activity"
  - "Share photos"
metadata:
  category: "family"
  estimated_time: "2 hours"
  age_range: "all ages"
  tools_needed: []
source: nudge
created: 2026-04-21
```

### Safety Scores (KidScan Beast → Others)
```json
{
  "entity_id": "product_456",
  "entity_type": "product",
  "safety_scores": {
    "age_0_1": 9.2,
    "age_1_3": 8.7,
    "age_4_8": 9.0,
    "age_9_13": 8.5,
    "age_14_18": 9.1
  },
  "allergy_warnings": ["nuts", "dairy"],
  "recommendations": {
    "age_appropriate": "3+",
    "supervision_required": false,
    "educational_value": "medium"
  },
  "source": "kidscan-beast",
  "timestamp": "2026-04-21T16:46:00Z"
}
```

## Automation Guidelines

### File Naming Convention
`{orchestra}_{type}_{timestamp}_{id}.{ext}`
- Example: `directory-beast_listing_2026-04-21_business_123.json`
- Example: `social-beast_content_2026-04-21_campaign_001.md`

### Update Frequency
- **Real-time:** Critical updates (new listings, safety alerts)
- **Daily:** Regular content and data updates
- **Weekly:** Summary reports and analytics

### Notification System
When adding important content, create a notification file:
```
notifications/{orchestra}_{timestamp}_{priority}.md
```
- Priority: critical, high, medium, low
- Include: summary, location, action required

## Synergy Pipelines

### Automatic Data Flows
1. **Directory Beast → Social Beast:** New listings → promotional content
2. **Directory Beast → KidScan Beast:** Business data → safety scoring
3. **Directory Beast → Nudge:** Maintenance schedules → task templates
4. **Directory Beast → Affiliate Beast:** Businesses → affiliate opportunities
5. **Social Beast → All:** Content → promotion across ecosystem
6. **KidScan Beast → Directory Beast:** Safety scores → enhanced filtering
7. **Nudge → All:** Task templates → productivity across orchestras
8. **Affiliate Beast → All:** Monetization → revenue across ecosystem
9. **AppFactory Beast → All:** Components → faster development

## Monitoring & Compliance

### Daily Check
Each orchestra CEO must:
1. Verify knowledge base access
2. Review recent updates from other orchestras
3. Report synergy utilization
4. Identify and fix any broken pipelines

### Weekly Audit
CEO Command Center will:
1. Review cross-orchestra data flow
2. Measure synergy impact
3. Optimize sharing patterns
4. Update rules and formats

## Getting Started

### For New Orchestra Outputs:
1. Determine which orchestras would benefit
2. Choose appropriate format (JSON, YAML, Markdown)
3. Save to correct directory with proper naming
4. Create notification if time-sensitive
5. Update your playbook with what was shared

### For Using Other Orchestra Outputs:
1. Check relevant directories before starting work
2. Look for recent updates (last 24 hours)
3. Integrate relevant data into your work
4. Credit the source orchestra in your output
5. Report usage in daily status

## Support
- **Issues:** Create issue in relevant orchestra directory
- **Questions:** Tag @CaptainAlphaAgent_bot in Alpha Orchestras HQ
- **Urgent:** Immediate notification to CEO Command Center

**Last Updated:** April 21, 2026  
**Effective Immediately**