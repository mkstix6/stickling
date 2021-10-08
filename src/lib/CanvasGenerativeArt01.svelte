<script lang="ts">
	/*
	 * main.js
	 */

	import { onMount } from 'svelte';
	import { pseudoRandom } from '$lib/utils';

	export let seed = 1;
	export let diagnostics = false;
	export let download = false;
	export let rendersize = 1024;

	let renderSize = rendersize;

	let canvasElement;
	let ctx;
	let flowField = [];
	let lineSteps = 20;
	// Minimum clamp values
	let minHueRange = 1;

	let minMoveDistance = 1;
	let minLineCount = 3333; // Math.ceil(renderSize ** 2 * 0.000385);
	let minUniqDecimal = 0.001;
	let edgeShy = false;
	let loopAroundEdges = false;
	let hueShift = 0;
	let lineMoveDistance;
	let minDotStepDistance = 0;

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
	let canvasLWidthDecimal = pseudoRandomDecimal();

	let widthChoiceDecimal = pseudoRandomDecimal();
	let minLineWidth = widthChoiceDecimal < 0.9 ? 1 : 8;
	let maxLineWidth = widthChoiceDecimal < 0.9 ? 16 : 50;

	let metalStyle = !(canvasUniq % 22);
	let darkStyle = metalStyle && pseudoRandomDecimal() > 0.1;
	let hueReflect = pseudoRandomDecimal() > 0.5;
	let metalGoldNotSilver = pseudoRandomDecimal() > 0.5;

	// Random flow field cell size steps of 10 e.g. 10, 20, 30, 40 etc…
	let flowFieldGridCellSize =
		Math.round(
			(canvasUniqDecimal < 0.01 ? 0.01 : canvasUniqDecimal) * Math.ceil(renderSize * 0.0302734375)
		) * 10;
	// Protect against zero cell size
	flowFieldGridCellSize = flowFieldGridCellSize < 10 ? 10 : flowFieldGridCellSize;

	let doSmoothFlowField = canvasUniqDecimal > 0.2;
	let smoothFlowFieldIterations = Math.round((canvasUniqDecimal * 4313) % 4) + 1;
	let flowFieldAngleRangeDecimal = canvasUniqDecimal * 2;
	let hueRange = ((canvasUniq * 12433) % 360) + minHueRange;
	let strictFlowDirection = !!(canvasUniq % 3);
	let Lwidth = Math.round(canvasLWidthDecimal * (maxLineWidth - minLineWidth)) + minLineWidth;

	let lineCount = (seed * generator.next().value) % (minLineCount * 2);
	// Minimum 101 lines
	lineCount = lineCount < minLineCount ? minLineCount : lineCount;

	let maxRotationChange = canvasUniqDecimal;
	// let isGrayscale = true;
	let isGrayscale = pseudoRandomDecimal() < 0.07;
	let isGrayscaleHighContrast = pseudoRandomDecimal() < 0.5;

	let doCircle = true; // || pseudoRandomDecimal() > 0.5;
	let doCircleBreaks = false;
	let doCircleSoft = true || pseudoRandomDecimal() < 0.75;
	let circleSoftness =
		(canvasUniq % Math.round(renderSize * 0.133)) + Math.round(renderSize * 0.0195);

	function evaluatePonintRelativeToCircle(x, y, lineUniq) {
		let distanceFromCenter = Math.sqrt(
			(canvasElement.width / 2 - x) ** 2 + (canvasElement.height / 2 - y) ** 2
		);
		if (doCircleSoft) {
			distanceFromCenter = distanceFromCenter + (lineUniq % circleSoftness);
		}
		let withinCircle = canvasElement.width / 2.56 > distanceFromCenter;

		return withinCircle;
	}

	let lineStyles = [
		{
			name: 'solid',
			weight: 9,
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps) {
				return maxMoveDistance;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return indexLine < lineCount * 0.95 || lineStepIndex !== 1;
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				return ogWidth;
			},
			minLineSteps: 2,
			lineStepsAlgorithm() {
				return (canvasUniq % 73) + this.minLineSteps;
			},
		},
		{
			name: 'solidTaper',
			weight: 9,
			resolutionAdjustments: {
				lineWidth: undefined,
				stepDistance: 'equal',
				stepCount: 'scale',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps) {
				return maxMoveDistance;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return lineStepIndex !== Math.ceil((7 * renderSize) / 1024);
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				if (canvasUniq % 2) {
					// Solid Taper In
					return indexStep;
				} else {
					// Solid Taper Both
					return indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
				}
			},
			minLineSteps: 23,
			lineStepsAlgorithm() {
				return (canvasUniq % 63) + this.minLineSteps;
			},
		},
		{
			name: 'dripFish',
			weight: 4,
			resolutionAdjustments: {
				lineWidth: undefined,
				stepDistance: 'equal',
				stepCount: 'scale',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps) {
				return 1;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return lineStepIndex !== 3;
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				if (canvasUniq % 2) {
					// Solid Taper In
					return indexStep;
				} else {
					// Solid Taper Both
					return indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
				}
			},
			minLineSteps: 29,
			lineStepsAlgorithm() {
				return (canvasUniq % 73) + this.minLineSteps;
			},
		},
		{
			name: 'dots',
			weight: 7,
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps, ogWidth) {
				let lineSize = this.lineWidthAlgorithm(ogWidth, indexStep, lineSteps);
				let diameter = lineSize * 2;
				return maxMoveDistance < diameter
					? diameter
					: maxMoveDistance * canvasUniqDecimal2 + diameter;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return indexLine < lineCount * 0.9 || lineStepIndex !== totalSteps - 1;
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				return ogWidth;
			},
			minLineSteps: 2,
			lineStepsAlgorithm() {
				return (canvasUniq % 73) + this.minLineSteps;
			},
		},
		{
			name: 'dotsTaper',
			weight: 9,
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps, ogWidth) {
				let lineSize = this.lineWidthAlgorithm(ogWidth, indexStep, lineSteps);
				let diameter = lineSize * 2;
				return maxMoveDistance < diameter
					? diameter
					: maxMoveDistance * canvasUniqDecimal2 + diameter;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return lineStepIndex !== 3;
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				if (canvasUniq % 2) {
					// Dots Taper In
					return indexStep;
				} else {
					// Dots Taper Both
					return indexStep < lineSteps / 2 ? indexStep : lineSteps - indexStep;
				}
			},
			minLineSteps: 23,
			lineStepsAlgorithm() {
				return (canvasUniq % 73) + this.minLineSteps;
			},
		},
		// {
		// 	name: 'lolipop',
		// 	weight: 4,
		// 	resolutionAdjustments: {
		// 		lineWidth: 'scale',
		// 		stepDistance: 'scale',
		// 		stepCount: 'equal',
		// 	},
		// 	lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps) {
		// 		return indexStep === lineSteps - 1 ? 1 : maxMoveDistance;
		// 	},
		// 	metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
		// 		return indexLine < lineCount * 0.9 || lineStepIndex !== totalSteps - 1;
		// 	},
		// 	lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
		// 		let width = ogWidth;
		// 		if (indexStep === lineSteps - 1) {
		// 			// Lolipop BIG end line's last draw step
		// 			width = width * 2;
		// 		}
		// 		return width;
		// 	},
		// 	minLineSteps: 3,
		// 	lineStepsAlgorithm() {
		// 		return (canvasUniq % 17) + this.minLineSteps;
		// 	},
		// },
	];

	function getLineStyleProperties(targetStyleName) {
		return lineStyles.find(({ name }) => name === targetStyleName);
	}

	function chooseStyle(inputDecimal: number) {
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
				return item;
			}
		}
		return lineStyles[0];
	}

	function chooseColor(ogX, ogY, x, y, lineUniqDecimal, indexLine, lineUniq, indexStep) {
		let color;
		let tempGoldDecimal;

		let hueRepeatScaler = (canvasUniq % 23) + 1;

		let hue = 0;
		let lightness;

		if (hueReflect) {
			// Hue reflect
			let hueDecimal =
				(((ogX / (renderSize / 1024) + ogY / (renderSize / 1024)) / (hueRepeatScaler * 2)) %
					hueRange) /
				hueRange;
			hueDecimal = hueDecimal < 0.5 ? hueDecimal : 1 - hueDecimal;
			hueDecimal = hueDecimal * 2;
			hue = hueDecimal * hueRange;
		} else {
			// Hue range cycle-snap-repeat
			hue = ((ogX / (renderSize / 1024) + ogY / (renderSize / 1024)) / hueRepeatScaler) % hueRange;
		}
		// Procedural hue shift
		hue = hue + hueShift;

		// Place hue value on 360° hue-circle-representation
		hue = Math.round(hue % 360);

		lightness = lineUniqDecimal * 30 + 70;
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

		if (metalStyle) {
			let repeatlength = canvasElement.width / ((canvasUniq2 % 15) + 24);
			// Choose gradient style
			if (canvasUniqDecimal < 0.5) {
				// Shart radial metal gradient
				tempGoldDecimal =
					((Math.sqrt(x ** 2 + y ** 2) / (repeatlength * (1024 / renderSize))) % repeatlength) /
					repeatlength;
			} else {
				// Sharp straight metal gradient
				tempGoldDecimal =
					(((x + y) / (repeatlength * (1024 / renderSize))) % repeatlength) / repeatlength;
			}
			tempGoldDecimal = metalGradientBezier(tempGoldDecimal);

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
		}

		let withinCircle = evaluatePonintRelativeToCircle(x, y, lineUniq);

		if (
			doCircle &&
			metalStyle &&
			!withinCircle &&
			getLineStyleProperties(lineStyle.name).metalOutsideCircleHighlight(
				indexStep,
				lineSteps,
				indexLine,
				lineCount
			)
		) {
			if (metalGoldNotSilver) {
				// Gold
				color = darkStyle
					? `hsl(${tempGoldDecimal * 10 + 70}, 13%, ${0.4 * 6 + 3}%)`
					: `hsl(${tempGoldDecimal * 10 + 50}, 61%, ${0.4 * 6 + 87}%)`;
			} else {
				// Silver
				color = darkStyle
					? `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${0.4 * 6 + 3}%)`
					: `hsl(${tempGoldDecimal * 10 + 180}, 0%, ${0.4 * 6 + 90}%)`;
			}
		}

		if (!metalStyle) {
			color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}

		return { color, lightness };
	}

	let lineStyle = chooseStyle(canvasUniqDecimal2);

	let maxMoveDistance = Math.round(((seed * generator.next().value) % 20) + minMoveDistance);
	if (lineStyle.resolutionAdjustments.stepDistance === 'scale') {
		maxMoveDistance = Math.ceil((maxMoveDistance * renderSize) / 1024);
	}

	var d = new Date();
	var n = d.toISOString().replaceAll('-', '').replaceAll('T', '').replaceAll(':', '').slice(0, 14);
	// let fileName = `${n}-${`${seed}`.padStart(2, '00')}.png`;
	$: fileName = `${`${seed}`.padStart(8, '00000000')}.png`;

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

		let ogX;
		let ogY;

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

			ogX = x;
			ogY = y;

			let moveVector;

			ctx.lineCap = 'round'; // TODO move this

			lineSteps = lineStyle.lineStepsAlgorithm();

			if (lineStyle.resolutionAdjustments.stepCount === 'scale') {
				// Resolution independence: steps for dots need to be the same steps for others need to scale to retain shapes
				lineSteps = Math.round((lineSteps * renderSize) / 1024);
			}

			for (let indexStep = 1; indexStep < lineSteps; indexStep++) {
				lineMoveDistance = lineStyle.lineMoveDistanceAlgorithm(
					maxMoveDistance,
					indexStep,
					lineSteps,
					Lwidth
				);

				let { color, lightness } = chooseColor(
					ogX,
					ogY,
					x,
					y,
					lineUniqDecimal,
					indexLine,
					lineUniq,
					indexStep
				);
				if (lineStyle.resolutionAdjustments.stepDistance === 'scale') {
					// Resolution independence for distance
					lineMoveDistance = Math.ceil((lineMoveDistance * renderSize) / 1024);
					lineMoveDistance = lineMoveDistance < 1 ? 1 : lineMoveDistance;
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

				let lineSize = lineStyle.lineWidthAlgorithm(Lwidth, indexStep, lineSteps);
				if (lineStyle.resolutionAdjustments.lineWidth === 'scale') {
					lineSize = Math.ceil((lineSize * renderSize) / 1024);
				}
				ctx.lineWidth = lineSize;

				ctx.fillStyle = color;
				ctx.strokeStyle = color;
				newx = Math.round(x + moveVector[0]);
				newy = Math.round(y + moveVector[1]);

				if (!doCircle || evaluatePonintRelativeToCircle(x, y, lineUniq) || lightness > 89) {
					// Draw
					if (lineStyle.name === 'dots' || lineStyle.name === 'dotsTaper') {
						// Dotted lines
						let fullCircle = 2 * Math.PI;
						let dotRadius = lineSize / 2;
						ctx.arc(x, y, dotRadius, 0, fullCircle);
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
	}

	onMount(() => {
		ctx = canvasElement.getContext('2d', { alpha: false });
		if (!diagnostics) {
			// Rotate entire canvas
			for (let i = 0; i < canvasUniq2 % 4; i++) {
				ctx.rotate(90 * (Math.PI / 180));
				ctx.translate(0, -canvasElement.width);
			}
		}
		// Start
		drawStuff();
	});
</script>

<canvas class:diagnostics bind:this={canvasElement} width={renderSize} height={renderSize} />

{#if download}
	<button id="download" on:click={downloadImage}>Download {fileName}</button>
{/if}

{#if diagnostics}
	<div>
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
	:root {
		--floffieldreadoutsize: 16px;
	}

	canvas {
		width: 100%;
		height: 100%;
	}

	.pixel {
		display: inline-block;
		width: var(--floffieldreadoutsize);
		height: var(--floffieldreadoutsize);
		margin: 0;
		padding: 0;
		text-align: center;
		line-height: var(--floffieldreadoutsize);
		border-radius: 100%;
		overflow: hidden;
	}

	.flowFieldReadout {
		line-height: var(--floffieldreadoutsize);
		display: inline-block;
		transform: scale(0.25);
		position: absolute;
		max-width: none;
		width: 2000px;
		transform-origin: left top;
	}

	.roundButton {
		--buttonsize: 3em;
		width: var(--buttonsize);
		height: var(--buttonsize);
		border-radius: 100%;
		line-height: var(--buttonsize);
		text-align: center;
		border: 1px solid black;
		background: white;
		padding: 0;
	}
</style>
