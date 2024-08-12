<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { SearchResultNews, SearchResultVolunteer, SearchValue } from '../../../InfosStore.js';
	import ChatArea from './components/ChatArea.svelte';

	let isLoggedIn = writable(false);
	let username = writable('');
	let role = writable('');

	const VAPID_PUBLIC_KEY =
		'BPDWnW_iuKPXyY1l2sZLfe0imk-JFzqO9OyWelFNKg9ALYkAqgxj8fFgShAjrN_HdommYb-5ERmzTQdRr7c31pI';

	function urlBase64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
		const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
		const rawData = atob(base64);
		const outputArray = new Uint8Array(rawData.length);

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i);
		}
		return outputArray;
	}

	onMount(async () => {
		isLoggedIn.set(sessionStorage.getItem('isLoggedIn') === 'true');
		username.set(sessionStorage.getItem('username'));
		role.set(sessionStorage.getItem('role'));

		const permission = await Notification.requestPermission();
		if (permission !== 'granted') {
			console.log('通知の許可が得られませんでした');
			return;
		}

		if ('serviceWorker' in navigator) {
			const registration = await navigator.serviceWorker.register('/service-worker.js');
			console.log('Service Worker registered with scope:', registration.scope);

			const existingSubscription = await registration.pushManager.getSubscription();
			if (existingSubscription) {
				const currentKey = existingSubscription.options.applicationServerKey;
				const newKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
				if (currentKey && new Uint8Array(currentKey).toString() !== newKey.toString()) {
					await existingSubscription.unsubscribe();
					console.log('古いサブスクリプションが削除されました');
				} else {
					console.log('既存のサブスクリプションが有効です');
					return;
				}
			}

			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
			});

			await fetch('/backend/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(subscription)
			});
		}
	});

	let searchInput = '';
	let search_result = false;

	const search = async () => {
		try {
			search_result = false; // リセット
			const response = await fetch(`/backend/search?keyword=${encodeURIComponent(searchInput)}`);
			if (response.ok) {
			const data = await response.json();
			SearchResultVolunteer.set(data.volunteers);
			SearchResultNews.set(data.news);
			SearchValue.set(searchInput);
			search_result = true;
			} else {
			console.error('検索結果の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}
	};
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start"></div>
	<div class="navbar-center">
		<a class="btn btn-ghost text-xl">AVS</a>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle" onclick="search_modal.showModal()">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</button>
		<div class="dropdown dropdown-end">
			{#if $isLoggedIn}
				<button class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#5f6368"
					>
						<path
							d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z"
						/>
					</svg>
				</button>
				<ul class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					<li>{$username} さんがログイン中</li>
					<li><a href="/logout">ログアウト</a></li>
				</ul>
			{:else}
				<button class="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#5f6368"
					>
						<path
							d="M80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18q30 0 58.5 3t55.5 9l-70 70q-11-2-21.5-2H400q-71 0-127.5 17T180-306q-9 5-14.5 14t-5.5 20v32h250l80 80H80Zm542 16L484-282l56-56 82 82 202-202 56 56-258 258ZM400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm10 240Zm-10-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Z"
						/>
					</svg>
				</button>
				<ul class="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10">
					<li><a href="/regist">会員登録</a></li>
					<li><a href="/login">ログイン</a></li>
				</ul>
			{/if}
		</div>
		{#if $role === 'admin'}
			<button on:click={() => goto('/settings')}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#5f6368"
				>
					<path
						d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
					/>
				</svg>
			</button>
		{/if}
	</div>
</div>

<dialog id="search_modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h3 class="font-bold text-lg">検索</h3>
		<p class="py-4">検索したい言葉を入力してください。</p>
		<input
			bind:value={searchInput}
			class="input input-bordered w-full max-w-xs"
			type="text"
			placeholder="（例）「やさしい」「高齢者」など"
		/>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-info" on:click={search}>検索</button>
				<button class="btn">キャンセル</button>
			</form>
		</div>
	</div>
</dialog>

<ChatArea {search_result} />

<style>
	:global(body) {
		padding: 0;
		margin: 0;
	}
</style>
