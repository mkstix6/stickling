<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	let seedQueryParam = $page?.url?.searchParams?.get('seed');
	let seed = parseInt(seedQueryParam);

	const artName = 'BubbleString';
	const today = new Date();
	let renderedSeed: number;
	let inputSeed: number;
	let currentDate = today;
	let seedMode = 'dateday';

	if (seed) {
		seedMode = 'basicnumber';
		renderedSeed = seed;
		inputSeed = seed;
	} else {
		renderedSeed = jsDateToSeed(currentDate);
	}

	import LogoSticker from '$lib/LogoSticker.svelte';
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';

	const renderSize = 2 ** 11;

	let inputChosenDate = jsDateToInputString(currentDate);

	if (typeof String.prototype.replaceAll == 'undefined') {
		String.prototype.replaceAll = function (match, replace) {
			return this.replace(new RegExp(match, 'g'), () => replace);
		};
	}

	function jsDateToSeed(date: Date): number {
		return Math.floor(
			parseInt(
				`${date.toISOString()}`
					.replaceAll('-', '')
					.replaceAll('T', '')
					.replaceAll(':', '')
					.slice(0, 8),
				10
			)
		);
	}

	function jsDateToInputString(jsDate: Date) {
		return `${jsDate.toISOString()}`.replaceAll('T', '').replaceAll(':', '').slice(0, 10);
	}

	function inputDateToSeed(dateString: string): number {
		if (dateString) {
			return Math.floor(parseInt(`${dateString}`.replaceAll('-', '')));
		}
		throw new Error('Unhandled date value');
	}

	function moveDate(moveAmount: number) {
		let d = new Date(currentDate);
		currentDate = new Date(d.setDate(d.getDate() + moveAmount));
		inputChosenDate = jsDateToInputString(currentDate);
		renderedSeed = inputDateToSeed(inputChosenDate);
		seed = inputDateToSeed(inputChosenDate);
	}

	function changeSeed(newSeed: string) {
		inputSeed = parseInt(newSeed);
		renderedSeed = inputSeed;
		seed = inputSeed;
		goto(`bubblestring-generative-art?seed=${seed}`, { noscroll: true });
	}
</script>

<h1 class="angletext"><LogoSticker logokey="js" /> {artName} generative art</h1>
<div class="layout">
	<p>
		This is my first JS canvas procedural art project. Although I feel I could work on it more I
		remember "prefect is the enemy of done". If I change anything further it will be to fix
		obviously broken things.
	</p>
	<p>
		The algorithm takes any seed-integer and produces an pseudo random artwork. I can't say for sure
		the artworks will never repeat but there are probably billions if not trillions of variations.
		Below I'm taking each day's date and using that as the seed value. <em
			>Come back each day to see a new canvas</em
		>, or flick through using the controls.
	</p>

	<h2 style="text-align: center;">
		{#if seedMode === 'dateday'}
			🗓
			{#if renderedSeed === jsDateToSeed(today)}
				Today's {artName}
			{:else}
				{artName} for {renderedSeed.toString().slice(6, 8)}/{renderedSeed
					.toString()
					.slice(4, 6)}/{renderedSeed.toString().slice(0, 4)}
			{/if}
		{:else}
			{artName}: {seed}
		{/if}
	</h2>

	<div class="art">
		{#key renderedSeed}
			<CanvasArt seed={renderedSeed} {renderSize} download={true} />
			<small style="float: right;">seed: <strong>{renderedSeed}</strong></small>
		{/key}
	</div>
	{#if seedMode === 'dateday'}
		<div class="datebuttons">
			<button onclick={() => moveDate(-1)} onkeypress={() => moveDate(-1)}>←</button>
			<div>
				pick another day <input
					type="date"
					bind:value={inputChosenDate}
					onchange={() => {
						currentDate = new Date(inputChosenDate);
						seed = inputDateToSeed(inputChosenDate);
						renderedSeed = inputDateToSeed(inputChosenDate);
					}}
				/>
			</div>
			<button onclick={() => moveDate(1)}>→</button>
		</div>
	{:else}
		<div class="datebuttons">
			<button onclick={() => changeSeed(parseInt(seed) - 1)}>←</button>
			<div>
				choose another seed <input
					type="number"
					bind:value={inputSeed}
					onchange={() => changeSeed(parseInt(inputSeed))}
				/>
			</div>
			<button onclick={() => changeSeed(parseInt(seed) + 1)}>→</button>
		</div>
	{/if}

	<p>
		Much of the insight, theory and technique I used for creating this came from reading the
		wonderfully helpful <a href="https://tylerxhobbs.com/essays">essays by Tyler Hobbs</a>. If
		you're interested in computer generated art his work is top-notch-inspiring and he has
		generously written about his process.
	</p>
</div>

<style lang="scss">
	h2 {
		margin-bottom: 0.5em;
	}
	.layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.art {
		margin: 0 auto;

		@media screen and (orientation: landscape) {
			width: 80vh;
			height: auto;
		}
		@media screen and (orientation: portrait) {
			width: 60vw;
			height: auto;
		}
		@media screen and (orientation: portrait) and (max-width: 600px) {
			width: 100%;
		}
	}

	.datebuttons {
		margin: 0.5em auto;
		width: 60vh;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff2;
		padding: 0;
		border-radius: 0.5rem;

		button {
			background: #fff2;
			border: none;
			color: white;
			font-size: 1.2em;
			margin: 0;
			cursor: pointer;

			&:focus,
			&:hover {
				background: white;
				color: black;
			}

			&:active {
				background: black;
				color: white;
			}
		}

		button:first-child {
			border-radius: 0.5rem 0 0 0.5rem;
		}
		button:last-child {
			border-radius: 0 0.5rem 0.5rem 0;
		}
	}
</style>
