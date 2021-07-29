<script>
	import '../app.scss';
	import SiteHeader from '$lib/Header.svelte';
	import SiteFooter from '$lib/Footer.svelte';
</script>

<SiteHeader />

<slot />

<SiteFooter />
