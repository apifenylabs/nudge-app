# KidScan Beast API Specification
**Age Filtering & Safety Data API for Family-Focused Directories**

## Overview
API for age-appropriate content filtering, safety ratings, and family-friendly data sharing.

## Base URL
`https://api.kidscan.beast/v1`

## Authentication
Bearer token authentication:
```
Authorization: Bearer <api_key>
```

## Endpoints

### 1. Age Filtering
**POST /age-filter/validate**
Validate if content is appropriate for specified age range.

**Request:**
```json
{
  "content_id": "string",
  "content_type": "business|activity|product|media",
  "age_range": "0-2|3-5|6-12|13-17|all-ages",
  "country_code": "ISO 3166-1 alpha-2"
}
```

**Response:**
```json
{
  "is_appropriate": true,
  "age_range": "6-12",
  "safety_score": 85,
  "warnings": ["mild_violence", "complex_language"],
  "recommended_age": "8+",
  "filter_reasons": []
}
```

### 2. Safety Ratings
**GET /safety/rating/{business_id}**
Get safety rating for a business.

**Response:**
```json
{
  "business_id": "string",
  "safety_rating": 4.5,
  "rating_breakdown": {
    "physical_safety": 4.8,
    "hygiene": 4.2,
    "staff_training": 4.7,
    "emergency_preparedness": 4.0
  },
  "certifications": ["child_safe", "first_aid_trained"],
  "last_updated": "2026-04-18T10:30:00Z"
}
```

### 3. Age-Specific Recommendations
**GET /recommendations/{age_range}**
Get recommendations for specific age range.

**Query Parameters:**
- `location` (optional): City or coordinates
- `category` (optional): Activity category
- `limit` (optional): Number of results (default: 10)

**Response:**
```json
{
  "age_range": "3-5",
  "recommendations": [
    {
      "id": "business_123",
      "name": "Little Explorers Playground",
      "type": "playground",
      "safety_score": 92,
      "age_suitability": "perfect",
      "distance_km": 2.5,
      "features": ["soft_floor", "shaded_areas", "parent_seating"]
    }
  ]
}
```

## Database Schema

### Tables:

#### 1. age_guidelines
```sql
CREATE TABLE age_guidelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL,
  country_code CHAR(2) NOT NULL,
  min_age INTEGER,
  max_age INTEGER,
  guidelines JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. safety_ratings
```sql
CREATE TABLE safety_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id VARCHAR(100) NOT NULL,
  overall_rating DECIMAL(3,2),
  physical_safety DECIMAL(3,2),
  hygiene DECIMAL(3,2),
  staff_training DECIMAL(3,2),
  emergency_preparedness DECIMAL(3,2),
  certifications TEXT[],
  source VARCHAR(100),
  last_verified DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. age_appropriate_content
```sql
CREATE TABLE age_appropriate_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id VARCHAR(100) NOT NULL,
  content_type VARCHAR(50) NOT NULL,
  age_ranges TEXT[] NOT NULL,
  safety_flags TEXT[],
  recommendations TEXT[],
  country_specific_rules JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Integration with Directory Beast

### 1. Real-time Age Filtering
Directory Beast calls KidScan API when:
- User selects age filters
- New business is added
- Content is displayed

### 2. Safety Badges
Display safety ratings from KidScan on business listings.

### 3. Age-Specific Search
Enhance search results based on age appropriateness.

## Implementation Plan

### Phase 1 (Week 1): Core API
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Implement age filtering endpoint
- [ ] Basic authentication

### Phase 2 (Week 2): Integration
- [ ] Directory Beast integration
- [ ] Real-time filtering
- [ ] Caching layer
- [ ] Monitoring & logging

### Phase 3 (Week 3): Advanced Features
- [ ] Machine learning for age recommendations
- [ ] Multi-country support
- [ ] Parent feedback system
- [ ] Safety certification verification

## Tech Stack
- **Backend:** Next.js API Routes + Supabase
- **Database:** PostgreSQL (Supabase)
- **Authentication:** JWT + API keys
- **Caching:** Redis (optional)
- **Deployment:** Vercel

## Rate Limiting
- Free tier: 100 requests/day
- Basic: 1,000 requests/day
- Pro: 10,000 requests/day
- Enterprise: Custom

## Error Codes
- `400`: Bad request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `429`: Rate limited
- `500`: Internal server error

## Example Integration Code

```typescript
// Directory Beast integration
async function checkAgeAppropriateness(businessId: string, ageRange: string) {
  const response = await fetch('https://api.kidscan.beast/v1/age-filter/validate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.KIDSCAN_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content_id: businessId,
      content_type: 'business',
      age_range: ageRange,
      country_code: 'FR'
    })
  });
  
  return response.json();
}
```

## Next Steps
1. Set up Supabase project for KidScan
2. Create Next.js API routes
3. Implement database schema
4. Test with Directory Beast
5. Deploy to Vercel