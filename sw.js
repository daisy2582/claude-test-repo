const CACHE_NAME = 'vegora-bites-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/pages.css',
  '/js/app.js',
  '/js/pages.js'
];

self.addEventListener('install', event => {
  // Force this new SW to activate immediately, replacing old one
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  // IMPORTANT: Only handle GET requests for static assets
  // Skip ALL API calls and non-GET methods (POST, PUT, DELETE)
  if (event.request.method !== 'GET') {
    return; // Let the browser handle it normally
  }
  if (event.request.url.includes('/api/')) {
    return; // Never cache API requests
  }
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  // Take control of all pages immediately
  event.waitUntil(
    Promise.all([
      clients.claim(),
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
        );
      })
    ])
  );
});
