<script>
	import { goto } from '$app/navigation';

	let userData = {
		username: '選択したユーザー名',
		email: 'user@example.com',
		password: '選択したパスワード'
	};

	const handleConfirmSignup = () => {
		console.log('ユーザー登録完了', userData);
		return goto('/regist/confirm/mail');
	};

	const handleGoBack = () => {
		console.log('入力画面に戻る');
	};
</script>

<div class="flex min-h-screen items-start justify-center pt-12 bg-gray-100">
	<div class="w-full max-w-md px-8 py-6 bg-white border border-gray-300 rounded-lg shadow-md">
		<h2 class="text-lg font-semibold mb-4">登録内容の確認</h2>
		<ul class="mb-4">
			<li><strong>ユーザー名:</strong> {userData.username}</li>
			<li><strong>メールアドレス:</strong> {userData.email}</li>
			<li><strong>パスワード:</strong> {userData.password}</li>
		</ul>
		<div class="flex items-center justify-between">
			<button class="btn btn-primary" on:click={handleConfirmSignup}>登録</button>
			<button class="btn btn-secondary" on:click={handleGoBack}>戻る</button>
		</div>
	</div>
</div>
