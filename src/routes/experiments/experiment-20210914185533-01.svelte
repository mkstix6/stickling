<script lang="ts">
	import { onMount } from 'svelte';
	import { pseudoRandom } from '$lib/utils.ts';

	let canvasElement;
	let ctx;
	let seed = 1;
	let fileName = `experiment.png`;

	function downloadImage(e) {
		const link = document.createElement('a');
		link.download = fileName;
		link.href = canvasElement.toDataURL();
		link.click();
		link.delete;
	}

	onMount(() => {
		canvasElement.width = canvasElement.clientWidth;
		canvasElement.height = canvasElement.clientHeight;
		ctx = canvasElement.getContext('2d');
		drawStuff();
	});

	const drawStuff = () => {
		var d = new Date();
		var n = d
			.toISOString()
			.replaceAll('-', '')
			.replaceAll('T', '')
			.replaceAll(':', '')
			.slice(0, 14);
		fileName = `experiment-${n}-${`${seed}`.padStart(2, '00')}.png`;

		let generator = pseudoRandom(seed);

		// Clear canvas
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

		// Fill canvas
		ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		ctx.fillStyle = '#eee';
		ctx.fill();

		// Flow field
		// const flowField =
		let lineCount = (seed * 4514) % 5273;
		for (let index = 0; index < lineCount; index++) {
			const uniq = generator.next().value;
			let x = (generator.next().value % (canvasElement.width + 100)) - 50;
			let y = (generator.next().value % (canvasElement.height + 100)) - 50;

			let color = `hsl(${((x / 8 + y / 6) % 90) + 160}, 100%, ${Math.random() * 30 + 70}%)`;
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';

			ctx.beginPath();
			ctx.moveTo(x, y);
			let steps2 = ((uniq * 9) % 30) + 10;
			for (let index2 = 1; index2 < steps2; index2++) {
				let Lwidth = index2 < steps2 / 2 ? index2 : steps2 - index2;
				Lwidth = Math.floor(Lwidth / 2);
				ctx.lineWidth = Lwidth;

				ctx.beginPath();
				ctx.moveTo(x, y);

				let moveVector = [10, 5];
				moveVector[1] = Math.floor(Math.sin(((x % 200) - 100) / 15) * 5);

				ctx.lineTo(x + moveVector[0], y + moveVector[1]);
				x = x + moveVector[0];
				y = y + moveVector[1];
				ctx.stroke();
				ctx.closePath();
			}
			// ctx.fill();
		}
	};
</script>

<div class="page page--post my5">
	<canvas bind:this={canvasElement} width="600" height="600" />

	<div>
		<input bind:value={seed} type="range" min="1" max="10" on:change={drawStuff} />
		{seed}
	</div>
	<button class="megaButton" id="download" on:click={downloadImage}>Download {fileName}</button>
</div>

<style>
	canvas {
		width: 600px;
		height: 600px;
	}
</style>
