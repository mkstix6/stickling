<script context="module">
	export const load = async ({ page }) => ({
		props: {
			pagePath: page.path,
		},
	});
</script>

<script>
	import '../app.scss';
	import SiteHeader from '$lib/Header.svelte';
	import SiteFooter from '$lib/Footer.svelte';
	import PageTransitions from '$lib/PageTransitions.svelte';

	export let pagePath;
</script>

<SiteHeader />

<PageTransitions {pagePath}>
	<slot />
</PageTransitions>

<SiteFooter />
