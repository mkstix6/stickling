<script>
	import BigLogo from '$lib/BigLogo.svelte';
	import LaptopLogos from '$lib/LaptopLogos.svelte';
	import PostGrid from '$lib/PostGrid.svelte';
	import Orbiter from '$lib/Orbiter.svelte';
	// import SunFlare from '$lib/SunFlare.svelte';
	// import LogoSticker from '$lib/LogoSticker.svelte';
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

		<section class="px3 indentp">
			<h1 class="angletext">
				I'm
				<strong class="color-active fontsize-double" style="font-weight: 900;"
					>Mark Stickling</strong
				><br />
				a <em style="color: white; font-style: normal;">Frontend web developer</em>
			</h1>

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
			<h2 class="angletext">I made these…</h2>
			<p class="angletext">Explore some things I've coded.</p>
			<PostGrid itemcount={6} />
			<a class="megaButton" href="/posts">view all Posts &gt;</a>
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

		<!-- <section class="section slice px3 py3 indentp">
			<h2 class="angletext">Teamwork is essential</h2>
			<p>
				I've lead teams of developers to provide customer friendly solutions.
				<em>Supporting coworkers</em> is a highlight of my day. It's as fun and important to help others
				progress, as to be taught something new myself.
			</p>
			<h2 class="angletext">Inclusivity on the web</h2>
			<p>
				Creating websites that are
				<strong
					><a href="https://www.w3.org/WAI/fundamentals/accessibility-intro/"
						><abbr title="Accessibility">accessible</abbr></a
					>
				</strong>
				and inclusive is of utmost importance.
			</p>
			<p>
				I strive to meet
				<em><a href="https://www.w3.org/TR/WCAG21/" style="white-space: nowrap;">WCAG2.1</a></em>
				standards for the projects I work on and advocate for its recommendations.
			</p>
			<p><strong><a href="https://twitter.com/hashtag/a11y?src=hashtag_click">#a11y</a></strong></p>
		</section> -->
	</div>
</main>

<style lang="scss">
	h1 {
		width: 100%;
	}
	section:nth-child(odd) {
		background: var(--card-backgroundcolor);
		.button {
			background: var(--card-darkerbackgroundcolor);
		}
	}

	.portfolio-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 3rem;
		list-style: none;
		padding-left: 0;
		> li {
		}
		article {
			padding: 1.5rem;
			border-radius: var(--big-radius);
			border: 1px solid gray;

			a {
				word-break: break-all;
				line-break: auto;
			}
		}
	}

	.heroimage {
		position: relative;
		clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
		overflow: hidden;
		width: 100vw;
		height: 50vw;
		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: var(--herogradient);
			-webkit-backdrop-filter: grayscale(100%);
			mix-blend-mode: screen;
		}
	}

	.thankslist {
		list-style: none;
		display: grid;
		// grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-auto-flow: dense;
		gap: 1rem 2rem;
	}

	.section--hero {
		margin-bottom: 5rem;
	}
</style>
