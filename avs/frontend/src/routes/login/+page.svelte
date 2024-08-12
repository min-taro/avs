<script>
	import { goto } from '$app/navigation';

	let inputEmail = '';
	let password = '';
	let errorMessage = '';

	const validateInput = () => {
		if (!inputEmail || !password) {
			errorMessage = 'メールアドレスとパスワードを入力してください。';
			return false;
		}
		return true;
	};

	const handleLogin = async () => {
		errorMessage = '';
		if (!validateInput()) {
			return;
		}

		try {
			const response = await fetch('/backend/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ password, email: inputEmail })
			});

			if (response.ok) {
				const data = await response.json();
				sessionStorage.setItem('username', data.username);
				sessionStorage.setItem('role', data.role);
				sessionStorage.setItem('isLoggedIn', 'true');
				goto('/chat');
			} else {
				errorMessage = 'メールアドレスまたはパスワードが間違っています。';
			}
		} catch (error) {
			if (error instanceof Error) {
				errorMessage = error.message;
			}
		}
	};
</script>

<div
	class="flex min-h-screen items-start justify-center pt-12 bg-gray-100"
	style="padding-top: 50px;"
>
	<div
		class="w-full max-w-xs px-8 py-6 bg-white border border-gray-300 rounded-lg shadow-md"
		style="margin-left: 15px; margin-right: 15px;"
	>
		{#if errorMessage}
			<p class="text-red-500 text-xs italic">{errorMessage}</p>
		{/if}
		<form class="mb-4" on:submit|preventDefault={handleLogin}>
			<div class="mb-4">
				<label for="username" class="block mb-2 text-sm font-bold text-gray-700"
					>メールアドレス</label
				>
				<input
					type="text"
					id="username"
					class="input input-bordered w-full"
					placeholder="メールアドレスを入力してください"
					bind:value={inputEmail}
				/>
			</div>
			<div class="mb-6">
				<label for="password" class="block mb-2 text-sm font-bold text-gray-700">パスワード</label>
				<input
					type="password"
					id="password"
					class="input input-bordered w-full"
					placeholder="パスワードを入力してください"
					bind:value={password}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button type="submit" class="btn btn-primary">ログイン</button>
			</div>
		</form>
	</div>
</div>
