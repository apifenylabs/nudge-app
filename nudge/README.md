# Nudge - Family Task Management

**Say it once. Nudge handles the rest.**

Nudge is a family task management system that uses natural language processing via Telegram to organize household tasks, assign family members, and send smart reminders.

## 🚀 Features

### **Core Features**
- **Natural Language Task Creation** - Message a Telegram bot like you're talking to a person
- **AI-Powered Parsing** - Uses Claude 3.5 Haiku when `ANTHROPIC_API_KEY` is configured, otherwise falls back to rule-based parsing
- **Family Dashboard** - Web dashboard to view and manage all family tasks
- **Clarifying Follow-ups** - Bot asks one follow-up question when key task details are missing
- **Multi-Platform** - Telegram for quick input, Web for management

> Current status on 2026-04-15: Nudge is an **alpha deployment candidate**, not yet fully monetization-ready. Stripe billing is still a gap.

### **Technical Stack**
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: Claude 3.5 Haiku for NLP parsing
- **Messaging**: Telegram Bot API
- **Hosting**: Vercel (Frontend), Supabase (Backend)

## 📁 Project Structure

```
nudge/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   └── telegram/      # Telegram webhook handlers
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── onboarding/        # User onboarding
│   └── layout.tsx         # Root layout
├── components/            # React components
│   └── dashboard/         # Dashboard components
├── lib/                   # Utility libraries
│   ├── supabase.ts        # Supabase client
│   └── nlp-parser.ts      # AI parsing service
├── middleware.ts          # Authentication middleware
└── supabase-schema.sql    # Database schema
```

## 🛠️ Setup & Installation

### **Prerequisites**
- Node.js 18+ and npm
- Supabase account
- Telegram Bot (via @BotFather)
- Anthropic API key (optional, for AI parsing)

### **1. Clone and Install**
```bash
git clone <repository-url>
cd nudge
npm install
```

### **2. Environment Variables**
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

### **3. Database Setup**
1. Create a new Supabase project
2. Run the SQL from `supabase-schema.sql` in the SQL Editor
3. Get your project URL and anon key from Settings > API

### **4. Telegram Bot Setup**
1. Create a bot via @BotFather on Telegram
2. Get your bot token
3. Set webhook (after deployment):
```bash
curl -X POST "https://api.telegram.org/bot{YOUR_TOKEN}/setWebhook?url=https://your-domain.com/api/telegram/webhook&secret_token={YOUR_TELEGRAM_WEBHOOK_SECRET}"
```

### **5. Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Deployment

### **Vercel Deployment (Recommended)**
1. Push code to GitHub
2. Import repository to Vercel
3. Add all environment variables from `.env.example`
4. Deploy!

### **Manual Deployment**
1. Build the project: `npm run build`
2. The output will be in `.next/` directory
3. Deploy to any Node.js hosting service

## 🔧 Configuration

### **Telegram Webhook**
The webhook endpoint is at `/api/telegram/webhook`. Make sure your bot token is set in `TELEGRAM_BOT_TOKEN`.

### **AI Parsing**
By default, Nudge uses rule-based fallback parsing. To enable Claude Haiku parsing:
1. Get an API key from Anthropic
2. Set `ANTHROPIC_API_KEY` in environment variables
3. Set `NEXT_PUBLIC_ENABLE_AI_PARSING=true`

### **Authentication**
Uses Supabase Auth with email/password. Social logins can be added via Supabase dashboard.

## 📊 Database Schema

Key tables:
- `users` - User profiles (extends Supabase auth)
- `families` - Family groups
- `family_members` - Family membership
- `tasks` - Family tasks
- `telegram_messages` - Telegram message logs
- `pending_tasks` - Tasks awaiting clarification

See `supabase-schema.sql` for full schema with RLS policies.

## 🤖 Telegram Bot Commands

- `/start` - Welcome message and setup
- `/help` - Show help and examples
- `/tasks` - View your pending tasks
- `/family` - View family members

**Natural Language Examples:**
- "Remind Jake to take out trash tonight"
- "We need groceries: milk, eggs, bread"
- "Clean garage this weekend"
- "Mom has doctor appointment tomorrow at 2pm"

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- JWT authentication via Supabase
- Environment variables for secrets
- Input validation on all endpoints
- Rate limiting on API routes

## 📈 Monitoring & Analytics

- Telegram message logging
- Task completion analytics
- User activity tracking
- Error logging via console

## 🧪 Testing

```bash
# Run TypeScript type checking
npx tsc --noEmit

# Run ESLint
npm run lint

# Development with hot reload
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

- GitHub Issues for bug reports
- Telegram: @NudgeFamilyBot
- Email: support@your-nudge-domain.com

## 🎯 Roadmap

### **Week 1-2 (MVP)**
- [x] Supabase schema and authentication
- [x] Basic Telegram bot integration
- [x] Family dashboard
- [x] Natural language parsing with fallback mode
- [x] Clarifying follow-up flow for missing task details
- [ ] Task notifications
- [ ] Stripe billing and subscription management

### **Week 3-4**
- [ ] Claude AI integration
- [ ] Recurring tasks
- [ ] Task categories and tags
- [ ] Mobile app (React Native)

### **Future Features**
- [ ] Voice commands
- [ ] Calendar integration
- [ ] Smart shopping lists
- [ ] Child task management
- [ ] Analytics and insights

---

**Built with ❤️ for busy families everywhere.**