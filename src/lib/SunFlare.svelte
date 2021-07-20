<script>
	import ShapePolygon from '$lib/ShapePolygon.svelte';

	let size = 400;
	export let polyProps = [
		{
			polyStyle: 'fill: #0002; stroke: #0001; stroke-width:4',
			pointCount: 100,
			chosenShape: 'polygon',
			randomness: 4
		},
		{
			polyStyle: 'fill: #0002; stroke: #0001; stroke-width:3',
			pointCount: 30,
			chosenShape: 'star',
			innerRadius: 0.7,
			randomness: 7
		},
		{
			polyStyle: 'fill: #0002; stroke: #0001; stroke-width:3',
			pointCount: 40,
			chosenShape: 'star',
			innerRadius: 0.6,
			randomness: 7
		}
	];
</script>

<div class="square-box">
	<div class="sun">
		<div class="sun__sqhere">
			<ShapePolygon {...polyProps[0]} {size} />
		</div>
		<div class="sun__innerflare">
			<ShapePolygon {...polyProps[1]} {size} />
		</div>
		<div class="sun__outerflare">
			<ShapePolygon {...polyProps[2]} {size} />
		</div>
	</div>
</div>

<style>
	:root {
		--rotatetime: 120s;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.sun {
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		border-radius: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.sun__sqhere,
	.sun__innerflare,
	.sun__outerflare {
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		position: absolute;
		top: calc((100% - var(--size)) / 2);
		left: calc((100% - var(--size)) / 2);
		animation-name: rotate;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		/* filter: drop-shadow(0 0 5em black) contrast(700) invert(1); */
	}
	.sun__sqhere {
		--size: 55%;
		z-index: 3;
		animation-duration: calc(var(--rotatetime) * 1.5);
	}
	.sun__innerflare {
		--size: 86%;
		z-index: 2;
		animation-duration: var(--rotatetime);
		animation-direction: reverse;
	}
	.sun__outerflare {
		--size: 100%;
		z-index: 1;
		animation-duration: var(--rotatetime);
	}
</style>
