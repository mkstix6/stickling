<script>
	import Hex38AristotlesPuzzle from '$lib/Hex38AristotlesPuzzle.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
</script>

<h1 class="angletext">Hex38 — Aristotle's puzzle</h1>
<p>
	My Dad received a wooden puzzle for his birthday which we noodled over for a while. I thought I'd
	create a digital version of it do the arithmetic on the fly and help us think of logical
	approaches the solution.
</p>

<figure>
	<Hex38AristotlesPuzzle />
	<figcaption
		>Switch the tiles so that every line adds up to 38. There are good reasons for this puzzle's
		⭐️⭐️⭐️⭐️⭐️ difficulty rating.</figcaption
	>
</figure>

<SocialLink href="https://codepen.io/mkstix6/pen/qBrGYEG" service="codepen"
	>This little project is also visible on CodePen.</SocialLink
>

<style>
	figure {
		position: relative;
	}
</style>
