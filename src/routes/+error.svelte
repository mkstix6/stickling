<script>
	import { page } from '$app/stores';
</script>

<div class="error-container">
	<h1>{$page.status}: {$page.error.message}</h1>
	{#if $page.status === 404}
		<p style="max-width: min(35ex, 80vw);">We didn't find content for this page URL</p>
	{:else}
		<h1 style="max-width: min(35ex, 80vw);">{$page.error.message}</h1>
	{/if}
</div>

<style>
	.error-container {
		margin: 10vw;
	}
</style>
