# Kids Activities Asia 🎪

A curated directory of the best kids' activities, classes, and family-friendly attractions across Asia.

## Built With

- Next.js 14 (App Router)
- Tailwind CSS
- Vercel Analytics
- Static data (JSON → SSG)

## Development

```bash
npm install
npm run dev
```

## Adding Activities

Edit `data/activities.json` and rebuild. Each activity needs:
- id (unique, e.g. "hk-001")
- name, description, category, subCategory
- ageRange (e.g. "2-12"), ageBuckets array
- safetyRating (1-5)
- city, country, region
- location, bestTime, priceRange, sessionDuration
- amenities, safetyFeatures arrays
- seoKeywords, rating, reviewCount
- affiliateLinks (klook, tripcom — can be null)

## Deployment

```bash
npx vercel --prod
```
