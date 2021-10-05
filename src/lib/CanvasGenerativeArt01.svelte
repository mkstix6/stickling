<script lang="ts">
	/*
	 * main.js
	 */

	import { onMount } from 'svelte';
	import { pseudoRandomMax, pseudoRandom } from '$lib/utils.ts';

	export let seed = 1;
	export let diagnostics = false;
	export let download = false;
	export let rendersize = 1024;

	let renderSize = rendersize;

	seed = parseInt(seed);

	let canvasElement;
	let ctx;
	let flowField = [];
	let lineSteps = 20;
	// Minimum clamp values
	let minHueRange = 1;
	let minLineWidth = 3;
	let maxLineWidth = Math.round(renderSize * 0.04);
	let minMoveDistance = 1;
	let minLineCount = Math.ceil(renderSize ** 2 * 0.000385);
	let minLineSteps = 2;
	let minUniqDecimal = 0.001;
	let edgeShy = false;
	let loopAroundEdges = false;
	let hueShift = 0;

	let generator = pseudoRandom(seed);

	function pseudoRandomDecimal() {
		return parseFloat(`0.${generator.next().value.toString().slice(-3)}`) + minUniqDecimal;
	}

	function bezier(t, p0, p1, p2, p3) {
		var cX = 3 * (p1.x - p0.x),
			bX = 3 * (p2.x - p1.x) - cX,
			aX = p3.x - p0.x - cX - bX;

		var cY = 3 * (p1.y - p0.y),
			bY = 3 * (p2.y - p1.y) - cY,
			aY = p3.y - p0.y - cY - bY;

		var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
		var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

		return { x, y };
	}

	function metalGradientBezier(t) {
		let cssBezierPoints = [0.015, 2.2, 0.925, -0.185];
		let p0 = { x: 0, y: 0 }; // Start coordinates
		let p1 = { x: cssBezierPoints[0], y: cssBezierPoints[1] }; // Handle 1 coordinates
		let p2 = { x: cssBezierPoints[2], y: cssBezierPoints[3] }; // Handle 2 coordinates
		let p3 = { x: 1, y: 1 }; // End coordinates
		return bezier(t, p0, p1, p2, p3).y; // Just use the y value so this isn't a true bezier
	}

	let canvasUniq = generator.next().value;
	let canvasUniq2 = generator.next().value;
	// Protect against zero and negative numbers
	canvasUniq = canvasUniq < 1 ? 1 : canvasUniq;
	canvasUniq2 = canvasUniq2 < 1 ? 1 : canvasUniq2;
	// Create unique decimals
	let canvasUniqDecimal = pseudoRandomDecimal();
	let canvasUniqDecimal2 = pseudoRandomDecimal();

	let metalStyle = !(canvasUniq % 22);

	let darkStyle = metalStyle && pseudoRandomDecimal() > 0.1;
	let hueReflect = pseudoRandomDecimal() > 0.5;
	let metalGoldNotSilver = pseudoRandomDecimal() > 0.5;

	// Random flow field cell size steps of 10 e.g. 10, 20, 30, 40 etc…
	let flowFieldGridCellSize =
		Math.round((canvasUniqDecimal < 0.01 ? 0.01 : canvasUniqDecimal) * 31) * 10;
	// Protect against zero cell size
	flowFieldGridCellSize = flowFieldGridCellSize < 10 ? 10 : flowFieldGridCellSize;

	let doSmoothFlowField = canvasUniqDecimal > 0.3;
	let smoothFlowFieldIterations = Math.round((canvasUniqDecimal * 4313) % 5) + 1;
	let flowFieldAngleRangeDecimal = canvasUniqDecimal;
	let hueRange = ((canvasUniq * 12433) % 360) + minHueRange;
	let strictFlowDirection = !!(canvasUniq % 3);
	let Lwidth = Math.round((canvasUniqDecimal * 4313) % maxLineWidth) + minLineWidth;
	let lineCount = (seed * generator.next().value) % 2959;
	// Minimum 101 lines
	lineCount = lineCount < minLineCount ? minLineCount : lineCount;
	let maxMoveDistance = ((seed * generator.next().value) % 20) + minMoveDistance;
	let maxRotationChange = canvasUniqDecimal;
	// let isGrayscale = true;
	let isGrayscale = pseudoRandomDecimal() < 0.07;
	let isGrayscaleHighContrast = pseudoRandomDecimal() < 0.5;

	let doCircle = true || pseudoRandomDecimal() > 0.5;
	let doCircleBreaks = false;
	let doCircleSoft = true || pseudoRandomDecimal() < 0.75;
	let circleSoftness =
		(canvasUniq % Math.round(renderSize * 0.133)) + Math.round(renderSize * 0.0195);

	let lineStyles = [
		{
			name: 'solid',
			weight: 8,
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return indexLine < lineCount * 0.95 || lineStepIndex !== 1;
			},
		},
		{
			name: 'solidTaper',
			weight: 14,
			metalOutsideCircleHighlight(lineStepIndex) {
				return lineStepIndex !== 3;
			},
		},
		{
			name: 'dots',
			weight: 7,
			metalOutsideCircleHighlight(lineStepIndex) {
				return lineStepIndex !== 3;
			},
		},
		{
			name: 'dotsTaper',
			weight: 9,
			metalOutsideCircleHighlight(lineStepIndex) {
				return lineStepIndex !== 3;
			},
		},
		{
			name: 'lolipop',
			weight: 4,
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return indexLine < lineCount * 0.8 || lineStepIndex !== totalSteps - 1;
			},
		},
	];

	function getLineStyleProperties(targetStyleName) {
		return lineStyles.find(({ name }) => name === targetStyleName);
	}

	function chooseStyle(inputDecimal: number): string {
		const totalWeight = lineStyles.map(({ weight }) => weight).reduce((acc, curr) => acc + curr, 0);
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
		minLineSteps = 23;
	}

	var d = new Date();
	var n = d.toISOString().replaceAll('-', '').replaceAll('T', '').replaceAll(':', '').slice(0, 14);
	// let fileName = `${n}-${`${seed}`.padStart(2, '00')}.png`;
	let fileName = `${`${seed}`.padStart(2, '00')}.png`;

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
		if (darkStyle) {
			ctx.fillStyle = '#000';
		} else {
			ctx.fillStyle = '#fff';
		}
		ctx.fill();

		// Dark mode 1/2 // Dark mode was a bit meh
		// if (canvasUniq > pseudoRandomMax * 0) {
		// 	// Fill canvas background
		// 	ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		// 	ctx.fillStyle = '#111';
		// 	ctx.fill();
		// }

		hueShift = ((canvasUniq % 360) * 5342) % 360;
		// console.log(hueShift, canvasUniqDecimal, flowFieldGridCellSize);

		for (let indexLine = 0; indexLine < lineCount; indexLine++) {
			const lineUniq = generator.next().value;
			const lineUniqDecimal = parseFloat(`0.${lineUniq.toString().slice(1, 3)}`);
			let x;
			let y;
			let newx;
			let newy;

			if (edgeShy) {
				// Start inset from edge
				x = (generator.next().value % (canvasElement.width - 20)) + 10 || 100;
				y = (generator.next().value % (canvasElement.height - 20)) + 10 || 100;
			} else {
				// Allow start outset from edge
				x = (generator.next().value % (canvasElement.width + 100)) - 50 || 100;
				y = (generator.next().value % (canvasElement.height + 100)) - 50 || 100;
			}

			newx = x;
			newy = y;

			let hueRepeatDistance = (canvasUniq % Math.round(renderSize * 0.0224609375)) + 1;

			let hue = 0;

			if (hueReflect) {
				// Hue reflect
				let hueDecimal = (((x + y) / (hueRepeatDistance * 2)) % hueRange) / hueRange;
				hueDecimal = hueDecimal < 0.5 ? hueDecimal : 1 - hueDecimal;
				hueDecimal = hueDecimal * 2;
				hue = hueDecimal * hueRange;
			} else {
				// Hue range cycle-snap-repeat
				hue = ((x + y) / hueRepeatDistance) % hueRange;
			}
			// Procedural hue shift
			hue = hue + hueShift;

			// Place hue value on 360° hue-circle-representation
			hue = Math.round(hue % 360);

			let lightness = lineUniqDecimal * 30 + 70;
			if (darkStyle) {
				lightness = 100 - lightness + 70;
			}

			// Adjust bright yellow hues to be a little darker as they're impossible to see on white.
			let hueDarkenMidPoint = 60;
			let hueDarkenRange = 70;
			let hueRangeDarkenLower = hueDarkenMidPoint - hueDarkenRange / 2;
			let hueRangeDarkenUpper = hueDarkenMidPoint + hueDarkenRange / 2;
			let hueDarkenByMax = 8;
			if (hue > hueRangeDarkenLower && hue < hueRangeDarkenUpper) {
				let hueAdjustDecimal =
					(hue - hueRangeDarkenLower) / (hueRangeDarkenUpper - hueRangeDarkenLower);
				let hueAdjustValue = Math.sin(hueAdjustDecimal * Math.PI);
				lightness = lightness - hueAdjustValue * hueDarkenByMax;
			}

			// Rarely use opposite color hue
			if (!(((indexLine * lineUniq) % lineCount) * canvasUniqDecimal)) {
				hue = (hue + 180) % 360;
				lightness = 80;
			}

			// Set saturation
			let saturation = 100;

			// Grayscale settings
			if (isGrayscale) {
				saturation = 0.1;
				if (isGrayscaleHighContrast) {
					// High contrast
					lightness = lineUniqDecimal > 0.6 ? 80 : lineUniqDecimal < 0.1 ? 95 : 30;
				}
			}

			//
			let alpha = 1;

			ctx.lineWidth = 1;
			ctx.lineCap = 'round';

			lineSteps = canvasUniq % Math.round(canvasElement.width / 14);
			lineSteps = lineSteps < minLineSteps ? minLineSteps : lineSteps;

			if (lineStyle === 'lolipop') {
				lineSteps = (canvasUniq % 17) + 3;
			}

			if (lineStyle === 'solidTaper' || lineStyle === 'dotsTaper') {
				lineSteps = lineSteps < 6 ? (canvasUniq % 6) + 6 : lineSteps;
			}

			let moveVector;
			let color;

			let lineMoveDistance = maxMoveDistance;
			// Make little fish version
			if (lineStyle === 'solidTaper' && !(canvasUniq2 % 4)) {
				lineMoveDistance = 1;
				lineSteps += Math.round(canvasElement.width * 0.006);
			}

			// Choose line width algorithm
			for (let indexStep = 1; indexStep < lineSteps; indexStep++) {
				switch (lineStyle) {
					case 'solid': {
						break;
					}
					case 'dots': {
						// lineMoveDistance = Lwidth;
						break;
					}
					case 'dotsTaper': {
						if (canvasUniq % 2) {
							// Dots Taper In
							Lwidth = indexStep;
						} else {
							// Dots Taper Both
							Lwidth = indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
						}
						break;
					}
					case 'solidTaper': {
						if (canvasUniq % 2) {
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
						Lwidth += canvasElement.width * 0.01;
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

				if (darkStyle) {
					// hue = 54;
					saturation = 100;
					// lightness = 100 - lightness;
					// lightness = 50;
				}
				let tempGoldDecimal;
				if (metalStyle) {
					// let repeatlength = canvasElement.width / ((canvasUniq2 % 2) + 20);
					let repeatlength = canvasElement.width / ((canvasUniq2 % 15) + 24);
					// Sharp straight metal gradient
					tempGoldDecimal = (((x + y) / repeatlength) % repeatlength) / repeatlength;
					// Shart radial metal gradient
					if (canvasUniqDecimal < 0.5) {
						tempGoldDecimal =
							((Math.sqrt(x ** 2 + y ** 2) / repeatlength) % repeatlength) / repeatlength;
					}

					// if (canvasUniqDecimal2 > 0.5) {
					// 	// Smooth metal gradient
					// 	tempGoldDecimal = tempGoldDecimal < 0.5 ? tempGoldDecimal : 1 - tempGoldDecimal;
					// 	tempGoldDecimal = tempGoldDecimal * 2;
					// 	hue = tempGoldDecimal * repeatlength;
					// } else {
					// Ease decimal
					{
						// let highPowerRatio = 2;
						// let lowPowerRatio = 5;
						// let transitionPoint = 0.8;
						// let midPoint = 0.4;
						// tempGoldDecimal =
						// 	tempGoldDecimal < midPoint
						// 		? (1 - (1 - tempGoldDecimal * (1 / midPoint)) ** lowPowerRatio) * transitionPoint
						// 		: ((tempGoldDecimal - midPoint) * (1 / (1 - midPoint))) ** highPowerRatio *
						// 				(1 - transitionPoint) +
						// 		  transitionPoint;

						tempGoldDecimal = metalGradientBezier(tempGoldDecimal);
					}

					// }

					if (metalGoldNotSilver) {
						// Gold

						let goldHighHSL = [56, 87, 88];
						// let goldMediumHSL = [46, 90, 62];
						let goldLowHSL = [37, 63, 29];

						// Hue
						let hu = tempGoldDecimal * (goldHighHSL[0] - goldLowHSL[0]) + goldLowHSL[0];
						// Saturation
						let sat = tempGoldDecimal * (goldHighHSL[1] - goldLowHSL[1]) + goldLowHSL[1];
						sat = lineUniqDecimal > 0.8 ? sat - lineUniqDecimal * 6 : sat;
						// Lightness
						let lit = tempGoldDecimal * (goldHighHSL[2] - goldLowHSL[2]) + goldLowHSL[2];
						lit = lineUniqDecimal > 0.7 ? lit - lineUniqDecimal * 17 : lit;
						// Combine to color
						color = `hsl(${hu}, ${sat}%, ${lit}%)`;
					} else {
						// Silver
						// Hue
						let hu = tempGoldDecimal * 10 + 180;
						// Saturation
						let sat = 2;
						// Lightness
						let lit = tempGoldDecimal * 70 + 30;
						lit = lineUniqDecimal > 0.7 ? lit - lineUniqDecimal * 17 : lit;
						// Combine to color
						color = `hsl(${hu}, ${sat}%, ${lit}%)`;
					}

					// color =
					// 	tempGoldDecimal > 0.7
					// 		? `hsl(47, 99%, 30%)`
					// 		: tempGoldDecimal > 0.3
					// 		? `hsl(51, 75%, 54%)`
					// 		: `hsl(57, 94%, 90%)`;
				}

				if (!metalStyle) {
					color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
				}

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

				let distanceFromCenter;
				distanceFromCenter = Math.sqrt(
					(canvasElement.width / 2 - x) ** 2 + (canvasElement.height / 2 - y) ** 2
				);
				if (doCircleSoft) {
					distanceFromCenter = distanceFromCenter + (lineUniq % circleSoftness);
				}
				let withinCircle = canvasElement.width / 2.56 > distanceFromCenter;

				if (
					metalStyle &&
					!withinCircle &&
					getLineStyleProperties(lineStyle).metalOutsideCircleHighlight(
						indexStep,
						lineSteps,
						indexLine,
						lineCount
					)
				) {
					// if (metalStyle && !withinCircle && indexStep !== lineSteps - 1) {
					if (metalGoldNotSilver) {
						// Gold
						// color = darkStyle
						// 	? `hsl(76, 13%, ${tempGoldDecimal * 6 + 3}%)`
						// 	: `hsl(56, 61%, ${tempGoldDecimal * 6 + 87}%)`;
						color = darkStyle
							? `hsl(${tempGoldDecimal * 10 + 70}, 13%, ${0.4 * 6 + 3}%)`
							: `hsl(${tempGoldDecimal * 10 + 50}, 61%, ${0.4 * 6 + 87}%)`;
					} else {
						// Silver
						// color = darkStyle
						// 	? `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${tempGoldDecimal * 6 + 3}%)`
						// 	: `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${tempGoldDecimal * 6 + 90}%)`;
						color = darkStyle
							? `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${0.4 * 6 + 3}%)`
							: `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${0.4 * 6 + 90}%)`;
					}
				}

				ctx.fillStyle = color;
				ctx.strokeStyle = color;
				newx = Math.round(x + moveVector[0]);
				newy = Math.round(y + moveVector[1]);

				if (!doCircle || withinCircle || lightness > 89) {
					// Draw
					if (lineStyle === 'dots' || lineStyle === 'dotsTaper') {
						// Dotted lines
						let fullCircle = 2 * Math.PI;
						ctx.arc(x, y, Lwidth, 0, fullCircle);
						ctx.fill();
					} else {
						// Solid lines
						ctx.lineTo(newx, newy);
						ctx.stroke();
					}
				} else {
					if (doCircleBreaks) {
						break;
					}
				}
				// ctx.closePath();

				// Skip to other side if out of bounds
				if (loopAroundEdges) {
					if (newx < 0 || newy < 0 || newx > canvasElement.width || newy > canvasElement.height) {
						newx = newx < 0 ? canvasElement.width : newx;
						newy = newy < 0 ? canvasElement.height : newy;

						newx = newx > canvasElement.width ? 0 : newx;
						newy = newy > canvasElement.height ? 0 : newy;

						ctx.moveTo(newx, newy);
					}
				}

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

<canvas class:diagnostics bind:this={canvasElement} width={renderSize} height={renderSize} />

{#if download}
	<button id="download" on:click={downloadImage}>Download {fileName}</button>
{/if}

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

<style>
	canvas {
		width: 100%;
		height: 100%;
		/* width: 128px;
		height: 128px; */
		/* border-radius: 100%; */
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
