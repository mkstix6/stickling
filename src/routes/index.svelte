<script>
	import BigLogo from '$lib/BigLogo.svelte';
	import LaptopLogos from '$lib/LaptopLogos.svelte';
	// import SunFlare from '$lib/SunFlare.svelte';
	// import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<svelte:head>
	<title>Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<div class="page">
		<section class="section no-background" style="position: relative; z-index: 0;">
			<div class="heroimage">
				<speed-lines />
				<!-- <img
					width="400"
					height="100"
					style="width: 100%; height: 50vw; object-fit: cover; "
					src="static/photos/IMG_7929.jpg"
					alt=""
				/> -->
			</div>
			<!-- <div class="card"> -->
			<div
				class="px3"
				style="pointer-events: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
			>
				<BigLogo />
			</div>
			<!-- </div> -->
		</section>

		<section class="px3 indentp">
			<h1 class="angletext">
				I'm
				<span class="color-active fontsize-double">Mark Stickling</span><br />
				a Frontend web developer<br />
				from London
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
			<p>
				Over a decade of digital agency experience I've planned, coded and maintained
				digital-experiences. Ranging from small brochure webites to data driven apps. Good <strong
					>SEO</strong
				>,
				<strong>code-performance</strong> and <strong>semantic HTML</strong> are foundational to the
				work we do.
			</p>
			<h2 class="angletext">Teamwork</h2>
			<p>
				I've lead teams of developers to provide customer friendly solutions.
				<em>Supporting staff</em> is a highlight of my day. It's fun and important to help others progress
				as it is to learn something new myself.
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
		</section>

		<!-- <section class="px3">
			ORBITER OF FAVICONS
			<ul class="orbiter">
				<li><img width="16" height="16" src="/project-favicons/project-favicon-01.jpg" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-02.jpeg" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-03.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-04.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-05.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-06.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-07.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-08.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-09.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-10.png" /></li>
				<li><img width="16" height="16" src="/project-favicons/project-favicon-11.png" /></li>
			</ul>
		</section> -->

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

		<section class="section px3 slice" style="overflow: hidden;">
			<!-- <h2 class="glassoflogos">Glass of logos 2D physics.</h2> -->
			<h2 class="angletext">The way we build websites has changed a lot over the years…</h2>
			<!-- <h2>Familiar with a range of web development tools and projects, such as…</h2> -->
			<div class="laptopGrid">
				<div>
					<LaptopLogos />
				</div>
				<div class="mytechexperience">
					<p class="card">
						I'm familiar with <strong>modern frontend frameworks</strong> such as <em>Vue.js</em>,
						<em>Nuxt.js</em>, and <em>SvelteKit</em> and configured
						<strong>supporting technologies</strong>
						like
						<em>TypeScript</em>, <em>Webpack</em>, <em>Rollup</em>, <em>Gulp</em>,
						<em>Node</em>, <em>npm</em>, <em>Docker</em>, <em>Yarn</em>, and most recently
						<em>SnowPack</em>.
					</p>
					<p class="card">
						Enhanced experiences with popular <strong>JS libraries</strong> including <em>GSAP</em>,
						<em>ScrollMagic</em>,
						<em>Three.js</em>, <em>jQuery</em> to supplement using vanilla JS to achieve custom behaviour.
					</p>
					<p class="card">
						I've implemented <strong>data driven</strong> frontends calling on
						<em>R.E.S.T APIs</em>. We organise and test their schemas with <em>Postman</em>. I'm
						keen to improve my <em>GraphQL</em> skills.
					</p>
					<p class="card">
						Worked with <strong>PHP technologies</strong> like <em>WordPress</em> (Advanced Custom
						Fields) and
						<em>Laravel</em>.
					</p>
					<p class="card">
						Incorporated <strong>CSS tooling</strong> and libraries like <em>Sass</em>,
						<em>Bootstrap</em>
						and
						<em>Zurb Foundation</em>.
					</p>
					<p class="card">
						<strong>Collabotated</strong> using <em>GitHub</em> and <em>Bitbucket</em>.
					</p>
					<p class="card">
						I'm competent with various <strong>design software</strong>: <em>PhotoShop</em>,
						<em>Illustrator</em>,
						<em>Sketch</em>, <em>InVision</em>.
					</p>
					<p class="card">
						<strong>End-to-end tested</strong> applications with
						<em>Cypress.js</em>.
						<strong>Unit tested</strong> with runners like <em>Jest</em> and <em>AVA</em>. Then
						incorporated them into a continuous delivery process with <em>Bitbucket Pipelines</em>
					</p>
					<p class="card">
						Recently I've started dabbling with <strong>3D</strong> using
						<em>Three.js</em> and <em>Blender</em>.
					</p>
					<p class="card">
						I've configured and administered <strong
							>project management and organisational software</strong
						>
						for our teams such as
						<em>Jira</em>, <em>Trello</em> and <em>Slack</em>.
					</p>
				</div>
			</div>
		</section>

		<section class="section px3">
			<h2 class="angletext">📣 Shoutouts and thanks 🙏</h2>
			<ul class="thankslist">
				<li class="card">
					Recently I've been enjoying the <a href="https://cassidoo.co/newsletter/"
						>Rendezvous with Cassidoo</a
					>
					newsletter by <a href="https://twitter.com/cassidoo">@cassidoo</a>. The weekly code
					challenge is especially good to participate in.
				</li>
				<li class="card">
					The GSAP forum has been very helpful answering my questions about keyframing many items.
				</li>
			</ul>
		</section>
	</div>
</main>

<style lang="scss">
	section:nth-child(odd) {
		background: var(--card-backgroundcolor);
	}

	@media screen and (min-width: 1000px) {
		.laptopGrid {
			display: flex;
			// flex-wrap: wrap;
			gap: 5rem;
			> div {
				position: relative;
				flex: 1 1 250px;
				order: 2;
			}
			> div + div {
				flex: 1 0 30ex;
				position: relative;
				order: 1;
			}
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

	.mytechexperience {
		p {
			background: var(--pallette5);
			border-radius: 0.3em;
			padding: 0.7em 1em;
		}
		em {
			display: inline-block;
			background: var(--pallettemax);
			padding: 0 0.1em;
			font-style: normal;
			border-radius: 0.3em;
			transform: skewX(-10deg);
			// color: var(--pallette5);
			white-space: nowrap;
		}

		strong {
			// font-weight: inherit;
			// color: var(--pallette2);
			white-space: nowrap;
		}
	}
</style>
