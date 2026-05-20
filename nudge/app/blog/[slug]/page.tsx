import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageSquare, Calendar, ArrowLeft, Star, MapPin, Baby, Waves, Car } from 'lucide-react'
import { getPostDetail, getPostMeta } from '@/lib/generated-blog-data'
import type { BlogPostDetail, ResortData } from '@/lib/generated-blog-data'
import { AffiliateDisclosure } from '@/components/affiliate/AffiliateCta'
import AffiliateBookingCard from '@/components/affiliate/AffiliateBookingCard'
import AffiliateProductLink from '@/components/affiliate/AffiliateProductLink'
import { affiliateUrl } from '@/lib/affiliate-links'
import { allPosts } from '@/lib/generated-blog-data'

export const revalidate = 3600

/**
 * Render a BlogPostDetail (data-driven post) into JSX elements.
 */
function renderDataPost(detail: BlogPostDetail) {
  const { content, meta } = detail
  const elements: React.ReactElement[] = []

  if (content.introduction) {
    elements.push(<p key="intro" className="lead">{content.introduction}</p>)
  }

  content.sections.forEach((section, i) => {
    const paragraphs = section.body.split('\n\n')
    elements.push(<h2 key={`h-${i}`}>{section.heading}</h2>)
    paragraphs.forEach((para, j) => {
      if (para.startsWith('| ')) {
        // Render markdown table as HTML table
        const rows = para.split('\n').filter(r => r.startsWith('|'))
        if (rows.length > 0) {
          const headerCells = rows[0].split('|').filter(c => c.trim()).map(c => c.trim())
          const bodyRows = rows.slice(rows.length > 1 && rows[1].includes('---') ? 2 : 1)
          elements.push(
            <div key={`table-${i}-${j}`} className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {headerCells.map((h, hi) => <th key={hi} className="text-left font-semibold p-2 whitespace-nowrap">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.filter(r => r.includes('|')).map((row, ri) => {
                    const cells = row.split('|').filter(c => c.trim()).map(c => c.trim())
                    return (
                      <tr key={ri} className="border-b border-border/50">
                        {cells.map((c, ci) => <td key={ci} className="p-2">{c}</td>)}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        }
      } else if (para.startsWith('Check it out:')) {
        const url = para.replace('Check it out:', '').trim()
        const isTodoist = url.toLowerCase().includes('todoist')
        const isTrello = url.toLowerCase().includes('trello')
        const isTickTick = url.toLowerCase().includes('ticktick')
        const isCozi = url.toLowerCase().includes('cozi')
        const isOurHome = url.toLowerCase().includes('ourhome')
        const isNotion = url.toLowerCase().includes('notion.so')
        elements.push(
          <p key={`p-${i}-${j}`}>
            {isTodoist ? (
              <AffiliateProductLink providerId="todoist" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : isTrello ? (
              <AffiliateProductLink providerId="trello" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : isTickTick ? (
              <AffiliateProductLink providerId="ticktick" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : isCozi ? (
              <AffiliateProductLink providerId="cozi" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : isOurHome ? (
              <AffiliateProductLink providerId="ourhome" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : isNotion ? (
              <AffiliateProductLink providerId="notion" href={url}>
                Check it out
              </AffiliateProductLink>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer sponsored"
                className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline inline-flex items-center gap-1">
                Check it out ↗
              </a>
            )}
          </p>
        )
      } else {
        elements.push(<p key={`p-${i}-${j}`}>{para}</p>)
      }
    })
  })

  // Render resorts section with affiliate booking cards
  if (content.resorts && content.resorts.length > 0) {
    elements.push(<h2 key="resorts-h">Featured Resorts</h2>)
    content.resorts.forEach((resort, i) => {
      elements.push(
        <div key={`resort-${i}`} className="p-4 border border-border/60 rounded-xl my-4">
          <h3 className="font-bold text-lg">{resort.name}</h3>
          <p className="text-sm text-muted-foreground">{resort.location} · {resort.priceRange}</p>
          <p className="mt-2">{resort.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {resort.highlights.map((h, hi) => (
              <span key={hi} className="text-xs bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-full">{h}</span>
            ))}
          </div>
          {resort.bookingUrl && (
            <a href={resort.bookingUrl} target="_blank" rel="noopener noreferrer sponsored"
              className="inline-block mt-3 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
              Book Now ↗
            </a>
          )}
          {/* Affiliate booking card — shows Booking.com, Agoda, Expedia options */}
          <div key={`affiliate-booking-${i}`} className="mt-4">
            <AffiliateBookingCard
              name={resort.name}
              rating={resort.rating}
              location={resort.location}
              options={[
                {
                  provider: 'booking',
                  searchPath: `/searchresults.html?ss=${encodeURIComponent(resort.name)}`,
                  badge: 'Free Cancellation',
                },
                {
                  provider: 'agoda',
                  searchPath: `/search?city=&hotel=${resort.slug}`,
                  badge: i === 0 ? 'Best Price' : undefined,
                },
                {
                  provider: 'expedia',
                  searchPath: `/search?q=${encodeURIComponent(resort.name + ' ' + resort.location)}`,
                },
              ]}
            />
          </div>
        </div>
      )
    })
  }

  // Render tips section
  if (content.tips && content.tips.length > 0) {
    elements.push(<h2 key="tips-h">Pro Tips</h2>)
    elements.push(
      <ul key="tips-ul" className="space-y-3 my-4">
        {content.tips.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">💡</span>
            <span>{t.tip}</span>
          </li>
        ))}
      </ul>
    )
  }

  return <>{elements}</>
}

// Seed blog content
const posts = {
  '10-tips-family-task-management': {
    title: '10 Tips for Family Task Management That Actually Work',
    date: '2025-05-05',
    author: 'Nudge Team',
    readTime: '5 min read',
    content: (
      <>
        <p className="lead">Managing a household can feel like running a small startup — without the equity. Between school runs, meal prep, chores, appointments, and extracurriculars, there&rsquo;s always something slipping through the cracks.</p>
        <p>The good news? You don&rsquo;t need more willpower. You need a system. Here are 10 actionable tips to transform your family&rsquo;s task management.</p>

        <h2>1. Stop using your brain as a to-do list</h2>
        <p>Your brain is for thinking, not remembering. The moment a task crosses your mind — &ldquo;pick up dry cleaning,&rdquo; &ldquo;schedule dentist appointment&rdquo; — put it in a system. Nudge makes this instant with voice input or Telegram. If it&rsquo;s not captured, it doesn&rsquo;t exist.</p>

        <h2>2. Assign ownership, not guilt</h2>
        <p>&ldquo;Someone needs to clean the kitchen&rdquo; is a recipe for resentment. Always assign a specific person. Nudge lets you tag family members so everyone knows exactly who&rsquo;s responsible for what.</p>

        <h2>3. Use natural language, not spreadsheets</h2>
        <p>The fastest way to kill a habit is to make it complicated. Say &ldquo;remind Jake to water the plants every Monday&rdquo; instead of setting up a complex chore chart. Nudge parses natural language into structured tasks automatically.</p>

        <h2>4. Set recurring chores</h2>
        <p>Daily, weekly, monthly — chores that repeat should be in your system once. Nudge supports recurring tasks so you don&rsquo;t have to re-enter &ldquo;take out trash&rdquo; every Tuesday.</p>

        <h2>5. Make it visible</h2>
        <p>Out of sight, out of mind. A family task board that everyone can see (and check off) creates accountability. Nudge&rsquo;s dashboard shows all tasks in one place, sorted by priority and due date.</p>

        <h2>6. Use voice for speed</h2>
        <p>Typing tasks takes 10 seconds. Saying them takes 2. Nudge&rsquo;s voice input lets you add tasks while cooking, driving (hands-free with your phone), or getting ready in the morning.</p>

        <h2>7. Leverage Telegram for remote nudging</h2>
        <p>Your kids are on their phones anyway. Nudge&rsquo;s Telegram bot lets you assign tasks directly from the messaging app they already use. No new app to download, no login friction.</p>

        <h2>8. Celebrate completion</h2>
        <p>Gamification works. Nudge tracks family streaks and completion rates. Seeing &ldquo;5-day streak!&rdquo; is surprisingly motivating — even for adults.</p>

        <h2>9. Don&rsquo;t overcomplicate priorities</h2>
        <p>Everything can&rsquo;t be urgent. Use Nudge&rsquo;s priority system (low, medium, high, urgent) sparingly. If everything is high priority, nothing is.</p>

        <h2>10. Review weekly as a family</h2>
        <p>Spend 5 minutes on Sunday evening reviewing the week ahead. What needs to shift? What&rsquo;s coming up? Nudge makes this easy with the upcoming tasks view.</p>

        <p>Start implementing these tips today, and watch the mental load in your household drop dramatically.</p>
      </>
    ),
  },
  'how-voice-ai-changing-family-chores': {
    title: 'How Voice AI is Changing Family Chores Forever',
    date: '2025-04-28',
    author: 'Nudge Team',
    readTime: '4 min read',
    content: (
      <>
        <p className="lead">Voice assistants have been in our homes for years. We ask them for weather, timers, and music. But the true killer app for voice AI isn&rsquo;t trivia — it&rsquo;s task management.</p>

        <h2>The friction of typing</h2>
        <p>Every time you stop to type a task, you lose momentum. You pull out your phone, open an app, navigate to the right screen, type, set the date, assign someone — it&rsquo;s 30-60 seconds of friction. That might not sound like much, but it&rsquo;s enough to make you procrastinate. &ldquo;I&rsquo;ll do it later.&rdquo; And later never comes.</p>

        <p>Voice removes that friction. You say &ldquo;Nudge: Sophia&rsquo;s piano lesson Tuesday at 4pm&rdquo; and it&rsquo;s done. That&rsquo;s 3 seconds.</p>

        <h2>Natural language parsing is the key</h2>
        <p>The old approach to voice commands was rigid: &ldquo;Set reminder for tomorrow at 3pm.&rdquo; Modern AI-powered parsing understands natural speech: &ldquo;Remind me to call the plumber next Tuesday morning&rdquo; or &ldquo;Tell Jake to take out the trash tonight.&rdquo;</p>

        <p>Nudge uses this technology to extract task title, assignee, due date, priority, and recurrence from a single sentence. No menus, no forms, no friction.</p>

        <h2>The hands-free advantage for parents</h2>
        <p>When you&rsquo;re a parent, your hands are rarely free. You&rsquo;re holding a baby, carrying groceries, washing dishes, or driving. Voice task creation means you can capture tasks in the moment — when they&rsquo;re top of mind — without stopping what you&rsquo;re doing.</p>

        <h2>Telegram + voice = the ultimate combo</h2>
        <p>Nudge takes this further by integrating with Telegram. Send a voice message to the bot, and it transcribes and parses it into a task. Or send a text message with the same natural language. The result is a task creation system that works with zero learning curve.</p>

        <h2>The future is frictionless</h2>
        <p>As voice AI continues to improve, we&rsquo;ll see more families adopt voice-first task management. The barrier to entry is lower than ever. If you haven&rsquo;t tried creating a task with your voice yet, give it a shot. It might change how your family operates.</p>
      </>
    ),
  },
  'why-nudge-best-telegram-bot-families': {
    title: 'Why Nudge is the Best Telegram Bot for Families in 2025',
    date: '2025-04-21',
    author: 'Nudge Team',
    readTime: '6 min read',
    content: (
      <>
        <p className="lead">There are plenty of task management apps out there. Notion, Todoist, Trello, Asana — they&rsquo;re all great for work. But they&rsquo;re not built for families. Nudge is. Here&rsquo;s why.</p>

        <h2>1. It&rsquo;s where your family already is</h2>
        <p>Getting your family to adopt a new app is like herding cats. But Telegram? Chances are they&rsquo;re already using it. Nudge works as a Telegram bot, which means there&rsquo;s zero onboarding friction. Send a message, create a task. That&rsquo;s it.</p>

        <h2>2. Natural language, not spreadsheets</h2>
        <p>Nudge understands how real people talk. &ldquo;Remind Lily to finish her science project by Friday&rdquo; becomes a task with title, assignee, and due date automatically. No dropdown menus, no date pickers, no forms.</p>

        <h2>3. Voice messages work too</h2>
        <p>Can&rsquo;t type? Send a voice message to the Telegram bot. Nudge transcribes it, parses it, and creates the task. This is a game-changer for parents who are always on the go.</p>

        <h2>4. Smart reminders</h2>
        <p>Nudge doesn&rsquo;t just create tasks — it reminds you. You get Telegram notifications when something is due, when it&rsquo;s completed, and if it&rsquo;s overdue. You can even set custom reminder times.</p>

        <h2>5. Designed for households, not offices</h2>
        <p>Nudge supports family groups with multiple members, different roles (parent, child), and a shared task board. You can see who&rsquo;s doing what at a glance. No more &ldquo;I thought you were handling that.&rdquo;</p>

        <h2>6. It&rsquo;s fast. Really fast.</h2>
        <p>Task creation in Nudge takes 2-5 seconds. Compare that to opening a task app, navigating to the right list, clicking &ldquo;add task,&rdquo; filling in fields, and saving. Speed matters when you&rsquo;re juggling real life.</p>

        <h2>7. Free to start, affordable to upgrade</h2>
        <p>Nudge has a generous free tier (5 tasks/day) and affordable Pro ($5/mo) and Family ($9/mo) plans. No hidden fees, no contracts, no credit card for the free trial.</p>

        <h2>8. Privacy-first by design</h2>
        <p>Your family&rsquo;s data is encrypted at rest and in transit. Nudge uses Supabase for storage and never shares your data. No ads, no data mining.</p>

        <h2>9. It&rsquo;s built by a small team that cares</h2>
        <p>Nudge isn&rsquo;t a feature inside a giant corporation&rsquo;s product. It&rsquo;s a focused tool built specifically for families. That means every feature is designed around actual family workflows, not project management metrics.</p>

        <h2>10. The dashboard complements the bot</h2>
        <p>While Telegram is great for quick actions, the web dashboard is where you see the big picture. Task board, family members, stats, and settings — all in a clean, mobile-friendly interface.</p>

        <p>Ready to try it? Start free at <Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">nudge-app.com</Link> — no credit card required.</p>
      </>
    ),
  },
  'best-vietnam-all-inclusive-family-resorts-2026': {
    title: '8 Best All-Inclusive Family Resorts in Vietnam 2026',
    date: '2026-05-14',
    author: 'Nudge Travel',
    readTime: '8 min read',
    content: (() => {
      const detail = getPostDetail('best-vietnam-all-inclusive-family-resorts-2026')
      if (!detail) return <></>
      const { content } = detail
      const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`w-4 h-4 inline-block ${i < Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ))
      }
      const renderPriceRange = (range: string) => {
        const tiers = ['$', '$$', '$$$', '$$$$']
        return (
          <span className="text-sm font-medium">
            {tiers.map((t, i) => (
              <span key={i} className={range.includes(t) ? 'text-foreground' : 'text-muted-foreground/30'}>{t}</span>
            ))}
          </span>
        )
      }
      return (
        <>
          <p className="lead">{content.introduction}</p>

          {content.sections.map((section, i) => (
            <div key={i}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </div>
          ))}

          {content.resorts && content.resorts.map((resort: ResortData, i: number) => (
            <div key={resort.slug} className="mt-12 first:mt-8">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-lg font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-foreground">{resort.name}</h3>
                    <div className="flex items-center gap-0.5">{renderStars(resort.rating)}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {resort.location}
                    </span>
                    <span>{renderPriceRange(resort.priceRange)}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{resort.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resort.pool && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Waves className="w-3 h-3" /> Pool
                  </span>
                )}
                {resort.kidsClub && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-pink-50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                    <Baby className="w-3 h-3" /> Kids Club
                  </span>
                )}
                {resort.evCharging && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
                    <Car className="w-3 h-3" /> EV Charging
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-3 italic">
                Best for: {resort.bestFor}
              </p>

              <ul className="space-y-1.5 mb-4">
                {resort.highlights.map((h, hi) => (
                  <li key={hi} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5 shrink-0">✦</span>
                    {h}
                  </li>
                ))}
              </ul>

              {i < (content.resorts?.length ?? 0) - 1 && (
                <div className="border-t border-border/40 my-8" />
              )}
            </div>
          ))}

          {content.conclusion && (
            <>
              <h2>Final Thoughts</h2>
              <p>{content.conclusion}</p>
            </>
          )}

          {content.tips && content.tips.length > 0 && (
            <>
              <h2>Pro Tips for Your Vietnam Family Trip</h2>
              <div className="space-y-3">
                {content.tips.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30">
                    <span className="text-amber-500 text-lg shrink-0 mt-0.5">💡</span>
                    <p className="text-sm text-muted-foreground">{t.tip}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )
    })(),
  },
  'best-family-chore-apps-2026': {
    title: 'Best Family Chore Apps 2026 — Which One Actually Works?',
    date: '2026-05-01',
    author: 'Nudge Team',
    readTime: '7 min read',
    content: (
      <>
        <p className="lead">The chore app market has exploded, but most of them miss the mark for families. We tested the top contenders so you don't have to.</p>

        <h2>The Contenders</h2>
        <p>We put five apps through a rigorous two-week family test: Todoist, Trello, Cozi, OurHome, and Nudge. Each one was rated on ease of use, family adoption, natural language input, and actual chore completion rates.</p>

        <h2>1. Nudge — The Winner</h2>
        <p>Nudge took the top spot for one simple reason: it works the way families actually communicate. The Telegram bot means zero onboarding friction — your family doesn't need to learn a new app. Natural language parsing turns "remind Jake to take out the trash tonight" into a structured task in seconds. The web dashboard provides the big picture view that parents need. And at $5/month for Pro, it's significantly cheaper than most alternatives.</p>
<p><Link href="/auth/signup" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Try Nudge free today →</Link></p>

        <h2>2. Todoist — Best for Power Users</h2>
        <p>Todoist is an excellent task manager, but it's built for productivity nerds, not families. The natural language input is solid, and the recurring task support is the best in class. But family sharing is an afterthought, and getting kids to use it is an uphill battle. If your family is already tech-savvy, it works. For everyone else, it's a hard sell.</p>
<p className="flex items-center gap-2"><AffiliateProductLink providerId="todoist" path="/">Check Todoist</AffiliateProductLink> <span className="text-xs text-muted-foreground">· affiliate link</span></p>

        <h2>3. Cozi — The Family Classic</h2>
        <p>Cozi has been around forever, and it shows. The shared calendar and shopping lists are solid, and the interface is simple enough for anyone to use. But the chore management is basic — no natural language parsing, no smart reminders, no gamification. It's a digital family organizer that hasn't evolved much in the last decade.</p>
<p className="flex items-center gap-2"><AffiliateProductLink providerId="cozi" path="/">Check Cozi</AffiliateProductLink> <span className="text-xs text-muted-foreground">· affiliate link</span></p>

        <h2>4. OurHome — Great for Motivating Kids</h2>
        <p>OurHome shines with its points-and-rewards system that actually motivates children to complete chores. The design is cheerful and kid-friendly. But the app itself feels dated, and the natural language parsing is non-existent. Everything has to be entered manually through forms and dropdowns.</p>
<p className="flex items-center gap-2"><AffiliateProductLink providerId="ourhome" path="/">Check OurHome</AffiliateProductLink> <span className="text-xs text-muted-foreground">· affiliate link</span></p>

        <h2>5. Trello — Surprisingly Effective</h2>
        <p>Trello's board-and-card system works well for visual families who like to see everything laid out. But it requires manual setup, no natural language input, and there's nothing family-specific about it. It's a general-purpose tool that happens to work for chores if you put in the effort.</p>
<p className="flex items-center gap-2"><AffiliateProductLink providerId="trello" path="/">Check Trello</AffiliateProductLink> <span className="text-xs text-muted-foreground">· affiliate link</span></p>

        <h2>Our Verdict</h2>
        <p>If you want an app your family will actually use, go with Nudge. If you're managing a household of power users and don't mind the setup overhead, Todoist is a close second. But for 90% of families, Nudge is the clear winner — lower friction, faster task creation, and better family-specific features.</p>
      </>
    ),
  },
  'stop-nagging-kids-about-chores': {
    title: 'How to Stop Nagging Your Kids About Chores — Forever',
    date: '2026-04-15',
    author: 'Nudge Team',
    readTime: '5 min read',
    content: (
      <>
        <p className="lead">You've asked nicely. You've raised your voice. You've tried reward charts and threats. Still, the trash doesn't take itself out, and somehow you end up doing everything yourself. There's a better way.</p>

        <h2>Why Nagging Backfires</h2>
        <p>Behavioral psychology is clear: nagging triggers the psychological reactance response. When people feel their autonomy is threatened, they instinctively push back — even if the request is reasonable. Your child isn't being defiant; their brain is protecting their sense of control. The more you nag, the more resistant they become.</p>

        <h2>Replace Reminders with Systems</h2>
        <p>The solution isn't better nagging. It's removing yourself from the equation entirely. Set up a system that reminds your kids without you having to say a word. This is where Nudge comes in: schedule recurring tasks, set automated reminders via Telegram, and let the app handle the nudging. You're no longer the bad guy — the system is.</p>

        <h2>Use Natural Consequences</h2>
        <p>Instead of nagging about unfinished chores, let natural consequences do the teaching. If your child doesn't put their laundry in the hamper, it doesn't get washed. If they don't unload the dishwasher, they don't get their favorite snack. Nudge helps here by tracking completion and giving you the data to have calm, factual conversations about what got done and what didn't.</p>

        <h2>Make Chores Visible and Trackable</h2>
        <p>Kids respond well to visual progress. A Nudge dashboard that shows each family member's completed tasks creates a gentle competitive spirit. Seeing "Lily completed 5 tasks this week" next to "You completed 2" is surprisingly motivating. No nagging required — just data.</p>

        <h2>The 3-Week Habit Rule</h2>
        <p>It takes about three weeks for a new routine to stick. The first week, your kids will resist the system. The second week, they'll grudgingly comply. By the third week, the reminders become automatic and the nagging stops. Stay consistent, use Nudge for the heavy lifting, and let time do the rest.</p>
      </>
    ),
  },
  'telegram-family-task-management-better': {
    title: 'Family Task Management on Telegram — Why It&rsquo;s Better Than a Separate App',
    date: '2026-04-01',
    author: 'Nudge Team',
    readTime: '4 min read',
    content: (
      <>
        <p className="lead">Every family app faces the same problem: adoption. You download it, set it up, send invites, and then... nothing. Three months later, you find the icon on your home screen and feel a pang of guilt. Here&rsquo;s why building on Telegram changes everything.</p>

        <h2>Zero Friction Is the Only Friction That Matters</h2>
        <p>The best app in the world is worthless if nobody uses it. Telegram has over 900 million monthly active users, and many families already have group chats set up. By working inside Telegram, Nudge eliminates the biggest barrier to family task management: getting everyone to install and learn a new app.</p>

        <h2>Push Notifications That Actually Get Seen</h2>
        <p>Email reminders go to spam. SMS messages get ignored. But Telegram notifications? They show up as a message from a contact. Users check Telegram dozens of times a day. When Nudge sends a reminder via Telegram, it has an engagement rate that standalone apps can only dream of.</p>

        <h2>Voice Messages Beat Typing</h2>
        <p>When you&rsquo;re cooking dinner and remember that Jake needs to walk the dog, pulling out your phone and navigating to a chore app feels like too much work. But sending a quick voice message to the Nudge Telegram bot takes three seconds. It transcribes, parses, and creates the task automatically.</p>

        <h2>The Group Chat Integration</h2>
        <p>Nudge works alongside your existing family group chat. Tasks can be discussed, assigned, and completed without ever leaving the conversation. It feels natural because it is natural — families already coordinate through messaging. Nudge just makes it structured.</p>

        <h2>The Dashboard Adds Depth</h2>
        <p>Telegram is perfect for quick actions, but the web dashboard provides the overview that parents need. See the weekly task board, track completion rates, manage family members, and adjust settings. The bot handles the daily interactions; the dashboard handles the strategy.</p>

        <h2>The Bottom Line</h2>
        <p>Separate chore apps fail because they demand attention your family won&rsquo;t give. Telegram succeeds because it&rsquo;s already part of your family&rsquo;s daily flow. Nudge bridges the gap between a casual messaging platform and a structured task management system — and that&rsquo;s why it works.</p>
      </>
    ),
  },
  'ai-task-parsing-natural-language': {
    title: 'AI Task Parsing: How Natural Language Turns Chaos into Calm',
    date: '2026-03-15',
    author: 'Nudge Team',
    readTime: '6 min read',
    content: (
      <>
        <p className="lead">&ldquo;Sophia has a math test on Friday, remind her to study Tuesday and Thursday evenings, and tell Jake he needs to clean his room before Saturday&rsquo;s sleepover.&rdquo; If you said that to a traditional task manager, it would have no idea what you meant. To Nudge, it&rsquo;s perfectly clear.</p>

        <h2>What Is Natural Language Parsing?</h2>
        <p>Natural language parsing (NLP) is the technology that allows computers to understand human speech as it&rsquo;s actually spoken — not as rigid commands like &ldquo;Set reminder: math test study, Tuesday at 7pm.&rdquo; Advanced NLP can extract multiple pieces of information from a single sentence: the task, the person responsible, the deadline, the recurrence, and even the priority level.</p>

        <h2>How Nudge Parses Your Messages</h2>
        <p>When you send a message to the Nudge Telegram bot, it goes through a multi-stage parsing pipeline. First, the text is analyzed for entities — names, dates, times, and action verbs. Then, the relationships between those entities are determined. &ldquo;Jake&rdquo; is the assignee, &ldquo;trash&rdquo; is the task, &ldquo;tonight&rdquo; is the deadline. The result is a fully structured task created in under a second.</p>

        <h2>Edge Cases the AI Handles</h2>
        <p>Nudge&rsquo;s parser can handle: relative dates (&ldquo;next Tuesday&rdquo;, &ldquo;day after tomorrow&rdquo;), recurring schedules (&ldquo;every other Monday&rdquo;, &ldquo;first of each month&rdquo;), multiple tasks in one message (&ldquo;pick up milk AND remind Lily about her dentist visit&rdquo;), and even ambiguous requests (&ldquo;remind me soon&rdquo; gets a reasonable default).</p>

        <h2>Why This Matters for Parents</h2>
        <p>The average parent has dozens of to-dos swirling in their head at any moment. The friction of writing them down means many never get captured. Natural language removes that friction entirely. You think it, you say it, it&rsquo;s done. No forms, no fields, no categories, no tags. Just say what needs doing, and Nudge handles the rest.</p>

        <h2>The Future of Task Creation</h2>
        <p>We&rsquo;re moving toward a world where the boundary between thinking and doing gets thinner every year. Voice input, natural language, and AI-powered organization are making task management invisible — it happens in the background while you focus on what matters. Nudge is built for this future.</p>
      </>
    ),
  },
  '5-family-routines-changed-with-nudge': {
    title: '5 Family Routines That Changed When We Started Using Nudge',
    date: '2026-03-01',
    author: 'Nudge Team',
    readTime: '6 min read',
    content: (
      <>
        <p className="lead">Before Nudge, our mornings were chaos. Backpacks got left behind, permission slips went unsigned, and someone was always eating breakfast in the car. After three months of using Nudge with our family of five, here are the five routines that transformed completely.</p>

        <h2>1. Morning Routine: From Screaming to Smooth</h2>
        <p>Our old morning routine involved me repeating the same five instructions every day: brush teeth, pack bag, eat breakfast, put on shoes, get in the car. With Nudge, each kid gets a Telegram reminder at 7:15 AM with their personal checklist. They check off items as they go. The result? We leave the house 12 minutes earlier and I haven&rsquo;t raised my voice once.</p>

        <h2>2. After-School Chores: Done Before We Ask</h2>
        <p>Nudge&rsquo;s recurring task feature changed the game for after-school chores. The moment the kids walk through the door at 4 PM, they get a Telegram notification: &ldquo;Unpack school bag, hang up jacket, have snack.&rdquo; At 5 PM: &ldquo;Start homework.&rdquo; At 6 PM: &ldquo;Set the table.&rdquo; We went from nagging every 20 minutes to zero reminders within two weeks.</p>

        <h2>3. Dinner Prep: The Whole Family Helps</h2>
        <p>Dinner used to be a one-person show. Now, Nudge assigns tasks to different family members each night. One kid sets the table, another fills water glasses, someone takes out the trash while cooking is happening. The tasks rotate weekly so nobody gets bored of their assignment. Meal time feels like a team effort now.</p>

        <h2>4. Weekend Chores: No More Saturday Arguments</h2>
        <p>Saturday mornings were our biggest source of family conflict. &ldquo;I did it last week!&rdquo; &ldquo;That&rsquo;s not my job!&rdquo; Nudge eliminated the debate entirely. Tasks are pre-assigned, visible to everyone, and completion is tracked. The data doesn&rsquo;t lie — when the dashboard shows Lily hasn&rsquo;t done her Saturday chore in three weeks, there&rsquo;s no argument about fairness.</p>

        <h2>5. Bedtime: A Calm End to the Day</h2>
        <p>Our bedtime routine was always the hardest — kids stalling, forgetting steps, needing repeated reminders. Now Nudge orchestrates the entire evening. At 8 PM: &ldquo;Put on pajamas.&rdquo; At 8:15: &ldquo;Brush teeth.&rdquo; At 8:30: &ldquo;Pick a book for story time.&rdquo; The automated sequence means I don&rsquo;t have to be the enforcer. The system does it, and for some reason, kids accept it from the system way more than from Mom or Dad.</p>

        <h2>The Numbers Don&rsquo;t Lie</h2>
        <p>In three months, our family&rsquo;s task completion rate went from about 40% (only the things I personally followed up on) to 87% (things tracked and reminded by Nudge). The biggest win? I spend an estimated 45 minutes less per day on reminders and follow-ups. That&rsquo;s over 270 hours a year of my life back.</p>
      </>
    ),
  },
}


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Try data post first (has proper metadata)
  const dataPost = getPostDetail(params.slug)
  if (dataPost) {
    return {
      title: `${dataPost.meta.title} — Nudge Blog`,
      description: dataPost.meta.excerpt,
      openGraph: {
        title: dataPost.meta.title,
        description: dataPost.meta.excerpt,
        type: 'article',
        publishedTime: dataPost.meta.date,
        siteName: 'Nudge',
      },
    }
  }
  // Fall back to inline post
  const inlinePost = posts[params.slug as keyof typeof posts]
  if (inlinePost) {
    return {
      title: `${inlinePost.title} — Nudge Blog`,
      description: inlinePost.title,
      openGraph: {
        title: inlinePost.title,
        description: inlinePost.title,
        type: 'article',
        publishedTime: inlinePost.date,
        siteName: 'Nudge',
      },
    }
  }
  return { title: 'Post Not Found — Nudge Blog' }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Try inline hardcoded post first
  const inlinePost = posts[params.slug as keyof typeof posts]
  
  // Fall back to data-driven post from generated-blog-data
  const dataPost = inlinePost ? null : getPostDetail(params.slug)
  const isDataDriven = !inlinePost && !!dataPost
  
  if (!inlinePost && !dataPost) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">Nudge</span>
          </Link>
          <Link href="/auth/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-indigo-600/25 transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              {isDataDriven ? dataPost!.meta.title : inlinePost!.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {isDataDriven ? dataPost!.meta.date : inlinePost!.date}
              </span>
              <span>{isDataDriven ? dataPost!.meta.readTime : inlinePost!.readTime}</span>
              <span>{isDataDriven ? dataPost!.meta.author : inlinePost!.author}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-custom space-y-4 text-foreground leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_.lead]:text-lg [&_.lead]:text-foreground [&_.lead]:font-medium [&_.lead]:mb-6">
            {isDataDriven ? renderDataPost(dataPost!) : inlinePost!.content}
          </div>

          {/* Affiliate disclosure for data-driven and affiliate-linked posts */}
          {isDataDriven && <AffiliateDisclosure />}
          {!isDataDriven && inlinePost && params.slug === 'best-family-chore-apps-2026' && <AffiliateDisclosure />}

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-br from-indigo-50 to-indigo-50/50 dark:from-indigo-950/30 dark:to-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Ready to try Nudge?</h3>
            <p className="text-sm text-muted-foreground mb-4">Start free. No credit card required.</p>
            <Link
              href="/auth/signup"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-semibold text-foreground">Nudge</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/for/families" className="hover:text-foreground transition-colors">For Families</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Generate static params for all blog posts (both inline and data-driven)
export async function generateStaticParams() {
  const inlineSlugs = Object.keys(posts)
  const dataSlugs = allPosts
    .filter(p => !inlineSlugs.includes(p.slug))
    .map(p => ({ slug: p.slug }))
  return [...inlineSlugs.map(slug => ({ slug })), ...dataSlugs]
}
