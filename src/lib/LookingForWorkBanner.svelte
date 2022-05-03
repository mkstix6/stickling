<script>
	let currentlyLookingForWork = true;
</script>

{#if currentlyLookingForWork}
	<div>
		<h2 class="angletext mb2">I'm currently looking for work…</h2>
		<div class="action-grid">
			<a class="megaButton action-grid__item angletext" href="/about"
				>Learn a little more <strong>about me</strong></a
			>
			<a class="megaButton action-grid__item angletext" href="/cv"
				>Check out <strong>my CV</strong></a
			>
			<a class="megaButton action-grid__item angletext" href="/contact"
				>Find my <strong>contact details</strong> here</a
			>
		</div>
	</div>
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
		/* background: var(--card-backgroundcolor); */
		padding: 1em;
		text-decoration: none;
	}
</style>
