<script>
	import { page } from '$app/stores';

	const pages = [
		{ path: '/', text: 'Home' }
		// { path: '/cv', text: 'CV' }, // TODO remove this from public nav
		// { path: '/workout', text: 'Workout' },
		// { path: '/blog', text: 'Blog' },
		// { path: '/polygonparade', text: 'polygonparade' },
	];
</script>

<nav>
	{#each pages as navpage}
		<a href={navpage.path} class:currentpage={$page.path === navpage.path}>{navpage.text}</a>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
	}
	a {
		margin: 0.5em 0.5em;
		font-weight: 600;
		text-decoration: none;
		transform: rotate(-6deg);
		display: block;

		&:focus,
		&:hover {
			text-decoration: underline;
		}
	}

	a:focus {
		font-weight: bold;
	}

	.currentpage {
		color: var(--pallette-active);
	}
</style>
