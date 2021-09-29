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

const NOT_FOUND_CACHE_URL = [  
    '/WebAppJp05/404.html',
];
const CACHE_NAME = 'offline';
const OFFLINE_URL = '/WebAppJp05/offline/index.html';
const NOT_FOUND_URL = '/WebAppJp05/404.html';

const MAX_TTL = {
    '/': 3600,
    html: 3600,
    json: 86400,
    js: 86400,
    css: 86400,
};

const SUPPORTED_METHODS = [
    'GET',
];

function isBlacklisted(url) {
    return (CACHE_BLACKLIST.length > 0) ? !CACHE_BLACKLIST.filter((rule) => {
        if(typeof rule === 'function') {
            return !rule(url);
        } else {
            return false;
        }
    }).length : false
}

function getFileExtension(url) {
    let extension = url.split('.').reverse()[0].split('?')[0];
    return (extension.endsWith('/')) ? '/' : extension;
}

function getTTL(url) {
    if (typeof url === 'string') {
        let extension = getFileExtension(url);
        if (typeof MAX_TTL[extension] === 'number') {
            return MAX_TTL[extension];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

function installServiceWorker() {
    return Promise.all(
        [
            caches.open(CACHE_VERSIONS.assets)
                .then(
                    (cache) => {
                        return cache.addAll(BASE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.offline)
                .then(
                    (cache) => {
                        return cache.addAll(OFFLINE_CACHE_FILES);
                    }
                ),
            caches.open(CACHE_VERSIONS.notFound)
                .then(
                    (cache) => {
                        return cache.addAll(NOT_FOUND_CACHE_URL);
                    }
                )
        ]
    );
}

function cleanupLegacyCache() {

    let currentCaches = Object.keys(CACHE_VERSIONS)
        .map(
            (key) => {
                return CACHE_VERSIONS[key];
            }
        );

    return new Promise(
        (resolve, reject) => {

            caches.keys()
                .then(
                    (keys) => {
                        return legacyKeys = keys.filter(
                            (key) => {
                                return !~currentCaches.indexOf(key);
                            }
                        );
                    }
                )
                .then(
                    (legacy) => {
                        if (legacy.length) {
                            Promise.all(
                                legacy.map(
                                    (legacyKey) => {
                                        return caches.delete(legacyKey)
                                    }
                                )
                            )
                                .then(
                                    () => {
                                        resolve()
                                    }
                                )
                                .catch(
                                    (err) => {
                                        reject(err);
                                    }
                                );
                        } else {
                            resolve();
                        }
                    }
                )
                .catch(
                    () => {
                        reject();
                    }
                );

        }
    );
}


self.addEventListener(
    'install', event => {
        event.waitUntil(installServiceWorker());
    }
);

// The activate handler takes care of cleaning up old caches.
self.addEventListener(
    'activate', event => {
        event.waitUntil(
            Promise.all(
                [
                    cleanupLegacyCache(),
                ]
            )
                .catch(
                    (err) => {
                        event.skipWaiting();
                    }
                )
        );
    }
);

self.addEventListener(
    'fetch', event => {

        event.respondWith(
            caches.open(CACHE_VERSIONS.content)
                .then(
                    (cache) => {

                        return cache.match(event.request)
                            .then(
                                (response) => {

                                    if (response) {

                                        let headers = response.headers.entries();
                                        let date = null;

                                        for (let pair of headers) {
                                            if (pair[0] === 'date') {
                                                date = new Date(pair[1]);
                                            }
                                        }

                                        if (date) {
                                            let age = parseInt((new Date().getTime() - date.getTime()) / 1000);
                                            let ttl = getTTL(event.request.url);

                                            if (ttl && age > ttl) {

                                                return new Promise(
                                                    (resolve) => {

                                                        return fetch(event.request)
                                                            .then(
                                                                (updatedResponse) => {
                                                                    if (updatedResponse) {
                                                                        cache.put(event.request, updatedResponse.clone());
                                                                        resolve(updatedResponse);
                                                                    } else {
                                                                        resolve(response)
                                                                    }
                                                                }
                                                            )
                                                            .catch(
                                                                () => {
                                                                    resolve(response);
                                                                }
                                                            );

                                                    }
                                                )
                                                    .catch(
                                                        (err) => {
                                                            return response;
                                                        }
                                                    );
                                            } else {
                                                return response;
                                            }

                                        } else {
                                            return response;
                                        }

                                    } else {
                                        return null;
                                    }
                                }
                            )
                            .then(
                                (response) => {
                                    if (response) {
                                        return response;
                                    } else {
                                        return fetch(event.request) 
                                            .then(
                                                (response) => {

                                                    if(response.status < 400) {
                                                        if (~SUPPORTED_METHODS.indexOf(event.request.method) && !isBlacklisted(event.request.url)) {
                                                            cache.put(event.request, response.clone());
                                                        }
                                                        return response;
                                                    } 
                                                    else {
                                                        return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                                                            return cache.match(NOT_FOUND_URL);
                                                        })
                                                    }
                                                }
                                            )
                                            .then((response) => {
                                                if(response) {
                                                    return response;
                                                }
                                            })
                                            .catch(
                                                () => {

                                                    return caches.open(CACHE_VERSIONS.offline)
                                                        .then(
                                                            (offlineCache) => {
                                                                return offlineCache.match(OFFLINE_URL)
                                                            }
                                                        )

                                                }
                                            )
                                        
                                    }
                                }
                            )
                            .catch(
                                (error) => {
                                    console.error('  Error in fetch handler:', error);
                                    throw error;
                                }
                            );
                    }
                )
        );

    }
);
