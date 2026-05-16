# Deployment — Infrastructure Lessons

## Vercel
- **Tokens expire** — Vercel OAuth tokens don't persist across sessions
- **Always use long-lived tokens** for automated CI/CD deploys
- `vercel login` requires browser OAuth — can't be fully automated without a token
- `VERCEL_TOKEN` env var is the way to go for scripted deploys
- Deployment command: `vercel --prod --token=$VERCEL_TOKEN`

## DNS
- **Propagation:** 5-30 minutes typically
- Some DNS providers take up to 48 hours for initial setup
- Always verify with `dig` or `curl -I` after changes

## Custom Domains
- Add domain in Vercel project settings → Domains
- Update DNS A record or CNAME as Vercel instructs
- SSL cert auto-provisions (Let's Encrypt) within minutes

## Build Process
- Next.js SSG generates static pages at build time
- Dynamic routes (`/[slug]`) with `generateStaticParams` pre-render at build
- Server-rendered routes (ƒ) are fine for API endpoints but add cold start latency

## Site URLs
| Site | Domain | Vercel Project |
|------|--------|----------------|
| Apifeny AI | apifeny-ai.vercel.app | apifeny-ai |
| Family Travel | familytravelasia.com | family-travel-asia |
| Luxury Travel | luxury-family-travel-asia.vercel.app | luxury-family-travel-asia |
| EV Charging | ev-charging-asia.vercel.app | ev-charging-asia |
| Nudge | nudge-sigma-liart.vercel.app | nudge |
| AI Cofounder | ai-cofounder-private.vercel.app | ai-cofounder |
| Senior Travel | senior-friendly-travel.vercel.app | senior-friendly-travel |
