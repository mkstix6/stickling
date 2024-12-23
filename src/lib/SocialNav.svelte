<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';
	import { socialDetails } from '$lib/sitedata';

	export let selection = undefined;

	let iconList = socialDetails;
	if (selection !== undefined) {
		iconList = socialDetails.filter(({ kind }) => kind === 'contactInfo');
	}
</script>

<nav class="socialnav">
	{#each iconList as { contactUrl, serviceDisplayCase, service }}
		<!-- prettier-ignore -->
		<a href={contactUrl} title="Mark on {serviceDisplayCase}"><span class="screen-reader-text">{serviceDisplayCase}</span><SocialIcon {service} /></a>
	{/each}
</nav>

<style>
	a {
		display: inline-block;
		margin: 0.4em 0.4em;
		font-size: 1.3rem;
		width: 1em;
		height: 1em;
		text-decoration: none;
	}
</style>
