<script lang="ts">
	import ShapePolygon from '$lib/ShapePolygon.svelte';

	const size = 50;
	let themePreference = undefined;

	function isDarkModeEnabled() {
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	let theme;
	let sunShape;

	$: {
		if (themePreference === undefined) {
			theme = isDarkModeEnabled() ? 'dark' : 'light';
		} else {
			theme = themePreference;
		}
	}

	$: {
		sunShape =
			theme === 'dark'
				? {
						polyStyle: 'fill: white; stroke: #0001; stroke-width:1',
						pointCount: 20,
						chosenShape: 'star',
						innerRadius: 0.7,
						randomness: 0,
					}
				: {
						polyStyle: 'fill: white; stroke: #0001; stroke-width:1',
						pointCount: 20,
						chosenShape: 'star',
						innerRadius: 0.7,
						randomness: 0,
					};
	}

	const switchTheme = () => {
		if (themePreference !== 'dark') {
			themePreference = 'dark';
		} else {
			themePreference = 'light';
		}
	};
</script>

<button class="switch" onclick={switchTheme}>
	<ShapePolygon {...sunShape} {size} />
</button>

<style>
	.switch {
		width: 3em;
		height: 3em;
		padding: 0;
		margin: 0;
	}
</style>
