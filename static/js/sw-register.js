if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });

    // notify user to update
    navigator.serviceWorker.onmessage = (e) => {
      console.log('SW: SW Broadcasting:', event);
      const data = e.data

      if (data.command == "UPDATE_FOUND") {
        console.log("UPDATE_FOUND_BY_SW", data);
        createSnackbar({
          message: "Content updated.",
          actionText: "refresh",
          action: function (e) {
            location.reload()
          }
        })
      }
    }
  });
}