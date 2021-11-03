<script lang="ts">
	import LogoSticker from '$lib/LogoSticker.svelte';
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';

	const artName = 'BubbleString';
	const today = new Date();

	const rendersize = 2 ** 11;

	let currentDate = today;
	let inputChosenDate = jsDateToInputString(currentDate);

	$: chosenDateSeed = jsDateToSeed(currentDate);

	if (typeof String.prototype.replaceAll == 'undefined') {
		String.prototype.replaceAll = function (match, replace) {
			return this.replace(new RegExp(match, 'g'), () => replace);
		};
	}

	function jsDateToSeed(date): number {
		return Math.floor(
			`${date.toISOString()}`
				.replaceAll('-', '')
				.replaceAll('T', '')
				.replaceAll(':', '')
				.slice(0, 8)
		);
	}

	function jsDateToInputString(jsDate) {
		return `${jsDate.toISOString()}`.replaceAll('T', '').replaceAll(':', '').slice(0, 10);
	}

	function inputDateToSeed(dateString: string): number {
		if (dateString) {
			return Math.floor(`${dateString}`.replaceAll('-', ''));
		}
	}

	function moveDate(moveAmount) {
		let d = new Date(currentDate);
		currentDate = new Date(d.setDate(d.getDate() + moveAmount));
		inputChosenDate = jsDateToInputString(currentDate);
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
		🗓
		{#if chosenDateSeed === jsDateToSeed(today)}
			Today's {artName}
		{:else}
			{artName} for {chosenDateSeed.toString().slice(6, 8)}/{chosenDateSeed
				.toString()
				.slice(4, 6)}/{chosenDateSeed.toString().slice(0, 4)}
		{/if}
	</h2>

	<div class="art">
		{#key chosenDateSeed}
			<CanvasArt seed={chosenDateSeed} {rendersize} download={true} />
			<small style="float: right;">seed: <strong>{chosenDateSeed}</strong></small>
		{/key}
	</div>
	<div class="datebuttons">
		<button on:click={() => moveDate(-1)}>←</button>
		<div>
			pick another day <input
				type="date"
				bind:value={inputChosenDate}
				on:change={() => (currentDate = new Date(inputChosenDate))}
			/>
		</div>
		<button on:click={() => moveDate(1)}>→</button>
	</div>

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
			width: 90vh;
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
