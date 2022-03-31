<script lang="ts">
	import PostGrid from '$lib/PostGrid.svelte';
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
	import { randomInt } from '$lib/utils';

	let artSeed = randomInt();
</script>

<svelte:head>
	<title>Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<div class="page" style="padding-top: 10vw;">
		<section class="px3 indentp" style="position: relative;">
			<div
				style="display: flex; flex-wrap: wrap; justify-content: center;align-items: center; gap: 2rem;"
			>
				<h1 class="angletext" style="flex: 0 1 10em; z-index: 1;">
					<span class="word worddelay-1">I'm</span>
					<strong class="fontsize-double wiggly-text"
						><span class="word worddelay-2 color-active"
							><span>M</span><span>a</span><span>r</span><span>k</span></span
						><span class="word worddelay-3 color-active"
							><span>S</span><span>t</span><span>i</span><span>c</span><span>k</span><span>l</span
							><span>i</span><span>n</span><span>g</span></span
						></strong
					><br />
					<span class="word worddelay-4">a</span>
					<em style="font-style: normal;"
						><span class="word worddelay-5">front</span><span class="word worddelay-6">-end</span>
						<span class="word worddelay-7">web</span>
						<span class="word worddelay-8">developer</span></em
					>
				</h1>

				<div
					class="artTransitionIn"
					style="flex: 0 1 30em; position: relative; margin: -5em; margin-bottom: 0;"
				>
					<button class="artContainer" on:click={() => (artSeed = randomInt())}>
						{#key artSeed}
							<CanvasArt seed={artSeed} renderSize={2 ** 10} transparent={true} />
						{/key}
					</button>
					<p
						style="line-height:1; margin: 0 auto; opacity: 0.5; text-align: center;position: absolute; bottom: 0; left: 30%; width: 40%;"
					>
						<small>Click this art to generate a new one<br />(seed: {artSeed})</small>
					</p>
				</div>
			</div>
		</section>

		<section class="section px3">
			<div class="myauto" style="max-width: min-content;">
				<h2 class="angletext">I made these…</h2>
				<p class="leadpara angletext mt0">Explore some things I've created.</p>
				<PostGrid itemcount={6} />
				<a class="megaButton" href="/posts">view all posts &gt;</a>
			</div>
		</section>

		<aside class="relaxZone">
			<h2 class="h4 my3">That's all for now. Take a moment for yourself…</h2>
			<video loop muted autoplay playsinline tabindex="-1" class="relaxVideo">
				<source src="/video/grassy-green720.webm" type="video/webm" />
				<source src="/video/grassy-green720.mp4" type="video/mp4" />
				<p>
					Your browser doesn't support HTML5 video. Here is a <a href="/video/grassy-green720.mp4"
						>link to the video</a
					> instead.
				</p>
			</video>
			<div class="my1">
				<SocialLink href="https://codepen.io/mkstix6/full/ExvBYVK" service="codepen"
					>JS canvas animation on CodePen</SocialLink
				>
			</div>
		</aside>
	</div>
</main>

<style lang="scss">
	section:nth-child(even) {
		background: var(--card-backgroundcolor);
		clip-path: polygon(0 10vw, 100% 0, 100% calc(100% - 10vw), 0 100%);
		padding-top: 15vw;
		padding-bottom: 15vw;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.artContainer {
		z-index: 0;
		width: 100%;
		height: auto;
		border: none;
		background: #0000;
		border-radius: 100%;
		margin: 0;
		padding: 0;
		transition: background 400ms, filter 200ms;
		cursor: pointer;
		animation: rotate 500s infinite;
		animation-timing-function: linear;

		&:focus,
		&:hover {
			filter: brightness(1.1);
		}
	}

	.relaxZone {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: 90vw;
		margin: 0 auto;

		h2 {
			text-align: center;
		}
	}

	.relaxVideo {
		width: 62vmin;
		height: 62vmin;
		box-shadow: 0 1em 5em 10em #0005;
		clip-path: polygon(
			50% 0%,
			93.30127019% 25%,
			93.30127019% 75%,
			50% 100%,
			6.698729811% 75%,
			6.698729811% 25%
		);
	}

	@keyframes wigglytext {
		0% {
			transform: rotateY(10deg) skewX(10deg);
		}
		50% {
			transform: rotateY(-10deg) skewX(-10deg);
		}
		100% {
			transform: rotateY(10deg) skewX(10deg);
		}
	}

	.wiggly-text {
		span.word {
			display: inline-block;
			perspective: 200px;

			> span {
				display: inline-block;
				// animation: wigglytext 10s infinite;
				animation-timing-function: ease-in-out;
				animation-fill-mode: both;

				@media (prefers-reduced-motion: reduce) {
					animation: none;
				}

				@for $i from 0 through 10 {
					&:nth-last-child(#{$i}) {
						animation-delay: 254ms * $i;
					}
				}
			}
		}
	}

	@keyframes inup {
		0% {
			opacity: 0;
			transform: translateY(0.5em);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.word {
		display: inline-block;
		color: var(--pallette2);
		animation: 0.4s 1 inup;
		animation-fill-mode: backwards;
		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}
	.worddelay-1 {
		animation-delay: 0ms;
	}
	.worddelay-2 {
		animation-delay: 200ms;
	}
	.worddelay-3 {
		animation-delay: 400ms;
	}
	.worddelay-4 {
		animation-delay: 800ms;
	}
	.worddelay-5 {
		animation-delay: 900ms;
	}
	.worddelay-6 {
		animation-delay: 950ms;
	}
	.worddelay-7 {
		animation-delay: 1200ms;
	}
	.worddelay-8 {
		animation-delay: 1400ms;
	}

	.artTransitionIn {
		animation: 2s 1 inup;
		animation-fill-mode: backwards;
		animation-delay: 1500ms;
		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}
</style>
