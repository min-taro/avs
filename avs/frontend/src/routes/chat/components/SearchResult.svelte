<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { SearchResultNews, SearchResultVolunteer, SearchValue } from '../../../../InfosStore';

	export let searchKeyword = '';

	let loading = writable(false);
	let searchCompleted = writable(false);

	$: volunteerCount = $SearchResultVolunteer.length;
	$: newsCount = $SearchResultNews.length;
	$: currentSearchValue = $SearchValue;

	onMount(async () => {
		if (searchKeyword) {
			loading.set(true);
			searchCompleted.set(false);
			try {
				console.log(`Searching for: ${searchKeyword}`);
				const response = await fetch(
					`/backend/search?keyword=${encodeURIComponent(searchKeyword)}`
				);
				if (response.ok) {
					const data = await response.json();
					console.log('Search results:', data);
					SearchResultVolunteer.set(data.volunteers);
					SearchResultNews.set(data.news);
					SearchValue.set(searchKeyword);
				} else {
					console.error('検索結果の取得に失敗しました');
				}
			} catch (error) {
				console.error('エラーが発生しました: ' + error.message);
			} finally {
				loading.set(false);
				searchCompleted.set(true);
			}
		} else {
			searchCompleted.set(true);
		}
	});

	function openDetailInNewTab(uid) {
		const url = `/detail/${uid}`;
		window.open(url, '_blank');
	}
</script>

<div>
	<h2 class="mt-8">検索結果</h2>
	{#if $loading}
		<p>検索中...</p>
	{:else if $searchCompleted && volunteerCount === 0 && newsCount === 0}
		<p>なにも見つかりませんでした</p>
	{:else if $searchCompleted}
		<p>
			{currentSearchValue}に関連があるボランティアが{volunteerCount}件、お知らせが{newsCount}件見つかりました。
		</p>
		{#if volunteerCount > 0}
			<h3 class="mt-8">ボランティア情報</h3>
			{#each $SearchResultVolunteer as result (result.id)}
				<div class="pb-2" style="display: flex;">
					<div class="card lg:card-side bg-base-100 shadow-xl">
						<figure><img src={result.image} alt="Album" /></figure>
						<div class="card-body">
							<h2 class="card-title">{result.title}</h2>
							<p>開催日：{result.date}</p>
							<p>配信者：{result.provider}</p>
							<p>概要：</p>
							<p>{result.content}</p>
							<div class="card-actions justify-end">
								<button class="btn btn-primary" on:click={() => openDetailInNewTab(result.uid)}
									>詳細</button
								>
							</div>
							<div>
								{#each result.sdgs.split(',') as sdg, sdg_index (sdg_index)}
									<div class="avatar">
										<div class="w-16 rounded">
											<img src={sdg} alt="SDG Icon" />
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		{/if}
		{#if newsCount > 0}
			<h3 class="mt-8">お知らせ</h3>
			{#each $SearchResultNews as result (result.id)}
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="my-accordion-{result.id}" checked="checked" />
					<div class="collapse-title text-xl font-medium">
						{result.title}
					</div>
					<div class="collapse-content">
						<p class="text-right text-xs">{result.date}</p>
						<p class="pt-5">{result.content}</p>
					</div>
				</div>
			{/each}
		{/if}
	{/if}
</div>