<script lang="ts">
	export let itemcount = 0;

	import { postItems } from '$lib/sitedata';
	import PostPortal from '$lib/PostPortal.svelte';
	import { fly } from 'svelte/transition';

	let posts = [];
	if (postItems.length) {
		posts = [...postItems].sort((a, b) => {
			let pa = a.priority;
			let pb = b.priority;
			if (!pa && !pb) return 0;
			if (!pa) return 1;
			if (!pb) return -1;
			return pa > pb ? 1 : pa < pb ? -1 : 0;
		});
	}
	if (itemcount > 0 && posts.length) {
		posts = posts.slice(0, itemcount);
	}
</script>

<div class="postGrid">
	{#each posts as post, index}
		<div in:fly={{ delay: index * 40 + 400, duration: 400, x: 5, y: 20, opacity: 0 }}>
			<PostPortal
				link={post.link}
				thumbnail={post.thumbnail}
				videothumbnail={post.videothumbnail}
				tech={post.tech}
				title={post.title}
				codethumbnail={post.codethumbnail}
			/>
		</div>
	{/each}
</div>

<div class="BDgradient"></div>

<style lang="scss">
	.postGrid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		@media screen and (max-width: 400px) {
			grid-template-columns: 1fr;
		}

		& {
			/* This is better for small screens, once min() is better supported */
			/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
			gap: 2rem;
			margin-bottom: 5rem;
			max-width: 1248px;
		}
	}
</style>
