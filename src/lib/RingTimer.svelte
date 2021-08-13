<script>
	// IDEA Option: sounds (last few seconds of countdown).
	// IDEA Option: only show seconds below certain number of seconds i.e. last 3 seonds, last 10 seconds).

	import RingTimerSingleLoop from '$lib/RingTimerSingleLoop.svelte';
	// import RingTimerDoubleLoop from '$lib/RingTimerDoubleLoop.svelte';
	// import RingTimerCountdownLoop from '$lib/RingTimerCountdownLoop.svelte';

	// Props
	export let onDuration = 30; // Number of seconds
	export let offDuration = 15; // Number of seconds
	export let loopStyle = 'single'; // Options 'single' | IDEA'double' | IDEA'countdown'
	export let widgetLayout = 'verbose'; // Options 'ringOnly' | 'verbose'
	export let clockStyle = 'single';

	const showControls = false;

	const clockStyleOptions = [
		{ key: 'single', componentName: RingTimerSingleLoop },
		// { key: 'double', componentName: RingTimerDoubleLoop }
		// { key: 'countdown', componentName: RingTimerCountdownLoop }
	];

	/**
	 * FIXME: Having to have all the props for all the different UI version here
	 * is really dumb. There must be a better way to compose generic phase timer
	 * logic with a UI component that relies upon it. Just a function?
	 */
	// Single-loop UI specific props
	export let showTicks = false; // Boolean
	export let ringBackgroundHighlight = 'active'; // Options 'active' | 'always'
	// Double-loop UI specific props
	// Countdown UI specific props

	let playing = true;
	let elapsedSeconds = 0;

	setInterval(function () {
		if (playing) {
			elapsedSeconds++;
		}
	}, 1000);

	function handleToggle() {
		playing = !playing;
	}

	const resetTimer = () => {
		elapsedSeconds = 0;
	};
</script>

<div class="ringTimer ringTimer--{widgetLayout}">
	<svelte:component
		this={clockStyleOptions.find((option) => option.key === clockStyle).componentName}
		{elapsedSeconds}
		{offDuration}
		{onDuration}
		{playing}
		{ringBackgroundHighlight}
		{showTicks}
		on:toggle={handleToggle}
	/>

	{#if showControls}
		<div class="controls">
			<nav class="mb1">
				<button on:click={resetTimer}>Restart</button>
			</nav>
			<nav>
				<div class="mb1">
					<label for="time-on">Time on (green)</label>
					<input type="number" bind:value={onDuration} min="1" />
					<span>seconds</span>
				</div>
				<div class="mb1">
					<label for="time-off">Time off (red)</label>
					<input type="number" bind:value={offDuration} min="0" />
					<span>seconds</span>
				</div>
				<!-- <fieldset>
					<legend>Loop style</legend>
					<div>
						<label for="loopstyle-singleloop">Single-loop</label>
						<input
							name="loopstyle"
							type="radio"
							bind:group={loopStyle}
							id="loopstyle-singleloop"
							value="single"
						/>
					</div>
					<div>
						<label for="loopstyle-doubleloop">Double-loop</label>
						<input
							name="loopstyle"
							type="radio"
							bind:group={loopStyle}
							id="loopstyle-doubleloop"
							value="double"
						/>
					</div>
				</fieldset> -->
			</nav>
		</div>
	{/if}
</div>

<style>
	.controls {
		font-size: 14px;
		border: 3px double #8884;
		padding: 1em;
		border-radius: 1em;
		margin-top: 1em;
	}

	label {
		display: block;
	}

	input[type='number'] {
		width: 4em;
	}
</style>
