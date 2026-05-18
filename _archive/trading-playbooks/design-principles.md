# Design Principles - Alpha Orchestras

## Our Standard: Apple-Level Premium

Every UI must feel like it was designed by Apple, built for families, and loved by users. No exceptions.

## Core Principles

### 1. Generous Whitespace
- Minimum 16px padding on mobile, 24-32px on desktop
- Cards have 12-16px internal padding
- Sections separated by 40-80px
- Never crowd elements together

### 2. 8px Grid System
- All spacing, sizing, and positioning follows 8px increments
- Margins: 8, 16, 24, 32, 48, 64, 80, 96
- Padding: 8, 12, 16, 24, 32
- Border radius: 8 (small), 12 (medium), 16 (large), 24 (xlarge)

### 3. Typography
- System font stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Scale: 12 / 14 / 16 / 20 / 24 / 32 / 40 / 48
- Headlines: bold, generous line-height (1.2-1.3)
- Body: regular weight, comfortable line-height (1.5-1.7)
- Max line length: 70 characters for readability

### 4. Color
- Monochromatic base with one subtle accent
- Background: white/off-white, text: near-black
- Accent used sparingly — CTAs, highlights, icons
- Color has meaning: green = success, red = error, amber = warning, blue = info
- Dark mode: invert thoughtfully, not just color swap

### 5. Cards
- White background, subtle shadow (sm/md), 12-16px radius
- Hover: lift 2px, shadow increases, subtle border color change
- Content: clear hierarchy (image → title → description → metadata)
- Consistent internal spacing

### 6. Animations & Micro-interactions
- Duration: 150-300ms ease-out
- Hover: scale(1.02), shadow increase, color transition
- Page transitions: 200ms fade + subtle slide
- Loading: skeleton screens, not spinners
- No motion sickness — keep it subtle

### 7. Responsive
- Mobile-first: start at 320px
- Breakpoints: 640 / 768 / 1024 / 1280 / 1536
- No horizontal scroll at any breakpoint
- Text never truncates — wrap properly

### 8. Accessibility
- Color contrast: WCAG AA minimum (4.5:1 normal, 3:1 large)
- Focus states: visible ring or background change
- Touch targets: minimum 44px
- Semantic HTML where possible
- ARIA labels for icon-only buttons

### 9. States
- Loading: skeleton screens matching final layout
- Empty: informative illustration + clear CTA
- Error: human-readable message + recovery action
- Success: subtle confirmation, auto-dismiss after 3s
- Edge cases: long names, missing images, slow connections

### 10. Consistency
- Same design language across all orchestras
- Shared component library from Social Beast
- Same spacing, colors, typography everywhere
- Users should feel all products are from the same family

## Design References (Our Bar)
1. **Nomad List** — Card layout, filtering, data density
2. **Apple** — Whitespace, typography, micro-interactions
3. **MonksTrip** — Immersive travel UI, elegant spacing
4. **Stripe** — Documentation, color use, simplicity

## Anti-Patterns (Never Do)
- Crowded layouts with no breathing room
- Inconsistent spacing or alignment
- Text truncation without expansion
- Bare native browser styles
- Clashing colors or too many colors
- Heavy animations that slow the page
- Generic stock UI that looks like every other site
