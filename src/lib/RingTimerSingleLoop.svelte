<script>
	import { spring } from 'svelte/motion';
	import PlayPauseButton from '$lib/PlayPauseButton.svelte';

	export let onDuration = 10;
	export let offDuration = 10;
	export let elapsedSeconds = 0;
	export let ringBackgroundHighlight;
	export let showTicks = false;
	export let playing;

	$: totalLoopTime = onDuration + offDuration;
	$: ringSplitPercentage = (onDuration / totalLoopTime) * 100;
	let loopProgress = spring(0, {
		stiffness: 0.7,
		damping: 0.7,
	});

	$: currentLoopSeconds = elapsedSeconds % (onDuration + offDuration);
	$: whichZone = currentLoopSeconds < onDuration;
	$: onCountDown = onDuration - currentLoopSeconds;
	$: offCountDown = offDuration - currentLoopSeconds + onDuration;
	$: $loopProgress = currentLoopSeconds / totalLoopTime;

	const prettyTime = (seconds) => {
		if (seconds < 60) return seconds;
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
	};

	let degreesPerSecond = 360 / totalLoopTime;
	// Single loop
	let styleRingBackground;
	$: styleRingBackgroundOn = `conic-gradient(var(--pallette-on), var(--pallette-on2) ${ringSplitPercentage}%, var(--pallette-onInactive) ${ringSplitPercentage}%, var(--pallette-onInactive))`;
	$: styleRingBackgroundOff = `conic-gradient(var(--pallette-onInactive), var(--pallette-onInactive) ${ringSplitPercentage}%, var(--pallette-off) ${ringSplitPercentage}%, var(--pallette-off))`;
	$: {
		if (ringBackgroundHighlight === 'active' && whichZone) {
			styleRingBackground = styleRingBackgroundOn;
		} else if (ringBackgroundHighlight === 'active' && !whichZone) {
			styleRingBackground = styleRingBackgroundOff;
		} else {
			styleRingBackground = `conic-gradient(var(--pallette-on), var(--pallette-on2) ${ringSplitPercentage}%, var(--pallette-off) ${ringSplitPercentage}%, var(--pallette-offInactive))`;
		}
	}

	let ticksImage = `repeating-conic-gradient(from 0deg at 50% 50%,transparent 0deg ${
		degreesPerSecond - 1
	}deg, var(--ringTimer-bg) ${degreesPerSecond - 1}deg ${degreesPerSecond}deg);)`;
</script>

<div class:onZone={whichZone} class:offZone={!whichZone}>
	<div class="ring" style="background: {styleRingBackground};">
		{#if ringBackgroundHighlight === 'active' && whichZone}
			<div class="ring__background" style="background: {styleRingBackgroundOn};"></div>
		{:else if ringBackgroundHighlight === 'active' && !whichZone}
			<div class="ring__background" style="background: {styleRingBackgroundOff};"></div>
		{/if}
		{#if showTicks}
			<div class="ringtimer__secondsMarkers" style="background: {ticksImage}"></div>
		{/if}
		<div class="ringtimer__secondHand" style="transform: rotate({$loopProgress * 360}deg);"></div>
		<div class="ringtimer__zoneCountdown">{prettyTime(whichZone ? onCountDown : offCountDown)}</div>
		<div class="ringtimer__button">
			<PlayPauseButton {playing} on:toggle />
		</div>
	</div>
</div>

<style>
	:root {
		--pallette-on: #43f880;
		--pallette-on2: #20f1b7;
		--pallette-off: #d51041;
		--pallette-offInactive: #fc2a06;
		--pallette-offInactive: #38130d;
		--pallette-onInactive: rgb(14, 51, 36);
		--pallette-ready: rgb(18, 148, 255);
		--pallette-secondhand: rgb(4, 121, 218);
		--ringTimer-bg: var(--card-backgroundcolor);
	}

	.ring {
		--ringsize: 7rem;
		--innerRingSizeRatio: 0.6;
		--innerRingInset: calc((var(--ringsize) - (var(--ringsize) * var(--innerRingSizeRatio))) / 2);
		--innerRingSize: calc(var(--ringsize) * var(--innerRingSizeRatio));

		width: var(--ringsize);
		height: var(--ringsize);
		background: var(--pallette-ready);
		border-radius: 100%;
		position: relative;

		&::after {
			content: '';
			width: var(--innerRingSize);
			height: var(--innerRingSize);
			border-radius: 100%;
			background: var(--ringTimer-bg);
			position: absolute;
			top: var(--innerRingInset);
			left: var(--innerRingInset);
			z-index: 1;
		}

		&:hover {
			.ringtimer__button {
				opacity: 1;
			}
		}
	}

	.ringtimer__secondsMarkers {
		position: absolute;
		border-radius: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		pointer-events: none;
	}

	.ringtimer__secondHand {
		position: absolute;
		--width: 10px;
		width: var(--width);
		height: 50%;
		top: 0;
		left: calc(50% - var(--width) / 2);
		z-index: 3;
		border-radius: 2px;
		background: transparent;
		transform-origin: center bottom;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 70%;
			background: var(--pallette-secondhand);
		}
	}

	.ringtimer__zoneCountdown {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: grid;
		place-content: center;
		pointer-events: none;
		text-align: center;
		z-index: 5;
		color: var(--pallette-ready);
		font-weight: 600;
		font-size: 1.5rem;

		.onZone & {
			color: var(--pallette-on);
		}

		.offZone & {
			color: var(--pallette-off);
		}
	}

	@keyframes letsPlay {
		0% {
			transform: rotate(-360deg);
		}
	}

	@keyframes letsPause {
		0% {
			transform: rotate(-360deg);
		}
	}
</style>
