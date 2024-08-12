<!-- App.svelte -->
<script>
	import { delay } from '$lib/index';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let isTextVisible = false;
	let isStartVisible = false;
	let text = 'Active Volunteer System';

	async function runAnimation() {
		await delay(() => {
			isTextVisible = true;
		}, 2000);

		await delay(() => {
			isTextVisible = false;
		}, 1000);

		await delay(() => {
			text = 'AVS';
			isTextVisible = true;
		}, 1000);

		await delay(() => {
			isStartVisible = true;
		}, 1000);
	}

	onMount(runAnimation);
</script>

<div class="center-container">
	{#if isTextVisible}
		<div transition:fade class="center-text">
			<h1 class="text-2xl mb-4 text-center">{text}</h1>
		</div>
	{/if}
</div>

<div class="center-container">
	{#if isTextVisible && isStartVisible}
		<div transition:fade class="center-text-link">
			<a href="/chat" class="btn btn-outline btn-info btn-block">start avs</a>
		</div>
	{/if}
</div>

<style>
	.center-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.center-text {
		margin-bottom: 20px;
	}

	.center-text-link {
		margin-top: 250px;
	}
</style>
