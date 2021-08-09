<script>
	export let link;
	export let thumbnail;
	export let videothumbnail;
	export let tech = [];
	export let title;
	export let codethumbnail;

	import LogoSticker from '$lib/LogoSticker.svelte';
	import MagneticHover from '$lib/MagneticHover.svelte';
</script>

<article>
	<MagneticHover>
		<div class="mediaAngled">
			<a href={link}>
				<div class="card" style={codethumbnail}>
					{#if videothumbnail}
						<video muted autoplay loop playsinline tabindex="-1" src={videothumbnail} loading="lazy"
							>video…</video
						>
					{:else if thumbnail}
						<img src={thumbnail} loading="lazy" alt="" />
					{/if}
					<div class="card__content">
						<h3 class="angletext posttitle">{title}</h3>
					</div>
				</div>
				{#if tech?.length}
					<div class="techList">
						{#each tech as techKey}
							<div class="techList__item">
								<LogoSticker logokey={techKey} />
							</div>
						{/each}
					</div>
				{/if}
			</a>
		</div>
	</MagneticHover>
</article>

<style lang="scss">
	article a {
		text-decoration: none;
		position: relative;
		display: block;

		// 	&::before {
		// 		content: '';
		// 		display: block;
		// 		background: linear-gradient(to top, white, transparent 2rem);
		// 		// background: #bada55;
		// 		// opacity: 0.3;
		// 		width: 100%;
		// 		height: 50%;
		// 		transform: rotate(180deg) skew(80deg, -6deg);
		// 		transform-origin: bottom center;
		// 		position: absolute;
		// 		bottom: 17px;
		// 		// left: 130px;
		// 		right: 0;
		// 		pointer-events: none;
		// 		mix-blend-mode: overlay;
		// 	}

		&:focus {
			outline: none;
			filter: drop-shadow(0 0 2em var(--pallette3));
		}
	}

	.card {
		background: var(--pallette5);
		position: relative;
		// border: 10px solid white;
		height: 100%;
		margin-bottom: -2em;
		padding-top: 2rem;
		padding-bottom: 1.6rem;

		&::after {
			content: '';
			background: linear-gradient(135deg, #0000, #0008);
			position: absolute;
			inset: 0;
			z-index: 1;
			opacity: 1;
			transition: opacity 800ms;
		}
		&:hover,
		&:focus {
			&::after {
				opacity: 0.5;
				transition: opacity 100ms;
			}
		}
		&:active::after {
			opacity: 0.2;
			transition: opacity 5ms;
		}
	}

	.card__content {
		position: relative;
		inset: 0;
		z-index: 2;
		height: 100%;
		display: grid;
		place-items: end start;
		min-height: 8rem;
	}

	.posttitle {
		color: white;
		font-size: 1.2rem;
		max-width: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		font-weight: 600;
		text-shadow: -1px 1px 2px #0005;
	}

	img,
	video {
		position: absolute;
		inset: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.techList {
		position: absolute;
		top: 0.8em;
		right: 0.5em;
		&:empty {
			display: none;
		}
		display: flex;
		align-items: baseline;
		justify-content: flex-start;
		font-size: 1.5em;
		transform: skewY(-6deg);
	}

	.techList__item {
		margin: 0 0.1em;
		display: flex;
		align-items: baseline;
		filter: drop-shadow(-5px 7px 5px #0002);
	}

	// .mediaAngled {
	// 	--imgrotation: 15deg;
	// 	perspective: 1000px;
	// }
	// .mediaAngled > * {
	// 	max-width: 100%;
	// 	width: 100%;
	// 	height: auto;
	// 	display: block;
	// 	transition: transform 600ms;
	// 	transform: rotateY(var(--imgrotation));
	// }

	// .mediaAngled > *:focus,
	// .mediaAngled > *:hover {
	// 	transform: rotateY(calc(var(--imgrotation) / 2));
	// }
</style>
