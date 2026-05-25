# Titan — Work Engine State

## Last Updated
Mon 2026-05-25 21:27 GMT+8

## What Was Done

### 1. Codebase Audit
- Explored `titan-app/` (primary project at `/home/captain/.openclaw/workspace/titan-app`)
- 21 routes total: 19 static pages + 6 API routes + 1 middleware
- Routes: `/` (landing), `/login`, `/dashboard/` (7 sub-routes), `/robotics/` (3 routes), `/byo`

### 2. Missing CSS Utilities — Fixed
- **Problem**: Login and Robotics pages used custom CSS utility classes (`titan-gradient`, `titan-text-gradient`, `titan-teal`, `titan-golden`, `titan-radial-glow-warm`, `titan-grid-bg`, `titan-glow`, `titan-particle-glow`, `titan-muted`, `titan-card`, `titan-border`, etc.) that were NOT defined in `globals.css`
- **Fix**: Added ~50 custom utility classes in `globals.css` under `@layer utilities`:
  - Gradient utilities: `.titan-gradient`, `.titan-text-gradient`, `.titan-radial-glow-warm`, `.titan-radial-glow`
  - Background utilities: `.titan-grid-bg`, `.titan-glow`, `.titan-particle-glow`
  - Color token utilities: `.titan-teal`, `.titan-golden`, `.titan-emerald`, `.titan-muted`, `.titan-text`, `.titan-card`, `.titan-border`, `.titan-bg`
  - Opacity variants: all `bg-titan-*/N`, `border-titan-*/N`, `text-titan-*/N`, `hover:*` variants used in the codebase
- **Impact**: Login page, robotics pages, robotics dashboard, LifeOS tab now render with proper visual styling

### 3. Landing Page Polish
- Added scroll-down indicator (mouse scroll wheel icon) below hero CTA buttons
- Enhanced mascot card hover: added gradient overlay and more pronounced translate effect
- Both animate via framer-motion with delays

### 4. Swarm Orbit Animation
- Added `@keyframes spin` CSS animation to `globals.css` used by the orbital swarm visualization

### 5. Build
- `npm run build` passes: clean output, zero errors, 21 routes generated
- `npx vercel build --prod` passes: prebuilt successfully

### 6. Deployment
- Deployed to Vercel production: `https://titan-app-puce.vercel.app`
- Smoke-tested:
  - `/` → 200
  - `/login` → 200
  - `/robotics` → 200
  - `/byo` → 200
  - Dashboard routes → 307 (redirects to login as expected — unauthenticated)
- Vercel preview deployment has password protection (expected)
