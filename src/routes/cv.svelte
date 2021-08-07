<script>
	import SocialIcon from '$lib/SocialIcon.svelte';
</script>

<main id="main" class="py3">
	<div class="gutterpadding py3">
		<h1 class="angletext">Mark Stickling CV</h1>

		<div class="grid">
			<div>
				<section class="employment">
					<h2 class="h3">Employment history</h2>
					<ul class="cvlist">
						<li style="--durationyears: 6;">
							<h3>Senior Frontend developer</h3>
							<p>
								<small
									><time datetime="2015">2015</time>-<time datetime="2021">2021</time>
									<a href="https://www.minttwist.com">@ MintTwist digital agency</a>
								</small>
							</p>
							<p>
								My departmental responsibilities included assisting the department lead with team
								organisation and supporting junior staff and interns. Client communication.
								Facilitation of, and contributing to, project meetings.
							</p>
							<p>
								Building webapps with the Vue.js and Nuxt.js frameworks with REST APIs for data
								delivery. Also building bespoke WordPress based brochure websites and integrating 3D
								experiences with three.js.
							</p>
						</li>
						<li style="--durationyears: 2;">
							<h3>Frontend developer</h3>
							<p>
								<small>
									<time datetime="2013">2013</time>-<time datetime="2015">2015</time>
									<a href="https://www.minttwist.com">@ MintTwist digital agency</a>
								</small>
							</p>
							<p>
								Building websites atop WordPress. Using HTML, CSS, JS and PHP to deliver bespoke
								websites. Continuing my established responsibilities whilst supporting interns and
								helping other staff. Researching emerging technologies and discussing with
								department about web trends. Transitioning department workflows such as moving our
								repositories from subversion to git. Managing project's tasks and priorities.
							</p>
						</li>
						<li style="--durationyears: 1;">
							<h3>Development intern</h3>
							<p>
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
							<p>
								<small>
									<time datetime="2009-09">2009</time>-<time datetime="2012-07">2012</time>
									<a href="https://www.glebe.bromley.sch.uk">@ Glebe School</a>
								</small>
							</p>
							<p>
								Supporting students and teachers in lessons accross all departments and subjects
								with an emphasis on ICT. Covering individual lessons during staff shortages.
								Assisting day trips or multi-day trips including hiking Mt. Snowdon, sports
								competitions, outdoor activities, watersports, theatre and culinary focuses.
							</p>
						</li>
					</ul>
				</section>

				<section class="education">
					<h2 class="h3">Education</h2>
					<ul class="cvlist">
						<li style="--durationyears: 3;">
							<h3>Physics BSc</h3>
							<p>
								<small>
									<time datetime="2005-09">2005</time>-<time datetime="2008-08">2008</time>
									<a href="https://warwick.ac.uk">@ University of Warwick</a>
								</small>
							</p>
						</li>
					</ul>
				</section>
			</div>
			<div class="contact">
				<section>
					<h2>Website</h2>
					<p style="display: flex; align-items: center;">
						<img class="qr" src="/cv/qr-sticklingcouk-cv.png" alt="QR code to stickling.co.uk" />
						<a href="https://stickling.co.uk">stickling.co.uk</a>
					</p>
				</section>

				<section>
					<h2 class="h3">Contact</h2>
					<p>
						<SocialIcon service="twitter" />
						<a href="https://twitter.com/mkstix6">twitter.com/mkstix6</a>
					</p>
					<p>
						<SocialIcon service="linkedin" />
						<a href="https://www.linkedin.com/in/mark-stickling-b77ba246/">
							linkedin.com/in/mark-stickling-b77ba246/
						</a>
					</p>
				</section>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	.grid {
		$goldenraitio: 1.62;
		display: grid;
		grid-template-columns: #{$goldenraitio}fr 1fr;
	}

	.qr {
		width: 1em;
		height: 1em;
		margin-right: 0.5em;

		@media print {
			width: 5em;
			height: 5em;
		}

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

	h1 {
		padding: 0 0 1em 0;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 0.5em;
	}

	h3 {
		font-size: 1rem;
		font-weight: 400;
		color: inherit;
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

	.cvlist {
		list-style: none;
		margin-bottom: 3rem;

		p {
			font-size: 16px;
			max-width: 60ex;
			line-height: 1.4;
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

		p ~ p {
			margin-top: 1em;
		}

		li {
			margin-bottom: 1em;
			padding: 1.5em 0;

			@media print {
				padding-top: 0;
			}

			padding-left: 3em;
			position: relative;
			min-height: calc(3vw * var(--durationyears));
			max-width: none;

			&::before {
				// content: '';
				display: block;
				position: absolute;
				width: 3em;
				left: -2em;
				top: 0;
				bottom: 0;
				// transform: skewY(-6deg);
				transform-origin: top right;
				background: linear-gradient(to left, var(--stripecolor) 30%, transparent);
				opacity: 0.3;
			}

			&::after {
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 1em;
				// transform: skewY(-6deg);
				transform-origin: top right;
				background: var(--stripecolor);
				box-shadow: -0.5em 0 0 var(--stripecolor1), -1em 0 0 var(--stripecolor2),
					-1.5em 0 0 var(--stripecolor3), -2em 0 0 var(--stripecolor4);
			}
		}
		@for $i from 1 through 6 {
			li:nth-child(#{$i}) {
				&::before,
				&::after {
					--stripecolor: #{mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%)};
					--stripecolor1: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%), 0.6)};
					--stripecolor2: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%), 0.75)};
					--stripecolor3: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%), 0.85)};
					--stripecolor4: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i - 1) * 20%), 0.9)};
				}
			}
		}
	}

	.education .cvlist {
		@for $i from 1 through 2 {
			li:nth-child(#{$i}) {
				&::before,
				&::after {
					--stripecolor: #{mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%)};
					--stripecolor1: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%), 0.6)};
					--stripecolor2: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%), 0.75)};
					--stripecolor3: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%), 0.85)};
					--stripecolor4: #{transparentize(mix(hsl(222, 64%, 25%), #56ffd5, ($i + 3) * 20%), 0.9)};
				}
			}
		}
	}

	li p {
		margin: 0;
	}

	.contact a {
		text-decoration: none;

		@media print {
			color: var(--bodycolor);
		}
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
	}
</style>
