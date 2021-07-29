<script>
	import { developmentLogos } from '$lib/sitedata.js';

	export let logokey;

	const logoData = developmentLogos.find((item) => logokey === item.key);
	const logoImageURL = `/static/logos/stickers/${logoData.image}`;
	const logoImageALT = `${logoData.name}`;
</script>

<img class="logo" src={logoImageURL} alt={logoImageALT} title={logoData.name} />

<style>
	.logo {
		height: 1em;
		width: auto;
		display: inline-block;
	}
</style>
