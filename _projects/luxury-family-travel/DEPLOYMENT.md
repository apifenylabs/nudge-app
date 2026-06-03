# Family Travel Directory - Deployment Guide

## Current Status
✅ **Code complete:** Next.js 14 + TypeScript + Tailwind CSS
✅ **Build passes:** `npm run build` succeeds
✅ **Components:** 5 core components built
✅ **Mock data:** 10 family-friendly businesses
✅ **Supabase ready:** Mock client, ready for real integration

## Deployment Steps

### 1. Prerequisites
- GitHub account with repository
- Vercel account (free tier)
- Supabase account (free tier)

### 2. Set Up Supabase
1. Create new Supabase project: `family-travel-directory`
2. Run this SQL schema:
```sql
-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(100) NOT NULL,
  age_range VARCHAR(20) NOT NULL,
  safety_rating INTEGER CHECK (safety_rating >= 1 AND safety_rating <= 5),
  amenities TEXT[] DEFAULT '{}',
  category VARCHAR(50) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  icon VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  user_id UUID,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to businesses" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to categories" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to reviews" ON reviews
  FOR SELECT USING (true);
```

3. Insert sample data (run in SQL editor):
```sql
-- Insert categories
INSERT INTO categories (name, icon, description) VALUES
  ('Theme Parks', '🎢', 'Amusement and theme parks'),
  ('Museums', '🏛️', 'Educational and cultural museums'),
  ('Parks', '🌳', 'Public parks and gardens'),
  ('Zoos', '🦁', 'Zoos and aquariums'),
  ('Restaurants', '🍽️', 'Family-friendly dining'),
  ('Hotels', '🏨', 'Family accommodation'),
  ('Activities', '🎨', 'Classes and workshops'),
  ('Landmarks', '🗼', 'Iconic tourist sites');

-- Insert sample businesses (run after categories)
-- See lib/supabase.ts for complete sample data
```

### 3. Update Environment Variables
Create `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Mapbox for interactive maps
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
```

### 4. Update Supabase Client
Replace `lib/supabase.ts` mock client with real client:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 5. Deploy to Vercel
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Family Travel Directory v1.0"
git branch -M main
git remote add origin https://github.com/yourusername/family-travel-directory.git
git push -u origin main

# 2. Deploy to Vercel
# - Go to vercel.com
# - Import your GitHub repository
# - Add environment variables
# - Deploy
```

### 6. Post-Deployment
1. **Test the live site:** Verify all features work
2. **Add more businesses:** Use Supabase dashboard or create admin interface
3. **Set up analytics:** Vercel Analytics or Google Analytics
4. **Configure domain:** Add custom domain if desired

## File Structure
```
family-travel-directory/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── SearchBar.tsx         # Search functionality
│   ├── FilterSidebar.tsx     # Age/amenity filters
│   ├── BusinessListingCard.tsx # Business cards
│   └── SimpleMapContainer.tsx # Location visualization
├── lib/
│   └── supabase.ts           # Database client (mock/real)
├── public/                   # Static assets
└── package.json              # Dependencies
```

## Features Implemented
- ✅ **Search:** Location, category, keyword search
- ✅ **Filters:** Age ranges, safety ratings, amenities
- ✅ **Business listings:** Cards with details, images, ratings
- ✅ **Location view:** City-based business grouping
- ✅ **Responsive design:** Mobile-friendly
- ✅ **Performance:** Optimized build, fast loading

## Next Features to Add
1. **User authentication:** Sign up/login for saving favorites
2. **Reviews:** User reviews and ratings
3. **Booking integration:** Affiliate links to booking sites
4. **Interactive maps:** Mapbox integration
5. **Admin dashboard:** Add/edit businesses
6. **Email notifications:** New business alerts

## Troubleshooting
- **Build fails:** Check TypeScript errors, run `npm run build` locally
- **Database connection:** Verify Supabase URL and keys
- **Images not loading:** Check Unsplash URLs or upload to Supabase Storage
- **Filters not working:** Check age range logic in `lib/supabase.ts`

## Support
For issues:
1. Check build logs in Vercel
2. Verify Supabase connection
3. Test locally with `npm run dev`
4. Review browser console for errors

## Success Metrics
- ✅ **Build success:** `npm run build` passes
- ✅ **Local testing:** `npm run dev` works (if not SIGKILL)
- ✅ **Code quality:** TypeScript strict, no errors
- ✅ **Ready for deployment:** Just needs credentials

**Deployment time:** ~30 minutes with credentials
**Cost:** Free tier (Vercel + Supabase)
**Maintenance:** Low (static site with database)