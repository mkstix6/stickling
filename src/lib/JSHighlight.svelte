<script>
	import { Highlight } from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';
	import nightOwl from 'svelte-highlight/styles/night-owl';

	export let code = '';
</script>

<svelte:head>
	{@html nightOwl}
</svelte:head>

<Highlight language={javascript} {code} />
