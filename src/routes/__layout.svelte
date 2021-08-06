<script context="module">
	export const load = async ({ page }) => ({
		props: {
			key: page.path,
		},
	});
</script>

<script>
	import '../app.scss';
	import SiteHeader from '$lib/Header.svelte';
	import SiteFooter from '$lib/Footer.svelte';
	import { fly } from 'svelte/transition';

	export let key;
</script>

<SiteHeader />

{#key key}
	<div in:fly={{ x: 5, duration: 400, delay: 350 }} out:fly={{ x: -5, duration: 400 }}>
		<slot />
	</div>
{/key}

<SiteFooter />
