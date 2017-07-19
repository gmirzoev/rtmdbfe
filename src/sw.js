const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        fetch('asset-manifest.json')
          .then(response => response.json())
          .then(assets => {
            cache.addAll([
              '/',
              '/index.html',
              ...Object.values(assets),
            ]);
          });
      }),
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
          return false;
        })),
      ),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request)
        .then(response => caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, response.clone());
            return response;
          }),
        ),
      ),
  );
});
