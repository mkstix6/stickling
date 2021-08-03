<script>
	import LaptopLogos from '$lib/LaptopLogos.svelte';
	import Orbiter from '$lib/Orbiter.svelte';
	import LogoSticker from '$lib/LogoSticker.svelte';
</script>

<svelte:head>
	<title>Stickling.co.uk</title>
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
			<Orbiter />
		</section>

		<section class="section px3 py3 indentp">
			<h2 class="angletext">Some things I believe…</h2>
			<p>
				Good <strong>SEO</strong>,
				<strong>code-performance</strong> and <strong>semantic HTML</strong> are foundational to the
				work we do.
			</p>
			<h3>Teamwork is essential</h3>
			<p>
				I've lead teams of developers to provide customer friendly solutions.
				<em>Supporting coworkers</em> is a highlight of my day. It's as fun and important to help others
				progress, as to be taught something new myself.
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
					<h3>Some technology I have experience with…</h3>
					<p>
						<LogoSticker logokey="vue" />
						<LogoSticker logokey="nuxt" />
						<LogoSticker logokey="svelte" />
						<br />
						I'm familiar with <strong>modern frontend frameworks</strong> such as <em>Vue.js</em>,
						<em>Nuxt.js</em>, and <em>SvelteKit</em>.
					</p>
					<p>
						<LogoSticker logokey="cypress" />
						<LogoSticker logokey="ava" />
						<LogoSticker logokey="jest" />
						<LogoSticker logokey="bitbucket" />
						<br />
						<strong>End-to-end tested</strong> applications with
						<em>Cypress.js</em>.
						<strong>Unit tested</strong> with runners like <em>AVA</em> and <em>Jest</em>. Then
						incorporated them into a continuous delivery process with <em>Bitbucket Pipelines</em>.
					</p>
					<p>
						<LogoSticker logokey="typescript" />
						<LogoSticker logokey="webpack" />
						<LogoSticker logokey="webpackrollup" />
						<LogoSticker logokey="gulp" />
						<LogoSticker logokey="npm" />
						<LogoSticker logokey="docker" />
						<LogoSticker logokey="yarn" />
						<br />
						I've configured
						<strong>tooling technologies</strong>
						like
						<em>TypeScript</em>, <em>Webpack</em>, <em>Rollup</em>, <em>Gulp</em>, <em>npm</em>,
						<em>Docker</em> and <em>Yarn</em>.
					</p>
					<p>
						<LogoSticker logokey="gsap" />
						<LogoSticker logokey="scrollmagic" />
						<LogoSticker logokey="three" />
						<LogoSticker logokey="jquery" />
						<br />
						Enhanced experiences with popular <strong>JS libraries</strong> including <em>GSAP</em>,
						<em>ScrollMagic</em>,
						<em>Three.js</em>, <em>jQuery</em> to supplement vanilla JS and achieve custom behaviour.
					</p>
					<p>
						<LogoSticker logokey="rest" />
						<LogoSticker logokey="postman" />
						<LogoSticker logokey="graphql" />
						<br />
						I've implemented <strong>data driven</strong> frontends calling on
						<em>R.E.S.T APIs</em>. We organise and test their schemas with <em>Postman</em>. I'm
						keen to improve my <em>GraphQL</em> skills.
					</p>
					<p>
						<LogoSticker logokey="wordpress" />
						<br />
						Worked with <strong>PHP technologies</strong> like <em>WordPress</em> (Advanced Custom Fields).
					</p>
					<p>
						<LogoSticker logokey="sass" />
						<LogoSticker logokey="bootstrap" />
						<LogoSticker logokey="foundation" />
						<br />
						Incorporated <strong>CSS tooling</strong> and libraries like <em>Sass</em>,
						<em>Bootstrap</em>
						and
						<em>Zurb Foundation</em>.
					</p>
					<p>
						<LogoSticker logokey="github" />
						<LogoSticker logokey="bitbucket" />
						<br />
						<strong>Collabotated</strong> using <em>GitHub</em> and <em>Bitbucket</em>.
					</p>
					<p>
						<LogoSticker logokey="photoshop" />
						<LogoSticker logokey="illustrator" />
						<LogoSticker logokey="sketch" />
						<LogoSticker logokey="invision" />
						<br />
						I'm competent with various <strong>design software</strong>: <em>PhotoShop</em>,
						<em>Illustrator</em>,
						<em>Sketch</em>, <em>InVision</em>.
					</p>
					<p>
						<LogoSticker logokey="three" />
						<LogoSticker logokey="blender" />
						<br />
						Recently I've started dabbling with <strong>3D</strong> using
						<em>Three.js</em> and <em>Blender</em>.
					</p>
					<p>
						<LogoSticker logokey="jira" />
						<LogoSticker logokey="trello" />
						<LogoSticker logokey="slack" />
						<br />
						I've configured and administered
						<strong>project management and organisational software</strong>
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
