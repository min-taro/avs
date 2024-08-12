<script>
	let checked = false;

	// 各画像のチェック状態を管理する配列
	let checkedImages = Array(18).fill(false);

	// 画像をクリックした際の処理
	/**
	 * @param {number} index
	 */
	function toggleCheck(index) {
		checkedImages[index] = !checkedImages[index];
	}
</script>

<div class="grid-container">
	<!-- 18枚の画像を追加 -->
	{#each Array.from({ length: 18 }) as _, index}
		<div class="grid-item" on:click={() => toggleCheck(index)} style="position: relative;">
			<img src={`sdgs/sdg_icon_${index + 1}.png`} alt={`Image ${index + 1}`} />
			<!-- チェックマークを画像の内部に配置 -->
			<span
				class="checkmark"
				style="position: absolute; bottom: 0px; right: 0px; display: {checkedImages[index]
					? 'block'
					: 'none'};">✓</span
			>
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr); /* 4列 */
		grid-template-rows: repeat(5, auto); /* 5行 */
		gap: 10px; /* 画像間の余白 */
	}

	.grid-item {
		width: 100%; /* 各画像の幅 */
		height: auto; /* 自動高さ調整 */
	}

	/* 画像が親要素をはみ出さないようにするためのスタイル */
	img {
		max-width: 100%;
		height: auto;
		cursor: pointer; /* カーソルをポインターに変更 */
	}

	.checkmark {
		position: absolute; /* 絶対位置指定 */
		bottom: 0px; /* 下側からの距離 */
		right: 0px; /* 右側からの距離 */
		display: none; /* 初期状態では非表示 */
		color: green; /* チェックマークの色 */
		font-size: 48px; /* チェックマークのサイズ */
	}

	.checked {
		display: block; /* クリックされたときに表示 */
	}
</style>
