var APP_PREFIX = 'WebAppJp05_';
var VERSION = 'version_01';
var URLS = '/WebAppJp05/';

const NOT_FOUND_CACHE_FILES = '/WebAppJp05/404.html';
const CACHE_NAME = 'offline';
const OFFLINE_URL = '/WebAppJp05/offline/index.html';
const NOT_FOUND_URL = '/WebAppJp05/404.html';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
  '/',
  '/WebAppJp05/index.html',
  '/WebAppJp05/app.js',
  '/WebAppJp05/install.js',
  '/WebAppJp05/luxon-1.11.4.js',
  '/WebAppJp05/inline.css',
  '/WebAppJp05/add.svg',
  '/WebAppJp05/clear-day.svg',
  '/WebAppJp05/clear-night.svg',
  '/WebAppJp05/cloudy.svg',
  '/WebAppJp05/fog.svg',
  '/WebAppJp05/hail.svg',
  '/WebAppJp05/install.svg',
  '/WebAppJp05/partly-cloudy-day.svg',
  '/WebAppJp05/partly-cloudy-night.svg',
  '/WebAppJp05/rain.svg',
  '/WebAppJp05/refresh.svg',
  '/WebAppJp05/sleet.svg',
  '/WebAppJp05/snow.svg',
  '/WebAppJp05/thunderstorm.svg',
  '/WebAppJp05/tornado.svg',
  '/WebAppJp05/wind.svg',
];

evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);

evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
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
