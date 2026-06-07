# ⚠️ Security Audit — apifenylabs GitHub Organization
**Date:** 2026-06-07 (08:44 HKT)
**Scope:** All 8 public repos
**Findings:** 3 critical secret exposures identified

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 2 |
| 🟡 Medium | 1 |
| 🟢 Clean | 5 |

---

## 🔴 CRITICAL FINDINGS

### Finding 1: `habit-tracker/setup-database.js` — LIVE Supabase Service Role Key

| Field | Value |
|-------|-------|
| **Repo** | habit-tracker |
| **File** | `setup-database.js` (L73) |
| **Secret Type** | Supabase **service_role** key (full admin/privileged access) |
| **Supabase URL** | `https://llnflvnjinavbtqadgyu.supabase.co` |
| **Key (truncated)** | `eyJhbGciOiJIUzI1NiIs...0wL1fWdm3jWHVqF1apvGnYuGKniFUbE7LqFOxwrwW54` |
| **Decoded Claims** | Issuer: supabase, Project: `llnflvnjinavbtqadgyu`, Role: **service_role**, Issued: 2026-04-22, Expires: 2036-04-18 |
| **Risk** | **CRITICAL** — service_role bypasses ALL Row-Level Security (RLS). Anyone with this key can read/write/delete any data in the entire Supabase database. Key is valid until April 2036. |
| **Root cause** | Script was checked in with hardcoded credentials instead of `process.env.SUPABASE_SERVICE_KEY` |
| **Status** | 🔴 **ACTION REQUIRED — Rotate immediately** |

This key is used in `setup-database.js` to programmatically create tables, enable extensions, and set up RLS policies. Because it uses `supabase.rpc('exec_sql', ...)`, it can execute **arbitrary SQL** on the database.

### Finding 2: `nudge-app/.env.example` — LIVE Supabase Anon Key + Affiliate IDs

| Field | Value |
|-------|-------|
| **Repo** | nudge-app |
| **File** | `.env.example` |
| **Secret Type** | Supabase **anon key** + multiple **affiliate program IDs** |
| **Supabase URL** | `https://yrvnkepndpjmlrewecro.supabase.co` |
| **Anon Key (full)** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlydm5rZXBuZHBqbWxyZXdlY3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5ODg0NDksImV4cCI6MjA5MzU2NDQ0OX0.4UKMB9Y20LX77IOPksYELbF3G7YtBQv51kGJhCDxwdM` |
| **Live Affiliate IDs** | Klook: `38VWJMX`, Viator: `455806`, Booking.com: `2875669` |
| **Risk** | **MEDIUM-HIGH** — Anon key is meant to be public (client-side), but `.env.example` is supposed to be **template** with placeholders. Actual affiliate IDs are an active revenue leak. |
| **Status** | 🟡 **Rotate anon key. Revoke/replace affiliate IDs.** |

The `.env.example` file contains **actual live credentials** instead of placeholder values like `your-project.supabase.co` and `sk-xxx`. This means:
- Anyone cloning the repo gets a working Supabase connection
- Anon key can interact with your Supabase project's RLS-protected endpoints
- Affiliate IDs (Klook 38VWJMX, Viator 455806, Booking 2875669) are exposed — anyone can inject these into their own sites to earn commissions on your accounts (or you risk commission clawback if terms prohibit public ID disclosure)
- Legacy key `NEXT_PUBLIC_BOOKING_AFFILIATE_ID=2875669` is also exposed

### Finding 3: `nudge-app/.env.example` — Exposed Mapbox/PostHog/GA Variables

| Field | Value |
|-------|-------|
| **Repo** | nudge-app |
| **File** | `.env.example` |
| **Secret Type** | Empty/pre-filled config variables |
| **Risk** | 🟢 **Low** — Mapbox, GA, PostHog vars are empty |
| **Status** | ✅ No actual values set |

---

## 🟢 CLEAN REPOS (No secrets found)

| Repo | Notes |
|------|-------|
| **omni-mind** | TypeScript OpenClaw plugin package — only JSON/TS config files, no secrets |
| **omnimind** | TypeScript OpenClaw plugin package with docs/tests — no secrets |
| **senior-friendly-travel-asia** | Next.js travel site — `.env.example` uses proper placeholders (`your-project.supabase.co`, `sk-xxx`) |
| **affiliate-tracking** | Next.js starter template (create-next-app) — only boilerplate, no `.env` files |
| **kidscan-api** | Next.js starter with Supabase dependency — `.env.example` not present, no secrets |
| **social-beast-components** | Next.js starter template — only boilerplate, no `.env` files |

---

## Details by Repo

### 1. `nudge-app` (Family Travel Directory)
- **Root files checked:** 15+ files including `.env.example`, `AFFILIATE_SETUP.md`, `DEPLOYMENT.md`, `LAUNCH_CHECKLIST.md`, `AGENTS.md`, `CEO.md`, `CHECK_DEPLOYMENT_STATUS.md`, `HEARTBEAT.md`, `HEARTBEAT_RD.md`, `IDENTITY.md`, `CONTINUOUS_WORKFLOW.md`, `DATA_EXPANSION_PLAN.md`, `15m_scalp_test.py`, `15m_scalp_results.md`, `.openclaw/workspace-state.json`
- **Secrets found:** Supabase anon key + URL, 3 affiliate IDs (Klook, Viator, Booking.com)
- **Commit history:** Last commits (Jun 5-6, 2026) — blog content additions, changelog pages. No API keys visible in commit messages.

### 2. `habit-tracker` (HabitFlow)
- **Root files checked:** `setup-database.js`, `supabase-schema.sql`, `README.md`, `package.json`, `.gitignore`, `AGENTS.md`
- **Secrets found:** 🔴 **LIVE Supabase service_role key** (full admin access, valid until 2036)
- **Note:** `setup-database.js` should use env vars. Git history was not auditable due to API rate limiting.

### 3. `omni-mind` (separate hyphenated name)
- **Description:** OpenClaw plugin (TypeScript package)
- **Files:** Only `.gitignore`, `README.md`, `openclaw.plugin.json`, `package.json`, `tsconfig.json`, `src/`
- **No secrets found.**

### 4. `omnimind` (no hyphen)
- **Description:** OpenClaw plugin (TypeScript package) with docs/tests
- **Files:** Only `.gitignore`, `README.md`, `openclaw.plugin.json`, `package.json`, `tsconfig.json`, `vitest.config.ts`, `src/`, `docs/`, `tests/`, `types/`
- **No secrets found.**

### 5. `senior-friendly-travel-asia`
- **Description:** Next.js travel directory
- **Files:** Standard Next.js project + `.env.example` (with proper placeholders), `AFFILIATE_SETUP.md`, `TRIGGER.md`, `work-engine-state.md`
- **No secrets found.** Template is clean.

### 6. `affiliate-tracking`
- **Description:** Next.js starter (create-next-app)
- **No `.env` files present. No secrets.**

### 7. `kidscan-api`
- **Description:** Next.js starter with Supabase SDK listed as dependency
- **No `.env` files present. No secrets found in root.**

### 8. `social-beast-components`
- **Description:** Next.js starter (create-next-app)
- **No `.env` files present. No secrets.**

---

## Immediate Actions Required

1. 🔴 **Rotate Supabase service_role key for project `llnflvnjinavbtqadgyu`**
   - Go to Supabase dashboard → Project Settings → API → Service Role Key → Regenerate
   - Update the key in Vercel env vars
   - Remove from `setup-database.js` — use `process.env.SUPABASE_SERVICE_KEY`

2. 🟡 **Rotate Supabase anon key for project `yrvnkepndpjmlrewecro`**
   - Go to Supabase dashboard → Project Settings → API → Anon Key → Regenerate
   - Update the key in workflow/scripts
   - Replace `.env.example` with placeholder value

3. 🟡 **Revoke exposed affiliate IDs** (Klook 38VWJMX, Viator 455806, Booking 2875669)
   - Contact each affiliate program to request new IDs
   - Update the env vars in Vercel

4. 🔴 **Remove hardcoded secrets from `habit-tracker/setup-database.js`**
   - Replace line 3-4 with `process.env.SUPABASE_URL` and `process.env.SUPABASE_SERVICE_KEY`
   - Git force-push to wipe history

5. 🟡 **Fix `nudge-app/.env.example`**
   - Replace live URLs with `https://your-project.supabase.co`
   - Replace anon key with placeholder `***`
   - Replace affiliate IDs with placeholders like `klk_xxx`

---

## Methodology

- Audited via GitHub raw content API (`raw.githubusercontent.com`) and REST API
- Scanned for: `sk-`, `ghp_`, `gho_`, `ghu_`, `ghs_`, `supabase`, `service_role`, `api_key`, `token`, `password`, `credential`, JWT patterns
- File types inspected: `.sh`, `.py`, `.js`, `.md`, `.env.*`, `.json`, `.sql`, `.ts`
- Commit messages reviewed for keywords
- Note: Git history depth check was limited by GitHub unauthenticated API rate limiting (60 req/hr)
