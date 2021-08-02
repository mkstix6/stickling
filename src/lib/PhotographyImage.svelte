<script>
	export let src;
	export let alt;
</script>

<figure>
	<img loading="lazy" width="400" height="300" {src} {alt} />
	<figcaption>{alt}</figcaption>
</figure>

<style>
	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 4px;
		box-shadow: 0 0 4rem #0004;
	}

	figcaption {
		display: block;
		width: 100%;
		text-align: left;
		font-size: 14px;
		opacity: 0.3;
		transition: opacity 1000ms;
		padding: 0.5em 0;
	}

	figcaption:hover,
	figcaption:focus {
		opacity: 1;
		transition: opacity 200ms;
	}
</style>
