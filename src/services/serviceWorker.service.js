const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/**
 * Register the service worker on the browser
 */
export const registerServiceWorker = () => {
  console.log("Registering service worker!")
  if ('serviceWorker' in navigator) {
    console.log("Service worker found!");
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }
    
    window.addEventListener('load', () => {
      if (isLocalhost) {
        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://bit.ly/CRA-PWA'
          );
        });
      }
      navigator.serviceWorker
        .register('serviceWorker.js')
        .then(registration => {
          console.log('Service worker registered!', registration);
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  } else {
    console.error('No service worker in the navigator!')
  }
};

/**
 * Unregister any active service workers
 * Left here in case we want to disable the caching/offline functionality in the future
 */
export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
};

