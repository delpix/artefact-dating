/**
 * SERVICE WORKER — Artefact Dating PWA
 * Strategy: cache-first — all assets are served from cache when available,
 * falling back to the network for uncached resources.
 * This ensures the app works fully offline after the first load.
 */

// Cache version identifier — increment this (e.g. 'artefact-dating-v2')
// whenever you deploy updated files, to force the old cache to be replaced.
const CACHE_NAME = 'artefact-dating-v1';

// List of assets to pre-cache during the install phase.
// All files required for the app to work offline must be listed here.
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon.svg'
];

/**
 * INSTALL EVENT
 * Triggered once when the Service Worker is first registered.
 * Opens the cache and pre-fetches all listed assets.
 * skipWaiting() forces the new SW to activate immediately,
 * without waiting for existing tabs to close.
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

/**
 * ACTIVATE EVENT
 * Triggered after installation, once the SW takes control.
 * Removes any caches from previous versions (different CACHE_NAME)
 * to free up storage and avoid serving stale files.
 * clients.claim() makes the SW take control of all open tabs immediately.
 */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/**
 * FETCH EVENT
 * Intercepts every network request made by the app.
 * Cache-first strategy:
 *   1. Look for the requested resource in the cache.
 *   2. If found, return it immediately (works offline).
 *   3. If not found, fetch from the network, store a copy in the cache,
 *      and return the response.
 *   4. If the network request also fails (e.g. no connection),
 *      fall back to index.html so the app shell is always shown.
 */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Only cache valid, same-origin responses
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
