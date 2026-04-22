# KidScan Technical Specification

## Project Structure
```
kidscan/
├── mobile/           # React Native app
├── backend/          # Node.js API
├── database/         # PostgreSQL schemas
├── agents/           # Verification agents
└── docs/            # Documentation
```

## Tech Stack (All Free Tier)
### Frontend (Mobile)
- **Framework:** React Native (Expo for rapid development)
- **UI Library:** React Native Paper (free, Material Design)
- **Icons:** React Native Vector Icons (free)
- **Scanning:** react-native-camera + react-native-barcode-scanner
- **State Management:** Zustand (lightweight)

### Backend
- **Runtime:** Node.js + Express
- **Database:** PostgreSQL (free tier on Supabase/Render)
- **Caching:** Redis (free tier on Upstash)
- **APIs:** 
  - Open Food Facts (free API)
  - USDA FoodData Central (free API)
  - FDA recalls API (free)

### Data Verification Agents
1. **Collector Agent:** Scrapes data from free sources
2. **Validator Agent:** Cross-references multiple sources
3. **Safety Agent:** Checks against known safety guidelines
4. **Accuracy Agent:** Flags inconsistencies for human review

## Database Schema

### `products` table
```sql
id | barcode | name | brand | ingredients | nutrition_facts | age_scores | safety_flags
```

### `age_scores` table  
```sql
product_id | age_group | score | reasons | recommendations
-- age_groups: 0-2, 3-5, 6-8, 9-12
```

### `safety_flags` table
```sql
product_id | flag_type | severity | description | sources
-- flag_types: allergen, choking, additive, sugar, salt
```

## API Endpoints

### Public APIs
- `GET /api/products/:barcode` - Get product info with age scores
- `POST /api/scan` - Submit barcode/image for analysis
- `GET /api/safety/:productId` - Get safety details

### Admin APIs (for agents)
- `POST /api/verify` - Submit verification data
- `GET /api/queue` - Get items needing verification
- `POST /api/flag` - Flag inaccurate data

## Age-Specific Scoring Algorithm

### Age Groups & Criteria:
1. **0-2 years:** 
   - Choking hazard primary
   - Allergen sensitivity high
   - Sugar/salt limits strict
   - Nutrient density focus

2. **3-5 years:**
   - Moderate choking risk
   - Allergen awareness
   - Sugar moderation
   - Growth nutrients

3. **6-8 years:**
   - Basic safety checks
   - Balanced nutrition
   - Educational value
   - Portion guidance

4. **9-12 years:**
   - Advanced nutrition
   - Independence building
   - Health education
   - Lifestyle habits

### Scoring Formula (0-100):
```
Base Score = 50
+ Nutrition Bonus (0-30)
- Safety Penalties (0-40)
+ Age Adjustments (±10)
= Final Score
```

## Safety Checking System

### Allergen Detection:
- Common 8: milk, eggs, peanuts, tree nuts, fish, shellfish, soy, wheat
- Cross-contamination warnings
- Processing facility alerts

### Choking Hazard Assessment:
- Size/shape analysis
- Texture evaluation  
- Preparation requirements
- Age-specific risk levels

### Additive Screening:
- Artificial colors/flavors
- Preservatives
- Sweeteners
- Processing aids

## Multi-Agent Verification Workflow

```
[New Product Data]
      ↓
[Collector Agent] → Gathers from 3+ sources
      ↓
[Validator Agent] → Cross-references data
      ↓
[Safety Agent] → Applies age-specific rules
      ↓
[Accuracy Agent] → Flags inconsistencies
      ↓
[Human Review Queue] → Your testing
      ↓
[Approved Database Entry]
```

## Development Timeline

### Day 1-2: Foundation
- Set up React Native project
- Basic barcode scanning
- Open Food Facts integration
- Simple UI skeleton

### Day 3-4: Core Logic
- Age scoring algorithm
- Safety checking system
- Product display screen
- Local data caching

### Day 5-7: Verification System
- Multi-agent architecture
- Data collection pipelines
- Accuracy validation
- Admin dashboard

### Week 2: Enhancement
- Image recognition (OCR)
- Educational games
- Parent dashboard
- Social sharing

## Accuracy Guarantee Protocol

1. **Source Diversity:** Minimum 3 independent sources per product
2. **Conflict Resolution:** Flag conflicts for human review
3. **Version Tracking:** All changes logged with sources
4. **Community Reporting:** User flagging system
5. **Regular Audits:** Weekly accuracy checks

## Free Resources Identified

### Data Sources:
1. Open Food Facts API (600k+ products)
2. USDA FoodData Central (300k+ items)
3. FDA Food Recalls Database
4. WHO Child Nutrition Guidelines
5. Reddit r/Parenting food discussions
6. YouTube pediatric nutrition channels

### Development Tools:
1. GitHub Codespaces (free tier)
2. Supabase (free PostgreSQL)
3. Render (free hosting)
4. Vercel (frontend hosting)
5. Cloudflare (CDN)

### Testing Resources:
1. BrowserStack (open source free)
2. Appetize.io (free demo tier)
3. TestFlight (iOS beta)
4. Google Play Internal Testing

## Success Metrics
- **Accuracy:** 100% verified data
- **Coverage:** 50k+ products in first month
- **Speed:** <2 second scan-to-result
- **Usability:** 90%+ kid success rate on first try
- **Safety:** Zero false negatives on critical alerts