<script>
	import PixelSandMixer from '$lib/PixelSandMixer.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
</script>

<h1 class="angletext">Pixel Sand Mixer</h1>
<p>
	I spent some time exploring the Canvas API and ended up with a little toy that simply takes some
	pixels and lets you mix them up.
</p>

<figure>
	<PixelSandMixer />
	<caption
		>Use arrow keys or your device's accelerometer to rotate the drum and grivity will do the rest.</caption
	>
</figure>

<SocialLink href="https://codepen.io/mkstix6/pen/eYWgXwJ" service="codepen"
	>This toy is also visible on CodePen.</SocialLink
>
