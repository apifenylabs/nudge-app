# Nudge — Voice-First Family Task Management (PRD v2.0)

## Project Information
```yaml
project: "Nudge"
version: "2.0 (Voice-First PRD)"
date: "2026-04-30"
status: "ACTIVE — Phase 1 building"
build_path: "workspace/nudge/"
live_url: "https://nudge-sigma-liart.vercel.app"
telegram_bot: "@NudgeFamilyBot"
```

## 1. Vision

Nudge is the **voice-first family task management app**. The core insight: parents don't type — they speak. A wife says "remind Jake to take out trash tonight" while cooking dinner. A husband says "I need to pick up milk on the way home" while driving. Nudge captures these fleeting moments and turns them into organized tasks.

**Old Nudge:** Telegram bot → text NLP → task
**New Nudge:** Voice recording (PWA + Telegram) → Whisper transcription → NLP → task + action

## 2. Voice-First Flow

```
User speaks → Microphone records → Whisper API transcribes → NLP parses → Task created + assigned + reminded
```

### Input Channels (Priority Order)

| Channel | Priority | Status |
|---|---|---|
| PWA Voice Recording (Mic button) | #1 | Building now |
| Telegram Voice Message | #2 | Planned |
| WhatsApp Voice Note | #3 | Future |
| Apple Watch / Android Wear | #4 | Future |

### Actions Beyond Task Creation

Voice input should unlock smart actions:
- ✅ Task creation ("Remind Jake to take out trash")
- ✅ Task queries ("What do I have due today?")
- 🚧 Research/Find ("Find family hotels in Tokyo for June")
- 🚧 Weather/Location ("Is it raining tomorrow morning?")
- 🚧 Set timer/alarm ("Remind me to pick up the cake at 3pm")
- 🚧 Family broadcast ("Tell everyone dinner's at 6pm")

## 3. Core Architecture

```
┌─────────────────────┐     ┌──────────────────┐     ┌─────────────┐
│ PWA Mic Button      │────→│ /api/transcribe  │────→│ Whisper API │
│ Telegram Voice Msg  │────→│ (Whisper route)  │     │ (OpenAI)    │
└─────────────────────┘     └──────────────────┘     └─────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐     ┌─────────────┐
                            │ NLP Parser       │────→│ Task Engine │
                            │ (AI/mock parse)  │     │ (Supabase)  │
                            └──────────────────┘     └─────────────┘
                                    │
                                    ▼
                            ┌──────────────────┐
                            │ Push Reminder    │
                            │ (OneSignal/TG)   │
                            └──────────────────┘
```

## 4. Phase 1 Scope (Building NOW)

```yaml
phase_1:
  name: "PWA Voice Input"
  cost_estimate: "$0 (Whisper free tier, existing infra)"
  items:
    - "Whisper API route at /api/transcribe"
    - "Voice record button on dashboard (Quick Actions)"
    - "Voice record button on landing page (hero CTA)"
    - "Transcribed text → NLP parser pipeline"
    - "Visual feedback (recording animation, waveform)"
    - "Voice task history on dashboard"

phase_2:
  name: "Telegram Voice + Stickiness"
  items:
    - "Telegram voice message handler"
    - "Weekly family scorecard (who did what)"
    - "Streaks and achievements"
    - "Morning voice brief ("Good morning! Today you have...")"

phase_3:
  name: "Smart Actions"
  items:
    - "Research support: 'Find family hotels in Tokyo'"
    - "Weather: 'Do I need an umbrella tomorrow?'"
    - "Broadcast: 'Tell everyone dinner at 6pm'"
```

## 5. Stickiness Features (Built-in)

| Feature | Why It Drives Stickiness |
|---|---|
| Voice recording < 3 taps | Removes friction of typing |
| Weekly family scorecard | Gamification, visible contribution |
| Streak tracking | "7 days of remembering" badges |
| Morning voice brief | Daily habit hook |
| Telegram companion | Catches voice memos while driving |
| Smart notification timing | Not too early, not too late |

## 6. Business Model (Unchanged)

```yaml
free_tier:
  features: "Up to 5 tasks/day, 1 family, voice input"
  price: "$0"

pro_tier:
  features: "Unlimited tasks, 3 families, voice actions, scorecards"
  price: "$5/mo"

family_tier:
  features: "Unlimited families, priority support, research actions"
  price: "$9/mo"
```

## 7. Technical Stack

```yaml
frontend: "Next.js 14 (existing PWA)"
voice: "OpenAI Whisper API (free tier: $0.006/min)"
nlp: "Claude 3.5 Haiku / Rule-based mock"
database: "Supabase (exists)"
push: "OneSignal (free: 10k users)"
telegram: "Telegram Bot API (exists)"
hosting: "Vercel Hobby (free)"
```

## 8. Cost to Build Phase 1

| Item | Cost |
|---|---|
| Whisper API (development) | ~$0.10 |
| Development time | ~2 hours |
| Vercel build (free tier) | $0 |
| **Total Phase 1** | **~$0.10** |
