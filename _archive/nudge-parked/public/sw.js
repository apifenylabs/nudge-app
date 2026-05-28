// Nudge Service Worker v1.1.0
// PWA for Voice Task Manager & Family Assistant

const CACHE_NAME = 'nudge-v1';
const STATIC_CACHE = 'nudge-static-v1';
const DYNAMIC_CACHE = 'nudge-dynamic-v1';
const API_CACHE = 'nudge-api-v1';

// Assets to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/dashboard',
  '/auth/login',
  '/auth/signup',
  '/onboarding',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/fallback-offline',
];

// Install event — cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate event — clean old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => !currentCaches.includes(cacheName))
          .map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Helper: is this a navigation request?
function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Helper: is this an API request?
function isApiRequest(url) {
  return url.pathname.startsWith('/api/');
}

// Helper: is this a static asset?
function isStaticAsset(url) {
  const extensions = ['.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2'];
  return extensions.some(ext => url.pathname.endsWith(ext));
}

// Network-first strategy (for navigation / dynamic content)
async function networkFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline fallback for navigation
    if (isNavigationRequest(request)) {
      const fallback = await caches.match('/fallback-offline');
      if (fallback) return fallback;
      // In-memory offline page
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Nudge - Offline</title>
        <style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#f8fafc;color:#1e293b;text-align:center;padding:2rem}div{max-width:400px}h1{font-size:2rem;margin-bottom:0.5rem;color:#2563eb}p{margin-bottom:0.5rem;color:#64748b}.icon{font-size:4rem;margin-bottom:1rem}</style>
        </head><body>
        <div><div class="icon">📴</div>
        <h1>You're Offline</h1>
        <p>Nudge can't reach the server right now.</p>
        <p>Don't worry — your tasks are saved and will sync when you're back online.</p>
        <p style="margin-top:1.5rem;font-size:0.875rem">Check your internet connection, then pull down to refresh.</p>
        </div></body></html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
    return new Response('Offline', { status: 503 });
  }
}

// Cache-first strategy (for static assets)
async function cacheFirst(request, cacheName = STATIC_CACHE) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Stale-while-revalidate in background
    fetch(request).then((response) => {
      if (response.ok) {
        caches.open(cacheName).then((cache) => cache.put(request, response));
      }
    }).catch(() => {});
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('', { status: 404 });
  }
}

// Network-only strategy (for API calls — no caching sensitive data)
async function networkOnly(request) {
  try {
    return await fetch(request);
  } catch (error) {
    // For API calls, return a lightweight offline response
    return new Response(
      JSON.stringify({ error: 'offline', message: 'You are offline. Please try again when connected.' }),
      { 
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Fetch event — route strategies
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other internal URLs
  if (!url.protocol.startsWith('http')) return;

  // API requests: network-only
  if (isApiRequest(url)) {
    event.respondWith(networkOnly(request));
    return;
  }

  // Static assets: cache-first with stale-while-revalidate
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Icons (from manifest): cache-first
  if (url.pathname.startsWith('/icons/')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Navigation / pages: network-first with offline fallback
  if (isNavigationRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else: network-first
  event.respondWith(networkFirst(request));
});

// Push event — handle push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const options = {
      body: data.body || 'You have a task reminder from Nudge.',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/dashboard',
        taskId: data.taskId || null,
      },
      actions: [
        {
          action: 'view',
          title: 'View Task',
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Nudge', options)
    );
  } catch (e) {
    // Simple text notification
    const text = event.data.text();
    event.waitUntil(
      self.registration.showNotification('Nudge', {
        body: text,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
      })
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const data = event.notification.data;
  const urlToOpen = data?.url || '/dashboard';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // If we already have a window, focus it and navigate
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise, open new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Message event — handle communication from the app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  // Update cache when app signals content has changed
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    const { url } = event.data;
    if (url) {
      caches.open(DYNAMIC_CACHE).then((cache) => {
        fetch(url).then((response) => {
          if (response.ok) cache.put(url, response);
        }).catch(() => {});
      });
    }
  }

  // Check offline queue after coming back online
  if (event.data && event.data.type === 'CHECK_QUEUE') {
    // Notify all clients to trigger a sync
    clients.matchAll({ type: 'window' }).then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'SYNC_QUEUE' });
      });
    });
  }
});

// Periodic background sync — sync tasks when coming online
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(syncPendingTasks());
  }
});

async function syncPendingTasks() {
  // Placeholder for background sync of pending task changes
  // Will be implemented with IndexedDB offline queue
  console.log('[SW] Background sync triggered');
}
