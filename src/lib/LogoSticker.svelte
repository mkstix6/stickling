<script lang="ts">
	import { developmentLogos } from '$lib/sitedata';

	export let logokey;
	export let width = 'auto';
	export let height = '1em';

	const logoData = developmentLogos.find((item) => logokey === item.key);
	const logoImageURL = `/logos/stickers/${logoData?.image}`;
	const logoImageALT = `${logoData?.name}`;
</script>

{#if logoData}
	<img
		class="logo"
		src={logoImageURL}
		alt={logoImageALT}
		title={logoData?.name}
		width="18"
		height="18"
		style="width: {width}; height: {height};"
	/>
{/if}

<style>
	.logo {
		height: 1em;
		width: auto;
		display: inline-block;
	}
</style>
