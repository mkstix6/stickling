<script lang="ts">
	/*
	 * main.js
	 */

	import { onMount } from 'svelte';
	import { pseudoRandomMax, pseudoRandom } from '$lib/utils.ts';

	export let seed = 1;
	export let diagnostics = false;
	export let debug = false;

	let renderSize = 512;
	let canvasElement;
	let ctx;
	let flowField = [];
	let lineSteps = 20;
	// Minimum clamp values
	let minHueRange = 1;
	let minLineWidth = 2;
	let minMoveDistance = 1;
	let minLineCount = 101;
	let minLineSteps = 2;
	let minUniqDecimal = 0.001;

	let generator = pseudoRandom(seed);
	let canvasUniq = generator.next().value;
	let canvasUniq2 = generator.next().value;
	canvasUniq = canvasUniq < 1 ? 1 : canvasUniq;
	canvasUniq2 = canvasUniq2 < 1 ? 1 : canvasUniq2;
	let canvasUniqDecimal = parseFloat(`0.${canvasUniq.toString().slice(1, 3)}`) + minUniqDecimal;
	let canvasUniqDecimal2 = parseFloat(`0.${canvasUniq2.toString().slice(1, 3)}`) + minUniqDecimal;
	let edgeShy = false;
	// Random flow field cell size steps of 10 e.g. 10, 20, 30, 40 etc…
	let flowFieldGridCellSize =
		Math.round((canvasUniqDecimal < 0.1 ? 0.1 : canvasUniqDecimal) * 10) * 10;
	let doSmoothFlowField = canvasUniqDecimal > 0.2;
	let smoothFlowFieldIterations = Math.round((canvasUniqDecimal * 4313) % 7);
	let flowFieldAngleRangeDecimal = canvasUniqDecimal;
	let hueRange = ((canvasUniq * 12433) % 360) + minHueRange;
	let strictFlowDirection = !!(canvasUniq % 2);
	let Lwidth = Math.round((canvasUniqDecimal * 4313) % 13) + minLineWidth;
	let lineCount = (seed * generator.next().value) % 2959;
	// Minimum 101 lines
	lineCount = lineCount < minLineCount ? minLineCount : lineCount;
	let maxMoveDistance = ((seed * generator.next().value) % 20) + minMoveDistance;
	let maxRotationChange = canvasUniqDecimal;
	// let isGrayscale = true;
	let isGrayscale = generator.next().value < pseudoRandomMax * 0.05;

	let lineStyles = [
		{
			name: 'solid',
			weight: 10,
		},
		{
			name: 'solidTaper',
			weight: 10,
		},
		{
			name: 'dots',
			weight: 10,
		},
		{
			name: 'dotsTaper',
			weight: 10,
		},
		{
			name: 'lolipop',
			weight: 10,
		},
	];
	function chooseStyle(inputDecimal: number): string {
		const totalWeight = lineStyles.map(({ weight }) => weight).reduce((acc, curr) => acc + curr, 0);
		// const sortedStyles = lineStyles.sort(({ name: a }, { name: b }) =>
		// 	a > b ? 1 : a < b ? -1 : 0
		// );
		let soFar = 0;
		for (let i = 0; i < lineStyles.length; i++) {
			let item = lineStyles[i];
			item.bucketBottom = soFar;
			item.bucketTop = soFar + item.weight / totalWeight;
			soFar = item.bucketTop;
		}

		for (let i = 0; i < lineStyles.length; i++) {
			let item = lineStyles[i];
			if (inputDecimal > item.bucketBottom && inputDecimal <= item.bucketTop) {
				return item.name;
			}
		}
		return lineStyles[0].name;
	}

	let lineStyle = chooseStyle(canvasUniqDecimal2);

	if (lineStyle === 'solidTaper' || lineStyle === 'dotsTaper') {
		minLineSteps = 10;
	}

	var d = new Date();
	var n = d.toISOString().replaceAll('-', '').replaceAll('T', '').replaceAll(':', '').slice(0, 14);
	let fileName = `experiment-${n}-${`${seed}`.padStart(2, '00')}.png`;

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
		// canvasElement.width = canvasElement.clientWidth;
		// canvasElement.height = canvasElement.clientHeight;
		ctx = canvasElement.getContext('2d');

		// Rotate entire canvas
		for (let i = 0; i < canvasUniq2 % 4; i++) {
			ctx.rotate(90 * (Math.PI / 180));
			ctx.translate(0, -canvasElement.width);
		}

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
		makeFlowField();

		// Clear canvas to start over
		ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

		// Fill canvas background
		ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		ctx.fillStyle = '#fff';
		ctx.fill();

		// Dark mode 1/2 // Dark mode was a bit meh
		// if (canvasUniq > pseudoRandomMax * 0) {
		// 	// Fill canvas background
		// 	ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		// 	ctx.fillStyle = '#111';
		// 	ctx.fill();
		// }

		for (let indexLine = 0; indexLine < lineCount; indexLine++) {
			const lineUniq = generator.next().value;
			const lineUniqDecimal = parseFloat(`0.${lineUniq.toString().slice(1, 3)}`);
			let x;
			let y;

			if (edgeShy) {
				// Start inset from edge
				x = (generator.next().value % (canvasElement.width - 20)) + 10 || 100;
				y = (generator.next().value % (canvasElement.height - 20)) + 10 || 100;
			} else {
				// Allow start outset from edge
				x = (generator.next().value % (canvasElement.width + 100)) - 50 || 100;
				y = (generator.next().value % (canvasElement.height + 100)) - 50 || 100;
			}

			let hueRepeatDistance = (canvasUniq % 23) + 1;

			let hue = 0;

			if (canvasUniqDecimal2 > 0.5) {
				// FIXME change this value to be between zero and 1
				// Hue reflect
				let hueDecimal = (((x + y) / (hueRepeatDistance * 2)) % hueRange) / hueRange;
				hueDecimal = hueDecimal < 0.5 ? hueDecimal : 1 - hueDecimal;
				hueDecimal = hueDecimal * 2;
				hue = hueDecimal * hueRange;
			} else if (canvasUniqDecimal2 > 2) {
				// This looks a bit rubbish mostly
				// FIXME change this value from zero
				// Radial hue
				let centerX = canvasElement.width / 2;
				let centerY = canvasElement.height / 2;
				let hypotenuseFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
				hue = (hypotenuseFromCenter / hueRepeatDistance) % hueRange;
			} else {
				// Hue range cycle-snap-repeat
				hue = ((x + y) / hueRepeatDistance) % hueRange;
			}
			// Procedural hue shift
			hue = hue + canvasUniq;
			// Place hue value on 360° hue-circle-representation
			hue = hue % 360;

			let lightness = lineUniqDecimal * 30 + 70;

			// Adjust bright yellow hues to be a little darker as they're impossible to see on white.
			let hueDarkenMidPoint = 60;
			let hueDarkenRange = 50;
			let hueRangeDarkenLower = hueDarkenMidPoint - hueDarkenRange / 2;
			let hueRangeDarkenUpper = hueDarkenMidPoint + hueDarkenRange / 2;
			let hueDarkenByMax = 3;
			if (hue > hueRangeDarkenLower && hue < hueRangeDarkenUpper) {
				let hueAdjustDecimal =
					(hue - hueRangeDarkenLower) / (hueRangeDarkenUpper - hueRangeDarkenLower);
				let hueAdjustValue = Math.sin(hueAdjustDecimal * Math.PI);
				lightness = lightness - hueAdjustValue * hueDarkenByMax;
			}

			// Dark mode 2/2 // Dark mode was a bit meh
			// if (canvasUniq > pseudoRandomMax * 0) {
			// 	lightness = 30 + (lineUniq % 50);
			// }

			if (!(((indexLine * lineUniq) % lineCount) * canvasUniqDecimal)) {
				hue = (hue + 180) % 360;
				lightness = 80;
			}
			let saturation = 100;
			if (isGrayscale) {
				saturation = 0.1;
				if (canvasUniqDecimal < 0.5) {
					lightness = lineUniqDecimal > 0.5 ? 90 : 30;
				}
			}
			let alpha = 1;
			// if (canvasUniqDecimal < 0.03 && lineUniqDecimal < 0.2) {
			// 	alpha = 0.4;
			// }

			ctx.lineWidth = 1;
			ctx.lineCap = 'round';

			// ctx.beginPath();
			// ctx.moveTo(x, y);

			// let lineSteps = ((uniq * 9) % 30) + 30;
			lineSteps = canvasUniq % 40;
			lineSteps = lineSteps < minLineSteps ? minLineSteps : lineSteps;

			if (lineStyle === 'dotsTaper' || lineStyle === 'solidTaper') {
				// if(canvasUniqDecimal > 0.5) {
				lineSteps = lineSteps < 6 ? (canvasUniqDecimal % 6) + 3 : lineSteps;
				// } else {

				// }
			}

			let moveVector;

			// Choose line width algorithm
			for (let indexStep = 1; indexStep < lineSteps; indexStep++) {
				let lineMoveDistance = maxMoveDistance;

				// lineStyle = 'dots'; // FIXME comment this line

				switch (lineStyle) {
					case 'solid': {
						// Lwidth = 10;
						break;
					}
					case 'dots': {
						// TODO style here
						lineMoveDistance = Lwidth;
						break;
					}
					case 'dotsTaper': {
						if (canvasUniqDecimal2 > 0.5) {
							// Dots Taper In
							Lwidth = indexStep;
						} else {
							// Dots Taper Both
							Lwidth = indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
						}
						break;
					}
					case 'solidTaper': {
						if (canvasUniqDecimal2 > 0.5) {
							// Solid Taper In
							Lwidth = indexStep;
						} else {
							// Solid Taper Both
							Lwidth = indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
						}
						break;
					}
					case 'lolipop': {
						Lwidth = (canvasUniq % 10) + minLineWidth;

						break;
					}
					default:
						break;
				}

				ctx.lineWidth = Lwidth;

				if (lineStyle === 'lolipop' && indexStep === lineSteps - 1) {
					lineMoveDistance = 1;
					ctx.lineWidth = Lwidth * 2;
				}

				// Satisfying consistent dot spacing depends on dot radius.
				if (lineStyle === 'dots' || lineStyle === 'dotsTaper') {
					let diameter = Lwidth * 2;
					let minDotStepDistance = diameter * ((canvasUniq % 5) + 1) + canvasUniqDecimal;
					lineMoveDistance =
						lineMoveDistance < minDotStepDistance ? minDotStepDistance : lineMoveDistance;
				}

				// Hue adjust lines every step. This looked pretty bad in majority of cases when applied
				// if (canvasUniqDecimal2 > 0) {
				// 	hue = (hue + indexStep / 5) % 360;
				// }

				let color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
				if (debug) {
					color = 'limegreen';
				}

				ctx.fillStyle = color;
				ctx.strokeStyle = color;
				ctx.beginPath();
				ctx.moveTo(x, y);

				const cellFlowRotation = getFlowFieldRotation(x, y);

				if (strictFlowDirection) {
					// Exactly match flow vector
					moveVector = [
						Math.sin(cellFlowRotation) * lineMoveDistance,
						Math.cos(cellFlowRotation) * lineMoveDistance,
					];
				} else {
					// Gradually turn to match move vector according to max turn per line step.
					if (!moveVector) {
						moveVector = [
							Math.sin(cellFlowRotation) * lineMoveDistance,
							Math.cos(cellFlowRotation) * lineMoveDistance,
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
						Math.sin(newMoveRotation) * lineMoveDistance,
						Math.cos(newMoveRotation) * lineMoveDistance,
					];
				}

				let newx = Math.round(x + moveVector[0]);
				let newy = Math.round(y + moveVector[1]);

				if (lineStyle === 'dots' || lineStyle === 'dotsTaper') {
					// Dotted lines
					let fullCircle = 2 * Math.PI;
					ctx.arc(newx, newy, Lwidth, 0, fullCircle);
					ctx.fill();
				} else {
					// Solid lines
					ctx.lineTo(newx, newy);
					ctx.stroke();
				}

				// ctx.closePath();

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

<div>
	<div style="display: flex; flex-direction: column;">
		<!-- {seed}-{lineStyle} -->
		<canvas class:diagnostics bind:this={canvasElement} width={renderSize} height={renderSize} />
	</div>

	{#if diagnostics}
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
				<div style="width: 10em; height: 1em; background: linear-gradient(to left, , );" />
				<div><small>flowFieldGridCellSize</small>: <strong>{flowFieldGridCellSize}</strong></div>
				<div><small>strictFlowDirection</small>: <strong>{strictFlowDirection}</strong></div>
				<div><small>canvasUniq</small>: <strong>{canvasUniq}</strong></div>
				<div><small>canvasUniqDecimal</small>: <strong>{canvasUniqDecimal}</strong></div>
				<div><small>lineCount</small>: <strong>{lineCount}</strong></div>
				<div><small>maxMoveDistance</small>: <strong>{maxMoveDistance}</strong></div>
				<div><small>maxRotationChange</small>: <strong>{maxRotationChange}</strong></div>
				<div><small>lineSteps</small>: <strong>{lineSteps}</strong></div>
				<div><small>Lwidth</small>: <strong>{Lwidth}</strong></div>
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
	{/if}
</div>

<style>
	canvas {
		width: 256px;
		height: 256px;
		/* width: 512px; */
		/* height: 512px; */
		/* transform: scale(0.25); */
	}
	canvas.diagnostics {
		width: 512px;
		height: 512px;
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
</style>
