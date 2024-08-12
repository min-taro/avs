<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let newsIds = null;

	let title = writable(true);
	let content = writable(true);
	let date = writable(true);
	let updateDate = writable(true);
	let newsInfos = writable([]);

	onMount(async () => {
		try {
			const response = await fetch('/backend/settings');
			if (response.ok) {
				const settings = await response.json();
				title.set(settings.title);
				content.set(settings.content);
				date.set(settings.date);
				updateDate.set(settings.updateDate);
			} else {
				console.error('設定の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}

		try {
			let newsResponse;
			if (newsIds) {
				newsResponse = await fetch('/backend/news_infos_by_ids', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ ids: newsIds })
				});
			} else {
				newsResponse = await fetch('/backend/news_infos');
			}

			if (newsResponse.ok) {
				const newsInfosData = await newsResponse.json();
				newsInfos.set(newsInfosData);
			} else {
				console.error('ニュース情報の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}
	});

	let maxVisibleItems = 3;
	function loadMore() {
		maxVisibleItems += 3;
	}
</script>

<div class="pt-5">
	<div class="text-xl">お知らせ</div>
	<div class="join join-vertical w-full">
		{#each $newsInfos as info (info.id)}
			{#if $newsInfos.indexOf(info) < maxVisibleItems}
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-{info.id}" checked="checked" />
					<div class="collapse-title text-xl font-medium">
						{#if $title}
							{info.title}
						{/if}
					</div>
					<div class="collapse-content">
						{#if $date}
							<p class="text-right text-xs">{info.date}</p>
						{/if}
						{#if $updateDate && info.updateDate}
							<p class="text-right text-xs">{info.updateDate}</p>
						{/if}
						{#if $content}
							<p class="pt-5">{info.content}</p>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
	{#if $newsInfos.length > maxVisibleItems}
		<div class="flex justify-center pt-8">
			<a class="link link-info" on:click={loadMore}>もっと見る</a>
		</div>
	{/if}
</div>
