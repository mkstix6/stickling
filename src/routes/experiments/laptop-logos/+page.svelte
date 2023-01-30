<script>
	import LaptopLogos from '$lib/LaptopLogos.svelte';
</script>

<svelte:head>
	<title>GSAP flying laptop logos | Experiments | Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<figure>
		<LaptopLogos />
		<figcaption>Each logo should fly in from the front then subtly snap into place.</figcaption>
	</figure>
</main>

<style>
	#main {
		padding: 3rem 0;
		max-width: 70ex;
		width: 70vw;
		margin: 0 auto;
	}

	figcaption {
		display: block;
		width: 100%;
		text-align: left;
		padding: 0.5em 1em;
		border-radius: 1em;
		background: var(--card-backgroundcolor);
	}
</style>
