// Service Worker for Background Notifications
self.addEventListener('push', function(event) {
    let messageData = 'Hey! Are you there? 😉';
    
    if (event.data) {
        messageData = event.data.text();
    }

    const options = {
        body: messageData,
        icon: 'https://i.pravatar.cc/150?u=jacklyn', // মডেলের ছবি
        badge: 'https://i.pravatar.cc/150?u=jacklyn',
        vibrate: [200, 100, 200],
        tag: 'messenger-notification',
        renotify: true,
        data: {
            url: self.location.origin 
        }
    };

    event.waitUntil(
        self.registration.showNotification('Jacklyn Rose ✓', options)
    );
});

// নোটিফিকেশনে ক্লিক করলে আবার ওয়েবসাইটে নিয়ে যাবে
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === event.notification.data.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(event.notification.data.url);
            }
        })
    );
});
