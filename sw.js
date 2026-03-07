// Self-destructing service worker - removes itself and clears all caches
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Delete ALL caches
      caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))),
      // Unregister this service worker
      self.registration.unregister()
    ])
  );
});
// Do NOT intercept any fetch requests
