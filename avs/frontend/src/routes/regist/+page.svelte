<script>
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { email, username } from '../../../store';

	const password = writable('');
	const confirmPassword = writable('');
	const errorMessage = writable('');

	let tempUsername = '';
	let tempEmail = '';
	let tempPassword = '';
	let tempConfirmPassword = '';

	const validateInput = () => {
		if (!tempUsername || !tempEmail || !tempPassword || !tempConfirmPassword) {
			errorMessage.set('すべての項目を入力してください。');
			return false;
		}
		if (tempPassword !== tempConfirmPassword) {
			errorMessage.set('パスワードが一致しません。');
			return false;
		}
		return true;
	};

	const handleSignup = async () => {
		errorMessage.set('');
		if (!validateInput()) {
			return;
		}

		try {
			const response = await fetch('/backend/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					username: tempUsername,
					password: tempPassword,
					email: tempEmail
				})
			});

			const responseText = await response.text();
			if (response.ok) {
				const responseData = JSON.parse(responseText);
				username.set(tempUsername);
				email.set(tempEmail);
				errorMessage.set('okかえってきたよ'); //後で消す
				goto('regist/confirm/mail');
			} else {
				let errorData;
				try {
					errorData = JSON.parse(responseText);
				} catch (e) {
					throw new Error('登録に失敗しました。サーバーからのレスポンス: ' + responseText);
				}
				throw new Error(errorData.detail || '登録に失敗しました。');
			}
		} catch (error) {
			if (error instanceof Error) {
				errorMessage.set(error.message);
			}
		}
	};
</script>

<div
	class="flex min-h-screen items-start justify-center pt-12 bg-gray-100"
	style="padding-top: 50px;"
>
	<div
		class="w-full max-w-md px-8 py-6 bg-white border border-gray-300 rounded-lg shadow-md"
		style="margin-left: 15px; margin-right: 15px;"
	>
		{#if $errorMessage}
			<p class="text-red-500 text-xs italic">{$errorMessage}</p>
		{/if}
		<form class="mb-4" on:submit|preventDefault={handleSignup}>
			<div class="mb-4">
				<label for="username" class="block mb-2 text-sm font-bold text-gray-700">ユーザー名</label>
				<input
					type="text"
					id="username"
					class="input input-bordered w-full"
					placeholder="ユーザー名"
					bind:value={tempUsername}
				/>
			</div>
			<div class="mb-4">
				<label for="email" class="block mb-2 text-sm font-bold text-gray-700">メールアドレス</label>
				<input
					type="email"
					id="email"
					class="input input-bordered w-full"
					placeholder="メールアドレス"
					bind:value={tempEmail}
				/>
			</div>
			<div class="mb-4">
				<label for="password" class="block mb-2 text-sm font-bold text-gray-700">パスワード</label>
				<input
					type="password"
					id="password"
					class="input input-bordered w-full"
					placeholder="パスワード"
					bind:value={tempPassword}
				/>
			</div>
			<div class="mb-6">
				<label for="confirmPassword" class="block mb-2 text-sm font-bold text-gray-700"
					>パスワードの確認</label
				>
				<input
					type="password"
					id="confirmPassword"
					class="input input-bordered w-full"
					placeholder="パスワードの確認"
					bind:value={tempConfirmPassword}
				/>
			</div>
			<div class="flex items-center justify-between">
				<button type="submit" class="btn btn-primary">登録</button>
			</div>
		</form>
	</div>
</div>
