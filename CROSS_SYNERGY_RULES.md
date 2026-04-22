# CROSS-ORCHESTRA SYNERGY RULES
**Effective Immediately: April 21, 2026**

## MANDATORY RULE FOR ALL ORCHESTRAS

**Every orchestra must check the shared knowledge base and other orchestras' progress every time it works. Actively look for synergy opportunities and share useful outputs (content, listings, data, features) with the relevant other orchestras automatically.**

## SPECIFIC SYNERGY PIPELINES

### 1. Directory Beast → Social Beast
- **Automatically feed:** New business listings, location data, category updates
- **Social Beast uses for:** Promotional content, location-based posts, business highlights
- **Frequency:** Real-time as new listings are added
- **Format:** JSON with business details, images, categories

### 2. Directory Beast → KidScan Beast
- **Automatically feed:** Business listings with age-appropriate metadata
- **KidScan Beast uses for:** Safety filtering, age recommendations, kid-friendly ratings
- **Frequency:** Daily sync of new/updated listings
- **Format:** Structured data with safety flags and age ranges

### 3. Directory Beast → Nudge
- **Automatically feed:** Business tasks, appointment reminders, maintenance schedules
- **Nudge uses for:** Task templates, reminder creation, family activity planning
- **Frequency:** Weekly task generation from directory categories
- **Format:** Task templates with due dates and categories

### 4. Directory Beast → Affiliate Beast
- **Automatically feed:** Monetizable businesses, affiliate programs, commission rates
- **Affiliate Beast uses for:** Affiliate link insertion, revenue tracking, partnership outreach
- **Frequency:** Real-time as monetization opportunities identified
- **Format:** Affiliate program details with commission structures

### 5. Social Beast → All Orchestras
- **Automatically create:** Promotional content, social posts, engagement campaigns
- **All orchestras benefit from:** Increased visibility, user acquisition, community building
- **Frequency:** Daily content generation from orchestra outputs
- **Format:** Social media posts, blog content, email newsletters

### 6. KidScan Beast → Directory Beast
- **Automatically provide:** Age safety ratings, kid-friendly filters, parental controls
- **Directory Beast uses for:** Enhanced filtering, safety badges, family recommendations
- **Frequency:** Real-time safety scoring
- **Format:** Safety scores and age recommendations

### 7. KidScan Beast → Nudge
- **Automatically provide:** Kid-related task templates, safety reminders, activity schedules
- **Nudge uses for:** Family task management, child safety reminders, activity planning
- **Frequency:** Daily task suggestions
- **Format:** Age-appropriate task templates

### 8. Nudge → All Orchestras
- **Automatically provide:** Task management templates, reminder systems, completion tracking
- **All orchestras benefit from:** Project management, development tracking, user engagement
- **Frequency:** As tasks are created and completed
- **Format:** Task status updates and completion notifications

### 9. Affiliate Beast → All Orchestras
- **Automatically add:** Monetization opportunities, affiliate links, revenue tracking
- **All orchestras benefit from:** Additional revenue streams, partnership opportunities
- **Frequency:** Real-time as monetizable content is created
- **Format:** Affiliate links with tracking parameters

### 10. AppFactory Beast → All Orchestras
- **Automatically reuse:** Components, patterns, features, UI elements
- **All orchestras benefit from:** Faster development, consistent UX, shared innovation
- **Frequency:** Continuous component sharing
- **Format:** Reusable React components, design patterns, code snippets

## IMPLEMENTATION REQUIREMENTS

### 1. Shared Knowledge Base Access
- **Location:** `/home/captain/.openclaw/workspace/knowledge/orchestras/`
- **Check Frequency:** Before starting any work session
- **Required Action:** Read latest updates from all other orchestras

### 2. Progress Monitoring
- **Check:** Other orchestras' current work and outputs
- **Look for:** Synergy opportunities, reusable components, shared data
- **Act on:** Immediate integration of relevant outputs

### 3. Automatic Sharing
- **When:** Any time your orchestra creates valuable output
- **What:** Content, data, features, insights that could help other orchestras
- **How:** Write to shared knowledge base with clear metadata

### 4. Synergy Reporting
- **Daily:** Report cross-orchestra synergies in status updates
- **Weekly:** Review synergy effectiveness and optimize pipelines
- **Monthly:** Measure revenue impact from cross-orchestra efforts

## TECHNICAL IMPLEMENTATION

### 1. Shared Data Formats
```yaml
# Business Listing (Directory Beast → Others)
business:
  id: string
  name: string
  category: string
  location: object
  metadata: object
  safety_score: number  # From KidScan
  affiliate_links: array  # From Affiliate Beast
  task_templates: array   # From Nudge
```

### 2. API Endpoints (To Be Implemented)
- `/api/synergy/feed` - Post outputs for other orchestras
- `/api/synergy/pull` - Get latest from other orchestras
- `/api/synergy/status` - Check cross-orchestra connectivity

### 3. File System Structure
```
knowledge/orchestras/
├── directory-beast/
│   ├── listings/           # Business data
│   ├── categories/         # Directory categories
│   └── updates/           # Recent changes
├── social-beast/
│   ├── content/           # Promotional content
│   ├── campaigns/         # Marketing campaigns
│   └── analytics/         # Engagement data
├── kidscan-beast/
│   ├── safety-scores/     # Age safety ratings
│   ├── filters/           # Kid-friendly filters
│   └── recommendations/   # Age-appropriate suggestions
├── nudge/
│   ├── task-templates/    # Reusable task templates
│   ├── reminders/         # Reminder systems
│   └── completions/       # Task completion data
├── affiliate-beast/
│   ├── programs/          # Affiliate programs
│   ├── links/             # Monetization links
│   └── revenue/           # Commission tracking
└── appfactory-beast/
    ├── components/        # Reusable UI components
    ├── patterns/          # Design patterns
    └── features/          # Feature implementations
```

## IMMEDIATE ACTIONS

### Phase 1 (Today):
1. **Update all PLAYBOOK.md files** with cross-synergy rules
2. **Create shared knowledge base structure**
3. **Establish initial data sharing pipelines**
4. **Test first cross-orchestra data flow**

### Phase 2 (This Week):
1. **Implement automated sharing mechanisms**
2. **Build synergy monitoring dashboard**
3. **Optimize data formats for maximum reuse**
4. **Measure initial synergy impact**

### Phase 3 (Ongoing):
1. **Continuous improvement of sharing pipelines**
2. **Revenue attribution for cross-orchestra efforts**
3. **Automated synergy opportunity detection**
4. **Expansion to new synergy types**

## SUCCESS METRICS

### Quantitative:
- **Synergy Utilization:** 80%+ of orchestras using shared outputs
- **Development Speed:** 30%+ faster with component reuse
- **Revenue Impact:** 25%+ revenue from cross-orchestra efforts
- **User Growth:** 40%+ user acquisition from social sharing

### Qualitative:
- **Seamless Integration:** Users experience unified ecosystem
- **Innovation Velocity:** Faster feature development through sharing
- **Competitive Advantage:** Unique ecosystem synergy
- **Scalability:** Easy addition of new orchestras

## COMPLIANCE

**This rule is MANDATORY for all orchestras effective immediately.**

Failure to implement cross-synergy checking and sharing will be considered a violation of orchestra coordination protocols.

**Updated by:** CEO Command Center  
**Effective Date:** April 21, 2026  
**Review Date:** Weekly during orchestra sync