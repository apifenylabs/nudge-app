import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nudge — Voice Task Manager for Families',
    short_name: 'Nudge',
    description:
      'Record tasks with your voice. Nudge uses AI to create, organize, and remind.',
    start_url: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    id: 'app.nudge.family',
    icons: [
      // SVG icons — for modern browsers
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      // Maskable SVG — for adaptive icons
      {
        src: '/icons/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      // PNG icons — for iOS, older Android
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Voice Task',
        short_name: 'Voice',
        description: 'Record a task with your voice',
        url: '/?voice=true',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Dashboard',
        short_name: 'Tasks',
        description: 'View your tasks',
        url: '/dashboard',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
      {
        name: 'Quick Task',
        short_name: 'New Task',
        description: 'Create a new task quickly',
        url: '/dashboard?newTask=true',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
      },
    ],
    categories: ['productivity', 'family', 'utilities', 'communication'],
    screenshots: [],
    prefer_related_applications: false,
    related_applications: [],
  }
}
