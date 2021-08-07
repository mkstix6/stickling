<script>
	import LaptopLogos from '$lib/LaptopLogos.svelte';
	import Orbiter from '$lib/Orbiter.svelte';
	import LogoSticker from '$lib/LogoSticker.svelte';
	import AnimateIn from '$lib/AnimateIn.svelte';
</script>

<svelte:head>
	<title>About Mark | Stickling.co.uk</title>
</svelte:head>

<main id="main">
	<div class="page" style="padding-top: 10vw;">
		<section class="section px3">
			<h1 class="angletext">About me…</h1>
			<p>Hey 👋, so, I'm a frontend web developer based in London U.K.</p>
		</section>

		<section class="section px3">
			<h2 class="angletext">I've built a lot of user interfaces</h2>
			<p>
				During a decade of digital agency I've planned, coded and maintained digital-experiences
				ranging from small brochure webites to data driven apps.
			</p>
			<AnimateIn duration={1000}>
				<Orbiter />
			</AnimateIn>
		</section>

		<section class="section px3 py3 indentp">
			<h2 class="angletext">Some things I believe…</h2>
			<p>
				<strong>Semantic HTML</strong> and good website
				<strong>performance</strong> are foundational to the work we do. It's a happy bonus these
				support <strong>SEO</strong>.
			</p>
			<h3>Inclusivity on the web</h3>
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
			<h3>Teamwork is essential</h3>
			<p>
				I've lead teams of developers to provide customer friendly solutions.
				<em>Supporting coworkers</em> is a highlight of my day. It's as fun and important to help others
				progress, as to be taught something new myself.
			</p>
		</section>

		<section class="section px3 py3" style="overflow: hidden;">
			<!-- <h2 class="glassoflogos">Glass of logos 2D physics.</h2> -->
			<h2 class="angletext">The way we build websites has changed a lot over the years</h2>
			<!-- <h2>Familiar with a range of web development tools and posts, such as…</h2> -->
			<div class="laptopGrid">
				<div>
					<LaptopLogos />
				</div>
				<div class="mytechexperience">
					<h3>I have lots of different experience:</h3>
					<div class="skillcard">
						I'm familiar with <strong>modern frontend frameworks</strong> such as <em>Vue.js</em>,
						<em>Nuxt.js</em>, and <em>SvelteKit</em>.
						<div class="logorow">
							<LogoSticker logokey="vue" />
							<LogoSticker logokey="nuxt" />
							<LogoSticker logokey="svelte" />
						</div>
					</div>
					<div class="skillcard">
						<strong>End-to-end tested</strong> applications with
						<em>Cypress.js</em>.
						<strong>Unit tested</strong> with runners like <em>AVA</em> and <em>Jest</em>. Then
						incorporated them into a continuous delivery process with <em>Bitbucket Pipelines</em>.
						<div class="logorow">
							<LogoSticker logokey="cypress" />
							<LogoSticker logokey="ava" />
							<LogoSticker logokey="jest" />
							<LogoSticker logokey="bitbucket" />
						</div>
					</div>
					<div class="skillcard">
						I've configured
						<strong>tooling technologies</strong>
						like
						<em>TypeScript</em>, <em>Webpack</em>, <em>Rollup</em>, <em>Gulp</em>, <em>npm</em>,
						<em>Docker</em> and <em>Yarn</em>.
						<div class="logorow">
							<LogoSticker logokey="typescript" />
							<LogoSticker logokey="webpack" />
							<LogoSticker logokey="webpackrollup" />
							<LogoSticker logokey="gulp" />
							<LogoSticker logokey="npm" />
							<LogoSticker logokey="docker" />
							<LogoSticker logokey="yarn" />
						</div>
					</div>
					<div class="skillcard">
						Enhanced experiences with popular <strong>JS libraries</strong> including <em>GSAP</em>,
						<em>ScrollMagic</em>,
						<em>Three.js</em>, <em>jQuery</em> to supplement vanilla JS and achieve custom
						behaviour.
						<div class="logorow">
							<LogoSticker logokey="gsap" />
							<LogoSticker logokey="scrollmagic" />
							<LogoSticker logokey="three" />
							<LogoSticker logokey="jquery" />
						</div>
					</div>
					<div class="skillcard">
						I've implemented <strong>data driven</strong> frontends calling on
						<em>R.E.S.T APIs</em>. We organise and test their schemas with <em>Postman</em>. I'm
						keen to improve my <em>GraphQL</em> skills.
						<div class="logorow">
							<LogoSticker logokey="rest" />
							<LogoSticker logokey="postman" />
							<LogoSticker logokey="graphql" />
						</div>
					</div>
					<div class="skillcard">
						Worked with <strong>PHP technologies</strong> like <em>WordPress</em> (Advanced Custom
						Fields).
						<div class="logorow">
							<LogoSticker logokey="wordpress" />
						</div>
					</div>
					<div class="skillcard">
						Incorporated <strong>CSS tooling</strong> and libraries like <em>Sass</em>,
						<em>Bootstrap</em>
						and
						<em>Zurb Foundation</em>.
						<div class="logorow">
							<LogoSticker logokey="sass" />
							<LogoSticker logokey="bootstrap" />
							<LogoSticker logokey="foundation" />
						</div>
					</div>
					<div class="skillcard">
						<strong>Collabotated</strong> using <em>GitHub</em> and <em>Bitbucket</em>.
						<div class="logorow">
							<LogoSticker logokey="github" />
							<LogoSticker logokey="bitbucket" />
						</div>
					</div>
					<div class="skillcard">
						I'm competent with various <strong>design software</strong>: <em>PhotoShop</em>,
						<em>Illustrator</em>,
						<em>Sketch</em>, <em>InVision</em>.
						<div class="logorow">
							<LogoSticker logokey="photoshop" />
							<LogoSticker logokey="illustrator" />
							<LogoSticker logokey="sketch" />
							<LogoSticker logokey="invision" />
						</div>
					</div>
					<div class="skillcard">
						Recently I've started dabbling with <strong>3D</strong> using
						<em>Three.js</em> and <em>Blender</em>.
						<div class="logorow">
							<LogoSticker logokey="three" />
							<LogoSticker logokey="blender" />
						</div>
					</div>
					<div class="skillcard">
						I've configured and administered
						<strong>project management and organisational software</strong>
						for our teams such as
						<em>Jira</em>, <em>Trello</em> and <em>Slack</em>.
						<div class="logorow">
							<LogoSticker logokey="trello" />
							<LogoSticker logokey="slack" />
						</div>
					</div>
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

	.skillcard {
		line-height: 1.5;
		margin: 0;
		// border: 2px solid var(--card-backgroundcolor);
		background: linear-gradient(150deg, #06102300, var(--card-backgroundcolor));
		padding: 1.5em 1em 0.5em;
	}
	.logorow {
		margin: 0.5em 0 0;
		text-align: right;
		display: flex;
		gap: 0.62em;
		width: 100%;
		justify-content: flex-end;
	}
</style>
