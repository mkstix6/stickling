<script>
	import { fly } from 'svelte/transition';

	export let pagePath;
</script>

{#key pagePath}
	<div in:fly={{ x: 5, duration: 400, delay: 350 }} out:fly={{ x: -5, duration: 400 }}>
		<slot />
	</div>
{/key}
