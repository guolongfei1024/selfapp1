const CACHE_NAME = 'zen-chat-v1';

// Install event
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Fetch event - Network first, fall back to cache logic could go here
// For now, we just allow the fetch to pass through to ensure the app works online
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});