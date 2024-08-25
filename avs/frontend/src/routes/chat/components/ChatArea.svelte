<script>
	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';
	import { writable } from 'svelte/store';
	import Menu from './Menu.svelte';
	import MessageSystem from './MessageSystem.svelte';
	import MessageUser from './MessageUser.svelte';
	import News from './News.svelte';
	import Profile from './Profile.svelte';
	import SearchResult from './SearchResult.svelte';
	import Volunteer from './Volunteer.svelte';

	export let search_result;

	let llm = writable('Phi-3');
	let llm_api_key = 'app-uRPy0JQZGtw2mU12OvkU15tb';

	let messages = [];
	let newMessage = '';
	let showSystemMessage = false;
	let messageBox;
	let messageId = 0;
	let messageSystemFinished = false;
	let clickedLink = '';
	let isComposing = false;
	let newsIds = [];
	let volunteerUids = [];

	let volunteerId;

	page.subscribe(($page) => {
		volunteerId = $page.url.searchParams.get('volunteerId');
	});

	onMount(async () => {
		if (volunteerId) {
			try {
				const response = await fetch(`/backend/volunteer_info/${volunteerId}`);
				if (response.ok) {
					const volunteerInfo = await response.json();
					volunteerUids = [volunteerInfo.uid];
					messages = [
						...messages,
						{
							id: messageId++,
							text: 'ボランティア情報を表示します。',
							type: 'system',
							component: 'volunteer'
						}
					];
				} else {
					console.error('ボランティア情報の取得に失敗しました');
				}
			} catch (error) {
				console.error('エラーが発生しました: ' + error.message);
			}
		}
		try {
			const response = await fetch('/backend/settings');
			if (response.ok) {
				const settings = await response.json();
				llm.set(settings.llm);
				switch (llm) {
					case 'Phi-3':
						llm_api_key = 'app-uRPy0JQZGtw2mU12OvkU15tb';
						break;
					case 'Gemma':
						llm_api_key = 'app-CO4HcuVIkvE4DdRl0Ittssvj';
						break;
					case 'japanese-stablelm':
						llm_api_key = 'app-HfvhzBh4MqmNMjJeFHQ0c1H0';
						break;
					default:
						llm_api_key = 'app-uRPy0JQZGtw2mU12OvkU15tb';
						break;
				}
			} else {
				console.error('設定の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}
	});

	async function handleChildFinished() {
		messageSystemFinished = true;
	}

	async function sendMessage() {
		search_result = null;
		clickedLink = '';
		if (newMessage) {
			messages = [...messages, { id: messageId++, text: newMessage, type: 'user' }];
			scrollToBottom();

			const processingMessageId = messageId++;
			messages = [
				...messages,
				{ id: processingMessageId, text: '解析しています……', type: 'system' }
			];
			scrollToBottom();

			showSystemMessage = true;
			const userMessage = newMessage;
			newMessage = '';

			try {
				const controller = new AbortController();
				const timeoutId = setTimeout(() => controller.abort(), 600000);
				
				const response = await fetch('/dify/v1/workflows/run', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${llm_api_key}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						inputs: {
							chat_text: userMessage
						},
						response_mode: 'blocking',
						user: 'user'
					}),
					signal: controller.signal
				});

				clearTimeout(timeoutId);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				if (data.data.outputs) {
					const parsedData = JSON.parse(data.data.outputs.test);
					console.log('Parsed Data:', parsedData);
					if (parsedData.id) {
						newsIds = parsedData.id;
						messages = [
							...messages,
							{
								id: messageId++,
								text: 'お知らせを表示します。',
								type: 'system',
								component: 'news'
							}
						];
					} else if (parsedData.uid) {
						volunteerUids = parsedData.uid;
						messages = [
							...messages,
							{
								id: messageId++,
								text: 'ボランティア情報を表示します。',
								type: 'system',
								component: 'volunteer'
							}
						];
					} else {
						messages = [
							...messages,
							{
								id: messageId++,
								text: '「ボランティア情報を教えて」「お知らせを表示して」などと入力してください。\nまた、下記のメニューからもご利用いただけます。',
								type: 'system',
								component: 'menu'
							}
						];
						messageSystemFinished = true;
					}
					scrollToBottom();
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					console.error('Error: Request timed out');
				} else {
					console.error(error.message);
				}
			}
		}
	}

	async function scrollToBottom() {
		await tick();
		messageBox.scrollTop = messageBox.scrollHeight;
	}

	function handleMenuLinkClicked(event) {
		clickedLink = event.detail.href;
		scrollToBottom();
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' && !isComposing) {
			sendMessage();
		}
	}

	function handleCompositionStart() {
		isComposing = true;
	}

	function handleCompositionEnd() {
		isComposing = false;
	}
</script>

<div class="p-5">
	<div class="message-box rounded-lg p-2 overflow-y-scroll" bind:this={messageBox}>
		{#each messages as message (message.id)}
			{#if message.type === 'user'}
				<MessageUser message={message.text} />
			{:else if message.type === 'system'}
				<MessageSystem on:stringDisplayed={handleChildFinished} inputString={message.text} />
			{/if}
			{#if message.component === 'volunteer'}
				<Volunteer {volunteerUids} />
			{/if}
			{#if message.component === 'news'}
				<News {newsIds} />
			{/if}
			{#if message.component === 'menu'}
				<Menu on:menuLinkClicked={handleMenuLinkClicked} />
			{/if}
		{/each}

		{#if search_result}
			<SearchResult />
		{/if}

		{#if clickedLink === 'profile'}
			<Profile />
		{/if}
		{#if clickedLink === 'news'}
			<News />
		{/if}
		{#if clickedLink === 'volunteer'}
			<Volunteer />
		{/if}
	</div>

	<div class="input-box pt-5">
		<input
			type="text"
			class="flex-grow p-2 border rounded-lg"
			placeholder="メッセージを入力..."
			bind:value={newMessage}
			on:keydown={handleKeyDown}
			on:compositionstart={handleCompositionStart}
			on:compositionend={handleCompositionEnd}
		/>

		&nbsp;
		<button class="btn btn-active btn-neutral" on:click={sendMessage} alt="送信">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.5 11.5L21.5 3.5L17.5 21.5L11 14L2.5 11.5Z"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	.chat-container {
		padding-top: 3%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 92vh;
	}

	.chat-box {
		width: 100%;
		max-width: 400px;
		padding: 16px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: #fff;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.message-box {
		flex: 1;
		margin-bottom: 16px;
		overflow-y: auto;
	}

	.input-box {
		display: flex;
		justify-content: space-between;
	}
</style>
