<script>
	import LogoSticker from '$lib/LogoSticker.svelte';

	export let url;
	export let title;
	export let domain;
	export let tech = [];

	let techChoice = tech[0];
</script>

<a href={url}>
	<span>{title}</span>
	<span>
		<code>{domain}</code>
		{#if techChoice}
			<LogoSticker logokey={tech[0]} />
		{/if}
	</span>
</a>

<style>
	a {
		text-decoration: none;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		padding: 0.5em 0;
		border-bottom: 1px solid var(--card-backgroundcolor);
	}

	a:focus,
	a:hover {
		background-color: var(--card-backgroundcolor);
		box-shadow: -1em 0 0 var(--card-backgroundcolor), 1em 0 0 var(--card-backgroundcolor),
			-1em -1px 0 var(--card-backgroundcolor), 1em -1px 0 var(--card-backgroundcolor);
	}

	code {
		text-align: right;
		margin-left: 2rem;
		margin-right: 0.5em;
	}

	span:last-child {
		white-space: nowrap;
	}

	@media screen and (max-width: 500px) {
		span {
			display: block;
		}
		code {
			text-align: inherit;
		}
	}
</style>
