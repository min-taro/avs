<script>
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { email } from '../../../../../store';

	let userEmail = '';

	$: userEmail = get(email) || 'user@example.com';

	function goToChat() {
		goto('/chat');
	}

</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="w-full max-w-md p-8 bg-white border border-gray-300 rounded-lg shadow-md">
		<h2 class="text-xl font-semibold text-center mb-6">確認メールを送信しました</h2>
		<p class="text-sm text-gray-700 mb-3">
			引き続きアカウントの設定を完了するために、<strong>{userEmail}</strong> 宛に送信したメール内のリンクをクリックしてください。
		</p>
		<p class="text-sm text-gray-700 mb-6">
			メールが見つからない場合は、迷惑メールフォルダを確認するか、再送信の手続きを行ってください。
		</p>
		<div class="flex justify-center">
			<button class="btn btn-primary">メールを再送信</button>
			<button class="btn btn-primary" on:click={goToChat}>チャットへ戻る</button>
		</div>
	</div>
</div>
