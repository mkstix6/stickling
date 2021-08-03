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
		<section class="section px3 py3 overflow-hidden">
			<h2 class="angletext">I've built a lot of user interfaces</h2>
			<p>
				During a decade of digital agency I've planned, coded and maintained digital-experiences
				ranging from small brochure webites to data driven apps.
			</p>
			<Orbiter />
		</section>

		<section class="section px3 slice" style="overflow: hidden;">
			<!-- <h2 class="glassoflogos">Glass of logos 2D physics.</h2> -->
			<h2 class="angletext">The way we build websites has changed a lot over the years…</h2>
			<!-- <h2>Familiar with a range of web development tools and posts, such as…</h2> -->
			<div class="laptopGrid">
				<div>
					<LaptopLogos />
				</div>
				<div class="mytechexperience">
					<p>
						Good <strong>SEO</strong>,
						<strong>code-performance</strong> and <strong>semantic HTML</strong> are foundational to
						the work we do.
					</p>
					<p>
						I'm familiar with <strong>modern frontend frameworks</strong> such as <em>Vue.js</em>,
						<em>Nuxt.js</em>, and <em>SvelteKit</em>.
					</p>
					<p>
						<strong>End-to-end tested</strong> applications with
						<em>Cypress.js</em>.
						<strong>Unit tested</strong> with runners like <em>AVA</em> and <em>Jest</em>. Then
						incorporated them into a continuous delivery process with <em>Bitbucket Pipelines</em>.
					</p>
					<p>
						I've configured
						<strong>tooling technologies</strong>
						like
						<em>TypeScript</em>, <em>Webpack</em>, <em>Rollup</em>, <em>Gulp</em>, <em>npm</em>,
						<em>Docker</em>, <em>Yarn</em>.
					</p>
					<p>
						Enhanced experiences with popular <strong>JS libraries</strong> including <em>GSAP</em>,
						<em>ScrollMagic</em>,
						<em>Three.js</em>, <em>jQuery</em> to supplement vanilla JS and achieve custom behaviour.
					</p>
					<p>
						I've implemented <strong>data driven</strong> frontends calling on
						<em>R.E.S.T APIs</em>. We organise and test their schemas with <em>Postman</em>. I'm
						keen to improve my <em>GraphQL</em> skills.
					</p>
					<p>
						Worked with <strong>PHP technologies</strong> like <em>WordPress</em> (Advanced Custom Fields).
					</p>
					<p>
						Incorporated <strong>CSS tooling</strong> and libraries like <em>Sass</em>,
						<em>Bootstrap</em>
						and
						<em>Zurb Foundation</em>.
					</p>
					<p>
						<strong>Collabotated</strong> using <em>GitHub</em> and <em>Bitbucket</em>.
					</p>
					<p>
						I'm competent with various <strong>design software</strong>: <em>PhotoShop</em>,
						<em>Illustrator</em>,
						<em>Sketch</em>, <em>InVision</em>.
					</p>
					<p>
						Recently I've started dabbling with <strong>3D</strong> using
						<em>Three.js</em> and <em>Blender</em>.
					</p>
					<p>
						I've configured and administered <strong
							>project management and organisational software</strong
						>
						for our teams such as
						<em>Jira</em>, <em>Trello</em> and <em>Slack</em>.
					</p>
				</div>
			</div>
		</section>
	</div>
</main>

<style lang="scss">
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
			// white-space: nowrap;
		}
	}
</style>
