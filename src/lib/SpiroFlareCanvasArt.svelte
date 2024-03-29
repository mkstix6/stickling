<script lang="ts">
	import { pseudoRandom } from './utils';
	import { onMount } from 'svelte';
	import { tick } from 'svelte';

	type ArtConfig = {
		name: string;
		clearBetweenFrames: boolean;
		maxFrames: number;
		fadeAlpha: boolean;
		fadeAlphaRate: number;
		stopAtZeroWidth: boolean;
		concentricLines: boolean;
		coverageChange: number;
		coverageStart: number;
		rotateMagnitude: number;
		actorCount: number;
		globalVariablesAdjustPer: string;
		globalCompositeOperation: string;
		colorRange: number;
		colorHueShift: number;
		actorStepDistance: number;
		actorStepsPerFrame: number;
		lineRadiusStart: number;
		lineRadiusChangeRate: number;
		arcPosition: (time: number, coverage: number, variance: number) => [number, number];
	};

	export let seed: number = Math.ceil(Math.random() * 100);
	export let preset: number = 2;
	export let controls: boolean = false;

	let renderSize = 2 ** 11;
	let canvasElement: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let options: ArtConfig;
	let hardTime = 0;
	let frameNumber = 0;
	let globalAlpha = 1;
	let colors: [number, string][] = [];
	let variances: number[] = [];
	let coverage: number;
	let radius: number;
	let artStyles: ArtConfig[] = [];
	let optionsPRDs = [];
	let generator: Generator;
	let RAF;

	function setStartValues() {
		hardTime = 0;
		frameNumber = 0;
		globalAlpha = 1;
		ctx.globalAlpha = globalAlpha;
	}

	onMount(() => {
		startDrawing();
	});

	async function startDrawing() {
		await tick();
		window.cancelAnimationFrame(RAF);
		ctx = <CanvasRenderingContext2D>canvasElement.getContext('2d');
		// Cancel old animation

		setStartValues();
		fillWithBlack();
		generator = pseudoRandom(seed);
		// Prep a bunch of random numbers so they're stable as we add more presets
		optionsPRDs = [];
		for (let i = 0; i < 100; i++) {
			optionsPRDs.push(pseudoRandomDecimal());
		}

		artStyles = [
			{
				name: 'NeonFossil',
				clearBetweenFrames: false,
				fadeAlpha: false,
				fadeAlphaRate: 0.001,
				stopAtZeroWidth: true,
				concentricLines: false,
				coverageChange: 0.999995,
				coverageStart: canvasElement.width * 0.2,
				rotateMagnitude: 0.2,
				actorCount: 10,
				globalCompositeOperation: 'source-over',
				colorRange: 360 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 10,
				actorStepsPerFrame: 200,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 0.99999,
				maxFrames: 0,
				// globalVariablesAdjustPer: ,
				arcPosition(time, coverage, variance): [number, number] {
					return [
						canvasElement.width / 2 +
							Math.sin(time * 0.000153245 + variance * 2345645) * coverage * variance +
							Math.sin(time * 0.00174565342 + variance * 3.73645) * coverage * variance,
						canvasElement.height / 2 +
							Math.cos(time * 0.000132546 + variance * 76456543) * coverage * variance +
							Math.cos(time * 0.0012536345 + variance * 2.65484564) * coverage * variance
					];
				}
			},
			{
				name: 'StarBurst',
				clearBetweenFrames: false,
				fadeAlpha: false,
				fadeAlphaRate: 0.001,
				stopAtZeroWidth: true,
				concentricLines: false,
				coverageChange: 1,
				coverageStart: canvasElement.width * 0.3,
				rotateMagnitude: 0.2,
				actorCount: 10,
				globalCompositeOperation: 'source-over',
				colorRange: 360 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 10,
				actorStepsPerFrame: 200,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 0.99999,
				arcPosition(time, coverage, variance): [number, number] {
					return [
						canvasElement.width / 2 + Math.sin(time * 0.001) * coverage,
						canvasElement.height / 2 + Math.sin(time * 0.001) * coverage
					];
				}
			},
			{
				name: 'TorusSpectre',
				clearBetweenFrames: false,
				maxFrames: 80,
				fadeAlpha: false,
				fadeAlphaRate: 0.001,
				stopAtZeroWidth: true,
				concentricLines: false,
				coverageChange: 0.999999,
				coverageStart: canvasElement.width * 0.3,
				rotateMagnitude: 0.04,
				actorCount: 3,
				globalCompositeOperation: 'source-over',
				colorRange: 360 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 15,
				actorStepsPerFrame: 60,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 1,
				arcPosition(time, coverage, variance): [number, number] {
					// prettier-ignore
					return [
					canvasElement.width / 2 + Math.sin((time * 0.001+variance*500) * Math.PI * 2 * (1 / 2) ) * coverage,
					canvasElement.height / 2 + Math.cos((time * 0.001+variance*500) * Math.PI * 2 * (1 / 6)) * coverage,
					];
				}
			},
			{
				name: 'PetalNebula',
				clearBetweenFrames: false,
				maxFrames: 0,
				fadeAlpha: false,
				fadeAlphaRate: 0.001,
				stopAtZeroWidth: true,
				concentricLines: false,
				coverageChange: 0.999997,
				coverageStart: canvasElement.width * 0.7,
				rotateMagnitude: 0.007,
				actorCount: 7,
				globalCompositeOperation: 'source-over',
				colorRange: 360 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 10,
				actorStepsPerFrame: 400,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 1,
				arcPosition(time, coverage, variance): [number, number] {
					// prettier-ignore
					return [
					canvasElement.width / 2 + Math.sin(time*0.002 + variance * 6523) * coverage * variance*0.4
					+ Math.sin(time*0.001142) * coverage * 0.3,
					canvasElement.height / 2 + Math.cos(time*0.002 + variance * 2543) * coverage * variance*0.4
					+ Math.cos(time*0.001142) * coverage * 0.3,
					];
				}
			},
			{
				name: 'WarpFlower',
				clearBetweenFrames: false,
				maxFrames: 400,
				fadeAlpha: true,
				fadeAlphaRate: 0.015,
				stopAtZeroWidth: true,
				concentricLines: true,
				globalVariablesAdjustPer: 'frame',
				coverageChange: 10,
				coverageStart: canvasElement.width * 0.59,
				rotateMagnitude: Math.PI / (1 + Math.ceil(optionsPRDs[2] * 5) * 0.5),
				actorCount: 3,
				globalCompositeOperation: 'source-over',
				colorRange: 250 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 20,
				actorStepsPerFrame: 150,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 0.999,
				arcPosition(time, coverage, variance): [number, number] {
					// prettier-ignore
					return [
					canvasElement.width / 2 + Math.sin(time*0.002 + variance * 6523) * coverage * variance*0.4
					+ Math.sin(time*0.0017564) * coverage * 0.3,
					canvasElement.height / 2 + Math.cos(time*0.002 + variance * 2543) * coverage * variance*0.4
					+ Math.cos(time*0.00016111) * coverage * 0.3,
					];
				}
			},
			{
				name: 'SpiroCoil',
				clearBetweenFrames: false,
				maxFrames: 0,
				fadeAlpha: false,
				fadeAlphaRate: 0.001,
				stopAtZeroWidth: true,
				concentricLines: false,
				coverageChange: 0.999997,
				coverageStart: canvasElement.width * 0.65,
				rotateMagnitude: 0.1,
				actorCount: 7,
				globalCompositeOperation: 'source-over',
				colorRange: 360 * optionsPRDs[0],
				colorHueShift: 360 * optionsPRDs[1],
				actorStepDistance: 10,
				actorStepsPerFrame: 400,
				lineRadiusStart: 4,
				lineRadiusChangeRate: 0.99995,
				arcPosition(time, coverage, variance): [number, number] {
					// prettier-ignore
					return [
					canvasElement.width / 2 + Math.sin(time*0.002 + variance * 6523) * coverage * variance*0.4
					+ Math.sin(time*0.001142) * coverage * 0.3,
					canvasElement.height / 2 + Math.cos(time*0.002 + variance * 2543) * coverage * variance*0.4
					+ Math.cos(time*0.001142) * coverage * 0.3,
					];
				}
			}
		];

		options = artStyles[preset];
		coverage = options.coverageStart;
		radius = options.lineRadiusStart;

		// Create list of particle differences
		variances = [];
		for (let i = 0; i < options.actorCount; i++) {
			variances.push(pseudoRandomDecimal());
		}

		// Create color list
		colors = [];
		for (let i = -options.actorStepsPerFrame / 2; i < options.actorStepsPerFrame / 2; i++) {
			let linearDecimalPeak = 1 - Math.abs(i) * (1 / (options.actorStepsPerFrame / 2));
			let hue = i * (options.colorRange / options.actorStepsPerFrame) + options.colorHueShift;
			let saturation = 100;
			let lightness = linearDecimalPeak * 80 + 40;
			let alpha = linearDecimalPeak;
			colors.push([
				i * options.actorStepDistance,
				`hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
			]);
		}

		// Start
		fillWithBlack();
		draw();
	}

	function pseudoRandomDecimal() {
		return parseFloat(`0.${generator.next().value.toString().slice(-5)}`);
	}

	function draw(time: number = 0) {
		hardTime += 16;
		frameNumber++;
		if (options.fadeAlpha) {
			globalAlpha -= options.fadeAlphaRate;
			globalAlpha = globalAlpha < 0 ? 0 : globalAlpha;
			ctx.globalAlpha = globalAlpha;
		}
		if (options.clearBetweenFrames) {
			fillWithBlack();
		}
		rotateCanvas();
		drawParticles(hardTime);
		if (options.globalVariablesAdjustPer === 'frame') {
			adjustGlobalVariables();
		}
		if (!options.maxFrames || options.maxFrames > frameNumber) {
			if (!options.stopAtZeroWidth || coverage > 1) {
				RAF = window.requestAnimationFrame(draw);
			}
		}
	}

	function adjustGlobalVariables() {
		radius *= options.lineRadiusChangeRate;
		if (options.concentricLines) {
			coverage -= options.coverageChange;
		} else {
			coverage *= options.coverageChange;
		}
	}

	function rotateCanvas() {
		ctx.translate(canvasElement.width / 2, canvasElement.height / 2);
		ctx.rotate(options.rotateMagnitude);
		ctx.translate(-canvasElement.width / 2, -canvasElement.height / 2);
	}

	function drawParticles(time: number) {
		ctx.globalCompositeOperation = options.globalCompositeOperation;

		colors.forEach(([tDiff, color]) => {
			variances.forEach((v) => {
				drawParticle(time, v, tDiff, color);
			});
		});
	}

	function drawParticle(
		time: number,
		variance: number = 2.6432557,
		tDiff: number = 0,
		color: string = '#fff'
	) {
		drawCircle(time + tDiff, color, variance);
	}

	function drawCircle(time: number, color: string, variance: number) {
		ctx.beginPath();
		if (!options.globalVariablesAdjustPer || options.globalVariablesAdjustPer === 'circle') {
			adjustGlobalVariables();
		}
		let [arcX, arcY] = options.arcPosition(time, coverage, variance);
		ctx.arc(arcX, arcY, radius, 0, Math.PI * 2);
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}

	function fillWithBlack() {
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = '#000F';
		ctx.fillRect(-100, -100, canvasElement.width + 100, canvasElement.height + 100);
	}
</script>

<h2 class="h4">{options?.name} #{`${seed}`.padStart(3, '000')}</h2>

{#key seed + preset}
	<canvas bind:this={canvasElement} width={renderSize} height={renderSize}>Rendering…</canvas>
{/key}

<div>
	{#if controls}
		<div style="float: right;">
			<button
				class="megaButton"
				on:click={() => {
					seed = Math.ceil(Math.random() * 1000);
					startDrawing();
				}}>Draw a new one!</button
			>
		</div>
	{/if}
	{#if controls}
		<div>
			Choose a preset…
			<div class="radiobuttons">
				{#each artStyles as { name }, index}
					<div class="radiobuttons__button">
						<input
							type="radio"
							value={index}
							id="preset{index}"
							name="preset{index}"
							bind:group={preset}
							on:click={() => {
								preset = index;
								startDrawing();
							}}
						/>
						<label for="preset{index}">{name}</label>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}

	.radiobuttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 0.25rem;

		input {
			position: absolute;
			visibility: hidden;
		}

		label {
			border-radius: 2px;
			background: #0004;
			display: block;
			padding: 0.25rem 0.5rem;
			border: 1px solid #fff5;
			text-align: center;

			&:focus,
			&:hover {
				background: var(--pallette-active-transparent);
			}
			&:active {
				background: var(--pallette-active);
			}
		}

		input:checked + label {
			background: var(--pallette-active);
			color: white;
		}

		&__button {
			display: flex;
			align-items: center;
		}
	}
</style>
