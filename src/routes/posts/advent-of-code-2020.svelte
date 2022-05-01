<script>
	import LogoSticker from '$lib/LogoSticker.svelte';
	import ImageLean from '$lib/ImageLean.svelte';
	import SocialLink from '$lib/SocialLink.svelte';
</script>

<div class="page page--post">
	<header>
		<h1>
			Advent of code 2020<br />
			<LogoSticker logokey="js" />
			<LogoSticker logokey="typescript" />
			<LogoSticker logokey="python" />
			<LogoSticker logokey="ava" />
		</h1>
		<p>
			<a href="https://adventofcode.com/2020">Advent of Code 2020</a>
		</p>
	</header>
	<div class="articlecols">
		<div>
			<p>
				This year's Advent of Code story was about taking a vacation to a tropical island from the
				north pole. It's a fantastic challenge to tease the puzzles out of the narrative.
			</p>
			<p>My first time really giving Advent of Code a go and it was a lot of fun:</p>
			<ul>
				<li>I practiced a lot of data manipulation</li>
				<li>learned a thing or two about algorithms</li>
				<li>
					<LogoSticker logokey="typescript" /> Tried <strong>TypeScript</strong> for some of the later
					puzzles to get used to the TypeScript compiler and typical warnings
				</li>
				<li>
					<LogoSticker logokey="python" /> Even tried <strong>Python</strong> for the first time in a
					couple of puzzles to see how it feels compared to JavaScript.
				</li>
				<li>
					<LogoSticker logokey="ava" /> found
					<strong><abbr title="Test Driven Development">TDD</abbr></strong> with AVA to be super helpful
					in reminding me to break up my code and keep it tested, this really shines as you near the
					solution but there's just one thing wrong somewhere.
				</li>
			</ul>
			<p>
				I managed a score of <span class="adventYellow">20*</span> which I'm pretty pleased with, considering
				how difficult it is to find the time the closer we get to Christmas day.
			</p>
		</div>
		<div>
			<div class="mb2">
				<ImageLean
					src="/posts/adventofcodeasciicodeart2020.png"
					width={1348}
					height={1250}
					alt="The Advent of Code 2020 website front page ASCII code art"
					frame={true}
				/>
			</div>
			<div>
				<SocialLink href="https://github.com/mkstix6/adventofcode2020" service="github"
					>My GitHub repository for Advent of Code 2020.</SocialLink
				>
			</div>
		</div>
	</div>
</div>

<style>
	.adventYellow {
		color: #ffff66;
	}
</style>
