
// Install Service Worker
self.addEventListener('install', event => {
	console.log('Service Worker has been installed');
})

// Install Service Worker
self.addEventListener('activate', event => {
	console.log('Service Worker has been activated');
})

// Fetch event
self.addEventListener('fetch', event => {
	console.log('Fetch event is here!', event)
})
