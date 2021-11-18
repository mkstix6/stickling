<script lang="ts">
	import { onMount } from 'svelte';
	import { clamp } from '$lib/utils';

	let darkStyle: boolean = true;

	let canvas;
	let ctx;
	// let video;

	let seed: number = 1;
	let renderSize: number = 200;
	let transparent: boolean = false;
	let pixelArraySize = renderSize ** 2;
	let rgbaArraySize = pixelArraySize * 4;
	let grid = new Array(pixelArraySize).fill(0);
	let gridMovements = new Array(grid.length).fill(0);
	let rgbaGrid = new Uint8ClampedArray(rgbaArraySize).fill(0);
	let seconds = 10;
	let fps = 30;
	let maxFrames = seconds * fps;
	let frameNumber = 0;
	let addLiquidMaxRate = 1000000;
	let evaporation: number = 1;
	let frameRenders = [];

	type NineGrid = [number, number, number, number, number, number, number, number, number];

	function drawStuff() {
		// Clear canvas to start over
		ctx.clearRect(0, 0, renderSize, renderSize);
		// Fill canvas background
		if (!transparent) {
			ctx.rect(0, 0, renderSize, renderSize);
			if (darkStyle) {
				ctx.fillStyle = '#000';
			} else {
				ctx.fillStyle = '#fff';
			}
			ctx.fill();
		}
		// Seed random texture
		// for (let i = 0; i < grid.length; i++) {
		// 	if (i % Math.ceil(renderSize / 14) === 0) {
		// 		grid[i] += Math.random() * 100000;
		// 	}
		// }

		// Start frames
		startAnimation();
	}

	function startAnimation() {
		nextFrame();
	}

	function gridToRGBAGrid() {
		let maxIntensity = 256;
		for (let i = 0; i < grid.length; i++) {
			let value = Math.floor(grid[i] / 10);

			// let value = Math.ceil(grid[i] * 0.1);
			rgbaGrid[i * 4] = value > maxIntensity ? maxIntensity : value; // red
			rgbaGrid[i * 4 + 1] = value > maxIntensity ? maxIntensity : value; // green
			rgbaGrid[i * 4 + 2] = value > maxIntensity ? maxIntensity : value; // blue
			rgbaGrid[i * 4 + 3] = maxIntensity; // alpha
		}
	}

	function gridToHueValues() {
		let maxIntensity = 2 ** 8; // Clamped array values
		for (let i = 0; i < grid.length; i++) {
			let value = Math.floor(grid[i] / 10);
			let hue = value % 360;
			let hueRadians = (hue / 360) * Math.PI;

			let red = value * Math.sin(hueRadians + Math.PI / 3);
			let blue = value * Math.sin(hueRadians - Math.PI / 3);
			let green = value * Math.sin(hueRadians);

			// let value = Math.ceil(grid[i] * 0.1);
			rgbaGrid[i * 4] = red > maxIntensity ? maxIntensity : red; // red
			rgbaGrid[i * 4 + 1] = blue > maxIntensity ? maxIntensity : blue; // green
			rgbaGrid[i * 4 + 2] = green > maxIntensity ? maxIntensity : green; // blue
			rgbaGrid[i * 4 + 3] = maxIntensity; // alpha
		}
	}

	function gridIterateRGBAGrid(frameNumber) {
		let maxIntensity = 256;
		for (let i = 0; i < grid.length; i++) {
			// let value = gridMovements[i];
			let value = grid[i];
			// let value = Math.ceil(grid[i] * 0.1);
			rgbaGrid[i * 4] =
				value > 0 ? Math.abs(Math.cos(frameNumber * 0.001 * Math.PI * 2) * value) : 0; // red
			rgbaGrid[i * 4 + 1] =
				value > 0 ? Math.abs(Math.sin(frameNumber * 0.0003 * Math.PI * 2) * value) : 0; // green
			rgbaGrid[i * 4 + 2] =
				value > 0 ? Math.abs(Math.tan(frameNumber * 0.002 * Math.PI * 2) * value) : 0; // blue
			rgbaGrid[i * 4 + 3] = maxIntensity; // alpha
		}
	}

	// let date = new Date();
	// let hue = (Date.now() / 100) % 360;
	// // ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
	// // ctx.fill();

	function addLiquid(gridIndex: number = pixelArraySize / 2) {
		grid[Math.floor(gridIndex)] += Math.floor(
			Math.random() * addLiquidMaxRate + addLiquidMaxRate / 4
		);
	}

	function nextFrame() {
		frameNumber++;
		if (frameNumber > maxFrames) {
			return;
		}

		// Add liquid
		if ((frameNumber - 1) % 10 === 0) {
			addLiquid(Math.floor(Math.random() * pixelArraySize));
		}
		// addLiquid(pixelArraySize / 2.2);
		// addLiquid(pixelArraySize / 3.4);
		// addLiquid(pixelArraySize / 5.5);
		// addLiquid(pixelArraySize / 7.7);
		// draw
		flowLiquid();

		frameRenders.push(canvas.toDataURL('image/png'));

		renderGrid(frameNumber);

		// Export frame
		// var dataURL = canvas.toDataURL('image/png');
		// var newTab = window.open('about:blank', 'image from canvas');
		// newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");

		// Loop
		window.requestAnimationFrame(nextFrame);
	}

	function exportAnimation() {
		// Optional frames per second argument.
		// var stream = canvas.captureStream(30);
		// Set the source of the <video> element to be the stream from the <canvas>.
		// video.srcObject = stream;
	}

	function renderGrid(frameNumber) {
		gridToHueValues();
		// gridToRGBAGrid();
		// gridIterateRGBAGrid(frameNumber);
		let image = new ImageData(rgbaGrid, renderSize, renderSize);
		ctx.putImageData(image, 0, 0);
	}

	function neighbourIndices(index: number): NineGrid {
		let upLeft = index - 1 - renderSize;
		let up = index - renderSize;
		let upRight = index + 1 - renderSize;
		let left = index - 1;
		let center = index;
		let right = index + 1;
		let downLeft = index - 1 + renderSize;
		let down = index + renderSize;
		let downRight = index + 1 + renderSize;
		return [upLeft, up, upRight, left, center, right, downLeft, down, downRight];
	}

	function getMoveProbabilities(pixelIndex: number): NineGrid {
		let centerValue = grid[pixelIndex];
		let neighbourvalues: NineGrid = neighbourIndices(pixelIndex).map(
			(neighbourIndex) => grid[neighbourIndex]
		);
		let neighbourProbs: NineGrid = neighbourvalues.map((neighbourValue, i) => {
			return moveProbability(centerValue, neighbourValue);
		});
		return neighbourProbs;
	}

	function moveProbability(a: number, b: number): number {
		let minprob = 0;
		let maxprob = 100;
		let prob = minprob;
		if (b > a) return minprob;
		// Nearly dry, don't transfer
		if (a > b) prob += 10;

		// if (a < 1000) prob += 1;
		// Slower mix back up gradient
		// if (b > a) prob -= 3;
		// Attracted to existing paint
		if (b > 3000) prob += 10;

		// if (b < 10) prob -= 1;
		// Diverge from large pools
		// if (a > 100000) prob += 1;
		// Attracted to high gradient
		// if (a > b * 10) prob += 0.2;
		// if (a < 50 && b === 0) prob += 0.1;
		// Clamp and return
		// return clamp(prob ** 2, minprob ** 2, maxprob ** 2);
		return clamp(prob, minprob, maxprob);
	}

	function changeValue(a: number, b: number): number {
		let changeRatio = 0.15;
		// if (b > a) return 0;
		if (a - b < 50) changeRatio += 0.1;
		if (b > 10) changeRatio += 0.06;
		return changeRatio;
	}

	const sum = (acc, curr) => acc + curr;

	function chooseLikelyNeighbour(pixelIndex: number): number {
		let moveProbabilities: NineGrid = getMoveProbabilities(pixelIndex);

		let directionalBias: NineGrid = [0, 0, 0, 1, 0, 1, 3, 4, 3];
		moveProbabilities = moveProbabilities.map((x, i) => x + directionalBias[i]);

		let totalProb = moveProbabilities.reduce(sum);
		// Normalise probabilities
		let normalisedMoveProbabilities = moveProbabilities.map((value) => value / totalProb);
		let neighbours = neighbourIndices(pixelIndex);
		// let largestProbIndex = 0;
		// let largestProb = 0;
		// for (let i = 0; i < normalisedMoveProbabilities.length; i++) {
		// 	largestProb = normalisedMoveProbabilities[i];
		// 	if (largestProb < normalisedMoveProbabilities[i]) {
		// 		largestProb = normalisedMoveProbabilities[i];
		// 		largestProbIndex = i;
		// 	}
		// }
		// if (Math.random() > 0.2) {
		// 	return neighbours[largestProbIndex];
		// } else {
		// 	return neighbours[Math.floor(Math.random() * neighbours.length)];
		// }

		if (Math.random() > 0.9) {
			// Choose weighted neighbour
			let random = Math.random();
			let accumulation = 0;
			for (let i = 0; i < normalisedMoveProbabilities.length; i++) {
				accumulation += normalisedMoveProbabilities[i];
				if (accumulation > random) {
					return neighbours[i];
				}
			}
		} else {
			// Choose most likely
			let largestProb = 0;
			let largestProbIndex;
			normalisedMoveProbabilities.forEach((x, i) => {
				if (x > largestProb) {
					largestProb = x;
					largestProbIndex = neighbours[i];
				}
			});
			return largestProbIndex;
		}

		// return neighbours[neighbours.length - 1];
	}

	function flowLiquid() {
		// Compute flow changes
		gridMovements.fill(0);
		for (let pixelIndex = 0; pixelIndex < grid.length; pixelIndex++) {
			let centerValue = grid[pixelIndex];
			// Skip if value is zero :: no liquid
			if (centerValue === 0) continue;
			// Choose which neighbouring cell to flow liquid to
			let neighbourIndex = chooseLikelyNeighbour(pixelIndex);
			// Skip if no sensible neighbour index
			if (!neighbourIndex || neighbourIndex < 0 || neighbourIndex >= pixelArraySize) continue;
			//
			let neighbourValue = grid[neighbourIndex];
			let diff: number = centerValue - neighbourValue;
			if (diff === NaN) diff = 0;

			if (diff < 0) continue;
			//

			let movementValue = Math.ceil(diff / 4);
			if (neighbourValue < 10) {
				movementValue = movementValue / 2;
			}

			gridMovements[neighbourIndex] += movementValue;
			gridMovements[pixelIndex] -= movementValue;
		}

		// Create new grid from movements
		grid.forEach((_, i) => {
			// }
			grid[i] = grid[i] + gridMovements[i];
			// Evaporation :: fade all points
			if (grid[i] > 100) {
				grid[i] -= Math.ceil(grid[i] / 1000);
			}
			if (grid[i] < 0) {
				grid[i] = 0;
			}
		});
	}

	onMount(() => {
		ctx = canvas.getContext('2d', { alpha: transparent });
		// Start
		// exportAnimation();

		drawStuff();
	});
</script>

<div class="m5 p5">
	<canvas bind:this={canvas} width={renderSize} height={renderSize} />
	<!-- <video playsinline autoplay muted bind:this={video} width={renderSize} height={renderSize} /> -->
</div>

<style>
	canvas {
		width: 400px;
		height: 400px;
		border: 1rem solid #543;
	}

	video {
		width: 400px;
		height: 400px;
		border: 1rem solid #009;
	}
</style>
