<script>
	import { getTimeAgo } from '$lib/index';
	import { createEventDispatcher, onMount } from 'svelte';

	export let inputString = '';

	let targetVariable = '';
	let startDate = new Date();
	let timeAgo = 'たった今';
	let interval;

	const dispatch = createEventDispatcher();

	function updateTimeAgo() {
		timeAgo = getTimeAgo(startDate);
	}

	onMount(() => {
		let index = 0;

		const interval = setInterval(updateTimeAgo, 3000);
		startDate = new Date();

		const intervalId = setInterval(() => {
			if (index < inputString.length) {
				targetVariable += inputString.charAt(index);
				index++;
			} else {
				clearInterval(intervalId);

				dispatch('stringDisplayed');
			}
		}, 50);
	});

	$: {
		if (inputString) {
			targetVariable = '';
			startDate = new Date();
		}
	}
</script>

<div class="chat chat-end">
	<div class="chat-header">
		AVS
		<time class="text-xs opacity-50">{timeAgo}</time>
	</div>
	<div class="chat-bubble chat-bubble-info">{targetVariable}</div>
</div>
