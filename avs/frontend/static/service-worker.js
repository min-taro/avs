self.addEventListener('push', function (event) {
	const data = event.data.json();
	let url = '/chat';
	if (data.type === 'volunteer') {
		url += '?volunteerId=' + data.volunteerId;
	}

	self.registration.showNotification(data.title, {
		body: data.message,
		icon: '/icon.png',
		data: {
			url: url
		}
	});
});

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	event.waitUntil(
		clients.matchAll({ type: 'window' }).then((clientList) => {
			for (const client of clientList) {
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
