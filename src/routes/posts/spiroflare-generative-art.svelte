<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ url: { searchParams } }) {
		let props = {
			seed: Math.ceil(Math.random() * 100),
			preset: 2,
		};
		if (searchParams.has('seed')) {
			props.seed = parseInt(searchParams.get('seed'));
		}
		if (searchParams.has('preset')) {
			props.preset = parseInt(searchParams.get('preset'));
		}
		return { props };
	}
</script>

<script lang="ts">
	import LogoSticker from '$lib/LogoSticker.svelte';
	import SpiroFlareCanvasArt from '$lib/SpiroFlareCanvasArt.svelte';

	export let seed;
	export let preset;

	const artName = 'SpiroFlare';
</script>

<h1 class="angletext"><LogoSticker logokey="js" /> {artName} generative art</h1>
<div class="layout">
	<p>
		Whilst tinkering trying to emulate <a href="https://twitter.com/beesandbombs">@beesandbombs'</a>
		<a href="https://twitter.com/beesandbombs/status/1422689746455834632"
			>chromatic motion blur effect</a
		>
		I ended up with a fun general code-art algorithm that I'm calling {artName}
		<small>(for now)</small>.
	</p>
	<p>
		It has a number of settings and mostly it produces random mush but if you get the setting
		<em>just right</em> you can get some lovely repeatable results.
	</p>
	<div class="art">
		<SpiroFlareCanvasArt {seed} {preset} controls={true} />
	</div>
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
			width: 75vh;
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
</style>
