
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}



// Install event cache
self.addEventListener('install', (event) => {



	console.log('Service Worker has been installed');
})
