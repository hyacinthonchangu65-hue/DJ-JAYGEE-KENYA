const CACHE_NAME = "dj-jaygee-kenya-v1"

self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const networkResponse = fetch(event.request).then(response => {
        if (response.ok) {
          const responseCopy = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy))
        }
        return response
      })

      return cachedResponse || networkResponse
    })
  )
})
