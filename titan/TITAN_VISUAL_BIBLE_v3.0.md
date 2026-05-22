# TITAN VISUAL BIBLE v3.0 – Pixel-Perfect Spec for OpenClaw
Date: May 21 2026
Status: LOCKED – Warm Living Ecosystem default (mass appeal)

## DESIGN TOKENS (Copy these exactly)

Color Palette
- Primary Teal (warm glow): #14B8A6
- Accent Golden: #F59E0B
- Soft Background: #0F172A (deep navy with subtle teal tint)
- Card Background: #1E2937 (warm slate)
- Text Primary: #F1F5F9
- Text Secondary: #94A3B8
- Success Glow: #10B981
- Particle Glow: rgba(20, 184, 166, 0.6)
- Agent Body Base: #E0F2F1 (soft white with teal undertone)

Typography
- Font Family: "Inter", system-ui, sans-serif
- Headings: 600 weight, 24–32px, tracking -0.02em
- Body: 400 weight, 16px, line-height 1.6
- Labels: 500 weight, 14px, uppercase tracking 0.5px

Spacing System (Tailwind-like)
- Base unit: 4px
- Container padding: 24px / 32px
- Card border-radius: 24px
- Agent orbit radius: 180px (desktop), 120px (mobile)

Agent Style (All Avatars)
- Friendly cartoonish 3D-rendered style (big expressive eyes, soft smile, rounded forms)
- Soft outer glow (teal/golden halo)
- Idle animation: gentle floating + slow breathing scale (1.0 → 1.05)
- Level-up: golden particle burst + scale pop

Animations (Framer Motion specs)
- Hover: scale 1.05, transition 200ms ease-out
- Level Up: scale 1.3 → 1.0 with golden particles + confetti
- Orbiting agents: slow circular motion (20s duration, infinite, ease-in-out)
- Particles: soft floating orbs with opacity fade (60–120s lifespan)

## PER-SCREEN BREAKDOWNS (Exact Layout Specs)

1. Onboarding – Theme Picker
 - Full-screen centered container
 - Headline: 32px bold "Choose Your Titan Experience"
 - 4 cards in 2x2 grid (desktop) or stacked (mobile)
 - Each card: 320px wide, image preview at top, title 20px, description 14px, purple button (#7C3AED)

2. Main Dashboard – Warm Living Ecosystem (Game View Default)
 - Background: #0F172A with subtle radial gradient (teal center)
 - Central platform: circular glowing ring (#14B8A6 with blur)
 - Main agent: 220px diameter, centered, soft shadow + glow
 - Orbiting agents: 5–7 smaller agents (80–110px) on invisible circle path
 - Top bar: fixed, semi-transparent, Level badge (golden), ROI widget (green accent)
 - Right sidebar: Moltbook feed (cards with avatar + short text)
 - Bottom floating button: "Level Up" with warm glow

3. Modular Dashboard (Toggle View)
 - Top toggle switch (rounded pill, white knob)
 - Grid of cards (3–4 columns desktop)

4. Visual Atelier
 - Left sidebar: Base Models grid (3 columns, cards with hover glow)
 - Center: 420px preview canvas with live agent + idle animation
 - Right panel: tabs (Skin / Outfit / Props), orange "Artify with AI" button (#F59E0B)

5. Skill Forge
 - Three-column split (left templates, center editor, right preview)
 - Dark Monaco theme editor with teal keywords
 - Prominent orange "Audit & Certify" button

6. Swarm Orchestrator
 - Full circular map (dark background with faint world map texture)
 - Glowing energy lines connecting agents (animated pulse)
 - Bottom command bar with voice input

7. Audit Center
 - Large green success banner with star icon
 - OWASP/TDAD breakdown in clean cards

8. BYO Enterprise
 - Clean professional layout (warm palette, muted accents)
 - Drag-and-drop manifest zone

Mobile Rules
- All screens stack vertically
- Agent preview scales down gracefully
- Thumb-friendly buttons (min 48px tap target)

Overall Aesthetic Keywords
"warm futuristic living ecosystem, soft teal and golden glow, friendly cartoonish agents with big eyes and smiles, glowing particles, emotional reward, premium yet approachable, high contrast, subtle depth shadows, modern sans-serif typography"
