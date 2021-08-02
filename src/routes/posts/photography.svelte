<script>
	import PhotographyImage from '$lib/PhotographyImage.svelte';
	import { photography } from '$lib/sitedata.js';
</script>

<div class="photogrid">
	{#each photography as { filename, alt }}
		<div class="imgcontainer">
			<PhotographyImage src="/photos/{filename}" {alt} />
		</div>
	{/each}
</div>

<style lang="scss">
	.photogrid {
		display: grid;
		gap: clamp(2vw, 8vw, 5rem);
		padding: clamp(4vw, 8vw, 5rem) 0;
		background: var(--card-backgroundcolor);
		box-shadow: -50vw 0 0 var(--card-backgroundcolor), 50vw 0 0 var(--card-backgroundcolor);
		// border-radius: clamp(1vw, 2vw, 2rem);
		perspective: 1000px;
	}

	.imgcontainer {
		width: 80%;
		margin: 0 auto;
		// border: clamp(1vw, 3vw, 2rem) solid black;
		// box-shadow: 0 -1px 0 #fff1, 0 1px 0 #0001;
		position: relative;
		border-radius: clamp(0.5vw, 1vw, 1rem);

		&:nth-child(odd) {
			left: -10%;
		}
		&:nth-child(even) {
			right: -10%;
		}
	}

	// .imgcontainer {
	// 	--imgrotation: 8deg;
	// 	perspective: 1000px;
	// 	transition: transform 600ms;
	// }
	// .imgcontainer:nth-child(odd) {
	// 	transform: rotateY(var(--imgrotation));
	// }
	// .imgcontainer:nth-child(even) {
	// 	transform: rotateY(calc(-1 * var(--imgrotation)));
	// }
	// .imgcontainer:focus,
	// .imgcontainer:hover {
	// 	transform: rotateY(0deg);
	// }
</style>
