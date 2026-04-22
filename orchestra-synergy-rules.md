# Orchestra Cross-Synergy Rules

## Core Principle
Every orchestra must check the shared knowledge base and other orchestras' progress every time it works. Actively look for synergy opportunities and share useful outputs (content, listings, data, features) with the relevant other orchestras automatically.

## Orchestra Responsibilities

### 1. Directory Beast
- **Primary Function**: Collect and organize directory listings
- **Synergy Outputs**:
  - Automatically feeds listings/content ideas to Social Beast
  - Provides location/venue data to KidScan Beast for safety filtering
  - Creates task template suggestions for Nudge based on directory categories
  - Identifies affiliate opportunities for Affiliate Beast
  - Shares component patterns with AppFactory Beast

### 2. Social Beast
- **Primary Function**: Create and distribute promotional content
- **Synergy Inputs**:
  - Receives listings from Directory Beast for content creation
  - Gets app updates from Nudge for promotion
  - Receives safety alerts from KidScan for awareness campaigns
  - Gets affiliate offers from Affiliate Beast for promotion
- **Synergy Outputs**:
  - Creates promotional content for all other orchestras
  - Shares engagement metrics with all orchestras

### 3. KidScan Beast
- **Primary Function**: Child safety and content filtering
- **Synergy Inputs**:
  - Uses data from Directory Beast for safety filtering
  - Receives task patterns from Nudge for child-appropriate tasks
- **Synergy Outputs**:
  - Provides safety ratings to Directory Beast
  - Creates child-safe task templates for Nudge
  - Shares safety patterns with AppFactory Beast

### 4. Nudge Orchestra
- **Primary Function**: Family task management (voice + text tasks, family enforcement)
- **Synergy Inputs**:
  - Creates task templates from Directory Beast categories
  - Uses KidScan data for child-appropriate tasks
  - Gets affiliate opportunities from Affiliate Beast
- **Synergy Outputs**:
  - Shares task completion patterns with all orchestras
  - Provides user engagement data to Social Beast
  - Shares UI/UX patterns with AppFactory Beast

### 5. Affiliate Beast
- **Primary Function**: Monetization and partnership management
- **Synergy Inputs**:
  - Receives directory listings for affiliate opportunities
  - Gets app features from Nudge for monetization
- **Synergy Outputs**:
  - Adds monetization opportunities to every directory and app
  - Shares revenue patterns with all orchestras
  - Provides partnership templates to AppFactory Beast

### 6. AppFactory Beast
- **Primary Function**: Component and pattern reuse
- **Synergy Inputs**:
  - Reuses components and patterns from all other orchestras
  - Receives best practices from all orchestras
- **Synergy Outputs**:
  - Creates reusable components for all orchestras
  - Shares development patterns and optimizations
  - Provides deployment templates

## Implementation Rules

1. **Daily Check**: Each orchestra must check the shared knowledge base at `/home/captain/.openclaw/workspace/shared-knowledge/` daily
2. **Automatic Sharing**: Any useful output must be automatically shared to relevant orchestras
3. **Progress Updates**: Each orchestra must post progress updates to the shared channel
4. **Conflict Resolution**: When orchestras overlap, prioritize user value and revenue potential
5. **Data Ownership**: All generated data belongs to the Alpha Orchestras ecosystem

## Shared Knowledge Base Structure
```
/home/captain/.openclaw/workspace/shared-knowledge/
├── directory-listings/
├── content-ideas/
├── safety-data/
├── task-templates/
├── affiliate-opportunities/
├── components/
└── progress-reports/
```

## Communication Protocol
- Use Telegram topic #3 for Nudge-specific discussions
- Use shared filesystem for data exchange
- Daily summary posted to CEO Command Center
- Urgent issues flagged immediately

Last Updated: 2026-04-21
Effective Immediately