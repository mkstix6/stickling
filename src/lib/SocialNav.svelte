<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';
	import { socialDetails } from '$lib/sitedata';
</script>

<nav class="socialnav">
	{#each socialDetails as { contactUrl, serviceDisplayCase, service }}
		<!-- prettier-ignore -->
		<a href={contactUrl} title="Mark on {serviceDisplayCase}"><span class="screen-reader-text">{serviceDisplayCase}</span><SocialIcon {service} /></a>
	{/each}
</nav>

<style>
	a:is(:hover, :focus) svg :is(path, rect) {
		fill: var(--pallette-active);
	}

	a {
		display: inline-block;
		margin: 0.4em 0.4em;
		font-size: 1.6rem;
		width: 1em;
		height: 1em;
		text-decoration: none;
	}
</style>
