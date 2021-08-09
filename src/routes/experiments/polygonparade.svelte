<script>
	import ShapePolygon from '$lib/ShapePolygon.svelte';
	import SunFlare from '$lib/SunFlare.svelte';
</script>

<div class="grid">
	<div><ShapePolygon pointCount={3} /></div>
	<div><ShapePolygon pointCount={4} /></div>
	<div><ShapePolygon pointCount={5} /></div>
	<div><ShapePolygon pointCount={6} /></div>
	<div><ShapePolygon pointCount={7} /></div>
	<div><ShapePolygon pointCount={8} innerRadius={0.7} chosenShape="star" /></div>
	<div><SunFlare /></div>
</div>

<style>
	.grid {
		display: grid;
		place-items: top center;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-template-rows: 200px;
		/* This is better for small screens, once min() is better supported */
		/* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
		gap: 1rem;
		margin: 5rem 5vw;
	}
</style>
