<script>
	import { Highlight } from 'svelte-highlight';
	import css from 'svelte-highlight/languages/css';
	import nightOwl from 'svelte-highlight/styles/night-owl';

	export let code = '';
</script>

<svelte:head>
	{@html nightOwl}
</svelte:head>

<Highlight language={css} {code} />
