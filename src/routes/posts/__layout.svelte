<script context="module">
	export async function load({ page }) {
		return {
			props: {
				page,
			},
		};
	}
</script>

<script>
	export let page;

	import PostPortal from '$lib/PostPortal.svelte';
	import { postItems } from '$lib/sitedata.js';

	$: slug = page.path.split('/').pop();
	$: thisPost = postItems.find((item) => item.slug === slug);
	$: thisPostIndex = postItems.findIndex((item) => item.slug === slug);
	$: prevPost = postItems[thisPostIndex - 1];
	$: nextPost = postItems[thisPostIndex + 1];
</script>

<svelte:head>
	{#if thisPost?.title}
		<title>{thisPost.title} | Posts | Stickling.co.uk</title>
	{:else}
		<title>{slug} | Posts | Stickling.co.uk</title>
	{/if}
</svelte:head>

<div class="page page--post">
	<div class="pretitle">
		<a class="button backbutton" href="/posts">&lt; All Posts</a>
	</div>

	<main id="main">
		<slot />
	</main>

	<footer>
		<div>
			<a class="button" href="/posts">&lt; view all posts</a>
		</div>
		<div class="prevnext">
			<div class="prevnext-button">
				{#if prevPost}
					<div class="prevnext-label"><div>Previous</div></div>
					<PostPortal {...prevPost} />
				{/if}
			</div>
			<div class="prevnext-button">
				{#if nextPost}
					<div class="prevnext-label"><div>Next</div></div>
					<PostPortal {...nextPost} />
				{/if}
			</div>
		</div>
	</footer>
</div>

<style lang="scss">
	:global(.page--post h1) {
		margin-left: auto;
		margin-right: auto;
		font-size: clamp(2.5rem, 4rem, 5vw);
		text-wrap: wrap;
		width: 100%;
		text-align: center;
	}

	.backbutton {
		// display: block;
		opacity: 0.7;
		margin-bottom: 1rem;
		transition: opacity 300ms;

		&:focus,
		&:hover {
			opacity: 1;
		}
	}

	.pretitle {
		display: inline-block;
	}
	.pretitle,
	footer {
		a {
			text-decoration: none;
		}
	}
	footer {
		background: var(--card-backgroundcolor);
		border-radius: 1rem;
		padding: 0.5rem 1.5rem;

		display: grid;
		grid-template-columns: 1fr 1fr;

		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}
		margin: 5rem 0;
		a {
			padding: 0;
		}
	}

	.prevnext {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2em;

		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}

	.prevnext-button {
		position: relative;
	}

	.prevnext-label {
		perspective: 150px;
		position: absolute;
		top: 3em;
		left: -1em;
		z-index: 2;
	}
	.prevnext-label > div {
		display: block;

		font-weight: 900;
		padding: 0.2em 1em;
		box-shadow: 0 0.5em 1em -0.5em #0005;
		transform: rotateY(-15deg);
		position: relative;

		@media (prefers-color-scheme: dark) {
			background: white;
			color: black;
		}
		@media (prefers-color-scheme: light) {
			background: #111;
			color: white;
		}
	}
</style>
