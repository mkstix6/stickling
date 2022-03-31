<script>
	import { page } from '$app/stores';

	const pages = [
		{ path: '/', text: 'home' },
		{ path: '/posts', text: 'posts' },
		{ path: '/about', text: 'about' },
		{ path: '/cv', text: 'CV' },
		{ path: '/contact', text: 'contact' },
		// { path: '/pallettes', text: 'Pallettes' }
		// { path: '/workout', text: 'Workout' },
		// { path: '/blog', text: 'Blog' },
	];
</script>

<nav>
	{#each pages as navpage}
		<a href={navpage.path} class:currentpage={$page.url.pathname === navpage.path}>{navpage.text}</a
		>
	{/each}
</nav>

<style lang="scss">
	nav {
		display: flex;
	}

	a {
		margin: 0.5em 0.5em;
		font-weight: 500;
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
