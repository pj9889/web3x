// sw.js
self.addEventListener('push', function(event) {
    let messageData = event.data ? event.data.text() : 'You have a new message! 😉';

    const options = {
        body: messageData,
        icon: 'https://i.pravatar.cc/150?u=jacklyn',
        badge: 'https://i.pravatar.cc/150?u=jacklyn',
        vibrate: [200, 100, 200],
        tag: 'jacklyn-msg',
        renotify: true,
        data: {
            url: '/' // এটি নিজে থেকেই আপনার সাইটের ইউআরএল নিয়ে নিবে
        }
    };

    event.waitUntil(
        self.registration.showNotification('Jacklyn Rose ✓', options)
    );
});

// নোটিফিকেশনে ক্লিক করলে ওয়েবসাইটে ফিরিয়ে নেওয়া
self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if ('focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
