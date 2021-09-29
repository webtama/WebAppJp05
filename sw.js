var APP_PREFIX = 'WebAppJp05_';     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01';              // Version of the off-line cache (change this value everytime you want to update cache)
var URLS = [                            // Add URL you want to cache in this list.
  '/WebAppJp05/',                     // If you have separate JS/CSS files,
  '/WebAppJp05/index.html'            // add path to those files here
];
const BASE_CACHE_FILES = [
    '/WebAppJp05/manifest.json',
    '/WebAppJp05/CSS/main.css',
    '/WebAppJp05/CSS/font-awesome.min.css',
    '/WebAppJp05/JQUERY/jquery-3.6.0.min.js',
    '/WebAppJp05/JQUERY/jquery.mobile-1.4.5.min.js',
    '/WebAppJp05/JS/a076d05399.js',
    '/WebAppJp05/JQUERY/bootstrap.min.js',
    '/WebAppJp05/JQUERY/bootstrap.bundle.min.js',
    '/WebAppJp05/JS/JavaScript.js',
    '/WebAppJp05/JQUERY/JQueryJs.js',
    '/WebAppJp05/JQUERY/JQueryFormJs.js',
    '/WebAppJp05/JQUERY/jquery.touchSwipe.min.js',
    '/WebAppJp05/JQUERY/JQUERY/html2canvas.js',
    '/WebAppJp05/JQUERY/qrious.min.js',
    '/WebAppJp05/JQUERY/jspdf.debug.js',
    '/WebAppJp05/icons/72x72.png',
    '/WebAppJp05/icons/512x512.png',
    '/WebAppJp05/SOUND/click003.mp3',
    '/WebAppJp05/SOUND/Around-The-World.mp3',
    '/WebAppJp05/SOUND/Blue.mp3',
    '/WebAppJp05/FONT/Hey%20Comic.ttf',
    '/WebAppJp05/FONT/MinecraftEvenings-RBao.ttf',
];

const OFFLINE_CACHE_FILES = [
    '/WebAppJp05/manifest.json',
    '/WebAppJp05/CSS/main.css',
    '/WebAppJp05/CSS/font-awesome.min.css',
    '/WebAppJp05/JQUERY/jquery-3.6.0.min.js',
    '/WebAppJp05/JQUERY/jquery.mobile-1.4.5.min.js',
    '/WebAppJp05/JS/a076d05399.js',
    '/WebAppJp05/JQUERY/bootstrap.min.js',
    '/WebAppJp05/JQUERY/bootstrap.bundle.min.js',
    '/WebAppJp05/JS/JavaScript.js',
    '/WebAppJp05/JQUERY/JQueryJs.js',
    '/WebAppJp05/JQUERY/JQueryFormJs.js',
    '/WebAppJp05/JQUERY/jquery.touchSwipe.min.js',
    '/WebAppJp05/JQUERY/JQUERY/html2canvas.js',
    '/WebAppJp05/JQUERY/qrious.min.js',
    '/WebAppJp05/JQUERY/jspdf.debug.js',
    '/WebAppJp05/icons/72x72.png',
    '/WebAppJp05/icons/512x512.png',
    '/WebAppJp05/SOUND/click003.mp3',
    '/WebAppJp05/SOUND/Around-The-World.mp3',
    '/WebAppJp05/SOUND/Blue.mp3',
    '/WebAppJp05/FONT/Hey%20Comic.ttf',
    '/WebAppJp05/FONT/MinecraftEvenings-RBao.ttf',    
];

const NOT_FOUND_CACHE_FILES = [  
    '/WebAppJp05/404.html',
];
const CACHE_NAME = 'offline';
const OFFLINE_URL = '/WebAppJp05/offline/index.html';
const NOT_FOUND_URL = '/WebAppJp05/404.html';

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
