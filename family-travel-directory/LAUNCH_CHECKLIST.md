# Directory Beast — Launch Checklist

## Before Launch

### 🎯 Content
- [ ] Review 10 random destination pages for content quality
- [ ] Add destinations for the 3 missing categories (Beaches, Family-Friendly Cities, Food & Dining)
- [ ] Replace placeholder images with real photos for destinations showing gradient fallbacks
- [x] 506+ destinations confirmed in sitemap (741 total entries)

### 💰 Revenue
- [ ] **Replace `ca-pub-XXXXXXXXXXXXXXXX`** in layout.tsx and _client.tsx with your real AdSense publisher ID
- [ ] **Replace `data-ad-slot`** in _client.tsx with your real ad unit slot ID
- [ ] Verify Affiliate links work (Booking.com, Klook, Viator)
- [ ] Add Google Search Console verification code to layout.tsx
- [x] Commission rates embedded in destination data (5-8%)
- [x] All affiliate links marked `nofollow sponsored`
- [x] Ads labeled "Advertisement" per Google policy

### 📈 SEO
- [x] Unique meta titles/descriptions per page
- [x] JSON-LD structured data (schema.org TouristAttraction + BreadcrumbList)
- [x] Open Graph + Twitter cards
- [x] Dynamic sitemap with 741 entries
- [x] Canonical URLs
- [x] Robots.txt

### 🧪 Testing
- [x] Build passes (506 SSG pages)
- [ ] Verify Google AdSense ad loads on live site
- [ ] Test affiliate links open in new tab
- [ ] Test on mobile device (real phone, not emulator)
- [ ] Test filter/search/sort on live site
- [ ] Verify sitemap submitted to Google Search Console
- [ ] Check lighthouse scores (aim for 90+ Perf, 100 SEO)

### 🔧 Technical
- [ ] Set `NEXT_PUBLIC_GA_TRACKING_ID` in Vercel env vars (optional)
- [ ] Set `NEXT_PUBLIC_POSTHOG_KEY` in Vercel env vars (optional)
- [ ] Deploy latest to Vercel production
- [ ] Configure custom domain (if using)
- [ ] Set up Vercel Analytics (free tier available)

## Launch Day

1. **Final review** — visit the live site on desktop + mobile
2. **Submit sitemap** to Google Search Console
3. **Post** announcement on X/Twitter, Reddit (r/travel, r/familytravel), Facebook groups
4. **Monitor** first 24h for errors (Vercel dashboard)
5. **Share** launch thread on X with screenshots

## Post-Launch (First Week)

- [ ] Check AdSense earnings daily
- [ ] Monitor affiliate click-through rates
- [ ] Add Social Beast content promotion schedule
- [ ] Fix any user-reported issues within 24h
- [ ] Start creating content for 3 missing categories
