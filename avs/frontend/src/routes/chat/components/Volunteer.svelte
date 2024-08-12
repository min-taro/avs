<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let volunteerUids = null;

	let title = writable(true);
	let content = writable(true);
	let date = writable(true);
	let updateDate = writable(true);
	let volunteerInfos = writable([]);

	onMount(async () => {
		try {
			let response = await fetch('/backend/settings', {
				headers: {
					Authorization: `Bearer ${API_KEY}`
				}
			});
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
			let volunteerResponse;
			if (volunteerUids && volunteerUids.length > 0) {
				volunteerResponse = await fetch('/backend/volunteer_infos_by_uids', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ uids: volunteerUids })
				});
			} else {
				volunteerResponse = await fetch('/backend/volunteer_infos');
			}

			if (volunteerResponse.ok) {
				const volunteerInfosData = await volunteerResponse.json();
				volunteerInfos.set(
					volunteerInfosData.map((info) => {
						return { ...info, sdgs: info.sdgs ? info.sdgs.split(',') : [] };
					})
				);
			} else {
				console.error('ボランティア情報の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}
	});

	function openDetailInNewTab(uid) {
		const url = `/detail/${uid}`;
		window.open(url, '_blank');
	}

	let maxVisibleItems = 3;
	function loadMore() {
		maxVisibleItems += 3;
	}
</script>

<div class="pt-5">
	<div class="text-xl">ボランティア情報</div>
	{#each $volunteerInfos as info (info.id)}
		{#if $volunteerInfos.indexOf(info) < maxVisibleItems}
			<div class="pb-2" style="display: flex; ">
				<div class="card lg:card-side bg-base-100 shadow-xl">
					<figure><img src={info.image} alt="Album" /></figure>
					<div class="card-body">
						{#if $title}
							<h2 class="card-title">{info.title}</h2>
						{/if}
						{#if $date}
							<p>開催日：{info.date}</p>
						{/if}
						<p>配信者：{info.provider}</p>
						{#if $updateDate && info.updateDate}
							<p>更新日：{info.updateDate}</p>
						{/if}
						{#if $content}
							<p>概要：</p>
							<p>{info.content}</p>
						{/if}
						<div class="card-actions justify-end">
							<button class="btn btn-primary" on:click={() => openDetailInNewTab(info.uid)}
								>詳細</button
							>
						</div>
						<div>
							{#each info.sdgs as sdg}
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
		{/if}
	{/each}
	{#if $volunteerInfos.length > maxVisibleItems}
		<div class="flex justify-center pt-8">
			<a class="link link-info" on:click={loadMore}>もっと見る</a>
		</div>
	{/if}
</div>
