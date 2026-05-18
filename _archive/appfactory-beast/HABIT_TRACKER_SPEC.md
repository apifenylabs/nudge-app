# AppFactory Beast: Habit Tracker Specification
**Non-Directory App (Respecting NO Duplication Rule)**

## Overview
A beautiful, intuitive habit tracking app with AI-powered insights and social accountability features.

## Why Habit Tracker?
1. **Non-directory:** Respects NO duplication rule
2. **High demand:** Habit tracking is consistently popular
3. **Monetization potential:** Freemium model with subscriptions
4. **Ecosystem synergy:** Can integrate with Nudge for task management
5. **Template potential:** Can be replicated for other behavior-change apps

## Core Features

### 1. Habit Management
- Create habits with custom schedules (daily, weekly, custom)
- Set goals and track streaks
- Visual progress tracking (charts, calendars)
- Reminders and notifications

### 2. AI-Powered Insights
- Pattern recognition (when you're most successful)
- Personalized recommendations
- Motivation based on progress
- Predictive analytics (likelihood of success)

### 3. Social Features
- Share progress (opt-in)
- Join accountability groups
- Compete with friends on streaks
- Celebrate milestones together

### 4. Gamification
- Earn points for consistency
- Unlock achievements
- Level up based on commitment
- Badges for milestones

## User Personas

### 1. Fitness Enthusiast
- Tracks: Workouts, water intake, sleep
- Needs: Integration with fitness apps, progress photos
- Willing to pay: $5-10/month

### 2. Productivity Seeker
- Tracks: Morning routine, deep work sessions, learning
- Needs: Pomodoro integration, focus metrics
- Willing to pay: $8-12/month

### 3. Wellness Focused
- Tracks: Meditation, gratitude, screen time
- Needs: Mindfulness prompts, mood tracking
- Willing to pay: $4-8/month

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts or Chart.js
- **State:** Zustand or React Context
- **Notifications:** OneSignal or Firebase Cloud Messaging

### Backend
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **AI:** OpenAI API for insights
- **Storage:** Supabase Storage for user data
- **Real-time:** Supabase Realtime for live updates

### Mobile
- **PWA:** Installable web app
- **Native:** React Native (future phase)
- **Offline:** Service Workers + IndexedDB

## Database Schema

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  avatar_url TEXT,
  timezone VARCHAR(50),
  subscription_tier VARCHAR(20) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habits
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  frequency VARCHAR(20) CHECK (frequency IN ('daily', 'weekly', 'custom')),
  goal_value INTEGER,
  goal_unit VARCHAR(50),
  color VARCHAR(7) DEFAULT '#3B82F6',
  icon VARCHAR(50) DEFAULT 'check-circle',
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habit Completions
CREATE TABLE habit_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  value DECIMAL(10,2),
  notes TEXT,
  mood INTEGER CHECK (mood >= 1 AND mood <= 5),
  location JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Streaks
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_completed DATE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- AI Insights
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  habit_id UUID REFERENCES habits(id) ON DELETE CASCADE,
  insight_type VARCHAR(50),
  content TEXT,
  confidence_score DECIMAL(3,2),
  is_actionable BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Monetization Strategy

### Free Tier
- Up to 3 habits
- Basic tracking
- 7-day history
- Community features

### Pro Tier: $8/month or $80/year
- Unlimited habits
- Advanced analytics
- AI insights
- Custom reminders
- Data export
- Priority support

### Team Tier: $15/user/month
- Team accountability
- Group challenges
- Admin dashboard
- Custom branding
- API access

## Development Phases

### Phase 1: MVP (2 weeks)
- [ ] User authentication
- [ ] Basic habit creation
- [ ] Daily tracking
- [ ] Streak calculation
- [ ] Simple dashboard

### Phase 2: Core Features (3 weeks)
- [ ] Advanced scheduling
- [ ] Progress charts
- [ ] Reminders
- [ ] Mobile PWA
- [ ] Basic analytics

### Phase 3: AI & Social (3 weeks)
- [ ] AI insights
- [ ] Social features
- [ ] Gamification
- [ ] Notifications
- [ ] Data export

### Phase 4: Monetization (2 weeks)
- [ ] Subscription system
- [ ] Team features
- [ ] Advanced analytics
- [ ] API development

## Integration with Other Orchestras

### With Nudge
- Habit tracking as tasks
- Cross-app reminders
- Shared completion data

### With Social Beast
- Share progress to social media
- Social accountability features
- Content generation from habits

### With Directory Beast
- Location-based habit triggers
- "Family-friendly" habit suggestions
- Integration with family activities

## Competitive Analysis

### Strengths vs Competitors:
1. **Better UI/UX:** Cleaner, more intuitive design
2. **AI Insights:** Competitors lack intelligent recommendations
3. **Social Focus:** Stronger accountability features
4. **Ecosystem:** Integration with other OpenClaw apps
5. **Pricing:** More competitive than Habitica ($5/month)

## Success Metrics

### Acquisition (First 3 Months)
- 1,000 registered users
- 100 daily active users
- 30% week 1 retention

### Engagement (Months 4-6)
- 3+ habits per active user
- 70% weekly completion rate
- 5+ minutes daily usage

### Revenue (Months 7-12)
- 5% conversion to paid
- $500 MRR by month 6
- $2,000 MRR by month 12

## Risks & Mitigation

### Technical Risks
- **Real-time sync:** Use Supabase Realtime
- **Offline support:** Service Workers + IndexedDB
- **Performance:** Optimize database queries, use indexes

### Business Risks
- **Low conversion:** Freemium model, focus on value
- **Competition:** Differentiate with AI and ecosystem
- **User retention:** Gamification, social features

## Next Steps
1. Create Next.js project with Supabase
2. Implement database schema
3. Build authentication and basic habit CRUD
4. Create dashboard with progress tracking
5. Add AI insights using OpenAI
6. Implement subscription system
7. Launch MVP and gather feedback