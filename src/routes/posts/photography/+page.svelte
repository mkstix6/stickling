<script lang="ts">
	import PhotographyImage from '$lib/PhotographyImage.svelte';
	import AnimateIn from '$lib/AnimateIn.svelte';
	import { photography as photoData } from '$lib/sitedata';
</script>

<h1 class="angletext">Photography</h1>
<p>Some of the photos I've taken over the years I'm most pleased with.</p>

<div class="photogrid">
	{#each photoData as { filename, alt }}
		<div class="imgcontainer">
			<AnimateIn
				from="transform: translateX(5px) translateY(50px) rotateY(20deg); opacity: 0;"
				to="transform: translateX(0) translateY(0) rotateY(0deg); opacity: 1;"
			>
				<PhotographyImage src="/photos/{filename}" {alt} />
			</AnimateIn>
		</div>
	{/each}
</div>

<style>
	.photogrid {
		display: grid;
		gap: clamp(2vw, 8vw, 5rem);
		padding: clamp(4vw, 8vw, 5rem) 0;
		background: var(--card-backgroundcolor);
		box-shadow:
			-50vw 0 0 var(--card-backgroundcolor),
			50vw 0 0 var(--card-backgroundcolor);
		perspective: 1000px;
	}

	.imgcontainer {
		margin: 0 auto;
		position: relative;
		border-radius: clamp(0.5vw, 1vw, 1rem);

		@media screen and (min-width: 600px) {
			width: 80%;
			&:nth-child(odd) {
				left: -10%;
			}
			&:nth-child(even) {
				right: -10%;
			}
		}
	}
</style>
