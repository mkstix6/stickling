<script>
	import Highlight from 'svelte-highlight';
	import js from 'svelte-highlight/src/languages/javascript';
	import nightOwl from 'svelte-highlight/src/styles/night-owl';

	export let code = '';
</script>

<svelte:head>
	{@html nightOwl}
</svelte:head>

<Highlight language={js} {code} />
