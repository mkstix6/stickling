<script lang="ts">
	import LogoSticker from '$lib/LogoSticker.svelte';
	import FlowerWorksCanvasArt from '$lib/FlowerWorksCanvasArt.svelte';

	export let data;

	const seed = Math.floor(Math.random() * 100_000_000);
</script>

<h1 class="angletext"><LogoSticker logokey="js" /> FlowerWorks code art</h1>

<div class="layout">
	<div class="art">
		<FlowerWorksCanvasArt {seed} />
	</div>
</div>

<style>
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
