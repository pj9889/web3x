// sw.js
self.addEventListener('push', function(event) {
    let messageData = event.data ? event.data.text() : 'Hey! Are you there? 😉';

    const options = {
        body: messageData,
        icon: 'https://i.pravatar.cc/150?u=jacklyn',
        badge: 'https://i.pravatar.cc/150?u=jacklyn',
        vibrate: [200, 100, 200],
        tag: 'jacklyn-msg',
        renotify: true,
        data: {
            url: 'YOUR_WEBSITE_URL' // এখানে আপনার ওয়েবসাইট লিঙ্ক দিন
        }
    };

    event.waitUntil(
        self.registration.showNotification('Jacklyn Rose ✓', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    const targetUrl = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            // যদি সাইটটি অন্য কোনো ট্যাবে ওপেন থাকে তবে সেখানে ফোকাস করো
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // যদি ওপেন না থাকে তবে নতুন করে ওপেন করো
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
