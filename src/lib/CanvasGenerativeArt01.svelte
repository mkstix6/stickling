<script lang="ts">
	/*
	 * main.js
	 */

	import { onMount } from 'svelte';
	import { pseudoRandom } from '$lib/utils';

	export let seed = 1;
	export let diagnostics = false;
	export let download = false;
	export let rendersize = 2 ** 11;
	export let transparent: boolean = false;

	let circleOnly = transparent;
	let renderSize = rendersize;

	let canvasElement;
	let ctx;
	let flowField = [];
	let lineSteps: number = 20;
	// Minimum clamp values
	let minHueRange: number = 1;

	let minMoveDistance: number = 1;
	let minLineCount: number = 888; // Math.ceil(renderSize ** 2 * 0.000385);
	let minUniqDecimal: number = 0.001;
	let loopAroundEdges: boolean = false;
	let hueShift: number = 0;
	let lineMoveDistance: number;
	let minDotStepDistance: number = 0;

	let generator = pseudoRandom(seed);

	if (typeof String.prototype.replaceAll == 'undefined') {
		String.prototype.replaceAll = function (match, replace) {
			return this.replace(new RegExp(match, 'g'), () => replace);
		};
	}

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
		let cssBezierPoints = [0.1, 2.2, 0.925, -0.185];
		let p0 = { x: 0, y: 0 }; // Start coordinates
		let p1 = { x: cssBezierPoints[0], y: cssBezierPoints[1] }; // Handle 1 coordinates
		let p2 = { x: cssBezierPoints[2], y: cssBezierPoints[3] }; // Handle 2 coordinates
		let p3 = { x: 1, y: 1 }; // End coordinates
		return bezier(t, p0, p1, p2, p3).y; // Just use the y value so this isn't a true bezier
	}

	let canvasUniq: number = generator.next().value;
	let canvasUniq2: number = generator.next().value;
	// Protect against zero and negative numbers
	canvasUniq = canvasUniq < 1 ? 1 : canvasUniq;
	canvasUniq2 = canvasUniq2 < 1 ? 1 : canvasUniq2;
	// Create unique decimals
	let canvasUniqDecimal: number = pseudoRandomDecimal();
	let canvasUniqDecimal2: number = pseudoRandomDecimal();
	let canvasLWidthDecimal: number = pseudoRandomDecimal();

	let widthChoiceDecimal: number = pseudoRandomDecimal();
	let minLineWidth: number = widthChoiceDecimal < 0.9 ? 1 : 8;
	let maxLineWidth: number = widthChoiceDecimal < 0.9 ? 13 : 50;

	let metalStyle: boolean = !(canvasUniq % 22);
	let darkDecimal: number = pseudoRandomDecimal();
	let darkStyle: boolean = (metalStyle && darkDecimal > 0.1) || (!metalStyle && darkDecimal < 0.15);
	let hueReflect: boolean = pseudoRandomDecimal() > 0.5;
	let metalGoldNotSilver: boolean = pseudoRandomDecimal() > 0.5;

	// Random flow field cell size steps of 10 e.g. 10, 20, 30, 40 etc…
	let flowFieldGridCellSize: number =
		Math.round(
			(canvasUniqDecimal < 0.01 ? 0.01 : canvasUniqDecimal) * Math.ceil(renderSize * 0.0302734375)
		) * 10;
	// Protect against zero cell size
	flowFieldGridCellSize = flowFieldGridCellSize < 10 ? 10 : flowFieldGridCellSize;

	let doSmoothFlowField: boolean = canvasUniqDecimal > 0.2;
	let smoothFlowFieldIterations: number = Math.round((canvasUniqDecimal * 4313) % 11) + 3;
	let flowFieldAngleRangeDecimal: number = canvasUniqDecimal * 2;
	let hueRange: number = ((canvasUniq * 12433) % 360) + minHueRange;
	let strictFlowDirection: boolean = !!(canvasUniq % 2);
	let Lwidth: number =
		Math.round(canvasLWidthDecimal * (maxLineWidth - minLineWidth)) + minLineWidth;

	let lineCount: number = (seed * generator.next().value) % (minLineCount * 4);
	// Minimum 101 lines
	lineCount = lineCount < minLineCount ? minLineCount : lineCount;

	let maxRotationChange: number = canvasUniqDecimal / 2;
	// let isGrayscale = true;
	let isGrayscale: boolean = pseudoRandomDecimal() < 0.07;
	let isGrayscaleHighContrast: boolean = pseudoRandomDecimal() < 0.5;

	let doCircle: boolean = true; // pseudoRandomDecimal() > 0.5;
	let doCircleBreaks: boolean = false;
	let doCircleSoft: boolean = true; // pseudoRandomDecimal() < 0.75;
	let circleSoftness: number =
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
			drawtype: 'lines',
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
				stepAngle: undefined,
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
			drawtype: 'lines',
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
				stepAngle: 'equal',
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps) {
				return maxMoveDistance;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				if (this.resolutionAdjustments.stepDistance === 'scale') {
					return !(indexLine < lineCount * 0.8 && lineStepIndex >= 0 && lineStepIndex <= 2);
				} else {
					return !(
						indexLine < lineCount * 0.8 &&
						lineStepIndex >= Math.ceil((1 * renderSize) / 1024) &&
						lineStepIndex <= Math.ceil((2 * renderSize) / 1024)
					);
				}
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
			minLineSteps: 12,
			maxLineSteps: 28,
			lineStepsAlgorithm() {
				return (canvasUniq % this.maxLineSteps) + this.minLineSteps;
			},
		},
		{
			name: 'dripFish',
			weight: 4,
			drawtype: 'lines',
			resolutionAdjustments: {
				lineWidth: undefined,
				stepDistance: 'equal',
				stepCount: 'scale',
				stepAngle: undefined,
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
			drawtype: 'circles',
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale',
				stepCount: 'equal',
				stepAngle: undefined,
			},
			lineMoveDistanceAlgorithm(maxMoveDistance, indexStep, lineSteps, ogWidth) {
				let lineSize = this.lineWidthAlgorithm(ogWidth, indexStep, lineSteps);
				let diameter = lineSize * 2;
				return maxMoveDistance < diameter
					? diameter
					: maxMoveDistance * canvasUniqDecimal2 + diameter;
			},
			metalOutsideCircleHighlight(lineStepIndex, totalSteps, indexLine, lineCount) {
				return indexLine < lineCount * 0.9 || lineStepIndex !== 2;
			},
			lineWidthAlgorithm(ogWidth, indexStep, lineSteps): number {
				return ogWidth < minLineWidth ? minLineWidth : ogWidth;
			},
			minLineSteps: 2,
			lineStepsAlgorithm() {
				return (canvasUniq % 53) + this.minLineSteps;
			},
		},
		{
			name: 'dotsTaper',
			weight: 9,
			drawtype: 'circles',
			resolutionAdjustments: {
				lineWidth: 'scale',
				stepDistance: 'scale', // I would choose 'scaled' here but this appears to be handled elsewhere
				stepCount: 'equal',
				stepAngle: undefined,
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
			minLineSteps: 17,
			lineStepsAlgorithm() {
				return (canvasUniq % 73) + this.minLineSteps;
			},
		},
		// {
		// 	name: 'lolipop',
		// 	weight: 4,
		// 	drawtype: 'lines',
		// 	resolutionAdjustments: {
		// 		lineWidth: 'scale',
		// 		stepDistance: 'scale',
		// 		stepCount: 'equal',
		// 		stepAngle: undefined
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
		let tempMetalDecimal;

		let hueRepeatScaler = (canvasUniq % 23) + 4;

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

		{
			// Adjust bright yellow hues to be a little darker as they're impossible to see on white.
			let hueDarkenMidPoint = 60;
			let hueDarkenRange = 80;
			let hueRangeDarkenLower = hueDarkenMidPoint - hueDarkenRange / 2;
			let hueRangeDarkenUpper = hueDarkenMidPoint + hueDarkenRange / 2;
			let hueDarkenByMax = 9;
			if (hue > hueRangeDarkenLower && hue < hueRangeDarkenUpper) {
				let hueAdjustDecimal =
					(hue - hueRangeDarkenLower) / (hueRangeDarkenUpper - hueRangeDarkenLower);
				let hueAdjustValue = Math.sin(hueAdjustDecimal * Math.PI);
				lightness = lightness - hueAdjustValue * hueDarkenByMax;
			}
		}

		{
			// Adjust bright cyan hues to be a little darker as they're impossible to see on white.
			let hueDarkenMidPoint = 165;
			let hueDarkenRange = 70;
			let hueRangeDarkenLower = hueDarkenMidPoint - hueDarkenRange / 2;
			let hueRangeDarkenUpper = hueDarkenMidPoint + hueDarkenRange / 2;
			let hueDarkenByMax = 5;
			if (hue > hueRangeDarkenLower && hue < hueRangeDarkenUpper) {
				let hueAdjustDecimal =
					(hue - hueRangeDarkenLower) / (hueRangeDarkenUpper - hueRangeDarkenLower);
				let hueAdjustValue = Math.sin(hueAdjustDecimal * Math.PI);
				lightness = lightness - hueAdjustValue * hueDarkenByMax;
			}
		}

		// Rarely use opposite color hue
		if (!((indexLine * lineUniq) % Math.round(lineCount / 2))) {
			hue = (hue + 180) % 360;
			lightness = 85;
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
				tempMetalDecimal =
					((Math.sqrt(x ** 2 + y ** 2) / (repeatlength * (1024 / renderSize))) % repeatlength) /
					repeatlength;
			} else {
				// Sharp straight metal gradient
				tempMetalDecimal =
					(((x + y) / (repeatlength * (1024 / renderSize))) % repeatlength) / repeatlength;
			}
			tempMetalDecimal = metalGradientBezier(tempMetalDecimal);

			if (metalGoldNotSilver) {
				// Gold

				let goldHighHSL;
				// let goldMediumHSL;
				let goldLowHSL;
				if (darkStyle) {
					goldHighHSL = [56, 87, 88];
					// goldMediumHSL = [46, 90, 62];
					goldLowHSL = [37, 63, 25];
				} else {
					goldHighHSL = [59, 85, 85];
					// goldMediumHSL = [46, 90, 62];
					goldLowHSL = [45, 73, 34];
				}

				// Hue
				let hu = tempMetalDecimal * (goldHighHSL[0] - goldLowHSL[0]) + goldLowHSL[0];
				// Saturation
				let sat = tempMetalDecimal * (goldHighHSL[1] - goldLowHSL[1]) + goldLowHSL[1];
				// Occasionally reduce
				sat = lineUniqDecimal > 0.8 ? sat - lineUniqDecimal * 4 : sat;
				// Lightness
				let lit = tempMetalDecimal * (goldHighHSL[2] - goldLowHSL[2]) + goldLowHSL[2];
				// Occasionally reduce
				lit = lineUniqDecimal > 0.8 ? lit - lineUniqDecimal * 7 : lit;
				// Combine to color
				color = `hsl(${hu}, ${sat}%, ${lit}%)`;
			} else {
				// Silver
				// Hue
				let hu = tempMetalDecimal * 10 + 180;
				// Saturation
				let sat = tempMetalDecimal * 4 + 3;
				// Lightness
				let lit = tempMetalDecimal * 70 + 30;
				// Occasionally reduce
				lit = lineUniqDecimal > 0.8 ? lit - lineUniqDecimal * 7 : lit;
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
					? `hsl(${tempMetalDecimal * 10 + 70}, 13%, 5%)`
					: `hsl(${tempMetalDecimal * 10 + 50}, 51%, 93%)`;
			} else {
				// Silver
				color = darkStyle
					? `hsl(${tempMetalDecimal * 10 + 180}, 3%, 5%)`
					: `hsl(${tempMetalDecimal * 10 + 180}, 3%, 95%)`;
			}
		}

		if (!metalStyle) {
			color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		}
		if (
			doCircle &&
			darkStyle &&
			!metalStyle &&
			!withinCircle &&
			getLineStyleProperties(lineStyle.name).metalOutsideCircleHighlight(
				indexStep,
				lineSteps,
				indexLine,
				lineCount
			)
		) {
			color = `hsl(${hue}, ${saturation / 2}%, ${lightness / 10}%)`;
		}

		if (circleOnly && !withinCircle) {
			color = `hsla(0,0%,0%,0)`;
		}

		return { color, lightness };
	}

	let lineStyle = chooseStyle(canvasUniqDecimal2);

	let maxMoveDistance = Math.round(((seed * generator.next().value) % 20) + minMoveDistance);
	// if (lineStyle.resolutionAdjustments.stepDistance === 'scale') {
	// 	maxMoveDistance = Math.ceil((maxMoveDistance * renderSize) / 1024);
	// }

	var d = new Date();
	var n = `${d.toISOString()}`
		.replaceAll('-', '')
		.replaceAll('T', '')
		.replaceAll(':', '')
		.slice(0, 14);
	// let fileName = `${n}-${`${seed}`.padStart(2, '00')}.png`;
	$: fileName = `${`${seed}`.padStart(8, '00000000')}.png`;

	function downloadImage(e) {
		const link = document.createElement('a');
		link.download = fileName;
		link.href = canvasElement.toDataURL();
		link.click();
		link.delete;
	}

	function normaliseAngleRadians(angle: number): number {
		return Math.atan2(Math.sin(angle), Math.cos(angle));
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
				let angle =
					Math.round((randomGen.next().value % (flowFieldAngleRangeDecimal * Math.PI * 2)) * 100) /
					100;

				flowField[i][j] = normaliseAngleRadians(angle);
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

	function getFlowFieldRotation(x: number, y: number): number {
		// Round values to grid cells
		let xCell: number = Math.floor(x / flowFieldGridCellSize);
		let yCell: number = Math.floor(y / flowFieldGridCellSize);
		// Force values within array bounds
		xCell = xCell < 0 ? 0 : xCell > flowField.length - 1 ? flowField.length - 1 : xCell;
		yCell = yCell < 0 ? 0 : yCell > flowField.length - 1 ? flowField.length - 1 : yCell;
		// Retrieve result
		let flowValue: number = flowField[yCell][xCell];
		return flowValue;
	}

	function drawStuff() {
		makeFlowField();

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

		// Dark mode 1/2 // Dark mode was a bit meh
		// if (canvasUniq > pseudoRandomMax * 0) {
		// 	// Fill canvas background
		// 	ctx.rect(0, 0, canvasElement.width, canvasElement.height);
		// 	ctx.fillStyle = '#111';
		// 	ctx.fill();
		// }

		hueShift = ((canvasUniq % 360) * 5342) % 360;

		let ogX: number;
		let ogY: number;

		for (let indexLine = 0; indexLine < lineCount; indexLine++) {
			const lineUniq: number = generator.next().value;
			const lineUniqDecimal: number = pseudoRandomDecimal();
			const lineUniqDecimal2: number = pseudoRandomDecimal();
			let x: number;
			let y: number;
			let newx: number;
			let newy: number;

			// Allow start outset from edge
			x = (generator.next().value % (canvasElement.width + 100)) - 50 || 100;
			y = (generator.next().value % (canvasElement.height + 100)) - 50 || 100;

			newx = x;
			newy = y;

			ogX = x;
			ogY = y;

			let moveUnitVector: [number, number];
			let moveVector: [number, number];
			let rotatingClockwise: boolean = lineUniqDecimal > 0.5;

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
					moveUnitVector = [Math.sin(cellFlowRotation), Math.cos(cellFlowRotation)];
				} else {
					let maxOverRotate = lineUniqDecimal2 ** 2 * 6;
					// Gradually turn to match move vector according to max turn per line step.
					if (!moveUnitVector) {
						moveUnitVector = [
							Math.sin(cellFlowRotation + maxOverRotate / 8),
							Math.cos(cellFlowRotation + maxOverRotate / 8),
						];
					}

					// Current move angle
					const moveRotation: number = Math.atan2(moveUnitVector[0], moveUnitVector[1]);
					let newMoveRotation: number;

					// Switch between CW and CCW if getting too far from direction
					if (moveRotation + 999 > cellFlowRotation + 999 + maxOverRotate) {
						rotatingClockwise = false;
						// newMoveRotation = cellFlowRotation + maxOverRotate;
					} else if (moveRotation + 999 < cellFlowRotation + 999 - maxOverRotate) {
						rotatingClockwise = true;
						// newMoveRotation = cellFlowRotation - maxOverRotate;
					}

					// Resolve if close to field angle
					if (
						canvasUniq % 4 === 0 &&
						moveRotation + 999 < cellFlowRotation + 999 + maxOverRotate / 10 &&
						moveRotation + 999 > cellFlowRotation + 999 - maxOverRotate / 10
					) {
						newMoveRotation = cellFlowRotation;
					} else if ((canvasUniq + 1) % 4 === 0) {
						// Similar rotations for all lines per canvas
						let angleChange = canvasUniqDecimal2 / ((canvasUniq % 12) + 1);
						newMoveRotation = rotatingClockwise
							? moveRotation + angleChange
							: moveRotation - angleChange;
						moveUnitVector = [Math.sin(newMoveRotation), Math.cos(newMoveRotation)];
					} else if ((canvasUniq + 2) % 4 === 0) {
						// Similar rotations for all lines per canvas
						// This occasionally creates nice concentric dot-flowers
						let angleChange = canvasUniq2 / ((canvasUniq % 12) + 1);
						if (lineStyle.resolutionAdjustments.stepAngle === 'scale') {
							angleChange *= 1024 / renderSize;
						}

						newMoveRotation = rotatingClockwise
							? moveRotation + angleChange
							: moveRotation - angleChange;
						moveUnitVector = [Math.sin(newMoveRotation), Math.cos(newMoveRotation)];
					} else {
						// Different rotations per line
						let angleChange = lineUniqDecimal / ((lineUniq % 12) + 1);
						newMoveRotation = rotatingClockwise
							? moveRotation + angleChange
							: moveRotation - angleChange;
						moveUnitVector = [Math.sin(newMoveRotation), Math.cos(newMoveRotation)];
					}
				}

				// Add size to unit vector
				moveVector = [moveUnitVector[0] * lineMoveDistance, moveUnitVector[1] * lineMoveDistance];

				let lineSize = lineStyle.lineWidthAlgorithm(Lwidth, indexStep, lineSteps);
				if (lineStyle.resolutionAdjustments.lineWidth === 'scale') {
					lineSize = Math.ceil((lineSize * renderSize) / 1024);
				}
				ctx.lineWidth = lineSize;

				ctx.fillStyle = color;
				ctx.strokeStyle = color;
				ctx.lineCap = 'round';

				newx = Math.round(x + moveVector[0]);
				newy = Math.round(y + moveVector[1]);

				if (!doCircle || evaluatePonintRelativeToCircle(x, y, lineUniq) || lightness > 89) {
					// Draw
					if (lineStyle.drawtype === 'circles') {
						// Dotted lines
						let fullCircle = 2 * Math.PI;
						let dotRadius = lineSize / 2;
						dotRadius = dotRadius < 1 ? 1 : dotRadius;
						ctx.arc(x, y, dotRadius, 0, fullCircle);
						ctx.fill();
					} else if (lineStyle.drawtype === 'lines') {
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
		ctx = canvasElement.getContext('2d', { alpha: transparent });
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

{#if diagnostics}
	{lineStyle.name} - {renderSize}
{/if}

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
							style="background: hsl({(pixel / Math.PI) *
								180}, 50%, 50%); transform: rotate({-pixel}rad);"
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
