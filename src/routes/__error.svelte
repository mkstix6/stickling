<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status,
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
	export let status;
</script>

<div class="error-container">
	{#if status === 404}
		<h1 style="max-width: min(35ex, 80vw);">{status}<br />Sorry, we couldn't find this page</h1>
		<div class="card">
			Error:
			<code><pre>{title}</pre></code>
		</div>
	{:else}
		<h1 style="max-width: min(35ex, 80vw);">{title}</h1>
	{/if}
</div>

<style>
	.error-container {
		margin: 10vw;
	}
</style>
