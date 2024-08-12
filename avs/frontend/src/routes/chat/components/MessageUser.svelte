<script>
	import { getTimeAgo } from '$lib/index';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let message = '';
	let startDate = new Date();
	let timeAgo = 'たった今';
	let interval;
	let username = writable('');

	onMount(() => {
		interval = setInterval(updateTimeAgo, 3000);
		startDate = new Date();
		const storedUsername = sessionStorage.getItem('username');
		username.set(storedUsername ? storedUsername : 'user');
	});

	function updateTimeAgo() {
		timeAgo = getTimeAgo(startDate);
	}
</script>

<div class="chat chat-start">
	<div class="chat-header">
		{$username}
		<time class="text-xs opacity-50">{timeAgo}</time>
	</div>
	<div class="chat-bubble chat-bubble-primary">{message}</div>
</div>
