<script>
	import ShapePolygon from '$lib/ShapePolygon.svelte';
	import SunFlare from '$lib/SunFlare.svelte';
</script>

<div class="grid">
	<ShapePolygon pointCount={3} />
	<ShapePolygon pointCount={4} />
	<ShapePolygon pointCount={5} />
	<ShapePolygon pointCount={6} />
	<ShapePolygon pointCount={7} />
	<SunFlare />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		/* This is better for small screens, once min() is better supported */
		/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
		gap: 1rem;
		margin: 5vw;
	}
</style>
