var APP_PREFIX = 'WebAppJp05_';
var VERSION = 'version_01';
var URLS = '/WebAppJp05/';

const NOT_FOUND_CACHE_FILES = '/WebAppJp05/404.html';
const CACHE_NAME = 'offline';
const OFFLINE_URL = '/WebAppJp05/offline/index.html';
const NOT_FOUND_URL = '/WebAppJp05/404.html';

importScripts('/WebAppJp05/script.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('offline').then(function(cache) {
     return cache.addAll([
       '/WebAppJp05/',
       '/WebAppJp05/index.html'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});
