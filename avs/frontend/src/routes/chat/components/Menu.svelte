<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick(event) {
		dispatch('menuLinkClicked', { href: event.currentTarget.getAttribute('href') });

		event.preventDefault();
	}
</script>

<div class="text-xl">現在、利用可能なメニュー</div>
<ul class="menu bg-base-200 lg:menu-horizontal rounded-box">
	<li>
		<a href="profile" on:click={handleClick}>
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
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/></svg
			>
			プロフィール
			<span class="badge badge-sm">99+</span>
		</a>
	</li>
	<li>
		<a href="news" on:click={handleClick}>
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
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			お知らせ
			<span class="badge badge-sm badge-warning">NEW</span>
		</a>
	</li>
	<li>
		<a href="volunteer" on:click={handleClick}>
			<svg
				aria-hidden="true"
				focusable="false"
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				width="1em"
				height="1em"
				><!-- Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path
					d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
				/></svg
			>
			ボランティア情報
			<span class="badge badge-xs badge-info"></span>
		</a>
	</li>
</ul>
