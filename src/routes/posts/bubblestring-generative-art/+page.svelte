<script lang="ts">
	const artName = 'BubbleString';
	const today = new Date();
	let seed = $state(1);
	const seedMode = 'basicnumber';
	import LogoSticker from '$lib/LogoSticker.svelte';
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';
	const renderSize = 2 ** 11;
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
		{artName} ({seed})
	</h2>

	<div class="art">
		{#key seed}
			<CanvasArt {seed} {renderSize} download={true} />
			<small style="float: right;">seed: <strong>{seed}</strong></small>
		{/key}
	</div>
	<div class="datebuttons">
		<button onclick={() => (seed -= 1)}>←</button>
		<div>
			choose another seed <input type="number" bind:value={seed} onchange={() => seed} />
		</div>
		<button onclick={() => (seed += 1)}>→</button>
	</div>

	<p>
		Much of the insight, theory and technique I used for creating this came from reading the
		wonderfully helpful <a href="https://tylerxhobbs.com/essays">essays by Tyler Hobbs</a>. If
		you're interested in computer generated art his work is top-notch-inspiring and he has
		generously written about his process.
	</p>
</div>

<style>
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
