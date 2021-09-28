<script>
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';

	let startDate = 20210928;
</script>

<div class="p5 m5" />
<div class="m5">
	<div class="grid">
		{#each Array(128) as _, i}
			<CanvasArt seed={i} />
		{/each}
	</div>
	<!-- <CanvasArt seed={i} /> -->
	<!-- <CanvasArt seed={10} diagnostics={true} /> -->
</div>

<style>
	.grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-content: flex-start;
	}

	.grid > * {
		flex: 0 0 256px;
	}

	.halfs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
