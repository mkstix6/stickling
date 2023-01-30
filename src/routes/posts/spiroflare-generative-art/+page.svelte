<script lang="ts">
	import { page } from '$app/stores';
	import LogoSticker from '$lib/LogoSticker.svelte';
	import SpiroFlareCanvasArt from '$lib/SpiroFlareCanvasArt.svelte';

	export let data;

	let seedQueryParam = $page?.url?.searchParams?.get('seed');
	let seed = seedQueryParam ? parseInt(seedQueryParam) : Math.floor(Math.random() * 100_000_000);
	let preset = data.preset;

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
