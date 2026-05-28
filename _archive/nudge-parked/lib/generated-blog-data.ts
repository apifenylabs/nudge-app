import vietnamResortsData from '@/data/blog/2026-05-14-best-vietnam-all-inclusive-family-resorts.json'
import taskManagersData from '@/data/blog/2026-05-17-best-family-task-managers-compared-2026.json'
import productivityAppsData from '@/data/blog/2026-05-16-best-productivity-apps-busy-parents-2026.json'
import fiveRoutinesData from '@/data/blog/2026-05-20-family-morning-routine-with-nudge.json'
import stopNaggingData from '@/data/blog/2026-05-20-stop-nagging-kids-chores.json'
import telegramData from '@/data/blog/2026-05-20-telegram-family-task-management.json'
import aiParsingData from '@/data/blog/2026-05-20-ai-task-parsing-natural-language.json'
import tenTipsData from '@/data/blog/2026-05-20-10-tips-family-task-management.json'

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  readTime: string
  image: string
}

export interface ResortData {
  name: string
  slug: string
  location: string
  description: string
  priceRange: string
  kidsClub: boolean
  pool: boolean
  evCharging: boolean
  bestFor: string
  rating: number
  highlights: string[]
  bookingUrl: string
  image: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface BlogPostDetail {
  meta: BlogPostMeta
  category: string
  content: {
    introduction?: string
    sections: Array<{ heading: string; body: string }>
    resorts?: ResortData[]
    conclusion?: string
    tips?: Array<{ tip: string }>
  }
}

// All blog post metadata for the listing page
export const allPosts: BlogPostMeta[] = [
  {
    slug: '5-family-routines-changed-with-nudge',
    title: '5 Family Routines That Changed When We Started Using Nudge',
    excerpt: 'From morning chaos to peaceful bedtimes — see how five real families transformed their mornings, after-school hours, dinner prep, weekend chores, and bedtime routines.',
    date: '2026-05-20',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '⏰',
  },
  {
    slug: 'stop-nagging-kids-about-chores',
    title: 'How to Stop Nagging Your Kids About Chores — Forever',
    excerpt: 'Behavioral psychology reveals that constant nagging backfires. Learn how to replace reminders with routines and let Nudge do the heavy lifting.',
    date: '2026-05-20',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '🔇',
  },
  {
    slug: 'telegram-family-task-management-better',
    title: 'Family Task Management on Telegram — Why It\'s Better Than a Separate App',
    excerpt: 'Your family already uses Telegram daily. That means zero friction, zero new apps to install, and way higher adoption than any standalone chore app.',
    date: '2026-05-20',
    author: 'Nudge Team',
    readTime: '5 min read',
    image: '📱',
  },
  {
    slug: 'ai-task-parsing-natural-language',
    title: 'AI Task Parsing: How Natural Language Turns Chaos into Calm',
    excerpt: 'Type "remind Jake to take out trash tonight" and watch Nudge turn it into a structured, trackable task. Here\'s how NLP makes family management effortless.',
    date: '2026-05-20',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '🤖',
  },
  {
    slug: '10-tips-family-task-management',
    title: '10 Tips for Family Task Management That Actually Work',
    excerpt: 'Stop repeating yourself. Here are 10 proven strategies to get your family on the same page with chores, errands, and daily routines.',
    date: '2026-05-20',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '📋',
  },
  {
    slug: 'best-vietnam-all-inclusive-family-resorts-2026',
    title: '8 Best All-Inclusive Family Resorts in Vietnam 2026',
    excerpt: 'Vietnam is the hottest family travel destination in Southeast Asia right now. We\'ve hand-picked 8 all-inclusive resorts that deliver incredible value, amazing kids\' clubs, and unforgettable experiences for the whole family.',
    date: '2026-05-14',
    author: 'Nudge Travel',
    readTime: '8 min read',
    image: '🇻🇳',
  },
  {
    slug: 'best-family-task-managers-compared-2026',
    title: 'Nudge vs Todoist vs Trello vs Cozi: Best Family Task Manager 2026',
    excerpt: 'We tested the top 6 family task management apps head-to-head. See how Nudge, Todoist, Trello, Cozi, OurHome, and TickTick compare for real family use.',
    date: '2026-05-17',
    author: 'Nudge Team',
    readTime: '8 min read',
    image: '🏆',
  },
  {
    slug: 'best-productivity-apps-busy-parents-2026',
    title: '8 Productivity Apps Every Busy Parent Should Use in 2026',
    excerpt: 'From family task management to meal planning, these 8 apps save busy parents hours every week. Includes honest reviews with pros and cons.',
    date: '2026-05-16',
    author: 'Nudge Team',
    readTime: '7 min read',
    image: '⏰',
  },
  {
    slug: 'best-family-chore-apps-2026',
    title: 'Best Family Chore Apps 2026 — Which One Actually Works?',
    excerpt: 'Todoist, Trello, Cozi, and Nudge — we put the top family chore apps head-to-head. Find out which one actually helps your family get things done.',
    date: '2026-05-01',
    author: 'Nudge Team',
    readTime: '7 min read',
    image: '🏆',
  },
  {
    slug: 'stop-nagging-kids-about-chores',
    title: 'How to Stop Nagging Your Kids About Chores — Forever',
    excerpt: 'Behavioral psychology reveals that constant nagging backfires. Learn how to replace reminders with routines and let Nudge do the heavy lifting.',
    date: '2026-04-15',
    author: 'Nudge Team',
    readTime: '5 min read',
    image: '🔇',
  },
  {
    slug: 'telegram-family-task-management-better',
    title: 'Family Task Management on Telegram — Why It\'s Better Than a Separate App',
    excerpt: 'Your family already uses Telegram daily. That means zero friction, zero new apps to install, and way higher adoption than any standalone chore app.',
    date: '2026-04-01',
    author: 'Nudge Team',
    readTime: '4 min read',
    image: '📱',
  },
  {
    slug: 'ai-task-parsing-natural-language',
    title: 'AI Task Parsing: How Natural Language Turns Chaos into Calm',
    excerpt: 'Type "remind Jake to take out trash tonight" and watch Nudge turn it into a structured, trackable task. Here\'s how NLP makes family management effortless.',
    date: '2026-03-15',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '🤖',
  },
  {
    slug: '5-family-routines-changed-with-nudge',
    title: '5 Family Routines That Changed When We Started Using Nudge',
    excerpt: 'From morning chaos to peaceful bedtimes — see how five real families transformed their mornings, after-school hours, dinner prep, weekend chores, and bedtime routines.',
    date: '2026-03-01',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '⏰',
  },
  {
    slug: '10-tips-family-task-management',
    title: '10 Tips for Family Task Management That Actually Work',
    excerpt: 'Stop repeating yourself. Here are 10 proven strategies to get your family on the same page with chores, errands, and daily routines.',
    date: '2025-05-05',
    author: 'Nudge Team',
    readTime: '5 min read',
    image: '📋',
  },
  {
    slug: 'how-voice-ai-changing-family-chores',
    title: 'How Voice AI is Changing Family Chores Forever',
    excerpt: 'Voice assistants are great for timers and weather. But the real revolution? Using AI to parse natural language into actionable tasks for your household.',
    date: '2025-04-28',
    author: 'Nudge Team',
    readTime: '4 min read',
    image: '🎙️',
  },
  {
    slug: 'why-nudge-best-telegram-bot-families',
    title: 'Why Nudge is the Best Telegram Bot for Families in 2025',
    excerpt: 'From natural language parsing to smart reminders — why more families are choosing a Telegram-first approach to task management.',
    date: '2025-04-21',
    author: 'Nudge Team',
    readTime: '6 min read',
    image: '🤖',
  },
]

// Detail content lookup
export const blogContent: Record<string, BlogPostDetail | null> = {
  'best-vietnam-all-inclusive-family-resorts-2026': {
    meta: allPosts[5],
    category: 'travel',
    content: {
      introduction: vietnamResortsData.content.introduction,
      sections: vietnamResortsData.content.sections,
      resorts: vietnamResortsData.content.resorts as ResortData[],
      conclusion: vietnamResortsData.content.conclusion,
      tips: vietnamResortsData.content.tips,
    },
  },
  'best-family-task-managers-compared-2026': {
    meta: allPosts[6],
    category: 'reviews',
    content: {
      sections: taskManagersData.content.sections,
      tips: taskManagersData.content.tips,
    },
  },
  'best-productivity-apps-busy-parents-2026': {
    meta: allPosts[5],
    category: 'reviews',
    content: {
      sections: productivityAppsData.content.sections,
      tips: productivityAppsData.content.tips,
    },
  },
  '5-family-routines-changed-with-nudge': {
    meta: allPosts[0],
    category: 'parenting',
    content: {
      sections: fiveRoutinesData.content.sections,
      tips: fiveRoutinesData.content.tips,
    },
  },
  'stop-nagging-kids-about-chores': {
    meta: allPosts[1],
    category: 'parenting',
    content: {
      sections: stopNaggingData.content.sections,
      tips: stopNaggingData.content.tips,
    },
  },
  'telegram-family-task-management-better': {
    meta: allPosts[2],
    category: 'productivity',
    content: {
      sections: telegramData.content.sections,
      tips: telegramData.content.tips,
    },
  },
  'ai-task-parsing-natural-language': {
    meta: allPosts[3],
    category: 'productivity',
    content: {
      sections: aiParsingData.content.sections,
      tips: aiParsingData.content.tips,
    },
  },
  '10-tips-family-task-management': {
    meta: allPosts[4],
    category: 'parenting',
    content: {
      sections: tenTipsData.content.sections,
      tips: tenTipsData.content.tips,
    },
  },
}

// Helper: get metadata by slug
export function getPostMeta(slug: string): BlogPostMeta | undefined {
  return allPosts.find((p) => p.slug === slug)
}

// Helper: get full post detail including content
export function getPostDetail(slug: string): BlogPostDetail | null {
  return blogContent[slug] ?? null
}

// Helper: get all unique categories
export function getPostCategories(): string[] {
  const categories = new Set(
    Object.values(blogContent).map((p) => (p ? p.category : 'general'))
  )
  return Array.from(categories)
}
