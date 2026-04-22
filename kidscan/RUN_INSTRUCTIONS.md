# KidScan - Run Instructions

## Quick Start

### 1. Start the Mobile App (Frontend)
```bash
cd /home/captain/.openclaw/workspace/kidscan/mobile
npm start
```

This will:
- Start the Expo development server
- Show a QR code in terminal
- Open Expo DevTools in browser (http://localhost:8081)

### 2. Test on Your Phone
1. Install **Expo Go** app from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in terminal
3. The app will load on your phone

### 3. Start the Backend API (Optional)
```bash
cd /home/captain/.openclaw/workspace/kidscan/backend
npm install express axios cors
node server.js
```

Backend will run on: http://localhost:3001

## Testing Flow

### Step 1: Open the App
- Launch Expo Go on your phone
- Scan the QR code
- App should open with "KidScan - Food Safety Scanner" home screen

### Step 2: Test Scanning
1. Tap "Scan Food Now"
2. Allow camera permissions if prompted
3. Point camera at a barcode OR use test buttons:
   - **Nutella:** 3017620422003
   - **Coca-Cola:** 5449000000996  
   - **Nesquik:** 7613034626844
   - **Pasta:** 8000500310427

### Step 3: Review Results
For each scan, check:
- Product name and image display
- 4 age scores (0-2, 3-5, 6-8, 9-12 years)
- Color coding (Green/Amber/Red)
- Safety warnings (if any)
- Recommendations

## Expected Behavior

### High Sugar Products (Nutella, Coca-Cola):
- **0-2 years:** Red score, "Not recommended" warning
- **3-5 years:** Amber/Red, "High sugar" warning  
- **6-8 years:** Amber, "Moderate sugar" note
- **9-12 years:** Green/Amber, "Monitor consumption"

### Basic Foods (Pasta, Rice):
- **All ages:** Green scores
- **No major warnings**
- **Positive recommendations**

### Allergen-containing Foods:
- **Appropriate warnings** for milk, nuts, etc.
- **Age-specific guidance**

## Troubleshooting

### Camera Not Working:
1. Check phone permissions (Settings → Apps → Expo Go → Camera)
2. Restart the app
3. Try flipping camera (button on scan screen)

### App Crashes:
1. Check terminal for error messages
2. Restart Expo server: `Ctrl+C` then `npm start`
3. Clear cache: `npm start -- --clear`

### No Product Data:
1. Check internet connection
2. Try different barcode (test barcodes should work)
3. Check terminal for API errors

### Slow Loading:
1. First load may be slow (downloading bundle)
2. Subsequent scans should be faster
3. Product images may take time to load

## Development Notes

### Project Structure:
```
kidscan/
├── mobile/           # React Native app
│   ├── src/
│   │   ├── screens/     # App screens
│   │   ├── services/    # API & scoring logic
│   │   ├── utils/       # Constants & helpers
│   │   └── components/  # Reusable components
│   └── App.js          # Main app file
├── backend/          # Node.js API server
│   └── server.js     # API endpoints
├── agents/           # Verification agents
└── docs/            # Documentation
```

### Key Files:
- **Scoring Logic:** `mobile/src/services/scoring.js`
- **API Client:** `mobile/src/services/api.js`
- **Age Constants:** `mobile/src/utils/constants.js`
- **Scan Screen:** `mobile/src/screens/ScanScreen.js`
- **Results Screen:** `mobile/src/screens/ResultsScreen.js`

### Scoring Algorithm:
- **Base Score:** 50 points
- **Sugar:** -20 to +10 points based on age limits
- **Sodium:** -15 to +5 points based on age limits  
- **Allergens:** -15 points if present
- **Choking Hazards:** -20 points for young ages
- **Additives:** -10 points if present
- **Processing:** -15 to +10 points (Nova group)

## Your Testing Checklist

### Functional Testing:
- [ ] App launches without errors
- [ ] Camera opens and scans barcodes
- [ ] Product data displays correctly
- [ ] Age scores calculate appropriately
- [ ] Safety warnings show when needed
- [ ] Navigation works between screens

### Accuracy Testing:
- [ ] High sugar → lower scores for young kids
- [ ] Allergens → appropriate warnings
- [ ] Basic foods → higher scores
- [ ] Scores make logical sense

### UI/UX Testing:
- [ ] Interface is intuitive
- [ ] Colors help understand scores
- [ ] Warnings are clear
- [ ] Loading states work
- [ ] Error messages helpful

### Performance Testing:
- [ ] Scan to results < 5 seconds
- [ ] No crashes during use
- [ ] Smooth navigation
- [ ] Reasonable battery usage

## Feedback Collection

### Please Note:
1. **Scoring accuracy** for different products
2. **Missing features** you'd like to see
3. **UI improvements** needed
4. **Bugs or crashes** encountered
5. **General impressions** of the app

### Report Issues Here:
- Telegram: @CaptainAlphaAgent_bot
- Or reply in this topic with:
  - Barcode tested
  - Issue description  
  - Screenshot if possible
  - Suggested fix if known

## Ready for Launch Testing!

**The MVP is complete and ready for your hands-on testing. Start with the test barcodes to verify the core functionality works correctly.**