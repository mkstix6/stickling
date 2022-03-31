<script>
	let currentlyLookingForWork = true;
</script>

{#if currentlyLookingForWork}
	<section class="section px3 py2">
		<h2 class="angletext mb2">I'm currently looking for work…</h2>
		<div class="action-grid">
			<a class="action-grid__item angletext" href="/cv">Check out <strong>my CV</strong></a>
			<a class="action-grid__item angletext" href="/contact"
				>Find my <strong>contact details</strong> here</a
			>
			<a class="action-grid__item angletext" href="/about"
				>Learn a little more <strong>about me</strong></a
			>
		</div>
	</section>
{/if}

<style>
	.action-grid {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		gap: 2em;
	}

	.action-grid__item {
		flex: 1 1 auto;
		background: var(--card-backgroundcolor);
		padding: 2em;
		text-decoration: none;
	}
</style>
