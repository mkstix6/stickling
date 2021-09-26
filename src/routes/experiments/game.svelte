<script lang="ts">
	import { onMount } from 'svelte';
	import { pseudoRandom } from '$lib/utils.js';

	let canvasElement;
	let ctx;
	let seed = 1;
	let fileName = `experiment.png`;
	let flowFieldAngleRangeDecimal = 0.5;
	let strictFlowDirection = false;
	let flowField = [];
	let flowFieldGridCellSize = 10;
	let doSmoothFlowField = true;
	let smoothFlowFieldIterations = 3;
	let hueRange = 90;
	let canvasUniq;
	let canvasUniqDecimal;
	let lineCount;
	let maxMoveDistance;
	let maxRotationChange;
	let lineSteps = 20;
	let exactLineWidth = false;

	function downloadImage(e) {
		const link = document.createElement('a');
		link.download = fileName;
		link.href = canvasElement.toDataURL();
		link.click();
		link.delete;
	}

	function makeFlowField() {
		// Generate Flow Field values
		let randomGen = pseudoRandom(seed);
		// Populate flow field values
		flowField = [];
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			flowField.push([]);
		}
		for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
			for (let j = 0; j < Math.floor(canvasElement.width / flowFieldGridCellSize); j++) {
				flowField[i][j] =
					Math.round((randomGen.next().value % (flowFieldAngleRangeDecimal * Math.PI * 2)) * 100) /
					100;
				// flowField[i][j] = 2; // FIXME remove this line
			}
		}

		if (doSmoothFlowField) {
			// Smooth flow field
			for (let k = 0; k < smoothFlowFieldIterations; k++) {
				let flowFieldSmooth = [];
				for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
					flowFieldSmooth.push([]);
				}
				for (let i = 0; i < Math.floor(canvasElement.width / flowFieldGridCellSize); i++) {
					for (let j = 0; j < Math.floor(canvasElement.width / flowFieldGridCellSize); j++) {
						let nextRow = i + 1;
						let nextCol = j + 1;
						nextRow =
							nextRow < 0 ? 0 : nextRow > flowField.length - 1 ? flowField.length - 1 : nextRow;
						nextCol =
							nextCol < 0 ? 0 : nextCol > flowField.length - 1 ? flowField.length - 1 : nextCol;

						let a = flowField[i][j];
						let b = flowField[i][nextCol];
						let c = flowField[nextRow][j];
						let d = flowField[nextRow][nextCol];
						flowFieldSmooth[i][j] = (a * 11 + b * 2 + c * 3 + d * 2) / 18;
					}
				}
				flowField = flowFieldSmooth;
			}
		}
	}

	onMount(() => {
		canvasElement.width = canvasElement.clientWidth;
		canvasElement.height = canvasElement.clientHeight;
		ctx = canvasElement.getContext('2d');

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
		canvasUniq = generator.next().value;
		canvasUniqDecimal = parseFloat(`0.${canvasUniq.toString().slice(1, 3)}`) + 0.01;
		doSmoothFlowField = canvasUniqDecimal > 0.2;
		smoothFlowFieldIterations = Math.round((canvasUniqDecimal * 4313) % 7);
		flowFieldAngleRangeDecimal = canvasUniqDecimal;
		hueRange = (canvasUniq * 12433) % 360;
		strictFlowDirection = !!(canvasUniq % 2);
		exactLineWidth = !(canvasUniq % 5);
		let Lwidth = Math.round((canvasUniqDecimal * 4313) % 7);

		flowFieldGridCellSize =
			Math.round((canvasUniqDecimal < 0.1 ? 0.1 : canvasUniqDecimal) * 10) * 10;
		makeFlowField();

		// Clear canvas to start over
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

		// Fill canvas background
		ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		ctx.fillStyle = '#fff';
		ctx.fill();

		lineCount = (seed * generator.next().value) % 2000;
		maxMoveDistance = ((seed * generator.next().value) % 20) + 1;
		maxRotationChange = canvasUniqDecimal;

		for (let index = 0; index < lineCount; index++) {
			const lineUniq = generator.next().value;
			const lineUniqDecimal = parseFloat(`0.${lineUniq.toString().slice(1, 3)}`);
			let x = (generator.next().value % (canvasElement.width + 100)) - 50 || 100;
			let y = (generator.next().value % (canvasElement.height + 100)) - 50 || 100;

			let hue = ((x / 14 + y / 14) % hueRange) + (canvasUniq % 360);
			let lightness = lineUniqDecimal * 30 + 70;
			if (!(((index * generator.next().value) % lineCount) * canvasUniqDecimal)) {
				hue = (hue + 180) % 360;
				lightness = 80;
			}

			let color = `hsl(${hue}, 100%, ${lightness}%)`;
			ctx.fillStyle = color;
			ctx.strokeStyle = color;
			ctx.lineWidth = 1;
			ctx.lineCap = 'round';

			// ctx.beginPath();
			// ctx.moveTo(x, y);

			// let lineSteps = ((uniq * 9) % 30) + 30;
			lineSteps = canvasUniq % 40;
			let moveVector;
			for (let index2 = 1; index2 < lineSteps; index2++) {
				if (!exactLineWidth) {
					// let Lwidth = 100;
					Lwidth = index2 < lineSteps / 2 ? index2 : lineSteps - index2;
					// let Lwidth = Math.round(index2 / 3);
					// Lwidth = Lwidth > 7 ? 7 : Lwidth;
					// Lwidth = Lwidth < 5 ? 4 : Lwidth;
					// Lwidth = Lwidth > 15 ? 15 : Lwidth;
					// Lwidth = 30;
				}

				ctx.lineWidth = Lwidth;

				ctx.beginPath();
				ctx.moveTo(x, y);

				const cellFlowRotation = getFlowFieldRotation(x, y);

				if (strictFlowDirection) {
					moveVector = [
						Math.sin(cellFlowRotation) * maxMoveDistance,
						Math.cos(cellFlowRotation) * maxMoveDistance,
					];
				} else {
					if (!moveVector) {
						moveVector = [
							Math.sin(cellFlowRotation) * maxMoveDistance,
							Math.cos(cellFlowRotation) * maxMoveDistance,
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
				}

				let newx = Math.round(x + moveVector[0]);
				let newy = Math.round(y + moveVector[1]);

				ctx.lineTo(newx, newy);
				// ctx.arc(newx, newy, 3, 0, 2 * Math.PI);

				ctx.stroke();
				ctx.fill();
				ctx.closePath();

				x = newx;
				y = newy;
			}
		}

		// Draw frame
		// {
		// 	ctx.fillStyle = '#fff';
		// 	let frameRatio = 1 / 16;
		// 	let frameSize = canvasElement.width * frameRatio;
		// 	ctx.rect(0, 0, frameSize, canvasElement.height);
		// 	ctx.fill();
		// 	ctx.rect(frameSize * 15, 0, frameSize, canvasElement.height);
		// 	ctx.fill();
		// 	ctx.rect(0, 0, canvasElement.width, frameSize);
		// 	ctx.fill();
		// 	ctx.rect(0, frameSize * 15, canvasElement.width, frameSize);
		// 	ctx.fill();
		// }
	}
</script>

<div class="page page--post my5">
	<div class="halfs">
		<div>
			<div>
				<canvas bind:this={canvasElement} width="600" height="600" />
			</div>
		</div>

		<div>
			<div>
				<span>
					{seed} ::
				</span>
				{#each Array(9) as _, i}
					<button
						class="roundButton"
						on:click={() => {
							seed = i;
							drawStuff();
						}}>{i}</button
					>
				{/each}
			</div>

			<div>
				<div><small>doSmoothFlowField</small>: <strong>{doSmoothFlowField}</strong></div>
				<div>
					<small>smoothFlowFieldIterations</small>: <strong>{smoothFlowFieldIterations}</strong>
				</div>
				<div>
					<small>flowFieldAngleRangeDecimal</small>: <strong>{flowFieldAngleRangeDecimal}</strong>
				</div>
				<div><small>hueRange</small>: <strong>{hueRange}</strong></div>
				<div><small>flowFieldGridCellSize</small>: <strong>{flowFieldGridCellSize}</strong></div>
				<div><small>strictFlowDirection</small>: <strong>{strictFlowDirection}</strong></div>
				<div><small>canvasUniq</small>: <strong>{canvasUniq}</strong></div>
				<div><small>canvasUniqDecimal</small>: <strong>{canvasUniqDecimal}</strong></div>
				<div><small>lineCount</small>: <strong>{lineCount}</strong></div>
				<div><small>maxMoveDistance</small>: <strong>{maxMoveDistance}</strong></div>
				<div><small>maxRotationChange</small>: <strong>{maxRotationChange}</strong></div>
				<div><small>lineSteps</small>: <strong>{lineSteps}</strong></div>
			</div>
		</div>
	</div>

	<button class="megaButton" id="download" on:click={downloadImage}>Download {fileName}</button>
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
</div>

<style>
	canvas {
		width: 600px;
		height: 600px;
	}
	:root {
		--size: 16px;
	}
	.pixel {
		display: inline-block;
		width: var(--size);
		height: var(--size);
		margin: 0;
		padding: 0;
		text-align: center;
		line-height: var(--size);
		border-radius: 100%;
		overflow: hidden;
	}
	.flowFieldReadout {
		line-height: var(--size);
		display: inline-block;
		transform: rotate(0deg);
		transform-origin: center center;
	}
	.roundButton {
		--size: 3em;
		width: var(--size);
		height: var(--size);
		border-radius: 100%;
		line-height: var(--size);
		text-align: center;
		border: 1px solid black;
		background: white;
		padding: 0;
	}

	.halfs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}
</style>
