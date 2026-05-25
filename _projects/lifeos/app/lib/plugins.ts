/**
 * LifeOS Plugin Engine
 *
 * A plugin system mapping life categories to guided phases — inspired by
 * aicofounder's phase-based approach but generalized for ALL life domains.
 *
 * Categories match the Apifeny AI sites portfolio:
 *   - Family / Travel / Luxury Travel / EV / Senior / Kids / Social / Finance / Health
 *
 * Each plugin has:
 *   - guided phases (research → canvas → build → ship → maintain)
 *   - phase score tracking
 *   - task generation
 *   - persistence to localStorage + Supabase (dual-write)
 *
 * PERSISTENCE STRATEGY:
 *   1. On load: try Supabase first, fall back to localStorage
 *   2. On write: write to both (localStorage is instant, Supabase is async)
 *   3. Sync callback lets UI connect server persistence
 */

export type LifeCategory =
  | 'family'
  | 'travel'
  | 'luxury-travel'
  | 'ev'
  | 'senior'
  | 'kids'
  | 'social'
  | 'finance'
  | 'health'
  | 'career'
  | 'learning'
  | 'fitness';

export type PluginPhase = 'research' | 'canvas' | 'build' | 'ship' | 'maintain';

export interface PhaseState {
  phase: PluginPhase;
  completed: boolean;
  progress: number; // 0–100
  tasks: PhaseTask[];
}

export interface PhaseTask {
  id: string;
  label: string;
  done: boolean;
  description: string;
  agentTrigger?: string;
}

export interface LifeOSPlugin {
  id: string;
  category: LifeCategory;
  name: string;
  emoji: string;
  description: string;
  color: string;
  phases: PhaseState[];
  overallProgress: number;
  lastActiveAt: string;
  createdAt: string;
}

export interface LifeOSState {
  plugins: LifeOSPlugin[];
  totalActions: number;
  unlockedCategories: LifeCategory[];
}

const STORAGE_KEY = 'titan-lifeos-state';
const SYNC_KEY = 'titan-lifeos-last-sync';

// ─── Plugin Definitions ────────────────────────────────────────────────

const ALL_CATEGORIES: { category: LifeCategory; name: string; emoji: string; description: string; color: string; phases: { phase: PluginPhase; tasks: { label: string; description: string; }[] }[] }[] = [
  {
    category: 'family',
    name: 'Family OS',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Calendar sync, chore tracking, meal planning, communication hub',
    color: '#F43F5E',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Map family routines', description: 'Document daily/weekly schedules for all members' },
        { label: 'Identify pain points', description: 'What causes friction? School runs? Meals? Coordination?' },
        { label: 'Survey members', description: 'Quick poll on what everyone wants from Family OS' },
        { label: 'Analyze communication gaps', description: 'Review how family shares info — group chat, whiteboard, or carrier pigeon' },
        { label: 'Research family tech stack', description: 'Explore calendar, chore, and meal apps currently in use' },
        { label: 'Set success metrics', description: 'Define what a win looks like: less yelling, fewer missed events, more togetherness' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design shared calendar', description: 'Color-coded events, notifications, auto-sync' },
        { label: 'Build chore board', description: 'Assign, rotate, reward system' },
        { label: 'Plan meal schedule', description: 'Weekly meal planner with grocery list export' },
        { label: 'Create communication hub', description: 'Central place for notes, reminders, and family announcements' },
        { label: 'Design rewards system', description: 'Points, privileges, or pocket money tied to chore completion' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Connect calendars', description: 'Google Calendar + iCal sync integration' },
        { label: 'Deploy chore tracker', description: 'Live dashboard with completion badges' },
        { label: 'Launch meal planner', description: 'Recipe suggestions + shopping list generator' },
        { label: 'Set up notification rules', description: 'Who gets alerted for what — avoid notification fatigue' },
        { label: 'Build weekly digest', description: 'Auto-generated summary of upcoming events and outstanding chores' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Invite family members', description: 'Share access with unique invite links' },
        { label: 'Run 7-day trial', description: 'Track engagement and iterate on feedback' },
        { label: 'Go live', description: 'Push to production, announce to household' },
        { label: 'Host family onboarding session', description: 'Walk through each feature together as a group' },
        { label: 'Collect initial feedback', description: 'First impressions, complaints, wishlist items in week one' },
        { label: 'Triage and patch', description: 'Fix top 3 friction points before the trial ends' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly review', description: 'Check adoption metrics and member satisfaction' },
        { label: 'Iterate features', description: 'Add one new feature per sprint based on feedback' },
        { label: 'Monthly family retro', description: 'Gather around and ask: what should we change in our Family OS?' },
        { label: 'Rotate chore assignments', description: 'Shuffle responsibilities to keep things fair and fresh' },
        { label: 'Review calendar hygiene', description: 'Prune stale events, update recurring entries, fix timezone issues' },
      ]},
    ],
  },
  {
    category: 'travel',
    name: 'Travel OS',
    emoji: '✈️',
    description: 'Trip planning, itinerary builder, budget tracker, destination research',
    color: '#14B8A6',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Set destination criteria', description: 'Budget, season, interests, group size' },
        { label: 'Scan deals & hidden gems', description: 'AI-search for best-value destinations' },
        { label: 'Read community reviews', description: 'Aggregate Reddit/TripAdvisor insights' },
        { label: 'Compare travel windows', description: 'Best months, weather patterns, peak vs off-peak trade-offs' },
        { label: 'Check entry requirements', description: 'Visa timelines, passport validity, vaccination rules' },
        { label: 'Research local transport', description: 'Rental cars, trains, rideshares — what makes sense on the ground' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Build day-by-day itinerary', description: 'Map out each day with time blocks' },
        { label: 'Estimate budget', description: 'Flights, accommodation, food, activities' },
        { label: 'Mark must-see spots', description: 'Pin top attractions with notes' },
        { label: 'Plan buffer days', description: 'Unscheduled days for spontaneity and rest' },
        { label: 'Design backup scenarios', description: 'Rain plans, flight delay contingencies, alternate routes' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Book flights & hotels', description: 'Compare and lock in best prices' },
        { label: 'Create offline guide', description: 'Export maps, translations, emergency info' },
        { label: 'Set up alerts', description: 'Price drops, weather changes, travel advisories' },
        { label: 'Book activities and tours', description: 'Reserve tickets for top attractions before they sell out' },
        { label: 'Arrange travel insurance', description: 'Compare policies for medical, cancellation, and baggage cover' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Share trip plan', description: 'Send itinerary to travel group' },
        { label: 'Final checks', description: 'Passport, visas, insurance, vaccinations' },
        { label: 'Pack smart', description: 'AI-generated packing list based on destination' },
        { label: 'Check-in online', description: 'Save time at the airport — seats, boarding passes, luggage tags' },
        { label: 'Notify bank and phone carrier', description: 'Avoid blocked cards and roaming surprises abroad' },
        { label: 'Download offline essentials', description: 'Maps, translations, boarding passes, hotel confirmations' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Post-trip review', description: 'Document what worked, what to skip next time' },
        { label: 'Update saved spots', description: 'Archive visited places, add new discoveries' },
        { label: 'Submit travel expenses', description: 'Log receipts, reconcile budget vs actual spend' },
        { label: 'Archive trip docs', description: 'Store itineraries, tickets, and photos in a searchable folder' },
        { label: 'Write recommendation notes', description: 'Record tips for friends and future self about this destination' },
      ]},
    ],
  },
  {
    category: 'luxury-travel',
    name: 'Luxury OS',
    emoji: '💎',
    description: 'VIP experiences, concierge booking, exclusive access, premium itineraries',
    color: '#F59E0B',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Define luxury criteria', description: 'Private guides, 5-star, exclusive access' },
        { label: 'Discover VIP experiences', description: 'Behind-the-scenes, private tours, Michelin' },
        { label: 'Compare elite services', description: 'Concierge apps, butlers, private jets' },
        { label: 'Research season and availability', description: 'Check peak luxury season, limited-availability events, and booking windows' },
        { label: 'Read luxury travel reviews', description: 'Focus on high-end forums, Virtuoso, Forbes Travel Guide ratings' },
        { label: 'Identify loyalty programs', description: 'Marriott Bonvoy, Hilton Diamond, airline status — stack the benefits' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design dream itinerary', description: 'Full-day VIP schedule with downtime' },
        { label: 'Plan upgrade path', description: 'Room upgrades, airport transfers, priority access' },
        { label: 'Budget premium', description: 'Allocate for splurge moments' },
        { label: 'Map VIP lounge access', description: 'Airport lounges, hotel clubs, private arrival halls' },
        { label: 'Design dining schedule', description: 'Michelin-star reservations, private chef options, wine pairings' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Contact concierge', description: 'Brief them on preferences and requirements' },
        { label: 'Book exclusive experiences', description: 'Private dinners, helicopter tours, spa days' },
        { label: 'Arrange transportation', description: 'Private driver, charter flights, yacht bookings' },
        { label: 'Secure restaurant reservations', description: 'Book hard-to-get tables months in advance' },
        { label: 'Arrange spa and wellness', description: 'Private sessions, couple treatments, wellness retreat add-ons' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Finalize all bookings', description: 'Confirm every reservation with backup copies' },
        { label: 'Create digital briefcase', description: 'All confirmations, maps, contacts in one place' },
        { label: 'Brief travel companions', description: 'Share schedule and expectations' },
        { label: 'Arrange arrival logistics', description: 'Meet-and-greet, fast-track immigration, luggage handling' },
        { label: 'Brief the hotel concierge', description: 'Send preferences, special requests, and arrival details in advance' },
        { label: 'Pack for luxury', description: 'Dress code checks, formal wear, pool/gym bags for each venue' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Rate every experience', description: 'Document for future reference and recommendations' },
        { label: 'Update concierge profile', description: 'New preferences, favorites, avoided experiences' },
        { label: 'Review loyalty point earnings', description: "Check what posted, what's missing, follow up on missing credits" },
        { label: 'Archive trip highlights', description: 'Photos, reviews, contacts for future luxury trips' },
        { label: 'Write thank-you notes', description: 'Tip and thank key staff — builds relationships for return visits' },
      ]},
    ],
  },
  {
    category: 'ev',
    name: 'EV OS',
    emoji: '⚡',
    description: 'Charging station finder, route planning, battery health, cost tracking',
    color: '#10B981',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Map charging networks', description: 'Locate stations on frequent routes' },
        { label: 'Compare charging speeds', description: 'Level 2 vs DC Fast vs Supercharger' },
        { label: 'Analyze cost per km', description: 'Home charging vs public vs solar' },
        { label: 'Research EV incentives', description: 'Tax credits, rebates, HOV lane access in your region' },
        { label: 'Study battery best practices', description: 'Charge cycles, temperature effects, long-term health tips' },
        { label: 'Compare insurance costs', description: 'EV-specific policies vs standard auto — check the difference' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Plan optimal routes', description: 'Charging stops mapped to real driving patterns' },
        { label: 'Design charging schedule', description: 'Off-peak times, solar alignment, battery care' },
        { label: 'Set budget targets', description: 'Monthly charging cost goal' },
        { label: 'Build road trip plan', description: 'Long-distance routes with reliable charging gaps identified' },
        { label: 'Design backup power plan', description: 'Home battery, generator, or solar for outage scenarios' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Install home charger', description: 'Research incentives, book installation' },
        { label: 'Set up charge tracking', description: 'App + OBD integration for live data' },
        { label: 'Build route library', description: 'Saved routes with known charging stops' },
        { label: 'Download charging apps', description: 'Set up accounts for all major networks in your area' },
        { label: 'Register for fast-charge passes', description: 'Subscription plans or pay-per-use for frequent routes' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Test route planner', description: 'Drive planned routes, verify coverage' },
        { label: 'Configure alerts', description: 'Battery level, charging complete, cost thresholds' },
        { label: 'Share with family', description: 'Give access to shared EV dashboard' },
        { label: 'Run a full charge-to-empty test', description: 'Real-world range at highway speeds — log the results' },
        { label: 'Calibrate home charging timer', description: 'Set departure schedule so battery is ready and preconditioned' },
        { label: 'Test public charging workflow', description: 'Plug in, authenticate, pay, unplug — no surprises on day one' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Monthly efficiency report', description: 'kWh used, cost, miles driven' },
        { label: 'Update station database', description: 'New stations, closed ones, price changes' },
        { label: 'Check tire pressure', description: 'Proper inflation directly affects EV range' },
        { label: 'Run battery health diagnostic', description: 'Use OBD or manufacturer app to check degradation' },
        { label: 'Review charging tariff changes', description: 'Utility rate updates — may need to shift charging schedule' },
      ]},
    ],
  },
  {
    category: 'finance',
    name: 'Finance OS',
    emoji: '💰',
    description: 'Budget tracking, investment monitoring, bill pay, savings goals, credit score',
    color: '#10B981',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Audit current finances', description: 'Income, expenses, debts, assets snapshot' },
        { label: 'Identify savings opportunities', description: 'Subscriptions, fees, interest rates' },
        { label: 'Set financial goals', description: 'Emergency fund, retirement, vacation, investment' },
        { label: 'Check credit score', description: 'Pull free report, flag errors, understand score drivers' },
        { label: 'Review insurance coverage', description: 'Health, auto, home, life — gaps, overlaps, overpayments' },
        { label: 'Analyze spending patterns', description: 'Categorize last 3 months of transactions to find leaks' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design budget categories', description: 'Envelope system or zero-based budgeting' },
        { label: 'Plan debt payoff strategy', description: 'Snowball vs avalanche — pick your method' },
        { label: 'Build investment plan', description: 'Risk tolerance, asset allocation, recurring buys' },
        { label: 'Create emergency fund target', description: '3-6 months of essential expenses — calculate the exact number' },
        { label: 'Design tax optimization strategy', description: 'Retirement accounts, deductions, tax-loss harvesting plan' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Connect accounts', description: 'Bank, credit card, investment, crypto wallets' },
        { label: 'Set up auto-savings', description: 'Automated transfers to savings and investments' },
        { label: 'Configure alerts', description: 'Unusual spending, bill due, goal milestones' },
        { label: 'Set up bill autopay', description: 'Eliminate late fees on recurring bills and subscriptions' },
        { label: 'Create net worth tracker', description: 'Automated asset/liability snapshot updated monthly' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Share progress dashboard', description: 'Monthly net worth view with family/partner' },
        { label: 'Review first month', description: 'Compare actual vs budget, adjust categories' },
        { label: 'Set quarterly review', description: 'Schedule recurring financial health check' },
        { label: 'Fund emergency account', description: 'Transfer initial deposit, set up recurring contributions' },
        { label: 'Make first investment trade', description: 'Execute first recurring buy or lump sum according to plan' },
        { label: 'Cancel unused subscriptions', description: 'Audit and kill everything not actively used in the last 90 days' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Monthly reconciliation', description: 'Categorize uncategorized transactions' },
        { label: 'Quarterly goal review', description: 'Progress check, adjust targets as needed' },
        { label: 'Annual deep audit', description: 'Full financial health scan and optimization' },
        { label: 'Monthly net worth update', description: 'Track asset growth, debt reduction, and savings rate' },
        { label: 'Review and rebalance portfolio', description: 'Check allocation drift, rebalance to target percentages' },
        { label: 'Semi-annual credit check', description: 'Pull reports from all three bureaus, dispute errors' },
      ]},
    ],
  },
  {
    category: 'health',
    name: 'Health OS',
    emoji: '🏥',
    description: 'Medical records, appointment tracking, medication reminders, fitness integration',
    color: '#EC4899',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Compile health history', description: 'Past conditions, surgeries, allergies, medications' },
        { label: 'Map provider network', description: 'Doctors, specialists, dentists, therapists' },
        { label: 'Identify wellness goals', description: 'Weight, sleep, stress, exercise targets' },
        { label: 'Get baseline bloodwork', description: 'Order comprehensive panel — lipids, glucose, vitamins, hormones' },
        { label: 'Review family health history', description: 'Genetic risk factors, hereditary conditions to monitor' },
        { label: 'Log current symptoms', description: 'Document anything bothering you — pain, energy, sleep, digestion' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design health dashboard', description: 'Metrics to track: steps, sleep, HR, blood work' },
        { label: 'Plan appointment schedule', description: 'Annual checkups, screenings, follow-ups' },
        { label: 'Build medication tracker', description: 'Dosage, frequency, refill alerts' },
        { label: 'Create prevention plan', description: 'Screenings by age/gender — mammograms, colonoscopy, skin checks' },
        { label: 'Design stress management routine', description: 'Meditation, breathing exercises, digital detox windows' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Connect wearables', description: 'Apple Health, Fitbit, Oura sync' },
        { label: 'Set up appointment reminders', description: 'Calendar integration + SMS/email alerts' },
        { label: 'Deploy medication alerts', description: 'Push notifications at scheduled times' },
        { label: 'Create health records vault', description: 'Store lab results, imaging, and summaries in one secure place' },
        { label: 'Build symptom journal', description: 'Quick-log interface for daily mood, pain, energy, and sleep' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Share emergency info', description: 'Medical ID, emergency contacts, allergies' },
        { label: 'Run 30-day wellness challenge', description: 'Track progress on one key metric' },
        { label: 'Schedule first deep review', description: 'Full health audit with provider data' },
        { label: 'Book overdue screenings', description: 'Schedule everything you flagged in the prevention plan' },
        { label: 'Go live with medication routine', description: 'Start using alerts, confirm no doses missed in first week' },
        { label: 'Send records to primary care', description: 'Share compiled history and bloodwork with your doctor' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly health log review', description: 'Check trends, flag anomalies' },
        { label: 'Monthly metric report', description: 'Progress toward wellness goals' },
        { label: 'Quarterly provider check', description: 'Update records, schedule new appointments' },
        { label: 'Monthly supplement review', description: 'Dosage check, expiration dates, refills needed' },
        { label: 'Seasonal wellness reset', description: 'Adjust routines, diet, and supplements for current season' },
        { label: 'Annual biometric screening', description: 'Full workup — blood, pressure, BMI, and provider consultation' },
      ]},
    ],
  },
  {
    category: 'career',
    name: 'Career OS',
    emoji: '💼',
    description: 'Job tracking, skill development, networking, interview prep, goal setting',
    color: '#8B5CF6',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Audit current skills', description: 'Inventory strengths, gaps, and market demand' },
        { label: 'Research target roles', description: 'Job descriptions, salary data, required skills' },
        { label: 'Map career path', description: 'Short-term (6mo) and long-term (3yr) trajectory' },
        { label: 'Analyze industry trends', description: 'Emerging technologies, growing sectors, declining roles' },
        { label: 'Identify target companies', description: 'Top 10 dream companies — culture, growth, comp, remote policy' },
        { label: 'Benchmark salary expectations', description: 'Glassdoor, Levels.fyi, Blind — know your market worth' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Build skill roadmap', description: 'Courses, certifications, projects timeline' },
        { label: 'Design personal brand', description: 'LinkedIn, portfolio, GitHub, resume refresh' },
        { label: 'Plan networking strategy', description: 'Events, cold outreach, referral targets' },
        { label: 'Create content plan', description: 'Articles, talks, or open-source contributions to build authority' },
        { label: 'Design interview prep plan', description: 'Topics, practice schedule, mock interview partners' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Enroll in key courses', description: 'Pick 2-3 highest-ROI skills and start learning' },
        { label: 'Create portfolio projects', description: 'Build something that demonstrates new skills' },
        { label: 'Activate network', description: 'Reach out to 5 people this week' },
        { label: 'Revamp resume and LinkedIn', description: 'Tailor for target roles — keywords, metrics, outcomes' },
        { label: 'Start content streak', description: 'Publish one post, project, or commit per week' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Apply to target roles', description: 'Submit tailored applications to top 5 companies' },
        { label: 'Prepare for interviews', description: 'Mock interviews, STAR stories, technical prep' },
        { label: 'Negotiate offers', description: 'Salary benchmarks, equity evaluation, benefits check' },
        { label: 'Send follow-up notes', description: 'Thank-you emails within 24 hours of each interview' },
        { label: 'Track application pipeline', description: 'Spreadsheet with status, dates, contacts, next steps' },
        { label: 'Ask for referrals', description: 'Reach out to network contacts at target companies' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Monthly skill review', description: 'Track progress, adjust learning plan' },
        { label: 'Quarterly network refresh', description: 'Reconnect with contacts, update relationships' },
        { label: 'Annual career audit', description: 'Revisit goals, check market position' },
        { label: 'Weekly learning time', description: 'Block 2-3 hours for skill development, no exceptions' },
        { label: 'Track wins and impact', description: 'Document achievements and metrics for future reviews' },
        { label: 'Mentor or teach someone', description: 'Solidify knowledge by helping others in your field' },
      ]},
    ],
  },
  {
    category: 'learning',
    name: 'Learning OS',
    emoji: '📚',
    description: 'Course tracking, reading list, skill progress, spaced repetition, knowledge graph',
    color: '#06B6D4',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Define learning goals', description: 'What do you want to be able to DO in 3 months?' },
        { label: 'Curate learning resources', description: 'Books, courses, podcasts, mentors' },
        { label: 'Design curriculum', description: 'Ordered topics with prerequisites mapped' },
        { label: 'Estimate time commitment', description: 'Calculate hours needed vs available — realistic pacing' },
        { label: 'Find learning accountability', description: 'Study buddy, cohort, or public commitment to stay on track' },
        { label: 'Identify assessment criteria', description: "How will you know you've learned it? Tests, projects, reviews" },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Build study schedule', description: 'Daily/weekly time blocks for each topic' },
        { label: 'Set up tracking', description: 'Hours logged, topics completed, retention scores' },
        { label: 'Create project plan', description: 'Build something with each new skill' },
        { label: 'Design review cadence', description: 'Spaced repetition schedule for long-term retention' },
        { label: 'Plan knowledge sharing', description: 'Teach or document as you go — output reinforces input' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Begin core curriculum', description: 'Start with highest-impact topics' },
        { label: 'Implement spaced repetition', description: 'Anki or custom review schedule' },
        { label: 'Start first project', description: 'Apply learning immediately with a real build' },
        { label: 'Set daily minimum bar', description: 'Non-negotiable 20 minutes even on busy days' },
        { label: 'Join a study group or forum', description: 'Learn with others — ask questions, explain concepts' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete first milestone', description: 'Finish course, pass test, ship project' },
        { label: 'Share knowledge', description: 'Write a post, give a talk, mentor someone' },
        { label: 'Get feedback', description: 'Review work with peers or experts' },
        { label: 'Update portfolio and resume', description: 'Add new skills, projects, and certifications' },
        { label: 'Celebrate the milestone', description: 'Acknowledge the effort — rewards reinforce the habit' },
        { label: 'Set next learning goal', description: 'Plan the next topic before momentum fades' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly review', description: 'Recall key concepts, update knowledge graph' },
        { label: 'Monthly deep dive', description: 'Pick one topic for deeper exploration' },
        { label: 'Quarterly curriculum update', description: 'Add new topics, remove mastered ones' },
        { label: 'Practice interleaving', description: 'Mix related topics in review sessions to strengthen connections' },
        { label: 'Track learning velocity', description: 'Topics completed, hours invested, retention scores over time' },
        { label: 'Refresh foundational knowledge', description: 'Revisit core concepts to prevent decay of earlier material' },
      ]},
    ],
  },
  {
    category: 'fitness',
    name: 'Fitness OS',
    emoji: '💪',
    description: 'Workout tracking, nutrition planning, progress photos, habit streaks, recovery',
    color: '#22C55E',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Assess current fitness', description: 'Measurements, baseline lifts, cardio capacity' },
        { label: 'Define transformation goals', description: 'Strength, physique, endurance, flexibility' },
        { label: 'Research optimal protocols', description: 'Programs, diets, recovery methods for goals' },
        { label: 'Check movement patterns', description: 'Identify imbalances, mobility issues, or injury risks' },
        { label: 'Test recovery baseline', description: 'Sleep quality, stress levels, resting heart rate, HRV' },
        { label: 'Read credible fitness sources', description: 'Peer-reviewed studies, proven coaches — skip the bro science' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design workout split', description: 'Push/pull/legs, PPL, or full body schedule' },
        { label: 'Plan nutrition', description: 'Macros, meal prep, supplement stack' },
        { label: 'Build habit stack', description: 'Morning routine, workout triggers, recovery rituals' },
        { label: 'Design progressive overload plan', description: 'Weight, reps, or volume increases week over week' },
        { label: 'Create recovery protocol', description: 'Sleep targets, rest days, mobility work, deload weeks' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up tracking system', description: 'App, spreadsheet, or journal for daily logs' },
        { label: 'Prep first week', description: 'Meal prep, gym bag ready, schedule confirmed' },
        { label: 'Find accountability', description: 'Training partner, coach, or public commitment' },
        { label: 'Stock supplements', description: 'Protein, creatine, pre-workout — buy in advance' },
        { label: 'Schedule rest and recovery', description: 'Block rest days, plan sleep schedule, book massages if needed' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete 30-day streak', description: 'First major milestone — consistency above intensity' },
        { label: 'Take progress photos', description: 'Document transformation for motivation' },
        { label: 'Adjust based on results', description: 'Review what worked, tweak where stalled' },
        { label: 'Share journey publicly', description: 'Post update on social or with friends — strengthens commitment' },
        { label: 'Test one rep max', description: 'Measure actual progress on compound lifts' },
        { label: 'Run body composition scan', description: 'DEXA, calipers, or bioimpedance for objective data' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly progress check', description: 'Review logs, adjust plan as needed' },
        { label: 'Monthly transformation review', description: 'Compare photos, measurements, strength gains' },
        { label: 'Quarterly program switch', description: 'Periodize — new program to avoid plateau' },
        { label: 'Monthly deload assessment', description: 'Check fatigue levels, schedule deload if stalled or overtrained' },
        { label: 'Track habit consistency', description: 'Streak count, adherence rate — identify weak links' },
        { label: 'Seasonal goal reset', description: 'Set new 12-week goals aligned with current progress and priorities' },
      ]},
    ],
  },
];

// ─── Plugin Engine ─────────────────────────────────────────────────────

/**
 * Runtime sync target — set by LifeOSTab on mount if Supabase is available.
 * When true, all writes also go to Supabase.
 */
export let supabaseSyncEnabled = false;

/** Callback set by LifeOSTab to trigger server writes */
export let onServerSync: ((plugin: LifeOSPlugin, action: 'upsert' | 'complete_task', detail?: string) => void) | null = null;

export function enableSupabaseSync() {
  supabaseSyncEnabled = true;
}

export function setSyncCallback(fn: typeof onServerSync) {
  onServerSync = fn;
}

export function loadState(): LifeOSState {
  if (typeof window === 'undefined') return { plugins: [], totalActions: 0, unlockedCategories: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { plugins: [], totalActions: 0, unlockedCategories: [] };
}

/**
 * Save to localStorage (always) and Supabase (if enabled).
 * Server sync is fire-and-forget — never blocks UI.
 */
export function saveState(state: LifeOSState, changedPlugin?: LifeOSPlugin) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}

  // Dual-write to Supabase if enabled
  if (supabaseSyncEnabled && changedPlugin && onServerSync) {
    onServerSync(changedPlugin, 'upsert');
  }
}

export function getPlugin(category: LifeCategory): LifeOSPlugin | undefined {
  const state = loadState();
  return state.plugins.find(p => p.category === category);
}

export function getAllPlugins(): LifeOSPlugin[] {
  const state = loadState();
  return state.plugins;
}

export function getTotalActions(): number {
  return loadState().totalActions;
}

export function activatePlugin(category: LifeCategory): LifeOSPlugin {
  const state = loadState();

  // Check if already active
  const existing = state.plugins.find(p => p.category === category);
  if (existing) return existing;

  // Find definition
  const def = ALL_CATEGORIES.find(c => c.category === category);
  if (!def) throw new Error(`Unknown category: ${category}`);

  // Build fresh plugin
  const plugin: LifeOSPlugin = {
    id: `lifeos-${category}-${Date.now()}`,
    category,
    name: def.name,
    emoji: def.emoji,
    description: def.description,
    color: def.color,
    phases: def.phases.map(p => ({
      phase: p.phase,
      completed: false,
      progress: 0,
      tasks: p.tasks.map(t => ({
        id: `task-${category}-${p.phase}-${t.label.toLowerCase().replace(/\s+/g, '-')}`,
        label: t.label,
        done: false,
        description: t.description,
      })),
    })),
    overallProgress: 0,
    lastActiveAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  state.plugins.push(plugin);
  if (!state.unlockedCategories.includes(category)) {
    state.unlockedCategories.push(category);
  }
  saveState(state, plugin);

  return plugin;
}

export function completeTask(category: LifeCategory, phaseName: PluginPhase, taskId: string): LifeOSPlugin | null {
  const state = loadState();
  const plugin = state.plugins.find(p => p.category === category);
  if (!plugin) return null;

  const phase = plugin.phases.find(p => p.phase === phaseName);
  if (!phase) return null;

  const task = phase.tasks.find(t => t.id === taskId);
  if (!task || task.done) return plugin;

  task.done = true;
  state.totalActions += 1;

  // Recalculate phase progress
  const doneCount = phase.tasks.filter(t => t.done).length;
  phase.progress = Math.round((doneCount / phase.tasks.length) * 100);
  phase.completed = phase.progress >= 100;

  // Recalculate overall plugin progress
  const allTasks = plugin.phases.flatMap(p => p.tasks);
  const allDone = allTasks.filter(t => t.done).length;
  plugin.overallProgress = Math.round((allDone / allTasks.length) * 100);
  plugin.lastActiveAt = new Date().toISOString();

  // Auto-mark subsequent phases when a phase completes
  if (phase.completed) {
    const phaseIndex = plugin.phases.findIndex(p => p.phase === phaseName);
    if (phaseIndex < plugin.phases.length - 1) {
      plugin.phases[phaseIndex + 1].tasks.forEach(t => {
        // First task of next phase is suggested but not forced
      });
    }
  }

  saveState(state, plugin);

  // Log action to Supabase
  if (supabaseSyncEnabled && onServerSync) {
    onServerSync(plugin, 'complete_task', task.label);
  }

  return plugin;
}

export function getPhaseTasks(category: LifeCategory, phaseName: PluginPhase): PhaseTask[] {
  const state = loadState();
  const plugin = state.plugins.find(p => p.category === category);
  if (!plugin) return [];
  const phase = plugin.phases.find(p => p.phase === phaseName);
  if (!phase) return [];
  return phase.tasks;
}

export function getAvailableCategories(): typeof ALL_CATEGORIES {
  return ALL_CATEGORIES;
}

export function getDownloadsCount(): number {
  const state = loadState();
  return state.plugins.length;
}
