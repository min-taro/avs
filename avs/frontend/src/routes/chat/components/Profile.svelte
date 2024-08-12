<script>
	import SDGS from './Sdgs.svelte';

	let isActive1 = false;
	let isActive2 = false;
	let isActive3 = false;

	function toggleButton1() {
		isActive1 = !isActive1;
	}

	function toggleButton2() {
		isActive2 = !isActive2;
	}

	function toggleButton3() {
		isActive3 = !isActive3;
	}
</script>

<div class="pt-5">
	<div class="text-xl">プロフィール</div>

	<div class="pb-2" style="display: flex; ">
		<button
			class:active={isActive1}
			on:click={toggleButton1}
			class="btn btn-blue"
			style="width: 155px;"
		>
			{isActive1 ? 'ボランティア' : 'ボランティア'}
		</button>

		<button
			class:active={isActive2}
			on:click={toggleButton2}
			class="btn btn-blue"
			style="width: 155px;"
		>
			{isActive2 ? 'イベント' : 'イベント'}
		</button>

		<button
			class:active={isActive3}
			on:click={toggleButton3}
			class="btn btn-blue"
			style="width: 155px;"
		>
			{isActive3 ? '店舗' : '店舗'}
		</button>
	</div>
</div>

{#if isActive1}
	<SDGS />
{/if}

<style>
	.btn-blue {
		background-color: #3490dc;
		color: #fff;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-right: 10px;
	}

	.btn-blue.active {
		background-color: #1e40af;
	}
</style>
