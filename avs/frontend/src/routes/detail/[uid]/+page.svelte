<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	let volunteer = writable({});

	onMount(async () => {
		try {
			const response = await fetch(`/backend/volunteer_info/${data.uid}`);
			if (response.ok) {
				const volunteerData = await response.json();
				volunteerData.sdgs = volunteerData.sdgs.split(',');
				volunteer.set(volunteerData);
			} else {
				console.error('ボランティア情報の取得に失敗しました');
			}
		} catch (error) {
			console.error('エラーが発生しました: ' + error.message);
		}
	});
</script>

{#if $volunteer && $volunteer.title}
	<div
		class="flex min-h-screen items-start justify-center pt-12 bg-gray-100 font-bold text-gray-700"
	>
		<div class="volunteer-container px-8 py-6 bg-white border border-gray-300 rounded-lg shadow-md">
			<div class="mb-6">
				<h2 class="volunteer-title">{$volunteer.title}</h2>
				<p class="volunteer-date">開催日：{$volunteer.date}</p>
				<p class="volunteer-provider">配信者：{$volunteer.provider}</p>
				<p>概要：</p>
				<p class="volunteer-content">{$volunteer.content}</p>
				<div class="images">
					<img class="volunteer-image" src={$volunteer.image} alt="Event Image" />
					{#each $volunteer.sdgs as sdg}
						<div class="avatar">
							<div class="w-16 rounded">
								<img src="../static/{sdg}" alt="SDG Icon" />
							</div>
						</div>
					{/each}
				</div>
			</div>
			<a class="btn btn-primary" href="../chat">チャット画面に戻る</a>
		</div>
	</div>
{/if}

<style>
	html {
		background-color: rgb(243, 244, 246);
	}

	.volunteer-container {
		border: 1px solid #ccc;
		padding: 16px;
		border-radius: 8px;
		margin: 20px auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.volunteer-title {
		font-size: 24px;
		margin-bottom: 8px;
	}

	.volunteer-date,
	.volunteer-provider,
	.volunteer-content {
		margin-bottom: 8px;
	}

	.volunteer-image {
		margin: 50px 0 50px 0;
	}
</style>
