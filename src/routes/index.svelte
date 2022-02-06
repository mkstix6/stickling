<script lang="ts">
	import BigLogo from '$lib/BigLogo.svelte';
	import LaptopLogos from '$lib/LaptopLogos.svelte';
	import PostGrid from '$lib/PostGrid.svelte';
	import Orbiter from '$lib/Orbiter.svelte';
	import CanvasArt from '$lib/CanvasGenerativeArt01.svelte';
	// import SunFlare from '$lib/SunFlare.svelte';
	// import LogoSticker from '$lib/LogoSticker.svelte';
	import { randomInt } from '$lib/utils';

	let artSeed = randomInt();
</script>

<svelte:head>
	<title>Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<div class="page" style="padding-top: 10vw;">
		<!-- <section class="section section--hero no-background" style="position: relative; z-index: 0;">
			<div class="heroimage">
				<speed-lines />
			</div>
			<div
				class="px3"
				style="pointer-events: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
			>
				<BigLogo />
			</div>
		</section> -->
		<section />

		<section class="px3 indentp" style="position: relative;">
			<div
				style="display: flex; flex-wrap: wrap; justify-content: center;align-items: center; gap: 2rem;"
			>
				<h1 class="angletext" style="flex: 0 1 10em; z-index: 1;">
					I'm
					<strong class="color-active fontsize-double wiggly-text"
						><span class="word"><span>M</span><span>a</span><span>r</span><span>k</span></span><span
							class="word"
							><span>S</span><span>t</span><span>i</span><span>c</span><span>k</span><span>l</span
							><span>i</span><span>n</span><span>g</span></span
						></strong
					><br />
					a <em style="font-style: normal;">front-end web developer</em>
				</h1>

				<div style="flex: 0 1 30em; position: relative; margin: -5em; margin-bottom: 0;">
					<button class="artContainer" on:click={() => (artSeed = randomInt())}>
						{#key artSeed}
							<CanvasArt seed={artSeed} renderSize={2 ** 10} transparent={true} />
						{/key}
					</button>
					<p
						style="line-height:1; margin: 0 auto; opacity: 0.5; text-align: center;position: absolute; bottom: 0; left: 30%; width: 40%;"
					>
						<small>Click this art to generate a new one (seed: {artSeed})</small>
					</p>
				</div>
			</div>
			<!-- <div
				style="display: inline-block;width:50vw; height:30vw; overflow: hidden; position: relative;"
			>
				<SunFlare />
				<span
					style="display: flex; align-items: flex-end; gap: -10%; width: 100%; height: 200px;position: absolute; z-index: 10;left:0;right:0;bottom:0;"
				>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
					<span
						style="flex: 1 1 auto; background: black; width: {Math.random() *
							10}%; height: {Math.random() * 80 + 20}%;"
					/>
				</span>
			</div> -->
		</section>

		<section class="section slice px3 py3">
			<div class="myauto" style="max-width: min-content;">
				<h2 class="angletext">I made these…</h2>
				<p class="leadpara angletext mt0">Explore some things I've created.</p>
				<PostGrid itemcount={6} />
				<a class="megaButton" href="/posts">view all posts &gt;</a>
			</div>
		</section>

		<!-- <section class="px3">
			<h2>Portfolio</h2>
			<ul class="portfolio-list">
				<li>
					<article>
						<h3>Brandirectory</h3>
						<LogoSticker logokey="vue" />
						<LogoSticker logokey="nuxt" />
					</article>
				</li>
				<li>
					<article>
						<h3>Milk & More</h3>
						<LogoSticker logokey="bootstrap" />
						<LogoSticker logokey="sass" />
					</article>
				</li>
				<li>
					<article>
						<h3>8 Northumberland Avenue</h3>
						<ul class="taglist">
							<li>Scroll animations</li>
							<li>Animated SVG</li>
							<li>Canvas</li>
						</ul>
						<LogoSticker logokey="gsap" />
						<LogoSticker logokey="scrollmagic" />

						<p><a>https://www.8northumberland.co.uk/events/conference-venue/</a></p>
					</article>
				</li>
				<li>
					<article><h3>BBC Worldwide</h3></article>
				</li>
			</ul>
		</section> -->

		<aside class="relaxZone">
			<h2 class="h4 my3">That's all, take a moment for yourself…</h2>
			<video loop muted autoplay playsinline tabindex="-1" class="relaxVideo">
				<source src="/video/grassy-green720.webm" type="video/webm" />
				<source src="/video/grassy-green720.mp4" type="video/mp4" />
				<p>
					Your browser doesn't support HTML5 video. Here is a <a href="/video/grassy-green720.mp4"
						>link to the video</a
					> instead.
				</p>
			</video>
			<p>
				<small>
					<a href="https://codepen.io/mkstix6/full/ExvBYVK">JS canvas animation on CodePen</a>
				</small>
			</p>
		</aside>
	</div>
</main>

<style lang="scss">
	section:nth-child(odd) {
		background: var(--card-backgroundcolor);
		// .button {
		// 	background: var(--card-darkerbackgroundcolor);
		// }
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
		transition: background 400ms;
		cursor: pointer;
		animation: rotate 500s infinite;
		animation-timing-function: linear;

		// &:focus,
		// &:hover {
		// 	background: #0002;
		// }
	}

	// .portfolio-list {
	// 	display: grid;
	// 	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	// 	gap: 3rem;
	// 	list-style: none;
	// 	padding-left: 0;

	// 	article {
	// 		padding: 1.5rem;
	// 		border-radius: var(--big-radius);
	// 		border: 1px solid gray;

	// 		a {
	// 			word-break: break-all;
	// 			line-break: auto;
	// 		}
	// 	}
	// }

	// .heroimage {
	// 	position: relative;
	// 	clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
	// 	overflow: hidden;
	// 	width: 100vw;
	// 	height: 50vw;
	// 	&::after {
	// 		content: '';
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		right: 0;
	// 		bottom: 0;
	// 		background: var(--herogradient);
	// 		-webkit-backdrop-filter: grayscale(100%);
	// 		mix-blend-mode: screen;
	// 	}
	// }

	// .section--hero {
	// 	margin-bottom: 5rem;
	// }

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
		// border-radius: 100%;
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
			// position: relative;
			perspective: 200px;

			> span {
				display: inline-block;
				animation: wigglytext 10s infinite;
				animation-timing-function: ease-in-out;
				animation-fill-mode: both;
				// text-shadow: 0.03em 0.03em 0 white;

				@for $i from 0 through 10 {
					&:nth-last-child(#{$i}) {
						animation-delay: 254ms * $i;
					}
				}
			}
		}
	}
</style>
