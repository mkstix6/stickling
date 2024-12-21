<script lang="ts">
	import SocialIcon from '$lib/SocialIcon.svelte';
	import LogoSticker from '$lib/LogoSticker.svelte';

	interface SkillListItem {
		key: string;
		name: string;
	}

	const primarySkillsList: SkillListItem[] = [
		{ key: 'typescript', name: 'TypeScript' },
		{ key: 'react', name: 'React' },
		{ key: 'next', name: 'NextJS' },
		{ key: 'css', name: 'CSS' },
		{ key: 'html', name: 'HTML' },
		{ key: 'graphql', name: 'GraphQL' },
		{ key: 'cypress', name: 'Cypress.js' },
	];

	const secondarySkillsList: SkillListItem[] = [
		{ key: 'js', name: 'JS' },
		{ key: 'vue', name: 'Vue' },
		{ key: 'nuxt', name: 'Nuxt' },
		{ key: 'svelte', name: 'Svelte' },
		{ key: 'sass', name: 'SCSS' },
		{ key: 'three', name: 'Three.js 3D' },
		{ key: 'amplitude', name: 'Amplitude' },
		{ key: 'wordpress', name: 'WordPress' },
		{ key: 'webpack', name: 'Webpack' },
		{ key: 'python', name: 'Python' },
		{ key: 'aws', name: 'AWS' },
		{ key: 'docker', name: 'Docker' },
	];

	const learningSkillsList: SkillListItem[] = [];
</script>

<svelte:head>
	<title>Mark Stickling's CV | Stickling.co.uk</title>
</svelte:head>

<main id="main" class="py3">
	<div class="gutterpadding py3">
		<header>
			<h1 class="angletext">Mark Stickling CV</h1>
			<p class="angletext">Front-end web developer</p>
		</header>

		<section class="summary mt0 mb2">
			<p>
				I'm an enthusiastic, sunny, dilligent and creative developer interested in building modern
				web experiences with great teams of people. I've been the developer point of contact for
				clients and managed projects from inception, to ship, and further onto long term
				maintenance. I enjoy mentoring junior developers and contributing generously to community
				movements. Interested in keeping up with the latest web development trends whilst utilising
				battle tested offerings such as NextJS, TypeScript and GraphQL where it really counts. I
				strive for good performance, accessibility <small>(WCAG 2.1)</small>, S.E.O. and semantic
				qualities in the code I write.
			</p>
		</section>

		<div class="grid">
			<section class="employment">
				<h2>Employment history</h2>
				<ul class="cvlist">
					<li style="--durationyears: 2;">
						<h3>Core Front-end engineer</h3>
						<img
							class="logo"
							src="/logos/itv2024.svg"
							alt="ITV"
							title="ITV"
							width="18"
							height="18"
							style="width: auto; height: 2.3em; margin: 0.25em 0 0.1em;"
						/>
						<p class="experienceMeta">
							<small>
								<time datetime="2022">2022</time>-<time datetime="2024">2024</time>
								<a href="https://www.itv.com">@ ITV</a>
							</small>
						</p>
						<h4>Primary responsibilities:</h4>
						<p>
							My work at ITV has predominently focussed on delivering features and performance
							improvements to our ITVX app offerings. We liase with key stake holders, discuss
							features with our design teams, collaborate in planning work and pair on developing.
							We're responsible for new features from the first line of code to deploying them to
							our web and connected TV hardware – each of which bring unique challenges due to
							performance and memory limitations.
						</p>
						<ul>
							<li>
								Engineering functionality and maintaining ITVX at <a href="https://www.itv.com"
									>itv.com</a
								> (a modern Next.js + GraphQL application).
							</li>
							<li>
								Engineering, testing and maintaining ITV's ITVX Connected Television (CTV) offerings
								(a React.js + GraphQL application).
							</li>
							<li>Reviewing and improving accessibility throughout user facing UI.</li>
							<li>Maintaining and improving development documentation and procedures.</li>
							<li>Implementing A/B tests atop Amplitude.</li>
						</ul>
						<h4>Community responsibilities:</h4>
						<ul>
							<li>
								Contributing, knowledge share and presenting within regular front end community
								meetings.
							</li>
							<li>Running and administering internal Special Interest Group meetings.</li>
							<li>Mentoring junior developers.</li>
						</ul>
						<h4>Further interests</h4>
						<ul>
							<li>
								Co-hosted an Accessibility workshop to understand weak points in ITVX's coverage.
							</li>
						</ul>
					</li>
					<li style="--durationyears: 6;">
						<h3>Senior Front-end developer</h3>
						<p class="experienceMeta">
							<small
								><time datetime="2015">2015</time>-<time datetime="2021">2021</time>
								<a href="https://www.minttwist.com">@ MintTwist digital agency</a>
							</small>
						</p>
						<h4>Departmental responsibilities:</h4>
						<ul>
							<li>assisting the department lead with team organisation.</li>
							<li>
								facilitation of, and contributing to, project meetings – with clients and
								internally.
							</li>
							<li>planning and assigning tasks for ongoing projects</li>
							<li>supporting junior staff and teaching interns</li>
						</ul>
						<h4>Technical responsibilities:</h4>
						<ul>
							<li>
								managing and developing web applications with the <strong class="nowrap"
									><LogoSticker logokey="vue" /> Vue.js</strong
								>
								and
								<strong class="nowrap"><LogoSticker logokey="nuxt" /> Nuxt.js</strong> frameworks.
							</li>
							<li>setting up and monitoring CI/CD pipelines.</li>
							<li>utilising REST APIs for data delivery.</li>
							<li>co-designing and documenting APIs with my backend colleagues.</li>
							<li>
								product testing funcitonality and browser/responsive-design testing then logging and
								managing bug tickets in <LogoSticker logokey="jira" /> Jira
							</li>
							<li>integrating 3D experiences using <LogoSticker logokey="three" /> Three.js.</li>
							<li>unit-testing and integration-testing.</li>
							<li>testing accessibility (a11y) and WCAG compliance.</li>
							<li>S.E.O. analysis and improvement work.</li>
							<li>website performance analysis and improvement work.</li>
							<li>building bespoke WordPress based brochure websites.</li>
							<li>building static HTML websites.</li>
						</ul>
					</li>
					<li style="--durationyears: 2;">
						<h3>Front-end developer</h3>
						<p class="experienceMeta">
							<small>
								<time datetime="2013">2013</time>-<time datetime="2015">2015</time>
								<a href="https://www.minttwist.com">@ MintTwist digital agency</a>
							</small>
						</p>
						<p>
							Building websites atop WordPress. Using HTML, CSS, JS and PHP to deliver bespoke
							websites. Continuing my established responsibilities whilst supporting interns and
							helping other staff. Researching emerging technologies and discussing with department
							about web trends. Transitioning department workflows such as moving our repositories
							from subversion to git. Managing project's tasks and priorities.
						</p>
					</li>
					<li style="--durationyears: 1;">
						<h3>Development intern</h3>
						<p class="experienceMeta">
							<small>
								<time datetime="2012-05">2012</time>-<time datetime="2013">2013</time>
								<a href="https://www.minttwist.com">@ MintTwist digital agency</a>
							</small>
						</p>
						<p>
							Coding from PhotoShop designs into HTML & CSS with quick turn arounds for multiple
							ongoing projects and supported clients. Discussions with clients about requirements,
							content, and ongoing maintenence updates. Learning the various project's codebases,
							making code changes and deploying to production.
						</p>
					</li>
					<li style="--durationyears: 3;">
						<h3>
							<abbr title="Special Educational Needs">S.E.N.</abbr>
							Teaching Assistant
						</h3>
						<p class="experienceMeta">
							<small>
								<time datetime="2009-09">2009</time>-<time datetime="2012-07">2012</time>
								<a href="https://www.glebe.bromley.sch.uk">@ Glebe School</a>
							</small>
						</p>
						<p>
							Supporting students and teachers in lessons accross all departments and subjects with
							an emphasis on ICT. Covering individual lessons during staff shortages. Assisting day
							trips or multi-day trips including hiking Mt. Snowdon, sports competitions, outdoor
							activities, watersports, theatre and culinary focuses.
						</p>
					</li>
				</ul>
			</section>

			<section class="education">
				<h2>Education</h2>
				<ul class="cvlist">
					<li style="--durationyears: 3;">
						<h3>Physics BSc</h3>
						<p class="experienceMeta">
							<small>
								<time datetime="2005-09">2005</time>-<time datetime="2008-08">2008</time>
								<a href="https://warwick.ac.uk">@ University of Warwick</a>
							</small>
						</p>
					</li>
				</ul>
			</section>

			<div class="sidebar">
				<section class="mb2">
					<h2>Primary Skills</h2>
					<ul class="skillsList">
						{#each primarySkillsList as { key, name }}
							<li>
								<span style="margin-right: 0.4em; position: relative; top: 0.1em;"
									><LogoSticker logokey={key} /></span
								>
								{name}
							</li>
						{/each}
					</ul>
				</section>
				<section class="mb2">
					<h2>Familiar with…</h2>
					<ul class="skillsList">
						{#each secondarySkillsList as { key, name }}
							<li>
								<span style="margin-right: 0.4em; position: relative; top: 0.1em;"
									><LogoSticker logokey={key} /></span
								>
								{name}
							</li>
						{/each}
					</ul>
				</section>
				{#if learningSkillsList?.length}
					<section class="mb2">
						<h2>Currently learning…</h2>
						<ul class="skillsList">
							{#each learningSkillsList as { key, name }}
								<li>
									<span style="margin-right: 0.4em; position: relative; top: 0.1em;"
										><LogoSticker logokey={key} /></span
									>
									{name}
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				<section class="mb2">
					<h2>Contact</h2>
					<p>
						<span class="bulletIcon"><SocialIcon service="linkedin" /></span>
						<a href="https://www.linkedin.com/in/mark-stickling-b77ba246/">
							linkedin.com/in/mark-stickling-b77ba246/
						</a>
					</p>
				</section>

				<section class="mb2">
					<h2>Portfolio</h2>
					<p style="display: flex; align-items: center;">
						<span class="bulletIcon"
							><img
								class="qr"
								src="/cv/qr-sticklingcouk-cv.png"
								alt="QR code to stickling.co.uk"
							/></span
						>
						<a href="https://stickling.co.uk">stickling.co.uk</a>
						—
						<small>built with <LogoSticker logokey="svelte" /> SvelteKit</small>
					</p>
				</section>

				<section class="mb2">
					<h2>Location</h2>
					<p>London, United Kingdom</p>
				</section>

				<section class="mb2">
					<h2>Interests</h2>
					<ul>
						<li>Surfing</li>
						<li>Hiking</li>
						<li>Code art</li>
						<li>Code challenges (<a href="https://adventofcode.com">Advent of Code</a>)</li>
						<li>Board games</li>
						<li>Video games</li>
					</ul>
				</section>
			</div>
		</div>

		<div style="text-align: center;">
			<button onclick={window.print()} class="megaButton printbutton">Print this page</button>
		</div>
	</div>
</main>

<style lang="scss">
	@use 'sass:color';

	@media screen and (min-width: 1000px), print {
		.grid {
			$goldenratio: 1.62;
			display: grid;
			gap: 3rem;
			grid-template-columns: #{$goldenratio}fr 1fr;
		}

		.employment {
			order: 1;
		}
		.education {
			order: 3;
		}
		.sidebar {
			order: 2;
		}
	}

	@media print {
		.grid {
			width: 1000px;
		}
	}

	@media screen and (max-width: 1000px) {
		.grid {
			display: grid;
		}

		.employment {
			order: 2;
		}
		.education {
			order: 2;
		}
		.sidebar {
			order: 1;
		}
	}

	.qr {
		width: 1em;
		height: 1em;
		margin-right: 0.25em;

		@media print {
			width: 5em;
			height: 5em;
		}

		& {
			border-radius: 1px;
			padding: 1px;
			background-color: white;
			cursor: none;
			position: relative;
			z-index: 5;
			transition: transform 300ms;
			transition-timing-function: cubic-bezier(0.415, 1.34, 0.83, 0.745);

			&:focus,
			&:hover {
				transform: scale(7);
				transition: transform 800ms;
				transition-timing-function: cubic-bezier(0.79, -0.07, 0, 1.03);
			}
		}
	}

	h1 {
		padding: 0 0 1em 0;
	}

	header {
		margin: 5vw 0 1.5rem 0;
		@media print {
			margin-top: 0;
		}
		h1 {
			padding-bottom: 0;
		}
		p {
			font-size: 1.5em;
			font-weight: 600;
			margin: 0;
		}
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 0.5em;
		color: var(--bodycolor);
		background: none;
	}

	h3 {
		font-size: 1.2rem;
		font-weight: 400;
		color: var(--bodycolor);
		background: none;
	}

	small {
		opacity: 0.7;
		transition: opacity 300ms;

		&:hover,
		&:focus {
			opacity: 1;
		}
		@media print {
			opacity: 1;
		}
	}

	p,
	ul {
		font-size: 16px;
		max-width: none;
		line-height: 1.4;
	}

	.summary {
		max-width: 120ex;
	}
	.summary p {
		line-height: 1.6;
		font-size: 1.1rem;
	}

	li {
		max-width: none;
	}

	.experienceMeta {
		margin-bottom: 1.5rem;
	}

	.bulletIcon {
		margin-right: 0.25em;
		position: relative;
		top: 0.05em;
	}

	.cvlist {
		list-style: none;
		margin-bottom: 3rem;

		h4 {
			background: none;
			color: inherit;
			font-weight: 600;
			font-size: 16px;
			margin: 0 0 0.5rem 0;
		}

		ul {
			margin-bottom: 2rem;
		}

		ul,
		li {
			font-size: 16px;
			list-style-position: outside;
			padding-left: 0;
		}

		a {
			text-decoration: none;
			color: inherit;
			transition: color 300ms;

			&:hover,
			&:focus {
				color: var(--pallette-active);
			}
		}

		p,
		li {
			line-height: 1.5;
		}

		p ~ p {
			margin-top: 1em;
		}

		// h4 + p,
		h4 + ul,
		h4 + ul > li:first-child {
			margin-top: 0;
		}

		> li {
			margin-bottom: 1em;
			padding: 1.5em 0;
			padding-left: 3em;
			position: relative;
			min-height: calc(3vw * var(--durationyears));
			max-width: none;

			&::before {
				content: '';
				display: block;
				position: absolute;
				width: 0.2em;
				left: 0;
				top: 0;
				bottom: 0;
				transform-origin: top right;
				box-shadow:
					-0.4em 0 0 var(--stripecolor1),
					-0.8em 0 0 var(--stripecolor2),
					-1.25em 0 0 var(--stripecolor3),
					-1.7em 0 0 var(--stripecolor4);

				@media print {
					display: none !important;
					content: none !important;
				}
			}

			&::after {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 0.5em;
				// transform: skewY(-6deg);
				transform-origin: top right;
				background: var(--stripecolor);
				// box-shadow: -0.75em 0 0 var(--stripecolor1), -1.5em 0 0 var(--stripecolor2),
				// 	-2.25em 0 0 var(--stripecolor3), -3em 0 0 var(--stripecolor4);
				@media print {
					display: none !important;
					content: none !important;
				}
			}

			@media print {
				padding-top: 0;
			}
		}

		@for $i from 1 through 6 {
			li:nth-child(#{$i}) {
				&::before,
				&::after {
					--stripecolor: #{color.mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%)};
					--stripecolor1: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%),
							$alpha: -0.6,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor2: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%),
							$alpha: -0.75,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor3: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%),
							$alpha: -0.85,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor4: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%),
							$alpha: -0.9,
							$space: hsl
						)}; // direct replacement for transparentize()
				}
			}
		}
	}

	.education .cvlist {
		@for $i from 1 through 2 {
			li:nth-child(#{$i}) {
				&::before,
				&::after {
					--stripecolor: #{color.mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%)};
					--stripecolor1: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%),
							$alpha: -0.6,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor2: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%),
							$alpha: -0.75,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor3: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%),
							$alpha: -0.85,
							$space: hsl
						)}; // direct replacement for transparentize()
					--stripecolor4: #{color.adjust(
							color.mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%),
							$alpha: -0.9,
							$space: hsl
						)}; // direct replacement for transparentize()
				}
			}
		}
	}

	li p {
		margin: 0;
	}

	.sidebar a {
		text-decoration: none;

		@media print {
			color: var(--bodycolor);
		}
	}

	.printbutton {
		margin: 3rem auto;
	}

	@media print {
		.cvlist li {
			min-height: 0;
			padding-left: 0;

			&::after {
				content: none;
				display: none;
			}
		}

		.printbutton {
			display: none;
		}
	}

	.skillsList {
		list-style: none;
		padding-left: 0;
		display: flex;
		flex-wrap: wrap;

		li {
			// border: 1px solid currentColor;
			// padding: 0 0.2em 0.6em 0;
			border-radius: 2em;
			margin: 0 1.5em 1.2em 0;
			display: flex;
			align-items: center;
			font-size: 16px;
		}
	}
</style>
