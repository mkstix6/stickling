<script>
	  /** @type {import('./$types').PageData} */

	import '../app.scss';
	import SiteHeader from '$lib/Header.svelte';
	import SiteFooter from '$lib/Footer.svelte';
	// import PageTransitions from '$lib/PageTransitions.svelte';
</script>

<SiteHeader />

<div>
	<!-- <PageTransitions {pagePath}> -->
		<slot />
	<!-- </PageTransitions> -->
</div>

<SiteFooter />
