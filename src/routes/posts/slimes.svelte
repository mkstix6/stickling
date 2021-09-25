<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<h1 class="angletext">
	<LogoSticker logokey="blender" />
	Slimes: Blender soft body physics
</h1>

<div class="intro">
	<p>
		Recently I've been enjoying Slime Rancher on the Switch and took inspiration from the endlessly
		funny Slime characters to try some <em>soft body physics</em> and <em>light transmission</em> in
		Blender.
	</p>
	<img src="/posts/slime-rancher.jpg" alt="Slime Rancher game art" class="slimerancherimage" />
</div>

<figure>
	<video
		controls
		loop
		autoplay
		muted
		playsinline
		src="/posts/SlimesRender-2021090102-720p.mp4"
		alt="Fan art 3D render of the slime characters from the game Slime Rancher"
		>Fan art 3D render of the slime characters from the game Slime Rancher</video
	>
	<figcaption>Bouncy slimes</figcaption>
</figure>

<style>
	.intro {
		display: flex;
		align-items: flex-start;
	}
	.slimerancherimage {
		margin: 1em;
		width: 10rem;
		height: auto;
		border-radius: 0.5em;
		border: 1px solid #fff1;
		max-width: 25vw;
	}
</style>
