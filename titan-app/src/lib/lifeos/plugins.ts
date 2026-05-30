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
  | 'fitness'
  | 'business'
  | 'home'
  | 'relationships'
  | 'mindfulness'
  | 'spirituality'
  | 'hobbies';

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
    category: 'kids',
    name: 'Kids OS',
    emoji: '🧒',
    description: 'Activity tracking, screen time management, education milestones, family coordination',
    color: '#F97316',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Map daily routines', description: 'School, meals, activities, bedtime — full snapshot' },
        { label: 'Identify growth areas', description: 'Academic, social, physical, emotional development' },
        { label: 'Research enrichment options', description: 'Classes, sports, camps, tutors in your area' },
        { label: 'Log health baselines', description: 'Immunizations, growth charts, vision/dental checks' },
        { label: 'Screen time audit', description: 'Current device usage, app habits, content consumption patterns' },
        { label: 'Talk to teachers', description: 'Get feedback from school on progress and challenges' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design schedule framework', description: 'School + activities + free time + sleep balance' },
        { label: 'Build reward system', description: 'Star charts, privileges, or allowance tied to habits' },
        { label: 'Plan learning roadmap', description: 'Subjects to focus on, resources, tutoring schedule' },
        { label: 'Create screen time policy', description: 'Allowable apps, time limits, device-free zones and hours' },
        { label: 'Design activity rotation', description: 'Mix of physical, creative, academic, and social activities' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up shared calendar', description: 'Color-coded per child — sync with school portals' },
        { label: 'Deploy chore tracker', description: 'Age-appropriate tasks with check-in and rewards' },
        { label: 'Enable screen time controls', description: 'Parental controls, downtime schedules, content filters' },
        { label: 'Create milestone tracker', description: 'Reading levels, math skills, physical achievements' },
        { label: 'Build activity log', description: 'Track extracurriculars, attendance, progress notes' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Introduce system to kids', description: 'Make it fun — explain in terms they understand' },
        { label: 'Run 7-day trial', description: 'Track adherence and adjust difficulty/tasks' },
        { label: 'Go live with daily check-in', description: 'Morning and evening routine with visual progress' },
        { label: 'Host family kickoff', description: 'Pizza and stickers — turn it into an event' },
        { label: 'Collect kid feedback', description: 'What do they like? What feels like a chore? Adjust quickly' },
        { label: 'Notify caregivers', description: 'Grandparents, nannies, other parents — share the system' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly review', description: 'Check progress charts and adjust as kids grow' },
        { label: 'Monthly reward payout', description: 'Deliver on promised rewards — consistency builds trust' },
        { label: 'Quarterly milestone check', description: 'School reports, activity progress, growth metrics' },
        { label: 'Rotate chore assignments', description: 'Keep it fresh — swap responsibilities between kids' },
        { label: 'Plan next enrichment cycle', description: 'New classes, sports seasons, or camps for upcoming months' },
      ]},
    ],
  },
  {
    category: 'senior',
    name: 'Senior OS',
    emoji: '👴',
    description: 'Health monitoring, medication management, social connection, estate planning, mobility',
    color: '#6366F1',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Compile health records', description: 'Medical history, current medications, allergies, specialists' },
        { label: 'Assess daily living needs', description: 'Mobility, meal prep, transportation, housekeeping gaps' },
        { label: 'Review insurance coverage', description: 'Medicare, supplemental, long-term care — check what is covered' },
        { label: 'Evaluate home safety', description: 'Fall risks, bathroom grab bars, lighting, stair hazards' },
        { label: 'Map social support network', description: 'Family nearby, friends, community centers, church groups' },
        { label: 'Check legal documents', description: 'Will, power of attorney, advance directives — are they current?' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design care schedule', description: 'Medication times, check-in calls, appointment calendar' },
        { label: 'Plan home modifications', description: 'Accessibility upgrades — ramps, railings, walk-in shower' },
        { label: 'Build social calendar', description: 'Weekly calls, visits, group activities, hobby time' },
        { label: 'Create emergency plan', description: 'Fall alert, emergency contacts, hospital preferences, neighbor keys' },
        { label: 'Design transportation system', description: 'Family rotation, ride services, senior shuttles, volunteer drivers' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up medication reminders', description: 'Pill organizer + app alerts for every dose' },
        { label: 'Install safety devices', description: 'Grab bars, motion lights, medical alert button, bed alarm' },
        { label: 'Deploy communication hub', description: 'Simple tablet or smart display for video calls and photo sharing' },
        { label: 'Arrange Meals on Wheels or delivery', description: 'Set up regular meal delivery or schedule meal prep service' },
        { label: 'Create document vault', description: 'Secure digital copies of will, insurance, medical directives' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Run 3-day system test', description: 'Medication alerts, communication, transportation — test end-to-end' },
        { label: 'Brief family and caregivers', description: 'Share the plan, emergency contacts, and daily schedule' },
        { label: 'Go live with daily check-in', description: 'Morning call or automated wellness check' },
        { label: 'Introduce to care network', description: 'Doctors, neighbors, community center — make sure everyone is aligned' },
        { label: 'Set up recurring supplies', description: 'Pharmacy auto-refill, grocery delivery, incontinence supplies' },
        { label: 'Triage first week issues', description: 'Address confusion, resistance, or missed steps immediately' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly wellness check', description: 'Quick status: mood, appetite, pain, medication adherence' },
        { label: 'Monthly care review', description: 'Adjust schedule, review new needs, update emergency plan' },
        { label: 'Quarterly medical review', description: 'Check upcoming appointments, review meds with doctor' },
        { label: 'Update legal documents', description: 'Review will, power of attorney annually — update as needed' },
        { label: 'Plan social activities', description: 'Schedule outings, family visits, and community events for the month' },
        { label: 'Evaluate level of care', description: 'Has mobility or cognition changed? Time for more support?' },
      ]},
    ],
  },
  {
    category: 'social',
    name: 'Social OS',
    emoji: '🤝',
    description: 'Relationship management, event planning, community building, networking, gratitude practice',
    color: '#D946EF',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Map your network', description: 'Family, friends, colleagues, mentors, community contacts' },
        { label: 'Audit relationship health', description: 'Who you have not talked to recently? Any strained connections?' },
        { label: 'Identify social goals', description: 'More meetups? Deeper friendships? Professional network growth?' },
        { label: 'Reflect on social energy', description: 'Introvert/extrovert balance — how many events per week feels right?' },
        { label: 'Survey community resources', description: 'Local clubs, events, volunteering, hobby groups, co-working spaces' },
        { label: 'Track your event attendance', description: 'What events did you attend last month? Which were fulfilling?' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design ideal social calendar', description: 'Monthly mix of 1:1s, group hangs, community events, alone time' },
        { label: 'Plan reconnection outreach', description: 'List 10 people to reach out to — schedule messages over 2 weeks' },
        { label: 'Build recurring events', description: 'Weekly game night, monthly dinner club, quarterly gathering' },
        { label: 'Create contact management system', description: 'Notes on interests, gift ideas, last interaction dates' },
        { label: 'Design gratitude routine', description: 'Weekly thank-you note, appreciation check-in, or small gesture' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up contact CRM', description: 'Simple spreadsheet or app with reminders for check-ins' },
        { label: 'Schedule first reconnection batch', description: 'DM, call, or coffee with 3 people this week' },
        { label: 'Launch first recurring event', description: 'Pick a date, invite a group, make it happen' },
        { label: 'Create event templates', description: 'Invite messages, agendas, follow-up sequences for different occasions' },
        { label: 'Build social habit loop', description: 'Daily 5-min check-in, weekly outreach block, monthly gathering rhythm' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete first reconnection wave', description: 'Reach out to all 10 people on your list' },
        { label: 'Host first gathering', description: 'Execute the recurring event — invite, prep, host, reflect' },
        { label: 'Send gratitude messages', description: 'Write 5 genuine thank-you notes to people in your network' },
        { label: 'Collect feedback from friends', description: 'Are you showing up? Do they feel valued? Honest check' },
        { label: 'Declutter social obligations', description: 'Politely decline events that drain you — protect your energy' },
        { label: 'Start a social habit streak', description: '30-day streak of one small daily social action' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly social audit', description: 'Who did you connect with? Any new people? Any neglected?' },
        { label: 'Monthly event review', description: 'Which events were worth the time? What to change next month?' },
        { label: 'Quarterly network expansion', description: 'Meet 3 new people through events, introductions, or online' },
        { label: 'Bi-annual friendship audit', description: 'Strengthen top relationships, gently let go of toxic ones' },
        { label: 'Keep gratitude journal', description: 'Weekly entry on someone who made a difference and why you appreciate them' },
        { label: 'Plan seasonal social highlights', description: 'Holiday party, summer BBQ, annual trip — lock in dates' },
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
  {
    category: 'business',
    name: 'Business OS',
    emoji: '🏢',
    description: 'Company strategy, OKR tracking, team alignment, financial planning, growth systems',
    color: '#8B5CF6',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Audit current operations', description: 'Map all business processes, tools, and workflows — identify bottlenecks' },
        { label: 'Analyze market position', description: 'Competitive landscape, TAM/SAM/SOM, differentiation strategy' },
        { label: 'Review financial health', description: 'Revenue trends, burn rate, profit margins, cash runway' },
        { label: 'Survey team & stakeholders', description: 'Gather feedback on pain points, priorities, and growth ideas' },
        { label: 'Assess tech stack', description: 'Inventory all software subscriptions, integrations, and automation gaps' },
        { label: 'Benchmark KPIs', description: 'Industry benchmarks for key metrics — CAC, LTV, churn, NPS' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Define quarterly OKRs', description: '3-5 objectives with measurable key results per team' },
        { label: 'Design reporting cadence', description: 'Weekly pulse, monthly reviews, quarterly business reviews' },
        { label: 'Build org chart & RACI', description: 'Clear ownership — who decides, who does, who is informed' },
        { label: 'Plan growth initiatives', description: 'Top 3 growth bets for this quarter with resource allocation' },
        { label: 'Design documentation system', description: 'Wiki, playbooks, SOPs — single source of truth' },
        { label: 'Create risk register', description: 'Top 10 business risks with mitigation plans and owners' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up OKR tracking tool', description: 'Configure dashboards for real-time OKR progress visibility' },
        { label: 'Implement dashboards', description: 'Revenue, metrics, and operational dashboards for all teams' },
        { label: 'Deploy documentation hub', description: 'Notion, GitBook, or Confluence — organized and searchable' },
        { label: 'Automate reporting', description: 'Scheduled reports to stakeholders — daily metrics, weekly summaries' },
        { label: 'Integrate tools', description: 'CRM, ERP, project management — connected data flow' },
        { label: 'Build hiring pipeline', description: 'Job descriptions, interview process, onboarding playbook' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Launch Q1 plan', description: 'Publish OKRs, align team, kick off first sprint' },
        { label: 'Run first weekly pulse', description: '15-min all-hands standup with metrics review' },
        { label: 'Publish playbooks', description: 'Core business playbooks available to all team members' },
        { label: 'Go-live with dashboards', description: 'Leadership reviews live dashboards in meetings' },
        { label: 'Onboard team to new systems', description: 'Training sessions for documentation, OKR tool, and dashboards' },
        { label: 'Secure feedback loops', description: 'Anonymous surveys, retro formats — make feedback easy and safe' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly OKR check-in', description: 'Score progress, flag blockers, adjust tactics' },
        { label: 'Monthly financial review', description: 'P&L, balance sheet, cash flow — variance analysis' },
        { label: 'Quarterly strategic reset', description: 'Update strategy, realign OKRs, reprioritize initiatives' },
        { label: 'Annual planning', description: 'Budget, headcount, product roadmap, and growth targets' },
        { label: 'Continuous improvement', description: 'Run retrospectives, identify process improvements, implement changes' },
        { label: 'Review tool ROI', description: 'Quarterly audit of software subscriptions — cut what is not paying off' },
      ]},
    ],
  },
  {
    category: 'home',
    name: 'Home OS',
    emoji: '🏠',
    description: 'Home maintenance, renovation planning, cleaning schedule, utility management, inventory',
    color: '#F97316',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Inspect property condition', description: 'Walk through each room, note repairs, wear, and upgrade opportunities' },
        { label: 'Catalog appliances & systems', description: 'HVAC, water heater, kitchen appliances — age, warranty, service history' },
        { label: 'Review utility usage', description: 'Electricity, water, gas bills — identify savings opportunities' },
        { label: 'Assess storage & space', description: 'Closet, garage, cabinets — declutter opportunities' },
        { label: 'Research service providers', description: 'Plumbers, electricians, cleaners — save vetted contacts' },
        { label: 'Set home budget', description: 'Monthly home upkeep budget — cleaning, repairs, utilities, improvements' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design cleaning schedule', description: 'Daily, weekly, monthly, seasonal cleaning routines' },
        { label: 'Plan renovation roadmap', description: 'Priority-ordered home improvement projects with timeline and budget' },
        { label: 'Create maintenance calendar', description: 'Filter changes, gutter cleaning, pest control — schedule everything' },
        { label: 'Design inventory system', description: 'Track pantry, cleaning supplies, tools — avoid double buying' },
        { label: 'Build emergency plan', description: 'Flood, fire, power outage — supplies, contacts, evacuation routes' },
        { label: 'Plan landscaping', description: 'Garden, lawn, balcony — seasonal planting and maintenance schedule' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up inventory tracker', description: 'App or spreadsheet for home inventory with expiry dates' },
        { label: 'Create digital home file', description: 'Warranties, manuals, receipts, insurance — organized and accessible' },
        { label: 'Build cleaning kit', description: 'Stock all supplies, label containers, create checklist cards' },
        { label: 'Schedule preventive maintenance', description: 'Book HVAC service, water heater flush, dryer vent cleaning' },
        { label: 'Organize smart home', description: 'Smart lights, thermostat, security — configure and automate' },
        { label: 'Create vendor contact list', description: 'Trusted plumber, electrician, handyperson, cleaner — one call away' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Run first deep clean', description: 'Complete full home deep clean following new schedule' },
        { label: 'Complete first maintenance cycle', description: 'All preventive maintenance tasks done for the quarter' },
        { label: 'Organize first renovation project', description: 'Complete first priority home improvement' },
        { label: 'Share home system with household', description: 'Family housemates know cleaning schedule, inventory location, emergency plan' },
        { label: 'Go paperless on utilities', description: 'All bills on autopay, e-statements enabled' },
        { label: 'Set up home boundry system', description: 'Mail sorting station, key hooks, leaving checklist — no more chaos' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly cleaning review', description: 'Check completion, restock supplies, address messes promptly' },
        { label: 'Monthly utility audit', description: 'Review bills, adjust usage, switch providers if better deal exists' },
        { label: 'Seasonal maintenance', description: 'Pre-summer AC check, pre-winter pipe wrap, spring/full cleaning' },
        { label: 'Quarterly inventory check', description: 'Restock supplies, declutter, donate unused items' },
        { label: 'Annual home review', description: 'Full property walkthrough, update renovation roadmap, adjust budgets' },
        { label: 'Update emergency kit', description: 'Check expiry dates on supplies, refresh batteries, review plan with household' },
      ]},
    ],
  },
  {
    category: 'relationships',
    name: 'Relationships OS',
    emoji: '💝',
    description: 'Family connections, friendship tracking, social calendar, gratitude practice, quality time',
    color: '#EC4899',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Map relationship network', description: 'List key people — family, friends, mentors, colleagues — by circle of closeness' },
        { label: 'Audit time investment', description: 'How much quality time are you actually spending on each relationship?' },
        { label: 'Identify gaps', description: 'Neglected connections, unresolved conflicts, missed milestones' },
        { label: 'Reflect on needs', description: 'What do you need from relationships? What do others need from you?' },
        { label: 'Review communication patterns', description: 'Who initiates? Who goes quiet? Are conversations surface or deep?' },
        { label: 'Research relationship frameworks', description: 'Love languages, attachment styles, conflict resolution models' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design connection routine', description: 'Weekly check-ins, monthly quality time, annual traditions' },
        { label: 'Plan meaningful celebrations', description: 'Birthdays, anniversaries, milestones — make them count' },
        { label: 'Create gratitude practice', description: 'Daily or weekly ritual — journal, share, or reflect' },
        { label: 'Build communication rhythm', description: 'Who needs a call, a text, a coffee? Schedule it intentionally' },
        { label: 'Design conflict resolution plan', description: 'Cooling-off protocol, repair conversation template, forgiveness practice' },
        { label: 'Plan relationship investments', description: 'Time, attention, gifts, acts of service — allocate consciously' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up relationship CRM', description: 'Track birthdays, preferences, last contact, important dates' },
        { label: 'Schedule recurring dates', description: 'Partner date nights, friend coffee dates, family dinners' },
        { label: 'Create milestone alerts', description: 'Birthday reminders, anniversary prep, event planning heads-up' },
        { label: 'Build gratitude habit', description: 'App or journal with daily prompts and weekly share option' },
        { label: 'Prepare conversation starters', description: 'Deep questions for quality time — go beyond small talk' },
        { label: 'Set up feedback system', description: 'Safe way to ask: how is our relationship? What can I do better?' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Host first relationship review', description: 'Honest sit-down with self or partner about relationship health' },
        { label: 'Complete 30-day connection streak', description: 'Daily intentional connection — call, note, quality time — for 30 days' },
        { label: 'Reach out to neglected connection', description: 'Message an old friend or distant family member' },
        { label: 'Run a gratitude circle', description: 'Share appreciation verbally with family or close friends' },
        { label: 'Celebrate one milestone well', description: 'Go all out for one birthday, anniversary, or achievement' },
        { label: 'Publish relationship manifesto', description: 'Write down what relationships mean to you and what you commit to' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly connection check', description: 'Review: who did I connect with meaningfully this week?' },
        { label: 'Monthly quality review', description: 'Rate each key relationship on a 1-10 satisfaction scale' },
        { label: 'Quarterly repair check', description: 'Any unresolved tension? Any relationship needing attention?' },
        { label: 'Update relationship CRM', description: 'Keep contact info, preferences, and notes current' },
        { label: 'Annual relationship retreat', description: 'Dedicated time to reflect on all connections and set intentions for the year' },
        { label: 'Practice active listening', description: 'One conversation per week where you only listen — no interrupting, no fixing' },
      ]},
    ],
  },
  {
    category: 'mindfulness',
    name: 'Mindfulness OS',
    emoji: '🧘',
    description: 'Meditation tracking, breathwork, journaling, gratitude, flow state optimization',
    color: '#A855F7',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Assess current mindfulness practice', description: 'How often do you meditate, journal, or practice presence? What gets in the way?' },
        { label: 'Identify stress patterns', description: 'When do you feel most anxious, reactive, or disconnected? Log triggers and contexts' },
        { label: 'Explore meditation styles', description: 'Guided, breath focus, body scan, walking, loving-kindness — what resonates?' },
        { label: 'Audit screen and media diet', description: 'Daily screen time, doomscrolling habits, content consumption — identify drains vs fills' },
        { label: 'Read mindfulness fundamentals', description: 'Pick one book or course on mindfulness science — understand the why' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design daily mindfulness routine', description: 'Morning meditation, midday check-in, evening wind-down — design your rhythm' },
        { label: 'Build journaling framework', description: 'Gratitude log, emotional check-in, free write — pick a format and commit to it' },
        { label: 'Plan breathwork protocol', description: 'Box breathing, 4-7-8, Wim Hof — when and how long for each' },
        { label: 'Create digital boundary system', description: 'App limits, notification schedules, phone-free hours and zones' },
        { label: 'Design flow state triggers', description: 'What conditions help you enter flow? Time of day, environment, music, pre-ritual' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Set up meditation tracker', description: 'App or journal to log sessions, duration, type, and post-meditation state' },
        { label: 'Start daily journal', description: 'Write at least 5 minutes every day for 7 days straight' },
        { label: 'Configure device mindfulness', description: 'Set up focus modes, app timers, and grayscale schedule' },
        { label: 'Build morning ritual', description: 'Design and follow a 10-minute morning stack: breathe, set intention, gratitude' },
        { label: 'Create evening wind-down', description: 'Screen-off 30min before bed, journal, stretch, read — ritualize the transition' },
        { label: 'Establish weekly digital Sabbath', description: 'Designate 4-8 hours per week with no screens' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete 14-day streak', description: 'Daily meditation + journal — 14 consecutive days without a miss' },
        { label: 'Reduce daily screen time by 20%', description: 'Compare week 1 vs week 2 screen time stats' },
        { label: 'Journal through one difficult emotion', description: 'Use journaling framework to process anger, anxiety, or sadness intentionally' },
        { label: 'Practice loving-kindness meditation', description: 'Extend goodwill to yourself, a loved one, a neutral person, and a difficult person' },
        { label: 'Share mindfulness practice with someone', description: 'Invite a friend or partner to meditate together, or teach one technique' },
        { label: 'Host a tech-free evening', description: 'Plan and execute an evening with zero screens — games, conversation, nature, art' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly reflection', description: 'Review journal entries, note patterns, celebrate wins, adjust practice' },
        { label: 'Monthly meditation review', description: 'Total minutes, consistency score, types explored — track progress toward mastery' },
        { label: 'Quarterly digital declutter', description: 'Review app usage, unsubscribe from noise, re-evaluate boundaries' },
        { label: 'Refresh environment', description: 'Declutter meditation space, update playlists, adjust lighting and comfort' },
        { label: 'Learn one new technique', description: 'Every month, try a new meditation style or breathwork pattern' },
        { label: 'Annual mindfulness retreat', description: 'Plan a half-day or full-day silent retreat, solo or with a group' },
      ]},
    ],
  },
  {
    category: 'spirituality',
    name: 'Spirituality OS',
    emoji: '🕊️',
    description: 'Meditation, prayer, gratitude journaling, nature connection, purpose exploration, inner peace',
    color: '#C084FC',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Define what spirituality means to you', description: 'Journal your current beliefs, practices, and what draws you to this path' },
        { label: 'Explore spiritual traditions', description: 'Learn about different approaches — mindfulness, nature-based, religious, philosophical' },
        { label: 'Assess current spiritual practice', description: 'What existing rituals or habits already nurture your inner life? What is missing?' },
        { label: 'Find community or mentor', description: 'Local groups, online communities, teachers, or elders who align with your path' },
        { label: 'Read foundational texts', description: 'Pick one book or scripture from a tradition that resonates and study it deeply' },
        { label: 'Set spiritual intentions', description: 'What do you seek? Peace, purpose, connection, transcendence? Write your north star' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design daily spiritual ritual', description: 'Morning prayer/meditation, midday gratitude, evening reflection — design your rhythm' },
        { label: 'Create gratitude practice', description: 'Daily gratitude list, thank-you letters, appreciation walks — make it a habit' },
        { label: 'Build nature connection plan', description: 'Weekly time outdoors, nature walks, stargazing, gardening — reconnect with the earth' },
        { label: 'Plan weekly sacred time', description: 'Dedicated screen-free time for reflection, journaling, or quiet contemplation' },
        { label: 'Design personal ritual space', description: 'Create a physical or mental space for practice — altar, corner, playlist, candle' },
        { label: 'Map your purpose pillars', description: 'What gives your life meaning? Health, creativity, service, family, growth? Map them' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Start daily spiritual log', description: '5-minute log each day: mood, gratitude, insights, or prayer' },
        { label: 'Establish morning ritual', description: 'Wake, breathe, set intention, read, journal — a 15-minute morning anchor' },
        { label: 'Create evening wind-down', description: 'Screen-off 30 min before bed, reflect, pray or meditate, thank the day' },
        { label: 'Build nature habit', description: 'Weekly nature immersion — no phone, no music, just presence' },
        { label: 'Join a spiritual group', description: 'Attend at least one group session, service, or circle per month' },
        { label: 'Create gratitude jar or log', description: 'Daily notes of gratitude — visual accumulation over time' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete 30-day practice streak', description: 'Daily spiritual practice of any form — 30 consecutive days' },
        { label: 'Write personal mission statement', description: 'One-page document: your values, purpose, and how you want to show up in the world' },
        { label: 'Share your practice with one person', description: 'Discuss your spiritual journey with a trusted friend, partner, or mentor' },
        { label: 'Host a gratitude circle', description: 'Invite 2-3 people to share what they are grateful for — in person or online' },
        { label: 'Go on a tech-free day', description: '24 hours with no screens — observe how your mind and spirit respond' },
        { label: 'Complete a service act', description: 'Volunteer, help someone in need, or give anonymously — practice selfless service' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly spiritual check-in', description: 'Review practice consistency, insights, struggles — adjust as needed' },
        { label: 'Monthly deep reflection', description: 'Longer journal session: what stirred my soul this month? Where did I feel alive?' },
        { label: 'Quarterly nature retreat', description: 'Half-day or full-day in nature with no agenda — just being' },
        { label: 'Refresh ritual space', description: 'Clean, rearrange, update your physical or digital spiritual space' },
        { label: 'Learn one new spiritual practice', description: 'Try breathwork, chanting, walking meditation, or a new form of prayer' },
        { label: 'Annual spiritual growth review', description: 'Write a year-in-review focused on inner growth, purpose evolution, and next steps' },
      ]},
    ],
  },
  {
    category: 'hobbies',
    name: 'Hobbies OS',
    emoji: '🎨',
    description: 'Creative pursuits, skill building, passion projects, leisure optimization, maker mindset',
    color: '#F472B6',
    phases: [
      { phase: 'research', tasks: [
        { label: 'Inventory current hobbies', description: 'List all hobbies past and present — what lights you up vs what drains you?' },
        { label: 'Identify hobby gaps', description: 'What creative or fun activity have you always wanted to try but never started?' },
        { label: 'Assess time & energy budget', description: 'How much time can you realistically dedicate to hobbies each week?' },
        { label: 'Explore hobby categories', description: 'Creative (art, music, writing), physical (sports, dance, hiking), mental (chess, puzzles, coding), social (board games, clubs)' },
        { label: 'Research starter resources', description: 'YouTube tutorials, community classes, local clubs, online courses — find the on-ramp' },
        { label: 'Find your hobby community', description: 'Reddit, Discord, Meetup, local shops, Facebook groups — surround yourself with enthusiasts' },
      ]},
      { phase: 'canvas', tasks: [
        { label: 'Design hobby rotation schedule', description: 'Rotate between active hobbies to prevent burnout and maintain freshness' },
        { label: 'Plan skill progression path', description: 'Beginner → intermediate → advanced — what milestones matter for each hobby?' },
        { label: 'Create project backlog', description: 'List specific hobby projects you want to try: a painting, a song, a garden, a game' },
        { label: 'Budget for supplies', description: 'Tools, materials, equipment — one-time vs recurring costs per hobby' },
        { label: 'Design hobby space', description: 'Dedicated corner or timeblock for creative pursuit — physical and mental space' },
        { label: 'Plan hobby showcase', description: 'How will you share your work? Gallery, open mic, social media, gift to a friend' },
      ]},
      { phase: 'build', tasks: [
        { label: 'Acquire starter kit', description: 'Buy or borrow the minimum viable set of tools/supplies for your hobby' },
        { label: 'Complete first project', description: 'Finish something small — a sketch, a playlist, a planted pot, a code snippet' },
        { label: 'Join hobby group or class', description: 'Attend first in-person or online session with fellow enthusiasts' },
        { label: 'Set up progress tracker', description: 'Photos, log entries, or a simple checklist to track skill growth' },
        { label: 'Create inspiration board', description: 'Pinterest wall, Notion board, or folder of work that inspires you' },
        { label: 'Establish hobby routine', description: 'Fixed time slot per week for uninterrupted hobby time — protect it fiercely' },
      ]},
      { phase: 'ship', tasks: [
        { label: 'Complete a showcase project', description: 'Finish something you are proud enough to share with others' },
        { label: 'Share work publicly', description: 'Post on social media, show a friend, enter a contest — put it out there' },
        { label: 'Teach someone else', description: 'Teach a beginner the basics of your hobby — teaching deepens mastery' },
        { label: 'Reflect on joy vs pressure', description: 'Is this hobby still fun? Or has it become another chore? Adjust accordingly' },
        { label: 'Host a hobby session', description: 'Invite friends for a crafting night, game session, or jam' },
        { label: 'Expand into advanced territory', description: 'Level up: more complex project, better tools, mentorship or advanced class' },
      ]},
      { phase: 'maintain', tasks: [
        { label: 'Weekly hobby hour', description: 'At least one hour per week dedicated to a creative or fun pursuit' },
        { label: 'Monthly skill check', description: 'Review progress, note plateaus, set next learning goal' },
        { label: 'Rotate hobbies', description: 'Switch primary hobby every season to keep things fresh and cross-pollinate ideas' },
        { label: 'Replenish supplies', description: 'Restock consumables, maintain tools, upgrade equipment when ready' },
        { label: 'Document journey', description: 'Keep a hobby journal or social feed tracking your projects and growth' },
        { label: 'Annual hobby fair', description: 'Showcase all your year\'s projects in one session — celebrate your creative output' },
      ]},
    ],
  },
];

// ─── Plugin Engine

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

function loadState(): LifeOSState {
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
function saveState(state: LifeOSState, changedPlugin?: LifeOSPlugin) {
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
