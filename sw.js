var APP_PREFIX = 'WebAppJp05_'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = 'version_01'              // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            // Add URL you want to cache in this list.
  '/WebAppJp05/',                     // If you have separate JS/CSS files,
  '/WebAppJp05/index.html'            // add path to those files here
]
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

const OFFLINE_PAGE = '/WebAppJp05/offline/index.html';
const NOT_FOUND_PAGE = '/WebAppJp05/404.html';

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})
