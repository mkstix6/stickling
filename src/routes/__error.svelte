<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				title: `${status}: ${error.message}`
			}
		};
	}
</script>

<script>
	export let title;
</script>

<div class="error-container">
	<h1 style="max-width: min(35ex, 80vw);">{title}</h1>
</div>

<style>
	.error-container {
		margin: 10vw;
	}
</style>
