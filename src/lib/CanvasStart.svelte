<script lang="ts">
	import { onMount } from 'svelte';
	import { pseudoRandom } from '$lib/utils';

	export let seed = 1;
	export let renderSize = 2 ** 11;
	export let transparent: boolean = false;

	let darkStyle: boolean = true;
	let canvasElement;
	let ctx;

	function drawStuff() {
		// Clear canvas to start over
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
		// Fill canvas background
		if (!transparent) {
			ctx.rect(0, 0, canvasElement.width, canvasElement.height);
			if (darkStyle) {
				ctx.fillStyle = '#000';
			} else {
				ctx.fillStyle = '#fff';
			}
			ctx.fill();
		}
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d', { alpha: transparent });
		// Start
		drawStuff();
	});
</script>

<div class="m5 p5">
	<canvas bind:this={canvasElement} width={renderSize} height={renderSize} />
</div>

<style>
	canvas {
		width: 512px;
		height: 512px;
	}
</style>
