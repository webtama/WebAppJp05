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
  '/WebAppJp05/CSS/main.css',
  '/WebAppJp05/CSS/font-awesome.min.css',
  '/WebAppJp05/JQUERY/jquery-3.6.0.min.js',
  '/WebAppJp05/JQUERY/jquery.mobile-1.4.5.min.js',
  '/WebAppJp05/JQUERY/bootstrap.min.js,
  '/WebAppJp05/JQUERY/bootstrap.bundle.min.js,
  '/WebAppJp05/JQUERY/JQueryJs.js',
  '/WebAppJp05/JQUERY/JQueryFormJs.js',
  '/WebAppJp05/JQUERY/jquery.touchSwipe.min.js',
  '/WebAppJp05/JQUERY/html2canvas.js',
  '/WebAppJp05/JQUERY/qrious.min.js',
  '/WebAppJp05/JQUERY/jspdf.debug.js',
  '/WebAppJp05/JS/a076d05399.js',
  '/WebAppJp05/JS/JavaScript.js',
  '/WebAppJp05/SOUND/Around-The-World.mp3',
  '/WebAppJp05/SOUND/click003.mp3',
  '/WebAppJp05/FONT/Hey%20Comic.ttf',
  '/WebAppJp05/FONT/MinecraftEvenings-RBao.ttf',
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
