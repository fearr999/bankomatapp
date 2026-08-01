const CACHE_NAME = "fsm-mobile-shell-v1";
const SHELL_URLS = ["/orders", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Only cache-fallback same-origin navigation/static requests. API calls (different origin,
// typically :4000) always go straight to the network — offline queueing for those is handled
// in-app via IndexedDB, not here.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Web Push (бесплатно, свой VAPID-ключ — без Firebase/APNs): бэкенд шлёт
// JSON {title, message}, показываем как обычный системный push.
self.addEventListener("push", (event) => {
  let data = { title: "Corpi", message: "Новое уведомление" };
  try {
    data = event.data.json();
  } catch {
    // не JSON — оставляем дефолт
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then((clients) => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow("/notifications");
    })
  );
});
