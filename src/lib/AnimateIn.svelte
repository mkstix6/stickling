<script lang="ts">
	import { onMount } from 'svelte';

	export let from = 'transform: translateX(5px) translateY(10px); opacity: 0;';
	export let to = 'transform: translateX(0) translateY(0); opacity: 1;';
	export let duration = 500;

	let element;
	let observeTarget;
	let wasObserved = false;

	const triggerAnimation = (entries, observer) => {
		const element = entries[0];

		if (!element.isIntersecting) {
			// do nothing
		} else {
			// Only animate once.
			observer.unobserve(observeTarget);
			wasObserved = true;
		}
	};

	onMount(() => {
		observeTarget = element;
		// Grab the prefers reduced media query.
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		// Check if the media query matches or is not available.
		if (!mediaQuery || mediaQuery.matches) {
			// No animation
		} else {
			const observer = new IntersectionObserver(triggerAnimation, {
				root: null,
				rootMargin: '0px',
				threshold: 0.4,
			});
			observer.observe(observeTarget);
		}

		// TODO return unobserve code here so observer is removed when component is destroyed (e.g. between page navigations)
	});
</script>

<div class="perspective">
	<div
		class:unobserved={!wasObserved}
		class:observed={wasObserved}
		style="{wasObserved ? to : from}; transition: opacity {duration}ms, transform {duration}ms;"
		bind:this={element}
	>
		<slot />
	</div>
</div>

<style>
	.perspective {
		perspective: 1000px;
	}
</style>
