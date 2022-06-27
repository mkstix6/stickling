<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ImageLean from '$lib/ImageLean.svelte';
</script>

<header>
	<h1 class="angletext">Brandirectory website build</h1>
	<a class="sitelink button" href="https://brandirectory.com"><code>brandirectory.com</code></a>
	<div style="display: flex; align-items: baseline; font-size: 3em;">
		<LogoSticker logokey="vue" />
		<LogoSticker logokey="nuxt" />
	</div>
</header>

<div class="articlecols">
	<div>
		<p>
			Brandirectory was an exciting and challenging project I worked on between 2019 and 2021 at my
			previous agency job.
		</p>
		<p>
			Our client had lots of numerical data they wanted to display to their customers using charts
			and graphs alongside interactive tables.
		</p>
		<p>
			<strong class="gradient">
				I primarily wrote the front-end code using <LogoSticker logokey="vue" /> Vue.js and the <LogoSticker
					logokey="nuxt"
				/> Nuxt.js framework.
			</strong>
			Data was communicated via REST APIs we collaboratively designed. My colleagues built the APIs over
			a Laravel PHP backend.
		</p>
		<p>
			We found the app <LogoSticker logokey="postman" /> Postman especially useful for developing the
			REST APIs. Postman allowed us to plan the response contract, write JSON schema to match the plan,
			then consistently test our APIs as the number of APIs grew.
		</p>
		<p>During the course of this project I also:</p>
		<ul>
			<li>
				<LogoSticker width="1.5em" height="auto" logokey="ava" />
				<strong>Learnt TDD and Unit-testing (using AVA).</strong><br /> Amazing for finding bugs and
				tracking edge cases in data processing code.
			</li>
			<li>
				<LogoSticker width="1.5em" height="auto" logokey="cypress" />
				<strong>End-to-end testing using Cypress.js.</strong><br />
				It was such a reassurance to have Cypress check through our site's routes and report on their
				status after changes.
			</li>
			<li>
				<LogoSticker width="1.5em" height="auto" logokey="aws" />
				<strong>Became familiar with AWS EC2 instances.</strong><br />
				Tricky to administer but very powerful.
			</li>
			<li>
				<LogoSticker width="1.5em" height="auto" logokey="bitbucket" />
				<strong
					>Set up
					<abbr title="Continuous Integration">CI</abbr>/<abbr title="Continuous Deployment"
						>CD</abbr
					>
					processes.</strong
				><br /> These ran our tests and deployed our code from BitBucket to Production (on AWS) with
				each git merge.
			</li>
		</ul>
	</div>

	<div>
		<ImageLean
			src="/posts/brandirectory-screenshot1.png"
			ccw={false}
			width="131"
			height="93"
			alt="Brandirectory.com homepage"
		/>
		<ImageLean
			src="/posts/brandirectory-screenshot3.png"
			ccw={true}
			width="131"
			height="93"
			alt="Various data offerings on Brandirectory.com"
		/>
		<ImageLean
			src="/posts/brandirectory-screenshot2.png"
			ccw={false}
			width="131"
			height="93"
			alt="Bar charts and doughnut charts on Brandirectory.com"
		/>
	</div>
</div>

<style>
	.sitelink {
		margin: 1rem 0;
	}
</style>
