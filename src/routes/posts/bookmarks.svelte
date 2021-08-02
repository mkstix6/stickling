<script>
	import BookmarkRow from '$lib/BookmarkRow.svelte';

	import { bookmarks } from '$lib/sitedata.js';

	$: sortChoice = '';
	$: sortedBookmarks = [...bookmarks];

	function sortByKey(key) {
		return (a, b) => {
			return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
		};
	}

	$: {
		if (sortChoice === 'tech') {
			sortedBookmarks = [
				...bookmarks.sort((a, b) => {
					let aTech = a[sortChoice][0];
					let bTech = b[sortChoice][0];
					return aTech > bTech ? 1 : aTech < bTech ? -1 : 0;
				}),
			];
		} else if (sortChoice) {
			sortedBookmarks = [...bookmarks.sort(sortByKey(sortChoice))];
		} else {
			sortedBookmarks = [...bookmarks.sort(sortByKey('order'))];
		}
	}
</script>

<div class="page page--post">
	<main id="main">
		<h1 class="angletext">Bookmarks</h1>
		<p>My catalogue of other people's articles that have helped.</p>
		<form action="">
			<label for="bookmarksSort">Sort by…</label>
			<select name="bookmarksSort" id="bookmarksSort" bind:value={sortChoice}>
				<option value="order" selected>Default order</option>
				<option value="title">Title</option>
				<option value="domain">Domain</option>
				<option value="tech">Tech</option>
			</select>
		</form>
		<ul>
			{#each sortedBookmarks as bookmark (bookmark.order)}
				<li>
					<BookmarkRow
						url={bookmark.url}
						title={bookmark.title}
						domain={bookmark.domain}
						tech={bookmark.tech}
					/>
				</li>
			{/each}
		</ul>
	</main>
</div>

<style>
	li {
		max-width: none;
		display: block;
		clear: both;
		margin: 0;
	}

	select {
		-webkit-appearance: none;
		background: var(--card-backgroundcolor);
		color: var(--bodycolor);
		border: none;
		padding: 0.2em 0.5em;
		border-radius: 0.25em;
		font-size: 1em;
	}
</style>
