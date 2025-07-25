const CACHE_NAME = 'schedule2025-v3';
const urlsToCache = [
  '/schedule2025/',
  '/schedule2025/index.html',
  '/schedule2025/manifest.json',
  '/schedule2025/icon-192.png',
  '/schedule2025/icon-512.png'
];

// Install and cache
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ⚠️ Forces new SW to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});