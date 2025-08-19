// Service Worker for offline support and better error handling
const CACHE_NAME = 'shuaib-github-pages-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/404.html'
];

// Install service worker and cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Cache installation failed:', error);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).catch(function(error) {
          // If fetch fails and we're requesting an HTML page, return 404 page
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/404.html');
          }
          
          // For other resources, return a generic error response
          return new Response('Network error: ' + error.message, {
            status: 500,
            statusText: 'Network Error'
          });
        });
      }
    )
  );
});

// Update service worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for retry mechanisms
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Simple connectivity check
  return fetch('https://api.github.com/zen')
    .then(function(response) {
      if (response.ok) {
        // Send message to all clients that connectivity is restored
        return self.clients.matchAll().then(function(clients) {
          clients.forEach(function(client) {
            client.postMessage({
              type: 'CONNECTIVITY_RESTORED',
              message: 'Network connection restored!'
            });
          });
        });
      }
    })
    .catch(function(error) {
      console.log('Background sync failed:', error);
    });
}