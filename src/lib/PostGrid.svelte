<script>
	export let itemcount = 0;

	import { postItems } from '$lib/sitedata.js';
	import PostPortal from '$lib/PostPortal.svelte';
	import { fly } from 'svelte/transition';

	let posts = [];
	if (postItems.length) {
		posts = [...postItems];
	}
	if (itemcount > 0 && posts.length) {
		posts = posts.slice(0, itemcount);
	}
</script>

<div class="postGrid">
	{#each posts as post, index}
		<div in:fly={{ delay: index * 40, duration: 400, x: 5, y: 20, opacity: 0 }}>
			<PostPortal {...post} />
		</div>
	{/each}
</div>

<div class="BDgradient" />

<style lang="scss">
	.postGrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		@media screen and (max-width: 400px) {
			grid-template-columns: 1fr;
		}
		/* This is better for small screens, once min() is better supported */
		/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
		gap: 1rem;
		margin-bottom: 5rem;
		max-width: 1248px;
	}
</style>
