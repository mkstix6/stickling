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

	let flowField = [];
	const flowFieldGridCellSize = 80;

	onMount(() => {
		canvasElement.width = canvasElement.clientWidth;
		canvasElement.height = canvasElement.clientHeight;
		ctx = canvasElement.getContext('2d');

		// Generate Flow Field values
		let randomGen = pseudoRandom(seed);
		// Populate flow field values
		flowField = [];
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			flowField.push([]);
		}
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			for (let j = 0; j < Math.floor(canvasElement.width / flowFieldGridCellSize); j++) {
				flowField[i][j] = Math.round((randomGen.next().value % 1.14321) * 100) / 100;
				// flowField[i][j] = 2; // FIXME remove this line
			}
		}

		// Smooth flow field
		let flowFieldSmooth = [];
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			flowFieldSmooth.push([]);
		}
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			for (let j = 0; j < Math.floor(canvasElement.width / flowFieldGridCellSize); j++) {
				let nextRow = i + 1;
				let nextCol = j + 1;
				nextRow = nextRow < 0 ? 0 : nextRow > flowField.length - 1 ? flowField.length - 1 : nextRow;
				nextCol = nextCol < 0 ? 0 : nextCol > flowField.length - 1 ? flowField.length - 1 : nextCol;

				let a = flowField[nextRow][nextCol];
				let b = flowField[nextRow][nextCol];
				let c = flowField[nextRow][nextCol];
				let d = flowField[nextRow][nextCol];
				flowFieldSmooth[i][j] = (a * 11 + b * 2 + c * 3 + d * 2) / 18;
			}
		}

		// flowField = flowFieldSmooth;

		// Start
		drawStuff();
	});

	function getFlowFieldRotation(x, y) {
		// Round values to grid cells
		let xCell = Math.floor(x / flowFieldGridCellSize);
		let yCell = Math.floor(y / flowFieldGridCellSize);
		// Force values within array bounds
		xCell = xCell < 0 ? 0 : xCell > flowField.length - 1 ? flowField.length - 1 : xCell;
		yCell = yCell < 0 ? 0 : yCell > flowField.length - 1 ? flowField.length - 1 : yCell;
		// Retrieve result
		let flowValue = flowField[yCell][xCell];
		return flowValue;
	}

	function drawStuff() {
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

		let lineCount = (seed * 736034) % 93634;
		let maxMoveDistance = 10;
		let maxRotationChange = 0.08432;
		for (let index = 0; index < lineCount; index++) {
			const uniq = generator.next().value;
			const uniqDecimal = parseFloat(`0.${uniq.toString().slice(1, 3)}`);
			let x = (generator.next().value % (canvasElement.width + 100)) - 50 || 100;
			let y = (generator.next().value % (canvasElement.height + 100)) - 50 || 100;

			let hue = ((x / 14 + y / 14) % 90) + 160;
			let lightness = uniqDecimal * 30 + 70;

			let color = `hsl(${hue}, 100%, ${lightness}%)`;
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';

			// ctx.beginPath();
			// ctx.moveTo(x, y);

			let lineSteps = ((uniq * 9) % 30) + 30;
			let moveVector;
			for (let index2 = 1; index2 < lineSteps; index2++) {
				// let Lwidth = 100;
				let Lwidth = index2 < lineSteps / 2 ? index2 : lineSteps - index2;
				// let Lwidth = Math.round(index2 / 3);
				// Lwidth = Lwidth > 7 ? 7 : Lwidth;
				Lwidth = Lwidth < 5 ? 4 : Lwidth;
				Lwidth = Lwidth > 15 ? 15 : Lwidth;
				// Lwidth = 10;

				ctx.lineWidth = Lwidth;
				ctx.lineWidth = 2;

				ctx.beginPath();
				// ctx.moveTo(x, y);

				const cellFlowRotation = getFlowFieldRotation(x, y);
				if (!moveVector) {
					moveVector = [
						Math.sin(cellFlowRotation + (uniqDecimal - 0.5)) * maxMoveDistance,
						Math.cos(cellFlowRotation + (uniqDecimal - 0.5)) * maxMoveDistance,
					];
				}
				// Current move angle
				const moveRotation = Math.atan2(moveVector[0], moveVector[1]);
				const newMoveRotation =
					Math.abs(moveRotation - cellFlowRotation) < maxRotationChange
						? moveRotation
						: moveRotation < cellFlowRotation
						? moveRotation + maxRotationChange
						: moveRotation - maxRotationChange;

				moveVector = [
					Math.sin(newMoveRotation) * maxMoveDistance,
					Math.cos(newMoveRotation) * maxMoveDistance,
				];

				let newx = Math.round(x + moveVector[0]);
				let newy = Math.round(y + moveVector[1]);

				// ctx.lineTo(newx, newy);
				ctx.arc(newx, newy, 3, 0, 2 * Math.PI);

				ctx.stroke();
				ctx.fill();
				ctx.closePath();

				x = newx;
				y = newy;
			}
		}
	}
</script>

<div class="page page--post my5">
	<div>
		<canvas bind:this={canvasElement} width="600" height="600"></canvas>
	</div>

	<div class="flowFieldReadout">
		{#each flowField as row}
			<div>
				{#each row as pixel}
					<span
						class="pixel"
						style="background: hsl({(pixel / (Math.PI * 2)) *
							360}, 50%, 50%); transform: rotate({-pixel}rad);"
					>
						↓
					</span>
					<!-- → -->
					<!-- ← -->
					<!-- ↑ -->
					<!-- ↓ -->
				{/each}
			</div>
		{/each}
	</div>

	<div>
		<input bind:value={seed} type="range" min="1" max="10" onchange={drawStuff} />
		{seed}
	</div>
	<button class="megaButton" id="download" onclick={downloadImage}>Download {fileName}</button>
</div>

<style>
	canvas {
		width: 600px;
		height: 600px;
	}
	.pixel {
		display: inline-block;
		width: 24px;
		height: 24px;
		margin: 0;
		padding: 0;
		text-align: center;
		line-height: 24px;
		border-radius: 100%;
	}
	.flowFieldReadout {
		display: inline-block;
		transform: rotate(0deg);
		transform-origin: center center;
	}
</style>
