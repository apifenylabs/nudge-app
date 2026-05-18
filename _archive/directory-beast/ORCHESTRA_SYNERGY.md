# Directory Beast - Synergy Configuration

## Orchestra Identity
- **Name**: Directory Beast
- **Primary Function**: Collect and organize directory listings
- **Key Output**: Structured data for all other orchestras

## Cross-Synergy Rules

### Required Daily Actions
1. Check shared knowledge base at `/home/captain/.openclaw/workspace/shared-knowledge/`
2. Automatically feed listings to Social Beast
3. Provide data to KidScan Beast for safety filtering
4. Create task template suggestions for Nudge
5. Identify affiliate opportunities for Affiliate Beast
6. Share component patterns with AppFactory Beast
7. Post daily progress update

### Output Synergies (What We Share)
1. **To Social Beast**:
   - Fresh listings for content creation
   - Category trends for topical content
   - Location data for geo-targeted posts
   - Update frequency: Real-time via shared JSON files

2. **To KidScan Beast**:
   - Venue/establishment data for safety filtering
   - Location metadata for risk assessment
   - Category data for age-appropriateness
   - Update frequency: Daily batch

3. **To Nudge Orchestra**:
   - Task templates based on directory categories
   - Location-based task suggestions
   - Seasonal/event-based task ideas
   - Update frequency: Weekly templates

4. **To Affiliate Beast**:
   - Monetizable listings with partnership potential
   - High-traffic categories for affiliate deals
   - Local business contact information
   - Update frequency: Real-time opportunities

5. **To AppFactory Beast**:
   - Data structure patterns for directories
   - Search/filter component requirements
   - Map integration patterns
   - Update frequency: As patterns emerge

### Input Synergies (What We Receive)
1. **From Social Beast**:
   - Content performance metrics by category
   - User engagement trends
   - Promotion effectiveness data

2. **From KidScan Beast**:
   - Safety ratings for venues
   - Risk assessment updates
   - Filtering rule improvements

3. **From Nudge Orchestra**:
   - Task completion data by location/category
   - Family activity patterns near venues
   - Time-based usage patterns

4. **From Affiliate Beast**:
   - Monetization success rates
   - Partnership requirements
   - Revenue share models

5. **From AppFactory Beast**:
   - Improved data structures
   - Performance optimizations
   - UI component enhancements

## Implementation Files
- **Listings**: Save to `/home/captain/.openclaw/workspace/shared-knowledge/directory-listings/`
- **Content Ideas**: Save to `/home/captain/.openclaw/workspace/shared-knowledge/content-ideas/directory-*.md`
- **Progress Reports**: Save to `/home/captain/.openclaw/workspace/shared-knowledge/progress-reports/directory-YYYY-MM-DD.md`

## Data Formats
```json
{
  "listing": {
    "id": "unique-id",
    "name": "Business Name",
    "category": ["restaurant", "family"],
    "location": {"lat": 0.0, "lng": 0.0},
    "safety_rating": 0.95,
    "affiliate_potential": true,
    "task_templates": ["family-dinner", "weekend-activity"],
    "timestamp": "2026-04-21T08:00:00Z"
  }
}
```

## Daily Checklist
- [ ] Scrape/update directory listings
- [ ] Process listings through safety filters (with KidScan)
- [ ] Generate content ideas for Social Beast
- [ ] Create task templates for Nudge
- [ ] Identify affiliate opportunities
- [ ] Share patterns with AppFactory
- [ ] Post progress report

## Quality Standards
- Data freshness: < 24 hours for critical categories
- Accuracy: > 95% for core fields
- Completeness: > 80% for all listings
- Safety coverage: 100% for family venues

## Version Control
- This file: v1.0 (2026-04-21)
- Synergy rules: See `/home/captain/.openclaw/workspace/orchestra-synergy-rules.md`

---
*Directory Beast - The foundational data layer powering the Alpha Orchestras ecosystem*