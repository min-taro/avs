<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		sessionStorage.clear();
	});

	function goToChat() {
		goto('/chat');
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold text-center mb-6">ログアウト完了</h2>
		<p class="text-sm text-gray-700 mb-3">ログアウトが完了しました</p>
		<div class="flex justify-center">
			<button class="btn btn-primary" on:click={goToChat}>チャットへ戻る</button>
		</div>
	</div>
</div>
