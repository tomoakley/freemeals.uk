const CACHE_ID = 'v1.cache.freemeals.uk';

self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');
  self.skipWaiting();
  /*
  * Any files the need to be pre-cached can be added as in the preCacheFiles array below.
   */
  evt.waitUntil(caches.open(CACHE_ID).then(function (cache) {
    const preCacheFiles = ['/', '/map'];
    cache.addAll(preCacheFiles);
  }));
});

self.addEventListener('fetch', function (evt) {
  console.debug('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(
    update(evt.request)
      .then(refresh)
  );
});

/**
 * Get and return a request from the cache
 * @param request
 * @returns {Promise<Cache>}
 */
function fromCache(request) {
  return caches.open(CACHE_ID).then(function (cache) {
    return cache.match(request);
  });
}

/**
 * Update the cache for a specific request
 * @param request
 * @returns {Promise<unknown>}
 */
function update(request) {
  return caches.open(CACHE_ID).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response.clone()).then(function () {
        console.debug(`${request.url} has been updated in the cache`)
        return response;
      });
    });
  });
}

/**
 * Refresh the client with the newly fetched data
 * @param response
 * @returns {Promise<void>}
 */
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      
      client.postMessage(JSON.stringify(message));
    });
  });
}
