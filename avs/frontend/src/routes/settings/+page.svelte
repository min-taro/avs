<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { get, writable } from 'svelte/store';

	let role = writable('');
	let title = writable(true);
	let content = writable(true);
	let date = writable(true);
	let updateDate = writable(true);
	let llm = writable('Phi-3');
	let errorMessage = writable('');
	let successMessage = writable('');

	onMount(async () => {
		role.set(sessionStorage.getItem('role'));
		if (get(role) !== 'admin') {
			alert('閲覧権限がありません');
			goto('/logout');
		}

		try {
			const response = await fetch('/backend/settings');
			if (response.ok) {
				const settings = await response.json();
				title.set(settings.title);
				content.set(settings.content);
				date.set(settings.date);
				updateDate.set(settings.updateDate);
				llm.set(settings.llm);
			} else {
				errorMessage.set('設定の取得に失敗しました');
			}
		} catch (error) {
			errorMessage.set('エラーが発生しました: ' + error.message);
		}
	});

	const saveSettings = async () => {
		const settings = {
			title: get(title),
			content: get(content),
			date: get(date),
			updateDate: get(updateDate),
			llm: get(llm)
		};

		try {
			const response = await fetch('/backend/settings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(settings)
			});

			if (response.ok) {
				successMessage.set('設定が保存されました');
			} else {
				const errorResult = await response.json();
				errorMessage.set('設定の保存に失敗しました: ' + errorResult.detail);
			}
		} catch (error) {
			errorMessage.set('エラーが発生しました: ' + error.message);
		}
	};

	const goToChat = () => {
		goto('/chat');
	};

	const sendNotification = async (type) => {
		let notificationData = {};

		try {
			if (type === 'volunteer') {
				const response = await fetch('/backend/latest_volunteer');
				if (response.ok) {
					const latestVolunteer = await response.json();
					notificationData = {
						title: '新しいボランティアが登録されました。',
						message: latestVolunteer.title,
						volunteerId: latestVolunteer.uid,
						type: 'volunteer'
					};
				} else {
					const errorText = await response.text();
					errorMessage.set('ボランティア情報の取得に失敗しました: ' + errorText);
					return;
				}
			} else if (type === 'news') {
				const response = await fetch('/backend/latest_news');
				if (response.ok) {
					const latestNews = await response.json();
					notificationData = {
						title: latestNews.title,
						message: latestNews.content,
						type: 'news'
					};
				} else {
					const errorText = await response.text();
					errorMessage.set('お知らせの取得に失敗しました: ' + errorText);
					return;
				}
			}

			const response = await fetch('/backend/send_notification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(notificationData)
			});

			if (response.ok) {
				successMessage.set('Push通知が送信されました');
			} else {
				const errorResult = await response.json();
				errorMessage.set('通知の送信に失敗しました: ' + errorResult.detail);
			}
		} catch (error) {
			console.error('エラーが発生しました:', error);
			errorMessage.set('エラーが発生しました: ' + error.message);
		}
	};
</script>

{#if $role === 'admin'}
	<div
		class="flex min-h-screen items-start justify-center pt-12 bg-gray-100"
		style="padding-top: 50px;"
	>
		<div
			class="w-full max-w-md px-8 py-6 bg-white border border-gray-300 rounded-lg shadow-md"
			style="margin: 15px;"
		>
			<h1 class="text-center text-2xl font-bold mb-6">設定</h1>

			{#if $errorMessage}
				<p class="text-red-500 text-xs italic mt-2">{$errorMessage}</p>
			{/if}
			{#if $successMessage}
				<p class="text-green-500 text-xs italic mt-2">{$successMessage}</p>
			{/if}

			<div class="title mb-4">
				<label class="block text-sm font-bold text-gray-700">
					<input type="checkbox" bind:checked={$title} class="mr-2" />
					タイトルを表示
				</label>
			</div>

			<div class="content mb-4">
				<label class="block text-sm font-bold text-gray-700">
					<input type="checkbox" bind:checked={$content} class="mr-2" />
					コンテンツを表示
				</label>
			</div>

			<div class="date mb-4">
				<label class="block text-sm font-bold text-gray-700">
					<input type="checkbox" bind:checked={$date} class="mr-2" />
					登録日を表示
				</label>
			</div>

			<div class="updateDate mb-4">
				<label class="block text-sm font-bold text-gray-700">
					<input type="checkbox" bind:checked={$updateDate} class="mr-2" />
					更新日を表示
				</label>
			</div>

			<div class="llm mb-4">
				<label class="block text-sm font-bold text-gray-700">
					LLMを選択：
					<select bind:value={$llm} class="input input-bordered w-full mt-2">
						<option>Phi-3</option>
						<option>Gemma</option>
						<option>japanese-stablelm</option>
					</select>
				</label>
			</div>

			<div class="mb-4">
				<button on:click={() => sendNotification('volunteer')} class="btn btn-primary w-full"
					>ボランティア情報を通知</button
				>
			</div>

			<div class="mb-4">
				<button on:click={() => sendNotification('news')} class="btn btn-primary w-full"
					>お知らせを通知</button
				>
			</div>

			<div class="flex items-center justify-between mt-6">
				<button on:click={saveSettings} class="btn btn-primary w-1/2">設定を保存</button>
				<button on:click={goToChat} class="btn btn-secondary w-1/2 ml-2"
					>チャットページに戻る</button
				>
			</div>
		</div>
	</div>
{/if}
